import { prisma } from './app/config/prisma.js';
prisma.roadmap.findFirst({
  include: {
    stages: {
      include: {
        steps: {
          include: {
            content: true,
            resources: true
          }
        }
      }
    }
  }
}).then(res => {
  console.log(JSON.stringify(res, null, 2));
  process.exit(0);
});
