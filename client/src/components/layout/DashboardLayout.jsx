import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  Calendar,
  User,
  Settings,
  Users,
  Map,
  BarChart3,
  Tag,
  Mail,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { Button, Badge } from '../common';

export const DashboardLayout = ({ role = 'user' }) => {
  const { user, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const toast = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.info('Signed out successfully.');
    navigate('/');
  };

  // User Sidebar items (Min 4 items)
  const userNavItems = [
    { label: 'Overview', to: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'My Bookings', to: '/dashboard/bookings', icon: <Calendar className="w-4 h-4" /> },
    { label: 'My Profile', to: '/profile', icon: <User className="w-4 h-4" /> },
    { label: 'Preferences', to: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  // Admin Sidebar items (Min 6 items)
  const adminNavItems = [
    { label: 'Admin Overview', to: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Manage Tours', to: '/admin/tours', icon: <Map className="w-4 h-4" /> },
    { label: 'Manage Users', to: '/admin/users', icon: <Users className="w-4 h-4" /> },
    { label: 'All Bookings', to: '/admin/bookings', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Reports & Analytics', to: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Categories', to: '/admin/categories', icon: <Tag className="w-4 h-4" /> },
    { label: 'Inquiries', to: '/admin/inquiries', icon: <Mail className="w-4 h-4" /> },
  ];

  const currentNavItems = role === 'admin' ? adminNavItems : userNavItems;

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
      isActive
        ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/20'
        : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:text-neutral-900 dark:hover:text-white'
    }`;

  return (
    <div className="min-h-screen flex bg-neutral-100/60 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors duration-200">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-950/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200/80 dark:border-neutral-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800">
          <Link to="/" className="flex items-center gap-2 group" aria-label="RoamVista Home">
            <img
              src="/logo/logo-cropped.png"
              alt="RoamVista Logo"
              className="h-10 w-auto object-contain dark:hidden group-hover:scale-105 transition-transform"
            />
            <img
              src="/logo/logo-cropped-dark.png"
              alt="RoamVista Logo"
              className="h-10 w-auto object-contain hidden dark:block group-hover:scale-105 transition-transform"
            />
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300">
              {role === 'admin' ? 'Admin' : 'Traveler'}
            </span>
          </Link>

          <button
            type="button"
            className="lg:hidden text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 p-1"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Mini Profile */}
        <div className="p-4 mx-4 my-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center gap-3">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
            alt={user?.name || "User Avatar"}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-500/30"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
              {user?.name || (role === 'admin' ? 'Admin Officer' : 'Explorer')}
            </p>
            <Badge variant={role === 'admin' ? 'secondary' : 'primary'} size="sm" className="mt-0.5">
              {role === 'admin' ? 'Administrator' : 'Verified Member'}
            </Badge>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            Navigation Menu
          </div>
          {currentNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard' || item.to === '/admin'}
              className={linkClasses}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            </NavLink>
          ))}

          {/* Quick link to public site */}
          <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
            <Link
              to="/explore"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Public Tours</span>
            </Link>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
          <Button
            variant="ghost"
            fullWidth
            size="sm"
            onClick={toggleTheme}
            icon={theme === 'dark' ? <Sun className="w-4 h-4 text-secondary-400" /> : <Moon className="w-4 h-4" />}
            className="justify-start text-xs text-neutral-600 dark:text-neutral-300"
          >
            {theme === 'dark' ? 'Light Appearance' : 'Dark Appearance'}
          </Button>

          <Button
            variant="danger"
            fullWidth
            size="sm"
            onClick={handleLogout}
            icon={<LogOut className="w-4 h-4" />}
            className="justify-start text-xs"
          >
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-20 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                {role === 'admin' ? 'Administrative Dashboard' : 'Traveler Portal'}
              </h2>
              <p className="text-[11px] text-neutral-500 hidden sm:block">
                RoamVista Global Expedition Management Network
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="outline" size="sm">
                Back to Website
              </Button>
            </Link>
          </div>
        </header>

        {/* Nested Dashboard Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
