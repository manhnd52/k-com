export type RoadmapStatus = "pending" | "learning" | "done";

export type RoadmapStep = {
  id: string | number;
  title: string;
  description: string;
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

export const LEGACY_ROADMAP_DETAILS: Record<number, RoadmapDetail> = {
  1: {
    id: 1,
    author: "Nguyen Duc Manh",
    authorAvatar: "N",
    title: "ML Engineer Roadmap",
    tags: ["Data & AI", "Data Engineering", "Intermediate"],
    duration: "6 months",
    level: "Intermediate",
    description:
      "A structured learning path from programming foundation to model deployment.",
    views: 1420,
    likes: 234,
    steps: [
      {
        id: 1,
        title: "Introduction",
        description: "Understand fundamentals of machine learning",
        content: "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can analyze data, identify patterns, and make decisions with minimal human intervention.",
        resources: [
          "Andrew Ng's Machine Learning Course on Coursera",
          "Fast.ai - Practical Deep Learning for Coders",
          "Google Machine Learning Crash Course",
          "Kaggle Learn - Introduction to Machine Learning",
          "YouTube: StatQuest Machine Learning Videos"
        ],
        howTo: [
          "Learn → Start with the fundamentals of ML concepts and terminology",
          "Understand → Study supervised vs unsupervised learning",
          "Practice → Work through beginner-friendly datasets on Kaggle",
          "Review → Take quizzes to reinforce concepts",
          "Debug → Understand your own errors"
        ],
        rule: "If you're not learning, you're not progressing."
      },
      {
        id: 2,
        title: "Python Basics",
        description: "Learn Python programming language",
        content: "Python is a high-level, interpreted language known for readability, simplicity and versatility. It supports multiple paradigms with rich ecosystem including NumPy, Pandas, TensorFlow/PyTorch (ML), Used for web development, data science, automation, and scripting.",
        resources: [
          "roadmap/visit Dedicated Python Roadmap",
          "coursePython Full Course for free",
          "officialPython Website",
          "articleAutomate the Boring Stuff",
          "articleAn Introduction to Python for Non-Programmers",
          "feedExplore top posts about Python"
        ],
        howTo: [
          "Learn → code immediately (no passive reading)",
          "Do small daily tasks (read CSV, clean data, simple scripts)",
          "Practice logic on LeetCode (easy)",
          "Debug your own errors"
        ],
        rule: "If you're not coding, you're not progressing."
      },
      {
        id: 3,
        title: "Data Processing",
        description: "Data cleaning and preprocessing techniques",
        content: "Data processing is the transformation of raw data into actionable insights. It involves cleaning, structuring, and organizing data to prepare it for analysis and model training. This is typically 70-80% of the work in any ML project.",
        resources: [
          "Pandas Documentation and Tutorials",
          "Data Cleaning Best Practices Guide",
          "Kaggle Dataset Cleaning Examples",
          "Missing Data Imputation Strategies",
          "Feature Engineering Handbook"
        ],
        howTo: [
          "Learn → Understand data quality issues",
          "Import → Load datasets using Pandas",
          "Explore → Use EDA (Exploratory Data Analysis)",
          "Clean → Handle missing values and outliers",
          "Transform → Normalize and scale features"
        ],
        rule: "Garbage in, garbage out - quality data is essential."
      },
      {
        id: 4,
        title: "Model Training",
        description: "Train and evaluate machine learning models",
        content: "Model training is the process where algorithms learn patterns from data. It involves selecting appropriate algorithms, tuning hyperparameters, and iterating to improve performance. Understanding train/test splits and validation techniques is crucial.",
        resources: [
          "Scikit-learn Model Selection Guide",
          "TensorFlow/PyTorch Documentation",
          "Hyperparameter Tuning Techniques",
          "Cross-Validation Strategies",
          "Andrew Ng: ML System Design"
        ],
        howTo: [
          "Learn → Study different algorithms and their use cases",
          "Choose → Select appropriate model for your problem",
          "Prepare → Split data into train/validation/test sets",
          "Train → Fit the model to training data",
          "Tune → Adjust hyperparameters for better performance"
        ],
        rule: "Start simple, then add complexity only when needed."
      },
      {
        id: 5,
        title: "Evaluation",
        description: "Assess model performance and metrics",
        content: "Model evaluation measures how well your trained model performs on unseen data. It involves understanding appropriate metrics for your problem (accuracy, precision, recall, F1, MSE, etc.) and avoiding common pitfalls like overfitting.",
        resources: [
          "Metrics and Scoring Explained",
          "Confusion Matrix and ROC Curves",
          "Model Evaluation Best Practices",
          "Avoiding Overfitting Techniques",
          "Interpreting Model Results"
        ],
        howTo: [
          "Learn → Understand different evaluation metrics",
          "Choose → Pick metrics aligned with business goals",
          "Evaluate → Run predictions on test set",
          "Compare → Analyze model performance",
          "Iterate → Refine model based on results"
        ],
        rule: "Trust metrics over intuition; numbers don't lie."
      }
    ],
  },
  2: {
    id: 2,
    author: "Tran Thi Huong",
    authorAvatar: "T",
    title: "Frontend Developer",
    tags: ["Web Development", "UI/UX", "Beginner"],
    duration: "4 months",
    level: "Beginner",
    description:
      "Master modern web development with React, responsive design, and accessibility best practices.",
    views: 3890,
    likes: 567,
    steps: [
      {
        id: 1,
        title: "HTML & CSS",
        description: "Web fundamentals and styling",
      },
      {
        id: 2,
        title: "JavaScript Basics",
        description: "Learn JavaScript core concepts",
      },
      {
        id: 3,
        title: "React Fundamentals",
        description: "Components, props, and state management",
      },
      {
        id: 4,
        title: "Responsive Design",
        description: "Mobile-first and responsive layouts",
      },
      {
        id: 5,
        title: "Advanced React",
        description: "Hooks, context, and performance",
      },
    ],
  },
  3: {
    id: 3,
    author: "Le Van Minh",
    authorAvatar: "L",
    title: "DevOps Engineer",
    tags: ["DevOps", "Cloud", "Intermediate"],
    duration: "5 months",
    level: "Intermediate",
    description:
      "Master CI/CD pipelines, containerization, and orchestration with modern DevOps practices.",
    views: 2150,
    likes: 312,
    steps: [
      {
        id: 1,
        title: "Version Control",
        description: "Git and GitHub workflows",
      },
      {
        id: 2,
        title: "CI/CD Pipelines",
        description: "Automate build and deployment",
      },
      {
        id: 3,
        title: "Docker & Containers",
        description: "Containerization fundamentals",
      },
      {
        id: 4,
        title: "Kubernetes",
        description: "Container orchestration platform",
      },
      {
        id: 5,
        title: "Infrastructure as Code",
        description: "Terraform and cloud infrastructure",
      },
    ],
  },
  4: {
    id: 4,
    author: "Pham Quang Hung",
    authorAvatar: "P",
    title: "Data Analyst",
    tags: ["Data & AI", "Analytics", "Beginner"],
    duration: "3 months",
    level: "Beginner",
    description:
      "Learn data analysis, visualization, and storytelling with data for business insights.",
    views: 960,
    likes: 178,
    steps: [
      { id: 1, title: "Excel Basics", description: "Spreadsheet fundamentals" },
      { id: 2, title: "SQL", description: "Database querying" },
      { id: 3, title: "Python for Data", description: "Pandas and NumPy" },
      { id: 4, title: "Data Visualization", description: "Tableau and Power BI" },
      { id: 5, title: "Statistical Analysis", description: "Data insights" },
    ],
  },
  5: {
    id: 5,
    author: "Hoang Thi Mai",
    authorAvatar: "H",
    title: "Cybersecurity Specialist",
    tags: ["Security", "DevOps", "Advanced"],
    duration: "7 months",
    level: "Advanced",
    description:
      "Comprehensive security training covering network security, ethical hacking, and compliance.",
    views: 1890,
    likes: 421,
    steps: [
      {
        id: 1,
        title: "Network Security",
        description: "Network fundamentals and security",
      },
      { id: 2, title: "Cryptography", description: "Encryption and protocols" },
      {
        id: 3,
        title: "Ethical Hacking",
        description: "Penetration testing basics",
      },
      {
        id: 4,
        title: "Threat Modeling",
        description: "Security architecture",
      },
      { id: 5, title: "Compliance", description: "ISO 27001 and NIST" },
    ],
  },
  6: {
    id: 6,
    author: "Dao Anh Tuan",
    authorAvatar: "D",
    title: "Mobile Developer (React Native)",
    tags: ["Mobile", "Web Development", "Intermediate"],
    duration: "5 months",
    level: "Intermediate",
    description:
      "Build cross-platform mobile applications with React Native and modern development practices.",
    views: 1320,
    likes: 290,
    steps: [
      {
        id: 1,
        title: "React Native Basics",
        description: "Core concepts and setup",
      },
      {
        id: 2,
        title: "Navigation",
        description: "Screen and navigation patterns",
      },
      {
        id: 3,
        title: "State Management",
        description: "Redux and Context API",
      },
      {
        id: 4,
        title: "Native Modules",
        description: "Bridge to native code",
      },
      {
        id: 5,
        title: "App Deployment",
        description: "Publishing to app stores",
      },
    ],
  },
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
      id: "de-quality",
      title: "Quality and Observability",
      description: "Add tests, lineage, freshness checks, alerts, and incident workflows.",
      stage: "Advanced",
      status: "pending",
      position: { x: 1104, y: 220 },
      dependsOn: ["de-warehouse", "de-batch"],
      resources: ["OpenLineage docs", "Great Expectations docs"],
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

const cloudArchitectRoadmap: RoadmapDetail = {
  id: "cloud-architect",
  author: "Nguyen Duc Manh",
  authorAvatar: "N",
  title: "Cloud Architect Roadmap",
  tags: ["DevOps", "Cloud", "Advanced"],
  duration: "6 months",
  level: "Advanced",
  description:
    "Design reliable cloud systems with networking, identity, infrastructure, observability, cost control, and disaster recovery.",
  views: 1480,
  likes: 276,
  steps: [
    { id: "ca-cloud", title: "Cloud Foundations", description: "Understand regions, availability zones, compute, storage, and managed services.", stage: "Foundation", status: "done", position: { x: 32, y: 220 }, resources: ["AWS Skill Builder", "Azure fundamentals", "Google Cloud training"] },
    { id: "ca-network", title: "Cloud Networking", description: "Design VPCs, subnets, routing, load balancing, DNS, and private connectivity.", stage: "Foundation", status: "learning", position: { x: 300, y: 118 }, dependsOn: ["ca-cloud"], resources: ["AWS VPC docs", "Google Cloud VPC docs"] },
    { id: "ca-identity", title: "Identity and Access", description: "Model accounts, roles, policies, secrets, and least-privilege access.", stage: "Foundation", status: "learning", position: { x: 300, y: 322 }, dependsOn: ["ca-cloud"], resources: ["IAM best practices", "Cloud security foundations"] },
    { id: "ca-iac", title: "Infrastructure as Code", description: "Provision environments repeatably with modules, state, reviews, and promotion flows.", stage: "Core", status: "pending", position: { x: 568, y: 220 }, dependsOn: ["ca-network", "ca-identity"], resources: ["Terraform docs", "Pulumi docs"] },
    { id: "ca-resilience", title: "Resilience Design", description: "Plan redundancy, backups, failover, disaster recovery, and recovery objectives.", stage: "Core", status: "pending", position: { x: 836, y: 118 }, dependsOn: ["ca-iac"], resources: ["AWS Well-Architected Reliability Pillar", "Google SRE book"] },
    { id: "ca-observe", title: "Observability", description: "Build logs, metrics, traces, dashboards, alerts, and incident response loops.", stage: "Operations", status: "pending", position: { x: 836, y: 322 }, dependsOn: ["ca-iac"], resources: ["OpenTelemetry docs", "Prometheus docs"] },
    { id: "ca-cost", title: "Cost Optimization", description: "Forecast spend, choose pricing models, right-size workloads, and set guardrails.", stage: "Operations", status: "pending", position: { x: 1104, y: 220 }, dependsOn: ["ca-resilience", "ca-observe"], resources: ["Cloud cost management guides", "FinOps Foundation"] },
    { id: "ca-review", title: "Architecture Review", description: "Document tradeoffs, risks, diagrams, decisions, and rollout plans.", stage: "Capstone", status: "pending", position: { x: 1372, y: 220 }, dependsOn: ["ca-cost"], resources: ["Architecture decision records", "Well-Architected reviews"] },
  ],
};

const productManagerRoadmap: RoadmapDetail = {
  id: "product-manager",
  author: "Tran Thi Huong",
  authorAvatar: "T",
  title: "Product Manager Roadmap",
  tags: ["Product", "Business", "Beginner"],
  duration: "4 months",
  level: "Beginner",
  description:
    "Learn product discovery, user research, prioritization, metrics, roadmap planning, delivery, and stakeholder communication.",
  views: 1215,
  likes: 242,
  steps: [
    { id: "pm-product", title: "Product Thinking", description: "Understand problems, users, value, constraints, and product outcomes.", stage: "Foundation", status: "done", position: { x: 32, y: 220 }, resources: ["Inspired by Marty Cagan", "Product mindset notes"] },
    { id: "pm-research", title: "User Research", description: "Run interviews, synthesize insights, map journeys, and find unmet needs.", stage: "Discovery", status: "learning", position: { x: 300, y: 118 }, dependsOn: ["pm-product"], resources: ["The Mom Test", "Nielsen Norman Group research guides"] },
    { id: "pm-market", title: "Market and Competitors", description: "Analyze segments, alternatives, positioning, and product opportunities.", stage: "Discovery", status: "pending", position: { x: 300, y: 322 }, dependsOn: ["pm-product"], resources: ["Positioning guides", "Competitive analysis templates"] },
    { id: "pm-prioritize", title: "Prioritization", description: "Use impact, confidence, effort, risk, and strategy to choose what to build.", stage: "Planning", status: "pending", position: { x: 568, y: 220 }, dependsOn: ["pm-research", "pm-market"], resources: ["RICE prioritization", "Opportunity solution trees"] },
    { id: "pm-metrics", title: "Product Metrics", description: "Define activation, retention, conversion, north-star metrics, and guardrails.", stage: "Planning", status: "pending", position: { x: 836, y: 118 }, dependsOn: ["pm-prioritize"], resources: ["Lean Analytics", "Amplitude product analytics guides"] },
    { id: "pm-delivery", title: "Delivery with Engineering", description: "Write clear requirements, break down scope, manage tradeoffs, and unblock teams.", stage: "Execution", status: "pending", position: { x: 836, y: 322 }, dependsOn: ["pm-prioritize"], resources: ["Agile product management", "Shape Up"] },
    { id: "pm-launch", title: "Launch and Feedback", description: "Prepare release plans, messaging, enablement, measurement, and iteration loops.", stage: "Execution", status: "pending", position: { x: 1104, y: 220 }, dependsOn: ["pm-metrics", "pm-delivery"], resources: ["Launch checklist examples", "Product feedback loops"] },
    { id: "pm-strategy", title: "Product Strategy", description: "Connect vision, bets, roadmap, operating cadence, and stakeholder alignment.", stage: "Advanced", status: "pending", position: { x: 1372, y: 220 }, dependsOn: ["pm-launch"], resources: ["Good Strategy Bad Strategy", "Product strategy templates"] },
  ],
};

const uiUxDesignerRoadmap: RoadmapDetail = {
  id: "ui-ux-designer",
  author: "Le Van Minh",
  authorAvatar: "L",
  title: "UI/UX Designer Roadmap",
  tags: ["UI/UX", "Product", "Beginner"],
  duration: "4 months",
  level: "Beginner",
  description:
    "Learn user research, wireframing, visual design, prototyping, usability testing, and design handoff for digital products.",
  views: 1675,
  likes: 318,
  steps: [
    { id: "ux-research", title: "User Research", description: "Interview users, map pain points, and turn insights into product opportunities.", stage: "Discovery", status: "done", position: { x: 32, y: 220 }, resources: ["Nielsen Norman Group", "Just Enough Research"] },
    { id: "ux-personas", title: "Personas and Journeys", description: "Create personas, journey maps, and task flows to align design decisions.", stage: "Discovery", status: "learning", position: { x: 300, y: 118 }, dependsOn: ["ux-research"], resources: ["Journey mapping guides"] },
    { id: "ux-wireframes", title: "Wireframing", description: "Sketch screens, information architecture, and low-fidelity flows.", stage: "Structure", status: "pending", position: { x: 300, y: 322 }, dependsOn: ["ux-research"], resources: ["Figma wireframing", "Balsamiq guides"] },
    { id: "ux-visual", title: "Visual Design", description: "Use typography, spacing, color, hierarchy, and layout systems.", stage: "Design", status: "pending", position: { x: 568, y: 220 }, dependsOn: ["ux-personas", "ux-wireframes"], resources: ["Refactoring UI", "Material Design"] },
    { id: "ux-prototype", title: "Prototyping", description: "Build interactive flows that communicate motion, state, and intent.", stage: "Design", status: "pending", position: { x: 836, y: 118 }, dependsOn: ["ux-visual"], resources: ["Figma prototyping docs"] },
    { id: "ux-testing", title: "Usability Testing", description: "Test prototypes, measure friction, and prioritize improvements.", stage: "Validation", status: "pending", position: { x: 836, y: 322 }, dependsOn: ["ux-prototype"], resources: ["Usability testing checklist"] },
    { id: "ux-handoff", title: "Design Handoff", description: "Prepare specs, components, assets, and collaboration notes for engineers.", stage: "Delivery", status: "pending", position: { x: 1104, y: 220 }, dependsOn: ["ux-testing"], resources: ["Design system handoff guides"] },
  ],
};

const qaEngineerRoadmap: RoadmapDetail = {
  id: "qa-engineer",
  author: "Hoang Thi Mai",
  authorAvatar: "H",
  title: "QA Engineer Roadmap",
  tags: ["Testing", "Web Development", "Beginner"],
  duration: "4 months",
  level: "Beginner",
  description:
    "Build a practical QA foundation with test planning, manual testing, automation, API testing, bug reporting, and CI quality gates.",
  views: 1032,
  likes: 205,
  steps: [
    { id: "qa-basics", title: "Testing Fundamentals", description: "Understand test types, quality risk, test cases, and release confidence.", stage: "Foundation", status: "done", position: { x: 32, y: 220 }, resources: ["ISTQB foundation notes"] },
    { id: "qa-manual", title: "Manual Testing", description: "Write scenarios, execute test cases, and report clear bugs.", stage: "Foundation", status: "learning", position: { x: 300, y: 220 }, dependsOn: ["qa-basics"], resources: ["Bug report examples"] },
    { id: "qa-api", title: "API Testing", description: "Validate REST APIs, status codes, payloads, auth, and edge cases.", stage: "Core", status: "pending", position: { x: 568, y: 118 }, dependsOn: ["qa-manual"], resources: ["Postman Learning Center"] },
    { id: "qa-web", title: "Web Automation", description: "Automate user flows, assertions, fixtures, and browser states.", stage: "Core", status: "pending", position: { x: 568, y: 322 }, dependsOn: ["qa-manual"], resources: ["Playwright docs", "Cypress docs"] },
    { id: "qa-data", title: "Test Data Management", description: "Create reliable datasets, reset states, and isolate test environments.", stage: "Advanced", status: "pending", position: { x: 836, y: 118 }, dependsOn: ["qa-api", "qa-web"], resources: ["Testing data strategies"] },
    { id: "qa-ci", title: "CI Quality Gates", description: "Run tests in pipelines, collect reports, and block risky releases.", stage: "Advanced", status: "pending", position: { x: 836, y: 322 }, dependsOn: ["qa-web"], resources: ["GitHub Actions docs"] },
    { id: "qa-strategy", title: "QA Strategy", description: "Balance manual, automated, exploratory, performance, and regression coverage.", stage: "Capstone", status: "pending", position: { x: 1104, y: 220 }, dependsOn: ["qa-data", "qa-ci"], resources: ["Test strategy templates"] },
  ],
};

const gameDeveloperRoadmap: RoadmapDetail = {
  id: "game-developer",
  author: "Pham Quang Hung",
  authorAvatar: "P",
  title: "Game Developer Roadmap",
  tags: ["Game Development", "Programming", "Intermediate"],
  duration: "6 months",
  level: "Intermediate",
  description:
    "Learn gameplay programming, game loops, physics, animation, UI, level design, optimization, and publishing workflows.",
  views: 2290,
  likes: 502,
  steps: [
    { id: "gd-language", title: "Programming Basics", description: "Build strong fundamentals in C#, C++, or JavaScript for game systems.", stage: "Foundation", status: "done", position: { x: 32, y: 220 }, resources: ["C# docs", "C++ learn guides"] },
    { id: "gd-engine", title: "Game Engine Basics", description: "Understand scenes, objects, components, prefabs, input, and assets.", stage: "Foundation", status: "learning", position: { x: 300, y: 220 }, dependsOn: ["gd-language"], resources: ["Unity Learn", "Godot docs"] },
    { id: "gd-loop", title: "Game Loop and State", description: "Model update loops, state machines, timers, collisions, and events.", stage: "Core", status: "pending", position: { x: 568, y: 118 }, dependsOn: ["gd-engine"], resources: ["Game Programming Patterns"] },
    { id: "gd-physics", title: "Physics and Movement", description: "Implement character movement, forces, collision layers, and camera follow.", stage: "Core", status: "pending", position: { x: 568, y: 322 }, dependsOn: ["gd-engine"], resources: ["Unity physics docs"] },
    { id: "gd-ui", title: "Game UI", description: "Create menus, HUDs, popups, feedback states, and controller-friendly navigation.", stage: "Experience", status: "pending", position: { x: 836, y: 118 }, dependsOn: ["gd-loop"], resources: ["Game UI design notes"] },
    { id: "gd-level", title: "Level Design", description: "Design progression, difficulty curves, mechanics, goals, and onboarding.", stage: "Experience", status: "pending", position: { x: 836, y: 322 }, dependsOn: ["gd-physics"], resources: ["Level design patterns"] },
    { id: "gd-ship", title: "Optimize and Publish", description: "Profile performance, package builds, handle saves, and publish releases.", stage: "Delivery", status: "pending", position: { x: 1104, y: 220 }, dependsOn: ["gd-ui", "gd-level"], resources: ["Steamworks docs", "Mobile publishing guides"] },
  ],
};

const blockchainDeveloperRoadmap: RoadmapDetail = {
  id: "blockchain-developer",
  author: "Dao Anh Tuan",
  authorAvatar: "D",
  title: "Blockchain Developer Roadmap",
  tags: ["Blockchain", "Security", "Advanced"],
  duration: "6 months",
  level: "Advanced",
  description:
    "Learn distributed ledgers, smart contracts, wallet flows, security reviews, testing, indexing, and decentralized app architecture.",
  views: 980,
  likes: 187,
  steps: [
    { id: "bc-basics", title: "Blockchain Concepts", description: "Understand blocks, consensus, transactions, accounts, gas, and finality.", stage: "Foundation", status: "done", position: { x: 32, y: 220 }, resources: ["Ethereum docs", "Bitcoin whitepaper"] },
    { id: "bc-solidity", title: "Smart Contracts", description: "Write contracts, events, storage layouts, modifiers, and interfaces.", stage: "Core", status: "learning", position: { x: 300, y: 220 }, dependsOn: ["bc-basics"], resources: ["Solidity docs"] },
    { id: "bc-testing", title: "Contract Testing", description: "Test deployments, transactions, reverts, fixtures, and edge cases.", stage: "Core", status: "pending", position: { x: 568, y: 118 }, dependsOn: ["bc-solidity"], resources: ["Hardhat docs", "Foundry book"] },
    { id: "bc-security", title: "Smart Contract Security", description: "Prevent reentrancy, access bugs, oracle issues, and economic attacks.", stage: "Security", status: "pending", position: { x: 568, y: 322 }, dependsOn: ["bc-solidity"], resources: ["OpenZeppelin guides", "SWC registry"] },
    { id: "bc-dapp", title: "DApp Frontend", description: "Connect wallets, read contracts, send transactions, and handle chain state.", stage: "Application", status: "pending", position: { x: 836, y: 118 }, dependsOn: ["bc-testing"], resources: ["wagmi docs", "ethers docs"] },
    { id: "bc-indexing", title: "Indexing and Data", description: "Build event indexers, subgraphs, and query layers for product features.", stage: "Application", status: "pending", position: { x: 836, y: 322 }, dependsOn: ["bc-testing"], resources: ["The Graph docs"] },
    { id: "bc-launch", title: "Audit and Launch", description: "Prepare audits, monitoring, migrations, docs, and incident playbooks.", stage: "Delivery", status: "pending", position: { x: 1104, y: 220 }, dependsOn: ["bc-security", "bc-dapp", "bc-indexing"], resources: ["Audit checklist", "OpenZeppelin Defender"] },
  ],
};

const technicalWriterRoadmap: RoadmapDetail = {
  id: "technical-writer",
  author: "Nguyen Duc Manh",
  authorAvatar: "N",
  title: "Technical Writer Roadmap",
  tags: ["Documentation", "Communication", "Beginner"],
  duration: "3 months",
  level: "Beginner",
  description:
    "Learn developer documentation, information architecture, tutorials, API references, docs tooling, review workflows, and content quality.",
  views: 740,
  likes: 138,
  steps: [
    { id: "tw-audience", title: "Audience and Purpose", description: "Define readers, jobs to be done, knowledge gaps, and success criteria.", stage: "Foundation", status: "done", position: { x: 32, y: 220 }, resources: ["Docs for Developers"] },
    { id: "tw-structure", title: "Information Architecture", description: "Organize docs into concepts, tasks, references, tutorials, and troubleshooting.", stage: "Foundation", status: "learning", position: { x: 300, y: 220 }, dependsOn: ["tw-audience"], resources: ["Diataxis framework"] },
    { id: "tw-tutorials", title: "Tutorial Writing", description: "Write step-by-step guides with clear setup, outcomes, and verification.", stage: "Core", status: "pending", position: { x: 568, y: 118 }, dependsOn: ["tw-structure"], resources: ["Google developer documentation style guide"] },
    { id: "tw-api", title: "API Reference", description: "Document endpoints, parameters, schemas, examples, and error responses.", stage: "Core", status: "pending", position: { x: 568, y: 322 }, dependsOn: ["tw-structure"], resources: ["OpenAPI specification"] },
    { id: "tw-tooling", title: "Docs Tooling", description: "Use Markdown, static site generators, linting, search, and preview workflows.", stage: "Delivery", status: "pending", position: { x: 836, y: 118 }, dependsOn: ["tw-tutorials"], resources: ["Docusaurus docs", "MkDocs docs"] },
    { id: "tw-review", title: "Editorial Review", description: "Review clarity, accuracy, examples, style, inclusivity, and freshness.", stage: "Delivery", status: "pending", position: { x: 836, y: 322 }, dependsOn: ["tw-api"], resources: ["Microsoft style guide"] },
    { id: "tw-maintain", title: "Docs Maintenance", description: "Set ownership, changelogs, analytics, issue triage, and update cadence.", stage: "Operations", status: "pending", position: { x: 1104, y: 220 }, dependsOn: ["tw-tooling", "tw-review"], resources: ["Docs analytics guides"] },
  ],
};

const dataScientistRoadmap: RoadmapDetail = {
  id: "data-scientist",
  author: "Tran Thi Huong",
  authorAvatar: "T",
  title: "Data Scientist Roadmap",
  tags: ["Data & AI", "Machine Learning", "Intermediate"],
  duration: "6 months",
  level: "Intermediate",
  description:
    "Build a complete data science skill set across statistics, Python, data analysis, machine learning, experiments, and communication.",
  views: 2580,
  likes: 611,
  steps: [
    { id: "ds-python", title: "Python for Analysis", description: "Use Python, notebooks, NumPy, Pandas, and visualization libraries.", stage: "Foundation", status: "done", position: { x: 32, y: 220 }, resources: ["Pandas docs", "Kaggle Learn"] },
    { id: "ds-stats", title: "Statistics", description: "Understand distributions, sampling, confidence intervals, and hypothesis testing.", stage: "Foundation", status: "learning", position: { x: 300, y: 118 }, dependsOn: ["ds-python"], resources: ["Khan Academy statistics"] },
    { id: "ds-sql", title: "SQL for Data", description: "Query, aggregate, join, and validate data from relational databases.", stage: "Foundation", status: "learning", position: { x: 300, y: 322 }, dependsOn: ["ds-python"], resources: ["SQLBolt", "Mode SQL tutorial"] },
    { id: "ds-eda", title: "Exploratory Analysis", description: "Clean datasets, find patterns, detect outliers, and form hypotheses.", stage: "Core", status: "pending", position: { x: 568, y: 220 }, dependsOn: ["ds-stats", "ds-sql"], resources: ["Data analysis with Python"] },
    { id: "ds-ml", title: "Machine Learning", description: "Train models, validate performance, choose metrics, and avoid leakage.", stage: "Core", status: "pending", position: { x: 836, y: 118 }, dependsOn: ["ds-eda"], resources: ["scikit-learn docs"] },
    { id: "ds-experiments", title: "Experimentation", description: "Design A/B tests, analyze impact, and communicate uncertainty.", stage: "Applied", status: "pending", position: { x: 836, y: 322 }, dependsOn: ["ds-stats", "ds-eda"], resources: ["Trustworthy Online Controlled Experiments"] },
    { id: "ds-story", title: "Data Storytelling", description: "Turn analysis into decisions with clear charts, narratives, and recommendations.", stage: "Capstone", status: "pending", position: { x: 1104, y: 220 }, dependsOn: ["ds-ml", "ds-experiments"], resources: ["Storytelling with Data"] },
  ],
};

const aiEngineerRoadmap: RoadmapDetail = {
  id: "ai-engineer",
  author: "Le Van Minh",
  authorAvatar: "L",
  title: "AI Engineer Roadmap",
  tags: ["Data & AI", "AI Engineering", "Advanced"],
  duration: "5 months",
  level: "Advanced",
  description:
    "Learn LLM application development, embeddings, retrieval, evaluations, agents, deployment, monitoring, and responsible AI practices.",
  views: 3120,
  likes: 724,
  steps: [
    { id: "aie-llm", title: "LLM Fundamentals", description: "Understand prompts, tokens, context windows, model capabilities, and limits.", stage: "Foundation", status: "done", position: { x: 32, y: 220 }, resources: ["OpenAI docs", "Anthropic prompting guides"] },
    { id: "aie-apps", title: "AI App Architecture", description: "Design model calls, tools, memory, state, latency budgets, and fallbacks.", stage: "Core", status: "learning", position: { x: 300, y: 220 }, dependsOn: ["aie-llm"], resources: ["LLM app patterns"] },
    { id: "aie-embeddings", title: "Embeddings and Search", description: "Use embeddings, vector databases, chunking, ranking, and hybrid retrieval.", stage: "Core", status: "pending", position: { x: 568, y: 118 }, dependsOn: ["aie-apps"], resources: ["Vector search guides"] },
    { id: "aie-rag", title: "Retrieval-Augmented Generation", description: "Build grounded answers with citations, freshness, and source filtering.", stage: "Core", status: "pending", position: { x: 568, y: 322 }, dependsOn: ["aie-embeddings"], resources: ["RAG evaluation guides"] },
    { id: "aie-evals", title: "Evaluations", description: "Create offline and online evals for accuracy, safety, latency, and cost.", stage: "Quality", status: "pending", position: { x: 836, y: 118 }, dependsOn: ["aie-rag"], resources: ["OpenAI evals cookbook"] },
    { id: "aie-agents", title: "Agents and Tools", description: "Let models call tools, plan steps, recover from errors, and respect constraints.", stage: "Advanced", status: "pending", position: { x: 836, y: 322 }, dependsOn: ["aie-apps", "aie-evals"], resources: ["Tool calling docs"] },
    { id: "aie-prod", title: "Production AI Systems", description: "Ship monitoring, tracing, rate limits, privacy controls, and rollout strategy.", stage: "Delivery", status: "pending", position: { x: 1104, y: 220 }, dependsOn: ["aie-evals", "aie-agents"], resources: ["AI observability guides"] },
  ],
};

const businessAnalystRoadmap: RoadmapDetail = {
  id: "business-analyst",
  author: "Hoang Thi Mai",
  authorAvatar: "H",
  title: "Business Analyst Roadmap",
  tags: ["Business", "Data & AI", "Beginner"],
  duration: "4 months",
  level: "Beginner",
  description:
    "Learn stakeholder discovery, requirements analysis, process modeling, data interpretation, documentation, and solution validation.",
  views: 890,
  likes: 166,
  steps: [
    { id: "ba-domain", title: "Business Domain Basics", description: "Understand goals, operations, users, constraints, and business vocabulary.", stage: "Foundation", status: "done", position: { x: 32, y: 220 }, resources: ["Business analysis body of knowledge"] },
    { id: "ba-stakeholders", title: "Stakeholder Interviews", description: "Ask useful questions, capture needs, and separate symptoms from root problems.", stage: "Discovery", status: "learning", position: { x: 300, y: 118 }, dependsOn: ["ba-domain"], resources: ["Interview guides"] },
    { id: "ba-process", title: "Process Modeling", description: "Map workflows, bottlenecks, systems, handoffs, and decision points.", stage: "Discovery", status: "pending", position: { x: 300, y: 322 }, dependsOn: ["ba-domain"], resources: ["BPMN basics"] },
    { id: "ba-requirements", title: "Requirements Writing", description: "Write user stories, acceptance criteria, rules, and non-functional needs.", stage: "Planning", status: "pending", position: { x: 568, y: 220 }, dependsOn: ["ba-stakeholders", "ba-process"], resources: ["User story mapping"] },
    { id: "ba-data", title: "Data Analysis", description: "Use spreadsheets, SQL basics, and dashboards to support recommendations.", stage: "Analysis", status: "pending", position: { x: 836, y: 118 }, dependsOn: ["ba-requirements"], resources: ["Excel training", "SQL basics"] },
    { id: "ba-communication", title: "Communication", description: "Prepare concise docs, diagrams, decisions, and stakeholder updates.", stage: "Delivery", status: "pending", position: { x: 836, y: 322 }, dependsOn: ["ba-requirements"], resources: ["Writing for business"] },
    { id: "ba-validation", title: "Solution Validation", description: "Confirm delivered features meet business needs and measure outcomes.", stage: "Capstone", status: "pending", position: { x: 1104, y: 220 }, dependsOn: ["ba-data", "ba-communication"], resources: ["UAT checklist"] },
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
  "cloud-architect": cloudArchitectRoadmap,
  "product-manager": productManagerRoadmap,
  "ui-ux-designer": uiUxDesignerRoadmap,
  "qa-engineer": qaEngineerRoadmap,
  "game-developer": gameDeveloperRoadmap,
  "blockchain-developer": blockchainDeveloperRoadmap,
  "technical-writer": technicalWriterRoadmap,
  "data-scientist": dataScientistRoadmap,
  "ai-engineer": aiEngineerRoadmap,
  "business-analyst": businessAnalystRoadmap,
};

export const ROADMAP_ID_ALIASES: Record<string, string> = {
  "1": "mlops",
  "2": "frontend",
  "3": "devops",
  "4": "data-analyst",
  "5": "security",
  "6": "mobile",
  "7": "cloud-architect",
  "8": "product-manager",
  "9": "ui-ux-designer",
  "10": "qa-engineer",
  "11": "game-developer",
  "12": "blockchain-developer",
  "13": "technical-writer",
  "14": "data-scientist",
  "15": "ai-engineer",
  "16": "business-analyst",
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
