import { prisma } from './app/config/prisma.js';

prisma.user.upsert({
  where: { id: 'user-1' },
  update: {},
  create: {
    id: 'user-1',
    email: 'test@example.com',
    displayName: 'Test User'
  }
}).then(user => {
  console.log('User created:', user);
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
