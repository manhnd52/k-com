import express from 'express';
import cors from 'cors';
import { userRouter } from '@/routes/user.routes.js';
import { roadmapRouter } from '@/routes/roadmap.routes.js';
import { prisma } from '@/config/prisma.js';

const app = express();

app.use(cors());
app.use(express.json());

// Create API Router for generic /api prefix
const apiRouter = express.Router();

// Register sub-routes on apiRouter
apiRouter.use('/users', userRouter);
apiRouter.use('/roadmaps', roadmapRouter);

// Health check endpoint on apiRouter
apiRouter.get('/health', async (req, res) => {
    try {
        // Ping database using our prisma instance
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'ok', database: 'connected' });
    } catch (error: any) {
        res.status(500).json({ status: 'error', database: 'disconnected', error: error.message });
    }
});

// Mount all API routes under /api generically
app.use('/api', apiRouter);
export default app;
