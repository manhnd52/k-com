export type RoadmapStatus = "pending" | "learning" | "done";

export type RoadmapStep = {
  id: string | number;
  title: string;
  description?: string;
  content?: string;
  resources?: string[];
  howTo?: string[];
  rule?: string;
  stage?: string;
  status?: RoadmapStatus;
  position?: {
    x: number;
    y: number;
  };
  dependsOn?: Array<string | number>;
};

export type RoadmapDetail = {
  id: string | number;
  author: string;
  authorAvatar: string;
  title: string;
  tags: string[];
  duration: string;
  level: string;
  description: string;
  views: number;
  likes: number;
  steps: RoadmapStep[];
};

const dataEngineeringRoadmap: RoadmapDetail = {
  id: "data-engineering",
  author: "Nguyen Duc Manh",
  authorAvatar: "N",
  title: "Data Engineering Roadmap",
  tags: ["Data & AI", "Data Engineering", "Intermediate"],
  duration: "6 months",
  level: "Intermediate",
  description:
    "Build a practical path from SQL and data modeling to batch pipelines, streaming, orchestration, and cloud data platforms.",
  views: 2140,
  likes: 486,
  steps: [
    {
      id: "de-foundations",
      title: "Programming Foundations",
      description: "Python, shell basics, Git, and clean project structure.",
      stage: "Foundation",
      status: "done",
      position: { x: 32, y: 220 },
      resources: ["Python for Everybody", "Git Handbook", "Automate the Boring Stuff"],
    },
    {
      id: "de-sql",
      title: "SQL and Databases",
      description: "Query relational data, design schemas, and reason about indexes.",
      stage: "Foundation",
      status: "learning",
      position: { x: 300, y: 220 },
      dependsOn: ["de-foundations"],
      resources: ["Mode SQL Tutorial", "PostgreSQL Documentation", "Use The Index, Luke"],
    },
    {
      id: "de-modeling",
      title: "Data Modeling",
      description: "Star schemas, normalization, dimensions, facts, and analytics-ready tables.",
      stage: "Core",
      status: "pending",
      position: { x: 568, y: 118 },
      dependsOn: ["de-sql"],
      resources: ["Kimball dimensional modeling notes", "dbt modeling best practices"],
    },
    {
      id: "de-python",
      title: "Python for Data",
      description: "Pandas, file formats, validation, and reusable data utilities.",
      stage: "Core",
      status: "pending",
      position: { x: 568, y: 322 },
      dependsOn: ["de-sql"],
      resources: ["Pandas user guide", "Polars documentation", "Great Expectations docs"],
    },
    {
      id: "de-warehouse",
      title: "Data Warehouse",
      description: "Load, transform, partition, and optimize warehouse tables.",
      stage: "Platform",
      status: "pending",
      position: { x: 836, y: 118 },
      dependsOn: ["de-modeling"],
      resources: ["BigQuery docs", "Snowflake guides", "Redshift best practices"],
    },
    {
      id: "de-batch",
      title: "Batch Pipelines",
      description: "Design reliable ETL/ELT pipelines with retries, idempotency, and tests.",
      stage: "Platform",
      status: "pending",
      position: { x: 836, y: 322 },
      dependsOn: ["de-python", "de-modeling"],
      resources: ["Apache Airflow docs", "dbt Learn", "Dagster University"],
    },
    {
      id: "de-streaming",
      title: "Streaming",
      description: "Process events with Kafka-style queues, windows, and exactly-once tradeoffs.",
      stage: "Advanced",
      status: "pending",
      position: { x: 1104, y: 32 },
      dependsOn: ["de-batch"],
      resources: ["Kafka documentation", "Designing Event-Driven Systems"],
    },
    {
      id: "de-orchestration",
      title: "Orchestration",
      description: "Schedule pipelines, monitor dependencies, and recover from failed runs.",
      stage: "Advanced",
      status: "pending",
      position: { x: 1104, y: 220 },
      dependsOn: ["de-batch", "de-warehouse"],
      resources: ["Airflow best practices", "Prefect docs", "Dagster docs"],
    },
    {
      id: "de-quality",
      title: "Quality and Observability",
      description: "Add tests, lineage, freshness checks, alerts, and incident workflows.",
      stage: "Advanced",
      status: "pending",
      position: { x: 1372, y: 220 },
      dependsOn: ["de-streaming", "de-orchestration"],
      resources: ["Monte Carlo data quality guide", "OpenLineage docs", "Great Expectations docs"],
    },
    {
      id: "de-portfolio",
      title: "Portfolio Project",
      description: "Ship a complete analytics platform with ingestion, transformations, docs, and dashboards.",
      stage: "Capstone",
      status: "pending",
      position: { x: 1640, y: 220 },
      dependsOn: ["de-quality"],
      resources: ["Build a public GitHub case study", "Write an architecture decision record"],
    },
  ],
};

const mlopsRoadmap: RoadmapDetail = {
  id: "mlops",
  author: "Tran Thi Huong",
  authorAvatar: "T",
  title: "Machine Learning Ops Roadmap",
  tags: ["Data & AI", "ML Engineer", "Advanced"],
  duration: "5 months",
  level: "Advanced",
  description:
    "Move models from notebooks into reliable production systems with tracking, deployment, monitoring, and governance.",
  views: 1820,
  likes: 394,
  steps: [
    {
      id: "ml-foundations",
      title: "ML Foundations",
      description: "Understand datasets, training loops, validation, metrics, and overfitting.",
      stage: "Foundation",
      status: "done",
      position: { x: 32, y: 220 },
      resources: ["Google ML Crash Course", "scikit-learn user guide"],
    },
    {
      id: "ml-code",
      title: "Production Python",
      description: "Package ML code, write tests, and create reproducible environments.",
      stage: "Foundation",
      status: "learning",
      position: { x: 300, y: 220 },
      dependsOn: ["ml-foundations"],
      resources: ["Pytest documentation", "Python Packaging User Guide"],
    },
    {
      id: "ml-tracking",
      title: "Experiment Tracking",
      description: "Track parameters, artifacts, models, metrics, and lineage.",
      stage: "Core",
      status: "pending",
      position: { x: 568, y: 110 },
      dependsOn: ["ml-code"],
      resources: ["MLflow docs", "Weights & Biases guides"],
    },
    {
      id: "ml-data",
      title: "Feature and Data Pipelines",
      description: "Build repeatable data preparation and feature generation jobs.",
      stage: "Core",
      status: "pending",
      position: { x: 568, y: 330 },
      dependsOn: ["ml-code"],
      resources: ["Feast documentation", "dbt docs", "Airflow docs"],
    },
    {
      id: "ml-registry",
      title: "Model Registry",
      description: "Version, review, approve, and promote models between environments.",
      stage: "Delivery",
      status: "pending",
      position: { x: 836, y: 110 },
      dependsOn: ["ml-tracking"],
      resources: ["MLflow model registry", "Model cards guide"],
    },
    {
      id: "ml-serving",
      title: "Model Serving",
      description: "Serve batch, real-time, and async predictions with clear contracts.",
      stage: "Delivery",
      status: "pending",
      position: { x: 1104, y: 220 },
      dependsOn: ["ml-registry", "ml-data"],
      resources: ["FastAPI docs", "KServe docs", "BentoML docs"],
    },
    {
      id: "ml-ci",
      title: "CI/CD for ML",
      description: "Automate tests, training checks, image builds, and deployment gates.",
      stage: "Delivery",
      status: "pending",
      position: { x: 836, y: 330 },
      dependsOn: ["ml-data"],
      resources: ["GitHub Actions docs", "CML documentation"],
    },
    {
      id: "ml-monitoring",
      title: "Monitoring",
      description: "Watch latency, errors, drift, data quality, and model performance after release.",
      stage: "Operations",
      status: "pending",
      position: { x: 1372, y: 220 },
      dependsOn: ["ml-serving", "ml-ci"],
      resources: ["Evidently AI docs", "Prometheus docs", "OpenTelemetry docs"],
    },
    {
      id: "ml-governance",
      title: "Governance",
      description: "Document risk, ownership, privacy, rollback plans, and responsible AI checks.",
      stage: "Operations",
      status: "pending",
      position: { x: 1640, y: 220 },
      dependsOn: ["ml-monitoring"],
      resources: ["NIST AI RMF", "Model cards", "Data sheets for datasets"],
    },
  ],
};

const frontendRoadmap: RoadmapDetail = {
  id: "frontend",
  author: "Le Van Minh",
  authorAvatar: "L",
  title: "Frontend Roadmap",
  tags: ["Web Development", "UI/UX", "Beginner"],
  duration: "4 months",
  level: "Beginner",
  description:
    "Master modern frontend development with semantic HTML, CSS, JavaScript, React, accessibility, and deployment.",
  views: 3890,
  likes: 567,
  steps: [
    {
      id: "fe-html",
      title: "HTML and Semantics",
      description: "Structure content with accessible, meaningful markup.",
      stage: "Foundation",
      status: "done",
      position: { x: 32, y: 220 },
      resources: ["MDN HTML", "web.dev Learn HTML"],
    },
    {
      id: "fe-css",
      title: "CSS Layout",
      description: "Build responsive layouts with flexbox, grid, and modern CSS.",
      stage: "Foundation",
      status: "learning",
      position: { x: 300, y: 118 },
      dependsOn: ["fe-html"],
      resources: ["MDN CSS", "web.dev Learn CSS"],
    },
    {
      id: "fe-js",
      title: "JavaScript",
      description: "Learn language basics, DOM events, async code, and modules.",
      stage: "Foundation",
      status: "learning",
      position: { x: 300, y: 322 },
      dependsOn: ["fe-html"],
      resources: ["JavaScript.info", "MDN JavaScript"],
    },
    {
      id: "fe-react",
      title: "React Fundamentals",
      description: "Build components, props, state, effects, and forms.",
      stage: "Core",
      status: "pending",
      position: { x: 568, y: 220 },
      dependsOn: ["fe-css", "fe-js"],
      resources: ["React docs", "Vite docs"],
    },
    {
      id: "fe-state",
      title: "State and Data",
      description: "Model client state, remote data, caching, and error states.",
      stage: "Core",
      status: "pending",
      position: { x: 836, y: 118 },
      dependsOn: ["fe-react"],
      resources: ["TanStack Query docs", "Redux Toolkit docs"],
    },
    {
      id: "fe-a11y",
      title: "Accessibility",
      description: "Ship keyboard-friendly, screen-reader-friendly interfaces.",
      stage: "Core",
      status: "pending",
      position: { x: 836, y: 322 },
      dependsOn: ["fe-react"],
      resources: ["WAI tutorials", "Deque axe guides"],
    },
    {
      id: "fe-testing",
      title: "Testing",
      description: "Cover components, user flows, and regressions.",
      stage: "Delivery",
      status: "pending",
      position: { x: 1104, y: 220 },
      dependsOn: ["fe-state", "fe-a11y"],
      resources: ["Testing Library docs", "Playwright docs"],
    },
    {
      id: "fe-deploy",
      title: "Deploy and Monitor",
      description: "Build, deploy, measure performance, and monitor errors.",
      stage: "Delivery",
      status: "pending",
      position: { x: 1372, y: 220 },
      dependsOn: ["fe-testing"],
      resources: ["Vercel docs", "Lighthouse docs", "Sentry docs"],
    },
  ],
};

const backendRoadmap: RoadmapDetail = {
  id: "backend",
  author: "Pham Quang Hung",
  authorAvatar: "P",
  title: "Backend Roadmap",
  tags: ["Web Development", "Backend", "Intermediate"],
  duration: "5 months",
  level: "Intermediate",
  description:
    "Learn APIs, databases, auth, background work, observability, and deployment for production backend systems.",
  views: 1760,
  likes: 341,
  steps: [
    {
      id: "be-language",
      title: "Language Basics",
      description: "Pick one backend language and learn project structure, testing, and packages.",
      stage: "Foundation",
      status: "done",
      position: { x: 32, y: 220 },
      resources: ["Node.js docs", "Python docs", "Go by Example"],
    },
    {
      id: "be-http",
      title: "HTTP and APIs",
      description: "Understand REST, routing, status codes, validation, and API contracts.",
      stage: "Foundation",
      status: "learning",
      position: { x: 300, y: 220 },
      dependsOn: ["be-language"],
      resources: ["MDN HTTP", "OpenAPI specification"],
    },
    {
      id: "be-db",
      title: "Databases",
      description: "Model relational data, write migrations, and tune queries.",
      stage: "Core",
      status: "pending",
      position: { x: 568, y: 118 },
      dependsOn: ["be-http"],
      resources: ["PostgreSQL docs", "Prisma docs", "SQLBolt"],
    },
    {
      id: "be-auth",
      title: "Authentication",
      description: "Implement sessions, tokens, password storage, roles, and permissions.",
      stage: "Core",
      status: "pending",
      position: { x: 568, y: 322 },
      dependsOn: ["be-http"],
      resources: ["OWASP auth cheat sheet", "JWT introduction"],
    },
    {
      id: "be-cache",
      title: "Caching and Queues",
      description: "Use Redis, job queues, retries, rate limits, and eventual consistency.",
      stage: "Scale",
      status: "pending",
      position: { x: 836, y: 118 },
      dependsOn: ["be-db"],
      resources: ["Redis docs", "BullMQ docs", "Celery docs"],
    },
    {
      id: "be-security",
      title: "Security",
      description: "Protect APIs against common app security risks.",
      stage: "Scale",
      status: "pending",
      position: { x: 836, y: 322 },
      dependsOn: ["be-auth", "be-db"],
      resources: ["OWASP Top 10", "API Security Top 10"],
    },
    {
      id: "be-observe",
      title: "Observability",
      description: "Add structured logs, metrics, traces, and useful alerts.",
      stage: "Operations",
      status: "pending",
      position: { x: 1104, y: 220 },
      dependsOn: ["be-cache", "be-security"],
      resources: ["OpenTelemetry docs", "Prometheus docs"],
    },
    {
      id: "be-deploy",
      title: "Deployment",
      description: "Containerize, configure environments, run migrations, and release safely.",
      stage: "Operations",
      status: "pending",
      position: { x: 1372, y: 220 },
      dependsOn: ["be-observe"],
      resources: ["Docker docs", "Fly.io docs", "Render docs"],
    },
  ],
};

const devopsRoadmap: RoadmapDetail = {
  id: "devops",
  author: "Dao Anh Tuan",
  authorAvatar: "D",
  title: "DevOps Engineer Roadmap",
  tags: ["DevOps", "Cloud", "Intermediate"],
  duration: "5 months",
  level: "Intermediate",
  description:
    "Master CI/CD pipelines, containerization, infrastructure as code, and cloud operations.",
  views: 2150,
  likes: 312,
  steps: [
    { id: "do-git", title: "Version Control", description: "Git and GitHub workflows.", stage: "Foundation", status: "done", position: { x: 32, y: 220 }, resources: ["Pro Git book"] },
    { id: "do-linux", title: "Linux Basics", description: "Shell, permissions, networking, and processes.", stage: "Foundation", status: "learning", position: { x: 300, y: 220 }, dependsOn: ["do-git"], resources: ["Linux Journey"] },
    { id: "do-ci", title: "CI/CD", description: "Automate build, test, and deployment pipelines.", stage: "Core", status: "pending", position: { x: 568, y: 118 }, dependsOn: ["do-linux"], resources: ["GitHub Actions docs"] },
    { id: "do-docker", title: "Docker", description: "Package apps into reliable containers.", stage: "Core", status: "pending", position: { x: 568, y: 322 }, dependsOn: ["do-linux"], resources: ["Docker docs"] },
    { id: "do-k8s", title: "Kubernetes", description: "Deploy and operate container workloads.", stage: "Platform", status: "pending", position: { x: 836, y: 220 }, dependsOn: ["do-ci", "do-docker"], resources: ["Kubernetes docs"] },
    { id: "do-iac", title: "Infrastructure as Code", description: "Provision cloud infrastructure repeatably.", stage: "Platform", status: "pending", position: { x: 1104, y: 220 }, dependsOn: ["do-k8s"], resources: ["Terraform docs"] },
    { id: "do-monitoring", title: "Monitoring", description: "Observe services and respond to incidents.", stage: "Operations", status: "pending", position: { x: 1372, y: 220 }, dependsOn: ["do-iac"], resources: ["Prometheus docs"] },
  ],
};

const securityRoadmap: RoadmapDetail = {
  id: "security",
  author: "Hoang Thi Mai",
  authorAvatar: "H",
  title: "Cybersecurity Roadmap",
  tags: ["Security", "DevOps", "Advanced"],
  duration: "7 months",
  level: "Advanced",
  description:
    "Cover network security, application security, threat modeling, testing, and governance.",
  views: 1890,
  likes: 421,
  steps: [
    { id: "sec-network", title: "Network Security", description: "Understand networks, firewalls, DNS, and TLS.", stage: "Foundation", status: "learning", position: { x: 32, y: 220 }, resources: ["Cloudflare learning center"] },
    { id: "sec-crypto", title: "Cryptography", description: "Learn encryption, hashing, signatures, and key exchange.", stage: "Foundation", status: "pending", position: { x: 300, y: 118 }, dependsOn: ["sec-network"], resources: ["Crypto 101"] },
    { id: "sec-app", title: "App Security", description: "Prevent injection, auth, session, and access-control flaws.", stage: "Core", status: "pending", position: { x: 300, y: 322 }, dependsOn: ["sec-network"], resources: ["OWASP Top 10"] },
    { id: "sec-pentest", title: "Security Testing", description: "Run threat-informed tests and document findings.", stage: "Core", status: "pending", position: { x: 568, y: 220 }, dependsOn: ["sec-crypto", "sec-app"], resources: ["PortSwigger Web Security Academy"] },
    { id: "sec-model", title: "Threat Modeling", description: "Identify risks and design controls before shipping.", stage: "Advanced", status: "pending", position: { x: 836, y: 220 }, dependsOn: ["sec-pentest"], resources: ["OWASP threat modeling"] },
    { id: "sec-compliance", title: "Compliance", description: "Map technical controls to ISO, SOC 2, and NIST expectations.", stage: "Advanced", status: "pending", position: { x: 1104, y: 220 }, dependsOn: ["sec-model"], resources: ["NIST CSF"] },
  ],
};

const dataAnalystRoadmap: RoadmapDetail = {
  id: "data-analyst",
  author: "Pham Quang Hung",
  authorAvatar: "P",
  title: "Data Analyst Roadmap",
  tags: ["Data & AI", "Analytics", "Beginner"],
  duration: "3 months",
  level: "Beginner",
  description:
    "Learn spreadsheets, SQL, analytics, visualization, and storytelling with data.",
  views: 960,
  likes: 178,
  steps: [
    { id: "da-excel", title: "Excel Basics", description: "Spreadsheet fundamentals.", stage: "Foundation", status: "done", position: { x: 32, y: 220 }, resources: ["Excel training"] },
    { id: "da-sql", title: "SQL", description: "Query and aggregate business data.", stage: "Foundation", status: "learning", position: { x: 300, y: 220 }, dependsOn: ["da-excel"], resources: ["SQLBolt"] },
    { id: "da-python", title: "Python for Data", description: "Use Pandas and NumPy for analysis.", stage: "Core", status: "pending", position: { x: 568, y: 118 }, dependsOn: ["da-sql"], resources: ["Pandas docs"] },
    { id: "da-viz", title: "Data Visualization", description: "Build useful dashboards and charts.", stage: "Core", status: "pending", position: { x: 568, y: 322 }, dependsOn: ["da-sql"], resources: ["Tableau resources", "Power BI learning"] },
    { id: "da-stats", title: "Statistical Analysis", description: "Interpret trends, experiments, and uncertainty.", stage: "Advanced", status: "pending", position: { x: 836, y: 220 }, dependsOn: ["da-python", "da-viz"], resources: ["Khan Academy statistics"] },
  ],
};

const mobileRoadmap: RoadmapDetail = {
  id: "mobile",
  author: "Dao Anh Tuan",
  authorAvatar: "D",
  title: "Mobile Developer Roadmap",
  tags: ["Mobile", "Web Development", "Intermediate"],
  duration: "5 months",
  level: "Intermediate",
  description:
    "Build cross-platform mobile applications with React Native and modern development workflows.",
  views: 1320,
  likes: 290,
  steps: [
    { id: "mo-rn", title: "React Native Basics", description: "Core components and project setup.", stage: "Foundation", status: "learning", position: { x: 32, y: 220 }, resources: ["React Native docs"] },
    { id: "mo-nav", title: "Navigation", description: "Screen stacks, tabs, and deep links.", stage: "Core", status: "pending", position: { x: 300, y: 118 }, dependsOn: ["mo-rn"], resources: ["React Navigation docs"] },
    { id: "mo-state", title: "State Management", description: "Manage app and server state.", stage: "Core", status: "pending", position: { x: 300, y: 322 }, dependsOn: ["mo-rn"], resources: ["Redux Toolkit docs"] },
    { id: "mo-native", title: "Native Modules", description: "Bridge to device APIs when needed.", stage: "Advanced", status: "pending", position: { x: 568, y: 220 }, dependsOn: ["mo-nav", "mo-state"], resources: ["Expo modules docs"] },
    { id: "mo-ship", title: "App Deployment", description: "Release to app stores and monitor crashes.", stage: "Delivery", status: "pending", position: { x: 836, y: 220 }, dependsOn: ["mo-native"], resources: ["Expo EAS docs"] },
  ],
};

export const ROADMAP_DETAILS: Record<string, RoadmapDetail> = {
  "data-engineering": dataEngineeringRoadmap,
  mlops: mlopsRoadmap,
  frontend: frontendRoadmap,
  backend: backendRoadmap,
  devops: devopsRoadmap,
  security: securityRoadmap,
  "data-analyst": dataAnalystRoadmap,
  mobile: mobileRoadmap,
};

export const ROADMAP_ID_ALIASES: Record<string, string> = {
  "1": "mlops",
  "2": "frontend",
  "3": "devops",
  "4": "data-analyst",
  "5": "security",
  "6": "mobile",
};

export const getMockRoadmapById = (id: string | number): RoadmapDetail | null => {
  const key = String(id);
  const resolvedKey = ROADMAP_DETAILS[key] ? key : ROADMAP_ID_ALIASES[key];

  return resolvedKey ? ROADMAP_DETAILS[resolvedKey] ?? null : null;
};

export const getMockRoadmapCards = () =>
  Object.values(ROADMAP_DETAILS).map((roadmap) => ({
    id: roadmap.id,
    author: roadmap.author,
    authorAvatar: roadmap.authorAvatar,
    title: roadmap.title,
    tags: roadmap.tags,
    duration: roadmap.duration,
    level: roadmap.level,
    steps: roadmap.steps.length,
    description: roadmap.description,
    views: roadmap.views,
    likes: roadmap.likes,
  }));
