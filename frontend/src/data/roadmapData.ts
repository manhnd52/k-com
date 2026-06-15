export interface RoadmapTool {
  name: string;
  type: string;
  desc: string;
  descVi: string;
}

export interface RoadmapNode {
  id: string;
  category: string;
  categoryVi: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  titleVi: string;
  shortDesc: string;
  shortDescVi: string;
  description: string;
  descriptionVi: string;
  tools: RoadmapTool[];
  example?: string;
  exampleVi?: string;
}

export const CATEGORIES = [
  { id: '1', name: 'Prerequisites', nameVi: 'Kiến thức tiền đề' },
  { id: '2', name: 'Security Fundamentals', nameVi: 'Nền tảng bảo mật' },
  { id: '3', name: 'CI/CD Pipelines', nameVi: 'Tự động hóa CI/CD' },
  { id: '4', name: 'Infrastructure as Code', nameVi: 'Mã hóa hạ tầng' },
];

export const ROADMAP_NODES: RoadmapNode[] = [
  {
    id: 'prereq-linux',
    category: 'Prerequisites',
    categoryVi: 'Kiến thức tiền đề',
    difficulty: 'Beginner',
    title: 'Linux Basics & Shell',
    titleVi: 'Linux cơ bản & Shell',
    shortDesc: 'Understand file systems, permissions, and basic bash commands.',
    shortDescVi: 'Hiểu về hệ thống file, quyền truy cập và lệnh cơ bản.',
    description: 'Linux is the foundation of most modern servers and containerized environments. You need to be comfortable navigating the terminal, managing permissions, and writing basic shell scripts to automate tasks.',
    descriptionVi: 'Linux là nền tảng của hầu hết các máy chủ hiện đại và môi trường container. Bạn cần thành thạo thao tác terminal, quản lý quyền, và viết script shell cơ bản.',
    tools: [
      { name: 'Bash', type: 'Free/OSS', desc: 'Standard shell', descVi: 'Trình biên dịch lệnh tiêu chuẩn' },
    ],
    example: 'chmod +x script.sh\n./script.sh',
    exampleVi: 'chmod +x script.sh\n./script.sh'
  },
  {
    id: 'prereq-git',
    category: 'Prerequisites',
    categoryVi: 'Kiến thức tiền đề',
    difficulty: 'Beginner',
    title: 'Git Version Control',
    titleVi: 'Quản lý mã nguồn Git',
    shortDesc: 'Track changes, branch, merge and collaborate.',
    shortDescVi: 'Theo dõi thay đổi, chia nhánh và hợp nhất.',
    description: 'Git is essential for tracking source code changes and collaborating with teams. Security workflows heavily rely on Git to scan code and manage infrastructure configurations (GitOps).',
    descriptionVi: 'Git rất quan trọng để theo dõi các thay đổi mã nguồn. Quy trình bảo mật phụ thuộc vào Git để quét code và quản lý hạ tầng.',
    tools: [
      { name: 'Git', type: 'Free/OSS', desc: 'Version control system', descVi: 'Hệ thống quản lý phiên bản' },
      { name: 'GitHub', type: 'Freemium', desc: 'Hosting platform', descVi: 'Nền tảng lưu trữ' }
    ],
    example: 'git commit -m "fix: resolve security vulnerability"',
    exampleVi: 'git commit -m "fix: resolve security vulnerability"'
  },
  {
    id: 'sec-app',
    category: 'Security Fundamentals',
    categoryVi: 'Nền tảng bảo mật',
    difficulty: 'Intermediate',
    title: 'Application Security',
    titleVi: 'Bảo mật ứng dụng',
    shortDesc: 'Learn OWASP Top 10 and secure coding practices.',
    shortDescVi: 'Tìm hiểu OWASP Top 10 và thực hành code an toàn.',
    description: 'Application security focuses on making software secure by finding, fixing, and preventing vulnerabilities. Understanding OWASP Top 10 is the bare minimum for DevSecOps.',
    descriptionVi: 'Bảo mật ứng dụng tập trung vào việc tìm và sửa lỗ hổng. Nắm vững OWASP Top 10 là điều kiện tiên quyết cho DevSecOps.',
    tools: [
      { name: 'SonarQube', type: 'Freemium', desc: 'Code quality & security', descVi: 'Đánh giá chất lượng và bảo mật' },
    ],
    example: 'sonar-scanner \\\n  -Dsonar.projectKey=my-project \\\n  -Dsonar.sources=.',
    exampleVi: 'sonar-scanner \\\n  -Dsonar.projectKey=my-project \\\n  -Dsonar.sources=.'
  },
  {
    id: 'cicd-sast',
    category: 'CI/CD Pipelines',
    categoryVi: 'Tự động hóa CI/CD',
    difficulty: 'Advanced',
    title: 'SAST & DAST',
    titleVi: 'Kiểm thử bảo mật (SAST/DAST)',
    shortDesc: 'Integrate security scanners into your pipelines.',
    shortDescVi: 'Tích hợp bộ quét vào quy trình CI/CD.',
    description: 'Static Application Security Testing (SAST) analyzes source code without running it. Dynamic Application Security Testing (DAST) analyzes the running application to find vulnerabilities.',
    descriptionVi: 'SAST phân tích mã tĩnh mà không cần chạy. DAST chạy và phân tích luồng dữ liệu ứng dụng để dò tìm lỗ hổng.',
    tools: [
      { name: 'Snyk', type: 'Freemium', desc: 'Developer security platform', descVi: 'Nền tảng bảo mật lập trình viên' },
      { name: 'Trivy', type: 'Free/OSS', desc: 'Vulnerability scanner', descVi: 'Trình quét lỗ hổng container' }
    ],
    example: 'trivy image nginx:latest',
    exampleVi: 'trivy image nginx:latest'
  }
];
