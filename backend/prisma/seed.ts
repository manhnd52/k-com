import { prisma } from "../app/config/prisma.js";

async function main() {
  console.log("Start seeding full rich data...");

  // Clean database
  await prisma.userStepProgress.deleteMany({});
  await prisma.resource.deleteMany({});
  await prisma.stepContent.deleteMany({});
  await prisma.step.deleteMany({});
  await prisma.stage.deleteMany({});
  await prisma.roadmap.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Create categories
  const categories = {
    dataAi: await prisma.category.create({
      data: { name: "Data & AI", description: "Machine Learning, Deep Learning and AI Engineering" },
    }),
    webDev: await prisma.category.create({
      data: { name: "Web Development", description: "Frontend, Backend, and Fullstack Web Development" },
    }),
    devops: await prisma.category.create({
      data: { name: "DevOps", description: "CI/CD, Kubernetes, Cloud Infrastructure" },
    }),
    security: await prisma.category.create({
      data: { name: "Security", description: "Cybersecurity, Cryptography, and Penetration Testing" },
    }),
    mobile: await prisma.category.create({
      data: { name: "Mobile", description: "React Native, Flutter, and Native Mobile Apps" },
    }),
  };

  // 2. Create users (authors)
  const users = {
    manh: await prisma.user.create({
      data: { email: "manh@example.com", displayName: "Nguyen Duc Manh", avatarUrl: "N" },
    }),
    huong: await prisma.user.create({
      data: { email: "huong@example.com", displayName: "Tran Thi Huong", avatarUrl: "T" },
    }),
    minh: await prisma.user.create({
      data: { email: "minh@example.com", displayName: "Le Van Minh", avatarUrl: "L" },
    }),
    hung: await prisma.user.create({
      data: { email: "hung@example.com", displayName: "Pham Quang Hung", avatarUrl: "P" },
    }),
    mai: await prisma.user.create({
      data: { email: "mai@example.com", displayName: "Hoang Thi Mai", avatarUrl: "H" },
    }),
    tuan: await prisma.user.create({
      data: { email: "tuan@example.com", displayName: "Dao Anh Tuan", avatarUrl: "D" },
    }),
  };

  // ────────────────────────────────────────────────────────────────
  // 1. ML ENGINEER ROADMAP
  // ────────────────────────────────────────────────────────────────
  const mlRoadmap = await prisma.roadmap.create({
    data: {
      title: "ML Engineer Roadmap",
      description: "A comprehensive learning path covering mathematics, machine learning algorithms, deep learning frameworks, MLOps practices, and production deployment strategies.",
      difficultyLevel: "intermediate",
      estimatedHours: 480,
      isPublished: true,
      categoryId: categories.dataAi.id,
    },
  });

  const mlStage1 = await prisma.stage.create({
    data: { roadmapId: mlRoadmap.id, title: "Stage 1: Programming Foundations", orderIndex: 1 },
  });
  const mlStage2 = await prisma.stage.create({
    data: { roadmapId: mlRoadmap.id, title: "Stage 2: Machine Learning Core", orderIndex: 2 },
  });

  // Steps in Stage 1
  const stepMl1 = await prisma.step.create({
    data: { stageId: mlStage1.id, title: "Introduction", orderIndex: 1, estimatedMinutes: 60 },
  });
  await prisma.stepContent.create({
    data: {
      stepId: stepMl1.id,
      bodyMarkdown: "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can analyze data, identify patterns, and make decisions with minimal human intervention.",
    },
  });
  await prisma.resource.createMany({
    data: [
      { stepId: stepMl1.id, type: "video", title: "Andrew Ng's Machine Learning Course on Coursera", url: "https://www.coursera.org/learn/machine-learning", orderIndex: 1 },
      { stepId: stepMl1.id, type: "video", title: "Fast.ai - Practical Deep Learning for Coders", url: "https://course.fast.ai", orderIndex: 2 },
      { stepId: stepMl1.id, type: "docs", title: "Google Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", orderIndex: 3 },
      { stepId: stepMl1.id, type: "exercise", title: "Kaggle Learn - Introduction to Machine Learning", url: "https://www.kaggle.com/learn/intro-to-machine-learning", orderIndex: 4 },
    ],
  });

  const stepMl2 = await prisma.step.create({
    data: { stageId: mlStage1.id, title: "Python Basics", orderIndex: 2, estimatedMinutes: 120 },
  });
  await prisma.stepContent.create({
    data: {
      stepId: stepMl2.id,
      bodyMarkdown: "Python is a high-level, interpreted language known for readability, simplicity and versatility. It supports multiple paradigms with rich ecosystem including NumPy, Pandas, TensorFlow/PyTorch (ML), Used for web development, data science, automation, and scripting.",
    },
  });
  await prisma.resource.createMany({
    data: [
      { stepId: stepMl2.id, type: "docs", title: "Official Python Website", url: "https://www.python.org", orderIndex: 1 },
      { stepId: stepMl2.id, type: "video", title: "Python Full Course for free", url: "https://www.youtube.com/watch?v=rfscVS0vtbw", orderIndex: 2 },
      { stepId: stepMl2.id, type: "article", title: "Automate the Boring Stuff with Python", url: "https://automatetheboringstuff.com", orderIndex: 3 },
    ],
  });

  // Steps in Stage 2
  const stepMl3 = await prisma.step.create({
    data: { stageId: mlStage2.id, title: "Data Processing", orderIndex: 1, estimatedMinutes: 180 },
  });
  await prisma.stepContent.create({
    data: {
      stepId: stepMl3.id,
      bodyMarkdown: "Data processing is the transformation of raw data into actionable insights. It involves cleaning, structuring, and organizing data to prepare it for analysis and model training. This is typically 70-80% of the work in any ML project.",
    },
  });
  await prisma.resource.createMany({
    data: [
      { stepId: stepMl3.id, type: "docs", title: "Pandas Documentation and Tutorials", url: "https://pandas.pydata.org/docs/", orderIndex: 1 },
      { stepId: stepMl3.id, type: "article", title: "Data Cleaning Best Practices Guide", url: "https://example.com/data-cleaning", orderIndex: 2 },
      { stepId: stepMl3.id, type: "exercise", title: "Kaggle Dataset Cleaning Examples", url: "https://www.kaggle.com/code/rtatman/data-cleaning-challenge-handling-missing-values", orderIndex: 3 },
    ],
  });

  const stepMl4 = await prisma.step.create({
    data: { stageId: mlStage2.id, title: "Model Training", orderIndex: 2, estimatedMinutes: 240 },
  });
  await prisma.stepContent.create({
    data: {
      stepId: stepMl4.id,
      bodyMarkdown: "Model training is the process where algorithms learn patterns from data. It involves selecting appropriate algorithms, tuning hyperparameters, and iterating to improve performance. Understanding train/test splits and validation techniques is crucial.",
    },
  });
  await prisma.resource.createMany({
    data: [
      { stepId: stepMl4.id, type: "docs", title: "Scikit-learn Model Selection Guide", url: "https://scikit-learn.org/stable/model_selection.html", orderIndex: 1 },
      { stepId: stepMl4.id, type: "video", title: "Hyperparameter Tuning Techniques", url: "https://example.com/tuning", orderIndex: 2 },
    ],
  });

  const stepMl5 = await prisma.step.create({
    data: { stageId: mlStage2.id, title: "Evaluation", orderIndex: 3, estimatedMinutes: 120 },
  });
  await prisma.stepContent.create({
    data: {
      stepId: stepMl5.id,
      bodyMarkdown: "Model evaluation measures how well your trained model performs on unseen data. It involves understanding appropriate metrics for your problem (accuracy, precision, recall, F1, MSE, etc.) and avoiding common pitfalls like overfitting.",
    },
  });
  await prisma.resource.createMany({
    data: [
      { stepId: stepMl5.id, type: "docs", title: "Metrics and Scoring Explained", url: "https://scikit-learn.org/stable/modules/model_evaluation.html", orderIndex: 1 },
      { stepId: stepMl5.id, type: "article", title: "Confusion Matrix and ROC Curves", url: "https://example.com/roc-curves", orderIndex: 2 },
    ],
  });

  // ────────────────────────────────────────────────────────────────
  // 2. FRONTEND DEVELOPER ROADMAP
  // ────────────────────────────────────────────────────────────────
  const feRoadmap = await prisma.roadmap.create({
    data: {
      title: "Frontend Developer",
      description: "Master HTML, CSS, JavaScript, and modern frameworks like React and Vue. Learn responsive design, accessibility, performance optimization, and testing strategies.",
      difficultyLevel: "beginner",
      estimatedHours: 320,
      isPublished: true,
      categoryId: categories.webDev.id,
    },
  });

  const feStage1 = await prisma.stage.create({
    data: { roadmapId: feRoadmap.id, title: "Stage 1: Web Fundamentals", orderIndex: 1 },
  });
  const feStage2 = await prisma.stage.create({
    data: { roadmapId: feRoadmap.id, title: "Stage 2: React Framework", orderIndex: 2 },
  });

  // Stage 1 Steps
  const stepFe1 = await prisma.step.create({
    data: { stageId: feStage1.id, title: "HTML & CSS", orderIndex: 1, estimatedMinutes: 120 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepFe1.id, bodyMarkdown: "Master the structure and styling of web applications. Understand HTML5 semantic elements, CSS Box Model, Flexbox, and CSS Grid." },
  });
  await prisma.resource.createMany({
    data: [
      { stepId: stepFe1.id, type: "docs", title: "MDN Web Docs - HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", orderIndex: 1 },
      { stepId: stepFe1.id, type: "docs", title: "MDN Web Docs - CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", orderIndex: 2 },
    ],
  });

  const stepFe2 = await prisma.step.create({
    data: { stageId: feStage1.id, title: "JavaScript Basics", orderIndex: 2, estimatedMinutes: 240 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepFe2.id, bodyMarkdown: "Learn variables, data types, loops, functions, DOM manipulation, asynchronous JavaScript, and ES6+ features." },
  });
  await prisma.resource.createMany({
    data: [
      { stepId: stepFe2.id, type: "docs", title: "JavaScript.info Tutorial", url: "https://javascript.info", orderIndex: 1 },
    ],
  });

  // Stage 2 Steps
  const stepFe3 = await prisma.step.create({
    data: { stageId: feStage2.id, title: "React Fundamentals", orderIndex: 1, estimatedMinutes: 180 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepFe3.id, bodyMarkdown: "Learn about React components, JSX, props, state, event handling, conditional rendering, and list mapping." },
  });

  const stepFe4 = await prisma.step.create({
    data: { stageId: feStage2.id, title: "Responsive Design", orderIndex: 2, estimatedMinutes: 120 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepFe4.id, bodyMarkdown: "Build websites that look great on any screen size. Learn Media Queries, fluid layouts, and mobile-first approach." },
  });

  const stepFe5 = await prisma.step.create({
    data: { stageId: feStage2.id, title: "Advanced React", orderIndex: 3, estimatedMinutes: 200 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepFe5.id, bodyMarkdown: "Understand React Lifecycle, hooks (useEffect, useContext, useMemo), custom hooks, routing, and state management libraries." },
  });

  // ────────────────────────────────────────────────────────────────
  // 3. DEVOPS ENGINEER ROADMAP
  // ────────────────────────────────────────────────────────────────
  const devopsRoadmap = await prisma.roadmap.create({
    data: {
      title: "DevOps Engineer",
      description: "From CI/CD pipelines to container orchestration with Kubernetes. Covers infrastructure as code, monitoring, logging, and incident response workflows.",
      difficultyLevel: "intermediate",
      estimatedHours: 400,
      isPublished: true,
      categoryId: categories.devops.id,
    },
  });

  const devopsStage1 = await prisma.stage.create({
    data: { roadmapId: devopsRoadmap.id, title: "Stage 1: Version Control & CI/CD", orderIndex: 1 },
  });
  const devopsStage2 = await prisma.stage.create({
    data: { roadmapId: devopsRoadmap.id, title: "Stage 2: Containerization & Cloud", orderIndex: 2 },
  });

  // Steps
  const stepDev1 = await prisma.step.create({
    data: { stageId: devopsStage1.id, title: "Version Control", orderIndex: 1, estimatedMinutes: 120 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepDev1.id, bodyMarkdown: "Master Git workflows, branching strategies, pulling, pushing, merging, and conflict resolution." },
  });

  const stepDev2 = await prisma.step.create({
    data: { stageId: devopsStage1.id, title: "CI/CD Pipelines", orderIndex: 2, estimatedMinutes: 180 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepDev2.id, bodyMarkdown: "Automate code compilation, linting, testing, and continuous deployment using GitHub Actions, GitLab CI, or Jenkins." },
  });

  const stepDev3 = await prisma.step.create({
    data: { stageId: devopsStage2.id, title: "Docker & Containers", orderIndex: 1, estimatedMinutes: 150 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepDev3.id, bodyMarkdown: "Learn about containers, Dockerfiles, images, Docker Compose, volume mapping, and network configurations." },
  });

  const stepDev4 = await prisma.step.create({
    data: { stageId: devopsStage2.id, title: "Kubernetes", orderIndex: 2, estimatedMinutes: 240 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepDev4.id, bodyMarkdown: "Deploy, scale, and manage containerized applications with Kubernetes clusters. Understand Pods, Services, and Deployments." },
  });

  const stepDev5 = await prisma.step.create({
    data: { stageId: devopsStage2.id, title: "Infrastructure as Code", orderIndex: 3, estimatedMinutes: 180 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepDev5.id, bodyMarkdown: "Provision cloud infrastructure programmatically using Terraform, Ansible, or CloudFormation." },
  });

  // ────────────────────────────────────────────────────────────────
  // 4. DATA ANALYST ROADMAP
  // ────────────────────────────────────────────────────────────────
  const analystRoadmap = await prisma.roadmap.create({
    data: {
      title: "Data Analyst",
      description: "Learn SQL, Excel, Python for data analysis, data visualization with Tableau and Power BI, statistical reasoning, and storytelling with data.",
      difficultyLevel: "beginner",
      estimatedHours: 240,
      isPublished: true,
      categoryId: categories.dataAi.id,
    },
  });

  const analystStage1 = await prisma.stage.create({
    data: { roadmapId: analystRoadmap.id, title: "Stage 1: Basics & SQL", orderIndex: 1 },
  });
  const analystStage2 = await prisma.stage.create({
    data: { roadmapId: analystRoadmap.id, title: "Stage 2: Programming & Viz", orderIndex: 2 },
  });

  const stepDa1 = await prisma.step.create({
    data: { stageId: analystStage1.id, title: "Excel Basics", orderIndex: 1, estimatedMinutes: 90 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepDa1.id, bodyMarkdown: "Master formulas, lookup tables, Pivot tables, graphs, and basic data cleaning using spreadsheet tools." },
  });

  const stepDa2 = await prisma.step.create({
    data: { stageId: analystStage1.id, title: "SQL", orderIndex: 2, estimatedMinutes: 180 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepDa2.id, bodyMarkdown: "Query relational databases. Understand SELECT, JOIN, GROUP BY, subqueries, and database indexing." },
  });

  const stepDa3 = await prisma.step.create({
    data: { stageId: analystStage2.id, title: "Python for Data", orderIndex: 1, estimatedMinutes: 180 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepDa3.id, bodyMarkdown: "Learn Python libraries for data processing and analysis like NumPy, Pandas, and Matplotlib." },
  });

  const stepDa4 = await prisma.step.create({
    data: { stageId: analystStage2.id, title: "Data Visualization", orderIndex: 2, estimatedMinutes: 120 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepDa4.id, bodyMarkdown: "Create interactive dashboards and charts using Tableau, Power BI, or Seaborn to communicate business insights." },
  });

  const stepDa5 = await prisma.step.create({
    data: { stageId: analystStage2.id, title: "Statistical Analysis", orderIndex: 3, estimatedMinutes: 150 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepDa5.id, bodyMarkdown: "Understand descriptive statistics, probability distributions, hypothesis testing, and regression analysis." },
  });

  // ────────────────────────────────────────────────────────────────
  // 5. CYBERSECURITY SPECIALIST ROADMAP
  // ────────────────────────────────────────────────────────────────
  const securityRoadmap = await prisma.roadmap.create({
    data: {
      title: "Cybersecurity Specialist",
      description: "Network security fundamentals, ethical hacking, threat modeling, cryptography, incident handling, and compliance frameworks like ISO 27001 and NIST.",
      difficultyLevel: "advanced",
      estimatedHours: 560,
      isPublished: true,
      categoryId: categories.security.id,
    },
  });

  const secStage1 = await prisma.stage.create({
    data: { roadmapId: securityRoadmap.id, title: "Stage 1: Fundamentals", orderIndex: 1 },
  });
  const secStage2 = await prisma.stage.create({
    data: { roadmapId: securityRoadmap.id, title: "Stage 2: Defense & Penetration", orderIndex: 2 },
  });

  const stepSec1 = await prisma.step.create({
    data: { stageId: secStage1.id, title: "Network Security", orderIndex: 1, estimatedMinutes: 180 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepSec1.id, bodyMarkdown: "Learn IP addressing, routing, firewalls, VPNs, IDS/IPS, and network protocols vulnerability scanning." },
  });

  const stepSec2 = await prisma.step.create({
    data: { stageId: secStage1.id, title: "Cryptography", orderIndex: 2, estimatedMinutes: 120 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepSec2.id, bodyMarkdown: "Understand hashing, symmetric and asymmetric encryption, public key infrastructure, and SSL/TLS handshakes." },
  });

  const stepSec3 = await prisma.step.create({
    data: { stageId: secStage2.id, title: "Ethical Hacking", orderIndex: 1, estimatedMinutes: 240 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepSec3.id, bodyMarkdown: "Learn pen-testing methodologies, scanning networks, system hacking, OWASP Top 10 vulnerabilities, and remediation." },
  });

  const stepSec4 = await prisma.step.create({
    data: { stageId: secStage2.id, title: "Threat Modeling", orderIndex: 2, estimatedMinutes: 150 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepSec4.id, bodyMarkdown: "Analyze application architecture to discover threat vectors, using STRIDE framework and mitigation design." },
  });

  const stepSec5 = await prisma.step.create({
    data: { stageId: secStage2.id, title: "Compliance", orderIndex: 3, estimatedMinutes: 120 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepSec5.id, bodyMarkdown: "Understand security frameworks and regulations including ISO 27001, NIST SP 800-53, SOC2, GDPR, and PCI-DSS." },
  });

  // ────────────────────────────────────────────────────────────────
  // 6. MOBILE DEVELOPER ROADMAP
  // ────────────────────────────────────────────────────────────────
  const mobileRoadmap = await prisma.roadmap.create({
    data: {
      title: "Mobile Developer (React Native)",
      description: "Build cross-platform mobile apps with React Native. Covers navigation, state management, native modules, app store deployment, and offline-first architecture.",
      difficultyLevel: "intermediate",
      estimatedHours: 350,
      isPublished: true,
      categoryId: categories.mobile.id,
    },
  });

  const mobStage1 = await prisma.stage.create({
    data: { roadmapId: mobileRoadmap.id, title: "Stage 1: Core Mobile Development", orderIndex: 1 },
  });
  const mobStage2 = await prisma.stage.create({
    data: { roadmapId: mobileRoadmap.id, title: "Stage 2: Advanced mobile topics", orderIndex: 2 },
  });

  const stepMob1 = await prisma.step.create({
    data: { stageId: mobStage1.id, title: "React Native Basics", orderIndex: 1, estimatedMinutes: 120 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepMob1.id, bodyMarkdown: "Configure the React Native CLI or Expo. Learn JSX components (View, Text, Image, ScrollView, FlatList), styling, and platform-specific code." },
  });

  const stepMob2 = await prisma.step.create({
    data: { stageId: mobStage1.id, title: "Navigation", orderIndex: 2, estimatedMinutes: 120 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepMob2.id, bodyMarkdown: "Implement app routing and screen flows using React Navigation (Stack, Tab, Drawer navigators)." },
  });

  const stepMob3 = await prisma.step.create({
    data: { stageId: mobStage2.id, title: "State Management", orderIndex: 1, estimatedMinutes: 180 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepMob3.id, bodyMarkdown: "Share global data across components using Context API, Redux Toolkit, or Zustand." },
  });

  const stepMob4 = await prisma.step.create({
    data: { stageId: mobStage2.id, title: "Native Modules", orderIndex: 2, estimatedMinutes: 150 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepMob4.id, bodyMarkdown: "Create bridging code to access native Android (Java/Kotlin) and iOS (Obj-C/Swift) platform libraries." },
  });

  const stepMob5 = await prisma.step.create({
    data: { stageId: mobStage2.id, title: "App Deployment", orderIndex: 3, estimatedMinutes: 120 },
  });
  await prisma.stepContent.create({
    data: { stepId: stepMob5.id, bodyMarkdown: "Configure app keys, certificates, build production APK/AAB and IPA files, and submit to Google Play Store and Apple App Store." },
  });

  console.log("Seeding completed successfully with rich datasets!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
