import { useState } from "react";

const phases = [
  {
    id: 1, title: "LLM Fundamentals", duration: "Month 1–2",
    accent: "#2563eb", tint: "#eff6ff", midtint: "#dbeafe", numColor: "#bfdbfe",
    goal: "Understand how LLMs work under the hood. Tokens, prompts, embeddings, function calling — this is the bedrock every future concept builds on.",
    tracks: [
      { name: "LLM Core Concepts", items: ["Tokens & tokenization: how text is chunked, token counting, cost math", "Temperature, top_p, top_k: what they control and when to tune them", "Context window: limits, truncation, what fits and what doesn't", "Embeddings: vector representation, cosine similarity, semantic meaning", "Prompt patterns: zero-shot, few-shot, chain-of-thought, role prompting", "System vs Human vs Assistant message roles — why structure matters", "Function calling / Tool use: LLMs calling tools via JSON schema", "Structured output: force LLM to return Pydantic-compatible JSON", "Hallucination: why it happens, detection, mitigation patterns"] },
      { name: "LangChain Core", items: ["LangChain architecture: chains, runnables, LCEL expression language", "ChatOpenAI / ChatAnthropic model wrappers and configuration", "Prompt templates: ChatPromptTemplate, partial variables", "Output parsers: StrOutputParser, PydanticOutputParser, JsonOutputParser", "Chaining with pipe operator: prompt | model | parser", "Callbacks and logging in LangChain for debugging", "Message history: in-chain memory management across turns"] },
      { name: "Python Architecture", items: ["Modular project layout: src/, core/, api/, services/, schemas/, utils/", "Pydantic v2: models, validators, settings management", "Async Python: asyncio, async/await — essential for LLM streaming", "Environment config: python-decouple, .env, secrets never hardcoded", "Design patterns: Factory, Repository, Dependency Injection", "Custom exceptions, global error handling, structured logging"] },
      { name: "DSA — Start", items: ["Arrays & Strings: two pointers, sliding window patterns", "Hash Maps & Sets: frequency count, O(1) lookup patterns", "3 LeetCode Easy problems per week — focus on pattern recognition"] },
    ],
    hands_on: [
      { title: "LLM Playground CLI", desc: "Build a CLI tool to experiment with temperature, top_p, system prompts, and token counting live. LangChain LCEL pipe syntax. Pydantic-enforced structured output.", tags: ["LangChain", "LCEL", "Pydantic", "CLI"] },
      { title: "Prompt Engineering Workbench", desc: "Streamlit app testing zero-shot vs few-shot vs CoT side by side. Display token usage, cost per call. Add function calling demo where the LLM picks which tool to invoke.", tags: ["Streamlit", "LangChain", "Function Calling"] },
    ],
  },
  {
    id: 2, title: "Local Models & HuggingFace", duration: "Month 2–3",
    accent: "#059669", tint: "#ecfdf5", midtint: "#d1fae5", numColor: "#a7f3d0",
    goal: "Run models locally. No API bills, no latency. Know when local beats cloud and how to abstract providers so you can swap them with one config flag.",
    tracks: [
      { name: "Ollama — Local LLMs", items: ["Install and serve Ollama: run Llama3, Mistral, Gemma locally", "ollama pull, ollama run, model management commands", "Ollama REST API: integrate into Python apps with httpx", "LangChain ChatOllama wrapper — drop-in OpenAI replacement", "Quantized models: Q4 vs Q8 — quality vs speed tradeoffs", "Streaming local model responses token by token", "Modelfile: create custom system-prompted local models"] },
      { name: "HuggingFace Models", items: ["HuggingFace Hub: browse, download, run models locally", "Transformers pipeline: text-generation, summarization, classification", "Sentence-Transformers: local embeddings with all-MiniLM, BGE", "HuggingFacePipeline in LangChain: plug local HF into chains", "Tokenizers: BPE tokenization, pad/truncate strategies", "Model quantization: 4-bit loading with BitsAndBytes", "PEFT / LoRA: fine-tuning awareness — know what it is and when needed"] },
      { name: "Model Abstraction Pattern", items: ["Design a model factory: swap OpenAI / Ollama / HF via one config", "Abstract LLM behind an interface — never hardcode a provider", "Embedding model abstraction: same swap pattern for cloud vs local", "Cost-aware routing: local for cheap tasks, cloud for complex ones"] },
      { name: "DSA — Fundamentals", items: ["Stacks & Queues: monotonic stack, queue simulation", "Linked Lists: reversal, fast-slow pointer, cycle detection", "4 problems/week (Easy + Easy-Medium)"] },
    ],
    hands_on: [
      { title: "Local AI Assistant (Zero API Keys)", desc: "Streamlit chat powered entirely by Ollama. Model switcher for Llama3 / Mistral / Gemma. Show tokens/sec per model. HuggingFace sentence-transformers for all embeddings.", tags: ["Ollama", "ChatOllama", "HuggingFace", "Streamlit"] },
    ],
  },
  {
    id: 3, title: "RAG Systems", duration: "Month 3–5",
    accent: "#dc2626", tint: "#fef2f2", midtint: "#fecaca", numColor: "#fca5a5",
    goal: "Build production-grade RAG pipelines. Know every component: chunking, embedding, storing, retrieving, reranking — and why each decision matters.",
    tracks: [
      { name: "Document Processing", items: ["Document loaders: PDF (PyMuPDF), web pages, CSV, Notion, GitHub", "Chunking strategies: fixed-size, sentence-aware, recursive splitting", "Semantic chunking: split by meaning, not character count", "Chunk size vs overlap tradeoffs — what breaks retrieval quality", "Metadata enrichment: attach source, page, section to every chunk", "Preprocessing: clean HTML, remove noise, normalize text"] },
      { name: "Embeddings & Vector DBs", items: ["Embedding models: OpenAI text-embedding-3, BGE, sentence-transformers", "pgvector: setup, IVFFlat + HNSW indexing, similarity search in SQL", "Chroma: local in-memory and persistent for fast prototyping", "FAISS: in-memory vector index for local dev and testing", "Indexing pipeline: chunk → embed → upsert with metadata", "Similarity metrics: cosine vs dot product vs L2", "Namespace / collection design for multi-tenant RAG"] },
      { name: "Retrieval & Reranking", items: ["Dense retrieval: pure vector similarity search", "Sparse retrieval: BM25 keyword search with rank_bm25", "Hybrid retrieval: dense + sparse merged via Reciprocal Rank Fusion", "Reranking: BGE reranker, Cohere Rerank for precision boost", "MMR: Maximal Marginal Relevance for diverse results", "Self-query retrieval: LLM parses query into metadata filters", "Contextual compression: extract only relevant sentences"] },
      { name: "LlamaIndex", items: ["LlamaIndex vs LangChain: when to use each", "LlamaIndex nodes: Document → Node → Index pipeline", "VectorStoreIndex, SummaryIndex, RouterQueryEngine", "Sub-question engine: auto-decompose complex queries", "LlamaIndex + pgvector integration", "LlamaIndex Workflows: event-driven RAG orchestration"] },
      { name: "DSA — Patterns", items: ["Binary Search: all 5 variants (bounds, rotated array)", "Recursion & Backtracking: permutations, combinations, subsets", "5 problems/week (Medium focus)"] },
    ],
    hands_on: [
      { title: "Basic RAG (LangChain + pgvector)", desc: "Ingest PDFs → chunk → BGE embeddings → pgvector → cosine retrieval → LLM answer with source citations. Streamlit UI.", tags: ["LangChain", "pgvector", "BGE", "Streamlit"] },
      { title: "Production RAG: Hybrid + Reranking", desc: "Add BM25 + RRF + BGE reranker + metadata filters + contextual compression. Separate Ingestion and Retrieval services. FastAPI async endpoints.", tags: ["Hybrid Search", "RRF", "Reranking", "FastAPI", "LlamaIndex"] },
    ],
  },
  {
    id: 4, title: "LangGraph Orchestration", duration: "Month 5–7",
    accent: "#7c3aed", tint: "#f5f3ff", midtint: "#ede9fe", numColor: "#ddd6fe",
    goal: "Master stateful agent orchestration. Design agent flows as graphs: nodes, edges, state, checkpoints, memory tiers. The core skill of agentic AI.",
    tracks: [
      { name: "LangGraph Core", items: ["StateGraph: nodes, edges, conditional routing with branching", "TypedDict state schema: shared state flowing through every node", "Node types: tool nodes, LLM nodes, router nodes, aggregator nodes", "Conditional edges: route based on state values — your agent's brain", "Parallel execution: fan-out / fan-in for concurrent node runs", "invoke vs stream vs astream — when to use each", "Streaming: astream_events for token-level and node-level output", "Error handling: try/except inside nodes, retry edges on failure"] },
      { name: "State & Checkpoints", items: ["In-graph memory: accumulate messages across turns in state", "Short-term memory: sliding window over message list", "Checkpointers: MemorySaver (dev), PostgresSaver (prod), RedisSaver", "Persistence: resume graph run using thread_id after interruption", "Human-in-the-loop: interrupt_before, await approval, resume", "Cross-run memory: retrieve past conversations from PostgreSQL", "State reducers: custom merge logic for complex state fields"] },
      { name: "Agent Patterns", items: ["ReAct pattern: Reason → Act → Observe loop as a graph", "Tool definition: @tool decorator, typed inputs, descriptive docstrings", "ToolNode: auto-execute tools, inject results into state", "Planning agent: LLM generates plan, executor runs each step", "Reflection agent: agent critiques and improves its own output", "Self-correction loop: execute → evaluate → fix until done"] },
      { name: "Memory Architecture", items: ["Redis: hot memory — session context, fast lookups, TTL-based expiry", "PostgreSQL: warm memory — full conversation history, user profiles", "Vector memory: embed past conversations, retrieve semantically", "Memory tiering: hot → warm → cold archive strategy", "Memory summarization: compress old messages to save context window", "Memory injection: pull relevant memories into system prompt at runtime"] },
      { name: "DSA — Trees & Graphs", items: ["Binary Trees: DFS (inorder, preorder, postorder), BFS level order", "BST: insert, delete, validate, LCA", "Graphs: BFS shortest path, DFS, topological sort, cycle detection", "6 problems/week (Medium)"] },
    ],
    hands_on: [
      { title: "Stateful Conversational Agent", desc: "LangGraph agent with PostgresSaver. Tools: web search, calculator, datetime. State persists across browser sessions via thread_id. Streamlit shows graph state in sidebar.", tags: ["LangGraph", "PostgresSaver", "Tools", "Streamlit"] },
      { title: "Self-Correcting Code Agent", desc: "Write code → execute → observe errors → correct → retry until passing. Reflection node critiques quality. Max 5 retries guardrail. Node-level streaming to UI.", tags: ["LangGraph", "ReAct", "Self-Correction", "Streaming"] },
    ],
  },
  {
    id: 5, title: "Multi-Agent Systems", duration: "Month 7–9",
    accent: "#d97706", tint: "#fffbeb", midtint: "#fef3c7", numColor: "#fde68a",
    goal: "Build systems where multiple specialized agents collaborate. Supervisor coordination, shared memory, parallel execution, and inter-agent communication.",
    tracks: [
      { name: "Architecture Patterns", items: ["Supervisor pattern: orchestrator LLM routes to specialist agents", "Subgraph pattern: each agent is its own compiled LangGraph subgraph", "Shared state vs message passing between agents", "Agent handoff: transfer_to_agent() with full context passing", "Sequential pipeline: output of Agent A becomes input of Agent B", "Parallel agents: run 3 agents simultaneously, aggregate results", "Debate pattern: two agents argue, third agent judges"] },
      { name: "Advanced Agent Concepts", items: ["Dynamic tool selection: agent builds its tool list at runtime", "Long-horizon planning: decompose goal → subtasks → assign agents", "Autonomous decision loops: agent decides independently when done", "Browser agent: Playwright-based web automation as tool", "Code interpreter agent: sandboxed Python execution environment", "Scheduled agents: cron-triggered or webhook-event-driven"] },
      { name: "Advanced Memory", items: ["Shared memory: common Redis namespace for cross-agent state", "Agent-specific memory: isolated PostgreSQL store per agent type", "Episodic memory: store significant events, retrieve by relevance", "Semantic memory: factual knowledge in vector DB, on-demand retrieval", "Working memory: active context window management across calls", "Memory conflict resolution: last-writer-wins vs merge strategies"] },
      { name: "LangSmith", items: ["Setup: LANGCHAIN_TRACING_V2, project organization", "Trace every agent run: node, tool, and LLM call level", "Latency analysis: find graph bottlenecks with waterfall views", "Token usage and cost per run: track burn rate across agents", "Evaluation datasets: create test cases, run automated evals", "Human annotation: flag bad runs, compare prompt versions A/B", "Alerting: detect failure rate or cost spikes above threshold"] },
      { name: "DSA — Dynamic Programming", items: ["DP patterns: 1D (house robber), 2D (grid paths, edit distance)", "Memoization: top-down recursive with functools.cache", "Tabulation: bottom-up iterative with space optimization", "Interval problems, 0/1 knapsack variants", "7 problems/week (Medium + some Hard)"] },
    ],
    hands_on: [
      { title: "Multi-Agent Research Platform", desc: "Supervisor routes to Search Agent, Analysis Agent, Writer Agent. Shared PostgreSQL memory. LangSmith tracing for every run. Streamlit shows active agent in real time.", tags: ["Multi-Agent", "Supervisor", "LangSmith", "Tavily"] },
      { title: "Autonomous Goal-Execution Agent", desc: "Receive high-level goal, decompose into subtasks, assign to subgraphs, parallel execute. HITL approval for web actions. Full audit trail in PostgreSQL.", tags: ["Autonomous", "Subgraphs", "HITL", "Planning"] },
    ],
  },
  {
    id: 6, title: "Production & Containers", duration: "Month 9–11",
    accent: "#0891b2", tint: "#ecfeff", midtint: "#cffafe", numColor: "#a5f3fc",
    goal: "Ship production-grade AI systems. Containerize everything. Secure the backend. Offload long-running agents to async Celery workers.",
    tracks: [
      { name: "FastAPI Production", items: ["Modular routers: /api/v1/agents, /memory, /tools, /users", "JWT auth: OAuth2PasswordBearer, refresh tokens, blacklist in Redis", "RBAC: role-based control — which users trigger which agents", "Rate limiting: slowapi + Redis — per-user and per-endpoint", "Request/response schemas: Pydantic v2 for all I/O", "StreamingResponse: real-time agent token streaming to client", "Webhook endpoints: trigger agents from external events", "API versioning: /v1 and /v2 with backward compatibility"] },
      { name: "Async Job Queues", items: ["Celery + Redis: offload long agent runs to background workers", "Task states: PENDING → STARTED → SUCCESS / FAILURE", "Polling: client polls /tasks/{id} for result", "WebSocket: push agent result to client when finished", "Retry: exponential backoff for failed agent runs", "Priority queues: VIP users get priority worker allocation", "Celery beat: schedule recurring agent tasks with cron"] },
      { name: "Guardrails & Safety", items: ["Input guardrails: prompt injection detection, PII scrubbing", "Output guardrails: schema validation, hallucination scoring", "Guardrails AI library: custom Rails and validators", "LLM call rate limiting per user (cost protection)", "Audit logging: every agent action with user_id, timestamp, cost", "Data encryption: sensitive fields encrypted at rest", "Secrets management: Key Vault pattern — never hardcode credentials"] },
      { name: "Docker & Compose", items: ["Dockerfile for FastAPI: multi-stage builds, slim Python images", "Dockerfile for Streamlit: minimal, production-ready", "docker-compose.yml: FastAPI + Streamlit + PostgreSQL + Redis + Celery", "Environment parity: dev / staging / prod via .env files", "Volume mounts: persist PostgreSQL and Redis data", "Health checks: HEALTHCHECK for every service", "Networking: internal service discovery, expose only needed ports"] },
      { name: "DSA — Advanced", items: ["Heap / Priority Queue: top-k, merge k sorted, streaming median", "Trie: prefix search, word dictionary problems", "Union Find: connected components, island variants", "NeetCode 150: work through the full structured list", "8–10 problems/week with timed 45-min sessions", "Mock interviews: 2x/week on Pramp or Interviewing.io"] },
    ],
    hands_on: [
      { title: "Dockerized AI Backend", desc: "Containerize multi-agent platform: FastAPI + Streamlit + PostgreSQL + Redis + Celery in docker-compose. JWT auth. Full guardrails. WebSocket push when agent finishes.", tags: ["Docker", "Celery", "FastAPI", "WebSocket", "JWT"] },
      { title: "Capstone — Autonomous Agent Platform", desc: "Full product: create agents, define tools and goals, trigger runs. Async Celery. WebSocket status. Full RBAC. Cost tracking per user per run. LangSmith traces. Audit logs. All in Docker.", tags: ["Full Stack", "RBAC", "WebSocket", "LangSmith", "Docker"] },
    ],
  },
  {
    id: 7, title: "Azure Cloud Deployment", duration: "Month 12–14",
    accent: "#4f46e5", tint: "#eef2ff", midtint: "#e0e7ff", numColor: "#c7d2fe",
    goal: "Deploy your agents to Azure. Go from docker-compose to real cloud infrastructure. Use Azure-native AI services for enterprise-grade scale.",
    tracks: [
      { name: "Azure Fundamentals", items: ["Resource hierarchy: subscriptions, resource groups, regions", "Azure CLI + Portal: deploy and manage resources from terminal", "Azure Container Registry (ACR): push Docker images to private registry", "Azure Container Apps: deploy FastAPI and Streamlit with autoscaling", "Azure Database for PostgreSQL: managed DB with pgvector extension", "Azure Cache for Redis: managed Redis for sessions and queues", "Azure Key Vault: store all API keys and secrets — never in code"] },
      { name: "Azure AI Services", items: ["Azure OpenAI Service: GPT-4o and embeddings via Azure endpoint", "Azure AI Search: enterprise RAG with vector + hybrid search", "Azure AI Foundry: manage, evaluate, monitor AI models in production", "Azure Blob Storage: documents, agent artifacts, logs at scale", "Azure Service Bus: replace Celery + Redis with native message queue", "Managed Identity: authenticate between Azure services without keys"] },
      { name: "CI/CD & Operations", items: ["GitHub Actions: build → test → push to ACR → deploy on merge", "Environment promotion: dev → staging → prod with gates", "Azure Monitor + Application Insights: centralized log aggregation", "Autoscaling: Container Apps scale-to-zero and scale-out rules", "Cost monitoring: budgets, alerts, optimize resource spend", "Blue-green deployment: zero-downtime agent updates", "Rollback: keep previous image version, instant revert on failure"] },
      { name: "Interview Prep", items: ["System design: 5 AI systems (chatbot scale, 1M-doc RAG, feed)", "Add AI twist to each classic design problem", "Behavioral: STAR stories from all 5+ projects you built", "NeetCode 150: complete remaining, revisit weak patterns", "Mock interviews: 3x/week — Pramp, Interviewing.io, or peer pairs", "Read: key chapters of Designing Data-Intensive Applications"] },
    ],
    hands_on: [
      { title: "Deploy Agent Platform to Azure", desc: "Push to ACR. Deploy FastAPI + Streamlit to Container Apps. Azure PostgreSQL + Redis. Secrets in Key Vault. GitHub Actions CI/CD pipeline. Autoscaling rules for Celery workers.", tags: ["Azure", "Container Apps", "ACR", "Key Vault", "CI/CD"] },
      { title: "Azure AI Search RAG", desc: "Replace pgvector with Azure AI Search. Ingest to Blob Storage, hybrid index. Plug into LangGraph agent. Use Azure OpenAI endpoint. Compare retrieval quality and latency vs local.", tags: ["Azure AI Search", "Azure OpenAI", "Blob Storage", "LangGraph"] },
    ],
  },
];

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeTrack, setActiveTrack] = useState(0);
  const p = phases[activePhase];

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: p.tint, minHeight: "100vh", width: "100%", color: "#1a1a1a", transition: "background 0.45s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
        .phase-btn { transition: all 0.2s; }
        .phase-btn:hover { filter: brightness(0.97); }
        .ho-card { transition: transform 0.2s, box-shadow 0.2s; }
        .ho-card:hover { transform: translateY(-2px); }
        .track-pill { transition: all 0.2s; }
      `}</style>

      {/* TOP BAR */}
      <div style={{ background: "#1a1a1a", padding: "11px clamp(24px, 4vw, 72px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ color: p.accent, fontWeight: "800", fontSize: "12px", letterSpacing: "3px", transition: "color 0.4s" }}>AGENTIC AI</span>
          <span style={{ color: "#333" }}>·</span>
          <span style={{ color: "#555", fontSize: "11px", letterSpacing: "1.5px" }}>14-MONTH ENGINEER ROADMAP</span>
        </div>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {phases.map((ph, i) => (
            <button key={i} onClick={() => { setActivePhase(i); setActiveTrack(0); }} style={{
              width: i === activePhase ? "28px" : "8px", height: "8px",
              borderRadius: "4px", border: "none", padding: 0,
              background: i === activePhase ? ph.accent : "#2a2a2a",
              cursor: "pointer", transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>

      {/* HERO */}
      <div style={{ padding: "56px clamp(24px, 4vw, 72px) 44px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "end" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
              <div style={{ width: "36px", height: "2px", background: p.accent, transition: "background 0.4s" }} />
              <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "3px", color: p.accent, transition: "color 0.4s" }}>
                FROM GENAI DEV TO AI ARCHITECT
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 5vw, 68px)", fontWeight: "900", lineHeight: "1.0", letterSpacing: "-2px", color: "#1a1a1a", marginBottom: "22px" }}>
              Build AI<br />
              <span style={{ fontStyle: "italic", color: p.accent, transition: "color 0.4s" }}>Agents</span><br />
              That Ship.
            </h1>
            <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.85", maxWidth: "420px" }}>
              Learn by building. Think as an architect, not a programmer. Every concept grounded in a real project.
            </p>
          </div>

          {/* Phase selector grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {phases.map((ph, i) => (
              <button key={i} className="phase-btn" onClick={() => { setActivePhase(i); setActiveTrack(0); }} style={{
                background: activePhase === i ? "#1a1a1a" : "#fff",
                border: `1.5px solid ${activePhase === i ? "#1a1a1a" : ph.midtint}`,
                borderRadius: "12px", padding: "14px 16px",
                textAlign: "left", cursor: "pointer",
              }}>
                <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "2px", color: ph.accent, marginBottom: "4px", opacity: activePhase === i ? 1 : 0.65 }}>
                  {String(i + 1).padStart(2, "0")} · {ph.duration}
                </div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: activePhase === i ? "#fff" : "#333", lineHeight: "1.3" }}>
                  {ph.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ height: "1px", background: p.midtint, transition: "background 0.4s" }} />

      {/* MAIN CONTENT */}
      <div style={{ padding: "0 clamp(24px, 4vw, 72px) 72px" }}>

        {/* Phase header */}
        <div style={{
          padding: "40px 0 32px", display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", gap: "40px",
          borderBottom: `1.5px solid ${p.midtint}`, marginBottom: "32px",
          transition: "border-color 0.4s",
        }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{
              fontFamily: "'Playfair Display', serif", fontSize: "104px", fontWeight: "900",
              color: p.numColor, lineHeight: "1", userSelect: "none", flexShrink: 0,
              transition: "color 0.4s",
            }}>
              {String(activePhase + 1).padStart(2, "0")}
            </span>
            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "3px", color: p.accent, marginBottom: "6px", transition: "color 0.4s" }}>
                PHASE {activePhase + 1} · {p.duration}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "30px", fontWeight: "900", color: "#1a1a1a", letterSpacing: "-0.5px", marginBottom: "10px" }}>
                {p.title}
              </h2>
              <p style={{ fontSize: "13.5px", color: "#666", lineHeight: "1.8", maxWidth: "580px" }}>{p.goal}</p>
            </div>
          </div>
          <div style={{ flexShrink: 0, textAlign: "right", paddingTop: "12px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "52px", fontWeight: "900", color: p.numColor, lineHeight: "1", transition: "color 0.4s" }}>
              {p.tracks.length}
            </div>
            <div style={{ fontSize: "10px", letterSpacing: "2px", color: p.accent, fontWeight: "700", marginTop: "2px", transition: "color 0.4s" }}>TRACKS</div>
          </div>
        </div>

        {/* Track pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          {p.tracks.map((t, i) => (
            <button key={i} className="track-pill" onClick={() => setActiveTrack(i)} style={{
              background: activeTrack === i ? "#1a1a1a" : "#fff",
              color: activeTrack === i ? "#fff" : "#555",
              border: `1.5px solid ${activeTrack === i ? "#1a1a1a" : p.midtint}`,
              borderRadius: "100px", padding: "8px 20px", fontSize: "12px", fontWeight: "600",
              cursor: "pointer",
              ...(activeTrack === i ? { boxShadow: `0 0 0 3px ${p.accent}40` } : {}),
            }}>{t.name}</button>
          ))}
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 368px", gap: "24px", alignItems: "start" }}>

          {/* Track content card */}
          <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", boxShadow: `0 4px 32px ${p.accent}14`, transition: "box-shadow 0.4s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", paddingBottom: "18px", borderBottom: `1.5px solid ${p.midtint}`, transition: "border-color 0.4s" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: p.accent, boxShadow: `0 0 0 4px ${p.accent}28`, transition: "background 0.4s, box-shadow 0.4s" }} />
              <span style={{ fontWeight: "700", fontSize: "14px", color: "#1a1a1a" }}>{p.tracks[activeTrack].name}</span>
              <span style={{ marginLeft: "auto", fontSize: "11px", fontWeight: "700", letterSpacing: "2px", color: p.numColor, transition: "color 0.4s" }}>
                {p.tracks[activeTrack].items.length} TOPICS
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {p.tracks[activeTrack].items.map((item, i) => {
                const colonIdx = item.indexOf(":");
                const hasBold = colonIdx > 0 && colonIdx < 32;
                return (
                  <div key={i} style={{
                    padding: "13px 16px",
                    borderBottom: `1px solid ${p.tint}`,
                    borderRight: i % 2 === 0 ? `1px solid ${p.tint}` : "none",
                    display: "flex", gap: "10px", alignItems: "flex-start",
                    transition: "border-color 0.4s",
                  }}>
                    <span style={{ fontSize: "10px", fontWeight: "800", color: p.accent, minWidth: "18px", paddingTop: "2px", transition: "color 0.4s" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "12.5px", color: "#555", lineHeight: "1.65" }}>
                      {hasBold
                        ? <><span style={{ fontWeight: "700", color: "#1a1a1a" }}>{item.slice(0, colonIdx)}</span>{item.slice(colonIdx)}</>
                        : item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "3px", color: p.accent, paddingLeft: "4px", transition: "color 0.4s" }}>
              ⚡ BUILDS THIS PHASE
            </div>

            {p.hands_on.map((h, i) => (
              <div key={i} className="ho-card" style={{
                background: "#fff", borderRadius: "16px", padding: "24px",
                boxShadow: `0 2px 20px ${p.accent}12`,
                borderTop: `4px solid ${p.accent}`,
                transition: "border-color 0.4s, box-shadow 0.4s",
              }}>
                <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "2px", color: p.accent, marginBottom: "8px", transition: "color 0.4s" }}>
                  BUILD {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontWeight: "800", fontSize: "14px", color: "#1a1a1a", marginBottom: "10px", lineHeight: "1.4" }}>
                  {h.title}
                </div>
                <p style={{ fontSize: "12px", color: "#777", lineHeight: "1.75", marginBottom: "14px" }}>{h.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {h.tags.map((tag, j) => (
                    <span key={j} style={{
                      background: p.tint, color: p.accent,
                      border: `1px solid ${p.midtint}`,
                      borderRadius: "6px", padding: "4px 10px",
                      fontSize: "10px", fontWeight: "700",
                      transition: "all 0.4s",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}

            {/* Architect rules */}
            <div style={{ background: "#1a1a1a", borderRadius: "16px", padding: "22px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "2px", color: p.accent, marginBottom: "14px", transition: "color 0.4s" }}>
                ARCHITECT RULES
              </div>
              {["Modularize every component", "Guardrails on all I/O", "Design flow before coding", "Security-first always", "Observe: trace, log, measure", "Abstract providers away"].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "9px" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: p.accent, flexShrink: 0, transition: "background 0.4s" }} />
                  <span style={{ fontSize: "12px", color: "#888" }}>{r}</span>
                </div>
              ))}
            </div>

            {/* Stack — tinted with phase color */}
            <div style={{ background: p.midtint, borderRadius: "16px", padding: "20px", transition: "background 0.4s" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "2px", color: p.accent, marginBottom: "12px", transition: "color 0.4s" }}>
                FULL TECH STACK
              </div>
              {[
                ["AI/LLM", "LangChain · LangGraph · LlamaIndex"],
                ["Models", "OpenAI · Ollama · HuggingFace · Azure OpenAI"],
                ["Vector", "pgvector · Chroma · FAISS · Azure AI Search"],
                ["Backend", "FastAPI · Celery · Pydantic · SQLAlchemy"],
                ["Storage", "PostgreSQL · Redis · Azure Blob"],
                ["Frontend", "Streamlit"],
                ["Ops", "Docker · GitHub Actions · LangSmith · Azure"],
              ].map(([layer, tech], i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <span style={{ fontSize: "10px", fontWeight: "800", color: p.accent, letterSpacing: "1px", transition: "color 0.4s" }}>{layer} </span>
                  <span style={{ fontSize: "11px", color: "#555" }}>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "48px", paddingTop: "28px", borderTop: `1.5px solid ${p.midtint}`, transition: "border-color 0.4s" }}>
          <button disabled={activePhase === 0} onClick={() => { setActivePhase(activePhase - 1); setActiveTrack(0); }} style={{
            background: activePhase === 0 ? "transparent" : "#1a1a1a",
            color: activePhase === 0 ? "#ccc" : "#fff",
            border: `1.5px solid ${activePhase === 0 ? "#e5e5e5" : "#1a1a1a"}`,
            borderRadius: "100px", padding: "11px 28px",
            fontSize: "11px", fontWeight: "700", cursor: activePhase === 0 ? "not-allowed" : "pointer", letterSpacing: "1.5px",
          }}>← PREV</button>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {phases.map((ph, i) => (
              <button key={i} onClick={() => { setActivePhase(i); setActiveTrack(0); }} style={{
                width: "8px", height: "8px", borderRadius: "50%",
                border: "none", padding: 0, cursor: "pointer",
                background: i === activePhase ? p.accent : p.midtint,
                transition: "all 0.3s",
              }} />
            ))}
          </div>

          <button disabled={activePhase === phases.length - 1} onClick={() => { setActivePhase(activePhase + 1); setActiveTrack(0); }} style={{
            background: activePhase === phases.length - 1 ? "transparent" : "#1a1a1a",
            color: activePhase === phases.length - 1 ? "#ccc" : "#fff",
            border: `1.5px solid ${activePhase === phases.length - 1 ? "#e5e5e5" : "#1a1a1a"}`,
            borderRadius: "100px", padding: "11px 28px",
            fontSize: "11px", fontWeight: "700", cursor: activePhase === phases.length - 1 ? "not-allowed" : "pointer", letterSpacing: "1.5px",
          }}>NEXT →</button>
        </div>
      </div>
    </div>
  );
}
