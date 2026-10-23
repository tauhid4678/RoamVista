import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Compass,
  Menu,
  X,
  Sun,
  Moon,
  User,
  Shield,
  LogOut,
  ChevronDown,
  Sparkles,
  BookOpen,
  Calendar,
  Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { Button, Dropdown, DropdownItem, DropdownDivider, Badge } from '../common';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const toast = useToast();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.info('You have been signed out.');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinkClasses = ({ isActive }) =>
    `text-xs font-semibold tracking-wide transition-colors py-2 px-3 rounded-lg ${
      isActive
        ? 'text-primary-700 dark:text-primary-300 bg-sand-200/60 dark:bg-darkSurface-800'
        : 'text-sand-700 dark:text-sand-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-sand-100/70 dark:hover:bg-darkSurface-800/60'
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
      isActive
        ? 'text-primary-700 dark:text-primary-300 bg-sand-200/70 dark:bg-darkSurface-800'
        : 'text-sand-800 dark:text-sand-200 hover:bg-sand-100 dark:hover:bg-darkSurface-800'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-sand-200/80 dark:border-darkSurface-700/80 editorial-glass transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl py-1"
            aria-label="RoamVista Home"
          >
            <img
              src="/logo/logo-cropped.png"
              alt="RoamVista Logo"
              className="h-11 sm:h-12 w-auto object-contain dark:hidden group-hover:scale-105 transition-transform"
            />
            <img
              src="/logo/logo-cropped-dark.png"
              alt="RoamVista Logo"
              className="h-11 sm:h-12 w-auto object-contain hidden dark:block group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            <NavLink to="/" className={navLinkClasses}>
              Discover
            </NavLink>
            <NavLink to="/explore" className={navLinkClasses}>
              Destinations
            </NavLink>
            <NavLink to="/explore?category=Cultural+Heritage" className={navLinkClasses}>
              Experiences
            </NavLink>
            <NavLink to="/about" className={navLinkClasses}>
              About
            </NavLink>
            <NavLink to="/blog" className={navLinkClasses}>
              Journal
            </NavLink>
            <NavLink to="/contact" className={navLinkClasses}>
              Contact
            </NavLink>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Explore Icon */}
            <Link
              to="/explore"
              aria-label="Search destinations"
              className="p-2.5 rounded-xl border border-sand-200 dark:border-darkSurface-700 hover:bg-sand-100 dark:hover:bg-darkSurface-800 text-sand-600 dark:text-sand-300 transition-colors"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme appearance"
              className="p-2.5 rounded-xl border border-sand-200 dark:border-darkSurface-700 hover:bg-sand-100 dark:hover:bg-darkSurface-800 text-sand-600 dark:text-sand-300 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-accent-400" />
              ) : (
                <Moon className="w-4 h-4 text-sand-700" />
              )}
            </button>

            {/* Logged Out Actions */}
            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
              </div>
            ) : (
              /* Authenticated Profile Dropdown */
              <Dropdown
                align="right"
                width="w-64"
                trigger={
                  <button
                    type="button"
                    aria-label="User account menu"
                    className="flex items-center gap-2.5 p-1.5 pl-2 pr-3 rounded-full border border-sand-200 dark:border-darkSurface-700 hover:bg-sand-100 dark:hover:bg-darkSurface-800 transition-colors"
                  >
                    <img
                      src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                      alt={user?.name || "User"}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-500/20"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-sand-900 dark:text-sand-100 max-w-[100px] truncate">
                        {user?.name || 'Traveler'}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-sand-400" />
                  </button>
                }
              >
                {({ close }) => (
                  <>
                    <div className="px-4 py-3 border-b border-sand-200/80 dark:border-darkSurface-700/80">
                      <p className="text-sm font-bold text-sand-900 dark:text-sand-50 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-sand-500 truncate mt-0.5">
                        {user?.email}
                      </p>
                      <div className="mt-2">
                        <Badge variant={isAdmin ? 'secondary' : 'primary'} size="sm">
                          {isAdmin ? 'Administrator' : 'Verified Explorer'}
                        </Badge>
                      </div>
                    </div>

                    <DropdownItem
                      icon={<User className="w-4 h-4" />}
                      onClick={() => {
                        navigate('/profile');
                        close();
                      }}
                    >
                      Profile & Security
                    </DropdownItem>

                    <DropdownItem
                      icon={isAdmin ? <Shield className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                      onClick={() => {
                        navigate(isAdmin ? '/admin' : '/dashboard');
                        close();
                      }}
                    >
                      {isAdmin ? 'Admin Console' : 'My Bookings'}
                    </DropdownItem>

                    <DropdownItem
                      icon={<BookOpen className="w-4 h-4" />}
                      onClick={() => {
                        navigate('/blog');
                        close();
                      }}
                    >
                      Travel Journal
                    </DropdownItem>

                    <DropdownDivider />

                    <DropdownItem
                      danger
                      icon={<LogOut className="w-4 h-4" />}
                      onClick={handleLogout}
                    >
                      Sign Out
                    </DropdownItem>
                  </>
                )}
              </Dropdown>
            )}
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme appearance"
              className="p-2 rounded-xl border border-sand-200 dark:border-darkSurface-700 text-sand-600 dark:text-sand-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-accent-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl text-sand-800 dark:text-sand-200 hover:bg-sand-100 dark:hover:bg-darkSurface-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-sand-200 dark:border-darkSurface-800 bg-sand-50/98 dark:bg-darkSurface-900/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-2">
          <NavLink to="/" className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
            Discover
          </NavLink>
          <NavLink to="/explore" className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
            Destinations
          </NavLink>
          <NavLink to="/explore?category=Cultural+Heritage" className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
            Experiences
          </NavLink>
          <NavLink to="/about" className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
            About RoamVista
          </NavLink>
          <NavLink to="/blog" className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
            Travel Journal
          </NavLink>
          <NavLink to="/contact" className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
            Contact
          </NavLink>

          {isAuthenticated ? (
            <>
              <div className="pt-2 border-t border-sand-200 dark:border-darkSurface-800" />
              <NavLink to={isAdmin ? "/admin" : "/dashboard"} className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
                {isAdmin ? 'Admin Console' : 'Traveler Dashboard'}
              </NavLink>
              <NavLink to="/profile" className={mobileNavLinkClasses} onClick={() => setMobileMenuOpen(false)}>
                Profile & Security
              </NavLink>
              <div className="pt-2">
                <Button variant="danger" fullWidth size="sm" icon={<LogOut className="w-4 h-4" />} onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <div className="pt-4 border-t border-sand-200 dark:border-darkSurface-800 flex flex-col gap-2">
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
              >
                Log In
              </Button>
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  navigate('/register');
                  setMobileMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
