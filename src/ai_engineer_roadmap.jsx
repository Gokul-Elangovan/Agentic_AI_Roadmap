import { useState, useEffect, useRef } from "react";

const phases = [
  {
    id: 1, title: "Architect Foundations", duration: "Month 1–2",
    color: "#00C9A7", accent: "#00ffd5",
    goal: "Write production-grade Python as an architect, not a programmer. Set up a scalable backend.",
    tracks: [
      {
        name: "Python Architecture",
        items: [
          { text: "Modular project structure: src/, core/, api/, services/, schemas/, utils/", links: [{ label: "Real Python project layout", url: "https://realpython.com/python-application-layouts/" }] },
          { text: "Design patterns: Factory, Strategy, Repository, Dependency Injection", links: [{ label: "Python patterns guide", url: "https://refactoring.guru/design-patterns/python" }] },
          { text: "Pydantic v2 for data validation and settings management", links: [{ label: "Pydantic v2 docs", url: "https://docs.pydantic.dev/latest/" }] },
          { text: "Async Python: asyncio, async/await, background tasks", links: [{ label: "asyncio docs", url: "https://docs.python.org/3/library/asyncio.html" }, { label: "Real Python async", url: "https://realpython.com/async-io-python/" }] },
          { text: "Logging, error handling, custom exceptions", links: [{ label: "Python logging HOWTO", url: "https://docs.python.org/3/howto/logging.html" }] },
          { text: "Environment config with python-decouple / dotenv", links: [{ label: "python-decouple", url: "https://pypi.org/project/python-decouple/" }] },
        ],
      },
      {
        name: "FastAPI Backend",
        items: [
          { text: "Project layout: routers, dependencies, middleware, lifespan events", links: [{ label: "FastAPI bigger apps", url: "https://fastapi.tiangolo.com/tutorial/bigger-applications/" }] },
          { text: "JWT auth with OAuth2PasswordBearer + refresh tokens", links: [{ label: "FastAPI security/JWT", url: "https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/" }] },
          { text: "Rate limiting with slowapi + Redis", links: [{ label: "slowapi docs", url: "https://slowapi.readthedocs.io/en/latest/" }] },
          { text: "Request validation, error handlers, response schemas", links: [{ label: "FastAPI error handling", url: "https://fastapi.tiangolo.com/tutorial/handling-errors/" }] },
          { text: "CORS, security headers middleware", links: [{ label: "FastAPI CORS", url: "https://fastapi.tiangolo.com/tutorial/cors/" }] },
          { text: "Alembic migrations with SQLAlchemy 2.0 async", links: [{ label: "Alembic docs", url: "https://alembic.sqlalchemy.org/en/latest/" }, { label: "SQLAlchemy async", url: "https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html" }] },
        ],
      },
      {
        name: "Data Layer",
        items: [
          { text: "PostgreSQL async with asyncpg + SQLAlchemy (Repository pattern)", links: [{ label: "asyncpg docs", url: "https://magicstack.github.io/asyncpg/current/" }] },
          { text: "Redis for caching, session store, rate limiting", links: [{ label: "redis-py docs", url: "https://redis-py.readthedocs.io/en/stable/" }] },
          { text: "Connection pooling, query optimization basics", links: [{ label: "SQLAlchemy pooling", url: "https://docs.sqlalchemy.org/en/20/core/pooling.html" }] },
          { text: "Database schema design for AI apps (conversations, users, agent runs)", links: [{ label: "DB design for LLM apps", url: "https://supabase.com/blog/postgres-ai" }] },
        ],
      },
      {
        name: "Memory Stack (AI)",
        items: [
          { text: "Memory taxonomy: Short-term (Redis), Long-term (PostgreSQL), Semantic (pgvector), Episodic (logs)", links: [{ label: "LangChain memory types", url: "https://python.langchain.com/docs/concepts/memory/" }] },
          { text: "Redis as working memory: conversation window, TTL-based session expiry", links: [{ label: "Redis TTL guide", url: "https://redis.io/docs/manual/keyspace-notifications/" }] },
          { text: "PostgreSQL as long-term memory: conversation history, agent run logs", links: [{ label: "langchain-postgres", url: "https://github.com/langchain-ai/langchain-postgres" }] },
          { text: "pgvector extension: store embeddings in Postgres — no separate DB at start", links: [{ label: "pgvector GitHub", url: "https://github.com/pgvector/pgvector" }, { label: "pgvector guide", url: "https://neon.tech/docs/extensions/pgvector" }] },
          { text: "Schema design: messages(id, session_id, role, content, embedding vector, created_at)", links: [{ label: "Supabase vector schema", url: "https://supabase.com/docs/guides/ai/vector-columns" }] },
          { text: "Pinecone vs pgvector vs Chroma — tradeoff: scale vs simplicity vs cost", links: [{ label: "Vector DB comparison", url: "https://www.pinecone.io/learn/vector-database-comparison/" }] },
          { text: "LangGraph checkpointer: PostgresSaver / RedisSaver to persist agent state", links: [{ label: "LangGraph persistence", url: "https://langchain-ai.github.io/langgraph/concepts/persistence/" }] },
        ],
      },
      {
        name: "DSA — Start Easy",
        items: [
          { text: "Arrays, Strings: Two pointers, Sliding window", links: [{ label: "NeetCode roadmap", url: "https://neetcode.io/roadmap" }] },
          { text: "Hash Maps & Sets: Frequency count, lookup patterns", links: [{ label: "LeetCode hash table", url: "https://leetcode.com/explore/learn/card/hash-table/" }] },
          { text: "Solve 3 problems/week on LeetCode (Easy)", links: [{ label: "LeetCode Easy list", url: "https://leetcode.com/problemset/?difficulty=EASY" }] },
          { text: "Focus: understand pattern, not memorize solution", links: [{ label: "Blind 75 list", url: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions" }] },
        ],
      },
    ],
    hands_on: [
      { title: "Project 1 — Secure AI Backend Scaffold", desc: "Production FastAPI backend: JWT auth, Redis rate limiting, PostgreSQL async, modular routers, global error handling, health checks. No AI yet — pure backend architecture.", tags: ["FastAPI", "PostgreSQL", "Redis", "JWT", "Alembic"] },
    ],
  },
  {
    id: 2, title: "Agentic AI Core", duration: "Month 3–5",
    color: "#845EF7", accent: "#b197fc",
    goal: "Build robust, modular AI agents with guardrails, observability, and real automation flows.",
    tracks: [
      {
        name: "LangGraph Architecture",
        items: [
          { text: "State machines: StateGraph, nodes, edges, conditional routing", links: [{ label: "LangGraph quickstart", url: "https://langchain-ai.github.io/langgraph/tutorials/introduction/" }] },
          { text: "Persistent memory: checkpointers with PostgreSQL/Redis", links: [{ label: "LangGraph persistence", url: "https://langchain-ai.github.io/langgraph/concepts/persistence/" }] },
          { text: "Human-in-the-loop: interrupt, approve, resume patterns", links: [{ label: "HITL guide", url: "https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/" }] },
          { text: "Parallel node execution for speed", links: [{ label: "LangGraph branching", url: "https://langchain-ai.github.io/langgraph/how-tos/branching/" }] },
          { text: "Streaming: token-level and node-level streaming to frontend", links: [{ label: "LangGraph streaming", url: "https://langchain-ai.github.io/langgraph/concepts/streaming/" }] },
          { text: "Error recovery: retry logic, fallback nodes", links: [{ label: "LangGraph error handling", url: "https://langchain-ai.github.io/langgraph/how-tos/subgraph-transform-state/" }] },
        ],
      },
      {
        name: "Agent Design Patterns",
        items: [
          { text: "ReAct pattern: Reason → Act → Observe loop", links: [{ label: "ReAct paper", url: "https://react-lm.github.io/" }, { label: "LangGraph ReAct", url: "https://langchain-ai.github.io/langgraph/tutorials/introduction/" }] },
          { text: "Tool use: design reusable tools with typed inputs/outputs", links: [{ label: "LangChain tools", url: "https://python.langchain.com/docs/concepts/tools/" }] },
          { text: "Multi-agent: Supervisor + Specialist agent architecture", links: [{ label: "Multi-agent guide", url: "https://langchain-ai.github.io/langgraph/concepts/multi_agent/" }] },
          { text: "Memory types: in-context, external (vector DB), episodic", links: [{ label: "Agent memory concepts", url: "https://langchain-ai.github.io/langgraph/concepts/memory/" }] },
          { text: "Prompt architecture: system prompt layers, role separation", links: [{ label: "Anthropic prompt guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" }] },
          { text: "Structured outputs: force JSON with Pydantic + LLM", links: [{ label: "Structured output docs", url: "https://python.langchain.com/docs/concepts/structured_outputs/" }] },
        ],
      },
      {
        name: "Guardrails & Safety",
        items: [
          { text: "Input validation: detect prompt injection, PII, jailbreak attempts", links: [{ label: "Guardrails AI", url: "https://www.guardrailsai.com/docs" }] },
          { text: "Output validation: schema enforcement, hallucination checks", links: [{ label: "LangChain output parsers", url: "https://python.langchain.com/docs/concepts/output_parsers/" }] },
          { text: "Guardrails AI or custom middleware layer", links: [{ label: "Guardrails hub", url: "https://hub.guardrailsai.com/" }] },
          { text: "Toxicity + relevance scoring before returning responses", links: [{ label: "NeMo Guardrails", url: "https://github.com/NVIDIA/NeMo-Guardrails" }] },
          { text: "Audit logging: log every agent action with metadata", links: [{ label: "LangSmith tracing", url: "https://docs.smith.langchain.com/" }] },
        ],
      },
      {
        name: "Agent Memory Systems",
        items: [
          { text: "In-context memory: sliding window trimming, summarization compression", links: [{ label: "LangChain memory", url: "https://python.langchain.com/docs/concepts/memory/" }] },
          { text: "Redis short-term memory: ConversationBufferMemory + TTL sessions", links: [{ label: "LangChain Redis memory", url: "https://python.langchain.com/docs/integrations/memory/redis_chat_message_history/" }] },
          { text: "PostgreSQL long-term memory: persist history, retrieve last N turns", links: [{ label: "langchain-postgres", url: "https://github.com/langchain-ai/langchain-postgres" }] },
          { text: "Semantic memory with pgvector: embed + retrieve relevant past context", links: [{ label: "pgvector + LangChain", url: "https://python.langchain.com/docs/integrations/vectorstores/pgvector/" }] },
          { text: "Episodic memory: store agent run events for replay/analysis", links: [{ label: "LangGraph memory store", url: "https://langchain-ai.github.io/langgraph/concepts/memory/#long-term-memory" }] },
          { text: "LangGraph PostgresSaver / RedisSaver: agent state survives crashes", links: [{ label: "LangGraph checkpointers", url: "https://langchain-ai.github.io/langgraph/concepts/persistence/" }] },
          { text: "MemoryService pattern: write on every turn, inject memory before LLM call", links: [{ label: "Memory management guide", url: "https://langchain-ai.github.io/langgraph/how-tos/memory/manage-conversation-history/" }] },
          { text: "Pinecone for scale: namespace per user, metadata filtering, hybrid search", links: [{ label: "Pinecone docs", url: "https://docs.pinecone.io/guides/get-started/overview" }, { label: "Hybrid search guide", url: "https://docs.pinecone.io/guides/data/understanding-hybrid-search" }] },
        ],
      },
      {
        name: "Observability",
        items: [
          { text: "LangSmith for tracing agent runs end-to-end", links: [{ label: "LangSmith docs", url: "https://docs.smith.langchain.com/" }] },
          { text: "Custom logging: token usage, latency, tool calls per run", links: [{ label: "LangSmith callbacks", url: "https://docs.smith.langchain.com/how_to_guides/tracing/annotate_code" }] },
          { text: "Cost tracking per agent run", links: [{ label: "OpenAI usage", url: "https://platform.openai.com/usage" }] },
          { text: "Alerting on failures or high latency", links: [{ label: "LangSmith alerts", url: "https://docs.smith.langchain.com/how_to_guides/monitoring/online_evaluations" }] },
        ],
      },
      {
        name: "DSA — Medium",
        items: [
          { text: "Stacks & Queues, Linked Lists", links: [{ label: "NeetCode stack/queue", url: "https://neetcode.io/roadmap" }] },
          { text: "Binary Search pattern", links: [{ label: "Binary search explore", url: "https://leetcode.com/explore/learn/card/binary-search/" }] },
          { text: "Recursion + Backtracking basics", links: [{ label: "Backtracking guide", url: "https://leetcode.com/explore/learn/card/recursion-ii/" }] },
          { text: "5 problems/week (Easy + Medium mix)", links: [{ label: "LeetCode Medium", url: "https://leetcode.com/problemset/?difficulty=MEDIUM" }] },
        ],
      },
    ],
    hands_on: [
      { title: "Project 2 — Research Agent with Guardrails", desc: "LangGraph agent: web search (Tavily) → synthesize report → stream back. Input guardrails, output validation, LangSmith tracing, cost logging. Streamlit streaming UI.", tags: ["LangGraph", "Tavily", "Guardrails", "Streamlit", "LangSmith"] },
      { title: "Project 3 — Memory-Aware Multi-Agent System", desc: "Supervisor → specialist agents (code, summarizer, analyst). Redis short-term memory, PostgreSQL history, pgvector semantic retrieval, LangGraph RedisSaver. Human-in-the-loop + audit trail.", tags: ["LangGraph", "pgvector", "Redis", "PostgreSQL", "Memory"] },
    ],
  },
  {
    id: 3, title: "System Design for AI", duration: "Month 6–8",
    color: "#F77F00", accent: "#ffb347",
    goal: "Design scalable, fault-tolerant AI systems. Think in components, tradeoffs, and data flow.",
    tracks: [
      {
        name: "System Design Core",
        items: [
          { text: "CAP theorem, consistency vs availability tradeoffs", links: [{ label: "CAP theorem explained", url: "https://www.ibm.com/topics/cap-theorem" }] },
          { text: "SQL vs NoSQL — when to use what", links: [{ label: "SQL vs NoSQL", url: "https://www.mongodb.com/resources/compare/sql-vs-nosql" }] },
          { text: "Caching strategies: write-through, write-behind, TTL design", links: [{ label: "Redis caching patterns", url: "https://redis.io/docs/manual/patterns/" }] },
          { text: "Message queues: Celery + Redis for async agent jobs", links: [{ label: "Celery docs", url: "https://docs.celeryq.dev/en/stable/" }] },
          { text: "Load balancing, horizontal scaling basics", links: [{ label: "System design primer", url: "https://github.com/donnemartin/system-design-primer" }] },
          { text: "API design: REST best practices, versioning, pagination", links: [{ label: "REST API best practices", url: "https://restfulapi.net/" }] },
        ],
      },
      {
        name: "AI System Design",
        items: [
          { text: "RAG pipeline architecture: chunking, embedding, retrieval, reranking", links: [{ label: "RAG guide", url: "https://python.langchain.com/docs/tutorials/rag/" }, { label: "Advanced RAG", url: "https://www.pinecone.io/learn/retrieval-augmented-generation/" }] },
          { text: "Vector DB design: pgvector vs Pinecone — tradeoffs at scale", links: [{ label: "Vector DB comparison", url: "https://www.pinecone.io/learn/vector-database-comparison/" }] },
          { text: "Agent orchestration at scale: job queues for long-running agents", links: [{ label: "Celery intro", url: "https://docs.celeryq.dev/en/stable/getting-started/introduction.html" }] },
          { text: "Stateful vs stateless agent design", links: [{ label: "LangGraph stateful agents", url: "https://langchain-ai.github.io/langgraph/concepts/persistence/" }] },
          { text: "Conversation memory architecture for multi-user scale", links: [{ label: "Multi-user memory", url: "https://langchain-ai.github.io/langgraph/how-tos/memory/shared-state/" }] },
          { text: "Webhook-based async agent execution pattern", links: [{ label: "FastAPI background tasks", url: "https://fastapi.tiangolo.com/tutorial/background-tasks/" }] },
        ],
      },
      {
        name: "Security at Scale",
        items: [
          { text: "API key management, secret rotation", links: [{ label: "HashiCorp Vault", url: "https://developer.hashicorp.com/vault/docs/what-is-vault" }] },
          { text: "RBAC for agent actions", links: [{ label: "FastAPI RBAC pattern", url: "https://fastapi.tiangolo.com/advanced/security/http-basic-auth/" }] },
          { text: "Data encryption at rest and in transit", links: [{ label: "Postgres encryption", url: "https://www.postgresql.org/docs/current/encryption-options.html" }] },
          { text: "Tenant isolation in multi-user AI apps", links: [{ label: "Multi-tenancy patterns", url: "https://www.citusdata.com/blog/2016/10/03/designing-your-saas-database-for-high-scalability/" }] },
        ],
      },
      {
        name: "DSA — Graphs & DP",
        items: [
          { text: "Binary Trees, BST traversal patterns", links: [{ label: "LeetCode trees", url: "https://leetcode.com/explore/learn/card/data-structure-tree/" }] },
          { text: "Graph: BFS, DFS, topological sort", links: [{ label: "Graph algorithms", url: "https://leetcode.com/explore/learn/card/graph/" }] },
          { text: "Dynamic Programming: top-down memoization", links: [{ label: "DP patterns", url: "https://leetcode.com/explore/learn/card/dynamic-programming/" }] },
          { text: "7 problems/week, start mock interviews on Pramp", links: [{ label: "Pramp", url: "https://www.pramp.com/" }, { label: "Interviewing.io", url: "https://interviewing.io/" }] },
        ],
      },
    ],
    hands_on: [
      { title: "Project 4 — Production RAG System", desc: "Document ingestion → chunking → pgvector embeddings → hybrid retrieval → reranking. Modular services: Ingestion, Retrieval, Generation. FastAPI + multi-tenancy support.", tags: ["RAG", "pgvector", "FastAPI", "Celery", "Redis"] },
      { title: "System Design Practice", desc: "Design 3 AI systems on paper: (1) ChatGPT backend, (2) Document Q&A for 1M users, (3) Autonomous coding agent pipeline. For each: draw components, define APIs, handle failures.", tags: ["System Design", "Architecture", "Whiteboard"] },
    ],
  },
  {
    id: 4, title: "Production & Interview Ready", duration: "Month 9–14",
    color: "#E63946", accent: "#ff6b6b",
    goal: "Ship a full autonomous agent product. Interview-ready DSA. System design fluency.",
    tracks: [
      {
        name: "Autonomous Agent Patterns",
        items: [
          { text: "Long-horizon task planning: decompose → execute → verify loop", links: [{ label: "LangGraph multi-step", url: "https://langchain-ai.github.io/langgraph/tutorials/introduction/" }] },
          { text: "Self-correcting agents: detect failure, retry with modified plan", links: [{ label: "Reflexion paper", url: "https://arxiv.org/abs/2303.11366" }] },
          { text: "Dynamic tool selection at runtime", links: [{ label: "LangGraph tool calling", url: "https://langchain-ai.github.io/langgraph/how-tos/tool-calling/" }] },
          { text: "Agent-to-agent communication via message passing", links: [{ label: "Multi-agent comms", url: "https://langchain-ai.github.io/langgraph/concepts/multi_agent/" }] },
          { text: "Scheduled/triggered agents: cron-based or event-driven", links: [{ label: "APScheduler", url: "https://apscheduler.readthedocs.io/en/3.x/" }] },
          { text: "Browser agents with Playwright for web automation", links: [{ label: "Playwright Python", url: "https://playwright.dev/python/docs/intro" }] },
        ],
      },
      {
        name: "Production Deployment",
        items: [
          { text: "Dockerize FastAPI + agent workers", links: [{ label: "FastAPI Docker guide", url: "https://fastapi.tiangolo.com/deployment/docker/" }] },
          { text: "Environment parity: dev/staging/prod configs", links: [{ label: "12-factor app", url: "https://12factor.net/" }] },
          { text: "Background workers with Celery for async agent runs", links: [{ label: "Celery workers", url: "https://docs.celeryq.dev/en/stable/userguide/workers.html" }] },
          { text: "Structured logging with correlation IDs across services", links: [{ label: "structlog docs", url: "https://www.structlog.org/en/stable/" }] },
          { text: "Basic CI/CD: GitHub Actions for test + deploy", links: [{ label: "GitHub Actions", url: "https://docs.github.com/en/actions" }] },
        ],
      },
      {
        name: "DSA — Interview Grind",
        items: [
          { text: "NeetCode 150: 14 core patterns", links: [{ label: "NeetCode 150", url: "https://neetcode.io/practice" }] },
          { text: "Timed practice: 45-min problem-solving sessions", links: [{ label: "LeetCode timer mode", url: "https://leetcode.com/problemset/" }] },
          { text: "10 problems/week (Medium + Hard)", links: [{ label: "LeetCode Hard", url: "https://leetcode.com/problemset/?difficulty=HARD" }] },
          { text: "Review: Heap, Trie, Union Find", links: [{ label: "Trie guide", url: "https://leetcode.com/explore/learn/card/trie/" }] },
          { text: "Mock interviews: 2/week", links: [{ label: "Pramp", url: "https://www.pramp.com/" }, { label: "Interviewing.io", url: "https://interviewing.io/" }] },
        ],
      },
      {
        name: "System Design Interview",
        items: [
          { text: "10 classic designs: URL shortener, chat, feed, notifications", links: [{ label: "System design primer", url: "https://github.com/donnemartin/system-design-primer" }, { label: "ByteByteGo", url: "https://bytebytego.com/" }] },
          { text: "Add AI twist to each classic design", links: [{ label: "AI system design", url: "https://www.educative.io/blog/ai-system-design-interview" }] },
          { text: "Designing Data-Intensive Applications (key chapters)", links: [{ label: "DDIA book", url: "https://dataintensive.net/" }] },
          { text: "Mock system design interviews weekly", links: [{ label: "Interviewing.io", url: "https://interviewing.io/" }] },
        ],
      },
    ],
    hands_on: [
      { title: "Capstone — Autonomous AI Agent Platform", desc: "Users create custom agents, define goals, connect tools (web search, code executor, file reader). Agents run async via Celery. Results streamed. Full auth, RBAC, audit logs, cost tracking, guardrails. Streamlit + FastAPI + Docker.", tags: ["LangGraph", "FastAPI", "Celery", "Redis", "PostgreSQL", "Streamlit", "Docker"] },
      { title: "Project 5 — Self-Correcting Coding Agent", desc: "Agent writes code → runs in sandboxed subprocess → observes output/errors → corrects → iterates until tests pass. Self-healing loop with max-retry guardrail. Streaming via FastAPI.", tags: ["LangGraph", "Code Execution", "Self-Correction", "FastAPI"] },
    ],
  },
];

// ── Resource popup ──────────────────────────────────────────────────────────
function ResourceBox({ links }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!links || links.length === 0) return null;

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-flex", flexShrink: 0, alignSelf: "flex-start", marginTop: "4px" }}>
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{
          width: "18px", height: "18px",
          background: "#1a1a28",
          border: "1px solid #2a2a3e",
          borderRadius: "4px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          fontSize: "9px", color: "#555",
          flexShrink: 0,
          transition: "border-color 0.15s, color 0.15s",
          padding: 0,
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        ↗
      </button>
      {open && (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          style={{
            position: "absolute",
            bottom: "22px",
            left: "0",
            background: "#16162a",
            border: "1px solid #252540",
            borderRadius: "8px",
            padding: "6px",
            minWidth: "190px",
            maxWidth: "250px",
            zIndex: 200,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}
        >
          {links.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 8px",
                borderRadius: "5px",
                textDecoration: "none",
                color: "#bbb",
                fontSize: "11.5px",
                lineHeight: 1.3,
                transition: "background 0.1s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#1e1e38"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ color: "#444", fontSize: "9px", flexShrink: 0 }}>↗</span>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Checkbox + item row ─────────────────────────────────────────────────────
function CheckItem({ itemKey, text, links, color, checked, onToggle }) {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
      <button
        onClick={() => onToggle(itemKey)}
        style={{
          width: "15px", height: "15px", minWidth: "15px",
          marginTop: "3px",
          background: checked ? color : "transparent",
          border: `1.5px solid ${checked ? color : "#2e2e40"}`,
          borderRadius: "3px",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s", padding: 0, flexShrink: 0,
        }}
      >
        {checked && <span style={{ color: "#000", fontSize: "8px", fontWeight: "900", lineHeight: 1 }}>✓</span>}
      </button>
      <span style={{
        fontSize: "13px", color: checked ? "#444" : "#c0c0c0",
        lineHeight: 1.6, flex: 1,
        textDecoration: checked ? "line-through" : "none",
        transition: "color 0.2s",
      }}>
        {text}
      </span>
      <ResourceBox links={links} />
    </div>
  );
}

// ── Phase nav card ──────────────────────────────────────────────────────────
function PhaseCard({ phase, isActive, onClick, progress }) {
  return (
    <button onClick={onClick} style={{
      background: isActive ? phase.color : "transparent",
      border: `2px solid ${isActive ? phase.color : "#1e1e2e"}`,
      borderRadius: "10px", padding: "13px 16px",
      cursor: "pointer", textAlign: "left",
      transition: "all 0.2s", width: "100%",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
        <span style={{
          background: isActive ? "rgba(0,0,0,0.25)" : phase.color,
          color: "#fff", borderRadius: "5px", padding: "3px 7px",
          fontSize: "10px", fontWeight: "700", fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap",
        }}>P{phase.id}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: isActive ? "#fff" : "#ccc", fontWeight: "700", fontSize: "12px", fontFamily: "'Syne', sans-serif" }}>{phase.title}</div>
          <div style={{ color: isActive ? "rgba(255,255,255,0.65)" : "#444", fontSize: "10px", marginTop: "1px", fontFamily: "'Space Mono', monospace" }}>{phase.duration}</div>
        </div>
      </div>
      <div style={{ marginTop: "9px", background: isActive ? "rgba(0,0,0,0.2)" : "#111120", borderRadius: "3px", height: "3px", overflow: "hidden" }}>
        <div style={{ width: `${progress}%`, background: isActive ? "#fff" : phase.color, height: "100%", borderRadius: "3px", transition: "width 0.5s" }} />
      </div>
      <div style={{ marginTop: "4px", fontSize: "10px", fontFamily: "'Space Mono', monospace", color: isActive ? "rgba(255,255,255,0.55)" : "#383850" }}>
        {progress}% complete
      </div>
    </button>
  );
}

const Tag = ({ text, color }) => (
  <span style={{
    background: `${color}18`, border: `1px solid ${color}35`,
    color: color, borderRadius: "5px", padding: "2px 8px",
    fontSize: "10px", fontFamily: "'Space Mono', monospace",
  }}>{text}</span>
);

// ── Main ────────────────────────────────────────────────────────────────────
export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeTrack, setActiveTrack] = useState(0);
  const [checked, setChecked] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("roadmap-checked-v2");
        if (result?.value) setChecked(JSON.parse(result.value));
      } catch (_) {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try { await window.storage.set("roadmap-checked-v2", JSON.stringify(checked)); } catch (_) {}
    })();
  }, [checked, loaded]);

  const toggleItem = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const getPhaseProgress = (phase) => {
    let total = 0, done = 0;
    phase.tracks.forEach(t => t.items.forEach((_, i) => {
      total++;
      if (checked[`p${phase.id}-${t.name}-${i}`]) done++;
    }));
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  const phase = phases[activePhase];
  const track = phase.tracks[activeTrack];
  const trackDone = track.items.filter((_, i) => checked[`p${phase.id}-${track.name}-${i}`]).length;

  if (!loaded) return (
    <div style={{ background: "#0d0d14", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#333", fontFamily: "monospace", fontSize: "12px" }}>Loading progress...</span>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d14", color: "#e0e0e0", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Mono:wght@400;700&family=Inter:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e1e2e; border-radius: 2px; }
        button { outline: none; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #13131f", padding: "24px 36px 20px" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "#00C9A710", border: "1px solid #00C9A725", borderRadius: "20px", padding: "3px 11px", marginBottom: "10px" }}>
            <span style={{ color: "#00C9A7", fontSize: "10px", fontFamily: "'Space Mono', monospace", fontWeight: "700" }}>12–14 MONTH · AGENTIC AI ENGINEER</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(20px, 3vw, 32px)", fontWeight: "800", color: "#fff", letterSpacing: "-0.5px" }}>
            From GenAI Dev → <span style={{ color: "#00C9A7" }}>AI Architect</span>
          </h1>
          <p style={{ color: "#444", fontSize: "12px", marginTop: "6px" }}>
            <span style={{ color: "#845EF7" }}>LangGraph · FastAPI · Streamlit · Redis · PostgreSQL · pgvector</span>
            <span style={{ color: "#252535", marginLeft: "10px" }}>· progress auto-saved locally</span>
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "24px 36px", display: "grid", gridTemplateColumns: "220px 1fr", gap: "20px", alignItems: "start" }}>

        {/* Left nav */}
        <div style={{ position: "sticky", top: "16px", display: "flex", flexDirection: "column", gap: "7px" }}>
          {phases.map((p, i) => (
            <PhaseCard key={p.id} phase={p} isActive={activePhase === i} progress={getPhaseProgress(p)}
              onClick={() => { setActivePhase(i); setActiveTrack(0); }} />
          ))}
          <div style={{ marginTop: "10px", background: "#0e0e1c", border: "1px solid #13131f", borderRadius: "9px", padding: "13px" }}>
            <div style={{ fontSize: "9px", fontFamily: "'Space Mono', monospace", color: "#845EF7", fontWeight: "700", marginBottom: "9px", letterSpacing: "0.5px" }}>ARCHITECT RULES</div>
            {["Modularize every component", "Guardrails on inputs/outputs", "Design flow before coding", "Security-first backend", "Observability from day 1"].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: "7px", alignItems: "flex-start", marginBottom: "5px" }}>
                <span style={{ color: "#845EF7", fontSize: "8px", marginTop: "4px", flexShrink: 0 }}>▸</span>
                <span style={{ fontSize: "11px", color: "#444", lineHeight: 1.4 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right content */}
        <div>
          {/* Phase header */}
          <div style={{
            background: `${phase.color}08`, border: `1px solid ${phase.color}20`,
            borderRadius: "12px", padding: "18px 22px", marginBottom: "18px",
          }}>
            <span style={{ background: phase.color, color: "#000", fontFamily: "'Space Mono', monospace", fontSize: "10px", fontWeight: "700", padding: "3px 9px", borderRadius: "4px" }}>
              PHASE {phase.id} · {phase.duration}
            </span>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: "800", color: "#fff", margin: "10px 0 5px", letterSpacing: "-0.3px" }}>{phase.title}</h2>
            <p style={{ color: "#555", fontSize: "12.5px", lineHeight: 1.6 }}>{phase.goal}</p>
          </div>

          {/* Track tabs */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
            {phase.tracks.map((t, i) => {
              const done = t.items.filter((_, j) => checked[`p${phase.id}-${t.name}-${j}`]).length;
              return (
                <button key={i} onClick={() => setActiveTrack(i)} style={{
                  background: activeTrack === i ? phase.color : "#0e0e1c",
                  border: `1px solid ${activeTrack === i ? phase.color : "#181828"}`,
                  color: activeTrack === i ? "#000" : "#555",
                  borderRadius: "7px", padding: "5px 11px",
                  fontSize: "11px", fontWeight: "600", fontFamily: "'Space Mono', monospace",
                  cursor: "pointer", transition: "all 0.15s",
                }}>
                  {t.name}{done > 0 ? ` ${done}/${t.items.length}` : ""}
                </button>
              );
            })}
          </div>

          {/* Track items */}
          <div style={{ background: "#0e0e1c", border: "1px solid #13131f", borderRadius: "12px", padding: "20px", marginBottom: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", color: phase.accent, fontSize: "14px", fontWeight: "700" }}>{track.name}</h3>
              <span style={{ fontSize: "10px", fontFamily: "'Space Mono', monospace", color: "#2e2e48" }}>{trackDone}/{track.items.length}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
              {track.items.map((item, i) => {
                const key = `p${phase.id}-${track.name}-${i}`;
                return <CheckItem key={key} itemKey={key} text={item.text} links={item.links} color={phase.color} checked={!!checked[key]} onToggle={toggleItem} />;
              })}
            </div>
          </div>

          {/* Hands-on */}
          <div style={{ fontSize: "10px", fontFamily: "'Space Mono', monospace", color: "#333", fontWeight: "700", marginBottom: "10px", letterSpacing: "1px" }}>⚡ HANDS-ON BUILDS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {phase.hands_on.map((h, i) => (
              <div key={i} style={{
                background: "#090912", border: `1px solid ${phase.color}18`,
                borderLeft: `3px solid ${phase.color}`, borderRadius: "10px", padding: "16px 18px",
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: "700", fontSize: "13px", color: "#ddd", marginBottom: "6px" }}>{h.title}</div>
                <p style={{ fontSize: "12px", color: "#555", lineHeight: 1.7, marginBottom: "10px" }}>{h.desc}</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {h.tags.map((tag, j) => <Tag key={j} text={tag} color={phase.color} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}