import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Bot,
  Code2,
  FileCheck,
  Zap,
  Award,
  Star,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Play,
  Users,
  Target,
  ShieldCheck,
  Flame,
  Cpu,
  Terminal,
  ChevronRight,
  BarChart3,
  Check,
  Menu,
  X,
  Globe,
  Layers,
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
  MessageSquare,
  TrendingUp,
  Clock,
  Sparkle
} from 'lucide-react';

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [activeTab, setActiveTab] = useState('coding'); // 'coding' | 'system' | 'hr'
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ Data
  const faqs = [
    {
      question: "How does the Google Gemini 1.5 Flash AI evaluate my interviews?",
      answer: "Gemini 1.5 Flash parses the interview transcripts, evaluating your communication structure, scenario depth, and logic. It calculates an immediate scorecard with metrics on communication and technical accuracy."
    },
    {
      question: "What is the purpose of this project?",
      answer: "This is a university final year project designed as an intelligent prototype for automated student placement mock interviews and resume ATS matching."
    },
    {
      question: "How does the Resume ATS Checker function?",
      answer: "Our ATS scanner reads your PDF resume, analyzing formatting, parsing keywords, and comparing it against targeted developer job descriptions to locate technical skill gaps."
    },
    {
      question: "Is this platform completely free to use?",
      answer: "Yes, this is an educational prototype built for student placement training. No fees or credit cards are involved."
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Senior Software Engineer",
      company: "Landed Google L5 ($340k TC)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content: "The Gemini-1.5-flash real-time feedback completely reshaped how I articulate system architecture. I went into my Google onsite feeling 10x more confident and aced both coding and design rounds!",
      rating: 5,
      verified: "Google Offer"
    },
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      company: "Landed Amazon SDE-II",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      content: "Practicing Leadership Principles with instant AI feedback was a game changer. The ATS resume checker also flagged missing key terms that got my resume picked out of 500+ applicants.",
      rating: 5,
      verified: "Amazon Offer"
    },
    {
      name: "Marcus Vance",
      role: "Backend Architect",
      company: "Landed Stripe Staff Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content: "The realistic mock pressure and instant line-by-line code evaluation felt just like an actual interviewer standing over my shoulder. Worth every single penny of the Pro subscription.",
      rating: 5,
      verified: "Stripe Offer"
    }
  ];

  // Hiring Companies
  const companies = [
    { name: 'Google', symbol: 'G' },
    { name: 'Amazon', symbol: 'AWS' },
    { name: 'Microsoft', symbol: 'MSFT' },
    { name: 'Netflix', symbol: 'NFLX' },
    { name: 'Stripe', symbol: 'S' },
    { name: 'Vercel', symbol: '▲' }
  ];

  // Features List
  const features = [
    {
      icon: <Bot className="h-7 w-7 text-indigo-400" />,
      title: "Real-time AI Feedback",
      subtitle: "Gemini 1.5 Flash Engine",
      description: "Get instant line-by-line feedback, tone evaluation, and structural breakdown based on key placement benchmarks as you answer.",
      badge: "AI Powered",
      gradient: "from-indigo-500/20 to-purple-500/20 border-indigo-500/30"
    },
    {
      icon: <Code2 className="h-7 w-7 text-emerald-400" />,
      title: "Placement Study Tracks",
      subtitle: "Topic-wise Guides",
      description: "Access curated guides in DSA, Spring Boot, React, and DBMS to prepare for your campus placements systematically.",
      badge: "Core Engineering",
      gradient: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30"
    },
    {
      icon: <FileCheck className="h-7 w-7 text-pink-400" />,
      title: "Resume ATS Checker",
      subtitle: "Keyword Match Analyzer",
      description: "Scan your resume against job specifications to identify missing technical skills, fix syntax formatting, and improve your resume.",
      badge: "Placement Readiness",
      gradient: "from-pink-500/20 to-rose-500/20 border-pink-500/30"
    },
    {
      icon: <Flame className="h-7 w-7 text-amber-400" />,
      title: "Streak Habit Multiplier",
      subtitle: "Gamification Stats",
      description: "Build daily practice habits with streak counts, earn skill badges, and track your levels to stay motivated for onsite tests.",
      badge: "Habit Tracker",
      gradient: "from-amber-500/20 to-orange-500/20 border-amber-500/30"
    }
  ];

  // Statistics
  const stats = [
    { value: "15,000+", label: "Interviews Simulated", change: "+12% this week", icon: <Users className="h-5 w-5 text-indigo-400" /> },
    { value: "94%", label: "Success & Offer Rate", change: "Top 5% candidate boost", icon: <Target className="h-5 w-5 text-emerald-400" /> },
    { value: "4.9 / 5", label: "Candidate Rating", change: "Based on 3,400+ reviews", icon: <Star className="h-5 w-5 text-amber-400" /> },
    { value: "< 2.5s", label: "Gemini AI Latency", change: "Real-time voice & text", icon: <Zap className="h-5 w-5 text-pink-400" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Background Decorative Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-600/15 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* -------------------- NAVBAR -------------------- */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
                <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Interv<span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">AI</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How it Works</a>
              <a href="#stats" className="hover:text-indigo-400 transition-colors">Stats</a>
              <a href="#testimonials" className="hover:text-indigo-400 transition-colors">Testimonials</a>
              <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="relative group inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold rounded-xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:opacity-90 transition-opacity" />
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-slate-950 rounded-[10px] group-hover:bg-opacity-0 text-white flex items-center gap-2">
                  <span>Start Practicing Free</span>
                  <ArrowRight className="h-4 w-4 text-indigo-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-800 bg-slate-950/95 px-6 pt-4 pb-6 space-y-4"
            >
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 py-1"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 py-1"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 py-1"
              >
                Testimonials
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-300 hover:text-indigo-400 py-1"
              >
                FAQ
              </a>
              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-200 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/25"
                >
                  Start Practicing Free
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* -------------------- HERO SECTION -------------------- */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto">
            {/* Top Pill / Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-lg shadow-indigo-950/50 hover:border-indigo-500/60 transition-all cursor-default"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>Powered by Google Gemini 1.5 Flash Real-Time Evaluation</span>
            </motion.div>
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mt-6"
            >
              Placement Mock Interview{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent block mt-2">
                & Resume ATS Portal
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed"
            >
              An educational research and placement preparation system. Simulate HR, System Design, and Behavioral interview modules evaluated directly by Google's Gemini-1.5-flash NLP model.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <span>Access Dashboard</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card bg-slate-900/60 border border-slate-800 text-slate-200 font-semibold text-base hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <Play className="h-4 w-4 text-indigo-400 fill-indigo-400" />
                <span>Features Breakdown</span>
              </a>
            </motion.div>

            {/* Micro Trust Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Educational Prototype</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Google Gemini API</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>ATS Resume Grader</span>
              </div>
            </motion.div>
          </div>

          {/* ------------ ANIMATED HERO INTERFACE MOCKUP ------------ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000" />

            <div className="relative glass-panel rounded-2xl border border-slate-800/90 bg-slate-950/90 shadow-2xl overflow-hidden">
              
              {/* Mock Window Topbar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/70">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                    gemini-1.5-flash-session.live
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    AI LIVE EVALUATION ACTIVE
                  </span>
                </div>
              </div>

              {/* Mock Window Content */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Side: Question & AI Transcript */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* AI Interviewer Card */}
                  <div className="glass-card rounded-xl p-4 border border-indigo-500/20 bg-indigo-950/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-lg bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-400">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Google Senior Lead AI Interviewer</h4>
                        <p className="text-xs text-indigo-300">System Architecture & Scalability Round</p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      "How would you design a rate-limiting service handling 1,000,000 QPS with sub-millisecond latency using Redis Sliding Window Logs?"
                    </p>
                  </div>

                  {/* Code Editor Preview */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden font-mono text-xs p-4 text-slate-300 space-y-2">
                    <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2 text-[11px]">
                      <span>RateLimiter.py</span>
                      <span className="text-emerald-400">Python 3.11 • Executed in 14ms</span>
                    </div>
                    <pre className="text-indigo-300">
                      <code><span className="text-purple-400">import</span> redis, time{"\n"}
<span className="text-purple-400">class</span> <span className="text-amber-300">SlidingWindowRateLimiter</span>:{"\n"}
{"  "}<span className="text-purple-400">def</span> <span className="text-blue-400">is_allowed</span>(self, user_id, limit, window):{"\n"}
{"    "}now = time.time(){"\n"}
{"    "}pipe = self.r.pipeline(){"\n"}
{"    "}pipe.zremrangebyscore(user_id, <span className="text-emerald-400">0</span>, now - window){"\n"}
{"    "}pipe.zadd(user_id, &#123;now: now&#125;){"\n"}
{"    "}<span className="text-purple-400">return</span> len(pipe.execute()[<span className="text-emerald-400">1</span>]) &lt;= limit</code>
                    </pre>
                  </div>
                </div>

                {/* Right Side: Gemini AI Score HUD */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Score Card */}
                  <div className="glass-card rounded-xl p-5 border border-purple-500/20 bg-purple-950/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                        Gemini 1.5 Scorecard
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                        96% MATCH
                      </span>
                    </div>

                    <div className="text-center py-2">
                      <div className="text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                        94 / 100
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Strong Hire Benchmark Passed</p>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-3 mt-4 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1 font-medium">
                          <span>Algorithmic Optimality</span>
                          <span className="text-emerald-400 font-bold">98%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full w-[98%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1 font-medium">
                          <span>System Edge Case Handling</span>
                          <span className="text-indigo-400 font-bold">92%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-400 rounded-full w-[92%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1 font-medium">
                          <span>Technical Communication</span>
                          <span className="text-pink-400 font-bold">95%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-pink-400 rounded-full w-[95%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Direct Feedback Box */}
                  <div className="glass-card rounded-xl p-4 border border-slate-800 bg-slate-900/60 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold">
                      <Zap className="h-4 w-4" />
                      <span>Gemini AI Key Feedback Insight</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      "Excellent use of Redis pipeline to maintain atomic execution. Consider explaining memory cleanup strategies for high-frequency key eviction during peak spikes."
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* Floating Glass Widgets */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 hidden md:flex items-center gap-3 px-4 py-3 rounded-xl glass-panel border border-indigo-500/30 bg-slate-950/90 shadow-xl"
            >
              <div className="h-9 w-9 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">ATS Resume Score</p>
                <p className="text-xs text-indigo-300 font-mono">98% Recruiter Optimized</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 hidden md:flex items-center gap-3 px-4 py-3 rounded-xl glass-panel border border-emerald-500/30 bg-slate-950/90 shadow-xl"
            >
              <div className="h-9 w-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">14-Day Practice Streak</p>
                <p className="text-xs text-emerald-400 font-mono">2.5x Interview Callback Rate</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </section>



      {/* -------------------- FEATURES CARDS -------------------- */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
              Comprehensive AI Preparation Suite
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Everything You Need To Pass Big Tech Onsites
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg">
              Engineered with Gemini 1.5 Flash for hyper-realistic HR, coding, and architecture evaluations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`glass-card rounded-2xl p-6 border bg-slate-900/50 backdrop-blur-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all flex flex-col justify-between ${feat.gradient}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                      {feat.icon}
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800/80 text-slate-300 border border-slate-700">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{feat.title}</h3>
                  <p className="text-xs font-semibold text-indigo-400 mt-1 mb-3">{feat.subtitle}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-xs font-semibold text-indigo-400 group cursor-pointer">
                  <span>Learn more</span>
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------- INTERACTIVE DEMO / HOW IT WORKS -------------------- */}
      <section id="how-it-works" className="py-20 bg-slate-900/30 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-pink-400 uppercase">
              Simple 3-Step Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              How IntervAI Prepares You For Offer Day
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="glass-card rounded-2xl p-8 border border-slate-800 bg-slate-950/60 relative">
              <div className="h-12 w-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xl mb-6">
                01
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Select Track & Level</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Choose target roles (Frontend, Backend, System Design, HR) and target company rubrics ranging from Junior to Staff Engineer.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card rounded-2xl p-8 border border-slate-800 bg-slate-950/60 relative">
              <div className="h-12 w-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xl mb-6">
                02
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Simulate Under Pressure</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Answer live audio/text questions or solve coding problems in our browser editor under timed real-world constraints.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card rounded-2xl p-8 border border-slate-800 bg-slate-950/60 relative">
              <div className="h-12 w-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl mb-6">
                03
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Gemini 1.5 Flash Analysis</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Receive instant granular scorecards highlighting exact syntax improvements, architectural flaws, and behavioral phrasing tweaks.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------- STATISTICS GRID -------------------- */}
      <section id="stats" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 bg-slate-900/40 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
              {stats.map((stat, idx) => (
                <div key={idx} className={`${idx !== 0 ? 'sm:pl-8 pt-6 sm:pt-0' : ''} text-center sm:text-left`}>
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      {stat.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-400">{stat.change}</span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {stat.value}
                  </div>
                  <p className="text-sm font-medium text-slate-300 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- TESTIMONIALS CAROUSEL MOCK -------------------- */}
      <section id="testimonials" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
              Proven Candidate Outcomes
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3">
              Trusted By Engineers Who Landed FAANG Offers
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800/80 bg-slate-900/60 backdrop-blur-2xl relative shadow-2xl">
              
              <div className="flex items-center gap-1 mb-6 text-amber-400">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400" />
                ))}
              </div>

              <blockquote className="text-lg sm:text-2xl font-medium text-slate-100 leading-relaxed italic mb-8">
                "{testimonials[activeTestimonial].content}"
              </blockquote>

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-6">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-indigo-500/40"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-xs text-slate-400">{testimonials[activeTestimonial].role}</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      {testimonials[activeTestimonial].company}
                    </span>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                  >
                    <ChevronDown className="h-5 w-5 rotate-90" />
                  </button>
                  <button
                    onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                    className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                  >
                    <ChevronDown className="h-5 w-5 -rotate-90" />
                  </button>
                </div>
              </div>

            </div>

            {/* Testimonial Indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeTestimonial === idx ? 'w-8 bg-indigo-500' : 'w-2.5 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>



      {/* -------------------- FAQ ACCORDION -------------------- */}
      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-800/90 bg-slate-900/40 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between text-base sm:text-lg font-semibold text-white hover:text-indigo-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-indigo-400 transition-transform duration-300 shrink-0 ml-4 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/50 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------- CTA BANNER -------------------- */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative glass-panel rounded-3xl p-10 sm:p-16 border border-indigo-500/30 bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-950/90 overflow-hidden text-center shadow-2xl">
            
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Ready to Ace Your Next Tech Interview?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                Join over 15,000+ candidates who transformed their interview performance with Google Gemini AI.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <span>Start Practicing Free Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <p className="text-xs text-slate-400">Instant access • Free 5 sessions included • No credit card</p>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------- FOOTER -------------------- */}
      <footer className="border-t border-slate-800 bg-slate-950 pt-16 pb-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
            
            {/* Brand Column */}
            <div className="col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 p-0.5">
                  <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                  </div>
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Interv<span className="text-indigo-400">AI</span>
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                The premier AI-powered interview practice platform. Master coding, system design, and HR sessions with Google Gemini 1.5 evaluation.
              </p>
              <div className="flex items-center gap-4 text-slate-400 pt-2">
                <a href="#" className="hover:text-indigo-400 transition-colors"><Github className="h-5 w-5" /></a>
                <a href="#" className="hover:text-indigo-400 transition-colors"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="hover:text-indigo-400 transition-colors"><Linkedin className="h-5 w-5" /></a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">AI Feedback Engine</a></li>
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">Code Sandbox</a></li>
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">ATS Resume Scanner</a></li>
                <li><a href="#features" className="hover:text-indigo-400 transition-colors">System Design Whiteboard</a></li>
                <li><a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing Plans</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">LeetCode Prep Guides</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">System Design Primer</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">FAANG Interview Rubrics</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog & Case Studies</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Support</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} IntervAI Tech Inc. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 flex items-center gap-1">
              Built with <Sparkles className="h-3.5 w-3.5 text-indigo-400 inline" /> and Google Gemini 1.5 Flash
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
