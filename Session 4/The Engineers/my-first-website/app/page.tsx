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
  History,
  Music,
  Heart,
  Languages,
  Sparkles,
  HelpCircle,
  ArrowLeft,
  RotateCcw,
  Brain,
  PaletteIcon,
  Play,
  Video,
  ExternalLink,
  FileText,
} from "lucide-react";

interface Topic {
  name: string;
  revisionLinks: { title: string; url: string }[];
}

interface Subject {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  topics: Topic[];
  examBoard?: string;
  yearGroup: 9 | 10 | 11;
}

interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface SubjectQuiz {
  subjectId: string;
  quizzes: Quiz[];
}

interface VideoTutorial {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  url: string;
  description: string;
}

interface SubjectVideos {
  subjectId: string;
  videos: VideoTutorial[];
}

interface MockPaper {
  id: string;
  title: string;
  examBoard: string;
  year: string;
  paper: string;
  topics: string[];
  difficulty: "Foundation" | "Higher";
  url: string;
}

interface SubjectMockPapers {
  subjectId: string;
  papers: MockPaper[];
}

interface SubjectInfo {
  subjectId: string;
  welcomeLetter: string;
  overview: string;
  whyStudy: string[];
  careerPaths: string[];
  examStructure?: string;
  topTips: string[];
  resources: { title: string; url: string }[];
}

const subjects: Subject[] = [
  // Year 9 Subjects
  {
    id: "y9-maths",
    name: "Maths",
    icon: <Calculator className="w-5 h-5" />,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    description: "Key Stage 3 Mathematics - Foundation for GCSE",
    topics: [
      { name: "Number - BIDMAS, Factors, Multiples, Primes", revisionLinks: [
        { title: "BBC Bitesize - Order of Operations", url: "https://www.bbc.co.uk/bitesize/topics/z9ywdxs" },
        { title: "BBC Bitesize - Factors and Multiples", url: "https://www.bbc.co.uk/bitesize/topics/z6fgcdm" },
        { title: "Corbettmaths - BIDMAS", url: "https://corbettmaths.com/2012/08/21/order-of-operations/" }
      ]},
      { name: "Fractions, Decimals & Percentages", revisionLinks: [
        { title: "BBC Bitesize - Fractions", url: "https://www.bbc.co.uk/bitesize/topics/zt7n8xs" },
        { title: "BBC Bitesize - Percentages", url: "https://www.bbc.co.uk/bitesize/topics/znj2xyc" },
        { title: "MathsGenie - Fractions", url: "https://www.mathsgenie.co.uk/fractions.html" }
      ]},
      { name: "Algebra - Simplifying, Solving Equations", revisionLinks: [
        { title: "BBC Bitesize - Algebra Basics", url: "https://www.bbc.co.uk/bitesize/topics/zvnycdm" },
        { title: "BBC Bitesize - Solving Equations", url: "https://www.bbc.co.uk/bitesize/topics/z6fgcdm" },
        { title: "Corbettmaths - Solving Equations", url: "https://corbettmaths.com/2012/08/21/solving-equations/" }
      ]},
      { name: "Graphs and Coordinates", revisionLinks: [
        { title: "BBC Bitesize - Coordinates", url: "https://www.bbc.co.uk/bitesize/topics/zgthvcw" },
        { title: "BBC Bitesize - Linear Graphs", url: "https://www.bbc.co.uk/bitesize/topics/z8nycdm" }
      ]},
      { name: "Geometry - Angles, Area, Perimeter", revisionLinks: [
        { title: "BBC Bitesize - Angles", url: "https://www.bbc.co.uk/bitesize/topics/zdr9wmn" },
        { title: "BBC Bitesize - Area and Perimeter", url: "https://www.bbc.co.uk/bitesize/topics/zjbg87h" }
      ]},
      { name: "Statistics - Averages, Charts, Probability", revisionLinks: [
        { title: "BBC Bitesize - Averages", url: "https://www.bbc.co.uk/bitesize/topics/zmnycdm" },
        { title: "BBC Bitesize - Probability", url: "https://www.bbc.co.uk/bitesize/topics/zvnycdm" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-english",
    name: "English",
    icon: <BookOpen className="w-5 h-5" />,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    description: "Reading, writing, and analysing texts",
    topics: [
      { name: "Novel Study - Character and Theme Analysis", revisionLinks: [
        { title: "BBC Bitesize - Analysing Fiction", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zbx3xwx" },
        { title: "BBC Bitesize - Characters", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zp9djhv" }
      ]},
      { name: "Poetry Forms and Techniques", revisionLinks: [
        { title: "BBC Bitesize - Poetry", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/z4bvk2p" },
        { title: "BBC Bitesize - Language Techniques", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/z9jgpbk" }
      ]},
      { name: "Shakespeare Introduction", revisionLinks: [
        { title: "BBC Bitesize - Shakespeare", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/z7w8wmn" },
        { title: "SparkNotes - Shakespeare", url: "https://www.sparknotes.com/shakespeare/" }
      ]},
      { name: "Creative Writing Skills", revisionLinks: [
        { title: "BBC Bitesize - Creative Writing", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zq2ycdm" },
        { title: "BBC Bitesize - Story Openings", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zwdvmsg" }
      ]},
      { name: "Non-Fiction Analysis", revisionLinks: [
        { title: "BBC Bitesize - Non-Fiction Texts", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zd4fy9q" }
      ]},
      { name: "Spelling, Punctuation & Grammar", revisionLinks: [
        { title: "BBC Bitesize - SPaG", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zr8nrdm" },
        { title: "BBC Bitesize - Punctuation", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zpb9jty" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-science",
    name: "Science",
    icon: <FlaskConical className="w-5 h-5" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    description: "Biology, Chemistry, and Physics fundamentals",
    topics: [
      { name: "Cells and Organisms", revisionLinks: [
        { title: "BBC Bitesize - Cells", url: "https://www.bbc.co.uk/bitesize/topics/zqhs34j/articles/z2pspbk" },
        { title: "BBC Bitesize - Plant & Animal Cells", url: "https://www.bbc.co.uk/bitesize/topics/zqhs34j/articles/zw6ycdm" }
      ]},
      { name: "Atomic Structure and Elements", revisionLinks: [
        { title: "BBC Bitesize - Atoms", url: "https://www.bbc.co.uk/bitesize/topics/zqhs34j/articles/zpf3g82" },
        { title: "BBC Bitesize - Periodic Table", url: "https://www.bbc.co.uk/bitesize/topics/zqhs34j/articles/z8t8jty" }
      ]},
      { name: "Forces and Motion", revisionLinks: [
        { title: "BBC Bitesize - Forces", url: "https://www.bbc.co.uk/bitesize/topics/zqhs34j/articles/zqhpk2p" },
        { title: "BBC Bitesize - Speed and Motion", url: "https://www.bbc.co.uk/bitesize/topics/zqhs34j/articles/zvfgcdm" }
      ]},
      { name: "Energy Transfers", revisionLinks: [
        { title: "BBC Bitesize - Energy", url: "https://www.bbc.co.uk/bitesize/topics/zqhs34j/articles/zp7w8mn" }
      ]},
      { name: "Chemical Reactions", revisionLinks: [
        { title: "BBC Bitesize - Chemical Reactions", url: "https://www.bbc.co.uk/bitesize/topics/zqhs34j/articles/zw8nrdm" }
      ]},
      { name: "Earth and Space", revisionLinks: [
        { title: "BBC Bitesize - Earth and Space", url: "https://www.bbc.co.uk/bitesize/topics/zqhs34j/articles/zd4ycdm" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-history",
    name: "History",
    icon: <History className="w-5 h-5" />,
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    description: "Understanding the past to shape the future",
    topics: [
      { name: "World War I Causes and Events", revisionLinks: [
        { title: "BBC Bitesize - WWI", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" },
        { title: "BBC History - WWI", url: "https://www.bbc.co.uk/history/worldwars/wwone/" }
      ]},
      { name: "Interwar Years and Rise of Dictators", revisionLinks: [
        { title: "BBC Bitesize - Interwar Years", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" }
      ]},
      { name: "World War II and the Holocaust", revisionLinks: [
        { title: "BBC Bitesize - WWII", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" },
        { title: "BBC History - WWII", url: "https://www.bbc.co.uk/history/worldwars/wwtwo/" }
      ]},
      { name: "Cold War Origins", revisionLinks: [
        { title: "BBC Bitesize - Cold War", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" }
      ]},
      { name: "Source Analysis Skills", revisionLinks: [
        { title: "BBC Bitesize - Source Analysis", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" }
      ]},
      { name: "Essay Writing Techniques", revisionLinks: [
        { title: "BBC Bitesize - History Skills", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-geography",
    name: "Geography",
    icon: <Globe className="w-5 h-5" />,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    description: "Understanding our world - physical and human",
    topics: [
      { name: "Map Skills and Atlas Work", revisionLinks: [
        { title: "BBC Bitesize - Map Skills", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" }
      ]},
      { name: "Climate and Weather", revisionLinks: [
        { title: "BBC Bitesize - Weather and Climate", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" }
      ]},
      { name: "Ecosystems and Biomes", revisionLinks: [
        { title: "BBC Bitesize - Ecosystems", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" }
      ]},
      { name: "Population and Migration", revisionLinks: [
        { title: "BBC Bitesize - Population", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" }
      ]},
      { name: "Rivers and Flooding", revisionLinks: [
        { title: "BBC Bitesize - Rivers", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" }
      ]},
      { name: "Development and Inequality", revisionLinks: [
        { title: "BBC Bitesize - Development", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-computing",
    name: "Computing",
    icon: <Cpu className="w-5 h-5" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    description: "Digital literacy and programming basics",
    topics: [
      { name: "Introduction to Python Programming", revisionLinks: [
        { title: "W3Schools - Python Tutorial", url: "https://www.w3schools.com/python/" },
        { title: "BBC Bitesize - Programming", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" }
      ]},
      { name: "Algorithms and Flowcharts", revisionLinks: [
        { title: "BBC Bitesize - Algorithms", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" }
      ]},
      { name: "Internet Safety and Cybersecurity", revisionLinks: [
        { title: "BBC Bitesize - Cybersecurity", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" }
      ]},
      { name: "Digital Graphics and Design", revisionLinks: [
        { title: "BBC Bitesize - Graphics", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" }
      ]},
      { name: "Spreadsheets and Data", revisionLinks: [
        { title: "BBC Bitesize - Data", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" }
      ]},
      { name: "Computer Hardware Basics", revisionLinks: [
        { title: "BBC Bitesize - Computer Systems", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-french",
    name: "French",
    icon: <Languages className="w-5 h-5" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    description: "Language learning and cultural awareness",
    topics: [
      { name: "Greetings and Introductions", revisionLinks: [
        { title: "BBC Bitesize - French Greetings", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" }
      ]},
      { name: "Family and Relationships", revisionLinks: [
        { title: "BBC Bitesize - Family", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" }
      ]},
      { name: "School and Education", revisionLinks: [
        { title: "BBC Bitesize - School", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" }
      ]},
      { name: "Free Time and Hobbies", revisionLinks: [
        { title: "BBC Bitesize - Hobbies", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" }
      ]},
      { name: "Food and Drink", revisionLinks: [
        { title: "BBC Bitesize - Food", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" }
      ]},
      { name: "Grammar - Tenses and Conjugation", revisionLinks: [
        { title: "BBC Bitesize - French Grammar", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-pe",
    name: "PE & Health",
    icon: <Heart className="w-5 h-5" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
    description: "Physical fitness and healthy living",
    topics: [
      { name: "Anatomy and Physiology Basics", revisionLinks: [{ title: "BBC Bitesize - Body Systems", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" }] },
      { name: "Fitness Training Methods", revisionLinks: [{ title: "BBC Bitesize - Fitness", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" }] },
      { name: "Team Sports Tactics", revisionLinks: [{ title: "BBC Bitesize - Tactics", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" }] },
      { name: "Nutrition and Diet", revisionLinks: [{ title: "BBC Bitesize - Nutrition", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" }] },
      { name: "Mental Health and Wellbeing", revisionLinks: [{ title: "BBC Bitesize - Wellbeing", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" }] },
      { name: "Sports Leadership", revisionLinks: [{ title: "BBC Bitesize - Leadership", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" }] }
    ],
    yearGroup: 9,
  },
  {
    id: "y9-art",
    name: "Art & Design",
    icon: <Palette className="w-5 h-5" />,
    color: "text-rose-500",
    bgColor: "bg-rose-100",
    description: "Creative expression and artistic skills",
    topics: [
      { name: "Drawing Techniques and Observation", revisionLinks: [{ title: "BBC Bitesize - Drawing", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "Colour Theory and Painting", revisionLinks: [{ title: "BBC Bitesize - Colour", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "Printmaking Methods", revisionLinks: [{ title: "BBC Bitesize - Printmaking", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "Artist Research and Inspiration", revisionLinks: [{ title: "BBC Bitesize - Artists", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "3D Design and Sculpture", revisionLinks: [{ title: "BBC Bitesize - 3D Art", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "Portfolio Development", revisionLinks: [{ title: "BBC Bitesize - Portfolio", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] }
    ],
    yearGroup: 9,
  },
  {
    id: "y9-music",
    name: "Music",
    icon: <Music className="w-5 h-5" />,
    color: "text-violet-600",
    bgColor: "bg-violet-100",
    description: "Musical theory, performance, and appreciation",
    topics: [
      { name: "Reading Music and Notation", revisionLinks: [{ title: "BBC Bitesize - Notation", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" }] },
      { name: "Instruments of the Orchestra", revisionLinks: [{ title: "BBC Bitesize - Orchestra", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" }] },
      { name: "Music Theory - Scales and Chords", revisionLinks: [{ title: "BBC Bitesize - Theory", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" }] },
      { name: "Composition Basics", revisionLinks: [{ title: "BBC Bitesize - Composition", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" }] },
      { name: "Music History and Genres", revisionLinks: [{ title: "BBC Bitesize - History", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" }] },
      { name: "Performance Skills", revisionLinks: [{ title: "BBC Bitesize - Performance", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" }] }
    ],
    yearGroup: 9,
  },
  // Year 10 Subjects
  {
    id: "maths",
    name: "Maths",
    icon: <Calculator className="w-5 h-5" />,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    description: "Numbers, algebra, geometry, and problem solving",
    examBoard: "Edexcel",
    topics: [
      { name: "Number - Fractions, Decimals, Percentages", revisionLinks: [
        { title: "BBC Bitesize GCSE - Number", url: "https://www.bbc.co.uk/bitesize/topics/zqhs34j" },
        { title: "Corbettmaths - Number", url: "https://corbettmaths.com/contents/" }
      ]},
      { name: "Algebra - Equations, Graphs, Sequences", revisionLinks: [
        { title: "BBC Bitesize GCSE - Algebra", url: "https://www.bbc.co.uk/bitesize/topics/zw6tyrd" },
        { title: "MathsGenie - Algebra", url: "https://www.mathsgenie.co.uk/algebra.html" }
      ]},
      { name: "Geometry - Shapes, Angles, Transformations", revisionLinks: [
        { title: "BBC Bitesize GCSE - Geometry", url: "https://www.bbc.co.uk/bitesize/topics/zr98pbk" }
      ]},
      { name: "Statistics - Data, Probability", revisionLinks: [
        { title: "BBC Bitesize GCSE - Statistics", url: "https://www.bbc.co.uk/bitesize/topics/z8nycdm" }
      ]},
      { name: "Ratio and Proportion", revisionLinks: [
        { title: "BBC Bitesize GCSE - Ratio", url: "https://www.bbc.co.uk/bitesize/topics/zsxhfg8" }
      ]}
    ],
    yearGroup: 10,
  },
  {
    id: "english",
    name: "English",
    icon: <BookOpen className="w-5 h-5" />,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    description: "Literature, language, and communication skills",
    examBoard: "AQA",
    topics: [
      { name: "Romeo and Juliet / Shakespeare", revisionLinks: [
        { title: "BBC Bitesize - Romeo and Juliet", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "SparkNotes - Romeo and Juliet", url: "https://www.sparknotes.com/shakespeare/romeojuliet/" }
      ]},
      { name: "Modern Text (An Inspector Calls)", revisionLinks: [
        { title: "BBC Bitesize - An Inspector Calls", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "SparkNotes - An Inspector Calls", url: "https://www.sparknotes.com/lit/inspectorcalls/" }
      ]},
      { name: "Poetry Anthology", revisionLinks: [
        { title: "BBC Bitesize - Poetry", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" }
      ]},
      { name: "Unseen Poetry", revisionLinks: [
        { title: "BBC Bitesize - Unseen Poetry", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" }
      ]},
      { name: "Creative Writing", revisionLinks: [
        { title: "BBC Bitesize - Creative Writing", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" }
      ]},
      { name: "Language Analysis", revisionLinks: [
        { title: "BBC Bitesize - Language Analysis", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" }
      ]}
    ],
    yearGroup: 10,
  },
  {
    id: "science",
    name: "Science",
    icon: <FlaskConical className="w-5 h-5" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    description: "Biology, Chemistry, and Physics combined",
    examBoard: "AQA",
    topics: [
      { name: "Biology - Cells, Organ Systems, Genetics", revisionLinks: [
        { title: "BBC Bitesize GCSE - Biology", url: "https://www.bbc.co.uk/bitesize/subjects/zng4d2p" },
        { title: "Free Science Lessons - Biology", url: "https://www.freesciencelessons.co.uk/gcse-biology/" }
      ]},
      { name: "Chemistry - Atomic Structure, Reactions", revisionLinks: [
        { title: "BBC Bitesize GCSE - Chemistry", url: "https://www.bbc.co.uk/bitesize/subjects/z8cycdm" },
        { title: "Free Science Lessons - Chemistry", url: "https://www.freesciencelessons.co.uk/gcse-chemistry/" }
      ]},
      { name: "Physics - Forces, Energy, Waves", revisionLinks: [
        { title: "BBC Bitesize GCSE - Physics", url: "https://www.bbc.co.uk/bitesize/subjects/zpm6fg8" },
        { title: "Free Science Lessons - Physics", url: "https://www.freesciencelessons.co.uk/gcse-physics/" }
      ]},
      { name: "Required Practicals", revisionLinks: [
        { title: "BBC Bitesize - Required Practicals", url: "https://www.bbc.co.uk/bitesize/guides/zqwpmnb/revision/1" }
      ]}
    ],
    yearGroup: 10,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: <Lightbulb className="w-5 h-5" />,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    description: "Business skills, entrepreneurship, and marketing",
    topics: [
      { name: "Business Planning", revisionLinks: [{ title: "BBC Bitesize - Business", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" }] },
      { name: "Marketing and Promotion", revisionLinks: [{ title: "BBC Bitesize - Marketing", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" }] },
      { name: "Finance and Budgeting", revisionLinks: [{ title: "BBC Bitesize - Finance", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" }] },
      { name: "Customer Service", revisionLinks: [{ title: "BBC Bitesize - Customer Service", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" }] },
      { name: "Enterprise Skills", revisionLinks: [{ title: "BBC Bitesize - Enterprise", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" }] }
    ],
    yearGroup: 10,
  },
  {
    id: "geography",
    name: "Geography",
    icon: <Globe className="w-5 h-5" />,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    description: "Physical and human geography of our world",
    examBoard: "AQA",
    topics: [
      { name: "Natural Hazards - Earthquakes, Volcanoes", revisionLinks: [
        { title: "BBC Bitesize GCSE - Natural Hazards", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" }
      ]},
      { name: "Living World - Ecosystems, Rainforests", revisionLinks: [
        { title: "BBC Bitesize GCSE - Ecosystems", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" }
      ]},
      { name: "Urban Issues and Challenges", revisionLinks: [
        { title: "BBC Bitesize GCSE - Urban", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" }
      ]},
      { name: "Resource Management", revisionLinks: [
        { title: "BBC Bitesize GCSE - Resources", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" }
      ]},
      { name: "Fieldwork Skills", revisionLinks: [
        { title: "BBC Bitesize GCSE - Fieldwork", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" }
      ]}
    ],
    yearGroup: 10,
  },
  {
    id: "dt",
    name: "DT",
    icon: <Ruler className="w-5 h-5" />,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    description: "Design thinking and practical making skills",
    topics: [
      { name: "Design Process", revisionLinks: [{ title: "BBC Bitesize - Design", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Materials and Manufacturing", revisionLinks: [{ title: "BBC Bitesize - Materials", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "CAD/CAM", revisionLinks: [{ title: "BBC Bitesize - CAD/CAM", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Sustainability in Design", revisionLinks: [{ title: "BBC Bitesize - Sustainability", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "NEA (Coursework)", revisionLinks: [{ title: "BBC Bitesize - NEA", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] }
    ],
    yearGroup: 10,
  },
  {
    id: "computerscience",
    name: "Computer Science",
    icon: <Cpu className="w-5 h-5" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    description: "Programming, algorithms, and computer systems",
    examBoard: "OCR",
    topics: [
      { name: "Programming in Python", revisionLinks: [
        { title: "W3Schools - Python", url: "https://www.w3schools.com/python/" },
        { title: "BBC Bitesize - Programming", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" }
      ]},
      { name: "Algorithms and Problem Solving", revisionLinks: [
        { title: "BBC Bitesize - Algorithms", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" }
      ]},
      { name: "Computer Systems", revisionLinks: [
        { title: "BBC Bitesize - Computer Systems", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" }
      ]},
      { name: "Data Representation", revisionLinks: [
        { title: "BBC Bitesize - Data", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" }
      ]},
      { name: "Networks and Security", revisionLinks: [
        { title: "BBC Bitesize - Networks", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" }
      ]}
    ],
    yearGroup: 10,
  },
  {
    id: "engineering",
    name: "Engineering",
    icon: <Wrench className="w-5 h-5" />,
    color: "text-slate-600",
    bgColor: "bg-slate-200",
    description: "Practical engineering principles and processes",
    topics: [
      { name: "Engineering Materials", revisionLinks: [{ title: "BBC Bitesize - Engineering", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Manufacturing Processes", revisionLinks: [{ title: "BBC Bitesize - Manufacturing", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Engineering Drawing", revisionLinks: [{ title: "BBC Bitesize - Technical Drawing", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Quality Control", revisionLinks: [{ title: "BBC Bitesize - Quality", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Health and Safety", revisionLinks: [{ title: "BBC Bitesize - H&S", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] }
    ],
    yearGroup: 10,
  },
  {
    id: "builtenvironment",
    name: "Built Environment",
    icon: <Building2 className="w-5 h-5" />,
    color: "text-stone-600",
    bgColor: "bg-stone-200",
    description: "Construction, architecture, and the built world",
    topics: [
      { name: "Construction Methods", revisionLinks: [{ title: "BBC Bitesize - Construction", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Sustainable Building", revisionLinks: [{ title: "BBC Bitesize - Sustainability", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Planning and Design", revisionLinks: [{ title: "BBC Bitesize - Planning", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Building Regulations", revisionLinks: [{ title: "BBC Bitesize - Regulations", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Site Safety", revisionLinks: [{ title: "BBC Bitesize - Site Safety", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] }
    ],
    yearGroup: 10,
  },
  {
    id: "art",
    name: "Art & Design",
    icon: <Palette className="w-5 h-5" />,
    color: "text-rose-500",
    bgColor: "bg-rose-100",
    description: "Creative expression through various media",
    topics: [
      { name: "Drawing and Sketching", revisionLinks: [{ title: "BBC Bitesize - Art", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "Painting Techniques", revisionLinks: [{ title: "BBC Bitesize - Painting", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "3D Work and Sculpture", revisionLinks: [{ title: "BBC Bitesize - Sculpture", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "Artist Research", revisionLinks: [{ title: "BBC Bitesize - Artists", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "Portfolio Development", revisionLinks: [{ title: "BBC Bitesize - Portfolio", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] }
    ],
    yearGroup: 10,
  },
  {
    id: "digitalmedia",
    name: "Digital Media",
    icon: <Film className="w-5 h-5" />,
    color: "text-violet-600",
    bgColor: "bg-violet-100",
    description: "Media production, editing, and digital content",
    topics: [
      { name: "Video Production", revisionLinks: [{ title: "BBC Bitesize - Media", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "Audio Editing", revisionLinks: [{ title: "BBC Bitesize - Audio", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "Graphic Design", revisionLinks: [{ title: "BBC Bitesize - Design", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "Animation Basics", revisionLinks: [{ title: "BBC Bitesize - Animation", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] },
      { name: "Digital Storytelling", revisionLinks: [{ title: "BBC Bitesize - Storytelling", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }] }
    ],
    yearGroup: 10,
  },
  {
    id: "mechatronics",
    name: "Mechatronics & Robotics",
    icon: <Bot className="w-5 h-5" />,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
    description: "Combining mechanical, electronic, and software systems",
    topics: [
      { name: "Robotics Fundamentals", revisionLinks: [{ title: "BBC Bitesize - Engineering", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Electronics and Circuits", revisionLinks: [{ title: "BBC Bitesize - Electronics", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Programming Controllers", revisionLinks: [{ title: "BBC Bitesize - Programming", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Sensors and Actuators", revisionLinks: [{ title: "BBC Bitesize - Sensors", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] },
      { name: "Robot Building Projects", revisionLinks: [{ title: "BBC Bitesize - Projects", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }] }
    ],
    yearGroup: 10,
  },
  // Year 11 Subjects - GCSE Mock Preparation
  {
    id: "y11-maths",
    name: "Maths",
    icon: <Calculator className="w-5 h-5" />,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    description: "GCSE Maths - Mock Exam Preparation",
    examBoard: "Edexcel",
    topics: [
      { name: "Paper 1: Non-Calculator - Number, Algebra, Ratio", revisionLinks: [
        { title: "BBC Bitesize GCSE - Number", url: "https://www.bbc.co.uk/bitesize/topics/zqhs34j" },
        { title: "Corbettmaths - GCSE", url: "https://corbettmaths.com/contents/" }
      ]},
      { name: "Paper 2: Calculator - Geometry, Proportion, Statistics", revisionLinks: [
        { title: "BBC Bitesize GCSE - Geometry", url: "https://www.bbc.co.uk/bitesize/topics/zr98pbk" },
        { title: "MathsGenie - GCSE", url: "https://www.mathsgenie.co.uk/" }
      ]},
      { name: "Paper 3: Calculator - All Topics", revisionLinks: [
        { title: "OnMaths - Practice Papers", url: "https://www.onmaths.com/" }
      ]},
      { name: "Exam Technique & Time Management", revisionLinks: [
        { title: "Corbettmaths - Exam Tips", url: "https://corbettmaths.com/" }
      ]},
      { name: "Common Mistakes to Avoid", revisionLinks: [
        { title: "MathsGenie - Common Mistakes", url: "https://www.mathsgenie.co.uk/" }
      ]},
      { name: "Grade Boundaries & Target Setting", revisionLinks: [
        { title: "AQA - Grade Boundaries", url: "https://www.aqa.org.uk/" }
      ]}
    ],
    yearGroup: 11,
  },
  {
    id: "y11-english",
    name: "English",
    icon: <BookOpen className="w-5 h-5" />,
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    description: "GCSE English - Mock Exam Preparation",
    examBoard: "AQA",
    topics: [
      { name: "Language Paper 1: Creative Reading & Writing", revisionLinks: [
        { title: "BBC Bitesize - Language P1", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" }
      ]},
      { name: "Language Paper 2: Writers' Viewpoints", revisionLinks: [
        { title: "BBC Bitesize - Language P2", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" }
      ]},
      { name: "Literature: Shakespeare (Romeo & Juliet/Macbeth)", revisionLinks: [
        { title: "SparkNotes - Shakespeare", url: "https://www.sparknotes.com/shakespeare/" }
      ]},
      { name: "Literature: Modern Texts", revisionLinks: [
        { title: "BBC Bitesize - Modern Texts", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" }
      ]},
      { name: "Literature: Poetry Anthology", revisionLinks: [
        { title: "BBC Bitesize - Poetry", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" }
      ]},
      { name: "Essay Structure & Analysis Skills", revisionLinks: [
        { title: "Mr Bruff - YouTube", url: "https://www.youtube.com/user/mrbruff" }
      ]}
    ],
    yearGroup: 11,
  },
  {
    id: "y11-science",
    name: "Science",
    icon: <FlaskConical className="w-5 h-5" />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    description: "GCSE Science - Mock Exam Preparation",
    examBoard: "AQA",
    topics: [
      { name: "Biology: Cell Biology, Organisation, Infection", revisionLinks: [
        { title: "BBC Bitesize - Biology", url: "https://www.bbc.co.uk/bitesize/subjects/zng4d2p" },
        { title: "Free Science Lessons", url: "https://www.freesciencelessons.co.uk/" }
      ]},
      { name: "Chemistry: Atomic Structure, Bonding, Quantitative", revisionLinks: [
        { title: "BBC Bitesize - Chemistry", url: "https://www.bbc.co.uk/bitesize/subjects/z8cycdm" }
      ]},
      { name: "Physics: Energy, Electricity, Particle Model", revisionLinks: [
        { title: "BBC Bitesize - Physics", url: "https://www.bbc.co.uk/bitesize/subjects/zpm6fg8" }
      ]},
      { name: "Required Practicals Review", revisionLinks: [
        { title: "Cognito - Practicals", url: "https://cognitoresources.org/" }
      ]},
      { name: "6-Mark Question Technique", revisionLinks: [
        { title: "Free Science Lessons - Exam Tips", url: "https://www.freesciencelessons.co.uk/" }
      ]},
      { name: "Command Words & Exam Strategy", revisionLinks: [
        { title: "AQA - Command Words", url: "https://www.aqa.org.uk/" }
      ]}
    ],
    yearGroup: 11,
  },
  {
    id: "y11-history",
    name: "History",
    icon: <History className="w-5 h-5" />,
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    description: "GCSE History - Mock Exam Preparation",
    examBoard: "AQA/Edexcel",
    topics: [
      { name: "Period Study: Germany 1890-1945", revisionLinks: [{ title: "BBC Bitesize - Germany", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" }] },
      { name: "Wider World: Conflict & Tension", revisionLinks: [{ title: "BBC Bitesize - Cold War", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" }] },
      { name: "Thematic Study: Health & Medicine", revisionLinks: [{ title: "BBC Bitesize - Medicine", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" }] },
      { name: "British Depth Study", revisionLinks: [{ title: "BBC Bitesize - British", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" }] },
      { name: "Source Analysis in Exams", revisionLinks: [{ title: "BBC Bitesize - Sources", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" }] },
      { name: "Essay Writing for 16/20 Marks", revisionLinks: [{ title: "History Learning Site", url: "http://www.historylearningsite.co.uk" }] }
    ],
    yearGroup: 11,
  },
  {
    id: "y11-geography",
    name: "Geography",
    icon: <Globe className="w-5 h-5" />,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    description: "GCSE Geography - Mock Exam Preparation",
    examBoard: "AQA",
    topics: [
      { name: "Paper 1: Natural Hazards, Living World, Physical", revisionLinks: [{ title: "BBC Bitesize - Paper 1", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" }] },
      { name: "Paper 2: Urban Issues, Economic World, Resource", revisionLinks: [{ title: "BBC Bitesize - Paper 2", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" }] },
      { name: "Paper 3: Fieldwork & Skills", revisionLinks: [{ title: "BBC Bitesize - Fieldwork", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" }] },
      { name: "Case Study Recall", revisionLinks: [{ title: "BBC Bitesize - Case Studies", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" }] },
      { name: "Map Skills for Exams", revisionLinks: [{ title: "BBC Bitesize - Maps", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" }] },
      { name: "9-Mark Answer Structure", revisionLinks: [{ title: "BBC Bitesize - Exam Skills", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" }] }
    ],
    yearGroup: 11,
  },
  {
    id: "y11-computerscience",
    name: "Computer Science",
    icon: <Cpu className="w-5 h-5" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    description: "GCSE Computer Science - Mock Preparation",
    examBoard: "OCR/AQA",
    topics: [
      { name: "Paper 1: Computer Systems & Architecture", revisionLinks: [
        { title: "BBC Bitesize - Computer Systems", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" }
      ]},
      { name: "Paper 2: Algorithms, Programming & Logic", revisionLinks: [
        { title: "BBC Bitesize - Algorithms", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" }
      ]},
      { name: "Python Programming Practice", revisionLinks: [
        { title: "W3Schools - Python", url: "https://www.w3schools.com/python/" }
      ]},
      { name: "Binary/Hex Calculations", revisionLinks: [
        { title: "Craig'n'Dave - Binary", url: "https://www.craigndave.org/" }
      ]},
      { name: "SQL & Database Queries", revisionLinks: [
        { title: "W3Schools - SQL", url: "https://www.w3schools.com/sql/" }
      ]},
      { name: "Exam Technique for CS", revisionLinks: [
        { title: "Craig'n'Dave - Exam Tips", url: "https://www.craigndave.org/" }
      ]}
    ],
    yearGroup: 11,
  },
  {
    id: "y11-french",
    name: "French",
    icon: <Languages className="w-5 h-5" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    description: "GCSE French - Mock Exam Preparation",
    examBoard: "AQA",
    topics: [
      { name: "Listening: Exam Strategies", revisionLinks: [{ title: "BBC Bitesize - Listening", url: "https://www.bbc.co.uk/bitesize/subjects/z9dqxnb" }] },
      { name: "Speaking: Role Play & Photo Card", revisionLinks: [{ title: "BBC Bitesize - Speaking", url: "https://www.bbc.co.uk/bitesize/subjects/z9dqxnb" }] },
      { name: "Reading: Finding Key Information", revisionLinks: [{ title: "BBC Bitesize - Reading", url: "https://www.bbc.co.uk/bitesize/subjects/z9dqxnb" }] },
      { name: "Writing: 90/150 Word Tasks", revisionLinks: [{ title: "BBC Bitesize - Writing", url: "https://www.bbc.co.uk/bitesize/subjects/z9dqxnb" }] },
      { name: "Translation: French to English", revisionLinks: [{ title: "BBC Bitesize - Translation", url: "https://www.bbc.co.uk/bitesize/subjects/z9dqxnb" }] },
      { name: "Translation: English to French", revisionLinks: [{ title: "BBC Bitesize - Translation", url: "https://www.bbc.co.uk/bitesize/subjects/z9dqxnb" }] }
    ],
    yearGroup: 11,
  },
  {
    id: "y11-re",
    name: "Religious Studies",
    icon: <BookOpen className="w-5 h-5" />,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    description: "GCSE RS - Mock Exam Preparation",
    examBoard: "AQA",
    topics: [
      { name: "Christianity: Beliefs & Practices", revisionLinks: [{ title: "BBC Bitesize - Christianity", url: "https://www.bbc.co.uk/bitesize/subjects/zb48q6f" }] },
      { name: "Islam: Beliefs & Practices", revisionLinks: [{ title: "BBC Bitesize - Islam", url: "https://www.bbc.co.uk/bitesize/subjects/zb48q6f" }] },
      { name: "Thematic Studies: Relationships", revisionLinks: [{ title: "BBC Bitesize - Themes", url: "https://www.bbc.co.uk/bitesize/subjects/zb48q6f" }] },
      { name: "Thematic Studies: Life & Death", revisionLinks: [{ title: "BBC Bitesize - Themes", url: "https://www.bbc.co.uk/bitesize/subjects/zb48q6f" }] },
      { name: "12-Mark Essay Structure", revisionLinks: [{ title: "BBC Bitesize - Essays", url: "https://www.bbc.co.uk/bitesize/subjects/zb48q6f" }] },
      { name: "Evaluation Skills", revisionLinks: [{ title: "BBC Bitesize - Evaluation", url: "https://www.bbc.co.uk/bitesize/subjects/zb48q6f" }] }
    ],
    yearGroup: 11,
  },
];

// Quiz data for subjects
const subjectQuizzes: SubjectQuiz[] = [
  {
    subjectId: "y9-maths",
    quizzes: [
      {
        id: "y9-maths-1",
        question: "What does BIDMAS stand for?",
        options: ["Brackets, Indices, Division, Multiplication, Addition, Subtraction", "Brackets, Integers, Division, Multiply, Add, Subtract", "Brackets, Indices, Divide, Multiply, Addition, Subtraction", "Brackets, Indices, Division, Multiplication, Add, Subtract"],
        correctAnswer: 0,
        explanation: "BIDMAS is the order of operations: Brackets, Indices, Division, Multiplication, Addition, Subtraction."
      },
      {
        id: "y9-maths-2",
        question: "What is 25% of 80?",
        options: ["15", "20", "25", "30"],
        correctAnswer: 1,
        explanation: "25% = 1/4, so 80 ÷ 4 = 20"
      },
      {
        id: "y9-maths-3",
        question: "Solve for x: 2x + 5 = 15",
        options: ["x = 5", "x = 10", "x = 7.5", "x = 20"],
        correctAnswer: 0,
        explanation: "2x = 15 - 5 = 10, therefore x = 5"
      },
      {
        id: "y9-maths-4",
        question: "What is the area of a rectangle with length 8cm and width 5cm?",
        options: ["13 cm²", "26 cm²", "40 cm²", "45 cm²"],
        correctAnswer: 2,
        explanation: "Area = length × width = 8 × 5 = 40 cm²"
      },
    ]
  },
  {
    subjectId: "y9-science",
    quizzes: [
      {
        id: "y9-sci-1",
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Cell Membrane"],
        correctAnswer: 1,
        explanation: "Mitochondria produce ATP, the cell's energy currency, which is why they're called the powerhouse."
      },
      {
        id: "y9-sci-2",
        question: "Which gas makes up about 78% of Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: 2,
        explanation: "Nitrogen (N₂) makes up approximately 78% of Earth's atmosphere."
      },
    ]
  },
  {
    subjectId: "y9-history",
    quizzes: [
      {
        id: "y9-hist-1",
        question: "When did World War I begin?",
        options: ["1914", "1916", "1918", "1920"],
        correctAnswer: 0,
        explanation: "World War I began on July 28, 1914, following the assassination of Archduke Franz Ferdinand."
      },
      {
        id: "y9-hist-2",
        question: "Who was the leader of Nazi Germany during WWII?",
        options: ["Joseph Stalin", "Adolf Hitler", "Winston Churchill", "Benito Mussolini"],
        correctAnswer: 1,
        explanation: "Adolf Hitler was the dictator of Nazi Germany from 1933 to 1945."
      },
    ]
  },
  {
    subjectId: "maths",
    quizzes: [
      {
        id: "y10-maths-1",
        question: "What is the quadratic formula?",
        options: ["x = -b ± √(b² - 4ac) / 2a", "x = -b ± √(b² + 4ac) / 2a", "x = b ± √(b² - 4ac) / 2a", "x = -b ± √(b² - 4ac) / a"],
        correctAnswer: 0,
        explanation: "The quadratic formula is x = [-b ± √(b² - 4ac)] / 2a, used to solve ax² + bx + c = 0."
      },
      {
        id: "y10-maths-2",
        question: "What is sin(30°)?",
        options: ["0", "0.5", "1", "√3/2"],
        correctAnswer: 1,
        explanation: "sin(30°) = 0.5 or 1/2"
      },
    ]
  },
  {
    subjectId: "science",
    quizzes: [
      {
        id: "y10-sci-1",
        question: "What is the pH of pure water?",
        options: ["0", "7", "14", "10"],
        correctAnswer: 1,
        explanation: "Pure water has a neutral pH of 7."
      },
      {
        id: "y10-sci-2",
        question: "Which organelle contains the cell's genetic material?",
        options: ["Mitochondria", "Ribosome", "Nucleus", "Cytoplasm"],
        correctAnswer: 2,
        explanation: "The nucleus contains DNA, the cell's genetic material."
      },
    ]
  },
];

// Mock papers data for Year 11 and Year 9
const mockPapers: SubjectMockPapers[] = [
  // Year 9 Mock Papers
  {
    subjectId: "y9-maths",
    papers: [
      { id: "y9-math-mock1", title: "Year 9 Maths Mock - Paper 1", examBoard: "KS3", year: "2024", paper: "Mock 1", topics: ["Number - BIDMAS, Factors, Multiples", "Fractions, Decimals & Percentages", "Algebra - Simplifying, Solving"], difficulty: "Foundation", url: "#" },
      { id: "y9-math-mock2", title: "Year 9 Maths Mock - Paper 2", examBoard: "KS3", year: "2024", paper: "Mock 2", topics: ["Graphs and Coordinates", "Geometry - Angles, Area, Perimeter", "Statistics - Averages, Charts"], difficulty: "Foundation", url: "#" },
    ]
  },
  {
    subjectId: "y9-english",
    papers: [
      { id: "y9-eng-mock1", title: "Year 9 English Mock - Reading", examBoard: "KS3", year: "2024", paper: "Reading", topics: ["Novel Study - Character Analysis", "Poetry Forms and Techniques", "Inference and Analysis"], difficulty: "Foundation", url: "#" },
      { id: "y9-eng-mock2", title: "Year 9 English Mock - Writing", examBoard: "KS3", year: "2024", paper: "Writing", topics: ["Creative Writing Skills", "Shakespeare Introduction", "SPaG"], difficulty: "Foundation", url: "#" },
    ]
  },
  {
    subjectId: "y9-science",
    papers: [
      { id: "y9-sci-mock1", title: "Year 9 Science Mock - Biology & Chemistry", examBoard: "KS3", year: "2024", paper: "Paper 1", topics: ["Cells and Organisms", "Atomic Structure", "Chemical Reactions"], difficulty: "Foundation", url: "#" },
      { id: "y9-sci-mock2", title: "Year 9 Science Mock - Physics", examBoard: "KS3", year: "2024", paper: "Paper 2", topics: ["Forces and Motion", "Energy Transfers", "Earth and Space"], difficulty: "Foundation", url: "#" },
    ]
  },
  {
    subjectId: "y9-history",
    papers: [
      { id: "y9-hist-mock1", title: "Year 9 History Mock - WWI & WWII", examBoard: "KS3", year: "2024", paper: "Paper 1", topics: ["World War I Causes and Events", "World War II and the Holocaust", "Source Analysis"], difficulty: "Foundation", url: "#" },
      { id: "y9-hist-mock2", title: "Year 9 History Mock - Cold War", examBoard: "KS3", year: "2024", paper: "Paper 2", topics: ["Interwar Years", "Cold War Origins", "Essay Writing"], difficulty: "Foundation", url: "#" },
    ]
  },
  {
    subjectId: "y9-geography",
    papers: [
      { id: "y9-geo-mock1", title: "Year 9 Geography Mock - Physical", examBoard: "KS3", year: "2024", paper: "Paper 1", topics: ["Map Skills", "Climate and Weather", "Rivers and Flooding"], difficulty: "Foundation", url: "#" },
      { id: "y9-geo-mock2", title: "Year 9 Geography Mock - Human", examBoard: "KS3", year: "2024", paper: "Paper 2", topics: ["Population and Migration", "Ecosystems and Biomes", "Development"], difficulty: "Foundation", url: "#" },
    ]
  },
  // Year 11 Mock Papers - GCSE
  {
    subjectId: "y11-maths",
    papers: [
      { id: "math-f1", title: "Maths Paper 1 (Non-Calc)", examBoard: "Edexcel", year: "2023", paper: "1F", topics: ["Number", "Algebra", "Ratio"], difficulty: "Foundation", url: "#" },
      { id: "math-h1", title: "Maths Paper 1 (Non-Calc)", examBoard: "Edexcel", year: "2023", paper: "1H", topics: ["Number", "Algebra", "Ratio"], difficulty: "Higher", url: "#" },
      { id: "math-f2", title: "Maths Paper 2 (Calc)", examBoard: "Edexcel", year: "2023", paper: "2F", topics: ["Geometry", "Proportion", "Statistics"], difficulty: "Foundation", url: "#" },
      { id: "math-h2", title: "Maths Paper 2 (Calc)", examBoard: "Edexcel", year: "2023", paper: "2H", topics: ["Geometry", "Proportion", "Statistics"], difficulty: "Higher", url: "#" },
      { id: "math-f3", title: "Maths Paper 3 (Calc)", examBoard: "Edexcel", year: "2023", paper: "3F", topics: ["All Topics"], difficulty: "Foundation", url: "#" },
      { id: "math-h3", title: "Maths Paper 3 (Calc)", examBoard: "Edexcel", year: "2023", paper: "3H", topics: ["All Topics"], difficulty: "Higher", url: "#" },
    ]
  },
  {
    subjectId: "y11-english",
    papers: [
      { id: "eng-lang1", title: "English Language Paper 1", examBoard: "AQA", year: "2023", paper: "8700/1", topics: ["Creative Reading", "Creative Writing"], difficulty: "Higher", url: "#" },
      { id: "eng-lang2", title: "English Language Paper 2", examBoard: "AQA", year: "2023", paper: "8700/2", topics: ["Non-Fiction", "Viewpoints"], difficulty: "Higher", url: "#" },
      { id: "eng-lit1", title: "English Literature Paper 1", examBoard: "AQA", year: "2023", paper: "8702/1", topics: ["Shakespeare", "19th Century Novel"], difficulty: "Higher", url: "#" },
      { id: "eng-lit2", title: "English Literature Paper 2", examBoard: "AQA", year: "2023", paper: "8702/2", topics: ["Modern Texts", "Poetry"], difficulty: "Higher", url: "#" },
    ]
  },
  {
    subjectId: "y11-science",
    papers: [
      { id: "bio-f", title: "Biology Paper 1", examBoard: "AQA", year: "2023", paper: "8461/1F", topics: ["Cell Biology", "Organisation", "Infection"], difficulty: "Foundation", url: "#" },
      { id: "bio-h", title: "Biology Paper 1", examBoard: "AQA", year: "2023", paper: "8461/1H", topics: ["Cell Biology", "Organisation", "Infection"], difficulty: "Higher", url: "#" },
      { id: "chem-f", title: "Chemistry Paper 1", examBoard: "AQA", year: "2023", paper: "8462/1F", topics: ["Atomic Structure", "Bonding", "Quantitative"], difficulty: "Foundation", url: "#" },
      { id: "chem-h", title: "Chemistry Paper 1", examBoard: "AQA", year: "2023", paper: "8462/1H", topics: ["Atomic Structure", "Bonding", "Quantitative"], difficulty: "Higher", url: "#" },
      { id: "phys-f", title: "Physics Paper 1", examBoard: "AQA", year: "2023", paper: "8463/1F", topics: ["Energy", "Electricity", "Particle Model"], difficulty: "Foundation", url: "#" },
      { id: "phys-h", title: "Physics Paper 1", examBoard: "AQA", year: "2023", paper: "8463/1H", topics: ["Energy", "Electricity", "Particle Model"], difficulty: "Higher", url: "#" },
    ]
  },
  {
    subjectId: "y11-history",
    papers: [
      { id: "hist-p1", title: "History Paper 1 - Period Study", examBoard: "AQA", year: "2023", paper: "Paper 1", topics: ["Germany 1890-1945", "Conflict & Tension"], difficulty: "Higher", url: "#" },
      { id: "hist-p2", title: "History Paper 2 - Thematic", examBoard: "AQA", year: "2023", paper: "Paper 2", topics: ["Health & Medicine", "British Depth Study"], difficulty: "Higher", url: "#" },
    ]
  },
  {
    subjectId: "y11-geography",
    papers: [
      { id: "geo-p1", title: "Geography Paper 1 - Physical", examBoard: "AQA", year: "2023", paper: "Paper 1", topics: ["Natural Hazards", "Living World", "Physical Landscapes"], difficulty: "Higher", url: "#" },
      { id: "geo-p2", title: "Geography Paper 2 - Human", examBoard: "AQA", year: "2023", paper: "Paper 2", topics: ["Urban Issues", "Economic World", "Resource Management"], difficulty: "Higher", url: "#" },
      { id: "geo-p3", title: "Geography Paper 3 - Skills", examBoard: "AQA", year: "2023", paper: "Paper 3", topics: ["Fieldwork", "Issue Evaluation", "Map Skills"], difficulty: "Higher", url: "#" },
    ]
  },
  {
    subjectId: "y11-computerscience",
    papers: [
      { id: "cs-p1", title: "Computer Science Paper 1", examBoard: "OCR", year: "2023", paper: "J277/01", topics: ["Computer Systems", "Architecture", "Memory"], difficulty: "Higher", url: "#" },
      { id: "cs-p2", title: "Computer Science Paper 2", examBoard: "OCR", year: "2023", paper: "J277/02", topics: ["Algorithms", "Programming", "Logic"], difficulty: "Higher", url: "#" },
    ]
  },
  {
    subjectId: "y11-french",
    papers: [
      { id: "fr-list", title: "French Listening", examBoard: "AQA", year: "2023", paper: "8658/L", topics: ["Listening Comprehension"], difficulty: "Higher", url: "#" },
      { id: "fr-speak", title: "French Speaking", examBoard: "AQA", year: "2023", paper: "8658/S", topics: ["Role Play", "Photo Card", "Conversation"], difficulty: "Higher", url: "#" },
      { id: "fr-read", title: "French Reading", examBoard: "AQA", year: "2023", paper: "8658/R", topics: ["Reading Comprehension", "Translation"], difficulty: "Higher", url: "#" },
      { id: "fr-write", title: "French Writing", examBoard: "AQA", year: "2023", paper: "8658/W", topics: ["90/150 Word Tasks", "Translation"], difficulty: "Higher", url: "#" },
    ]
  },
  {
    subjectId: "y11-re",
    papers: [
      { id: "re-p1", title: "RS Paper 1 - Religions", examBoard: "AQA", year: "2023", paper: "8062/1", topics: ["Christianity", "Islam"], difficulty: "Higher", url: "#" },
      { id: "re-p2", title: "RS Paper 2 - Themes", examBoard: "AQA", year: "2023", paper: "8062/2", topics: ["Relationships", "Life & Death", "Peace & Conflict"], difficulty: "Higher", url: "#" },
    ]
  },
];

// Subject Information Letters
const subjectInfoData: SubjectInfo[] = [
  {
    subjectId: "y9-maths",
    welcomeLetter: "Welcome to Year 9 Mathematics! This year builds the essential foundations you'll need for GCSE Maths. You'll develop problem-solving skills and mathematical reasoning that will serve you throughout your academic journey and beyond.",
    overview: "Year 9 Maths covers six key areas: Number, Algebra, Geometry, Statistics, Ratio, and Probability. Each topic builds on what you've learned in Years 7 and 8, introducing more complex concepts and problem-solving techniques.",
    whyStudy: ["Develops logical thinking and problem-solving skills", "Essential for GCSE success and further education", "Used in everyday life - from budgeting to cooking", "Opens doors to careers in engineering, finance, science, and technology"],
    careerPaths: ["Engineer", "Data Scientist", "Financial Analyst", "Architect", "Game Developer", "Statistician"],
    examStructure: "Year 9 assessments include topic tests, end-of-term exams, and problem-solving challenges. You'll sit two papers: one calculator and one non-calculator.",
    topTips: ["Practice little and often - 15 minutes daily is better than 2 hours once a week", "Always show your working - even if you're not sure of the final answer", "Use online resources like Corbettmaths and BBC Bitesize", "Ask for help when stuck - don't let gaps in understanding grow", "Learn your times tables and basic facts by heart"],
    resources: [
      { title: "Corbettmaths", url: "https://corbettmaths.com" },
      { title: "BBC Bitesize KS3 Maths", url: "https://www.bbc.co.uk/bitesize/subjects/zqhs34j" },
      { title: "MathsGenie", url: "https://www.mathsgenie.co.uk" }
    ]
  },
  {
    subjectId: "y9-english",
    welcomeLetter: "Welcome to Year 9 English! This is an exciting year where you'll explore powerful literature, develop your own voice as a writer, and learn to analyse texts with greater depth and sophistication.",
    overview: "Year 9 English covers reading, writing, and spoken language. You'll study novels, poetry, Shakespeare, and non-fiction texts. You'll also develop creative writing skills and learn to craft compelling arguments.",
    whyStudy: ["Improves communication skills essential for any career", "Develops critical thinking and analytical abilities", "Explores human experiences and different perspectives", "Prepares you for GCSE English Literature and Language"],
    careerPaths: ["Journalist", "Lawyer", "Teacher", "Marketing Manager", "Author", "Publisher"],
    examStructure: "Assessments include creative writing pieces, analytical essays, reading comprehension tests, and a spoken language presentation.",
    topTips: ["Read widely - books, articles, and quality journalism", "Keep a vocabulary notebook to collect new words", "Plan your writing before you start", "Quote evidence from texts to support your points", "Check SPaG (Spelling, Punctuation, and Grammar) carefully"],
    resources: [
      { title: "BBC Bitesize English", url: "https://www.bbc.co.uk/bitesize/subjects/z3kw2hv" },
      { title: "SparkNotes", url: "https://www.sparknotes.com" },
      { title: "Poetry Foundation", url: "https://www.poetryfoundation.org" }
    ]
  },
  {
    subjectId: "y9-science",
    welcomeLetter: "Welcome to Year 9 Science! This year brings together Biology, Chemistry, and Physics as you begin your journey toward GCSE Science. You'll conduct experiments, investigate phenomena, and understand how science shapes our world.",
    overview: "Year 9 Science covers fundamental concepts across all three sciences: cells and organisms, atoms and reactions, forces and energy. You'll develop practical skills and learn to think scientifically.",
    whyStudy: ["Helps you understand the world around you", "Develops analytical and investigative skills", "Essential for many career paths", "Prepares you for GCSE Combined or Triple Science"],
    careerPaths: ["Doctor", "Pharmacist", "Environmental Scientist", "Engineer", "Research Scientist", "Veterinarian"],
    examStructure: "You'll complete topic tests, required practical assessments, and end-of-year exams covering all three sciences.",
    topTips: ["Learn key definitions by heart", "Practice drawing and labelling diagrams", "Revise little and often - science has lots of content", "Watch science documentaries to broaden your understanding", "Always review practical write-ups carefully"],
    resources: [
      { title: "BBC Bitesize Science", url: "https://www.bbc.co.uk/bitesize/subjects/zng4d2p" },
      { title: "Free Science Lessons", url: "https://www.freesciencelessons.co.uk" },
      { title: "STEM Learning", url: "https://www.stem.org.uk" }
    ]
  },
  {
    subjectId: "y9-history",
    welcomeLetter: "Welcome to Year 9 History! This year we explore some of the most significant and challenging periods in modern history. Understanding the past helps us make sense of the present and shape a better future.",
    overview: "Year 9 History covers World War I, the interwar period, World War II, and the Cold War. You'll develop skills in source analysis, historical interpretation, and essay writing.",
    whyStudy: ["Understand how the modern world was shaped", "Develop critical thinking and analytical skills", "Learn from past mistakes and successes", "Improve research and essay writing abilities"],
    careerPaths: ["Historian", "Archaeologist", "Museum Curator", "Lawyer", "Journalist", "Teacher"],
    examStructure: "Assessments include source analysis exercises, essays, and end-of-topic tests focusing on knowledge and interpretation.",
    topTips: ["Create timelines to visualise events chronologically", "Learn key dates and facts using flashcards", "Practice writing PEEL paragraphs (Point, Evidence, Explain, Link)", "Read around the subject - watch documentaries and read books", "Consider different perspectives on historical events"],
    resources: [
      { title: "BBC Bitesize History", url: "https://www.bbc.co.uk/bitesize/subjects/z7svcdm" },
      { title: "History Learning Site", url: "http://www.historylearningsite.co.uk" },
      { title: "Imperial War Museum", url: "https://www.iwm.org.uk" }
    ]
  },
  {
    subjectId: "maths",
    welcomeLetter: "Welcome to GCSE Mathematics! This is one of the most important qualifications you'll achieve, providing essential skills for further education, employment, and everyday life. We'll develop your mathematical fluency, reasoning, and problem-solving abilities.",
    overview: "GCSE Maths covers Number, Algebra, Ratio and Proportion, Geometry and Measures, Probability, and Statistics. You'll learn to apply mathematical techniques to solve real-world problems.",
    whyStudy: ["Required by most employers and universities", "Develops logical thinking and problem-solving", "Essential for A-level subjects like Physics and Economics", "Valuable life skills for finance and decision-making"],
    careerPaths: ["Accountant", "Engineer", "Data Analyst", "Software Developer", "Architect", "Statistician", "Actuary"],
    examStructure: "Three exam papers at the end of Year 11: Paper 1 (Non-Calculator), Paper 2 (Calculator), and Paper 3 (Calculator). Each paper is 1 hour 30 minutes.",
    topTips: ["Use the specification to check what you need to know", "Practice past papers under timed conditions", "Learn formulas - make flashcards!", "Show all working - method marks are crucial", "Use Corbettmaths 5-a-day for daily practice"],
    resources: [
      { title: "Corbettmaths", url: "https://corbettmaths.com" },
      { title: "Physics & Maths Tutor", url: "https://www.physicsandmathstutor.com" },
      { title: "MathsGenie", url: "https://www.mathsgenie.co.uk" },
      { title: "Dr Frost Maths", url: "https://www.drfrostmaths.com" }
    ]
  },
  {
    subjectId: "english",
    welcomeLetter: "Welcome to GCSE English Literature and Language! This course will develop your analytical skills, creativity, and appreciation of literature. You'll study powerful texts, craft your own writing, and become a more confident communicator.",
    overview: "You'll study Shakespeare, a 19th-century novel, modern prose, and poetry. For Language, you'll analyse unseen texts and develop creative and transactional writing skills.",
    whyStudy: ["Universities and employers highly value English", "Develops communication and analytical skills", "Explores important themes and human experiences", "Prepares you for A-levels and beyond"],
    careerPaths: ["Journalist", "Lawyer", "Teacher", "Copywriter", "Editor", "Marketing Professional", "PR Consultant"],
    examStructure: "Two Literature papers and two Language papers, all sat at the end of Year 11. Plus a Spoken Language endorsement.",
    topTips: ["Learn key quotes with context (before, during, after)", "Practice planning essays in 5 minutes", "Read your set texts multiple times", "Use PETAL structure for analysis", "Wider reading strengthens your understanding"],
    resources: [
      { title: "SparkNotes", url: "https://www.sparknotes.com" },
      { title: "Mr Bruff YouTube", url: "https://www.youtube.com/user/mrbruff" },
      { title: "BBC Bitesize GCSE English", url: "https://www.bbc.co.uk/bitesize/subjects/zr9dmnb" }
    ]
  },
  {
    subjectId: "science",
    welcomeLetter: "Welcome to GCSE Science! Whether you're taking Combined or Triple Science, this course will deepen your understanding of the natural world and develop your scientific thinking. You'll conduct practical investigations and learn to evaluate scientific evidence.",
    overview: "GCSE Science covers Biology, Chemistry, and Physics topics including cells, genetics, atomic structure, chemical reactions, energy, and forces. You'll complete required practicals throughout the course.",
    whyStudy: ["Essential for healthcare, engineering, and research careers", "Develops analytical and practical skills", "Helps you understand current issues like climate change", "Required for many A-level and university courses"],
    careerPaths: ["Doctor", "Nurse", "Pharmacist", "Biomedical Scientist", "Chemical Engineer", "Environmental Consultant", "Research Scientist"],
    examStructure: "Six papers for Combined Science (two per subject) or nine papers for Triple Science. All include questions on required practicals.",
    topTips: ["Learn definitions precisely - marks are lost for vague answers", "Practice 6-mark questions with clear structure", "Understand required practicals thoroughly", "Use mnemonics for sequences (like reactivity series)", "Watch Free Science Lessons on YouTube"],
    resources: [
      { title: "Free Science Lessons", url: "https://www.freesciencelessons.co.uk" },
      { title: "Physics & Maths Tutor", url: "https://www.physicsandmathstutor.com" },
      { title: "Cognito", url: "https://cognitoresources.org" },
      { title: "Primrose Kitten", url: "https://www.youtube.com/c/PrimroseKitten" }
    ]
  },
  {
    subjectId: "y11-maths",
    welcomeLetter: "Welcome to Year 11 Maths - your GCSE year! This is the final stretch where we consolidate all your learning and prepare you for success in your GCSE exams. We'll focus on exam technique, problem-solving, and mastering the most challenging topics.",
    overview: "Year 11 covers advanced topics across all GCSE areas: complex algebra, trigonometry, circle theorems, vectors, and more. We'll also dedicate significant time to exam preparation and past paper practice.",
    whyStudy: ["GCSE Maths is essential for most career paths", "Develops critical thinking and logic", "Required for A-level Maths and Sciences", "Highly valued by employers and universities"],
    careerPaths: ["Engineer", "Data Scientist", "Financial Analyst", "Software Developer", "Architect", "Statistician", "Economist"],
    examStructure: "Three papers in May/June: Paper 1 (Non-Calculator), Papers 2 & 3 (Calculator). All 1 hour 30 minutes. Foundation (grades 1-5) or Higher (grades 4-9).",
    topTips: ["Complete at least one past paper per week", "Make a formula sheet and learn it by heart", "Focus on your target grade topics", "Use the mark scheme to understand what examiners want", "Don't panic - consistent practice builds confidence"],
    resources: [
      { title: "Corbettmaths 5-a-day", url: "https://corbettmaths.com/5-a-day/" },
      { title: "MathsGenie Predicted Papers", url: "https://www.mathsgenie.co.uk" },
      { title: "OnMaths Practice Exams", url: "https://www.onmaths.com" }
    ]
  },
  {
    subjectId: "y11-english",
    welcomeLetter: "Welcome to Year 11 English! This is your GCSE year where all your preparation comes together. We'll refine your analytical skills, perfect your essay technique, and ensure you're confident for both Literature and Language exams.",
    overview: "Year 11 focuses on revising set texts, practicing unseen analysis, and honing writing skills. You'll memorize key quotes, practice exam questions, and develop sophisticated analytical approaches.",
    whyStudy: ["English GCSE is required by all universities and employers", "Develops communication skills essential for any career", "Deepens understanding of literature and language", "Prepares you for A-level English and essay-based subjects"],
    careerPaths: ["Journalist", "Lawyer", "Teacher", "Marketing Director", "Editor", "Publisher", "Screenwriter"],
    examStructure: "Four exam papers: Literature Paper 1 (Shakespeare & 19th Century), Literature Paper 2 (Modern Texts & Poetry), Language Paper 1 (Creative), Language Paper 2 (Non-fiction). All closed book.",
    topTips: ["Create quote banks for each character and theme", "Practice timing - essays should take about 45-50 minutes", "Learn PETAL or PEEL paragraph structures", "Read the question carefully - answer what is asked!", "Use Mr Bruff and Stacey Reay for revision"],
    resources: [
      { title: "Mr Bruff YouTube", url: "https://www.youtube.com/user/mrbruff" },
      { title: "Stacey Reay YouTube", url: "https://www.youtube.com/c/StaceyReay" },
      { title: "BBC Bitesize", url: "https://www.bbc.co.uk/bitesize/subjects/zr9dmnb" }
    ]
  },
  {
    subjectId: "computerscience",
    welcomeLetter: "Welcome to GCSE Computer Science! This fascinating subject explores how computers work, from the hardware inside them to the software that makes them useful. You'll learn to code and understand the principles that underpin our digital world.",
    overview: "GCSE Computer Science covers computer systems (hardware, software, networks), computational thinking, algorithms, and programming in Python. You'll develop problem-solving skills and create your own programs.",
    whyStudy: ["Essential skill for the modern world", "Opens doors to tech careers", "Develops logical thinking and problem-solving", "No.1 skill employers are looking for"],
    careerPaths: ["Software Developer", "Data Scientist", "Cybersecurity Analyst", "Game Developer", "Web Developer", "AI Engineer", "IT Consultant"],
    examStructure: "Two written exams (Computer Systems and Computational Thinking) plus a programming project where you'll solve problems using Python.",
    topTips: ["Practice programming regularly - little and often", "Use Python Tutor to visualise code execution", "Learn key definitions using flashcards", "Practice trace tables for algorithm questions", "Use Craig'n'Dave for video explanations"],
    resources: [
      { title: "Craig'n'Dave", url: "https://www.craigndave.org" },
      { title: "Python Tutor", url: "https://pythontutor.com" },
      { title: "W3Schools Python", url: "https://www.w3schools.com/python/" }
    ]
  },
];

// Video tutorials data
const subjectVideos: SubjectVideos[] = [
  {
    subjectId: "y9-maths",
    videos: [
      {
        id: "y9-math-v1",
        title: "Introduction to BIDMAS",
        duration: "8:45",
        thumbnail: "https://img.youtube.com/vi/dAgfnK528RA/0.jpg",
        url: "https://www.youtube.com/watch?v=dAgfnK528RA",
        description: "Learn the order of operations with BIDMAS"
      },
      {
        id: "y9-math-v2",
        title: "Fractions Made Easy",
        duration: "12:30",
        thumbnail: "https://img.youtube.com/vi/5juto2ze8Lg/0.jpg",
        url: "https://www.youtube.com/watch?v=5juto2ze8Lg",
        description: "Master adding, subtracting, multiplying and dividing fractions"
      },
      {
        id: "y9-math-v3",
        title: "Basic Algebra - Solving Equations",
        duration: "15:20",
        thumbnail: "https://img.youtube.com/vi/NybHckSEQBI/0.jpg",
        url: "https://www.youtube.com/watch?v=NybHckSEQBI",
        description: "Step-by-step guide to solving simple algebraic equations"
      },
    ]
  },
  {
    subjectId: "y9-science",
    videos: [
      {
        id: "y9-sci-v1",
        title: "Cell Structure and Function",
        duration: "10:15",
        thumbnail: "https://img.youtube.com/vi/URUJD5NEXC8/0.jpg",
        url: "https://www.youtube.com/watch?v=URUJD5NEXC8",
        description: "Explore the parts of a cell and what they do"
      },
      {
        id: "y9-sci-v2",
        title: "States of Matter",
        duration: "9:40",
        thumbnail: "https://img.youtube.com/vi/wClQXiN2apE/0.jpg",
        url: "https://www.youtube.com/watch?v=wClQXiN2apE",
        description: "Learn about solids, liquids, and gases"
      },
      {
        id: "y9-sci-v3",
        title: "Forces and Motion Basics",
        duration: "11:25",
        thumbnail: "https://img.youtube.com/vi/ioYNZ5qFoDk/0.jpg",
        url: "https://www.youtube.com/watch?v=ioYNZ5qFoDk",
        description: "Introduction to Newton's Laws of Motion"
      },
    ]
  },
  {
    subjectId: "y9-english",
    videos: [
      {
        id: "y9-eng-v1",
        title: "How to Analyze Poetry",
        duration: "14:10",
        thumbnail: "https://img.youtube.com/vi/8tOhr6Oo8Uo/0.jpg",
        url: "https://www.youtube.com/watch?v=8tOhr6Oo8Uo",
        description: "Techniques for understanding and analyzing poems"
      },
      {
        id: "y9-eng-v2",
        title: "Creative Writing Tips",
        duration: "16:45",
        thumbnail: "https://img.youtube.com/vi/UiNSFsE7VSc/0.jpg",
        url: "https://www.youtube.com/watch?v=UiNSFsE7VSc",
        description: "Improve your story writing skills"
      },
    ]
  },
  {
    subjectId: "y9-history",
    videos: [
      {
        id: "y9-hist-v1",
        title: "Causes of World War I",
        duration: "13:30",
        thumbnail: "https://img.youtube.com/vi/dHSQAEao3vQ/0.jpg",
        url: "https://www.youtube.com/watch?v=dHSQAEao3vQ",
        description: "Understanding why WWI started"
      },
      {
        id: "y9-hist-v2",
        title: "The Holocaust Explained",
        duration: "18:20",
        thumbnail: "https://img.youtube.com/vi/3sdS51Gs1LE/0.jpg",
        url: "https://www.youtube.com/watch?v=3sdS51Gs1LE",
        description: "Learning about this important historical event"
      },
    ]
  },
  {
    subjectId: "maths",
    videos: [
      {
        id: "y10-math-v1",
        title: "GCSE Maths - Quadratic Equations",
        duration: "20:15",
        thumbnail: "https://img.youtube.com/vi/IKyUuvulM7Q/0.jpg",
        url: "https://www.youtube.com/watch?v=IKyUuvulM7Q",
        description: "Complete guide to solving quadratics for GCSE"
      },
      {
        id: "y10-math-v2",
        title: "Trigonometry SOH CAH TOA",
        duration: "17:40",
        thumbnail: "https://img.youtube.com/vi/5S2ZrVJhPVU/0.jpg",
        url: "https://www.youtube.com/watch?v=5S2ZrVJhPVU",
        description: "Master trigonometry for your exams"
      },
      {
        id: "y10-math-v3",
        title: "Probability Trees",
        duration: "14:25",
        thumbnail: "https://img.youtube.com/vi/4Bf2pEQ7rhg/0.jpg",
        url: "https://www.youtube.com/watch?v=4Bf2pEQ7rhg",
        description: "How to solve probability problems"
      },
    ]
  },
  {
    subjectId: "science",
    videos: [
      {
        id: "y10-sci-v1",
        title: "DNA and Genetics",
        duration: "19:30",
        thumbnail: "https://img.youtube.com/vi/8kK2E0wD3_g/0.jpg",
        url: "https://www.youtube.com/watch?v=8kK2E0wD3_g",
        description: "Understanding DNA structure and inheritance"
      },
      {
        id: "y10-sci-v2",
        title: "Chemical Reactions",
        duration: "16:50",
        thumbnail: "https://img.youtube.com/vi/0z0i0n_7E0Q/0.jpg",
        url: "https://www.youtube.com/watch?v=0z0i0n_7E0Q",
        description: "Types of chemical reactions explained"
      },
      {
        id: "y10-sci-v3",
        title: "Electricity and Circuits",
        duration: "22:10",
        thumbnail: "https://img.youtube.com/vi/9UKGPOwRbxw/0.jpg",
        url: "https://www.youtube.com/watch?v=9UKGPOwRbxw",
        description: "Physics electricity revision"
      },
    ]
  },
  {
    subjectId: "english",
    videos: [
      {
        id: "y10-eng-v1",
        title: "Romeo and Juliet Summary",
        duration: "25:40",
        thumbnail: "https://img.youtube.com/vi/5PwkK8FbK3c/0.jpg",
        url: "https://www.youtube.com/watch?v=5PwkK8FbK3c",
        description: "Complete play analysis for GCSE"
      },
      {
        id: "y10-eng-v2",
        title: "An Inspector Calls Analysis",
        duration: "28:15",
        thumbnail: "https://img.youtube.com/vi/4jXUvqrinA8/0.jpg",
        url: "https://www.youtube.com/watch?v=4jXUvqrinA8",
        description: "Character and theme analysis"
      },
    ]
  },
  {
    subjectId: "computerscience",
    videos: [
      {
        id: "y10-cs-v1",
        title: "Binary and Hexadecimal",
        duration: "18:30",
        thumbnail: "https://img.youtube.com/vi/LpuPe81bc2w/0.jpg",
        url: "https://www.youtube.com/watch?v=LpuPe81bc2w",
        description: "Number systems for computer science"
      },
      {
        id: "y10-cs-v2",
        title: "Python Programming Basics",
        duration: "30:45",
        thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/0.jpg",
        url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        description: "Learn Python from scratch"
      },
    ]
  },
];

const studyTips = [
  { title: "Pomodoro Technique", description: "Study for 25 minutes, then take a 5-minute break. Repeat 4 times.", icon: <Clock className="w-6 h-6 text-pink-500" /> },
  { title: "Active Recall", description: "Test yourself without looking at notes. This strengthens memory.", icon: <Target className="w-6 h-6 text-pink-500" /> },
  { title: "Spaced Repetition", description: "Review material at increasing intervals for long-term memory.", icon: <Calendar className="w-6 h-6 text-pink-500" /> },
  { title: "Practice Papers", description: "Do past exam papers under timed conditions to build confidence.", icon: <CheckCircle className="w-6 h-6 text-pink-500" /> },
];

const mockTips = [
  { title: "Time Management", description: "Allocate 1 minute per mark. Don't spend too long on one question!", icon: <Clock className="w-6 h-6 text-pink-500" /> },
  { title: "Read Carefully", description: "Read the question twice. Underline command words like 'Explain' or 'Evaluate'.", icon: <BookOpen className="w-6 h-6 text-pink-500" /> },
  { title: "Show Working", description: "Always show your working in Maths and Science - you get marks for method!", icon: <Calculator className="w-6 h-6 text-pink-500" /> },
  { title: "Check Answers", description: "Use any spare time to check your answers and fill in missing questions.", icon: <CheckCircle className="w-6 h-6 text-pink-500" /> },
];

const y9MathsRevisionGuide = {
  topics: [
    { title: "Number Skills", points: ["BIDMAS - Order of operations", "Fractions: adding, subtracting, multiplying, dividing", "Percentages of amounts", "Rounding to significant figures"] },
    { title: "Algebra Basics", points: ["Simplifying expressions", "Solving simple equations", "Substituting values", "Expanding single brackets"] },
    { title: "Geometry & Measure", points: ["Area of rectangles and triangles", "Angles in triangles and quadrilaterals", "Metric conversions", "Reading scales"] },
    { title: "Data Handling", points: ["Mean, median, mode, range", "Reading bar charts and pie charts", "Probability basics", "Tally charts and tables"] },
  ],
  examTips: [
    "Always check your calculations - easy marks are lost through careless errors",
    "Show your working clearly - even if your final answer is wrong, you can get method marks",
    "Use a pencil for diagrams and graphs so you can rub out mistakes",
    "Read the scale on graphs carefully - check what each square represents",
  ]
};

const y9EnglishRevisionGuide = {
  topics: [
    { title: "Reading Skills", points: ["Finding explicit information (PQE: Point, Quote, Explain)", "Reading between the lines - inference", "Understanding writer's techniques", "Summarising main points"] },
    { title: "Writing Skills", points: ["Using varied sentence openers", "Including descriptive language (similes, metaphors)", "Paragraph structure (TIPE: Topic, Information, Point, Evidence)", "Checking spelling, punctuation and grammar"] },
    { title: "Grammar & SPaG", points: ["Full stops, commas, apostrophes", "Capital letters for proper nouns", "Paragraph breaks for new topics", "Spelling strategies: breaking words down"] },
  ],
  examTips: [
    "For reading: Always quote evidence from the text to support your answer",
    "For writing: Plan your story or article before you start - use a spider diagram",
    "Leave 5 minutes at the end to check your SPaG (Spelling, Punctuation and Grammar)",
    "Use the reading time wisely - skim read first, then read questions, then scan for answers",
  ]
};

const quotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Don't watch the clock; do what it does. Keep going.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
];

// Mock Papers View Component with Topic Filtering
function MockPapersView({ 
  subject, 
  mockPapers, 
  colors 
}: { 
  subject: Subject; 
  mockPapers: MockPaper[]; 
  colors: { primaryText: string; gradient: string; primary: string; primaryHover: string; primaryLight: string; };
}) {
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"byPaper" | "byTopic">("byPaper");

  // Get all unique topics from mock papers
  const allTopics = Array.from(new Set(mockPapers.flatMap(p => p.topics))).sort();

  // Filter papers by selected topic
  const filteredPapers = selectedTopicFilter 
    ? mockPapers.filter(p => p.topics.includes(selectedTopicFilter))
    : mockPapers;

  // Group papers by topic for "byTopic" view
  const papersByTopic = allTopics.map(topic => ({
    topic,
    papers: mockPapers.filter(p => p.topics.includes(topic))
  })).filter(g => g.papers.length > 0);

  if (mockPapers.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className={`w-16 h-16 ${colors.primaryLight} ${colors.primaryText} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Trophy className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Mock Papers Coming Soon!</h3>
        <p className="text-slate-500">Mock exam papers for {subject.name} will be added soon.</p>
      </div>
    );
  }

  return (
    <>
      {/* Header with View Toggle */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-slate-900">Mock Exam Papers</h3>
            <p className="text-sm text-slate-500">Practice with past exam papers under timed conditions</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("byPaper")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === "byPaper" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              By Paper
            </button>
            <button
              onClick={() => setViewMode("byTopic")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === "byTopic" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              By Topic
            </button>
          </div>
        </div>

        {/* Topic Filter */}
        {allTopics.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Filter by Topic</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTopicFilter(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedTopicFilter === null
                    ? "bg-pink-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Topics
              </button>
              {allTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopicFilter(topic === selectedTopicFilter ? null : topic)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedTopicFilter === topic
                      ? "bg-pink-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Papers View */}
      {viewMode === "byPaper" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-rose-50">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-pink-500" />
              Available Papers ({filteredPapers.length})
            </h3>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {filteredPapers.map((paper) => (
                <div key={paper.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-pink-300 transition-colors group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    paper.difficulty === "Higher" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                  }`}>
                    <span className="text-xs font-bold">{paper.difficulty === "Higher" ? "H" : "F"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900">{paper.title}</h4>
                    <p className="text-sm text-slate-500">{paper.examBoard} • {paper.year} • {paper.paper}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {paper.topics.map((topic, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTopicFilter(topic)}
                          className={`text-xs px-2 py-0.5 rounded border transition-all ${
                            selectedTopicFilter === topic
                              ? "bg-pink-500 text-white border-pink-500"
                              : "bg-white border-gray-200 text-slate-600 hover:border-pink-300"
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors flex-shrink-0"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {papersByTopic
            .filter(g => selectedTopicFilter === null || g.topic === selectedTopicFilter)
            .map(({ topic, papers }) => (
            <div key={topic} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  {topic}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{papers.length} paper{papers.length !== 1 ? 's' : ''} cover this topic</p>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {papers.map((paper) => (
                    <div key={paper.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-pink-300 transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        paper.difficulty === "Higher" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                      }`}>
                        {paper.difficulty === "Higher" ? "H" : "F"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 text-sm truncate">{paper.title}</p>
                        <p className="text-xs text-slate-500">{paper.examBoard} • {paper.year}</p>
                      </div>
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-pink-500 text-white rounded-lg text-xs font-medium hover:bg-pink-600 transition-colors flex-shrink-0"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Revision Topic List Summary */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 mb-6">
        <h3 className="font-semibold text-emerald-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> Revision Checklist
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subject.topics.map((topic, idx) => {
            const topicPapers = mockPapers.filter(p => 
              p.topics.some(t => topic.name.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(topic.name.toLowerCase()))
            );
            return (
              <div key={idx} className="flex items-start gap-3 bg-white/70 rounded-xl p-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">{idx + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700">{topic.name}</p>
                  {topicPapers.length > 0 && (
                    <p className="text-xs text-emerald-600 mt-1">
                      {topicPapers.length} mock paper{topicPapers.length !== 1 ? 's' : ''} available
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function RevisionHelper() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [studyStreak, setStudyStreak] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState<9 | 10 | 11>(9);
  const [activeTab, setActiveTab] = useState<"about" | "topics" | "quiz" | "videos" | "mocks">("about");
  
  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

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

  // Pink theme colors
  const colors = {
    primary: "bg-pink-500",
    primaryHover: "hover:bg-pink-600",
    primaryLight: "bg-pink-100",
    primaryText: "text-pink-500",
    gradient: "from-pink-400 to-rose-400",
    border: "hover:border-pink-200",
  };

  const progress = selectedSubject
    ? Math.round((completedTopics.filter((t) => selectedSubject.topics.map(st => st.name).includes(t)).length / selectedSubject.topics.length) * 100)
    : 0;

  const yearSubjects = subjects.filter((s) => s.yearGroup === selectedYear);
  const totalProgress = Math.round((completedTopics.length / yearSubjects.reduce((acc, s) => acc + s.topics.length, 0)) * 100);

  // Quiz functions
  const getSubjectQuizzes = (subjectId: string | undefined): Quiz[] => {
    if (!subjectId) return [];
    const subjectQuiz = subjectQuizzes.find((sq) => sq.subjectId === subjectId);
    return subjectQuiz?.quizzes || [];
  };

  // Video functions
  const getSubjectVideos = (subjectId: string | undefined): VideoTutorial[] => {
    if (!subjectId) return [];
    const subjectVideo = subjectVideos.find((sv) => sv.subjectId === subjectId);
    return subjectVideo?.videos || [];
  };

  // Mock papers function
  const getSubjectMockPapers = (subjectId: string | undefined): MockPaper[] => {
    if (!subjectId) return [];
    const subjectMock = mockPapers.find((sm) => sm.subjectId === subjectId);
    return subjectMock?.papers || [];
  };

  // Subject info function
  const getSubjectInfo = (subjectId: string | undefined): SubjectInfo | null => {
    if (!subjectId) return null;
    return subjectInfoData.find((si) => si.subjectId === subjectId) || null;
  };

  const startQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizScore(0);
    setQuizCompleted(false);
    setActiveTab("quiz");
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    const quizzes = getSubjectQuizzes(selectedSubject?.id);
    if (quizzes[currentQuizIndex] && answerIndex === quizzes[currentQuizIndex].correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    const quizzes = getSubjectQuizzes(selectedSubject?.id);
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

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
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-9 h-9 bg-gradient-to-br ${colors.gradient} rounded-lg flex items-center justify-center`}>
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">StudyHub</h1>
              <p className="text-xs text-slate-400">Year {selectedYear} Revision</p>
            </div>
          </div>

          {/* Streak Card */}
          <div className={`bg-gradient-to-br ${colors.gradient} rounded-xl p-4 mb-4`}>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-white" />
              <span className="text-xs font-medium text-white/80">Study Streak</span>
            </div>
            <p className="text-2xl font-bold text-white">{studyStreak} days</p>
            <p className="text-xs text-white/80 mt-1">Keep it going! 🔥</p>
          </div>

          {/* Year Selector */}
          <div className="mb-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 px-2">Year Group</p>
            <div className="grid grid-cols-3 gap-2 px-2">
              <button
                onClick={() => { setSelectedYear(9); setSelectedSubject(null); setActiveTab("about"); }}
                className={`py-2 px-2 rounded-lg text-sm font-medium transition-all ${
                  selectedYear === 9
                    ? "bg-pink-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Y9
              </button>
              <button
                onClick={() => { setSelectedYear(10); setSelectedSubject(null); setActiveTab("about"); }}
                className={`py-2 px-2 rounded-lg text-sm font-medium transition-all ${
                  selectedYear === 10
                    ? "bg-pink-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Y10
              </button>
              <button
                onClick={() => { setSelectedYear(11); setSelectedSubject(null); setActiveTab("about"); }}
                className={`py-2 px-2 rounded-lg text-sm font-medium transition-all ${
                  selectedYear === 11
                    ? "bg-pink-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Y11
              </button>
            </div>
          </div>

          {/* Subject List */}
          <nav>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 px-2">Subjects</p>
            <div className="space-y-1 max-h-[320px] overflow-y-auto">
              {yearSubjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => { setSelectedSubject(subject); setSidebarOpen(false); setActiveTab("about"); }}
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
            <div className="flex items-center gap-3">
              {selectedSubject && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("about")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "about" ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" /> About
                  </button>
                  <button
                    onClick={() => setActiveTab("topics")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "topics" ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" /> Topics
                  </button>
                  {getSubjectVideos(selectedSubject.id).length > 0 && (
                    <button
                      onClick={() => setActiveTab("videos")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "videos" ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                      }`}
                    >
                      <Video className="w-4 h-4" /> Videos
                    </button>
                  )}
                  {getSubjectQuizzes(selectedSubject.id).length > 0 && (
                    <button
                      onClick={() => setActiveTab("quiz")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "quiz" ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                      }`}
                    >
                      <HelpCircle className="w-4 h-4" /> Quiz
                    </button>
                  )}
                  {getSubjectMockPapers(selectedSubject.id).length > 0 && (
                    <button
                      onClick={() => setActiveTab("mocks")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "mocks" ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                      }`}
                    >
                      <Trophy className="w-4 h-4" /> Mocks
                    </button>
                  )}
                </div>
              )}
              {selectedSubject?.examBoard && (
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                  {selectedSubject.examBoard}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-8">
          {selectedSubject ? (
            <div className="max-w-4xl mx-auto">
              {/* Progress */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900">Your Progress</h3>
                  <span className={`text-3xl font-bold ${colors.primaryText}`}>{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3">
                  <div className={`bg-gradient-to-r ${colors.gradient} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${progress}%` }} />
                </div>
                <p className="text-sm text-slate-500">
                  {completedTopics.filter((t) => selectedSubject.topics.map(st => st.name).includes(t)).length} of {selectedSubject.topics.length} topics completed
                </p>
              </div>

              {activeTab === "about" && (
                <>
                  {/* About / Information Letter */}
                  {(() => {
                    const info = getSubjectInfo(selectedSubject.id);
                    if (!info) return (
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="w-8 h-8 text-pink-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Subject Information</h3>
                        <p className="text-slate-500">Detailed information for this subject is coming soon!</p>
                      </div>
                    );
                    return (
                      <>
                        {/* Welcome Letter */}
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200 mb-6">
                          <h3 className="text-xl font-bold text-pink-900 mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5" /> Welcome to {selectedSubject.name}
                          </h3>
                          <p className="text-slate-700 leading-relaxed mb-4">{info.welcomeLetter}</p>
                          <div className="bg-white/60 rounded-xl p-4">
                            <h4 className="font-semibold text-pink-900 text-sm mb-2">📚 Subject Overview</h4>
                            <p className="text-sm text-slate-700">{info.overview}</p>
                          </div>
                        </div>

                        {/* Why Study This Subject */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-pink-500" /> Why Study {selectedSubject.name}?
                          </h3>
                          <ul className="space-y-2">
                            {info.whyStudy.map((reason, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{idx + 1}</span>
                                <span className="text-slate-700">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Career Paths */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-pink-500" /> Career Paths
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {info.careerPaths.map((career, idx) => (
                              <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm">
                                {career}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Exam Structure */}
                        {info.examStructure && (
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 mb-6">
                            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                              <Trophy className="w-5 h-5" /> Assessment & Exams
                            </h3>
                            <p className="text-slate-700 text-sm">{info.examStructure}</p>
                          </div>
                        )}

                        {/* Top Tips */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 mb-6">
                          <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5" /> Top Tips for Success
                          </h3>
                          <ul className="space-y-2">
                            {info.topTips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-amber-500 mt-0.5">💡</span>
                                <span className="text-slate-700">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Resources */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <ExternalLink className="w-5 h-5 text-pink-500" /> Useful Resources
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {info.resources.map((resource, idx) => (
                              <a
                                key={idx}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-pink-50 rounded-xl transition-colors group"
                              >
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                                  <ExternalLink className="w-4 h-4 text-pink-500" />
                                </div>
                                <span className="text-sm font-medium text-slate-700 group-hover:text-pink-700">{resource.title}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </>
              )}

              {activeTab === "topics" && (
                <>
                  {/* Topics -->
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">Topics</h3>
                      <span className="text-xs text-slate-500">Mark as you revise</span>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {selectedSubject.topics.map((topic, index) => {
                        const isCompleted = completedTopics.includes(topic.name);
                        return (
                          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4 mb-2">
                              <button
                                onClick={() => toggleTopic(topic.name)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                  isCompleted 
                                    ? "bg-pink-500 border-pink-500"
                                    : "border-gray-300 hover:border-pink-400"
                                }`}
                              >
                                {isCompleted && <CheckCircle className="w-4 h-4 text-white" />}
                              </button>
                              <span className={`flex-1 text-sm font-medium ${isCompleted ? "line-through text-gray-400" : "text-slate-700"}`}>
                                {topic.name}
                              </span>
                            </div>
                            {topic.revisionLinks.length > 0 && (
                              <div className="ml-10 flex flex-wrap gap-2">
                                {topic.revisionLinks.map((link, linkIdx) => (
                                  <a
                                    key={linkIdx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs hover:bg-blue-100 transition-colors"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    {link.title}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {getSubjectVideos(selectedSubject.id).length > 0 && (
                      <button
                        onClick={() => setActiveTab("videos")}
                        className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md hover:border-pink-200 transition-all text-left"
                      >
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                          <Video className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Video Tutorials</h4>
                          <p className="text-sm text-slate-500">{getSubjectVideos(selectedSubject.id).length} videos available</p>
                        </div>
                      </button>
                    )}
                    {getSubjectQuizzes(selectedSubject.id).length > 0 && (
                      <button
                        onClick={startQuiz}
                        className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-md hover:border-pink-200 transition-all text-left"
                      >
                        <div className={`w-12 h-12 ${colors.primaryLight} rounded-xl flex items-center justify-center`}>
                          <Brain className={`w-6 h-6 ${colors.primaryText}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Take a Quiz</h4>
                          <p className="text-sm text-slate-500">{getSubjectQuizzes(selectedSubject.id).length} questions to test yourself</p>
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setCompletedTopics([...completedTopics, ...selectedSubject.topics.map(t => t.name).filter((t) => !completedTopics.includes(t))])}
                      className={`flex-1 ${colors.primary} ${colors.primaryHover} text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm`}
                    >
                      Mark All Complete
                    </button>
                    <button
                      onClick={() => setCompletedTopics(completedTopics.filter((t) => !selectedSubject.topics.map(st => st.name).includes(t)))}
                      className="flex-1 bg-white hover:bg-gray-50 text-slate-700 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm border border-gray-200"
                    >
                      Reset
                    </button>
                  </div>
                </>
              )}

              {activeTab === "videos" && (
                <>
                  {/* Videos Section */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100">
                      <h3 className="font-semibold text-slate-900">Video Tutorials</h3>
                      <p className="text-sm text-slate-500">Learn visually with these curated videos</p>
                    </div>
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getSubjectVideos(selectedSubject.id).map((video) => (
                          <a
                            key={video.id}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all border border-gray-200 hover:border-pink-300"
                          >
                            <div className="relative aspect-video bg-gray-200 overflow-hidden">
                              <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' fill='%23f3f4f6'%3E%3Crect width='320' height='180' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='16'%3EVideo Thumbnail%3C/text%3E%3C/svg%3E";
                                }}
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center">
                                  <Play className="w-6 h-6 text-white ml-1" fill="white" />
                                </div>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {video.duration}
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold text-slate-900 mb-1 line-clamp-2 group-hover:text-pink-600 transition-colors">
                                {video.title}
                              </h4>
                              <p className="text-sm text-slate-500 line-clamp-2">{video.description}</p>
                              <div className="flex items-center gap-1 mt-3 text-pink-500 text-sm font-medium">
                                <ExternalLink className="w-4 h-4" />
                                Watch on YouTube
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setActiveTab("topics")}
                    className="mt-6 flex items-center gap-2 text-slate-600 hover:text-pink-500 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Topics
                  </button>
                </>
              )}

              {activeTab === "quiz" && (
                <>
                  {/* Quiz Section */}
                  {getSubjectQuizzes(selectedSubject.id).length > 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      {!quizCompleted ? (
                        <>
                          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-slate-900">Quiz Time!</h3>
                              <p className="text-xs text-slate-500">Question {currentQuizIndex + 1} of {getSubjectQuizzes(selectedSubject.id).length}</p>
                            </div>
                            <div className={`${colors.primaryLight} ${colors.primaryText} px-3 py-1 rounded-full text-sm font-medium`}>
                              Score: {quizScore}
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <h4 className="text-lg font-medium text-slate-900 mb-4">
                              {getSubjectQuizzes(selectedSubject.id)[currentQuizIndex]?.question}
                            </h4>
                            
                            <div className="space-y-3 mb-6">
                              {getSubjectQuizzes(selectedSubject.id)[currentQuizIndex]?.options.map((option, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleAnswerSelect(idx)}
                                  disabled={selectedAnswer !== null}
                                  className={`w-full p-4 rounded-xl text-left border-2 transition-all ${
                                    selectedAnswer === null
                                      ? "border-gray-200 hover:border-gray-300"
                                      : selectedAnswer === idx
                                        ? idx === getSubjectQuizzes(selectedSubject.id)[currentQuizIndex]?.correctAnswer
                                          ? "border-emerald-500 bg-emerald-50"
                                          : "border-red-500 bg-red-50"
                                        : idx === getSubjectQuizzes(selectedSubject.id)[currentQuizIndex]?.correctAnswer
                                          ? "border-emerald-500 bg-emerald-50"
                                          : "border-gray-200"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                                      selectedAnswer === null
                                        ? "bg-gray-100 text-gray-600"
                                        : selectedAnswer === idx
                                          ? idx === getSubjectQuizzes(selectedSubject.id)[currentQuizIndex]?.correctAnswer
                                            ? "bg-emerald-500 text-white"
                                            : "bg-red-500 text-white"
                                          : idx === getSubjectQuizzes(selectedSubject.id)[currentQuizIndex]?.correctAnswer
                                            ? "bg-emerald-500 text-white"
                                            : "bg-gray-100 text-gray-600"
                                    }`}>
                                      {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span className="flex-1">{option}</span>
                                  </div>
                                </button>
                              ))}
                            </div>

                            {showExplanation && (
                              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                                <p className="text-sm text-slate-700">
                                  <span className="font-medium">Explanation: </span>
                                  {getSubjectQuizzes(selectedSubject.id)[currentQuizIndex]?.explanation}
                                </p>
                              </div>
                            )}

                            {selectedAnswer !== null && (
                              <button
                                onClick={nextQuestion}
                                className={`w-full ${colors.primary} ${colors.primaryHover} text-white font-medium py-3 px-4 rounded-xl transition-colors`}
                              >
                                {currentQuizIndex < getSubjectQuizzes(selectedSubject.id).length - 1 ? "Next Question" : "See Results"}
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="p-8 text-center">
                          <div className={`w-20 h-20 ${colors.primaryLight} ${colors.primaryText} rounded-full flex items-center justify-center mx-auto mb-4`}>
                            <Trophy className="w-10 h-10" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">Quiz Complete! 🎉</h3>
                          <p className="text-slate-500 mb-6">
                            You scored <span className={`font-bold ${colors.primaryText}`}>{quizScore}</span> out of {getSubjectQuizzes(selectedSubject.id).length}
                          </p>
                          <div className="flex gap-3 justify-center">
                            <button
                              onClick={resetQuiz}
                              className={`flex items-center gap-2 ${colors.primary} ${colors.primaryHover} text-white font-medium py-2.5 px-5 rounded-xl transition-colors`}
                            >
                              <RotateCcw className="w-4 h-4" />
                              Try Again
                            </button>
                            <button
                              onClick={() => setActiveTab("topics")}
                              className="flex items-center gap-2 bg-white border border-gray-200 text-slate-700 font-medium py-2.5 px-5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              Back to Topics
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                      <div className={`w-16 h-16 ${colors.primaryLight} ${colors.primaryText} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Brain className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No Quiz Available Yet</h3>
                      <p className="text-slate-500 mb-4">Quizzes for this subject are coming soon!</p>
                      <button
                        onClick={() => setActiveTab("topics")}
                        className={`${colors.primary} ${colors.primaryHover} text-white font-medium py-2.5 px-5 rounded-xl transition-colors`}
                      >
                        Back to Topics
                      </button>
                    </div>
                  )}
                </>
              )}

              {activeTab === "mocks" && (
                <>
                  {/* Mock Papers Section with Topic Filter */}
                  <MockPapersView 
                    subject={selectedSubject}
                    mockPapers={getSubjectMockPapers(selectedSubject.id)}
                    colors={colors}
                  />

                  {/* Year 9 Specific Revision Guide */}
                  {selectedYear === 9 && selectedSubject?.id === "y9-maths" && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 mb-6">
                      <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                        <Calculator className="w-5 h-5" /> Year 9 Maths Revision Guide
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {y9MathsRevisionGuide.topics.map((topic, idx) => (
                          <div key={idx} className="bg-white/70 rounded-xl p-4">
                            <h4 className="font-medium text-blue-900 text-sm mb-2">{topic.title}</h4>
                            <ul className="text-xs text-blue-700 space-y-1">
                              {topic.points.map((point, pidx) => (
                                <li key={pidx} className="flex items-start gap-2">
                                  <span className="text-pink-500 mt-0.5">•</span> {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 bg-white/50 rounded-xl p-4">
                        <h4 className="font-medium text-blue-900 text-sm mb-2">💡 Exam Tips</h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                          {y9MathsRevisionGuide.examTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-pink-500">✓</span> {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedYear === 9 && selectedSubject?.id === "y9-english" && (
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200 mb-6">
                      <h3 className="font-semibold text-pink-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" /> Year 9 English Revision Guide
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {y9EnglishRevisionGuide.topics.map((topic, idx) => (
                          <div key={idx} className="bg-white/70 rounded-xl p-4">
                            <h4 className="font-medium text-pink-900 text-sm mb-2">{topic.title}</h4>
                            <ul className="text-xs text-pink-700 space-y-1">
                              {topic.points.map((point, pidx) => (
                                <li key={pidx} className="flex items-start gap-2">
                                  <span className="text-pink-500 mt-0.5">•</span> {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 bg-white/50 rounded-xl p-4">
                        <h4 className="font-medium text-pink-900 text-sm mb-2">💡 Exam Tips</h4>
                        <ul className="text-xs text-pink-700 space-y-1">
                          {y9EnglishRevisionGuide.examTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-pink-500">✓</span> {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Mock Exam Tips */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5" /> {selectedYear === 9 ? "Year 9 Mock Tips" : "GCSE Mock Exam Tips"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {mockTips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3 bg-white/50 rounded-xl p-4">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            {tip.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-amber-900 text-sm">{tip.title}</h4>
                            <p className="text-xs text-amber-700 mt-1">{tip.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Year 9 Specific Revision Guide */}
                  {selectedYear === 9 && selectedSubject?.id === "y9-maths" && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 mb-6">
                      <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                        <Calculator className="w-5 h-5" /> Year 9 Maths Revision Guide
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {y9MathsRevisionGuide.topics.map((topic, idx) => (
                          <div key={idx} className="bg-white/70 rounded-xl p-4">
                            <h4 className="font-medium text-blue-900 text-sm mb-2">{topic.title}</h4>
                            <ul className="text-xs text-blue-700 space-y-1">
                              {topic.points.map((point, pidx) => (
                                <li key={pidx} className="flex items-start gap-2">
                                  <span className="text-pink-500 mt-0.5">•</span> {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 bg-white/50 rounded-xl p-4">
                        <h4 className="font-medium text-blue-900 text-sm mb-2">💡 Exam Tips</h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                          {y9MathsRevisionGuide.examTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-pink-500">✓</span> {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedYear === 9 && selectedSubject?.id === "y9-english" && (
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200 mb-6">
                      <h3 className="font-semibold text-pink-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" /> Year 9 English Revision Guide
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {y9EnglishRevisionGuide.topics.map((topic, idx) => (
                          <div key={idx} className="bg-white/70 rounded-xl p-4">
                            <h4 className="font-medium text-pink-900 text-sm mb-2">{topic.title}</h4>
                            <ul className="text-xs text-pink-700 space-y-1">
                              {topic.points.map((point, pidx) => (
                                <li key={pidx} className="flex items-start gap-2">
                                  <span className="text-pink-500 mt-0.5">•</span> {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 bg-white/50 rounded-xl p-4">
                        <h4 className="font-medium text-pink-900 text-sm mb-2">💡 Exam Tips</h4>
                        <ul className="text-xs text-pink-700 space-y-1">
                          {y9EnglishRevisionGuide.examTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-pink-500">✓</span> {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Mock Exam Tips */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5" /> {selectedYear === 9 ? "Year 9 Mock Tips" : "GCSE Mock Exam Tips"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {mockTips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3 bg-white/50 rounded-xl p-4">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            {tip.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-amber-900 text-sm">{tip.title}</h4>
                            <p className="text-xs text-amber-700 mt-1">{tip.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("topics")}
                    className="mt-6 flex items-center gap-2 text-slate-600 hover:text-pink-500 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Topics
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              {/* Welcome */}
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 sm:p-8 text-white mb-6">
                <h3 className="text-2xl font-bold mb-2">Hello! 👋</h3>
                <p className="text-pink-100 mb-4 max-w-xl">{quotes[quoteIndex]}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/20 px-3 py-1.5 rounded-full text-xs">📚 {yearSubjects.length} Subjects</span>
                  <span className="bg-white/20 px-3 py-1.5 rounded-full text-xs">
                    {selectedYear === 9 ? "🎓 KS3 Building Blocks" : selectedYear === 10 ? "🎯 GCSE Ready" : "🔥 Mock Exam Season"}
                  </span>
                  <span className="bg-white/20 px-3 py-1.5 rounded-full text-xs">{totalProgress}% Complete</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-2xl font-bold text-slate-900">{yearSubjects.length}</p>
                  <p className="text-xs text-slate-500">Subjects</p>
                </div>
                <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100`}>
                  <p className={`text-2xl font-bold ${colors.primaryText}`}>{completedTopics.length}</p>
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
                {yearSubjects.map((subject) => {
                  const subjectProgress = Math.round((completedTopics.filter((t) => subject.topics.map(st => st.name).includes(t)).length / subject.topics.length) * 100);
                  const hasQuiz = getSubjectQuizzes(subject.id).length > 0;
                  const hasVideos = getSubjectVideos(subject.id).length > 0;
                  const hasMocks = selectedYear === 11 && getSubjectMockPapers(subject.id).length > 0;
                  return (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject)}
                      className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md ${colors.border} transition-all text-left group`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`w-10 h-10 rounded-lg ${subject.bgColor} flex items-center justify-center ${subject.color}`}>
                          {subject.icon}
                        </span>
                        <div className="flex items-center gap-1">
                          {hasVideos && (
                            <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-medium">
                              <Video className="w-3 h-3 inline" />
                            </span>
                          )}
                          {hasQuiz && (
                            <span className={`${colors.primaryLight} ${colors.primaryText} px-2 py-0.5 rounded text-xs font-medium`}>
                              Quiz
                            </span>
                          )}
                          {hasMocks && (
                            <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded text-xs font-medium">
                              Mocks
                            </span>
                          )}
                          {subjectProgress > 0 && (
                            <span className={`text-xs font-medium ${colors.primaryText}`}>{subjectProgress}%</span>
                          )}
                        </div>
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">{subject.name}</h4>
                      <p className="text-xs text-slate-500 mb-3 line-clamp-1">{subject.description}</p>
                      {subjectProgress > 0 && (
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className={`${colors.primary} h-1.5 rounded-full transition-all`} style={{ width: `${subjectProgress}%` }} />
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
