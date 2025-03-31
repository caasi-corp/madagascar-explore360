import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import { Skeleton } from '@/components/ui/skeleton';

// Page loader
const PageLoader = () => (
  <div className="p-8">
    <Skeleton className="w-full h-12 mb-4" />
    <Skeleton className="w-3/4 h-6 mb-8" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  </div>
);

// Lazy-loaded components
const Index = lazy(() => import('../pages/Index'));
const Tours = lazy(() => import('../pages/Tours'));
const TourDetails = lazy(() => import('../pages/TourDetails'));
const CarRental = lazy(() => import('../pages/services/CarRental'));
const FlightBooking = lazy(() => import('../pages/services/FlightBooking'));
const HotelBooking = lazy(() => import('../pages/services/HotelBooking'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const PrivacyPolicy = lazy(() => import('../pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('../pages/legal/TermsOfService'));
const Sitemap = lazy(() => import('../pages/legal/Sitemap'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const lazyMainRoutes: RouteObject = {
  path: '/',
  element: <Layout />,
  errorElement: (
    <Suspense fallback={<PageLoader />}>
      <NotFound />
    </Suspense>
  ),
  children: [
    {
      index: true,
      element: (
        <Suspense fallback={<PageLoader />}>
          <Index />
        </Suspense>
      )
    },
    {
      path: 'tours',
      element: (
        <Suspense fallback={<PageLoader />}>
          <Tours />
        </Suspense>
      )
    },
    {
      path: 'tours/:id',
      element: (
        <Suspense fallback={<PageLoader />}>
          <TourDetails />
        </Suspense>
      )
    },
    {
      path: 'services/car-rental',
      element: (
        <Suspense fallback={<PageLoader />}>
          <CarRental />
        </Suspense>
      )
    },
    {
      path: 'services/flights',
      element: (
        <Suspense fallback={<PageLoader />}>
          <FlightBooking />
        </Suspense>
      )
    },
    {
      path: 'services/hotels',
      element: (
        <Suspense fallback={<PageLoader />}>
          <HotelBooking />
        </Suspense>
      )
    },
    {
      path: 'about',
      element: (
        <Suspense fallback={<PageLoader />}>
          <About />
        </Suspense>
      )
    },
    {
      path: 'contact',
      element: (
        <Suspense fallback={<PageLoader />}>
          <Contact />
        </Suspense>
      )
    },
    {
      path: 'login',
      element: (
        <Suspense fallback={<PageLoader />}>
          <Login />
        </Suspense>
      )
    },
    {
      path: 'register',
      element: (
        <Suspense fallback={<PageLoader />}>
          <Register />
        </Suspense>
      )
    },
    {
      path: 'privacy-policy',
      element: (
        <Suspense fallback={<PageLoader />}>
          <PrivacyPolicy />
        </Suspense>
      )
    },
    {
      path: 'terms-of-service',
      element: (
        <Suspense fallback={<PageLoader />}>
          <TermsOfService />
        </Suspense>
      )
    },
    {
      path: 'sitemap',
      element: (
        <Suspense fallback={<PageLoader />}>
          <Sitemap />
        </Suspense>
      )
    }
  ]
};
