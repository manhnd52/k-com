export type PostVisibility = "public" | "connections" | "private";

export type Post = {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  visibility: PostVisibility;
  authorName: string;
  createdAt: string;
};

const POSTS_STORAGE_KEY = "kcom_posts";

const readPosts = (): Post[] => {
  const rawPosts = localStorage.getItem(POSTS_STORAGE_KEY);

  if (!rawPosts) {
    return [];
  }

  try {
    return JSON.parse(rawPosts) as Post[];
  } catch {
    return [];
  }
};

const writePosts = (posts: Post[]) => {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
};

export const getPosts = (): Post[] => {
  return readPosts();
};

export const getAllPosts = (samplePosts: Post[] = []): Post[] => {
  return [...readPosts(), ...samplePosts];
};

export const getPostById = (postId: string, samplePosts: Post[] = []): Post | undefined => {
  return getAllPosts(samplePosts).find((post) => post.id === postId);
};

export const createPost = (post: Omit<Post, "id" | "createdAt">): Post => {
  const newPost: Post = {
    ...post,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  writePosts([newPost, ...readPosts()]);

  return newPost;
};
