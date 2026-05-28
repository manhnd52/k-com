export type RoadmapStep = {
  id: number;
  title: string;
  description: string;
  stage?: string;
  phase?: string;
  content?: string;
  resources?: string[];
  howTo?: string[];
  rule?: string;
};

export type RoadmapDetail = {
  id: number;
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

export const ROADMAP_DETAILS: Record<number, RoadmapDetail> = {
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
        phase: "Foundation",
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
        phase: "Foundation",
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
        phase: "Data Preparation",
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
        phase: "Modeling",
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
        phase: "Modeling",
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
