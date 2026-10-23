import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import Loading from './components/common/Loading';
import Button from './components/common/Button';

// Page Imports
import Home from './pages/Home';
import Explore from './pages/Explore';
import DestinationDetails from './pages/DestinationDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import DevShowcase from './pages/DevShowcase';

// 404 Not Found Page
const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-4">
    <span className="text-xs font-bold uppercase tracking-luxury text-accent-600">404 Error</span>
    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-sand-950 dark:text-sand-50">
      Expedition Trail Not Found
    </h1>
    <p className="text-xs sm:text-sm text-sand-600 dark:text-sand-400 max-w-md mx-auto">
      The coordinates you requested do not correspond to an active RoamVista itinerary. Let us guide you back to camp.
    </p>
    <div className="pt-2">
      <Link to="/">
        <Button variant="primary" size="md">
          Return to Discover
        </Button>
      </Link>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading fullScreen message="Navigating RoamVista..." />}>
        <Routes>
          {/* Public Website Routes (Wrapped with MainLayout: Navbar + Outlet + Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/tours/:id" element={<DestinationDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            {/* Isolated Developer Testing Suite */}
            <Route path="/dev-showcase" element={<DevShowcase />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Authenticated User Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout role="user" />}>
            <Route index element={<UserDashboard />} />
            <Route path="bookings" element={<UserDashboard />} />
            <Route path="settings" element={<Profile />} />
          </Route>

          {/* Administrative Portal Routes */}
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="tours" element={<AdminDashboard />} />
            <Route path="users" element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminDashboard />} />
            <Route path="reports" element={<AdminDashboard />} />
            <Route path="categories" element={<AdminDashboard />} />
            <Route path="inquiries" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
