import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function checkInProxy(elevenLabsApiKey: string | undefined, elevenLabsAgentId: string | undefined) {
  const readJsonBody = (req: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      let data = ''
      req.on('data', (chunk: Buffer) => {
        data += chunk
      })
      req.on('end', () => {
        try {
          resolve(data ? JSON.parse(data) : {})
        } catch {
          reject(new Error('Invalid JSON body'))
        }
      })
      req.on('error', reject)
    })
  }

  const handleRequest = async (req: any, res: any) => {
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Method not allowed' }))
      return
    }

    if (!elevenLabsApiKey || !elevenLabsAgentId) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Missing ElevenLabs configuration (ELEVENLABS_API_KEY and ELEVENLABS_AGENT_ID)' }))
      return
    }

    try {
      const body = await readJsonBody(req)
      const { personId, personName } = body

      if (!personName) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Missing personName field' }))
        return
      }

      // Call ElevenLabs Conversational AI API for outbound call
      const phoneNumber = '+13179792383'
      const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${elevenLabsAgentId}/outbound-call`, {
        method: 'POST',
        headers: {
          'xi-api-key': elevenLabsApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          first_message: `Hi ${personName}, this is a quick check-in call. Can you tell me your current pain level on a scale of 1-10, and how many medications have you taken today?`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error?.message || `ElevenLabs API returned ${response.status}`)
      }

      // For now, return success - in production, this would trigger an actual outbound call
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        success: true,
        message: `Voice check-in initiated for ${personName}`,
        callId: data.call_id || data.id,
        personId
      }))
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to initiate voice check-in' }))
    }
  }

  return {
    name: 'check-in-proxy',
    configureServer(server: any) {
      server.middlewares.use('/api/start-check-in', handleRequest)
    },
    configurePreviewServer(server: any) {
      server.middlewares.use('/api/start-check-in', handleRequest)
    },
  }
}

function openAIAgentProxy(apiKey: string | undefined) {
  const readJsonBody = (req: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      let data = ''
      req.on('data', (chunk: Buffer) => {
        data += chunk
      })
      req.on('end', () => {
        try {
          resolve(data ? JSON.parse(data) : {})
        } catch {
          reject(new Error('Invalid JSON body'))
        }
      })
      req.on('error', reject)
    })
  }

  const handleRequest = async (req: any, res: any) => {
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Method not allowed' }))
      return
    }

    if (!apiKey) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Missing OPENAI_API_KEY (or VITE_OPENAI_API_KEY) environment variable' }))
      return
    }

    try {
      const body = await readJsonBody(req)
      const prompt = typeof body?.message === 'string' ? body.message.trim() : ''
      const context = typeof body?.context === 'string' ? body.context.trim() : ''

      if (!prompt) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Missing message field' }))
        return
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a calm caregiving coordination assistant. Keep replies concise and practical. Focus on tasks, scheduling, medication reminders, and supportive communication.',
            },
            {
              role: 'user',
              content: context ? `Case context:\n${context}\n\nFollow-up question:\n${prompt}` : prompt,
            },
          ],
          max_tokens: 280,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        res.statusCode = response.status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: payload?.error?.message || 'OpenAI request failed' }))
        return
      }

      const outputText = payload?.choices?.[0]?.message?.content

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ reply: outputText || 'I can help with the next caregiving step.' }))
    } catch (error) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Unexpected server error' }))
    }
  }

  return {
    name: 'openai-agent-proxy',
    configureServer(server: any) {
      server.middlewares.use('/api/agent', handleRequest)
    },
    configurePreviewServer(server: any) {
      server.middlewares.use('/api/agent', handleRequest)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.OPENAI_API_KEY || env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY
  const elevenLabsApiKey = env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY
  const elevenLabsAgentId = env.ELEVENLABS_AGENT_ID || process.env.ELEVENLABS_AGENT_ID

  return {
    plugins: [
      figmaAssetResolver(),
      checkInProxy(elevenLabsApiKey, elevenLabsAgentId),
      openAIAgentProxy(apiKey),
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
