import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Compass, CheckCircle } from 'lucide-react';
import { Button, Input, Card, Badge } from '../components/common';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Registration = () => {
  const { register, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Full name is required.';
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters long.';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    try {
      const res = await register(name, email, password);
      toast.success(`Account created! Welcome to RoamVista, ${res.user.name}.`);
      navigate('/dashboard');
    } catch {
      toast.error('Registration failed. Please try again.');
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
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Create Traveler Account</h1>
          <p className="text-xs text-neutral-500">Join our community of mindful explorers and unlock curated itineraries.</p>
        </div>

        <Card padding="p-6 sm:p-8">
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <Input
              id="register-name"
              label="Full Name"
              placeholder="e.g. Elena Rostova"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              error={errors.name}
              icon={<User className="w-4 h-4" />}
              required
            />

            <Input
              id="register-email"
              type="email"
              label="Email Address"
              placeholder="e.g. elena@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              error={errors.email}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              label="Password (min 8 characters)"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              error={errors.password}
              icon={<Lock className="w-4 h-4" />}
              rightIcon={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              onRightIconClick={() => setShowPassword(!showPassword)}
              required
            />

            <Input
              id="register-confirm-password"
              type={showPassword ? 'text' : 'password'}
              label="Confirm Password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
              }}
              error={errors.confirmPassword}
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="text-[11px] text-neutral-500 space-y-1">
              <p className="flex items-center gap-1.5">
                <CheckCircle className={`w-3.5 h-3.5 ${password.length >= 8 ? 'text-emerald-500' : 'text-neutral-400'}`} />
                <span>At least 8 characters long</span>
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              isLoading={loading}
              className="mt-4"
            >
              Complete Registration
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-700/60 text-center text-xs text-neutral-500">
            Already have a RoamVista account?{' '}
            <Link to="/login" className="font-bold text-primary-600 dark:text-primary-400 hover:underline">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Registration;
