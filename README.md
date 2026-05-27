
  # Caregiving coordination app

  This is a code bundle for Caregiving coordination app. The original project is available at https://www.figma.com/design/ffsPYi8EaGJro6PDnTM1Nf/Caregiving-coordination-app.

  ## Running the code

  Run `npm i` to install the dependencies.

  Set `OPENAI_API_KEY` in env folder.

  This project includes a local `/api/agent` proxy (via Vite) so the API key stays server-side.

  Run `npm run dev` to start the development server.

  In the Circle screen, sending a message now calls the OpenAI-backed assistant.

  If you accidentally exposed your API key publicly, rotate/revoke it in your OpenAI dashboard immediately.
  