'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * SIGNUP PAGE
 * Premium authentication experience
 */

interface SignupFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  isLoading: boolean;
  error: string | null;
}

const SignupPage: React.FC = () => {
  const [formState, setFormState] = useState<SignupFormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    isLoading: false,
    error: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      error: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formState.name.trim()) {
      setFormState((prev) => ({ ...prev, error: 'Name is required' }));
      return;
    }

    if (formState.password !== formState.confirmPassword) {
      setFormState((prev) => ({ ...prev, error: 'Passwords do not match' }));
      return;
    }

    if (!formState.agreeToTerms) {
      setFormState((prev) => ({ ...prev, error: 'You must agree to the terms' }));
      return;
    }

    setFormState((prev) => ({ ...prev, isLoading: true }));

    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormState((prev) => ({
      ...prev,
      isLoading: false,
      error: 'Demo mode - account created successfully!',
    }));
  };

  return (
    <main className="relative w-full min-h-screen bg-neutral-950 overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="relative p-8 md:p-10 rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5">
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0"
            animate={{
              boxShadow: [
                '0 0 40px rgba(168, 85, 247, 0.1)',
                '0 0 60px rgba(168, 85, 247, 0.2)',
                '0 0 40px rgba(168, 85, 247, 0.1)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-neutral-400">Join AI Notes and amplify your creativity</p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Name field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                />
              </div>

              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                />
              </div>

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formState.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Confirm Password field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                />
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeToTerms"
                  checked={formState.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 accent-purple-500 cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm text-neutral-400">
                  I agree to the{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Error state */}
              {formState.error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg border text-sm ${
                    formState.error.includes('successfully')
                      ? 'bg-green-500/10 border-green-500/30 text-green-300'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}
                >
                  {formState.error}
                </motion.div>
              )}

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formState.isLoading}
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-glow-purple transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState.isLoading ? (
                  <motion.span
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Creating account...
                  </motion.span>
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </motion.form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-neutral-500 uppercase tracking-wider">Or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social buttons */}
            <div className="flex gap-3">
              {['Google', 'GitHub'].map((provider) => (
                <motion.button
                  key={provider}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="flex-1 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-300"
                >
                  {provider === 'Google' ? '🔍' : '🐙'} {provider}
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 text-center text-sm text-neutral-400"
            >
              Already have an account?{' '}
              <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign in
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default SignupPage;
