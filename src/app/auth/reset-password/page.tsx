'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '../../../context/UserContext';
import axios from 'axios'; // Import AxiosError
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');
  const { userId, userLoading, userError } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (userLoading) return;
    if (userId) {
      toast.success('Already signed in!');
      router.push('/');
    }
    if (userError) {
      toast.error(userError);
    }
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError('Invalid or missing reset token.');
      toast.error('Invalid reset link. Please request a new one.');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams, userId, userLoading, userError, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous error
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      toast.error('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) { // Consider increasing this for better security (e.g., 8 characters)
      setError('Password must be at least 6 characters long.');
      toast.error('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    // Add checks for token existence before proceeding with API call
    if (!token) {
        setError('Missing reset token. Please refresh the page or request a new link.');
        toast.error('Missing reset token. Please refresh the page or request a new link.');
        setIsLoading(false);
        return;
    }

    try {
      await axios.post('/api/auth/reset-password', { token, password });
      setSuccess(true);
      toast.success('Password reset successfully! Redirecting to sign-in...');
      setTimeout(() => router.push('/auth?mode=signin'), 3000);
    } catch (error: unknown) { // Changed 'any' to 'unknown'
      setIsLoading(false); // Ensure loading is reset in catch block

      let errorMessage = 'Failed to reset password. Please try again.';

      if (axios.isAxiosError(error)) { // Check if it's an AxiosError
        // Axios errors have a response property
        errorMessage = error.response?.data?.error || error.message || errorMessage;
      } else if (error instanceof Error) {
        // Standard JavaScript Error object
        errorMessage = error.message;
      }
      // If it's neither, errorMessage remains the default generic message.

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      // setIsLoading(false); // Moved inside catch block for earlier reset
    }
  };

  if (userLoading || !token) { // Ensure token check is here for initial render based on param
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 to-blue-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-white/70">Enter your new password below.</p>
        </div>

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-xl flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-100 text-sm">Password reset successfully! Redirecting to sign-in...</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-xl flex items-center gap-2">
            <AlertCircle size={16} className="text-red-400" />
            <p className="text-red-100 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/60" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || success}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-12 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading || success}
              className="absolute right-3 top-3 text-white/60 hover:text-white disabled:opacity-50"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/60" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading || success}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || success}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={20} className="animate-spin" />}
            {isLoading ? 'Resetting...' : 'Reset Password'}
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </form>

        <p className="text-center text-white/60 text-sm mt-6">
          Remember your password?{' '}
          <a href="/auth?mode=signin" className="text-yellow-300 hover:text-yellow-200">
            Sign In
          </a>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 to-blue-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}