import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Search,
  Filter,
  Bookmark,
  Heart,
  Code,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
  BookOpen,
  Tag,
  Loader2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

const FALLBACK_QUESTIONS = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Array',
    acceptanceRate: '49.2%',
    likes: 1420,
    isBookmarked: false,
    isLiked: false,
    description: 'Find two indices in array that sum up to a target integer.',
    gfgUrl: 'https://www.geeksforgeeks.org/two-sum-problem-using-two-pointer-technique/',
  },
  {
    id: 2,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'String',
    acceptanceRate: '33.8%',
    likes: 980,
    isBookmarked: true,
    isLiked: true,
    description: 'Find the length of the longest substring without duplicate characters.',
    gfgUrl: 'https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/',
  },
  {
    id: 3,
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    topic: 'Linked List',
    acceptanceRate: '72.5%',
    likes: 1105,
    isBookmarked: false,
    isLiked: false,
    description: 'Reverse a singly linked list iteratively and recursively.',
    gfgUrl: 'https://www.geeksforgeeks.org/reverse-a-linked-list/',
  },
  {
    id: 4,
    title: 'Top K Frequent Employees by Department',
    difficulty: 'SQL',
    topic: 'SQL',
    acceptanceRate: '58.1%',
    likes: 640,
    isBookmarked: false,
    isLiked: true,
    description: 'Write an SQL query to retrieve top earning employees grouped by department.',
    gfgUrl: 'https://www.geeksforgeeks.org/sql-query-to-find-the-highest-salary-in-each-department/',
  },
  {
    id: 5,
    title: 'Coin Change Problem',
    difficulty: 'Hard',
    topic: 'Dynamic Programming',
    acceptanceRate: '41.0%',
    likes: 1250,
    isBookmarked: true,
    isLiked: false,
    description: 'Compute the fewest number of coins needed to make up a target amount.',
    gfgUrl: 'https://www.geeksforgeeks.org/coin-change-dp-7/',
  },
  {
    id: 6,
    title: 'Container With Most Water',
    difficulty: 'Medium',
    topic: 'Array',
    acceptanceRate: '54.0%',
    likes: 890,
    isBookmarked: false,
    isLiked: false,
    description: 'Find two lines that together with the x-axis form a container holding the most water.',
    gfgUrl: 'https://www.geeksforgeeks.org/container-with-most-water/',
  },
  {
    id: 7,
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    topic: 'String',
    acceptanceRate: '44.6%',
    likes: 720,
    isBookmarked: false,
    isLiked: false,
    description: 'Determine if a string is a palindrome considering only alphanumeric characters.',
    gfgUrl: 'https://www.geeksforgeeks.org/sentence-palindrome-given-string-containing-alphanumeric-characters/',
  },
  {
    id: 8,
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topic: 'Linked List',
    acceptanceRate: '61.9%',
    likes: 1040,
    isBookmarked: true,
    isLiked: true,
    description: 'Merge two sorted linked lists into one single sorted list.',
    gfgUrl: 'https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/',
  },
  {
    id: 9,
    title: 'Department Highest Salary',
    difficulty: 'Medium',
    topic: 'SQL',
    acceptanceRate: '48.9%',
    likes: 510,
    isBookmarked: false,
    isLiked: false,
    description: 'SQL query to find employees who have the highest salary in each department.',
    gfgUrl: 'https://www.geeksforgeeks.org/sql-query-to-find-the-highest-salary-in-each-department/',
  },
  {
    id: 10,
    title: 'Longest Increasing Subsequence',
    difficulty: 'Hard',
    topic: 'Dynamic Programming',
    acceptanceRate: '51.3%',
    likes: 1180,
    isBookmarked: false,
    isLiked: true,
    description: 'Find the length of the longest strictly increasing subsequence in an array.',
    gfgUrl: 'https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/',
  },
  {
    id: 11,
    title: 'Process vs Thread',
    difficulty: 'Easy',
    topic: 'Operating Systems',
    acceptanceRate: '75.2%',
    likes: 850,
    isBookmarked: false,
    isLiked: false,
    description: 'Understand the fundamental differences between execution units: processes vs threads.',
    gfgUrl: 'https://www.geeksforgeeks.org/difference-between-process-and-thread/',
  },
  {
    id: 12,
    title: 'Deadlock Characterization',
    difficulty: 'Medium',
    topic: 'Operating Systems',
    acceptanceRate: '62.4%',
    likes: 720,
    isBookmarked: true,
    isLiked: true,
    description: 'Analyze the four necessary conditions (Coffman conditions) for deadlock to occur.',
    gfgUrl: 'https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/',
  },
  {
    id: 13,
    title: 'TCP vs UDP Protocols',
    difficulty: 'Easy',
    topic: 'Computer Networks',
    acceptanceRate: '88.1%',
    likes: 930,
    isBookmarked: false,
    isLiked: false,
    description: 'Compare connection-oriented TCP vs connectionless UDP transmission protocols.',
    gfgUrl: 'https://www.geeksforgeeks.org/difference-between-tcp-and-udp/',
  },
  {
    id: 14,
    title: 'Domain Name System (DNS) Lookup',
    difficulty: 'Medium',
    topic: 'Computer Networks',
    acceptanceRate: '54.5%',
    likes: 610,
    isBookmarked: false,
    isLiked: true,
    description: 'Learn the hierarchy, resolution process, and server roles during a DNS query.',
    gfgUrl: 'https://www.geeksforgeeks.org/dns-domain-name-system/',
  },
];

const DIFFICULTY_OPTIONS = ['All', 'Easy', 'Medium', 'Hard'];
const TOPIC_OPTIONS = ['All', 'Array', 'String', 'Linked List', 'SQL', 'Dynamic Programming', 'Operating Systems', 'Computer Networks'];

const QuestionBank = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Pagination State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Local interaction overrides for bookmarks/likes
  const [bookmarks, setBookmarks] = useState({});
  const [likesCountMap, setLikesCountMap] = useState({});
  const [userLikedMap, setUserLikedMap] = useState({});

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        size: pageSize,
        search: searchTerm || undefined,
        difficulty: selectedDifficulty !== 'All' ? selectedDifficulty : undefined,
        topic: selectedTopic !== 'All' ? selectedTopic : undefined,
      };

      const res = await api.get('/coding/questions', { params });
      
      // Handle Spring Data Page structure or standard API response
      if (res && res.content) {
        setQuestions(res.content);
        setTotalPages(res.totalPages || 1);
        setTotalElements(res.totalElements || res.content.length);
      } else if (Array.isArray(res)) {
        setQuestions(res);
        setTotalPages(1);
        setTotalElements(res.length);
      } else if (res && res.data) {
        const dataArr = Array.isArray(res.data) ? res.data : res.data.content || [];
        setQuestions(dataArr);
        setTotalPages(res.data.totalPages || 1);
        setTotalElements(res.data.totalElements || dataArr.length);
      } else {
        // Fallback filtering if mock object returned
        applyFallbackData();
      }
    } catch (err) {
      console.warn('GET /api/v1/coding/questions failed or unseeded, using fallback dataset', err);
      applyFallbackData();
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchTerm, selectedDifficulty, selectedTopic]);

  const applyFallbackData = () => {
    let list = [...FALLBACK_QUESTIONS];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.topic.toLowerCase().includes(q)
      );
    }

    if (selectedDifficulty !== 'All') {
      list = list.filter((item) => item.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());
    }

    if (selectedTopic !== 'All') {
      list = list.filter((item) => item.topic.toLowerCase() === selectedTopic.toLowerCase());
    }

    setTotalElements(list.length);
    setTotalPages(Math.ceil(list.length / pageSize) || 1);

    const startIndex = currentPage * pageSize;
    const paginatedList = list.slice(startIndex, startIndex + pageSize);
    setQuestions(paginatedList);
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const toggleBookmark = (id, initialBookmarked) => {
    setBookmarks((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? !prev[id] : !initialBookmarked,
    }));
  };

  const toggleLike = (id, initialLikes, initialLiked) => {
    setUserLikedMap((prevLiked) => {
      const isCurrentlyLiked = prevLiked[id] !== undefined ? prevLiked[id] : initialLiked;
      const nextLiked = !isCurrentlyLiked;

      setLikesCountMap((prevCount) => {
        const currentCount = prevCount[id] !== undefined ? prevCount[id] : initialLikes;
        return {
          ...prevCount,
          [id]: nextLiked ? currentCount + 1 : Math.max(0, currentCount - 1),
        };
      });

      return {
        ...prevLiked,
        [id]: nextLiked,
      };
    });
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/40 p-6 md:p-8 shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
              <Code className="h-3.5 w-3.5" />
              <span>Algorithmic Repository</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Question Bank
            </h1>
            <p className="text-sm text-slate-300">
              Explore curations of coding problems categorized by topic, difficulty, and company frequency.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 backdrop-blur-md">
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Total Questions</span>
                <div className="text-2xl font-bold text-white">{totalElements}</div>
              </div>
              <div className="p-3 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
            <a
              href="https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-900/50 px-4 py-3.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-all cursor-pointer text-xs"
            >
              <span>Study DSA on GFG</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Search & Filters Controls */}
      <div className="glass-card p-6 rounded-xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Bar */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by question title, description, or keyword..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="md:col-span-3">
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value);
                  setCurrentPage(0);
                }}
                className="w-full appearance-none px-4 py-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
              >
                {DIFFICULTY_OPTIONS.map((d) => (
                  <option key={d} value={d} className="bg-slate-900 text-slate-200">
                    Difficulty: {d}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Topic Filter */}
          <div className="md:col-span-3">
            <div className="relative">
              <select
                value={selectedTopic}
                onChange={(e) => {
                  setSelectedTopic(e.target.value);
                  setCurrentPage(0);
                }}
                className="w-full appearance-none px-4 py-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
              >
                {TOPIC_OPTIONS.map((t) => (
                  <option key={t} value={t} className="bg-slate-900 text-slate-200">
                    Topic: {t}
                  </option>
                ))}
              </select>
              <Tag className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Quick Tags row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 font-medium mr-1">Popular Topics:</span>
          {TOPIC_OPTIONS.filter((t) => t !== 'All').map((topic) => (
            <button
              key={topic}
              onClick={() => {
                setSelectedTopic(topic === selectedTopic ? 'All' : topic);
                setCurrentPage(0);
              }}
              className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                selectedTopic === topic
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="glass-card rounded-xl border border-slate-800 overflow-hidden shadow-lg">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400 mb-3" />
            <p className="text-sm">Fetching questions dataset...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <Code className="h-10 w-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-semibold text-slate-300">No Questions Match Your Filters</h3>
            <p className="text-xs text-slate-500">Try clearing your search query or selecting a different topic.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDifficulty('All');
                setSelectedTopic('All');
                setCurrentPage(0);
              }}
              className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-4 w-12 text-center">Save</th>
                  <th className="py-4 px-4">Title & Description</th>
                  <th className="py-4 px-4">Topic</th>
                  <th className="py-4 px-4">Difficulty</th>
                  <th className="py-4 px-4">Acceptance</th>
                  <th className="py-4 px-4 text-center">Likes</th>
                  <th className="py-4 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {questions.map((q) => {
                  const isBookmarked =
                    bookmarks[q.id] !== undefined ? bookmarks[q.id] : q.isBookmarked || false;
                  const isLiked =
                    userLikedMap[q.id] !== undefined ? userLikedMap[q.id] : q.isLiked || false;
                  const likesCount =
                    likesCountMap[q.id] !== undefined ? likesCountMap[q.id] : q.likes || 0;

                  return (
                    <tr
                      key={q.id}
                      className="hover:bg-slate-900/50 transition-colors group"
                    >
                      {/* Bookmark toggle */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => toggleBookmark(q.id, q.isBookmarked)}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${
                              isBookmarked ? 'fill-amber-400 text-amber-400' : ''
                            }`}
                          />
                        </button>
                      </td>

                      {/* Title & Description */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            {q.gfgUrl ? (
                              <a
                                href={q.gfgUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-slate-100 hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                              >
                                <span>{q.title}</span>
                              </a>
                            ) : (
                              <Link
                                to={`/coding/${q.id}`}
                                className="font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5"
                              >
                                <span>{q.title}</span>
                              </Link>
                            )}
                            {q.gfgUrl && (
                              <span
                                className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-[10px] font-bold text-emerald-400 border border-emerald-900/50 inline-flex items-center gap-0.5"
                              >
                                GFG
                                <ExternalLink className="h-2.5 w-2.5" />
                              </span>
                            )}
                          </div>
                          {q.description && (
                            <p className="text-xs text-slate-400 line-clamp-1">
                              {q.description}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Topic Tag */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300">
                          <Tag className="h-3 w-3 text-slate-500" />
                          <span>{q.topic || 'General'}</span>
                        </span>
                      </td>

                      {/* Difficulty Badge */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold border ${getDifficultyBadge(
                            q.difficulty || 'Easy'
                          )}`}
                        >
                          {q.difficulty || 'Easy'}
                        </span>
                      </td>

                      {/* Acceptance Rate */}
                      <td className="py-4 px-4 text-xs font-mono text-slate-400">
                        {q.acceptanceRate || '52.0%'}
                      </td>

                      {/* Likes column */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => toggleLike(q.id, q.likes || 0, q.isLiked)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                            isLiked
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
                          }`}
                        >
                          <Heart
                            className={`h-3.5 w-3.5 ${
                              isLiked ? 'fill-rose-400 text-rose-400' : ''
                            }`}
                          />
                          <span>{likesCount}</span>
                        </button>
                      </td>

                      {/* Open GFG Link / Solving Platform */}
                      <td className="py-4 px-4 text-right">
                        {q.gfgUrl ? (
                          <a
                            href={q.gfgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                          >
                            <span>Solve on GFG</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <button
                            onClick={() => navigate(`/coding/${q.id}`)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-md shadow-indigo-600/20"
                          >
                            <span>Solve</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer / Pagination Controls */}
        <div className="py-4 px-6 border-t border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            Showing Page <span className="font-semibold text-white">{currentPage + 1}</span> of{' '}
            <span className="font-semibold text-white">{totalPages}</span> ({totalElements} total entries)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0 || loading}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 font-medium transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1 || loading}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 font-medium transition-all"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
