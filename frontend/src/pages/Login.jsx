import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { AlertCircle, Lock, Mail } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl backdrop-blur-md"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white font-serif">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-400">Sign in to your AI interview assistant portal</p>
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-2 rounded-lg bg-red-950/50 border border-red-800 p-4 text-sm text-red-400">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
                })}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="••••••••"
                {...register('password', { required: 'Password is required' })}
              />
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 active:bg-indigo-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          New to IntervAI?{' '}
          <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Create an Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
