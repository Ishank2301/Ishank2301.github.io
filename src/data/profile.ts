export const profile = {
  name: 'Ishank Mishra',
  initials: 'IM',
  role: 'AI/ML Engineer & Full-Stack Developer',
  location: 'Jaipur, India',
  email: 'ishankmishra579@gmail.com',
  headline: 'AI/ML engineer building scalable agentic systems and production-ready AI products.',
  summary: 'AI/ML Engineer and Full Stack Developer specializing in LLM orchestration, multi-agent systems, and end-to-end AI application development. I bring six months of hands-on internship experience in computer vision and deep learning, alongside independent work building RAG pipelines, fine-tuned LLMs, and AI-powered web applications.',
  links: {
    github: 'https://github.com/Ishank2301',
    linkedin: 'https://www.linkedin.com/in/ishank2301/',
    kaggle: 'https://www.kaggle.com/ishank2005'
  }
}

export const stats = [
  { value: '2023—27', label: 'B.Tech journey' },
  { value: '6 mo', label: 'internship experience' },
  { value: '10K+', label: 'manufacturing images' },
  { value: 'Top 10', label: 'national hackathon' }
]

export const experience = [
  {
    role: 'AI/ML Intern', company: 'Labmentix', period: 'Jun 2026 — Aug 2026', location: 'Remote',
    highlights: [
      'Engineered and deployed CNN-based defect detection with ResNet and MobileNet configurations across 10,000+ manufacturing images.',
      'Improved classification accuracy by 14% and reduced inference latency by 35 ms through HPO, grid-search scheduling, and data augmentation.',
      'Built scalable PyTorch DDP training and automated ETL for cleaning, balancing, and preprocessing 50 GB+ of multi-spectral image frames.'
    ]
  },
  {
    role: 'Machine Learning Intern', company: 'CodeAlpha', period: 'May 2026', location: 'Remote',
    highlights: [
      'Benchmarked a from-scratch CNN and fine-tuned MobileNetV2 on FER-2013 (35,000+ images across 7 classes).',
      'Improved test accuracy from 52.27% to 59.46% and addressed a 16.6× class imbalance with weighting and targeted augmentation.',
      'Optimized models with TensorFlow Lite quantization for up to 108× faster inference and a 74% smaller model; shipped desktop and Flask webcam apps.'
    ]
  }
]

export const projects = [
  {
    name: 'Aizen-GPT',
    kind: 'GPT built from scratch',
    number: '01',
    href: 'https://github.com/Ishank2301',
    stack: ['Python', 'PyTorch', 'Transformers', 'BPE'],
    thumbnail: '/projects/aizen-gpt.svg',
    impact: 'A GPT-style language model built end-to-end, from neural-network primitives and attention blocks to a custom tokenizer, KV cache, and training loop.',
    accent: 'violet'
    , category: 'ML'
  },
  {
    name: 'TechMart AI Support',
    kind: 'Multi-agent support platform',
    number: '02',
    href: 'https://github.com/Ishank2301',
    stack: ['FastAPI', 'Next.js', 'LangChain', 'FAISS'],
    thumbnail: '/projects/techmart-support.svg',
    impact: 'Five specialist support agents, RAG-grounded answers, JWT auth, persistent chats, and ticket escalation across email and WhatsApp.',
    accent: 'cyan'
    , category: 'Full Stack'
  },
  {
    name: 'Job Application Agent',
    kind: 'Autonomous job search',
    number: '03',
    href: 'https://github.com/Ishank2301',
    stack: ['LangGraph', 'LangChain', 'Ollama', 'Streamlit'],
    thumbnail: '/projects/job-agent.svg',
    impact: 'An autonomous workflow that gathers listings, scores semantic fit, finds recruiter contacts, and coordinates the process with local LLMs.',
    accent: 'coral'
    , category: 'RAG'
  },
  {
    name: 'MediAgent',
    kind: 'AI medical assistant',
    number: '04',
    href: 'https://github.com/Ishank2301/MediAgent',
    stack: ['FastAPI', 'Gemini API', 'React', 'SQLite'],
    thumbnail: '/projects/mediagent.svg',
    impact: 'A full-stack medical assistant with persistent chat, symptom triage, drug-interaction checks, appointment reminders, and adherence tracking.',
    accent: 'lime'
    , category: 'Agentic AI'
  }
]

export const skillGroups = [
  { title: 'Agentic AI', icon: 'brain', skills: ['LangGraph', 'CrewAI', 'AutoGen', 'LangChain', 'OpenAI APIs', 'Ollama'] },
  { title: 'Machine learning', icon: 'spark', skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras', 'OpenCV', 'Transformers'] },
  { title: 'Full-stack engineering', icon: 'code', skills: ['FastAPI', 'React', 'Next.js', 'Tailwind CSS', 'SQLAlchemy', 'REST APIs'] },
  { title: 'Retrieval & data', icon: 'database', skills: ['PostgreSQL', 'FAISS', 'ChromaDB', 'Pinecone', 'BM25', 'SQLite'] }
]

export const learning = [
  ['Comprehensive ML Handbook', 'Practical notes, notebooks, and foundations.', 'https://github.com/Ishank2301/Comprehensive-ML-Handbook'],
  ['End-to-End LangGraph Agents', 'Hands-on multi-agent systems and patterns.', 'https://github.com/Ishank2301/End-To-End-Langraph-Agents'],
  ['NumPy from scratch', 'Learning the foundations by rebuilding them.', 'https://github.com/Ishank2301/Numpy_from_scratch']
]

export const certifications = [
  { issuer: 'Deloitte', title: 'Technology Job Simulation', year: 'Forage', color: 'violet' },
  { issuer: 'Udemy', title: 'Machine Learning A–Z: AI, Python & R', year: 'Certified', color: 'coral' }
]

export const caseStudies = [
  {
    project: 'TechMart AI Support',
    problem: 'Support requests span billing, technical, product, complaint, and FAQ needs—one generic bot is not enough.',
    approach: 'Route messages to five specialised agents and ground answers in a FAISS-indexed knowledge base.',
    outcome: 'A support platform with persistent chats, ticket creation, and escalation notifications.'
  },
  {
    project: 'Aizen-GPT',
    problem: 'The best way to understand a transformer is to build its moving parts, not only call an API.',
    approach: 'Implement attention, transformer blocks, BPE tokenization, embeddings, a KV cache, and the training loop from first principles.',
    outcome: 'A custom GPT-style model with an end-to-end text-generation workflow.'
  }
]
