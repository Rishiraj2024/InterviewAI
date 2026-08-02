import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Clock,
  CheckCircle2,
  Code,
  Network,
  MessageSquare,
  Star,
  BookOpen,
  ExternalLink,
  Sparkles,
  UserCheck,
  Search,
  Layers,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

const COMPANIES_DATA = [
  {
    id: 'google',
    name: 'Google',
    badge: 'GOOGL',
    color: 'from-blue-500 via-red-500 to-amber-500',
    borderColor: 'border-blue-500/30',
    bgTint: 'bg-blue-500/10 text-blue-400',
    difficulty: 'Very Hard',
    focusArea: 'Algorithms, Data Structures & System Scalability',
    interviewProcess: [
      { step: '1. Recruiter Screen', duration: '30 mins', desc: 'Resume walk-through, role alignment, and high-level technical fit.' },
      { step: '2. Technical Phone Screen', duration: '45 mins', desc: '1 LeetCode Medium/Hard algorithmic question on Shared Docs/CoderPad.' },
      { step: '3. Onsite Loop (4 Rounds)', duration: '4 Hours', desc: '2 Data Structures & Algorithms, 1 System Design (Senior+), 1 Googleyness & Behavioral.' },
    ],
    frequentQuestions: [
      { id: 102, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'String', gfgUrl: 'https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/' },
      { id: 601, title: 'Design a Distributed Rate Limiter', difficulty: 'Hard', topic: 'System Design', gfgUrl: 'https://www.geeksforgeeks.org/system-design-rate-limiter/' },
      { id: 103, title: 'Merge K Sorted Lists', difficulty: 'Hard', topic: 'Heap / Priority Queue', gfgUrl: 'https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/' },
      { id: 604, title: 'Consistent Hashing Algorithm', difficulty: 'Medium', topic: 'Distributed Systems', gfgUrl: 'https://www.geeksforgeeks.org/consistent-hashing-system-design/' },
    ],
    systemDesignTopics: [
      'Google Search Typeahead / Autocomplete System',
      'Global Distributed Storage (Spanner / BigTable principles)',
      'Design YouTube Video Ingestion & Streaming',
      'Distributed Rate Limiting & Sliding Window Counter',
    ],
    candidateExperiences: [
      {
        candidate: 'Alex M.',
        role: 'L5 Senior Software Engineer',
        date: 'June 2026',
        rating: 5,
        outcome: 'Offer Accepted',
        notes: 'Heavy focus on edge cases and code efficiency. Clean code structure with test cases walk-through was appreciated by the interviewers.',
      },
      {
        candidate: 'Priya K.',
        role: 'L4 Software Engineer',
        date: 'May 2026',
        rating: 4,
        outcome: 'Offer Accepted',
        notes: 'Googleyness round was conversational but deep. Highlighted cross-team collaboration and handling ambiguous technical requirements.',
      },
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon',
    badge: 'AMZN',
    color: 'from-amber-500 via-orange-500 to-amber-600',
    borderColor: 'border-amber-500/30',
    bgTint: 'bg-amber-500/10 text-amber-400',
    difficulty: 'Hard',
    focusArea: 'Leadership Principles (STAR method) & Object Oriented Design',
    interviewProcess: [
      { step: '1. Online Assessment (OA)', duration: '90 mins', desc: '2 coding problems + Work Simulation & Behavioral survey.' },
      { step: '2. Recruiter Check', duration: '30 mins', desc: 'Prep session on 16 Leadership Principles and team matching.' },
      { step: '3. Onsite Loop (4-5 Rounds)', duration: '5 Hours', desc: 'Every round contains 20-30 mins LP questions + 1 Coding/LLD/System Design problem with a Bar Raiser.' },
    ],
    frequentQuestions: [
      { id: 101, title: 'Two Sum & K-Sum Variations', difficulty: 'Easy', topic: 'Array / Hash Table', gfgUrl: 'https://www.geeksforgeeks.org/two-sum-problem-using-two-pointer-technique/' },
      { id: 402, title: 'Virtual Order Fulfillment Queue', difficulty: 'Medium', topic: 'Data Structures', gfgUrl: 'https://www.geeksforgeeks.org/queue-data-structure/' },
      { id: 602, title: 'Design Amazon Shopping Cart & Checkout', difficulty: 'Hard', topic: 'System Design', gfgUrl: 'https://www.geeksforgeeks.org/design-shopping-cart-system-design/' },
      { id: 202, title: 'HashMap vs ConcurrentHashMap Under The Hood', difficulty: 'Medium', topic: 'Java Concurrency', gfgUrl: 'https://www.geeksforgeeks.org/difference-between-hashmap-and-concurrenthashmap-in-java/' },
    ],
    systemDesignTopics: [
      'Design Amazon Fulfillment Center Inventory Tracker',
      'High-throughput Notification Service (SNS/SQS architecture)',
      'E-commerce Payment Gateway & Idempotency Key Design',
      'Distributed Caching Strategy (Redis & Memcached)',
    ],
    candidateExperiences: [
      {
        candidate: 'David L.',
        role: 'SDE II',
        date: 'July 2026',
        rating: 5,
        outcome: 'Offer Accepted',
        notes: 'Do NOT skimp on Leadership Principles! Prepare 2 STAR stories per principle. Bar Raiser was intense on "Customer Obsession" and "Have Backbone; Disagree and Commit".',
      },
      {
        candidate: 'Sarah T.',
        role: 'SDE I',
        date: 'April 2026',
        rating: 4,
        outcome: 'Offer Accepted',
        notes: 'Coding questions were standard LeetCode mediums. Make sure to talk through your OOP class design clearly.',
      },
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    badge: 'MSFT',
    color: 'from-cyan-500 via-blue-500 to-indigo-600',
    borderColor: 'border-cyan-500/30',
    bgTint: 'bg-cyan-500/10 text-cyan-400',
    difficulty: 'Medium-Hard',
    focusArea: 'Data Structures, System Architecture & Azure Integrations',
    interviewProcess: [
      { step: '1. Recruiter Screen', duration: '30 mins', desc: 'Background check, salary expectations, tech stack alignment.' },
      { step: '2. Technical Screening', duration: '45 mins', desc: 'Data structures coding challenge on Codility.' },
      { step: '3. Final Onsite Loop (4 Rounds)', duration: '4 Hours', desc: '3 Coding & Architecture rounds + 1 As-If Manager round focused on team culture.' },
    ],
    frequentQuestions: [
      { id: 104, title: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium', topic: 'Trees / BFS', gfgUrl: 'https://www.geeksforgeeks.org/zigzag-tree-traversal/' },
      { id: 302, title: 'Transactional Isolation Levels', difficulty: 'Medium', topic: 'Database / Spring', gfgUrl: 'https://www.geeksforgeeks.org/transaction-propagation-and-isolation-in-spring-boot/' },
      { id: 501, title: 'Window Functions & Ranking Queries', difficulty: 'Hard', topic: 'SQL', gfgUrl: 'https://www.geeksforgeeks.org/sql-window-functions/' },
      { id: 401, title: 'Custom Hook: useDebounce & useThrottle', difficulty: 'Medium', topic: 'React', gfgUrl: 'https://www.geeksforgeeks.org/reactjs-use-debounce-hook/' },
    ],
    systemDesignTopics: [
      'Design Microsoft Teams Real-time Messaging & Presence',
      'Cloud Object Storage (Azure Blob Storage Arch)',
      'Design Collaborative Document Editing (OT vs CRDTs)',
      'Distributed Task Scheduler and Worker Pool',
    ],
    candidateExperiences: [
      {
        candidate: 'Elena R.',
        role: 'Senior Software Engineer (L63)',
        date: 'June 2026',
        rating: 4,
        outcome: 'Offer Accepted',
        notes: 'Very friendly interviewers. Emphasized clean code, unit testing, and modular architecture during the technical rounds.',
      },
    ],
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    badge: 'CRM',
    color: 'from-sky-400 via-blue-600 to-cyan-500',
    borderColor: 'border-sky-500/30',
    bgTint: 'bg-sky-500/10 text-sky-400',
    difficulty: 'Medium-Hard',
    focusArea: 'Enterprise Microservices, Java Backend & Multitenancy',
    interviewProcess: [
      { step: '1. HackerRank Assessment', duration: '75 mins', desc: '2 coding problems + 1 SQL query exercise.' },
      { step: '2. Tech Phone Screen', duration: '60 mins', desc: 'Java Core concepts, Multithreading, and live algorithm problem.' },
      { step: '3. Onsite Panel (4 Rounds)', duration: '4 Hours', desc: 'System Design, Microservices API design, Coding, and Hiring Manager round.' },
    ],
    frequentQuestions: [
      { id: 201, title: 'Custom ThreadPoolExecutor Implementation', difficulty: 'Hard', topic: 'Java Multithreading', gfgUrl: 'https://www.geeksforgeeks.org/threadpoolexecutor-in-java/' },
      { id: 301, title: 'Building Secure JWT Authentication Filter', difficulty: 'Medium', topic: 'Spring Security', gfgUrl: 'https://www.geeksforgeeks.org/spring-boot-jwt-authentication/' },
      { id: 502, title: 'Optimizing Slow Queries with EXPLAIN', difficulty: 'Medium', topic: 'Database Tuning', gfgUrl: 'https://www.geeksforgeeks.org/sql-explain-statement/' },
      { id: 304, title: 'CRUD Service with Spring Data JPA', difficulty: 'Easy', topic: 'Spring Boot', gfgUrl: 'https://www.geeksforgeeks.org/spring-boot-crud-operations-using-spring-data-jpa/' },
    ],
    systemDesignTopics: [
      'Multi-tenant Architecture & Database Isolation',
      'Design Distributed Webhook & Event Streaming System',
      'RESTful API Gateway & Rate Limiter for SaaS Integrations',
      'Search Indexing Pipeline for CRM Records (Elasticsearch)',
    ],
    candidateExperiences: [
      {
        candidate: 'Marcus B.',
        role: 'Lead Software Engineer',
        date: 'May 2026',
        rating: 5,
        outcome: 'Offer Accepted',
        notes: 'System design focused heavily on multi-tenancy constraints and zero-downtime database migrations.',
      },
    ],
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    badge: 'TEAM',
    color: 'from-blue-600 via-indigo-600 to-purple-600',
    borderColor: 'border-indigo-500/30',
    bgTint: 'bg-indigo-500/10 text-indigo-400',
    difficulty: 'Hard',
    focusArea: 'Values-based Interviews, Data Structures & Concurrency',
    interviewProcess: [
      { step: '1. Recruiter Screen', duration: '30 mins', desc: 'General background and Atlassian values introduction.' },
      { step: '2. Technical Screen', duration: '60 mins', desc: 'Live coding on Data Structures & Data Transformations.' },
      { step: '3. Full Loop (4 Rounds)', duration: '4 Hours', desc: '1 Data Structures & Algorithms, 1 System Design, 1 Management/Values round, 1 Code Craftsmanship round.' },
    ],
    frequentQuestions: [
      { id: 603, title: 'Design Real-time Jira Board Synchronization', difficulty: 'Hard', topic: 'System Design', gfgUrl: 'https://www.geeksforgeeks.org/design-trello-system-design/' },
      { id: 203, title: 'Garbage Collection & JVM Memory Management', difficulty: 'Medium', topic: 'Java Architecture', gfgUrl: 'https://www.geeksforgeeks.org/garbage-collection-in-java/' },
      { id: 403, title: 'Context API Performance Optimization', difficulty: 'Easy', topic: 'React', gfgUrl: 'https://www.geeksforgeeks.org/react-context-api/' },
      { id: 503, title: 'Database Sharding & Replication', difficulty: 'Medium', topic: 'DBMS', gfgUrl: 'https://www.geeksforgeeks.org/database-sharding/' },
    ],
    systemDesignTopics: [
      'Design Confluence Collaborative Document Service',
      'Real-time WebSockets Notification Engine for Jira',
      'Design Bitbucket Distributed Git Repository Storage',
      'RBAC (Role-Based Access Control) System for Enterprise',
    ],
    candidateExperiences: [
      {
        candidate: 'Sophie H.',
        role: 'Senior Frontend Engineer',
        date: 'July 2026',
        rating: 5,
        outcome: 'Offer Accepted',
        notes: 'The Values round ("Open company, no bullshit", "Be the change you seek") is just as critical as the coding rounds. Be genuine!',
      },
    ],
  },
  {
    id: 'adobe',
    name: 'Adobe',
    badge: 'ADBE',
    color: 'from-red-600 via-rose-600 to-pink-600',
    borderColor: 'border-red-500/30',
    bgTint: 'bg-rose-500/10 text-rose-400',
    difficulty: 'Medium-Hard',
    focusArea: 'Object Oriented Design, C++/Java Fundamentals & Media Processing',
    interviewProcess: [
      { step: '1. Online Coding Round', duration: '90 mins', desc: '3 problems on algorithms, data structures, and math.' },
      { step: '2. Technical Interview 1', duration: '60 mins', desc: 'Data structures problem solving & OOP design patterns.' },
      { step: '3. Technical Interview 2 & Onsite', duration: '3 Hours', desc: 'System Architecture, Low Level Design (LLD), and Director HR Round.' },
    ],
    frequentQuestions: [
      { id: 103, title: 'Merge K Sorted Lists', difficulty: 'Hard', topic: 'Data Structures', gfgUrl: 'https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/' },
      { id: 404, title: 'Form Validation Hook with Schema', difficulty: 'Medium', topic: 'React / JS', gfgUrl: 'https://www.geeksforgeeks.org/form-validation-in-react-js/' },
      { id: 504, title: 'Basic SQL Inner & Outer Joins', difficulty: 'Easy', topic: 'SQL', gfgUrl: 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/' },
      { id: 701, title: 'Tell Me About a Complex Technical Tradeoff', difficulty: 'Medium', topic: 'Behavioral', gfgUrl: 'https://www.geeksforgeeks.org/behavioral-interview-questions/' },
    ],
    systemDesignTopics: [
      'Design Cloud Asset Storage & Sync (Adobe Creative Cloud)',
      'PDF Document Rendering Engine Pipeline Architecture',
      'Real-time Analytics Dashboard for Adobe Experience Platform',
      'High Performance Image Processing Cache',
    ],
    candidateExperiences: [
      {
        candidate: 'Vikram S.',
        role: 'Computer Scientist 2',
        date: 'May 2026',
        rating: 4,
        outcome: 'Offer Accepted',
        notes: 'In-depth focus on C++/Java memory management, pointers, cache-friendliness, and thread safety.',
      },
    ],
  },
];

const CompanyPrep = () => {
  const navigate = useNavigate();
  const [selectedCompanyId, setSelectedCompanyId] = useState('google');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCompany = COMPANIES_DATA.find((c) => c.id === selectedCompanyId) || COMPANIES_DATA[0];

  const filteredCompanies = COMPANIES_DATA.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.focusArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'hard':
      case 'very hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 p-6 md:p-8 shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              <Building2 className="h-3.5 w-3.5" />
              <span>Targeted Tech Paths</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Company Interview Prep
            </h1>
            <p className="text-sm text-slate-300">
              Tailored preparation roadmaps, interview process breakdowns, frequently asked questions, and verified candidate experiences for top tech companies.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 backdrop-blur-md">
            <div className="text-right">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Curated Companies</span>
              <div className="text-2xl font-bold text-white">{COMPANIES_DATA.length} Tier-1 Tech</div>
            </div>
            <div className="p-3 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Award className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Company Selection Selector & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 glass-card p-4 rounded-xl border border-slate-800">
          <h2 className="text-base font-bold font-serif text-white flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-indigo-400" />
            <span>Select Target Enterprise</span>
          </h2>

          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search companies or focus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {filteredCompanies.map((comp) => {
            const isSelected = comp.id === selectedCompanyId;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedCompanyId(comp.id)}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
                  isSelected
                    ? `bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50`
                    : 'glass-card border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl mb-2 flex items-center justify-center font-bold text-sm bg-gradient-to-br ${comp.color} text-white shadow-md`}
                >
                  {comp.name[0]}
                </div>
                <span
                  className={`text-sm font-bold transition-colors ${
                    isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}
                >
                  {comp.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 mt-0.5">{comp.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Company Deep-Dive Details */}
      {selectedCompany && (
        <div className="glass-card rounded-2xl border border-slate-800/90 overflow-hidden shadow-2xl space-y-8 p-6 md:p-8">
          {/* Company Main Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-2xl bg-gradient-to-br ${selectedCompany.color} text-white shadow-lg`}
              >
                {selectedCompany.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
                    {selectedCompany.name}
                  </h2>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${selectedCompany.bgTint}`}>
                    {selectedCompany.badge}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${getDifficultyBadge(selectedCompany.difficulty)}`}>
                    {selectedCompany.difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Key Focus: <span className="text-slate-200 font-medium">{selectedCompany.focusArea}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/question-bank')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-indigo-600/20"
            >
              <Code className="h-4 w-4" />
              <span>Practice {selectedCompany.name} Problems</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Interview Process Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-white border-b border-slate-800 pb-2">
                <Clock className="h-5 w-5 text-indigo-400" />
                <span>Typical Interview Process</span>
              </div>
              <div className="space-y-3">
                {selectedCompany.interviewProcess.map((proc, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-indigo-400">{proc.step}</span>
                      <span className="text-slate-500 font-mono">{proc.duration}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{proc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: System Design Topics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-white border-b border-slate-800 pb-2">
                <Network className="h-5 w-5 text-cyan-400" />
                <span>High-Frequency System Design Topics</span>
              </div>
              <div className="space-y-2.5">
                {selectedCompany.systemDesignTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span>{topic}</span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                      Must Study
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Frequently Asked Coding Questions */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-bold text-white">
                <Code className="h-5 w-5 text-emerald-400" />
                <span>Frequently Asked Coding Questions</span>
              </div>
              <Link
                to="/question-bank"
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
              >
                <span>View all in Question Bank</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCompany.frequentQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-4 hover:border-indigo-500/40 transition-all group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold uppercase text-slate-500 tracking-wider">
                      {q.topic}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                      {q.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-semibold border ${getDifficultyBadge(
                        q.difficulty
                      )}`}
                    >
                      {q.difficulty}
                    </span>
                    {q.gfgUrl ? (
                      <a
                        href={q.gfgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-emerald-600/20 flex items-center justify-center"
                        title="Study on GeeksforGeeks"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => navigate(q.path)}
                        className="p-2 rounded-lg bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-indigo-600/20"
                        title="Solve Coding Challenge"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Shared Candidate Experiences Log */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-bold text-white">
                <MessageSquare className="h-5 w-5 text-amber-400" />
                <span>Shared Candidate Experiences Log</span>
              </div>
              <span className="text-xs text-slate-500">Verified Submissions</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedCompany.candidateExperiences.map((exp, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">{exp.candidate}</h4>
                      <p className="text-xs text-slate-400">{exp.role} • {exp.date}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded text-xs border border-amber-500/20 font-semibold">
                      <Star className="h-3 w-3 fill-amber-400" />
                      <span>{exp.rating}/5</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/60 italic">
                    "{exp.notes}"
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">Outcome</span>
                    <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                      {exp.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPrep;
