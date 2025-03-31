
import { RouteObject } from 'react-router-dom';
import { lazyMainRoutes } from './lazyRoutes';
import { userRoutes } from './userRoutes';
import { adminRoutes } from './adminRoutes';

// Combine all routes
const routes: RouteObject[] = [
  lazyMainRoutes,
  userRoutes,
  adminRoutes
];

export default routes;
