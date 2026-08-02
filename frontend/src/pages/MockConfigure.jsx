import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import {
  Briefcase,
  Code,
  Building2,
  Award,
  Clock,
  Globe,
  Sparkles,
  Play,
  Check,
  Zap,
  Loader2,
  ShieldCheck,
  ChevronRight,
  Target,
  Sliders
} from 'lucide-react';

const MockConfigure = () => {
  const navigate = useNavigate();

  // Form State
  const [jobTitle, setJobTitle] = useState('Software Engineer');
  const [customJobTitle, setCustomJobTitle] = useState('');
  const [interviewType, setInterviewType] = useState('Technical');
  const [targetCompany, setTargetCompany] = useState('Google');
  const [targetLevel, setTargetLevel] = useState('Senior');
  const [duration, setDuration] = useState('30m');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Options configuration
  const popularJobTitles = [
    'Software Engineer',
    'Solutions Architect',
    'Frontend Developer',
    'Backend Engineer',
    'Full Stack Engineer',
    'Data Scientist',
    'DevOps Engineer',
    'Product Manager'
  ];

  const interviewTypes = [
    {
      id: 'Technical',
      title: 'Technical & System Design',
      desc: 'Algorithm design, data structures, and architecture discussions.',
      icon: Code,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'Coding',
      title: 'Live Coding Challenge',
      desc: 'Hands-on problem solving, data manipulation, and complexity analysis.',
      icon: Zap,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'Behavioral',
      title: 'Behavioral & STAR',
      desc: 'Past experience, leadership principles, teamwork, and situation handling.',
      icon: Target,
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'System Design',
      title: 'System Design & Scale',
      desc: 'Distributed systems, database design, caching, and microservices.',
      icon: Sliders,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'Managerial',
      title: 'Managerial & Leadership',
      desc: 'Team leadership, conflict resolution, strategy, and cross-functional management.',
      icon: Briefcase,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'HR',
      title: 'HR & Cultural Fit',
      desc: 'Company values, career goals, compensation expectations, and background.',
      icon: ShieldCheck,
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'Mixed',
      title: 'Comprehensive Mixed Track',
      desc: 'Balanced combination of technical questions, behavioral scenarios, and coding.',
      icon: Sparkles,
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const companies = [
    { id: 'Google', name: 'Google', tier: 'FAANG / Tier 1' },
    { id: 'Amazon', name: 'Amazon', tier: 'FAANG / Tier 1' },
    { id: 'Microsoft', name: 'Microsoft', tier: 'FAANG / Tier 1' },
    { id: 'Meta', name: 'Meta', tier: 'FAANG / Tier 1' },
    { id: 'Apple', name: 'Apple', tier: 'FAANG / Tier 1' },
    { id: 'General', name: 'General Tech Company', tier: 'Standard Industry' }
  ];

  const levels = [
    { id: 'Junior', label: 'Junior / Entry', desc: '0 - 2 yrs experience' },
    { id: 'Mid', label: 'Mid-Level', desc: '2 - 5 yrs experience' },
    { id: 'Senior', label: 'Senior Specialist', desc: '5 - 8 yrs experience' },
    { id: 'Lead', label: 'Lead / Principal', desc: '8+ yrs experience' }
  ];

  const durations = [
    { id: '15m', label: '15 Minutes', badge: 'Express Rapid Fire' },
    { id: '30m', label: '30 Minutes', badge: 'Standard Round' },
    { id: '45m', label: '45 Minutes', badge: 'Deep Dive Session' }
  ];

  const languages = [
    { id: 'English', label: 'English (US/UK)', flag: '🇺🇸' },
    { id: 'Spanish', label: 'Spanish (Español)', flag: '🇪🇸' },
    { id: 'French', label: 'French (Français)', flag: '🇫🇷' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalJobTitle = customJobTitle.trim() || jobTitle;
    if (!finalJobTitle) {
      setError('Please select or enter a Job Title to continue.');
      return;
    }
    setError('');
    setLoading(true);

    const payload = {
      jobTitle: finalJobTitle,
      interviewType,
      targetCompany,
      targetLevel,
      duration,
      language
    };

    try {
      const response = await api.post('/interviews/start', payload);
      // Response interceptor returns data object directly
      const interviewId = response.id || response.data?.id || (response.data && response.data.id);
      if (interviewId) {
        navigate(`/interview/${interviewId}`);
      } else {
        // Fallback demo route if ID format varies
        navigate('/interview/new');
      }
    } catch (err) {
      console.error('Start interview error:', err);
      // If backend throws network or mock error, fallback gracefully with simulated session ID
      const fallbackId = `sim_${Date.now()}`;
      navigate(`/interview/${fallbackId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-800/40 p-8 shadow-xl"
      >
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>AI Mock Interview Simulator</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white md:text-4xl">
            Configure Your Mock Interview
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Tailor the AI agent to emulate realistic top-tier technical and behavioral interviewers based on target role, company criteria, and time duration.
          </p>
        </div>
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </motion.div>

      {error && (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm font-medium text-rose-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Job Title Selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Target Job Title</h2>
              <p className="text-xs text-slate-400">Select a target role or enter your custom position title.</p>
            </div>
          </div>

          {/* Quick options */}
          <div className="flex flex-wrap gap-2">
            {popularJobTitles.map((title) => (
              <button
                type="button"
                key={title}
                onClick={() => {
                  setJobTitle(title);
                  setCustomJobTitle('');
                }}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  jobTitle === title && !customJobTitle
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400'
                    : 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-700/60 hover:text-white'
                }`}
              >
                {title}
              </button>
            ))}
          </div>

          {/* Custom Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Or Enter Custom Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. Lead Machine Learning Engineer"
              value={customJobTitle}
              onChange={(e) => {
                setCustomJobTitle(e.target.value);
                setJobTitle('');
              }}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </motion.div>

        {/* 2. Interview Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
              <Code className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Interview Format & Domain</h2>
              <p className="text-xs text-slate-400">Choose the question focus area for your session.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interviewTypes.map((type) => {
              const IconComp = type.icon;
              const isSelected = interviewType === type.id;
              return (
                <div
                  key={type.id}
                  onClick={() => setInterviewType(type.id)}
                  className={`group relative flex flex-col justify-between rounded-xl p-5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/40 shadow-lg shadow-indigo-950/50'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${type.color} text-white shadow-md`}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      {isSelected && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-white">
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{type.title}</h3>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed">{type.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 3. Target Company & Target Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Company */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl border border-slate-800 p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                <Building2 className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-white">Target Company</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {companies.map((comp) => (
                <button
                  type="button"
                  key={comp.id}
                  onClick={() => setTargetCompany(comp.id)}
                  className={`flex flex-col items-start rounded-xl p-3.5 border transition-all text-left cursor-pointer ${
                    targetCompany === comp.id
                      ? 'border-indigo-500 bg-indigo-950/40 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-sm">{comp.name}</span>
                  <span className="text-[10px] text-slate-400">{comp.tier}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Target Level */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-card rounded-2xl border border-slate-800 p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
                <Award className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-white">Target Seniority Level</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {levels.map((lvl) => (
                <button
                  type="button"
                  key={lvl.id}
                  onClick={() => setTargetLevel(lvl.id)}
                  className={`flex flex-col items-start rounded-xl p-3.5 border transition-all text-left cursor-pointer ${
                    targetLevel === lvl.id
                      ? 'border-indigo-500 bg-indigo-950/40 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-sm">{lvl.label}</span>
                  <span className="text-[10px] text-slate-400">{lvl.desc}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4. Duration & Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Duration */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl border border-slate-800 p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                <Clock className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-white">Duration</h2>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {durations.map((dur) => (
                <button
                  type="button"
                  key={dur.id}
                  onClick={() => setDuration(dur.id)}
                  className={`flex flex-col items-center justify-center text-center rounded-xl p-3 border transition-all cursor-pointer ${
                    duration === dur.id
                      ? 'border-indigo-500 bg-indigo-950/40 text-white font-bold'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-base font-bold">{dur.label}</span>
                  <span className="text-[10px] text-slate-400">{dur.badge}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Language */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="glass-card rounded-2xl border border-slate-800 p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Globe className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-white">Language</h2>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {languages.map((lang) => (
                <button
                  type="button"
                  key={lang.id}
                  onClick={() => setLanguage(lang.id)}
                  className={`flex flex-col items-center justify-center text-center rounded-xl p-3 border transition-all cursor-pointer ${
                    language === lang.id
                      ? 'border-indigo-500 bg-indigo-950/40 text-white font-bold'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xl mb-1">{lang.flag}</span>
                  <span className="text-xs font-semibold">{lang.id}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Configuration Summary & Launch Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl bg-gradient-to-r from-indigo-900/40 via-slate-900 to-indigo-900/40 border border-indigo-500/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Session Overview</div>
            <div className="text-lg font-bold text-white">
              {duration} {interviewType} Round for {customJobTitle || jobTitle}
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-slate-300">
              <span className="rounded bg-slate-800 px-2 py-0.5 border border-slate-700">{targetCompany} standard</span>
              <span>•</span>
              <span className="rounded bg-slate-800 px-2 py-0.5 border border-slate-700">{targetLevel} Level</span>
              <span>•</span>
              <span className="rounded bg-slate-800 px-2 py-0.5 border border-slate-700">{language}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto min-w-[240px] flex items-center justify-center gap-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Initializing Agent...</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5 fill-current" />
                <span>Start AI Interview</span>
                <ChevronRight className="h-5 w-5" />
              </>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default MockConfigure;
