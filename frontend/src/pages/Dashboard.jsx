import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import StatsChart from '../components/StatsChart';
import { motion } from 'framer-motion';
import {
  FileText,
  Play,
  UploadCloud,
  Calendar,
  Trophy,
  Flame,
  Award,
  Sparkles,
  Search,
  BookOpen,
  Settings,
  ChevronRight,
  TrendingUp,
  Target
} from 'lucide-react';

const Dashboard = () => {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [stats, setStats] = useState({
    xp: 0,
    coins: 0,
    level: 1,
    streakCount: 0,
    nextLevelXpRequired: 500,
    currentLevelProgressPercentage: 0,
    badges: [],
    completedInterviewsCount: 0,
    completedCodingChallengesCount: 0,
    atsScore: 0
  });
  
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [interviewsRes, statsRes, leaderboardRes] = await Promise.all([
          api.get('/interviews'),
          api.get('/users/stats').catch(() => ({ data: stats })),
          api.get('/leaderboard').catch(() => ({ data: [] }))
        ]);

        setInterviews(interviewsRes.data || []);
        if (statsRes.data) setStats(statsRes.data);
        if (leaderboardRes.data) setLeaderboard(leaderboardRes.data);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(false);
  };

  const handleUploadResume = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      await api.post('/users/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      await refreshProfile();
      
      // reload stats to fetch new ATS Score
      const statsRes = await api.get('/users/stats');
      setStats(statsRes.data);
      
      setUploadSuccess(true);
      setFile(null);
    } catch (err) {
      alert(err || 'Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const completedCount = interviews.filter((int) => int.status === 'COMPLETED').length;
  const averageScore = interviews.reduce((acc, current) => {
    if (current.feedback?.overallScore) {
      return acc + current.feedback.overallScore;
    }
    return acc;
  }, 0) / (completedCount || 1);

  const userRank = leaderboard.find((l) => l.userId === user?.id)?.rank || '-';

  return (
    <div className="space-y-8 pb-12">
      {/* Upper Dashboard Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-900/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-1 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Level {stats.level} Student Prep Tracker</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mt-1">
              Welcome back, {user?.firstName}
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Academic placement training mock portal. Test your readiness with simulated placement sessions, ATS evaluation checks, and study tracks.
            </p>
          </div>

          {/* Gamified Streak & Rank Card */}
          <div className="flex gap-4">
            {/* Streak card */}
            <div className="glass-card flex items-center gap-3 px-5 py-3.5 rounded-xl border border-orange-500/20">
              <Flame className="h-8 w-8 text-orange-500 fill-orange-500 animate-pulse" />
              <div>
                <span className="text-xs text-slate-400 block font-medium">Daily Streak</span>
                <span className="text-xl font-bold text-white">{stats.streakCount} Days</span>
              </div>
            </div>

            {/* Global Rank card */}
            <div className="glass-card flex items-center gap-3 px-5 py-3.5 rounded-xl border border-yellow-500/20">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <span className="text-xs text-slate-400 block font-medium">Global Rank</span>
                <span className="text-xl font-bold text-white">#{userRank}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* XP Level progression bar */}
        <div className="mt-6 border-t border-indigo-900/30 pt-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>XP Progress: {stats.xp % 500} / 500 XP</span>
            <span>Level {stats.level + 1}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-indigo-500"
              style={{ width: `${stats.currentLevelProgressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main SaaS Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left column: Sidebar Shortcuts */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass-card p-6 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Features Navigation</h3>
            <div className="flex flex-col gap-2">
              <Link to="/mock-configure" className="flex items-center justify-between rounded-lg px-4 py-2.5 bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/10">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 fill-white" />
                  <span>Start Mock Interview</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>



              <Link to="/analyzer" className="flex items-center justify-between rounded-lg px-4 py-2.5 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800 transition-all">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>ATS & JD Analyzer</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </Link>

              <Link to="/learning" className="flex items-center justify-between rounded-lg px-4 py-2.5 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800 transition-all">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Learning Tracks</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </Link>

              <Link to="/company-prep" className="flex items-center justify-between rounded-lg px-4 py-2.5 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800 transition-all">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  <span>Company Roadmaps</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </Link>

              <Link to="/settings" className="flex items-center justify-between rounded-lg px-4 py-2.5 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800 transition-all">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Preferences</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </Link>
            </div>
          </div>

          {/* Quick Upload ATS resume widget */}
          <div className="glass-card p-6 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">ATS Resume Evaluation</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Current Score:</span>
                <span className="text-sm font-bold text-white">
                  {stats.atsScore > 0 ? `${stats.atsScore} / 100` : 'Not evaluated'}
                </span>
              </div>
              <input
                type="file"
                accept=".pdf"
                id="resume-dashboard-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="resume-dashboard-upload"
                className="flex w-full cursor-pointer select-none items-center justify-center gap-2 rounded-lg border border-dashed border-slate-800 bg-slate-900/30 py-3 text-center text-xs font-semibold text-slate-400 hover:bg-slate-900/50 hover:text-white transition-all"
              >
                <UploadCloud className="h-4 w-4" />
                <span>{file ? file.name : 'Select PDF Resume'}</span>
              </label>
              {file && (
                <button
                  onClick={handleUploadResume}
                  disabled={uploading}
                  className="w-full rounded-lg bg-indigo-600 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-all cursor-pointer"
                >
                  {uploading ? 'Analyzing Resume...' : 'Verify ATS Compatibility'}
                </button>
              )}
              {uploadSuccess && <span className="text-xs text-green-400 block mt-1">Uploaded! Score updated.</span>}
            </div>
          </div>
        </div>

        {/* Middle and Right columns: Stats, analytics and history logs */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Grid indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-5 rounded-xl border border-slate-800 flex items-center gap-4">
              <div className="rounded-full bg-slate-900 border border-slate-800 p-3 text-indigo-400">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Simulations Logged</span>
                <h4 className="text-2xl font-bold text-white">{interviews.length} Sessions</h4>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border border-slate-800 flex items-center gap-4">
              <div className="rounded-full bg-slate-900 border border-slate-800 p-3 text-indigo-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Avg Evaluation Score</span>
                <h4 className="text-2xl font-bold text-white">
                  {completedCount > 0 ? `${Math.round(averageScore)}%` : 'N/A'}
                </h4>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border border-slate-800 flex items-center gap-4">
              <div className="rounded-full bg-slate-900 border border-slate-800 p-3 text-indigo-400">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Earned Badges</span>
                <h4 className="text-2xl font-bold text-white">{stats.badges.length} Unlocked</h4>
              </div>
            </div>
          </div>

          {/* Performance Trend Chart */}
          <div className="glass-card p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-bold font-serif text-white mb-4">SaaS Performance Trends</h3>
            <StatsChart interviews={interviews} />
          </div>

          {/* Recent History */}
          <div className="glass-card p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-bold font-serif text-white mb-4">Recent Simulated Events</h3>
            {loading ? (
              <div className="py-4 text-center text-slate-500">Loading...</div>
            ) : interviews.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-500">No mock sessions completed yet. Configure and launch a session.</div>
            ) : (
              <div className="divide-y divide-slate-800/80">
                {interviews.map((int) => (
                  <div key={int.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                    <div>
                      <h4 className="font-semibold text-slate-200 text-sm">{int.jobTitle}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(int.createdAt).toLocaleDateString()} • {int.status}
                      </p>
                    </div>
                    {int.status === 'COMPLETED' ? (
                      <button
                        onClick={() => navigate(`/feedback/${int.id}`)}
                        className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-all cursor-pointer"
                      >
                        <span>Analyze Feedback</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/interview/${int.id}`)}
                        className="flex items-center gap-1 text-xs font-semibold text-amber-500 hover:text-amber-400 transition-all cursor-pointer"
                      >
                        <span>Resume Practice</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
