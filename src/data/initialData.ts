import { Project, Skill, Experience, Testimonial, ContactMessage } from '../types/portfolio.ts';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'osiris-cloud',
    title: 'Osiris Cloud Infrastructure Topology',
    tagline: 'High-throughput microservices mesh monitoring & auto-rebalancing engine',
    category: 'Cloud Infrastructure',
    description: 'An enterprise distributed observability system tracking real-time regional latencies, pod health, and automated failover across multi-region Kubernetes clusters.',
    fullStory: 'Osiris Cloud was engineered to solve cascading network partition issues in multi-region deployments. By streaming eBPF packet telemetry through a low-latency gRPC pipeline and aggregating metrics in a partitioned PostgreSQL timeseries store, the engine visualizes dependency graphs across 200+ microservices in real time.',
    techStack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Docker', 'Redis', 'Tailwind CSS'],
    liveUrl: 'https://github.com/elena-vance/osiris-cloud',
    repoUrl: 'https://github.com/elena-vance/osiris-cloud',
    imageUrl: '/src/assets/images/project_cloud_platform_1791962975439.jpg',
    metrics: [
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'p95 Packet Latency', value: '< 18ms' },
      { label: 'Throughput', value: '1.2M events/sec' }
    ],
    stars: 842,
    year: '2025',
    featured: true,
    architecture: {
      frontend: 'React 19 + Canvas Graph Visualizer + Virtualized Grid',
      backend: 'Express.js + WebSocket cluster + Event Broker',
      database: 'PostgreSQL partitioned tables with BRIN indexing + Redis cache',
      deployment: 'Docker containers orchestrated with GitHub Actions CI/CD'
    },
    keyDecisions: [
      'Chose relational PostgreSQL over NoSQL for ACID transactions on configuration states and topological schema integrity.',
      'Implemented worker-thread metric ingestion pool to avoid blocking the Node.js event loop on spikes.',
      'Designed a zero-copy binary streaming protocol for microsecond cluster heartbeat broadcasts.'
    ]
  },
  {
    id: 'apex-trading',
    title: 'Apex Algorithmic Trading & Ledger Platform',
    tagline: 'Sub-millisecond trade order router with immutable double-entry ledger',
    category: 'FinTech / Real-time',
    description: 'A full-stack algorithmic trading interface and audit-compliant ledger platform featuring real-time candlestick rendering, portfolio risk analysis, and automated trade execution.',
    fullStory: 'Built for quantitative traders requiring strict determinism. Apex features an Express-backed event-sourced architecture where every state modification creates an immutable cryptographic ledger entry stored in PostgreSQL, guaranteeing mathematical consistency across balances and positions.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://github.com/elena-vance/apex-trading',
    repoUrl: 'https://github.com/elena-vance/apex-trading',
    imageUrl: '/src/assets/images/project_fintech_engine_1791962977788.jpg',
    metrics: [
      { label: 'Order Execution', value: '< 2.4ms' },
      { label: 'Audited Volume', value: '$42M+ Daily' },
      { label: 'Ledger Invariants', value: '100% Verified' }
    ],
    stars: 1205,
    year: '2025',
    featured: true,
    architecture: {
      frontend: 'React 19 + High-frequency WebSocket subscriber + HTML5 Canvas Charts',
      backend: 'Node.js Express + In-memory matching queue + Background reconciliation',
      database: 'PostgreSQL with strict SERIALIZABLE isolation levels',
      deployment: 'Terraform AWS ECS Fargate + RDS PostgreSQL Multi-AZ'
    },
    keyDecisions: [
      'Used strict database-level check constraints to guarantee balances never dip negative during concurrent order submissions.',
      'Separated write-intensive transaction journaling from read-heavy portfolio analytics using read replicas.',
      'Adopted ring buffers in memory to absorb sudden market volatility spikes.'
    ]
  },
  {
    id: 'nexus-devtool',
    title: 'Nexus API Playground & Schema Workbench',
    tagline: 'Interactive API sandbox, relational schema visualizer, and code compiler',
    category: 'Developer Tools',
    description: 'An interactive developer studio that parses database schemas, generates typed SDK clients, and executes live parameterized queries in isolated sandbox environments.',
    fullStory: 'Nexus eliminates friction in developer onboarding by parsing relational database catalogs (PostgreSQL / MySQL / SQLite) into interactive ER diagrams and auto-generating Express & TypeScript boilerplate with end-to-end type safety.',
    techStack: ['TypeScript', 'React', 'Express.js', 'SQL Parser', 'Tailwind CSS'],
    liveUrl: 'https://github.com/elena-vance/nexus-workbench',
    repoUrl: 'https://github.com/elena-vance/nexus-workbench',
    imageUrl: '/src/assets/images/project_devtool_studio_1791962977389.jpg',
    metrics: [
      { label: 'Monthly Active Devs', value: '38,000+' },
      { label: 'Code Gen Time', value: '< 120ms' },
      { label: 'Schema Formats', value: '6 Supported' }
    ],
    stars: 978,
    year: '2024',
    featured: true,
    architecture: {
      frontend: 'React SPA + Monaco Editor + Interactive SVG Schema Visualizer',
      backend: 'Express.js AST parser and SQL query runner',
      database: 'SQLite & JSON file engine with automated schema introspection',
      deployment: 'Vercel Edge Functions + Node.js background runner'
    },
    keyDecisions: [
      'AST-based SQL syntax analysis to catch query syntax and injection errors before execution.',
      'Zero-dependency client code generation that emits pristine, readable TypeScript.',
      'Local-first cache allowing developers to work completely offline.'
    ]
  },
  {
    id: 'hypergraph-vector',
    title: 'HyperGraph Distributed Vector Indexer',
    tagline: 'High-dimensional approximate nearest neighbors indexing engine in TypeScript',
    category: 'Full-Stack',
    description: 'A full-stack similarity search engine providing hybrid semantic + keyword querying, HNSW graph indexing, and sub-15ms search across millions of embedding vectors.',
    fullStory: 'Designed as an alternative to bloated external search services for medium-scale enterprise knowledge bases. Integrates directly into Node.js services with zero external dependencies, persistent disk storage, and an interactive admin visualizer.',
    techStack: ['Node.js', 'TypeScript', 'React', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://github.com/elena-vance/hypergraph-vector',
    repoUrl: 'https://github.com/elena-vance/hypergraph-vector',
    imageUrl: '/src/assets/images/project_cloud_platform_1791962975439.jpg',
    metrics: [
      { label: 'Query Latency', value: '11ms p95' },
      { label: 'Vector Recall@10', value: '98.4%' },
      { label: 'Disk Footprint', value: '68% Lower' }
    ],
    stars: 640,
    year: '2024',
    featured: false,
    architecture: {
      frontend: 'React + Canvas Vector Embedding Cluster Projector',
      backend: 'Express API with native math vector dot-product acceleration',
      database: 'PostgreSQL pgvector & memory-mapped file storage',
      deployment: 'Dockerized microservice with health checks'
    },
    keyDecisions: [
      'Implemented hierarchical NSW graphs with custom quantization for minimal RAM usage.',
      'Fused full-text BM25 search with vector similarity in a single SQL query plan.'
    ]
  },
  {
    id: 'pulsesync-canvas',
    title: 'PulseSync Real-Time Collaborative Canvas',
    tagline: 'Conflict-free replicated data type (CRDT) whiteboard with multi-cursor sync',
    category: 'Full-Stack',
    description: 'A real-time whiteboard and infinite architecture diagramming tool supporting concurrent peer editing, offline reconciliation, and infinite canvas rendering at 60 FPS.',
    fullStory: 'PulseSync delivers seamless remote engineering collaboration. Built using custom state-based CRDTs over WebSockets, teammates can co-design system architectures, add code snippets, and review database models simultaneously with zero locking conflicts.',
    techStack: ['React', 'Node.js', 'WebSockets', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://github.com/elena-vance/pulsesync-canvas',
    repoUrl: 'https://github.com/elena-vance/pulsesync-canvas',
    imageUrl: '/src/assets/images/project_devtool_studio_1791962977389.jpg',
    metrics: [
      { label: 'Concurrent Users/Room', value: '150+' },
      { label: 'Sync Latency', value: '< 25ms' },
      { label: 'Canvas Frame Rate', value: 'Solid 60 FPS' }
    ],
    stars: 712,
    year: '2024',
    featured: false,
    architecture: {
      frontend: 'React 19 + HTML5 Canvas 2D Context + Web Workers for delta calculation',
      backend: 'Node.js WebSocket gateway with room-based broadcast routing',
      database: 'PostgreSQL JSONB document checkpoints + snapshot compression',
      deployment: 'Render Cloud + Redis Pub/Sub cluster'
    },
    keyDecisions: [
      'Implemented optimistic client-side updates with vector clocks for zero perceptual typing delay.',
      'Spatial indexing (R-Tree) on client to only render shapes visible within the active viewport.'
    ]
  },
  {
    id: 'sentio-agent',
    title: 'Sentio Automated Telemetry & Anomaly Detector',
    tagline: 'Distributed trace analyzer and predictive latency anomaly detector',
    category: 'Cloud Infrastructure',
    description: 'An autonomous pipeline agent that ingests OpenTelemetry spans, correlates database slow query logs, and isolates root cause infrastructure bottlenecks.',
    fullStory: 'Sentio was created to relieve on-call engineers from digging through millions of uncorrelated logs during outages. It automatically maps slow traces to specific database locks or API rate limits and generates executive root-cause postmortems.',
    techStack: ['Express.js', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript'],
    liveUrl: 'https://github.com/elena-vance/sentio-agent',
    repoUrl: 'https://github.com/elena-vance/sentio-agent',
    imageUrl: '/src/assets/images/hero_developer_workspace_1791962975502.jpg',
    metrics: [
      { label: 'MTTR Reduction', value: '42% Faster' },
      { label: 'Spans Processed', value: '50M+ Daily' },
      { label: 'False Positives', value: '< 2.1%' }
    ],
    stars: 529,
    year: '2023',
    featured: false,
    architecture: {
      frontend: 'React Gantt waterfall trace view and metric sparklines',
      backend: 'Express.js ingestion API with rate limiting and batch queue',
      database: 'PostgreSQL with TimescaleDB hypertables',
      deployment: 'Kubernetes DaemonSet + Prometheus metrics export'
    },
    keyDecisions: [
      'Dynamic sampling strategy that keeps 100% of error traces and 2% of healthy spans to conserve disk.',
      'Automated slow SQL query fingerprinting to detect N+1 database anti-patterns.'
    ]
  }
];

export const INITIAL_SKILLS: Skill[] = [
  // Backend & API
  { id: 's1', category: 'Backend & API', name: 'Node.js & Express', proficiency: 96, years: '8 yrs', highlight: 'High-concurrency servers, streaming pipelines, custom middleware', level: 'Expert' },
  { id: 's2', category: 'Backend & API', name: 'TypeScript', proficiency: 95, years: '7 yrs', highlight: 'Advanced type gymnastics, generic architectures, strict safety', level: 'Expert' },
  { id: 's3', category: 'Backend & API', name: 'REST & GraphQL APIs', proficiency: 94, years: '8 yrs', highlight: 'Idempotency, contract-first OpenAPI, rate limiting, pagination', level: 'Expert' },
  { id: 's4', category: 'Backend & API', name: 'WebSocket & Real-time', proficiency: 90, years: '6 yrs', highlight: 'Bi-directional sync, heartbeat monitoring, Pub/Sub clustering', level: 'Expert' },

  // Databases & Storage
  { id: 's5', category: 'Databases & Storage', name: 'PostgreSQL', proficiency: 95, years: '7 yrs', highlight: 'Query optimization, indexing strategies (B-Tree, GIN, BRIN), locks & transactions', level: 'Expert' },
  { id: 's6', category: 'Databases & Storage', name: 'MySQL & Relational DBs', proficiency: 90, years: '8 yrs', highlight: 'ACID integrity, foreign keys, schema migrations, replication', level: 'Expert' },
  { id: 's7', category: 'Databases & Storage', name: 'Redis & Caching', proficiency: 92, years: '6 yrs', highlight: 'Distributed caching, locks, rate limit token buckets, streams', level: 'Expert' },
  { id: 's8', category: 'Databases & Storage', name: 'MongoDB & NoSQL', proficiency: 86, years: '5 yrs', highlight: 'Aggregation pipelines, denormalization tradeoffs, sharding', level: 'Advanced' },

  // Frontend
  { id: 's9', category: 'Frontend', name: 'React 19 & Next.js', proficiency: 95, years: '7 yrs', highlight: 'Concurrent mode, hooks, state machines, server components', level: 'Expert' },
  { id: 's10', category: 'Frontend', name: 'Tailwind CSS & Design Systems', proficiency: 94, years: '6 yrs', highlight: 'Design tokens, zero-layout-shift interfaces, responsive math', level: 'Expert' },
  { id: 's11', category: 'Frontend', name: 'HTML5 & Modern Web APIs', proficiency: 95, years: '8 yrs', highlight: 'Canvas 2D, Web Workers, IndexedDB, accessibility (WCAG AA)', level: 'Expert' },

  // DevOps & Cloud
  { id: 's12', category: 'DevOps & Cloud', name: 'Docker & Containers', proficiency: 92, years: '6 yrs', highlight: 'Multi-stage builds, Alpine optimizations, container security', level: 'Expert' },
  { id: 's13', category: 'DevOps & Cloud', name: 'CI/CD & GitHub Actions', proficiency: 90, years: '6 yrs', highlight: 'Automated test matrices, semantic release, zero-downtime deploy', level: 'Expert' },
  { id: 's14', category: 'DevOps & Cloud', name: 'AWS & Cloud Deployment', proficiency: 88, years: '5 yrs', highlight: 'ECS, RDS, S3, CloudFront, Lambda, Vercel, Netlify, Heroku', level: 'Advanced' },

  // Systems & Core
  { id: 's15', category: 'Systems & Core', name: 'System Architecture', proficiency: 94, years: '8 yrs', highlight: 'Domain-driven design, event sourcing, microservices vs monoliths', level: 'Expert' }
];

export const INITIAL_EXPERIENCE: Experience[] = [
  {
    id: 'exp1',
    role: 'Staff Full-Stack Engineer & Architect',
    company: 'CloudScale Infrastructure Systems',
    period: '2023 – Present',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    description: 'Leading technical architecture across 4 engineering pods building enterprise cloud governance tools and real-time observability telemetry platforms.',
    achievements: [
      'Architected high-throughput telemetry ingestion service in Node.js & PostgreSQL handling 15M+ requests/day with sub-30ms p95 latency.',
      'Reduced cloud infrastructure compute costs by 34% by refactoring N+1 queries and deploying distributed Redis caching clusters.',
      'Mentored 12 mid-level and junior engineers in database index analysis and TypeScript design patterns.'
    ],
    techStack: ['Node.js', 'Express', 'React', 'PostgreSQL', 'Docker', 'Redis', 'TypeScript']
  },
  {
    id: 'exp2',
    role: 'Senior Full-Stack Engineer',
    company: 'FinTech Labs Global',
    period: '2021 – 2023',
    location: 'New York, NY (Remote)',
    type: 'Full-time',
    description: 'Spearheaded core ledger transaction engine and customer-facing portfolio management dashboard for institutional trading clients.',
    achievements: [
      'Built double-entry accounting engine in PostgreSQL with strict ACID isolation, successfully passing two rigorous SOC-2 and financial compliance audits.',
      'Migrated legacy monolithic frontends to modern React with real-time WebSocket feeds, improving frame rate from 24 FPS to smooth 60 FPS.',
      'Decreased deploy failure rate by 80% through automated GitHub Actions test pipelines.'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'AWS', 'Tailwind CSS']
  },
  {
    id: 'exp3',
    role: 'Software Engineer',
    company: 'DevCraft Digital Solutions',
    period: '2018 – 2021',
    location: 'Austin, TX',
    type: 'Full-time',
    description: 'Developed bespoke web applications, RESTful APIs, and relational database schemas for enterprise clients across healthcare and logistics.',
    achievements: [
      'Delivered 14 full-stack client applications from inception to cloud production deployment on Heroku, AWS, and Vercel.',
      'Integrated third-party payment gateways (Stripe, Plaid) and secured authentication workflows with OAuth 2.0 and JWT.',
      'Spearheaded transition from JavaScript to TypeScript across all shared internal backend libraries.'
    ],
    techStack: ['JavaScript', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'MongoDB', 'React']
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus Chen',
    role: 'VP of Engineering',
    company: 'CloudScale Systems',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'Elena is one of the rare engineers who genuinely masters both ends of the stack. She can architect a bulletproof PostgreSQL data model with zero lock contention, and then pivot to building a silky-smooth React UI that users love.',
    relationship: 'Managed Elena directly at CloudScale Systems'
  },
  {
    id: 't2',
    name: 'Dr. Sarah Lindqvist',
    role: 'Head of Quantitative Technology',
    company: 'FinTech Labs Global',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    quote: 'When we needed an audit-ready ledger engine where balances could never diverge by a single cent under extreme concurrency, Elena engineered the entire transactional backbone. Her rigor in database design is second to none.',
    relationship: 'Collaborated on Apex Algorithmic Trading'
  },
  {
    id: 't3',
    name: 'Julian Vance-Meyer',
    role: 'Principal Systems Architect',
    company: 'DevCraft Studio',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'Elena combines deep systems thinking with an impeccable eye for software ergonomics. Her code is exceptionally clean, thoroughly tested, and always accompanied by clear architecture documentation.',
    relationship: 'Senior peer and tech lead'
  }
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-seed-1',
    name: 'David K., Talent Lead',
    email: 'david@venturescale.io',
    subject: 'Lead Full-Stack Role at Series B FinTech',
    message: 'Hi Elena, I reviewed your Osiris and Apex trading architecture projects on GitHub. Your deep PostgreSQL and Node.js expertise aligns perfectly with our high-throughput trading team. Would you be open to an introductory call this Thursday?',
    category: 'Hiring / Job Opportunity',
    createdAt: '2026-10-12T14:22:00.000Z',
    status: 'read'
  },
  {
    id: 'msg-seed-2',
    name: 'Sophie Laurent',
    email: 'sophie@atelier-systems.com',
    subject: 'Consulting: PostgreSQL Performance Optimization',
    message: 'We are experiencing query degradation on our multi-tenant SaaS as our tables crossed 40M rows. We would love to bring you in for a 2-week architectural audit to review our indexing and connection pool strategy.',
    category: 'Contract / Consulting',
    createdAt: '2026-10-13T09:15:00.000Z',
    status: 'unread'
  }
];

export const DATABASE_SCHEMA_DDL = `-- PostgreSQL / Relational Schema Definition for Personal Portfolio
-- Generated for Elena Vance Full-Stack Architecture Engine

CREATE TABLE projects (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    description TEXT NOT NULL,
    full_story TEXT NOT NULL,
    tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    live_url VARCHAR(512),
    repo_url VARCHAR(512),
    image_url VARCHAR(512) NOT NULL,
    metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
    stars INTEGER NOT NULL DEFAULT 0,
    year VARCHAR(10) NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    architecture JSONB NOT NULL,
    key_decisions JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_stars ON projects(stars DESC);

CREATE TABLE skills (
    id VARCHAR(64) PRIMARY KEY,
    category VARCHAR(64) NOT NULL,
    name VARCHAR(128) NOT NULL,
    proficiency INTEGER NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
    years VARCHAR(32) NOT NULL,
    highlight VARCHAR(255) NOT NULL,
    level VARCHAR(32) NOT NULL
);

CREATE INDEX idx_skills_category ON skills(category);

CREATE TABLE experience (
    id VARCHAR(64) PRIMARY KEY,
    role VARCHAR(128) NOT NULL,
    company VARCHAR(128) NOT NULL,
    period VARCHAR(64) NOT NULL,
    location VARCHAR(128) NOT NULL,
    type VARCHAR(64) NOT NULL,
    description TEXT NOT NULL,
    achievements JSONB NOT NULL DEFAULT '[]'::jsonb,
    tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    display_order INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE contact_messages (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(32) NOT NULL DEFAULT 'unread'
);

CREATE INDEX idx_messages_status ON contact_messages(status);
CREATE INDEX idx_messages_created ON contact_messages(created_at DESC);

CREATE TABLE testimonials (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    role VARCHAR(128) NOT NULL,
    company VARCHAR(128) NOT NULL,
    avatar VARCHAR(512) NOT NULL,
    quote TEXT NOT NULL,
    relationship VARCHAR(255) NOT NULL
);
`;
