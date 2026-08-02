import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  User,
  Mail,
  Github,
  Linkedin,
  Trophy,
  Award,
  Zap,
  Coins,
  Star,
  GraduationCap,
  Plus,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Code,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Briefcase
} from 'lucide-react';

const Profile = () => {
  const { user, refreshProfile } = useAuth();

  // Social handles state
  const [githubUrl, setGithubUrl] = useState(user?.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedinUrl || '');
  const [savingSocials, setSavingSocials] = useState(false);
  const [socialSuccess, setSocialSuccess] = useState(false);
  const [socialError, setSocialError] = useState('');

  // User Stats state
  const [stats, setStats] = useState({
    xp: 2450,
    level: 5,
    levelTitle: 'Senior Code Practitioner',
    coins: 350,
    badges: [
      {
        id: 1,
        title: 'First Code Step',
        description: 'Completed your first AI technical interview session.',
        icon: 'Trophy',
        unlocked: true,
        date: '2026-06-15',
        category: 'Milestone',
      },
      {
        id: 2,
        title: 'Algorithm Veteran',
        description: 'Scored 90%+ overall on Data Structures track.',
        icon: 'Award',
        unlocked: true,
        date: '2026-07-02',
        category: 'Performance',
      },
      {
        id: 3,
        title: '5-Day Streak',
        description: 'Practiced mock interviews 5 consecutive days.',
        icon: 'Zap',
        unlocked: true,
        date: '2026-07-20',
        category: 'Streak',
      },
      {
        id: 4,
        title: 'System Architect',
        description: 'Successfully completed System Design scenario.',
        icon: 'Star',
        unlocked: false,
        date: null,
        category: 'Expertise',
      },
    ],
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Skills Cloud State
  const [skills, setSkills] = useState([
    'Java',
    'Spring Boot',
    'React',
    'SQL',
    'TypeScript',
    'Node.js',
    'Docker',
    'System Design',
    'REST APIs',
    'Microservices',
  ]);
  const [newSkill, setNewSkill] = useState('');

  // Education Listings State
  const [education, setEducation] = useState([
    {
      id: 1,
      degree: 'B.S. in Computer Science & Engineering',
      institution: 'State University of Technology',
      year: '2020 - 2024',
      details: 'Specialization in Software Architecture & Distributed Systems. GPA: 3.8/4.0',
    },
  ]);
  const [isAddingEdu, setIsAddingEdu] = useState(false);
  const [eduForm, setEduForm] = useState({ degree: '', institution: '', year: '', details: '' });

  // Certifications Listings State
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services (AWS)',
      issueDate: 'Jan 2025',
      credentialId: 'AWS-987654321',
    },
    {
      id: 2,
      title: 'Oracle Certified Professional: Java SE 17 Developer',
      issuer: 'Oracle Corporation',
      issueDate: 'Nov 2024',
      credentialId: 'OCP-17-449102',
    },
  ]);
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [certForm, setCertForm] = useState({ title: '', issuer: '', issueDate: '', credentialId: '' });

  // Fetch stats from GET /api/v1/users/stats
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await api.get('/users/stats');
        if (res && (res.xp !== undefined || res.data?.xp !== undefined)) {
          const statsData = res.data || res;
          setStats((prev) => ({
            ...prev,
            ...statsData,
            badges: statsData.badges || prev.badges,
          }));
        }
      } catch (err) {
        console.log('Using default mock stats for display', err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchUserStats();
  }, []);

  // Synchronize initial social links from user prop
  useEffect(() => {
    if (user) {
      if (user.githubUrl) setGithubUrl(user.githubUrl);
      if (user.linkedinUrl) setLinkedinUrl(user.linkedinUrl);
    }
  }, [user]);

  // PUT /api/v1/users/social?githubUrl=...&linkedinUrl=...
  const handleSaveSocials = async (e) => {
    e.preventDefault();
    setSavingSocials(true);
    setSocialSuccess(false);
    setSocialError('');

    try {
      const queryParams = new URLSearchParams();
      if (githubUrl) queryParams.append('githubUrl', githubUrl);
      if (linkedinUrl) queryParams.append('linkedinUrl', linkedinUrl);

      await api.put(`/users/social?${queryParams.toString()}`);

      await refreshProfile();
      setSocialSuccess(true);
      setTimeout(() => setSocialSuccess(false), 4000);
    } catch (err) {
      setSocialError(typeof err === 'string' ? err : 'Failed to update social links.');
    } finally {
      setSavingSocials(false);
    }
  };

  // Add & remove skills
  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Add Education
  const handleAddEducation = (e) => {
    e.preventDefault();
    if (!eduForm.degree || !eduForm.institution) return;
    setEducation([
      ...education,
      {
        id: Date.now(),
        ...eduForm,
      },
    ]);
    setEduForm({ degree: '', institution: '', year: '', details: '' });
    setIsAddingEdu(false);
  };

  const handleRemoveEducation = (id) => {
    setEducation(education.filter((item) => item.id !== id));
  };

  // Add Certification
  const handleAddCertification = (e) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer) return;
    setCertifications([
      ...certifications,
      {
        id: Date.now(),
        ...certForm,
      },
    ]);
    setCertForm({ title: '', issuer: '', issueDate: '', credentialId: '' });
    setIsAddingCert(false);
  };

  const handleRemoveCertification = (id) => {
    setCertifications(certifications.filter((item) => item.id !== id));
  };

  const userFirstName = user?.firstName || 'Developer';
  const userLastName = user?.lastName || 'User';
  const userEmail = user?.email || 'user@example.com';
  const userInitials = `${userFirstName[0] || ''}${userLastName[0] || ''}`.toUpperCase() || 'U';

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Profile Header / Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-900/40 p-6 md:p-8">
        <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
          <User className="h-8 w-8 text-indigo-400" />
          <span>User Profile</span>
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-xl">
          View your interview achievements, update social accounts, manage skills cloud, and keep your educational profile up to date.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar Profile Card + Social Handles */}
        <div className="space-y-6">
          {/* Avatar Profile Card */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-serif font-bold text-white shadow-xl shadow-indigo-600/30 border-2 border-indigo-400/40">
                {userInitials}
              </div>
              <div className="absolute bottom-0 right-0 rounded-full bg-emerald-500 p-1.5 ring-4 ring-slate-950">
                <CheckCircle2 className="h-3.5 w-3.5 text-slate-950" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold font-serif text-white">
                {userFirstName} {userLastName}
              </h2>
              <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <Mail className="h-3.5 w-3.5 text-indigo-400" />
                <span>{userEmail}</span>
              </div>
            </div>

            {/* Quick Level Badge */}
            <div className="w-full pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
              <span className="text-slate-400">Account Role</span>
              <span className="rounded-full bg-indigo-950 border border-indigo-800/60 px-3 py-1 font-semibold text-indigo-300">
                Candidate Member
              </span>
            </div>
          </div>

          {/* Social Handles Card */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
              <Code className="h-5 w-5 text-indigo-400" />
              <span>Social Profiles</span>
            </h3>
            <p className="text-xs text-slate-400">
              Connect your GitHub and LinkedIn profiles for richer AI interviewer evaluation.
            </p>

            {socialSuccess && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 p-3 text-xs text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Social links updated successfully!</span>
              </div>
            )}

            {socialError && (
              <div className="flex items-center gap-2 rounded-lg bg-red-950/60 border border-red-500/40 p-3 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{socialError}</span>
              </div>
            )}

            <form onSubmit={handleSaveSocials} className="space-y-4">
              {/* GitHub Handle */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Github className="h-3.5 w-3.5 text-slate-200" />
                  <span>GitHub Profile URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              {/* LinkedIn Handle */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Linkedin className="h-3.5 w-3.5 text-blue-400" />
                  <span>LinkedIn Profile URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={savingSocials}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 transition-all cursor-pointer shadow-md shadow-indigo-600/20"
              >
                {savingSocials ? (
                  <span>Saving Handles...</span>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Social Handles</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (2 spans): Stats & Badges, Skills Cloud, Education & Certifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Achievements & Earned Badges (Stats from GET /api/v1/users/stats) */}
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-amber-400" />
                  <span>Gamification Stats & Badges</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Track your experience level, accumulated XP, tokens, and earned platform badges.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-amber-400 font-semibold">
                <Coins className="h-4 w-4" />
                <span>{stats.coins} Platform Coins</span>
              </div>
            </div>

            {/* Stats Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Level Card */}
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Level Status</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">Lvl {stats.level}</span>
                  <span className="text-xs text-indigo-400 font-medium truncate">{stats.levelTitle}</span>
                </div>
              </div>

              {/* XP Progress Card */}
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 sm:col-span-2 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-400 uppercase tracking-wider">Total Experience</span>
                  <span className="text-indigo-400 font-semibold">{stats.xp} XP</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((stats.xp % 1000) / 10, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Current Level</span>
                  <span>{(Math.floor(stats.xp / 1000) + 1) * 1000} XP Next Level</span>
                </div>
              </div>
            </div>

            {/* Badges Grid */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Earned Badges</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all ${
                      badge.unlocked
                        ? 'bg-slate-900/80 border-indigo-900/60 hover:border-indigo-700/60'
                        : 'bg-slate-950/40 border-slate-800/40 opacity-50'
                    }`}
                  >
                    <div
                      className={`rounded-xl p-3 border shrink-0 ${
                        badge.unlocked
                          ? 'bg-indigo-950/80 border-indigo-800/60 text-amber-400'
                          : 'bg-slate-900 border-slate-800 text-slate-600'
                      }`}
                    >
                      {badge.icon === 'Trophy' && <Trophy className="h-5 w-5" />}
                      {badge.icon === 'Award' && <Award className="h-5 w-5" />}
                      {badge.icon === 'Zap' && <Zap className="h-5 w-5" />}
                      {badge.icon === 'Star' && <Star className="h-5 w-5" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-sm font-semibold text-slate-200">{badge.title}</h5>
                        {badge.unlocked && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full font-medium">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{badge.description}</p>
                      {badge.date && (
                        <p className="text-[10px] text-slate-500 pt-0.5">Unlocked on {badge.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Tag Cloud */}
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div>
              <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-indigo-400" />
                <span>Skills & Competencies Cloud</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Add or manage technical skills evaluated during mock interviews.
              </p>
            </div>

            {/* Tag Cloud Display */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:border-indigo-500/50 transition-all group"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add New Skill Input */}
            <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add custom skill (e.g. System Design, GraphQL, Go)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 transition-all"
              />
              <button
                type="submit"
                disabled={!newSkill.trim()}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 transition-all cursor-pointer shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Skill</span>
              </button>
            </form>
          </div>

          {/* Education & Certifications */}
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
            {/* Education Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-400" />
                  <span>Education</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddingEdu(!isAddingEdu)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{isAddingEdu ? 'Cancel' : 'Add Education'}</span>
                </button>
              </div>

              {/* Add Education Form */}
              {isAddingEdu && (
                <form onSubmit={handleAddEducation} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Degree / Diploma Title *"
                      required
                      value={eduForm.degree}
                      onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="University / Institution *"
                      required
                      value={eduForm.institution}
                      onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Year (e.g. 2020 - 2024)"
                      value={eduForm.year}
                      onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Additional details / GPA"
                      value={eduForm.details}
                      onChange={(e) => setEduForm({ ...eduForm, details: e.target.value })}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="submit"
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
                    >
                      Save Education
                    </button>
                  </div>
                </form>
              )}

              {/* Education List */}
              <div className="space-y-3">
                {education.map((item) => (
                  <div key={item.id} className="flex items-start justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-slate-200">{item.degree}</h4>
                      <p className="text-xs text-slate-400">{item.institution} • {item.year}</p>
                      {item.details && <p className="text-xs text-slate-500">{item.details}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveEducation(item.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-6 space-y-4">
              {/* Certifications Section */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-indigo-400" />
                  <span>Professional Certifications</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddingCert(!isAddingCert)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{isAddingCert ? 'Cancel' : 'Add Certification'}</span>
                </button>
              </div>

              {/* Add Certification Form */}
              {isAddingCert && (
                <form onSubmit={handleAddCertification} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Certification Title *"
                      required
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Issuing Organization *"
                      required
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Issue Date (e.g. Jan 2025)"
                      value={certForm.issueDate}
                      onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Credential ID / License #"
                      value={certForm.credentialId}
                      onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="submit"
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
                    >
                      Save Certification
                    </button>
                  </div>
                </form>
              )}

              {/* Certifications List */}
              <div className="space-y-3">
                {certifications.map((item) => (
                  <div key={item.id} className="flex items-start justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                      <p className="text-xs text-slate-400">{item.issuer} • {item.issueDate}</p>
                      {item.credentialId && (
                        <p className="text-xs font-mono text-slate-500">ID: {item.credentialId}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(item.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
