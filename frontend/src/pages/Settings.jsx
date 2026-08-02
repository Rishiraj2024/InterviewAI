import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sun,
  Moon,
  Monitor,
  Bell,
  Download,
  Trash2,
  Save,
  Check,
  AlertTriangle,
  X,
  Shield,
  Lock,
  Mail,
  Zap,
  CheckCircle2,
  FileJson
} from 'lucide-react';

const Settings = () => {
  const { user, logout } = useAuth();

  // Dark/Light mode theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app_theme') || 'dark';
  });

  // Notification settings checkboxes
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('user_notifications');
    return saved
      ? JSON.parse(saved)
      : {
          emailReminders: true,
          weeklySummaries: true,
          achievementAlerts: false,
        };
  });

  // UI status states
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Danger zone modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Synchronize theme with localStorage and root HTML element preview
  useEffect(() => {
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSaveSuccess(false);
  };

  const handleSaveSettings = (e) => {
    e?.preventDefault();
    setIsSaving(true);
    
    // Save to localStorage / backend
    localStorage.setItem('user_notifications', JSON.stringify(notifications));
    localStorage.setItem('app_theme', theme);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }, 600);
  };

  // Export Account Data JSON
  const handleExportData = () => {
    const exportData = {
      userProfile: {
        firstName: user?.firstName || 'User',
        lastName: user?.lastName || '',
        email: user?.email || '',
        id: user?.id || null,
        resumeUrl: user?.resumeUrl || null,
      },
      settings: {
        theme,
        notifications,
      },
      exportedAt: new Date().toISOString(),
      platform: 'IntervAI Platform v1.0',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `intervai_profile_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Account Deletion
  const handleDeleteAccount = async () => {
    if (deleteConfirmationInput.trim() !== 'DELETE') return;
    
    setIsDeleting(true);
    try {
      // Simulate backend deletion trigger
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsDeleteModalOpen(false);
      logout();
    } catch (err) {
      alert('Failed to delete account. Please try again later.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-900/40 p-6 md:p-8">
        <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
          <Shield className="h-8 w-8 text-indigo-400" />
          <span>Account Settings</span>
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-xl">
          Manage your interface preferences, notification alerts, data export, and security settings.
        </p>
      </div>

      {/* Success Notification Banner */}
      {saveSuccess && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-emerald-300 backdrop-blur-md">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          <span className="text-sm font-medium">Your settings have been updated and saved successfully!</span>
        </div>
      )}

      {/* 1. Theme / Display Preferences */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <Sun className="h-5 w-5 text-amber-400" />
            <span>Appearance & Theme</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Choose your preferred color theme for the interview workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Dark Mode */}
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
              theme === 'dark'
                ? 'border-indigo-500 bg-indigo-950/50 text-white ring-2 ring-indigo-500/30'
                : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Moon className={`h-5 w-5 ${theme === 'dark' ? 'text-indigo-400' : ''}`} />
            <div className="text-left">
              <div className="text-sm font-semibold">Dark Mode</div>
              <div className="text-[11px] text-slate-400">High contrast dark canvas</div>
            </div>
          </button>

          {/* Light Mode Mock */}
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
              theme === 'light'
                ? 'border-indigo-500 bg-indigo-950/50 text-white ring-2 ring-indigo-500/30'
                : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Sun className={`h-5 w-5 ${theme === 'light' ? 'text-amber-400' : ''}`} />
            <div className="text-left">
              <div className="text-sm font-semibold">Light Mode</div>
              <div className="text-[11px] text-slate-400">Clean bright background</div>
            </div>
          </button>

          {/* System Default */}
          <button
            type="button"
            onClick={() => setTheme('system')}
            className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
              theme === 'system'
                ? 'border-indigo-500 bg-indigo-950/50 text-white ring-2 ring-indigo-500/30'
                : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Monitor className={`h-5 w-5 ${theme === 'system' ? 'text-indigo-400' : ''}`} />
            <div className="text-left">
              <div className="text-sm font-semibold">System Default</div>
              <div className="text-[11px] text-slate-400">Sync with device OS</div>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Notification Preferences */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <Bell className="h-5 w-5 text-indigo-400" />
            <span>Notification Preferences</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure how and when you receive reminders, reports, and platform alerts.
          </p>
        </div>

        <div className="space-y-4 divide-y divide-slate-800/60">
          {/* Email Reminders */}
          <div className="flex items-center justify-between pt-4 first:pt-0">
            <div className="space-y-0.5">
              <label htmlFor="emailReminders" className="text-sm font-semibold text-slate-200 flex items-center gap-2 cursor-pointer">
                <Mail className="h-4 w-4 text-indigo-400" />
                <span>Email Reminders</span>
              </label>
              <p className="text-xs text-slate-400">Receive email alerts for scheduled mock interview sessions and practice goals.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                id="emailReminders"
                type="checkbox"
                checked={notifications.emailReminders}
                onChange={() => handleNotificationToggle('emailReminders')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Weekly Summaries */}
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <label htmlFor="weeklySummaries" className="text-sm font-semibold text-slate-200 flex items-center gap-2 cursor-pointer">
                <Zap className="h-4 w-4 text-amber-400" />
                <span>Weekly Summaries</span>
              </label>
              <p className="text-xs text-slate-400">Get a weekly email digest summarizing your progress, XP earned, and areas for improvement.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                id="weeklySummaries"
                type="checkbox"
                checked={notifications.weeklySummaries}
                onChange={() => handleNotificationToggle('weeklySummaries')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Achievement Alerts */}
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <label htmlFor="achievementAlerts" className="text-sm font-semibold text-slate-200 flex items-center gap-2 cursor-pointer">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>Achievement Alerts</span>
              </label>
              <p className="text-xs text-slate-400">Instant notifications when you unlock new badges, complete milestones, or level up.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                id="achievementAlerts"
                type="checkbox"
                checked={notifications.achievementAlerts}
                onChange={() => handleNotificationToggle('achievementAlerts')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* 3. Account Data Export */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <Download className="h-5 w-5 text-indigo-400" />
            <span>Account Export Options</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Download a full copy of your personal data, settings, and interview transcripts in JSON format.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-indigo-950/80 p-2.5 text-indigo-400 border border-indigo-900/50">
              <FileJson className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Profile & Settings Data</h3>
              <p className="text-xs text-slate-400">Includes user info, settings preferences, and saved metadata.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportData}
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-semibold text-indigo-300 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download Profile Data JSON</span>
          </button>
        </div>
      </div>

      {/* Save Settings Action Button Bar */}
      <div className="flex items-center justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 transition-all cursor-pointer"
        >
          {isSaving ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>

      {/* 4. Danger Zone */}
      <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold font-serif text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <span>Danger Zone</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Irreversible actions regarding your account and stored interview data.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-red-950/30 border border-red-900/50">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Delete Account</h3>
            <p className="text-xs text-slate-400 max-w-md">
              Permanently remove your account, profile, resume, and all interview records. This action cannot be undone.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setDeleteConfirmationInput('');
              setIsDeleteModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-red-600/80 px-4 py-2.5 text-xs font-semibold text-white hover:bg-red-600 transition-all cursor-pointer shrink-0"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-red-900/60 bg-slate-900 p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-red-400">
                <div className="rounded-full bg-red-950 p-2 border border-red-900/60">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white">Delete Account?</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              This will <strong className="text-red-400 font-semibold">permanently delete</strong> your profile, history, achievements, and custom configurations. Please type <span className="font-mono bg-slate-800 text-red-400 px-2 py-0.5 rounded text-xs">DELETE</span> below to confirm.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Type "DELETE" to confirm
              </label>
              <input
                type="text"
                placeholder="DELETE"
                value={deleteConfirmationInput}
                onChange={(e) => setDeleteConfirmationInput(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-red-500 transition-all"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-xl border border-slate-800 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmationInput.trim() !== 'DELETE' || isDeleting}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 transition-all cursor-pointer"
              >
                {isDeleting ? (
                  <span>Deleting...</span>
                ) : (
                  <>
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Permanently Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
