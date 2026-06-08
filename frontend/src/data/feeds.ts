export type FeedPost = {
  id: number;
  author: string;
  title: string;
  subheading: string;
  tags: string[];
  date: string;
  views: number;
  likes: number;
  imageUrl?: string;
  roadmapId?: string;
};

export const FEED_POSTS: FeedPost[] = [
  {
    id: 1,
    author: "Nguyen Duc Manh",
    title: "Mastering Data Engineering in 2026",
    subheading:
      "A comprehensive guide to modern data pipelines, cloud architecture, and real-time processing.",
    tags: ["Data & AI", "Data Engineering"],
    date: "March 28",
    views: 1200,
    likes: 450,
    roadmapId: "data-engineering",
  },
  {
    id: 2,
    author: "Tran Thi B",
    title: "The Future of Web Development with React 20",
    subheading:
      "Exploring the latest features in React and how they change the way we build applications.",
    tags: ["Web Development", "React"],
    date: "April 02",
    views: 850,
    likes: 210,
    roadmapId: "frontend",
  },
  {
    id: 3,
    author: "Le Van C",
    title: "Cybersecurity Essentials for Cloud Native",
    subheading:
      "Protecting your infrastructure from modern threats in a serverless and containerized world.",
    tags: ["Cybersecurity", "Cloud"],
    date: "April 05",
    views: 2400,
    likes: 890,
    roadmapId: "security",
  },
  {
    id: 4,
    author: "Pham Duc D",
    title: "Introduction to Machine Learning Ops",
    subheading:
      "Bridging the gap between data science and production systems with MLOps best practices.",
    tags: ["Data & AI", "ML Engineer"],
    date: "April 10",
    views: 1500,
    likes: 320,
    roadmapId: "mlops",
  },
];
