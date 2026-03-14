"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Globe,
  Palette,
  Cpu,
  Wrench,
  Building2,
  Film,
  Bot,
  Lightbulb,
  Ruler,
  Menu,
  X,
  Clock,
  CheckCircle,
  Trophy,
  Calendar,
  Target,
} from "lucide-react";

interface Subject {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  topics: string[];
  examBoard?: string;
}

const subjects: Subject[] = [
  {
    id: "maths",
    name: "Maths",
    icon: <Calculator className="w-5 h-5" />,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    description: "Numbers, algebra, geometry, and problem solving",
    examBoard: "Edexcel",
    topics: ["Number - Fractions, Decimals, Percentages", "Algebra - Equations, Graphs, Sequences", "Geometry - Shapes, Angles, Transformations", "Statistics - Data, Probability", "Ratio and Proportion"],
  },
  {
    id: "english",
    name: "English",
    icon: <BookOpen className="w-5 h-5" />,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    description: "Literature, language, and communication skills",
    examBoard: "AQA",
    topics: ["Romeo and Juliet / Shakespeare", "Modern Text (An Inspector Calls)", "Poetry Anthology", "Unseen Poetry", "Creative Writing", "Language Analysis"],
  },
  {
    id: "science",
    name: "Science",
    icon: <FlaskConical className="w-5 h-5" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    description: "Biology, Chemistry, and Physics combined",
    examBoard: "AQA",
    topics: ["Biology - Cells, Organ Systems, Genetics", "Chemistry - Atomic Structure, Reactions", "Physics - Forces, Energy, Waves", "Required Practicals"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: <Lightbulb className="w-5 h-5" />,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    description: "Business skills, entrepreneurship, and marketing",
    topics: ["Business Planning", "Marketing and Promotion", "Finance and Budgeting", "Customer Service", "Enterprise Skills"],
  },
  {
    id: "geography",
    name: "Geography",
    icon: <Globe className="w-5 h-5" />,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    description: "Physical and human geography of our world",
    examBoard: "AQA",
    topics: ["Natural Hazards - Earthquakes, Volcanoes", "Living World - Ecosystems, Rainforests", "Urban Issues and Challenges", "Resource Management", "Fieldwork Skills"],
  },
  {
    id: "dt",
    name: "DT",
    icon: <Ruler className="w-5 h-5" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    description: "Design thinking and practical making skills",
    topics: ["Design Process", "Materials and Manufacturing", "CAD/CAM", "Sustainability in Design", "NEA (Coursework)"],
  },
  {
    id: "computerscience",
    name: "Computer Science",
    icon: <Cpu className="w-5 h-5" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    description: "Programming, algorithms, and computer systems",
    examBoard: "OCR",
    topics: ["Programming in Python", "Algorithms and Problem Solving", "Computer Systems", "Data Representation", "Networks and Security"],
  },
  {
    id: "engineering",
    name: "Engineering",
    icon: <Wrench className="w-5 h-5" />,
    color: "text-slate-600",
    bgColor: "bg-slate-200",
    description: "Practical engineering principles and processes",
    topics: ["Engineering Materials", "Manufacturing Processes", "Engineering Drawing", "Quality Control", "Health and Safety"],
  },
  {
    id: "builtenvironment",
    name: "Built Environment",
    icon: <Building2 className="w-5 h-5" />,
    color: "text-stone-600",
    bgColor: "bg-stone-200",
    description: "Construction, architecture, and the built world",
    topics: ["Construction Methods", "Sustainable Building", "Planning and Design", "Building Regulations", "Site Safety"],
  },
  {
    id: "art",
    name: "Art & Design",
    icon: <Palette className="w-5 h-5" />,
    color: "text-rose-500",
    bgColor: "bg-rose-100",
    description: "Creative expression through various media",
    topics: ["Drawing and Sketching", "Painting Techniques", "3D Work and Sculpture", "Artist Research", "Portfolio Development"],
  },
  {
    id: "digitalmedia",
    name: "Digital Media",
    icon: <Film className="w-5 h-5" />,
    color: "text-violet-600",
    bgColor: "bg-violet-100",
    description: "Media production, editing, and digital content",
    topics: ["Video Production", "Image Editing", "Sound Design", "Interactive Media", "Media Analysis"],
  },
  {
    id: "mechatronics",
    name: "Mechatronics & Robotics",
    icon: <Bot className="w-5 h-5" />,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
    description: "Combining mechanical, electronic, and software systems",
    topics: ["Robotics Fundamentals", "Electronics and Circuits", "Programming Controllers", "Sensors and Actuators", "Robot Building Projects"],
  },
];

const studyTips = [
  { title: "Pomodoro Technique", description: "Study for 25 minutes, then take a 5-minute break. Repeat 4 times.", icon: <Clock className="w-6 h-6 text-pink-500" /> },
  { title: "Active Recall", description: "Test yourself without looking at notes. This strengthens memory.", icon: <Target className="w-6 h-6 text-blue-600" /> },
  { title: "Spaced Repetition", description: "Review material at increasing intervals for long-term memory.", icon: <Calendar className="w-6 h-6 text-amber-500" /> },
  { title: "Practice Papers", description: "Do past exam papers under timed conditions to build confidence.", icon: <CheckCircle className="w-6 h-6 text-emerald-500" /> },
];

const quotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Don't watch the clock; do what it does. Keep going.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
];

export default function RevisionHelper() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [studyStreak, setStudyStreak] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("completedTopics");
    if (saved) setCompletedTopics(JSON.parse(saved));
    const streak = localStorage.getItem("studyStreak");
    if (streak) setStudyStreak(parseInt(streak));
    setQuoteIndex(Math.floor(Math.random() * quotes.length));
  }, []);

  useEffect(() => {
    localStorage.setItem("completedTopics", JSON.stringify(completedTopics));
  }, [completedTopics]);

  const toggleTopic = (topic: string) => {
    setCompletedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const progress = selectedSubject
    ? Math.round((completedTopics.filter((t) => selectedSubject.topics.includes(t)).length / selectedSubject.topics.length) * 100)
    : 0;

  const totalProgress = Math.round((completedTopics.length / subjects.reduce((acc, s) => acc + s.topics.length, 0)) * 100);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md border border-gray-200"
      >
        {sidebarOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">StudyHub</h1>
              <p className="text-xs text-slate-400">Year 10 Revision</p>
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-white" />
              <span className="text-xs font-medium text-pink-100">Study Streak</span>
            </div>
            <p className="text-2xl font-bold text-white">{studyStreak} days</p>
            <p className="text-xs text-pink-100 mt-1">Keep it going! 🔥</p>
          </div>

          {/* Subject List */}
          <nav>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 px-2">Subjects</p>
            <div className="space-y-1">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => { setSelectedSubject(subject); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                    selectedSubject?.id === subject.id
                      ? "bg-pink-500 text-white"
                      : "hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <span className={`p-1.5 rounded-md ${selectedSubject?.id === subject.id ? "bg-white/20" : subject.bgColor}`}>
                    <span className={selectedSubject?.id === subject.id ? "text-white" : subject.color}>
                      {subject.icon}
                    </span>
                  </span>
                  <span className="text-sm font-medium">{subject.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="lg:ml-0 ml-12">
              <h2 className="text-xl font-bold text-slate-900">{selectedSubject ? selectedSubject.name : "Dashboard"}</h2>
              <p className="text-sm text-slate-500">
                {selectedSubject ? selectedSubject.description : "Track your revision progress"}
              </p>
            </div>
            {selectedSubject?.examBoard && (
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                {selectedSubject.examBoard}
              </span>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-8">
          {selectedSubject ? (
            <div className="max-w-3xl mx-auto">
              {/* Progress */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900">Your Progress</h3>
                  <span className="text-3xl font-bold text-pink-500">{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-sm text-slate-500">
                  {completedTopics.filter((t) => selectedSubject.topics.includes(t)).length} of {selectedSubject.topics.length} topics completed
                </p>
              </div>

              {/* Topics */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="font-semibold text-slate-900">Topics</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {selectedSubject.topics.map((topic, index) => {
                    const isCompleted = completedTopics.includes(topic);
                    return (
                      <div key={index} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                        <button
                          onClick={() => toggleTopic(topic)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isCompleted ? "bg-pink-500 border-pink-500" : "border-gray-300 hover:border-pink-400"
                          }`}
                        >
                          {isCompleted && <CheckCircle className="w-4 h-4 text-white" />}
                        </button>
                        <span className={`flex-1 text-sm ${isCompleted ? "line-through text-gray-400" : "text-slate-700"}`}>
                          {topic}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setCompletedTopics([...completedTopics, ...selectedSubject.topics.filter((t) => !completedTopics.includes(t))])}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
                >
                  Mark All Complete
                </button>
                <button
                  onClick={() => setCompletedTopics(completedTopics.filter((t) => !selectedSubject.topics.includes(t)))}
                  className="flex-1 bg-white hover:bg-gray-50 text-slate-700 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm border border-gray-200"
                >
                  Reset
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              {/* Welcome */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white mb-6">
                <h3 className="text-2xl font-bold mb-2">Hello! 👋</h3>
                <p className="text-slate-300 mb-4 max-w-xl">{quotes[quoteIndex]}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/10 px-3 py-1.5 rounded-full text-xs">📚 {subjects.length} Subjects</span>
                  <span className="bg-white/10 px-3 py-1.5 rounded-full text-xs">🎯 GCSE Ready</span>
                  <span className="bg-white/10 px-3 py-1.5 rounded-full text-xs">{totalProgress}% Complete</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-2xl font-bold text-slate-900">{subjects.length}</p>
                  <p className="text-xs text-slate-500">Subjects</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-2xl font-bold text-pink-500">{completedTopics.length}</p>
                  <p className="text-xs text-slate-500">Topics Done</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-2xl font-bold text-amber-500">{studyStreak}</p>
                  <p className="text-xs text-slate-500">Day Streak</p>
                </div>
              </div>

              {/* Tips */}
              <h3 className="text-lg font-bold text-slate-900 mb-4">Study Tips</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {studyTips.map((tip, index) => (
                  <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="mb-3">{tip.icon}</div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">{tip.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{tip.description}</p>
                  </div>
                ))}
              </div>

              {/* Subjects Grid */}
              <h3 className="text-lg font-bold text-slate-900 mb-4">Your Subjects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject) => {
                  const subjectProgress = Math.round((completedTopics.filter((t) => subject.topics.includes(t)).length / subject.topics.length) * 100);
                  return (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject)}
                      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-pink-200 transition-all text-left group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`w-10 h-10 rounded-lg ${subject.bgColor} flex items-center justify-center ${subject.color}`}>
                          {subject.icon}
                        </span>
                        {subjectProgress > 0 && (
                          <span className="text-xs font-medium text-pink-500">{subjectProgress}%</span>
                        )}
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">{subject.name}</h4>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-1">{subject.description}</p>
                      {subjectProgress > 0 && (
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-pink-500 h-1.5 rounded-full transition-all" style={{ width: `${subjectProgress}%` }} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
