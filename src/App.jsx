import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight, ArrowUpRight, Award, Bot, BrainCircuit, Check, Code2,
  Database, ExternalLink, Github, GraduationCap, Layers, Linkedin,
  Mail, MapPin, Menu, Moon, Send, Sparkles, Sun, Terminal, Volume2, VolumeX, X
} from 'lucide-react'
import {
  caseStudies,
  certifications,
  experience,
  learning,
  profile,
  projects,
  skillGroups,
  stats
} from './data/profile'

const navItems = ['Experience', 'Work', 'Expertise', 'Journey', 'Contact']
const filters = ['All', 'Agentic AI', 'RAG', 'Full Stack', 'ML']

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

function IconFor({ type }) {
  const icons = {
    brain: BrainCircuit,
    spark: Sparkles,
    code: Code2,
    database: Database
  }

  const Icon = icons[type] || Layers

  return <Icon size={20} strokeWidth={1.8} />
}

function usePortfolioSound() {
  const context = useRef(null)
  const ambience = useRef(null)

  const getContext = () => {
    if (!context.current) {
      context.current = new (
        window.AudioContext || window.webkitAudioContext
      )()
    }

    return context.current
  }

  const tap = () => {
    try {
      const ctx = getContext()
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()

      oscillator.frequency.value = 460

      gain.gain.setValueAtTime(0.028, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + 0.06
      )

      oscillator.connect(gain).connect(ctx.destination)
      oscillator.start()
      oscillator.stop(ctx.currentTime + 0.07)
    } catch {
      /* Audio is optional. */
    }
  }

  const setAmbient = enabled => {
    try {
      const ctx = getContext()

      if (!enabled && ambience.current) {
        ambience.current.oscillator.stop()
        ambience.current = null
        return
      }

      if (enabled && !ambience.current) {
        const oscillator = ctx.createOscillator()
        const gain = ctx.createGain()

        oscillator.type = 'sine'
        oscillator.frequency.value = 58
        gain.gain.value = 0.008

        oscillator.connect(gain).connect(ctx.destination)
        oscillator.start()

        ambience.current = { oscillator }
      }
    } catch {
      /* Audio is optional. */
    }
  }

  useEffect(() => {
    return () => {
      if (ambience.current) {
        ambience.current.oscillator.stop()
      }
    }
  }, [])

  return { tap, setAmbient }
}

function LiveTerminal({ onRetro, onTheme, tap }) {
  const [value, setValue] = useState('')
  const [lines, setLines] = useState([
    {
      prompt: false,
      text: 'Welcome to ishank.dev. Type “help” to explore.'
    }
  ])
  const [game, setGame] = useState(false)
  const [score, setScore] = useState(0)

  const execute = () => {
    const command = value.trim().toLowerCase()

    if (!command) return

    tap()

    const output = {
      help: 'Commands: about, projects, skills, contact, theme, retro, game, clear.',
      about: 'AI/ML engineer building agentic systems, RAG pipelines, and full-stack products.',
      projects: 'Aizen-GPT · TechMart AI Support · Job Application Agent · MediAgent.',
      skills: 'LangGraph · CrewAI · LangChain · PyTorch · FastAPI · React · FAISS.',
      contact: profile.email,
      theme: 'Theme switched. Smooth, isn’t it?',
      retro: 'Retro protocol enabled. Try the secret game command too.',
      game: 'Catch the signal to earn points. The highest score is pure bragging rights.'
    }

    if (command === 'clear') {
      setLines([])
      setValue('')
      return
    }

    if (command === 'retro') onRetro()
    if (command === 'theme') onTheme()
    if (command === 'game') setGame(true)

    setLines(current => [
      ...current,
      {
        prompt: true,
        text: `$ ${command}`
      },
      {
        prompt: false,
        text:
          output[command] ||
          `Unknown command: ${command}. Type “help”.`
      }
    ])

    setValue('')
  }

  return (
    <article className="terminal-card reveal-on-scroll">
      <div className="terminal-bar">
        <span />
        <span />
        <span />
        <b>
          <Terminal size={14} /> interactive-terminal
        </b>
      </div>

      <div className="terminal-body">
        {lines.map((line, index) => (
          <p
            className={line.prompt ? 'terminal-prompt' : ''}
            key={index}
          >
            {line.text}
          </p>
        ))}

        {game && (
          <div className="signal-game">
            <span>signal found: {score}</span>

            <button
              style={{
                '--x': `${22 + (score * 29) % 63}%`,
                '--y': `${20 + (score * 43) % 55}%`
              }}
              onClick={() => {
                setScore(value => value + 1)
                tap()
              }}
              aria-label="Catch signal"
            >
              ✦
            </button>
          </div>
        )}

        <div className="terminal-input">
          <span>$</span>

          <input
            aria-label="Terminal command"
            value={value}
            onChange={event => setValue(event.target.value)}
            onKeyDown={event =>
              event.key === 'Enter' && execute()
            }
            placeholder="type a command"
          />

          <button onClick={execute}>run</button>
        </div>
      </div>
    </article>
  )
}

function PortfolioAssistant({ tap }) {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')

  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hello! Ask about Ishank’s AI work, projects, or tech stack.'
    }
  ])

  function respond() {
    const input = question.trim()

    if (!input) return

    tap()

    const lower = input.toLowerCase()

    let answer =
      'Ishank builds agentic AI products, RAG systems, and thoughtful full-stack experiences. Ask about MediAgent, DeepReview-AI, or the tech stack.'

    if (
      lower.includes('skill') ||
      lower.includes('stack') ||
      lower.includes('tech')
    ) {
      answer =
        'His core stack includes LangGraph, CrewAI, LangChain, PyTorch, FastAPI, React, FAISS, and PostgreSQL.'
    }

    if (lower.includes('medi')) {
      answer =
        'MediAgent is a full-stack AI medical assistant for persistent chat, symptom triage, drug-interaction checks, reminders, and adherence tracking.'
    }

    if (
      lower.includes('project') ||
      lower.includes('work')
    ) {
      answer =
        'Highlights include Aizen-GPT, TechMart AI Support, Job Application Agent, and MediAgent.'
    }

    if (
      lower.includes('contact') ||
      lower.includes('email')
    ) {
      answer = `You can reach Ishank at ${profile.email}.`
    }

    setMessages(current => [
      ...current,
      {
        from: 'user',
        text: input
      },
      {
        from: 'bot',
        text: answer
      }
    ])

    setQuestion('')
  }

  return (
    <div className="assistant-wrap">
      {open && (
        <div className="assistant-panel">
          <div className="assistant-title">
            <span className="status-dot" />

            Portfolio guide

            <button
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
            >
              <X size={16} />
            </button>
          </div>

          <div className="assistant-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.from}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="assistant-input">
            <input
              value={question}
              onChange={event =>
                setQuestion(event.target.value)
              }
              onKeyDown={event =>
                event.key === 'Enter' && respond()
              }
              placeholder="Ask a question"
            />

            <button
              onClick={respond}
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        className="assistant-button magnetic"
        onClick={() => {
          tap()
          setOpen(!open)
        }}
        aria-label="Open portfolio assistant"
      >
        <Bot size={19} />
        <span>Ask Ishank's AI</span>
      </button>
    </div>
  )
}

function LiveProjectSignal({ filter }) {
  const signals = [
    'embedding vectors aligned',
    'agent routing active',
    'inference trace stable',
    'retrieval index synced'
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex(current => (current + 1) % signals.length)
    }, 2400)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="project-live-signal">
      <span>
        <i className="status-dot" /> LIVE BUILD SIGNAL
      </span>

      <b key={index}>
        {filter === 'All'
          ? signals[index]
          : `${filter.toLowerCase()} systems in focus`}
      </b>

      <div className="signal-bars">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}

function LearningTelemetry() {
  const labels = [
    'building models',
    'mapping systems',
    'sharing notes'
  ]

  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive(value => (value + 1) % labels.length)
    }, 2100)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="learning-telemetry">
      <span>
        <i className="status-dot" /> LEARNING TELEMETRY
      </span>

      <div>
        {labels.map((label, index) => (
          <b
            className={index === active ? 'active' : ''}
            key={label}
          >
            {String(index + 1).padStart(2, '0')} / {label}
          </b>
        ))}
      </div>

      <em key={active}>SYNCED</em>
    </div>
  )
}

function ContactForm({ tap }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [ready, setReady] = useState(false)

  const update = event =>
    setForm(current => ({
      ...current,
      [event.target.name]: event.target.value
    }))

  const submit = event => {
    event.preventDefault()

    tap()
    setReady(true)

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${form.name}`
    )

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )

    window.location.href =
      `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <form
      className="contact-form"
      onSubmit={submit}
    >
      <div className="form-heading">
        <span>
          <i className="status-dot" /> SEND A MESSAGE
        </span>

        <small>MAIL CLIENT READY</small>
      </div>

      <label>
        Name

        <input
          required
          name="name"
          value={form.name}
          onChange={update}
          placeholder="Your name"
        />
      </label>

      <label>
        Email

        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={update}
          placeholder="you@example.com"
        />
      </label>

      <label>
        Message

        <textarea
          required
          name="message"
          value={form.message}
          onChange={update}
          placeholder="Tell me a little about your idea..."
          rows="4"
        />
      </label>

      <button
        className="button primary magnetic"
        type="submit"
      >
        <Send size={17} /> Compose email
      </button>

      {ready && (
        <p className="form-note">
          Your email app should now be open with this
          message ready to send.
        </p>
      )}
    </form>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [theme, setTheme] = useState('dark')
  const [retro, setRetro] = useState(false)
  const [audioOn, setAudioOn] = useState(false)

  const cursor = useRef(null)

  const { tap, setAmbient } = usePortfolioSound()

  const visibleProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(
          project => project.category === activeFilter
        )

  const toggleTheme = () =>
    setTheme(value =>
      value === 'dark' ? 'light' : 'dark'
    )

  const toggleAudio = () => {
    const next = !audioOn

    setAudioOn(next)
    setAmbient(next)
    tap()
  }

  useEffect(() => {
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-theme')

    if (stored) {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) {
      return
    }

    document.body.classList.add('has-cursor')

    const move = event => {
      if (cursor.current) {
        cursor.current.style.transform =
          `translate(${event.clientX}px, ${event.clientY}px)`
      }
    }

    const hover = event => {
      cursor.current?.classList.toggle(
        'cursor-active',
        Boolean(
          event.target.closest(
            'a,button,input'
          )
        )
      )
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', hover)

    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', hover)
    }
  }, [])

  useEffect(() => {
    const keys = []

    const sequence = [
      'arrowup',
      'arrowup',
      'arrowdown',
      'arrowdown',
      'arrowleft',
      'arrowright',
      'arrowleft',
      'arrowright'
    ]

    const handler = event => {
      keys.push(event.key.toLowerCase())

      if (keys.length > sequence.length) {
        keys.shift()
      }

      if (
        keys.join('|') ===
        sequence.join('|')
      ) {
        setRetro(value => !value)
        keys.length = 0
      }
    }

    window.addEventListener('keydown', handler)

    return () =>
      window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        }),
      {
        threshold: 0.12
      }
    )

    document
      .querySelectorAll('.reveal-on-scroll')
      .forEach(node => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  return (
    <main
      className={`app ${
        theme === 'light' ? 'light-mode' : ''
      } ${retro ? 'retro-mode' : ''}`}
    >
      <div
        ref={cursor}
        className="custom-cursor"
      />

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header container">
        <button
          className="brand dynamic-brand magnetic"
          onClick={() => {
            tap()
            scrollTo('home')
          }}
          aria-label="Back to top"
        >
          <span
            className="brand-orbit"
            aria-hidden="true"
          >
            <i />
            <b />
            <b />
            <b />
            <em />
          </span>

          <strong>Ishank Mishra</strong>
        </button>

        <nav className={menuOpen ? 'open' : ''}>
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => {
                tap()
                scrollTo(item.toLowerCase())
                setMenuOpen(false)
              }}
            >
              {item}
            </button>
          ))}

          <a
            href={`mailto:${profile.email}`}
            className="nav-mail magnetic"
            onMouseEnter={tap}
          >
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </nav>

        <div className="header-controls">
          <button
            className="icon-toggle"
            onClick={() => {
              tap()
              toggleTheme()
            }}
            aria-label="Toggle light and dark mode"
          >
            {theme === 'dark' ? (
              <Sun size={17} />
            ) : (
              <Moon size={17} />
            )}
          </button>

          <button
            className="icon-toggle audio-toggle"
            onClick={toggleAudio}
            aria-label="Toggle ambient audio"
          >
            {audioOn ? (
              <Volume2 size={17} />
            ) : (
              <VolumeX size={17} />
            )}
          </button>

          <button
            className="menu-toggle"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section
        id="home"
        className="hero container"
      >
        <div className="hero-copy reveal">
          <div className="eyebrow live-badge">
            <span className="status-dot" /> Now building:
            reliable AI systems, end to end
          </div>

          <p className="hero-kicker">
            AI / ML ENGINEER <span>·</span> FULL-STACK BUILDER
          </p>

          <h1>
            Building the <em>intelligence</em>
            <br />
            behind better products.
          </h1>

          <p className="hero-summary">
            {profile.summary}
          </p>

          <div className="hero-actions">
            <button
              className="button primary magnetic"
              onClick={() => {
                tap()
                scrollTo('work')
              }}
            >
              Explore selected work
              <ArrowDownRight size={18} />
            </button>

            {/* View Resume */}
            <a
              className="button ghost magnetic"
              href="/Ishank_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={tap}
            >
              <ExternalLink size={17} />
              View Resume
            </a>
          </div>
        </div>

        <div
          className="hero-art signal-art reveal"
          role="img"
          aria-label="Animated abstract AI signal field"
        >
          <div className="signal-gridfield" />
          <div className="signal-ring ring-one" />
          <div className="signal-ring ring-two" />

          <div className="signal-core">
            <i className="core-layer layer-one" />
            <i className="core-layer layer-two" />
            <i className="core-layer layer-three" />

            <BrainCircuit
              size={58}
              strokeWidth={1.1}
            />
          </div>

          <span className="signal-node node-one" />
          <span className="signal-node node-two" />
          <span className="signal-node node-three" />
          <span className="signal-node node-four" />

          <span className="signal-rune signal-rune-one">
            01
          </span>

          <span className="signal-rune signal-rune-two">
            AI
          </span>
        </div>

        <div className="hero-foot">
          <span>
            <MapPin size={15} /> {profile.location}
          </span>

          <span className="scroll-cue">
            SCROLL TO EXPLORE <i />
          </span>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-grid">
          {stats.map(stat => (
            <div
              className="stat"
              key={stat.label}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        id="experience"
        className="experience-section container"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              01 — EXPERIENCE
            </p>

            <h2>
              Applied research,
              <br />
              <em>made production-ready.</em>
            </h2>
          </div>

          <p>
            Hands-on internship work at the intersection
            of computer vision, high-performance inference,
            and dependable ML delivery.
          </p>
        </div>

        <div className="experience-list">
          {experience.map((item, index) => (
            <article
              className="experience-card reveal-on-scroll"
              key={item.company}
            >
              <div className="experience-index">
                0{index + 1}
              </div>

              <div className="experience-title">
                <p>
                  {item.period} · {item.location}
                </p>

                <h3>
                  {item.role}
                  <span>@ {item.company}</span>
                </h3>
              </div>

              <ul>
                {item.highlights.map(highlight => (
                  <li key={highlight}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        id="work"
        className="section container"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              02 — SELECTED WORK
            </p>

            <h2>
              Ideas, shaped into
              <br />
              <em>working systems.</em>
            </h2>
          </div>

          <p>
            Filter by discipline, then open a project card
            to explore the work on GitHub.
          </p>
        </div>

        <div
          className="filter-bar"
          aria-label="Filter projects"
        >
          {filters.map(filter => (
            <button
              className={
                activeFilter === filter
                  ? 'active'
                  : ''
              }
              onClick={() => {
                tap()
                setActiveFilter(filter)
              }}
              key={filter}
            >
              {filter}
            </button>
          ))}
        </div>

        <LiveProjectSignal
          filter={activeFilter}
        />

        <div className="project-grid">
          {visibleProjects.map(project => (
            <a
              className={`project-card ${project.accent} reveal-on-scroll`}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              key={project.name}
              onMouseEnter={tap}
            >
              <div className="project-top">
                <span>{project.number}</span>

                <span className="project-open">
                  Open project
                  <ExternalLink size={16} />
                </span>
              </div>

              <figure className="project-visual">
                <img
                  src={project.thumbnail}
                  alt=""
                />

                <span className="visual-chip">
                  {project.category}
                </span>

                <span className="visual-glow" />
              </figure>

              <div>
                <p className="project-kind">
                  {project.kind}
                </p>

                <h3>{project.name}</h3>

                <p className="project-impact">
                  {project.impact}
                </p>
              </div>

              <div className="tags">
                {project.stack.map(item => (
                  <span key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <div className="all-work">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={tap}
          >
            Browse all projects on GitHub
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section className="bento-section">
        <div className="container bento-grid">
          <article className="bento-intro reveal-on-scroll">
            <p className="eyebrow">
              BEYOND THE README
            </p>

            <h2>
              How I think
              <br />
              through a build.
            </h2>

            <p>
              Every project starts with a useful question,
              a deliberate system, and an outcome that earns
              its complexity.
            </p>
          </article>

          {caseStudies.map((study, index) => (
            <article
              className="case-card reveal-on-scroll"
              key={study.project}
            >
              <span>
                CASE STUDY 0{index + 1}
              </span>

              <h3>{study.project}</h3>

              <dl>
                <div>
                  <dt>THE PROBLEM</dt>
                  <dd>{study.problem}</dd>
                </div>

                <div>
                  <dt>THE APPROACH</dt>
                  <dd>{study.approach}</dd>
                </div>

                <div>
                  <dt>THE OUTCOME</dt>
                  <dd>{study.outcome}</dd>
                </div>
              </dl>
            </article>
          ))}

          <LiveTerminal
            onRetro={() =>
              setRetro(value => !value)
            }
            onTheme={toggleTheme}
            tap={tap}
          />
        </div>
      </section>

      <section className="expertise-section">
        <div
          className="expertise-neural"
          aria-hidden="true"
        >
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                03 — EXPERTISE
              </p>

              <h2>
                A practical stack for
                <br />
                <em>intelligent products.</em>
              </h2>
            </div>

            <p>
              Tools matter when they help you move from a
              fuzzy problem to a reliable solution.
            </p>
          </div>

          <div className="dl-readout">
            <span>
              <i className="status-dot" /> DEEP LEARNING LAB
            </span>

            <b>
              TRAINING / INFERENCE / DELIVERY
            </b>

            <em>01.00</em>
          </div>

          <div className="skill-grid">
            {skillGroups.map(group => (
              <article
                className="skill-card reveal-on-scroll"
                key={group.title}
              >
                <div className="skill-icon">
                  <IconFor type={group.icon} />
                </div>

                <h3>{group.title}</h3>

                <div className="skill-list">
                  {group.skills.map(skill => (
                    <span key={skill}>
                      <Check size={13} /> {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="journey"
        className="section container journey"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              04 — THE JOURNEY
            </p>

            <h2>
              Always learning.
              <br />
              <em>Always building.</em>
            </h2>
          </div>

          <p>
            Experimentation, sharing knowledge, and a bias
            toward useful work.
          </p>
        </div>

        <LearningTelemetry />

        <div className="journey-grid">
          <div className="timeline">
            <article>
              <i className="timeline-marker" />

              <span>
                2023 — 2027
              </span>

              <h3>
                B.Tech, Computer Software Engineering
              </h3>

              <p>
                Shankara Institute of Technology, Jaipur ·
                relevant study in ML, deep learning, DSA,
                algorithms, and DBMS.
              </p>
            </article>

            <article>
              <i className="timeline-marker" />

              <span>NOW</span>

              <h3>
                Agentic systems & RAG
              </h3>

              <p>
                Exploring the patterns that make LLM
                applications more capable and dependable.
              </p>
            </article>

            <article>
              <i className="timeline-marker" />

              <span>350+</span>

              <h3>
                DSA problems solved
              </h3>

              <p>
                Building problem-solving speed through
                LeetCode, contests, and the Competitive
                Programming Club.
              </p>
            </article>
          </div>

          <div className="learning-card reveal-on-scroll">
            <div
              className="learning-radar"
              aria-hidden="true"
            >
              <i />
              <i />
              <i />
            </div>

            <GraduationCap size={24} />

            <p className="card-overline">
              LEARNING IN PUBLIC
            </p>

            <h3>
              Notes from the build loop.
            </h3>

            {learning.map(
              ([name, description, href]) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  key={name}
                  onMouseEnter={tap}
                >
                  <span>
                    <b>{name}</b>
                    <small>{description}</small>
                  </span>

                  <ArrowUpRight size={17} />
                </a>
              )
            )}
          </div>
        </div>
      </section>

      <section className="cert-section">
        <div
          className="certificate-noise"
          aria-hidden="true"
        />

        <div className="container">
          <div className="cert-heading">
            <div>
              <p className="eyebrow">
                RECOGNITION
              </p>

              <h2>
                Proof of the
                <br />
                <em>practice.</em>
              </h2>
            </div>

            <Award size={42} />
          </div>

          <div className="credential-console">
            <span>
              <i className="status-dot" /> CREDENTIAL SCANNER
            </span>

            <b>2 / 2 VERIFIED</b>

            <div>
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="cert-grid">
            {certifications.map(
              (cert, index) => (
                <article
                  className={`cert-card ${cert.color} reveal-on-scroll`}
                  key={cert.title}
                >
                  <span className="cert-mark">
                    {cert.issuer.charAt(0)}
                  </span>

                  <div>
                    <p>
                      {cert.issuer}{' '}
                      <b>{cert.year}</b>
                    </p>

                    <h3>{cert.title}</h3>

                    <small>
                      Credential verified{' '}
                      <Check size={13} />
                    </small>
                  </div>

                  <em>
                    0{index + 1}
                  </em>
                </article>
              )
            )}
          </div>

          <div className="reference-note">
            <Mail size={16} />

            <span>
              <b>
                References available on request.
              </b>{' '}
              Authentic client or team testimonials can be
              added here when supplied.
            </span>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="contact-section container"
      >
        <div className="contact-layout">
          <div className="contact-card">
            <p className="eyebrow">
              05 — LET’S CONNECT
            </p>

            <h2>
              Have an ambitious
              <br />
              idea in mind?
            </h2>

            <p>
              Let’s turn it into something thoughtful,
              useful, and real.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="contact-email magnetic"
              onMouseEnter={tap}
            >
              {profile.email}
              <ArrowUpRight />
            </a>

            <div className="contact-socials">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={tap}
              >
                <Github size={18} />
                GitHub
              </a>

              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={tap}
              >
                <Linkedin size={18} />
                LinkedIn
              </a>

              <a
                href={profile.links.kaggle}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={tap}
              >
                Kaggle
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <ContactForm tap={tap} />
        </div>
      </section>

      <footer className="footer container">
        <span>
          © {new Date().getFullYear()} Ishank Mishra
        </span>

        <span>
          Designed with curiosity & code.
        </span>

        <button
          onClick={() => {
            tap()
            scrollTo('home')
          }}
        >
          Back to top ↑
        </button>
      </footer>

      <PortfolioAssistant tap={tap} />
    </main>
  )
}
