
import { RouteObject } from 'react-router-dom';
import { mainRoutes } from './mainRoutes';
import { userRoutes } from './userRoutes';
import { adminRoutes } from './adminRoutes';

// Combine all routes
const routes: RouteObject[] = [
  mainRoutes,
  userRoutes,
  adminRoutes
];

export default routes;
