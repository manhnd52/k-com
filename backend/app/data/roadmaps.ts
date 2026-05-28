export type RoadmapSummary = {
  id: number;
  author: string;
  authorAvatar: string;
  thumbnailLabel: string;
  thumbnailTone: "ai" | "frontend" | "devops" | "data" | "security" | "mobile";
  title: string;
  tags: string[];
  duration: string;
  level: string;
  steps: number;
  description: string;
  views: number;
  likes: number;
};

export const roadmaps: RoadmapSummary[] = [
  {
    id: 1,
    author: "Nguyen Duc Manh",
    authorAvatar: "N",
    thumbnailLabel: "ML",
    thumbnailTone: "ai",
    title: "ML Engineer Roadmap",
    tags: ["Data & AI", "Data Engineering"],
    duration: "6 months",
    level: "Intermediate",
    steps: 12,
    description:
      "A comprehensive learning path covering mathematics, machine learning algorithms, deep learning frameworks, MLOps practices, and production deployment strategies.",
    views: 1420,
    likes: 234,
  },
  {
    id: 2,
    author: "Tran Thi Huong",
    authorAvatar: "T",
    thumbnailLabel: "FE",
    thumbnailTone: "frontend",
    title: "Frontend Developer",
    tags: ["Web Development", "UI/UX"],
    duration: "4 months",
    level: "Beginner",
    steps: 9,
    description:
      "Master HTML, CSS, JavaScript, and modern frameworks like React and Vue. Learn responsive design, accessibility, performance optimization, and testing strategies.",
    views: 3890,
    likes: 567,
  },
  {
    id: 3,
    author: "Le Van Minh",
    authorAvatar: "L",
    thumbnailLabel: "DO",
    thumbnailTone: "devops",
    title: "DevOps Engineer",
    tags: ["DevOps", "Cloud"],
    duration: "5 months",
    level: "Intermediate",
    steps: 10,
    description:
      "From CI/CD pipelines to container orchestration with Kubernetes. Covers infrastructure as code, monitoring, logging, and incident response workflows.",
    views: 2150,
    likes: 312,
  },
  {
    id: 4,
    author: "Pham Quang Hung",
    authorAvatar: "P",
    thumbnailLabel: "DA",
    thumbnailTone: "data",
    title: "Data Analyst",
    tags: ["Data & AI", "Analytics"],
    duration: "3 months",
    level: "Beginner",
    steps: 8,
    description:
      "Learn SQL, Excel, Python for data analysis, data visualization with Tableau and Power BI, statistical reasoning, and storytelling with data.",
    views: 960,
    likes: 178,
  },
  {
    id: 5,
    author: "Hoang Thi Mai",
    authorAvatar: "H",
    thumbnailLabel: "CS",
    thumbnailTone: "security",
    title: "Cybersecurity Specialist",
    tags: ["Security", "DevOps"],
    duration: "7 months",
    level: "Advanced",
    steps: 14,
    description:
      "Network security fundamentals, ethical hacking, threat modeling, cryptography, incident handling, and compliance frameworks like ISO 27001 and NIST.",
    views: 1890,
    likes: 421,
  },
  {
    id: 6,
    author: "Dao Anh Tuan",
    authorAvatar: "D",
    thumbnailLabel: "RN",
    thumbnailTone: "mobile",
    title: "Mobile Developer (React Native)",
    tags: ["Mobile", "Web Development"],
    duration: "5 months",
    level: "Intermediate",
    steps: 11,
    description:
      "Build cross-platform mobile apps with React Native. Covers navigation, state management, native modules, app store deployment, and offline-first architecture.",
    views: 1320,
    likes: 290,
  },
];
