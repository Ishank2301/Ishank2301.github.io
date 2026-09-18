## 2024-05-24 - Exposed API Key via Vite Env Var
**Vulnerability:** The application uses `import.meta.env.VITE_GROQ_API_KEY` to authenticate with the Groq API directly from the frontend. Because of the `VITE_` prefix, this key is bundled into the client-side JavaScript, exposing it to any user who inspects the source code.
**Learning:** This is a common architectural security gap in serverless/static frontend applications where developers want to integrate LLMs without building a backend proxy.
**Prevention:** Always route external API calls requiring authentication through a secure backend server or serverless function where the API key can be kept secret.
