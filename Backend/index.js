import express from 'express';
import authRoutes from './auth/authRoutes.js';
import driversRoutes from './routers/driversRouter.js';
import fleetsRoutes from './routers/fleetsRouter.js';
import reportRoutes from './routers/reportRouter.js';
import travelRoutes from './routers/travelRouter.js';
import userRoutes from './routers/userRouter.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;


app.use('/api/auth', authRoutes);
app.use('/api/drivers', driversRoutes);
app.use('/api/fleets', fleetsRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/travels', travelRoutes);
app.use('/api/user', userRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});