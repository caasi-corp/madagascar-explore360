
import { createBrowserRouter } from 'react-router-dom';
import mainRoutes from './routes/mainRoutes';
import userRoutes from './routes/userRoutes';
import { adminRoutes } from './routes/adminRoutes';

export const router = createBrowserRouter([
  mainRoutes,
  userRoutes,
  adminRoutes
]);

export default router;
