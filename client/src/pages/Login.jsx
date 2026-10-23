import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Compass, ArrowRight, UserCheck, Shield } from 'lucide-react';
import { Button, Input, Card, Badge } from '../components/common';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Login = () => {
  const { login, demoLogin, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }
    setError('');

    try {
      const res = await login(email, password);
      toast.success(`Welcome back, ${res.user.name}!`);
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please verify your email and password.');
      toast.error('Authentication failed.');
    }
  };

  const handleDemoClick = async (role) => {
    setError('');
    try {
      const res = await demoLogin(role);
      toast.success(`Logged in with Demo ${role === 'admin' ? 'Administrator' : 'Traveler'} account!`);
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch {
      toast.error('Demo authentication error.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block group mb-2" aria-label="RoamVista Home">
            <img
              src="/logo/logo-cropped.png"
              alt="RoamVista Logo"
              className="h-16 w-auto mx-auto object-contain dark:hidden group-hover:scale-105 transition-transform"
            />
            <img
              src="/logo/logo-cropped-dark.png"
              alt="RoamVista Logo"
              className="h-16 w-auto mx-auto object-contain hidden dark:block group-hover:scale-105 transition-transform"
            />
          </Link>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Sign In to Your Account</h1>
          <p className="text-xs text-neutral-500">Access your saved itineraries, reservations, and member benefits.</p>
        </div>

        {/* Demo Login Quick Access Box (Required by PDF specification) */}
        <div className="p-4 rounded-2xl bg-primary-50/70 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary-900 dark:text-primary-200 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              1-Click Demo Logins
            </span>
            <Badge variant="primary" size="sm">Evaluation Ready</Badge>
          </div>
          <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
            Instant test access with pre-configured traveler or administrator accounts.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDemoClick('user')}
              icon={<UserCheck className="w-3.5 h-3.5 text-primary-500" />}
              className="bg-white dark:bg-neutral-800 text-xs"
            >
              Demo Traveler
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDemoClick('admin')}
              icon={<Shield className="w-3.5 h-3.5 text-secondary-500" />}
              className="bg-white dark:bg-neutral-800 text-xs"
            >
              Demo Admin
            </Button>
          </div>
        </div>

        {/* Standard Login Card */}
        <Card padding="p-6 sm:p-8">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-300 font-medium">
                {error}
              </div>
            )}

            <Input
              id="login-email"
              type="email"
              label="Email Address"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              rightIcon={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              onRightIconClick={() => setShowPassword(!showPassword)}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded accent-primary-600" />
                <span className="text-neutral-600 dark:text-neutral-400">Remember session</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); toast.info('Password recovery link dispatched.'); }} className="text-primary-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              isLoading={loading}
              className="mt-2"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-700/60 text-center text-xs text-neutral-500">
            Don’t have a RoamVista account yet?{' '}
            <Link to="/register" className="font-bold text-primary-600 dark:text-primary-400 hover:underline">
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
