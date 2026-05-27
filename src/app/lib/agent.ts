export function formatTime(): string {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
}

export async function callAgent(message: string, context?: string): Promise<string> {
  const response = await fetch('/api/agent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(context ? { message, context } : { message }),
  });
  const data = await response.json() as { reply?: string; error?: string };
  if (!response.ok) throw new Error(data.error ?? 'Agent request failed');
  return data.reply ?? '';
}
