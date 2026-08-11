import React, { useState } from 'react'
import { profile } from '../data/profile'

export default function AIChatBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm an AI assistant trained on Ishank's resume. Ask me anything!" }
  ])
  const [loading, setLoading] = useState(false)

  async function handleSend() {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      setTimeout(() => {
        setMessages([...newMessages, { 
          role: 'assistant', 
          content: "I'm currently in static mode (no Groq API key provided in .env). Ishank is an AI/ML Engineer who builds agentic workflows and full-stack systems!" 
        }])
        setLoading(false)
      }, 800);
      return;
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: `You are an assistant representing ${profile.name}. Summarize your answers based on this context: ${JSON.stringify(profile)}. Be concise.` },
            ...newMessages
          ]
        })
      })
      const data = await response.json()
      setMessages([...newMessages, { role: 'assistant', content: data.choices[0].message.content }])
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: "Network error reaching Groq API." }])
    }
    setLoading(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button onClick={() => setOpen(!open)} className="bg-accent hover:bg-emerald-400 text-slate-900 font-bold px-5 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
        {open ? 'Close AI Chat' : '🤖 Ask AI'}
      </button>

      {open && (
        <div className="glass-card mt-4 w-80 md:w-96 absolute bottom-16 right-0 mb-2">
          <div className="h-64 overflow-y-auto mb-4 space-y-3 pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-lg text-sm ${m.role === 'assistant' ? 'bg-slate-800/80 text-slate-200 mr-8' : 'bg-accent/20 text-emerald-100 ml-8 border border-accent/30'}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="text-slate-400 text-xs animate-pulse">AI is thinking...</div>}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent" placeholder="Ask about my ML projects..." />
            <button className="px-4 py-2 bg-accent rounded-lg text-slate-900 font-bold" onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
