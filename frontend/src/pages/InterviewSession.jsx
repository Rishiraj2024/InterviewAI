import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  CheckCircle,
  ArrowRight,
  Loader2,
  Sparkles,
  MessageSquare,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  AlertTriangle
} from 'lucide-react';

const InterviewSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Media settings
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchSessionDetails();
  }, [id]);

  useEffect(() => {
    if (isVideoOn && !isPaused) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isVideoOn, isPaused]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [interview?.questions, evaluation]);

  // Countdown timer logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleEndInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Text-To-Speech (TTS) triggering when a question arrives
  useEffect(() => {
    if (isTtsEnabled && activeQuestion && !loading) {
      speakText(activeQuestion.questionText);
    }
  }, [activeQuestion, isTtsEnabled]);

  const fetchSessionDetails = async () => {
    try {
      const res = await api.get(`/interviews/${id}`);
      setInterview(res.data);
      
      if (res.data.status === 'COMPLETED') {
        navigate(`/feedback/${id}`);
        return;
      }

      const unanswered = res.data.questions.find((q) => !q.responseText);
      setActiveQuestion(unanswered || null);
      setEvaluation(null);
    } catch (err) {
      console.error(err);
      alert('Failed to load session');
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: isMicOn
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access blocked', err);
      setIsVideoOn(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answerText.trim() || !activeQuestion || isPaused) return;

    setSubmitting(true);
    try {
      const res = await api.post('/interviews/submit-answer', {
        questionId: activeQuestion.id,
        responseText: answerText,
      });
      setEvaluation(res.data);
      setAnswerText('');
    } catch (err) {
      alert(err || 'Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      const res = await api.post(`/interviews/${id}/next`);
      if (res.data.status === 'COMPLETED') {
        navigate(`/feedback/${id}`);
      } else {
        setInterview(res.data);
        const unanswered = res.data.questions.find((q) => !q.responseText);
        setActiveQuestion(unanswered || null);
        setEvaluation(null);
      }
    } catch (err) {
      alert(err || 'Failed to advance interview');
    } finally {
      setLoading(false);
    }
  };

  const handleEndInterview = async () => {
    if (window.confirm("Are you sure you want to end this interview session? You will receive feedback based on answered questions only.")) {
      setLoading(true);
      try {
        const res = await api.get(`/interviews/${id}`);
        // Compile feedback early using service method
        const finalizeRes = await api.post(`/interviews/${id}/next`); 
        // next request when answeredCount is checked compiles or we can let backend close it
        navigate(`/feedback/${id}`);
      } catch (err) {
        navigate('/dashboard');
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading && !interview) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
      </div>
    );
  }

  const answeredQuestions = interview?.questions.filter((q) => q.responseText) || [];
  const currentStep = answeredQuestions.length + (activeQuestion ? 1 : 0);
  const totalSteps = 5;

  return (
    <div className="space-y-6">
      {/* Session header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Live Mock Session
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white font-serif mt-1">{interview?.jobTitle}</h1>
        </div>

        {/* Action Panel Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Pause button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* End Interview early */}
          <button
            onClick={handleEndInterview}
            className="rounded-lg bg-red-950/40 border border-red-800 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-900 hover:text-white transition-all cursor-pointer"
          >
            End Session
          </button>

          {/* Time and progress indicator */}
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-lg text-sm text-slate-300">
            <span className="font-semibold text-indigo-400">{formatTime(timeRemaining)}</span>
            <span className="text-slate-600">|</span>
            <span>Q: {currentStep}/{totalSteps}</span>
          </div>
        </div>
      </div>

      {/* Main split interactive section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left: Chat history & Inputs (lg:col-span-3) */}
        <div className="lg:col-span-3 flex flex-col min-h-[50vh] rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
          
          {/* Chat dialog logs */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[400px]">
            {isPaused && (
              <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-400 text-sm">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <span>Session is currently paused. Press Resume above to continue.</span>
              </div>
            )}

            {/* Welcome message */}
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-indigo-400">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div className="rounded-2xl bg-slate-900 border border-slate-800/80 px-4 py-3 text-sm text-slate-300 max-w-[85%]">
                Hello. I am your AI evaluator. I've analyzed your parameters and will conduct a mock interview. Answer each question clearly.
              </div>
            </div>

            {/* Answered loops */}
            {answeredQuestions.map((q, idx) => (
              <div key={q.id} className="space-y-4">
                {/* Question */}
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-indigo-400">
                    <Sparkles className="h-4.5 w-4.5" />
                  </div>
                  <div className="rounded-2xl bg-slate-900 border border-slate-800/80 px-4 py-3 text-sm text-slate-200 max-w-[85%] font-medium">
                    {q.questionText}
                  </div>
                </div>

                {/* Candidate response */}
                <div className="flex gap-3 justify-end">
                  <div className="rounded-2xl bg-indigo-900/30 border border-indigo-800/40 px-4 py-3 text-sm text-slate-200 max-w-[85%]">
                    {q.responseText}
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-sm">
                    {user?.firstName[0]}
                  </div>
                </div>

                {/* Question feedback */}
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-emerald-400">
                    <CheckCircle className="h-4.5 w-4.5" />
                  </div>
                  <div className="rounded-2xl bg-emerald-950/10 border border-emerald-900/30 px-4 py-3 text-xs text-emerald-300 max-w-[85%]">
                    <span className="font-bold">Score: {q.score}/10</span>
                    <p className="mt-1">{q.evaluationFeedback}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Active Question */}
            {activeQuestion && !evaluation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-indigo-400">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <div className="rounded-2xl bg-slate-900 border border-slate-800/80 px-4 py-3 text-sm text-slate-200 max-w-[85%] font-semibold">
                  {activeQuestion.questionText}
                </div>
              </motion.div>
            )}

            {/* Latest evaluation */}
            {evaluation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex gap-3 justify-end">
                  <div className="rounded-2xl bg-indigo-900/30 border border-indigo-800/40 px-4 py-3 text-sm text-slate-200 max-w-[85%]">
                    {evaluation.responseText}
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-sm">
                    {user?.firstName[0]}
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-emerald-400">
                    <CheckCircle className="h-4.5 w-4.5" />
                  </div>
                  <div className="rounded-2xl bg-emerald-950/10 border border-emerald-900/30 px-4 py-3 text-xs text-emerald-300 max-w-[85%]">
                    <span className="font-bold">Score: {evaluation.score}/10</span>
                    <p className="mt-1">{evaluation.evaluationFeedback}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Text Area & Submit actions */}
          <div className="border-t border-slate-800 bg-slate-950/50 p-4">
            <AnimatePresence mode="wait">
              {!evaluation ? (
                <motion.form
                  key="form-input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmitAnswer}
                  className="flex items-end gap-3"
                >
                  <textarea
                    required
                    disabled={isPaused}
                    rows="3"
                    placeholder={isPaused ? "Interview is paused" : "Type your technical or scenario-based answer in detail..."}
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 resize-none transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={submitting || !answerText.trim() || isPaused}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 transition-all shrink-0 cursor-pointer"
                  >
                    {submitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="next-action"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="flex items-center justify-between p-2"
                >
                  <span className="text-xs text-slate-400">Review evaluation score above before advancing.</span>
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-all cursor-pointer"
                  >
                    <span>
                      {currentStep >= totalSteps ? 'Finalize Interview' : 'Next Question'}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Camera Preview & TTS triggers (lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Camera Card */}
          <div className="glass-card rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden relative shadow-lg">
            <div className="aspect-video w-full bg-slate-950 flex items-center justify-center relative">
              {isVideoOn && !isPaused ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-full w-full object-cover scale-x-[-1]"
                />
              ) : (
                <div className="text-center p-4">
                  <VideoOff className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                  <span className="text-xs text-slate-500 block">
                    {isPaused ? 'Interview is paused' : 'Camera is disabled'}
                  </span>
                </div>
              )}
              
              {/* Media status bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-950/80 px-3 py-1.5 rounded-lg text-xs backdrop-blur-md border border-slate-800">
                <span className="text-slate-300 font-medium">Candidate Feed</span>
                <span className="text-green-500">Live</span>
              </div>
            </div>

            {/* Media control row */}
            <div className="flex items-center justify-around p-4 border-t border-slate-800 bg-slate-950/50">
              {/* Video toggle */}
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isVideoOn
                    ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                    : 'border-red-950 bg-red-950/20 text-red-500'
                }`}
              >
                {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </button>

              {/* Mic toggle */}
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isMicOn
                    ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                    : 'border-red-950 bg-red-950/20 text-red-500'
                }`}
              >
                {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </button>

              {/* TTS Speak toggle */}
              <button
                onClick={() => setIsTtsEnabled(!isTtsEnabled)}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isTtsEnabled
                    ? 'border-slate-800 bg-slate-900 text-indigo-400 hover:bg-slate-800'
                    : 'border-slate-800 bg-slate-900 text-slate-500'
                }`}
                title="Enable Text-To-Speech"
              >
                {isTtsEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* AI Helper tip card */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>AI Interview Helper</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              When answering, make sure to mention specific projects, metrics (e.g. "improved throughput by 25%"), and walk through your decision-making structures logically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSession;
