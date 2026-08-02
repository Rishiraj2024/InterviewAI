import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import {
  Check,
  AlertTriangle,
  ArrowLeft,
  Trophy,
  Lightbulb,
  FileText,
  Printer,
  Compass
} from 'lucide-react';

const FeedbackReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/interviews/${id}`);
        setInterview(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load feedback report');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="text-sm text-slate-500">Compiling your comprehensive report...</span>
      </div>
    );
  }

  const feedback = interview?.feedback;
  if (!feedback) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-slate-300">No feedback compiled for this session.</h3>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const strengthsList = feedback.strengths ? feedback.strengths.split(',').map((s) => s.trim()) : [];
  const weaknessesList = feedback.weaknesses ? feedback.weaknesses.split(',').map((w) => w.trim()) : [];

  return (
    <div className="space-y-8 pb-12 print:bg-white print:text-black">
      {/* Upper Navigation Row */}
      <div className="flex items-center justify-between gap-4 print:hidden">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Dashboard</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
        >
          <Printer className="h-4 w-4" />
          <span>Print / Save PDF Report</span>
        </button>
      </div>

      {/* Main Score Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900/50 to-indigo-950/70 border border-indigo-900/40 p-8 flex flex-col md:flex-row items-center justify-between gap-6 print:border-black print:bg-none print:text-black">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 print:text-black">
            AI Interview Evaluation
          </span>
          <h1 className="text-3xl font-bold font-serif text-white mt-1 print:text-black">
            {interview.jobTitle} Report
          </h1>
          <p className="mt-2 text-sm text-slate-400 print:text-black">
            Completed on {new Date(interview.completedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Dial Score wrapper */}
        <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl print:border-black print:text-black">
          <Trophy className="h-10 w-10 text-yellow-500 shrink-0" />
          <div>
            <span className="text-xs font-semibold text-slate-400 print:text-black">Final Evaluation Score</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white print:text-black">{feedback.overallScore}</span>
              <span className="text-slate-500 text-sm">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: detailed analysis and improvement roadmaps */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-slate-800 print:border-black print:text-black">
            <h3 className="text-lg font-bold font-serif text-white mb-4 print:text-black">Narrative Summary</h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line print:text-black">
              {feedback.detailedAnalysis}
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl border border-slate-800 print:border-black print:text-black">
            <h3 className="text-lg font-bold font-serif text-white mb-4 flex items-center gap-2 print:text-black">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <span>Study Recommendations</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed print:text-black">
              {feedback.recommendations}
            </p>
          </div>
        </div>

        {/* Right: strengths, weaknesses */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl border border-slate-800 print:border-black print:text-black">
            <h3 className="text-lg font-bold font-serif text-white mb-4 print:text-black">Identified Strengths</h3>
            <ul className="space-y-3">
              {strengthsList.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 print:text-black">
                  <div className="rounded-full bg-indigo-950 p-1 text-indigo-400 mt-0.5 border border-indigo-900/60 print:border-black print:text-black">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6 rounded-xl border border-slate-800 print:border-black print:text-black">
            <h3 className="text-lg font-bold font-serif text-white mb-4 print:text-black">Targeted Development Areas</h3>
            <ul className="space-y-3">
              {weaknessesList.map((weak, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 print:text-black">
                  <div className="rounded-full bg-red-950 p-1 text-red-400 mt-0.5 border border-red-900/60 print:border-black print:text-black">
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </div>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Question Transcript */}
      <div className="glass-card p-6 rounded-xl border border-slate-800 print:border-black print:text-black">
        <h3 className="text-xl font-bold font-serif text-white mb-6 print:text-black">Question-by-Question Transcript</h3>
        <div className="space-y-8">
          {interview.questions.map((q, idx) => (
            <div key={q.id} className="border-b border-slate-800/80 last:border-0 pb-6 last:pb-0 space-y-3 print:border-black">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 print:text-black">
                  Question {idx + 1}
                </span>
                <span className="rounded bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs font-semibold text-emerald-400 print:border-black print:text-black">
                  Score: {q.score}/10
                </span>
              </div>
              
              <h4 className="font-semibold text-slate-200 text-sm print:text-black">{q.questionText}</h4>
              
              <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 mt-2 print:border-black print:text-black">
                <span className="text-xs font-semibold text-slate-400 block mb-1 print:text-black">Your Answer:</span>
                <p className="text-slate-300 text-sm italic print:text-black">"{q.responseText}"</p>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-400 print:text-black">
                <Check className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <p>{q.evaluationFeedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackReport;
