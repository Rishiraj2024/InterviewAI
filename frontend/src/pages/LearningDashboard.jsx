import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Code2,
  Database,
  Cpu,
  Layers,
  MessageSquare,
  Server,
  Globe,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Play,
  Sparkles,
  Trophy,
  BarChart3,
  Search,
  Filter,
  Clock,
  Target,
  ExternalLink,
  Terminal,
  Network
} from 'lucide-react';

const TRACKS_DATA = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    category: 'Core Engineering',
    gfgUrl: 'https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/',
    description: 'Master arrays, trees, dynamic programming, graph algorithms, and time complexity optimization.',
    icon: Code2,
    iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    accentColor: 'from-indigo-500 to-purple-600',
    progress: 75,
    completedModules: 15,
    totalModules: 20,
    questions: [
      { id: 101, title: 'Two Sum & 2-Pointer Technique', difficulty: 'Easy', gfgUrl: 'https://www.geeksforgeeks.org/two-sum-problem-using-two-pointer-technique/' },
      { id: 102, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/' },
      { id: 103, title: 'Merge K Sorted Lists using Priority Queue', difficulty: 'Hard', gfgUrl: 'https://www.geeksforgeeks.org/merge-k-sorted-linked-lists/' },
      { id: 104, title: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/zigzag-tree-traversal/' },
    ],
  },
  {
    id: 'os',
    title: 'Operating Systems',
    category: 'Core Engineering',
    gfgUrl: 'https://www.geeksforgeeks.org/operating-systems/',
    description: 'Learn process management, CPU scheduling, memory management, concurrency, deadlocks, and virtual memory.',
    icon: Terminal,
    iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    accentColor: 'from-rose-500 to-red-600',
    progress: 45,
    completedModules: 9,
    totalModules: 20,
    questions: [
      { id: 801, title: 'CPU Scheduling Algorithms', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/' },
      { id: 802, title: 'Process Synchronization & Semaphores', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/semaphores-in-operating-system/' },
      { id: 803, title: 'Deadlock Detection & Prevention', difficulty: 'Hard', gfgUrl: 'https://www.geeksforgeeks.org/deadlock-prevention/' },
      { id: 804, title: 'Page Replacement Algorithms', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/' },
    ],
  },
  {
    id: 'cn',
    title: 'Computer Networks',
    category: 'Core Engineering',
    gfgUrl: 'https://www.geeksforgeeks.org/computer-network-tutorials/',
    description: 'Master TCP/IP and OSI models, IP addressing, routing protocols, DNS, HTTP/HTTPS, and network security.',
    icon: Network,
    iconBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    accentColor: 'from-sky-500 to-blue-600',
    progress: 55,
    completedModules: 11,
    totalModules: 20,
    questions: [
      { id: 901, title: 'TCP 3-Way Handshake Connection', difficulty: 'Easy', gfgUrl: 'https://www.geeksforgeeks.org/tcp-3-way-handshake-process/' },
      { id: 902, title: 'OSI Model Layer Functions', difficulty: 'Easy', gfgUrl: 'https://www.geeksforgeeks.org/layers-of-osi-model/' },
      { id: 903, title: 'IP Addressing & Subnetting Guide', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/ip-addressing-and-subnetting-in-computer-networks/' },
      { id: 904, title: 'HTTP vs HTTPS & SSL Handshake', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/difference-between-http-and-https/' },
    ],
  },
  {
    id: 'java',
    title: 'Java Core & Modern Features',
    category: 'Core Engineering',
    gfgUrl: 'https://www.geeksforgeeks.org/java/',
    description: 'OOP concepts, Collections framework, Multithreading, Concurrency, and Java 17+ Stream APIs.',
    icon: Server,
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    accentColor: 'from-amber-500 to-orange-600',
    progress: 85,
    completedModules: 17,
    totalModules: 20,
    questions: [
      { id: 201, title: 'Custom ThreadPoolExecutor Implementation', difficulty: 'Hard', gfgUrl: 'https://www.geeksforgeeks.org/threadpoolexecutor-in-java/' },
      { id: 202, title: 'HashMap vs ConcurrentHashMap Under The Hood', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/difference-between-hashmap-and-concurrenthashmap-in-java/' },
      { id: 203, title: 'Garbage Collection Algorithms & JVM Tuning', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/garbage-collection-in-java/' },
      { id: 204, title: 'Stream API Filtering and Collectors', difficulty: 'Easy', gfgUrl: 'https://www.geeksforgeeks.org/java-8-stream-tutorial-with-examples/' },
    ],
  },
  {
    id: 'springboot',
    title: 'Spring Boot & Microservices',
    category: 'Frameworks',
    gfgUrl: 'https://www.geeksforgeeks.org/spring-boot-tutorial/',
    description: 'REST API design, Spring Security, Dependency Injection, JPA/Hibernate, and Resilience4j patterns.',
    icon: Layers,
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    accentColor: 'from-emerald-500 to-teal-600',
    progress: 60,
    completedModules: 12,
    totalModules: 20,
    questions: [
      { id: 301, title: 'Building Secure JWT Authentication Filter', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/spring-boot-jwt-authentication/' },
      { id: 302, title: 'Transactional Annotations & Isolation Levels', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/transaction-propagation-and-isolation-in-spring-boot/' },
      { id: 303, title: 'Distributed Tracing with Micrometer & Zipkin', difficulty: 'Hard', gfgUrl: 'https://www.geeksforgeeks.org/spring-boot-distributed-tracing/' },
      { id: 304, title: 'CRUD Service with Spring Data JPA', difficulty: 'Easy', gfgUrl: 'https://www.geeksforgeeks.org/spring-boot-crud-operations-using-spring-data-jpa/' },
    ],
  },
  {
    id: 'react',
    title: 'React & Modern Frontend',
    category: 'Frameworks',
    gfgUrl: 'https://www.geeksforgeeks.org/reactjs-tutorials/',
    description: 'Hooks lifecycle, Virtual DOM performance, State management, Fiber architecture, and SSR/Vite.',
    icon: Globe,
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    accentColor: 'from-cyan-500 to-blue-600',
    progress: 70,
    completedModules: 14,
    totalModules: 20,
    questions: [
      { id: 401, title: 'Custom Hook: useDebounce & useThrottle', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/reactjs-use-debounce-hook/' },
      { id: 402, title: 'Virtual List / Infinite Scroll Component', difficulty: 'Hard', gfgUrl: 'https://www.geeksforgeeks.org/how-to-implement-infinite-scroll-in-reactjs/' },
      { id: 403, title: 'Context API Performance Optimization', difficulty: 'Easy', gfgUrl: 'https://www.geeksforgeeks.org/react-context-api/' },
      { id: 404, title: 'Form Validation Hook with Schema', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/form-validation-in-react-js/' },
    ],
  },
  {
    id: 'dbms',
    title: 'Database Management & SQL',
    category: 'System & Architecture',
    gfgUrl: 'https://www.geeksforgeeks.org/dbms/',
    description: 'Relational schema design, SQL joins, Indexing (B-Tree, Hash), ACID properties, and NoSQL databases.',
    icon: Database,
    iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    accentColor: 'from-blue-500 to-indigo-600',
    progress: 50,
    completedModules: 10,
    totalModules: 20,
    questions: [
      { id: 501, title: 'Complex Window Functions & Ranking Queries', difficulty: 'Hard', gfgUrl: 'https://www.geeksforgeeks.org/sql-window-functions/' },
      { id: 502, title: 'Optimizing Slow Queries with EXPLAIN ANALYZE', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/sql-explain-statement/' },
      { id: 503, title: 'Database Sharding & Replication Strategies', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/database-sharding/' },
      { id: 504, title: 'Basic SQL Inner & Outer Joins', difficulty: 'Easy', gfgUrl: 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/' },
    ],
  },
  {
    id: 'systemdesign',
    title: 'System Design & Scalability',
    category: 'System & Architecture',
    gfgUrl: 'https://www.geeksforgeeks.org/system-design-tutorial/',
    description: 'High-availability architecture, Load Balancers, Distributed Caching, Message Queues (Kafka), and Microservices.',
    icon: Cpu,
    iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    accentColor: 'from-purple-500 to-pink-600',
    progress: 40,
    completedModules: 8,
    totalModules: 20,
    questions: [
      { id: 601, title: 'Design a Distributed Rate Limiter', difficulty: 'Hard', gfgUrl: 'https://www.geeksforgeeks.org/system-design-rate-limiter/' },
      { id: 602, title: 'Design URL Shortening Service (TinyURL)', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/system-design-url-shortening-service/' },
      { id: 603, title: 'Design Real-time Chat Application', difficulty: 'Hard', gfgUrl: 'https://www.geeksforgeeks.org/system-design-chat-application/' },
      { id: 604, title: 'Consistent Hashing Algorithm Design', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/consistent-hashing-system-design/' },
    ],
  },
  {
    id: 'behavioral',
    title: 'Behavioral & Leadership',
    category: 'Soft Skills',
    gfgUrl: 'https://www.geeksforgeeks.org/interview-preparation/',
    description: 'STAR method responses, Conflict resolution, Leadership principles, and Mock AI interviewer scenarios.',
    icon: MessageSquare,
    iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    accentColor: 'from-rose-500 to-red-600',
    progress: 90,
    completedModules: 18,
    totalModules: 20,
    questions: [
      { id: 701, title: 'Tell Me About a Complex Technical Tradeoff', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/behavioral-interview-questions/' },
      { id: 702, title: 'Handling Conflict with Team Members', difficulty: 'Easy', gfgUrl: 'https://www.geeksforgeeks.org/behavioral-interview-questions-for-software-engineers/' },
      { id: 703, title: 'Describing a Project Failure and Learnings', difficulty: 'Medium', gfgUrl: 'https://www.geeksforgeeks.org/star-method-for-interview-preparation/' },
      { id: 704, title: 'Leadership Principles: Customer Obsession', difficulty: 'Easy', gfgUrl: 'https://www.geeksforgeeks.org/amazon-leadership-principles/' },
    ],
  },
];

const CATEGORIES = ['All', 'Core Engineering', 'Frameworks', 'System & Architecture', 'Soft Skills'];

const LearningDashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTracks = TRACKS_DATA.filter((track) => {
    const matchesCategory = selectedCategory === 'All' || track.category === selectedCategory;
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const totalProgressAverage = Math.round(
    TRACKS_DATA.reduce((acc, t) => acc + t.progress, 0) / TRACKS_DATA.length
  );
  const totalCompletedModules = TRACKS_DATA.reduce((acc, t) => acc + t.completedModules, 0);
  const totalModulesCount = TRACKS_DATA.reduce((acc, t) => acc + t.totalModules, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 p-6 md:p-8 shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Structured Skill Paths</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Learning Dashboard
            </h1>
            <p className="text-sm text-slate-300">
              Accelerate your engineering interview preparation across core domains, system architecture, and framework mastery.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 backdrop-blur-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">Overall Mastery</div>
              <div className="text-2xl font-bold text-white">{totalProgressAverage}%</div>
              <div className="text-xs text-slate-400">{totalCompletedModules} of {totalModulesCount} Modules</div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Learning Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Tracks</span>
            <h3 className="text-2xl font-bold text-white mt-1">{TRACKS_DATA.length} Domains</h3>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400">
            <BookOpen className="h-5 w-5" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Practice Problems</span>
            <h3 className="text-2xl font-bold text-white mt-1">
              {TRACKS_DATA.reduce((acc, t) => acc + t.questions.length, 0)} Selected
            </h3>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
            <Target className="h-5 w-5" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed</span>
            <h3 className="text-2xl font-bold text-white mt-1">{totalCompletedModules} Lessons</h3>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Est. Prep Time</span>
            <h3 className="text-2xl font-bold text-white mt-1">45 Hours</h3>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 glass-card p-4 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search tracks or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Track Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTracks.map((track) => {
          const IconComponent = track.icon;
          return (
            <div
              key={track.id}
              className="glass-card rounded-xl border border-slate-800/80 p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg group hover:-translate-y-1 duration-200"
            >
              <div>
                {/* Track Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl border ${track.iconBg}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {track.category}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {track.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  {track.description}
                </p>

                {/* Progress Bar Section */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">Track Progress</span>
                    <span className="font-bold text-indigo-400">{track.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${track.accentColor} transition-all duration-500`}
                      style={{ width: `${track.progress}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 text-right">
                    {track.completedModules} of {track.totalModules} modules completed
                  </div>
                </div>

                {/* Practice Questions List */}
                <div className="space-y-3 mb-6 border-t border-slate-800/80 pt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Featured Practice Questions</span>
                    <span className="text-[11px] font-normal text-slate-500">
                      {track.questions.length} items
                    </span>
                  </h4>
                  <div className="space-y-2">
                    {track.questions.map((q) => (
                      <a
                        key={q.id}
                        href={q.gfgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-950/40 hover:bg-indigo-950/20 border border-slate-900 hover:border-indigo-900/40 text-xs transition-all group/item cursor-pointer text-left"
                      >
                        <span className="text-slate-300 group-hover/item:text-indigo-400 truncate font-medium flex-1">
                          {q.title}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-[10px] font-bold text-emerald-400 border border-emerald-900/50 flex items-center gap-0.5">
                            GFG
                            <ExternalLink className="h-2.5 w-2.5" />
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold border shrink-0 ${getDifficultyBadge(
                              q.difficulty
                            )}`}
                          >
                            {q.difficulty}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  {track.gfgUrl && (
                    <a
                      href={track.gfgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-emerald-600/20 active:scale-[0.98]"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Study on GFG</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => navigate('/question-bank')}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:text-white text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    title="View Question Bank"
                  >
                    <span>Curated Questions</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTracks.length === 0 && (
        <div className="glass-card rounded-xl p-12 text-center border border-slate-800">
          <BookOpen className="h-10 w-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-300">No Tracks Found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search filter or category selection.</p>
        </div>
      )}
    </div>
  );
};

export default LearningDashboard;
