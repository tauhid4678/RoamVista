import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Compass, ArrowRight, UserCheck, Shield } from 'lucide-react';
import { Button, Input, Card, Badge } from '../components/common';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Login = () => {
  const { login, demoLogin, signInWithGoogle, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const res = await signInWithGoogle();
      toast.success(`Welcome, ${res.user.name || res.user.email}!`);
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Google authentication failed.');
        toast.error('Google Sign-In failed.');
      }
    }
  };

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
          {/* Google 1-Click Sign-In via Firebase */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-all shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center justify-center my-5">
            <div className="border-t border-neutral-200 dark:border-neutral-700 w-full" />
            <span className="bg-white dark:bg-neutral-800 px-3 text-[11px] text-neutral-400 uppercase tracking-wider font-medium absolute">or continue with email</span>
          </div>

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
