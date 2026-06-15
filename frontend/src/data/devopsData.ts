import type { RoadmapNode } from './roadmapData';

export const DEVOPS_CATEGORIES = [
  { id: '1', name: 'Version Control', nameVi: 'Quản lý phiên bản' },
  { id: '2', name: 'Containers', nameVi: 'Container hóa' },
];

export const DEVOPS_NODES: RoadmapNode[] = [
  {
    id: 'devops-git',
    category: 'Version Control',
    categoryVi: 'Quản lý phiên bản',
    difficulty: 'Beginner',
    title: 'Git Version Control',
    titleVi: 'Quản lý mã nguồn Git',
    shortDesc: 'Track changes, branch, merge and collaborate.',
    shortDescVi: 'Theo dõi thay đổi, chia nhánh và hợp nhất.',
    description: 'Git is essential for tracking source code changes and collaborating with teams.',
    descriptionVi: 'Git rất quan trọng để theo dõi các thay đổi mã nguồn và làm việc nhóm.',
    tools: [
      { name: 'Git', type: 'Free/OSS', desc: 'Version control system', descVi: 'Hệ thống quản lý phiên bản' },
    ],
    example: 'git commit -m "feat: initial commit"',
    exampleVi: 'git commit -m "feat: initial commit"'
  },
  {
    id: 'devops-docker',
    category: 'Containers',
    categoryVi: 'Container hóa',
    difficulty: 'Intermediate',
    title: 'Docker',
    titleVi: 'Docker',
    shortDesc: 'Containerize applications.',
    shortDescVi: 'Đóng gói ứng dụng thành container.',
    description: 'Docker is a platform for developing, shipping, and running applications in containers.',
    descriptionVi: 'Docker là nền tảng để phát triển, vận chuyển và chạy ứng dụng trong container.',
    tools: [
      { name: 'Docker', type: 'Freemium', desc: 'Container platform', descVi: 'Nền tảng container' },
    ],
    example: 'docker build -t myapp .\ndocker run -p 8080:80 myapp',
    exampleVi: 'docker build -t myapp .\ndocker run -p 8080:80 myapp'
  }
];
