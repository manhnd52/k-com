import { prisma } from "../app/config/prisma.js";

async function main() {
  console.log("Start seeding...");

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

  // 3. Create Roadmaps

  // ML Engineer Roadmap
  const mlRoadmap = await prisma.roadmap.create({
    data: {
      title: "ML Engineer Roadmap",
      description: "A structured learning path from programming foundation to model deployment.",
      difficultyLevel: "intermediate",
      estimatedHours: 480,
      isPublished: true,
      categoryId: categories.dataAi.id,
    },
  });

  // Stages & Steps for ML Engineer Roadmap
  const mlStages = [
    { title: "Stage 1: Programming Foundations", orderIndex: 1 },
    { title: "Stage 2: Machine Learning Core", orderIndex: 2 },
  ];

  const mlStage1 = await prisma.stage.create({
    data: {
      roadmapId: mlRoadmap.id,
      title: mlStages[0]!.title,
      orderIndex: mlStages[0]!.orderIndex,
    },
  });

  const mlStage2 = await prisma.stage.create({
    data: {
      roadmapId: mlRoadmap.id,
      title: mlStages[1]!.title,
      orderIndex: mlStages[1]!.orderIndex,
    },
  });

  // Steps in Stage 1
  const stepIntro = await prisma.step.create({
    data: {
      stageId: mlStage1.id,
      title: "Introduction",
      orderIndex: 1,
      estimatedMinutes: 60,
    },
  });
  await prisma.stepContent.create({
    data: {
      stepId: stepIntro.id,
      bodyMarkdown: "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.",
    },
  });

  const stepPython = await prisma.step.create({
    data: {
      stageId: mlStage1.id,
      title: "Python Basics",
      orderIndex: 2,
      estimatedMinutes: 120,
    },
  });
  await prisma.stepContent.create({
    data: {
      stepId: stepPython.id,
      bodyMarkdown: "Python is a high-level, interpreted language known for readability, simplicity and versatility.",
    },
  });

  // Steps in Stage 2
  const stepData = await prisma.step.create({
    data: {
      stageId: mlStage2.id,
      title: "Data Processing",
      orderIndex: 1,
      estimatedMinutes: 180,
    },
  });
  await prisma.stepContent.create({
    data: {
      stepId: stepData.id,
      bodyMarkdown: "Data processing is the transformation of raw data into actionable insights.",
    },
  });

  // Resources for steps
  await prisma.resource.createMany({
    data: [
      { stepId: stepIntro.id, type: "video", title: "Andrew Ng's Machine Learning Course", url: "https://www.coursera.org/learn/machine-learning", orderIndex: 1 },
      { stepId: stepPython.id, type: "docs", title: "Official Python Website", url: "https://www.python.org", orderIndex: 1 },
      { stepId: stepData.id, type: "article", title: "Data Cleaning Best Practices Guide", url: "https://example.com/data-cleaning", orderIndex: 1 },
    ],
  });

  // ----------------------------------------------------
  // Frontend Developer Roadmap
  const feRoadmap = await prisma.roadmap.create({
    data: {
      title: "Frontend Developer",
      description: "Master modern web development with React, responsive design, and accessibility best practices.",
      difficultyLevel: "beginner",
      estimatedHours: 320,
      isPublished: true,
      categoryId: categories.webDev.id,
    },
  });

  const feStage1 = await prisma.stage.create({
    data: { roadmapId: feRoadmap.id, title: "HTML, CSS & JS Basics", orderIndex: 1 },
  });

  const feStep1 = await prisma.step.create({
    data: { stageId: feStage1.id, title: "HTML & CSS", orderIndex: 1, estimatedMinutes: 120 },
  });
  await prisma.stepContent.create({
    data: { stepId: feStep1.id, bodyMarkdown: "Learn the core markup and styling rules of the modern web." },
  });

  const feStep2 = await prisma.step.create({
    data: { stageId: feStage1.id, title: "JavaScript Basics", orderIndex: 2, estimatedMinutes: 240 },
  });
  await prisma.stepContent.create({
    data: { stepId: feStep2.id, bodyMarkdown: "Master dynamic behaviors and variables in JS." },
  });

  // ----------------------------------------------------
  // DevOps Engineer Roadmap
  const devopsRoadmap = await prisma.roadmap.create({
    data: {
      title: "DevOps Engineer",
      description: "Master CI/CD pipelines, containerization, and orchestration with modern DevOps practices.",
      difficultyLevel: "intermediate",
      estimatedHours: 400,
      isPublished: true,
      categoryId: categories.devops.id,
    },
  });

  const devopsStage1 = await prisma.stage.create({
    data: { roadmapId: devopsRoadmap.id, title: "Automation & Containers", orderIndex: 1 },
  });

  const devopsStep1 = await prisma.step.create({
    data: { stageId: devopsStage1.id, title: "Docker & Containers", orderIndex: 1, estimatedMinutes: 180 },
  });
  await prisma.stepContent.create({
    data: { stepId: devopsStep1.id, bodyMarkdown: "Containerization allows applications to run reliably across different computing environments." },
  });

  // ----------------------------------------------------
  // Data Analyst Roadmap
  await prisma.roadmap.create({
    data: {
      title: "Data Analyst",
      description: "Learn data analysis, visualization, and storytelling with data for business insights.",
      difficultyLevel: "beginner",
      estimatedHours: 240,
      isPublished: true,
      categoryId: categories.dataAi.id,
    },
  });

  // Cybersecurity Specialist Roadmap
  await prisma.roadmap.create({
    data: {
      title: "Cybersecurity Specialist",
      description: "Comprehensive security training covering network security, ethical hacking, and compliance.",
      difficultyLevel: "advanced",
      estimatedHours: 560,
      isPublished: true,
      categoryId: categories.security.id,
    },
  });

  // Mobile Developer Roadmap
  await prisma.roadmap.create({
    data: {
      title: "Mobile Developer (React Native)",
      description: "Build cross-platform mobile applications with React Native and modern development practices.",
      difficultyLevel: "intermediate",
      estimatedHours: 350,
      isPublished: true,
      categoryId: categories.mobile.id,
    },
  });

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
