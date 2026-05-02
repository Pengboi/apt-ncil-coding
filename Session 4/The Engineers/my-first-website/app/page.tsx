"use client";

import { useState, useEffect, useRef } from "react";
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
  Camera,
  Search,
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
    examBoard: "KS3 National Curriculum",
    topics: [
      { name: "Number Operations & BIDMAS", revisionLinks: [
        { title: "BBC Bitesize - Order of Operations", url: "https://www.bbc.co.uk/bitesize/topics/z9ywdxs" },
        { title: "Corbettmaths - BIDMAS Video", url: "https://corbettmaths.com/2012/08/21/order-of-operations/" },
        { title: "Maths Genie - BIDMAS", url: "https://www.mathsgenie.co.uk/bidmas.html" },
        { title: "Khan Academy - Order of Operations", url: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-arithmetic/pre-algebra-order-of-operations/v/introduction-to-order-of-operations" }
      ]},
      { name: "Factors, Multiples & Primes", revisionLinks: [
        { title: "BBC Bitesize - Factors and Multiples", url: "https://www.bbc.co.uk/bitesize/topics/z6fgcdm" },
        { title: "Corbettmaths - Factors and Multiples", url: "https://corbettmaths.com/2012/08/21/factors-and-multiples/" },
        { title: "Maths Genie - Prime Numbers", url: "https://www.mathsgenie.co.uk/prime-numbers.html" },
        { title: "MathsBot - Prime Factor Trees", url: "https://mathsbot.com/gcse/factorTrees" }
      ]},
      { name: "Fractions - Operations & Conversions", revisionLinks: [
        { title: "BBC Bitesize - Fractions", url: "https://www.bbc.co.uk/bitesize/topics/zt7n8xs" },
        { title: "Corbettmaths - Adding Fractions", url: "https://corbettmaths.com/2012/08/21/adding-fractions/" },
        { title: "Maths Genie - Fractions", url: "https://www.mathsgenie.co.uk/fractions.html" },
        { title: "Khan Academy - Fractions", url: "https://www.khanacademy.org/math/arithmetic/fraction-arithmetic" }
      ]},
      { name: "Decimals & Percentages", revisionLinks: [
        { title: "BBC Bitesize - Percentages", url: "https://www.bbc.co.uk/bitesize/topics/znj2xyc" },
        { title: "Corbettmaths - Percentages", url: "https://corbettmaths.com/2012/08/21/percentages/" },
        { title: "Maths Genie - Percentages", url: "https://www.mathsgenie.co.uk/percentages.html" },
        { title: "Khan Academy - Percentages", url: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-ratios-rates/pre-algebra-percent-intro/v/percent-intro" }
      ]},
      { name: "Ratio & Proportion", revisionLinks: [
        { title: "BBC Bitesize - Ratio", url: "https://www.bbc.co.uk/bitesize/topics/zqbg87h" },
        { title: "Corbettmaths - Ratio", url: "https://corbettmaths.com/2012/08/21/ratio/" },
        { title: "Maths Genie - Ratio", url: "https://www.mathsgenie.co.uk/ratio.html" },
        { title: "Khan Academy - Ratios", url: "https://www.khanacademy.org/math/pre-algebra/pre-algebra-ratios-rates/pre-algebra-ratios-intro/v/intro-to-ratios" }
      ]},
      { name: "Algebra Basics - Expressions & Simplifying", revisionLinks: [
        { title: "BBC Bitesize - Algebra Basics", url: "https://www.bbc.co.uk/bitesize/topics/zvnycdm" },
        { title: "Corbettmaths - Collecting Like Terms", url: "https://corbettmaths.com/2012/08/21/collecting-like-terms/" },
        { title: "Maths Genie - Simplifying Expressions", url: "https://www.mathsgenie.co.uk/simplifying-expressions.html" },
        { title: "Khan Academy - Algebraic Expressions", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:foundation-algebra" }
      ]},
      { name: "Solving Linear Equations", revisionLinks: [
        { title: "BBC Bitesize - Solving Equations", url: "https://www.bbc.co.uk/bitesize/topics/z6fgcdm" },
        { title: "Corbettmaths - Solving Equations", url: "https://corbettmaths.com/2012/08/21/solving-equations/" },
        { title: "Maths Genie - Solving Equations", url: "https://www.mathsgenie.co.uk/solving-equations.html" },
        { title: "Khan Academy - Linear Equations", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations" }
      ]},
      { name: "Substitution & Formulas", revisionLinks: [
        { title: "BBC Bitesize - Substitution", url: "https://www.bbc.co.uk/bitesize/topics/z3ykjxs" },
        { title: "Corbettmaths - Substitution", url: "https://corbettmaths.com/2012/08/21/substitution/" },
        { title: "Maths Genie - Substitution", url: "https://www.mathsgenie.co.uk/substitution.html" },
        { title: "Khan Academy - Evaluating Expressions", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:intro-to-algebra" }
      ]},
      { name: "Sequences & Patterns", revisionLinks: [
        { title: "BBC Bitesize - Sequences", url: "https://www.bbc.co.uk/bitesize/topics/z7hs34j" },
        { title: "Corbettmaths - Sequences - Nth Term", url: "https://corbettmaths.com/2012/08/21/sequences-nth-term/" },
        { title: "Maths Genie - Sequences", url: "https://www.mathsgenie.co.uk/sequences.html" },
        { title: "Khan Academy - Patterns", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:sequences" }
      ]},
      { name: "Coordinates & Linear Graphs", revisionLinks: [
        { title: "BBC Bitesize - Coordinates", url: "https://www.bbc.co.uk/bitesize/topics/zgthvcw" },
        { title: "BBC Bitesize - Linear Graphs", url: "https://www.bbc.co.uk/bitesize/topics/z8nycdm" },
        { title: "Corbettmaths - Drawing Linear Graphs", url: "https://corbettmaths.com/2012/08/21/drawing-linear-graphs/" },
        { title: "Khan Academy - Linear Equations Graphs", url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-graphs" }
      ]},
      { name: "Angles - Properties & Calculations", revisionLinks: [
        { title: "BBC Bitesize - Angles", url: "https://www.bbc.co.uk/bitesize/topics/zdr9wmn" },
        { title: "Corbettmaths - Angles in Polygons", url: "https://corbettmaths.com/2012/08/21/angles-in-polygons/" },
        { title: "Maths Genie - Angles", url: "https://www.mathsgenie.co.uk/angles.html" },
        { title: "Khan Academy - Angles", url: "https://www.khanacademy.org/math/basic-geo/basic-geo-angle" }
      ]},
      { name: "2D Shapes - Area & Perimeter", revisionLinks: [
        { title: "BBC Bitesize - Area and Perimeter", url: "https://www.bbc.co.uk/bitesize/topics/zjbg87h" },
        { title: "Corbettmaths - Area of Compound Shapes", url: "https://corbettmaths.com/2012/08/21/area-of-compound-shapes/" },
        { title: "Maths Genie - Area and Perimeter", url: "https://www.mathsgenie.co.uk/area-and-perimeter.html" },
        { title: "Khan Academy - Area and Perimeter", url: "https://www.khanacademy.org/math/basic-geo/basic-geo-area-perimeter" }
      ]},
      { name: "3D Shapes - Volume & Surface Area", revisionLinks: [
        { title: "BBC Bitesize - Volume", url: "https://www.bbc.co.uk/bitesize/topics/zjbg87h/articles/zcrx6v4" },
        { title: "Corbettmaths - Volume of Prisms", url: "https://corbettmaths.com/2012/08/21/volume-of-prisms/" },
        { title: "Maths Genie - Volume", url: "https://www.mathsgenie.co.uk/volume.html" },
        { title: "Khan Academy - Volume and Surface Area", url: "https://www.khanacademy.org/math/basic-geo/basic-geo-volume-surface-area" }
      ]},
      { name: "Transformations", revisionLinks: [
        { title: "BBC Bitesize - Transformations", url: "https://www.bbc.co.uk/bitesize/topics/zjx3cdm" },
        { title: "Corbettmaths - Reflections", url: "https://corbettmaths.com/2012/08/21/reflections/" },
        { title: "Maths Genie - Transformations", url: "https://www.mathsgenie.co.uk/transformations.html" },
        { title: "Khan Academy - Transformations", url: "https://www.khanacademy.org/math/basic-geo/basic-geo-transformations" }
      ]},
      { name: "Pythagoras Theorem", revisionLinks: [
        { title: "BBC Bitesize - Pythagoras", url: "https://www.bbc.co.uk/bitesize/topics/z93rkqt" },
        { title: "Corbettmaths - Pythagoras Theorem", url: "https://corbettmaths.com/2012/08/21/pythagoras-theorem/" },
        { title: "Maths Genie - Pythagoras", url: "https://www.mathsgenie.co.uk/pythagoras.html" },
        { title: "Khan Academy - Pythagorean Theorem", url: "https://www.khanacademy.org/math/basic-geo/basic-geo-pythagorean-topic" }
      ]},
      { name: "Statistics - Averages & Range", revisionLinks: [
        { title: "BBC Bitesize - Averages", url: "https://www.bbc.co.uk/bitesize/topics/zmnycdm" },
        { title: "Corbettmaths - Averages and Range", url: "https://corbettmaths.com/2012/08/21/averages-and-range/" },
        { title: "Maths Genie - Averages", url: "https://www.mathsgenie.co.uk/averages.html" },
        { title: "Khan Academy - Mean, Median, Mode", url: "https://www.khanacademy.org/math/probability/data-distributions-aggregates" }
      ]},
      { name: "Data Representation - Charts & Graphs", revisionLinks: [
        { title: "BBC Bitesize - Charts and Graphs", url: "https://www.bbc.co.uk/bitesize/topics/z7rcwmn" },
        { title: "Corbettmaths - Bar Charts", url: "https://corbettmaths.com/2012/08/21/reading-bar-charts/" },
        { title: "Maths Genie - Representing Data", url: "https://www.mathsgenie.co.uk/representing-data.html" },
        { title: "Khan Academy - Data and Graphs", url: "https://www.khanacademy.org/math/probability/data-distributions-aggregates" }
      ]},
      { name: "Probability Basics", revisionLinks: [
        { title: "BBC Bitesize - Probability", url: "https://www.bbc.co.uk/bitesize/topics/zvnycdm" },
        { title: "Corbettmaths - Probability", url: "https://corbettmaths.com/2012/08/21/probability/" },
        { title: "Maths Genie - Probability", url: "https://www.mathsgenie.co.uk/probability.html" },
        { title: "Khan Academy - Probability", url: "https://www.khanacademy.org/math/probability/probability-geometry" }
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
    examBoard: "KS3 English",
    topics: [
      { name: "Novel Study - Character and Theme Analysis", revisionLinks: [
        { title: "BBC Bitesize - Analysing Fiction", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zbx3xwx" },
        { title: "BBC Bitesize - Characters", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zp9djhv" },
        { title: "SparkNotes - Study Guides", url: "https://www.sparknotes.com/" },
        { title: "CliffsNotes - Literature Notes", url: "https://www.cliffsnotes.com/" }
      ]},
      { name: "Poetry Forms and Techniques", revisionLinks: [
        { title: "BBC Bitesize - Poetry", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/z4bvk2p" },
        { title: "BBC Bitesize - Language Techniques", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/z9jgpbk" },
        { title: "Poetry Foundation - Glossary", url: "https://www.poetryfoundation.org/learn/glossary-terms" },
        { title: "Mr Bruff - Poetry Analysis", url: "https://www.youtube.com/user/mrbruff" }
      ]},
      { name: "Shakespeare Introduction", revisionLinks: [
        { title: "BBC Bitesize - Shakespeare", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/z7w8wmn" },
        { title: "SparkNotes - Shakespeare", url: "https://www.sparknotes.com/shakespeare/" },
        { title: "No Fear Shakespeare - Modern Translation", url: "https://www.sparknotes.com/nofear/shakespeare/" },
        { title: "RSC - Shakespeare Learning", url: "https://www.rsc.org.uk/education" }
      ]},
      { name: "Creative Writing Skills", revisionLinks: [
        { title: "BBC Bitesize - Creative Writing", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zq2ycdm" },
        { title: "BBC Bitesize - Story Openings", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zwdvmsg" },
        { title: "Young Writers - Tips", url: "https://www.youngwriters.co.uk/" },
        { title: "Creative Writing Now - Techniques", url: "https://www.creative-writing-now.com/" }
      ]},
      { name: "Non-Fiction Analysis", revisionLinks: [
        { title: "BBC Bitesize - Non-Fiction Texts", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zd4fy9q" },
        { title: "Teachit English - Non-Fiction", url: "https://www.teachit.co.uk/english" },
        { title: "The Guardian - Article Analysis", url: "https://www.theguardian.com/education" },
        { title: "English Biz - Persuasive Techniques", url: "http://www.englishbiz.co.uk/" }
      ]},
      { name: "Spelling, Punctuation & Grammar", revisionLinks: [
        { title: "BBC Bitesize - SPaG", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zr8nrdm" },
        { title: "BBC Bitesize - Punctuation", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zpb9jty" },
        { title: "Grammarly - Grammar Guide", url: "https://www.grammarly.com/grammar" },
        { title: "Oxford Dictionaries - Grammar", url: "https://www.lexico.com/grammar" }
      ]},
      { name: "Persuasive and Argumentative Writing", revisionLinks: [
        { title: "BBC Bitesize - Writing to Persuade", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zg8ycdm" },
        { title: "ReadWriteThink - Persuasion Map", url: "http://www.readwritethink.org/" },
        { title: "Writing Commons - Argumentation", url: "https://writingcommons.org/" },
        { title: "ProWritingAid - Persuasive Writing", url: "https://prowritingaid.com/" }
      ]},
      { name: "Descriptive Writing Techniques", revisionLinks: [
        { title: "BBC Bitesize - Descriptive Writing", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zqw3y4j" },
        { title: "Now Novel - Show Don't Tell", url: "https://www.nownovel.com/" },
        { title: "MasterClass - Descriptive Writing", url: "https://www.masterclass.com/" },
        { title: "Reedsy - Descriptive Writing Tips", url: "https://blog.reedsy.com/" }
      ]},
      { name: "Reading for Inference and Deduction", revisionLinks: [
        { title: "BBC Bitesize - Inference", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/zkxw4j6" },
        { title: "Reading Rockets - Comprehension", url: "https://www.readingrockets.org/" },
        { title: "Achieve 3000 - Reading Skills", url: "https://www.achieve3000.com/" },
        { title: "Teachit - Inference Activities", url: "https://www.teachit.co.uk/english" }
      ]},
      { name: "Speaking and Presentation Skills", revisionLinks: [
        { title: "BBC Bitesize - Speaking Skills", url: "https://www.bbc.co.uk/bitesize/topics/z3kw2hv/articles/z9dhcj6" },
        { title: "TED - Public Speaking", url: "https://www.ted.com/playlists/226/public_speaking_tips" },
        { title: "Toastmasters - Speaking Tips", url: "https://www.toastmasters.org/" },
        { title: "GCF Global - Presentation Skills", url: "https://edu.gcfglobal.org/en/" }
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
    description: "History examines past events to understand how they shape our present and future. You'll analyze sources, evaluate evidence, and develop critical thinking skills while studying major conflicts, social changes, and political developments from the 20th century.",
    examBoard: "KS3 History",
    topics: [
      { name: "World War I - Causes and Outbreak (1914-1918)", revisionLinks: [
        { title: "BBC Bitesize - WWI Causes", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" },
        { title: "BBC History - WWI", url: "https://www.bbc.co.uk/history/worldwars/wwone/" },
        { title: "Imperial War Museum - WWI", url: "https://www.iwm.org.uk/" },
        { title: "National Archives - WWI", url: "https://www.nationalarchives.gov.uk/education/" }
      ]},
      { name: "World War I - Trench Warfare and Home Front", revisionLinks: [
        { title: "BBC Bitesize - Trench Warfare", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" },
        { title: "History Learning Site - Trenches", url: "http://www.historylearningsite.co.uk/" },
        { title: "The Great War - Trench Life", url: "https://www.youtube.com/channel/UCUcyEsEjhPEDFP6bP4P1w8g" }
      ]},
      { name: "Interwar Years (1918-1939) - League of Nations", revisionLinks: [
        { title: "BBC Bitesize - League of Nations", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" },
        { title: "History.com - Interwar Period", url: "https://www.history.com/" }
      ]},
      { name: "Interwar Years - Rise of Dictators (Hitler, Stalin, Mussolini)", revisionLinks: [
        { title: "BBC Bitesize - Rise of Hitler", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" },
        { title: "Spartacus Educational - Dictators", url: "https://spartacus-educational.com/" },
        { title: "Holocaust Memorial Day Trust", url: "https://hmd.org.uk/" }
      ]},
      { name: "World War II - Causes and Early Years (1939-1942)", revisionLinks: [
        { title: "BBC Bitesize - WWII Causes", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" },
        { title: "BBC History - WWII", url: "https://www.bbc.co.uk/history/worldwars/wwtwo/" },
        { title: "WWII Museum - History", url: "https://www.nationalww2museum.org/" }
      ]},
      { name: "World War II - Holocaust and Human Rights", revisionLinks: [
        { title: "BBC Bitesize - Holocaust", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" },
        { title: "Holocaust Educational Trust", url: "https://www.het.org.uk/" },
        { title: "US Holocaust Memorial Museum", url: "https://www.ushmm.org/" },
        { title: "Anne Frank House", url: "https://www.annefrank.org/" }
      ]},
      { name: "World War II - Pacific Theater and Atomic Bomb", revisionLinks: [
        { title: "History Learning Site - Pacific War", url: "http://www.historylearningsite.co.uk/" },
        { title: "Atomic Archive - Manhattan Project", url: "https://www.atomicarchive.com/" }
      ]},
      { name: "Cold War Origins (1945-1962) - Truman Doctrine and Marshall Plan", revisionLinks: [
        { title: "BBC Bitesize - Cold War", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" },
        { title: "Cold War Museum", url: "http://www.coldwar.org/" },
        { title: "Truman Library", url: "https://www.trumanlibrary.gov/" }
      ]},
      { name: "Cold War - Berlin Wall and Space Race", revisionLinks: [
        { title: "Berlin Wall Memorial", url: "https://www.berlin.de/" },
        { title: "NASA - Space Race History", url: "https://www.nasa.gov/" },
        { title: "BBC Bitesize - Berlin Crisis", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" }
      ]},
      { name: "Primary Source Analysis - Reliability and Bias", revisionLinks: [
        { title: "BBC Bitesize - Source Analysis", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" },
        { title: "National Archives - Using Documents", url: "https://www.nationalarchives.gov.uk/education/" },
        { title: "History Skills - Source Evaluation", url: "http://www.historyskills.com/" }
      ]},
      { name: "Historical Essay Writing - Structure and Argumentation", revisionLinks: [
        { title: "BBC Bitesize - Essay Writing", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" },
        { title: "History Today - Writing Tips", url: "https://www.historytoday.com/" },
        { title: "JSTOR - Academic Writing", url: "https://www.jstor.org/" }
      ]},
      { name: "Historical Interpretations and Historiography", revisionLinks: [
        { title: "History Learning Site - Interpretations", url: "http://www.historylearningsite.co.uk/" },
        { title: "BBC Bitesize - Historical Debate", url: "https://www.bbc.co.uk/bitesize/topics/z7svcdm" }
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
    description: "Geography explores the Earth's landscapes, environments, and the complex relationships between humans and their planet. You'll study physical processes like weather and tectonics, human patterns like urbanization and migration, and develop crucial analytical skills through fieldwork and data interpretation.",
    examBoard: "KS3 Geography",
    topics: [
      { name: "Map Skills - Grid References, Scale, and Contour Lines", revisionLinks: [
        { title: "BBC Bitesize - Map Skills", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "Ordnance Survey - Map Reading", url: "https://www.ordnancesurvey.co.uk/" },
        { title: "Mapzone - Geography Games", url: "https://www.mapzone.co.uk/" },
        { title: "National Geographic - Maps", url: "https://www.nationalgeographic.com/" }
      ]},
      { name: "Map Skills - Compass Directions and Bearings", revisionLinks: [
        { title: "BBC Bitesize - Compass Skills", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "Geography Fieldwork - Navigation", url: "https://www.rgs.org.uk/" },
        { title: "OS Maps App", url: "https://www.ordnancesurvey.co.uk/" }
      ]},
      { name: "Weather and Climate - Atmospheric Processes", revisionLinks: [
        { title: "BBC Bitesize - Weather Systems", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "Met Office - Weather for Schools", url: "https://www.metoffice.gov.uk/" },
        { title: "NASA - Climate Kids", url: "https://climatekids.nasa.gov/" }
      ]},
      { name: "Weather and Climate - UK Weather Patterns", revisionLinks: [
        { title: "BBC Bitesize - UK Climate", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "Met Office - UK Climate Zones", url: "https://www.metoffice.gov.uk/" },
        { title: "Weather Spark - UK Data", url: "https://weatherspark.com/" }
      ]},
      { name: "Ecosystems - Tropical Rainforests and Biodiversity", revisionLinks: [
        { title: "BBC Bitesize - Rainforests", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "Rainforest Alliance", url: "https://www.rainforest-alliance.org/" },
        { title: "WWF - Rainforest Conservation", url: "https://www.worldwildlife.org/" }
      ]},
      { name: "Ecosystems - Hot Deserts and Adaptation", revisionLinks: [
        { title: "BBC Bitesize - Deserts", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "Arizona-Sonora Desert Museum", url: "https://www.desertmuseum.org/" },
        { title: "National Geographic - Desert Biome", url: "https://www.nationalgeographic.com/" }
      ]},
      { name: "Rivers - River Processes and Landforms", revisionLinks: [
        { title: "BBC Bitesize - Rivers", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "Rivers Network - Processes", url: "https://www.theriverstrust.org/" },
        { title: "Geography Site - River Landforms", url: "http://www.geography-site.co.uk/" }
      ]},
      { name: "Rivers - Flooding and Management", revisionLinks: [
        { title: "BBC Bitesize - Flooding", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "Environment Agency - Flood Risk", url: "https://www.gov.uk/government/organisations/environment-agency" },
        { title: "Flood Flash", url: "https://www.floodflash.co.uk/" }
      ]},
      { name: "Tectonics - Plate Boundaries and Earthquakes", revisionLinks: [
        { title: "BBC Bitesize - Plate Tectonics", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "USGS - Earthquake Hazards", url: "https://www.usgs.gov/" },
        { title: "Geology.com - Plate Boundaries", url: "https://geology.com/" }
      ]},
      { name: "Tectonics - Volcanoes and Management", revisionLinks: [
        { title: "BBC Bitesize - Volcanoes", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "USGS - Volcanic Hazards", url: "https://www.usgs.gov/" },
        { title: "Volcano Discovery", url: "https://www.volcanodiscovery.com/" }
      ]},
      { name: "Population - Growth, Distribution, and Density", revisionLinks: [
        { title: "BBC Bitesize - Population", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "Population Reference Bureau", url: "https://www.prb.org/" },
        { title: "UN Population Data", url: "https://population.un.org/" }
      ]},
      { name: "Population - Migration Patterns and Impacts", revisionLinks: [
        { title: "BBC Bitesize - Migration", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "Migration Observatory", url: "https://migrationobservatory.ox.ac.uk/" },
        { title: "IOM - Migration Data", url: "https://www.iom.int/" }
      ]},
      { name: "Development - Indicators and Inequality", revisionLinks: [
        { title: "BBC Bitesize - Development", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "World Bank - Development Data", url: "https://data.worldbank.org/" },
        { title: "UNDP - Human Development", url: "http://hdr.undp.org/" }
      ]},
      { name: "Urban Geography - City Growth and Challenges", revisionLinks: [
        { title: "BBC Bitesize - Urbanization", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "UN-Habitat - Urban Data", url: "https://unhabitat.org/" },
        { title: "World Cities Database", url: "https://www.citypopulation.de/" }
      ]},
      { name: "Coasts - Coastal Processes and Management", revisionLinks: [
        { title: "BBC Bitesize - Coasts", url: "https://www.bbc.co.uk/bitesize/topics/zkdkng8" },
        { title: "Coastal Processes", url: "http://www.coastalprocesses.co.uk/" },
        { title: "National Trust - Coastal Conservation", url: "https://www.nationaltrust.org.uk/" }
      ]},
      { name: "Fieldwork Skills - Data Collection and Analysis", revisionLinks: [
        { title: "RGS - Fieldwork Support", url: "https://www.rgs.org.uk/" },
        { title: "GA - Geography Fieldwork", url: "https://www.geography.org.uk/" },
        { title: "Field Studies Council", url: "https://www.field-studies-council.org/" }
      ]},
      { name: "GIS and Digital Mapping - Technology in Geography", revisionLinks: [
        { title: "ArcGIS for Schools", url: "https://www.esriuk.com/" },
        { title: "Google Earth Education", url: "https://www.google.com/earth/" },
        { title: "Digimap for Schools", url: "https://digimapforschools.edina.ac.uk/" }
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
    description: "Computing empowers you to understand and create technology. You'll learn computational thinking, programming in Python, how computers work, cybersecurity principles, and digital literacy skills essential for the modern world.",
    examBoard: "KS3 Computing",
    topics: [
      { name: "Python Programming - Variables, Data Types, and Operators", revisionLinks: [
        { title: "W3Schools - Python Tutorial", url: "https://www.w3schools.com/python/" },
        { title: "BBC Bitesize - Programming", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" },
        { title: "Python.org - Beginner's Guide", url: "https://docs.python.org/3/tutorial/" },
        { title: "Codecademy - Python Course", url: "https://www.codecademy.com/learn/learn-python-3" }
      ]},
      { name: "Python Programming - Control Flow (If/Else, Loops)", revisionLinks: [
        { title: "W3Schools - Python If...Else", url: "https://www.w3schools.com/python/python_conditions.asp" },
        { title: "W3Schools - Python Loops", url: "https://www.w3schools.com/python/python_for_loops.asp" },
        { title: "Programiz - Python Flow Control", url: "https://www.programiz.com/python-programming/if-elif-else" }
      ]},
      { name: "Python Programming - Functions and Lists", revisionLinks: [
        { title: "W3Schools - Python Functions", url: "https://www.w3schools.com/python/python_functions.asp" },
        { title: "W3Schools - Python Lists", url: "https://www.w3schools.com/python/python_lists.asp" },
        { title: "Real Python - Python Lists", url: "https://realpython.com/python-lists-tuples/" }
      ]},
      { name: "Algorithms - Designing Solutions (Decomposition, Abstraction)", revisionLinks: [
        { title: "BBC Bitesize - Computational Thinking", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" },
        { title: "CS Unplugged - Algorithms", url: "https://csunplugged.org/en/topics/" },
        { title: "Khan Academy - Algorithms", url: "https://www.khanacademy.org/computing/computer-science/algorithms" }
      ]},
      { name: "Algorithms - Sorting and Searching", revisionLinks: [
        { title: "BBC Bitesize - Searching and Sorting", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" },
        { title: "Visualgo - Sorting Visualizations", url: "https://visualgo.net/en/sorting" },
        { title: "Khan Academy - Binary Search", url: "https://www.khanacademy.org/computing/computer-science/algorithms" }
      ]},
      { name: "Computer Systems - Hardware Components (CPU, RAM, Storage)", revisionLinks: [
        { title: "BBC Bitesize - Computer Systems", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" },
        { title: "TechRadar - PC Components", url: "https://www.techradar.com/" },
        { title: "Computer Hope - Hardware", url: "https://www.computerhope.com/" }
      ]},
      { name: "Computer Systems - Binary and Data Representation", revisionLinks: [
        { title: "BBC Bitesize - Binary", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" },
        { title: "Binary to Decimal Converter", url: "https://www.rapidtables.com/convert/number/" },
        { title: "CS Unplugged - Binary", url: "https://csunplugged.org/en/topics/" }
      ]},
      { name: "Networks - Internet and Network Protocols", revisionLinks: [
        { title: "BBC Bitesize - Networks", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" },
        { title: "Cisco Networking Basics", url: "https://www.cisco.com/" },
        { title: "How Stuff Works - Internet", url: "https://computer.howstuffworks.com/internet/basics/internet.htm" }
      ]},
      { name: "Cybersecurity - Threats and Protection", revisionLinks: [
        { title: "BBC Bitesize - Cybersecurity", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" },
        { title: "NCSC - Cyber Aware", url: "https://www.ncsc.gov.uk/cyberaware/" },
        { title: "Cyber Discovery", url: "https://cyberdisc.io/" }
      ]},
      { name: "Cybersecurity - Encryption and Passwords", revisionLinks: [
        { title: "BBC Bitesize - Encryption", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" },
        { title: "Khan Academy - Cryptography", url: "https://www.khanacademy.org/computing/computer-science/cryptography" }
      ]},
      { name: "Data Representation - Images and Sound", revisionLinks: [
        { title: "BBC Bitesize - Data Representation", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" },
        { title: "CS Unplugged - Image Representation", url: "https://csunplugged.org/en/topics/" }
      ]},
      { name: "Databases and SQL", revisionLinks: [
        { title: "W3Schools - SQL Tutorial", url: "https://www.w3schools.com/sql/" },
        { title: "SQLZoo - Interactive SQL", url: "https://sqlzoo.net/" }
      ]},
      { name: "Web Development - HTML and CSS Basics", revisionLinks: [
        { title: "W3Schools - HTML Tutorial", url: "https://www.w3schools.com/html/" },
        { title: "W3Schools - CSS Tutorial", url: "https://www.w3schools.com/css/" },
        { title: "Mozilla MDN - Web Docs", url: "https://developer.mozilla.org/" },
        { title: "freeCodeCamp - Web Design", url: "https://www.freecodecamp.org/" }
      ]},
      { name: "Ethical Issues - AI, Privacy, and Digital Rights", revisionLinks: [
        { title: "BBC Bitesize - Ethical Issues", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" },
        { title: "Ada Lovelace Institute - AI Ethics", url: "https://www.adalovelaceinstitute.org/" },
        { title: "Electronic Frontier Foundation", url: "https://www.eff.org/" }
      ]},
      { name: "Computational Logic - Boolean Logic and Truth Tables", revisionLinks: [
        { title: "BBC Bitesize - Boolean Logic", url: "https://www.bbc.co.uk/bitesize/topics/zf2f9j6" },
        { title: "Khan Academy - Logic Gates", url: "https://www.khanacademy.org/computing/computer-science/cryptography/circuits-logic" }
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
    description: "French develops your ability to communicate in one of the world's most spoken languages. You'll build vocabulary, master grammar structures, explore French-speaking cultures, and develop listening, speaking, reading, and writing skills essential for travel, business, and global citizenship.",
    examBoard: "KS3 French",
    topics: [
      { name: "Greetings, Introductions, and Personal Information", revisionLinks: [
        { title: "BBC Bitesize - French Greetings", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "Duolingo - French Basics", url: "https://www.duolingo.com/course/fr/en/Learn-French" },
        { title: "French Together - Greetings", url: "https://www.frenchtogether.com/" },
        { title: "Lawless French - Basics", url: "https://www.lawlessfrench.com/" }
      ]},
      { name: "Family, Friends, and Relationships", revisionLinks: [
        { title: "BBC Bitesize - Family Vocabulary", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "Memrise - Family Words", url: "https://www.memrise.com/course/french-vocabulary/" },
        { title: "Quizlet - French Family", url: "https://quizlet.com/" }
      ]},
      { name: "School Life - Subjects, Opinions, and Routine", revisionLinks: [
        { title: "BBC Bitesize - School Vocabulary", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "Atantot - Education Vocabulary", url: "https://www.atantot.com/" },
        { title: "French Games - School", url: "https://www.french-games.net/" }
      ]},
      { name: "Free Time - Sports, Hobbies, and Entertainment", revisionLinks: [
        { title: "BBC Bitesize - Hobbies", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "Linguascope - French Activities", url: "https://www.linguascope.com/" },
        { title: "WordReference - Sports Vocabulary", url: "https://www.wordreference.com/" }
      ]},
      { name: "Food, Drink, and Healthy Living", revisionLinks: [
        { title: "BBC Bitesize - Food Vocabulary", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "Miam! - French Food", url: "https://www.frenchfoodie.com/" },
        { title: "Lingoda - Food Expressions", url: "https://www.lingoda.com/" }
      ]},
      { name: "Town, Region, and Travel", revisionLinks: [
        { title: "BBC Bitesize - Places in Town", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "Frantastique - Geography", url: "https://www.frantastique.com/" },
        { title: "Google Maps - French Cities", url: "https://www.google.com/maps/" }
      ]},
      { name: "Grammar - Present Tense Regular Verbs (-er, -ir, -re)", revisionLinks: [
        { title: "BBC Bitesize - Present Tense", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "Conjuguemos - Verb Practice", url: "https://conjuguemos.com/" },
        { title: "Reverso - Conjugation", url: "https://conjugator.reverso.net/" }
      ]},
      { name: "Grammar - Irregular Verbs (être, avoir, aller, faire)", revisionLinks: [
        { title: "BBC Bitesize - Common Verbs", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "Language Guide - Irregular Verbs", url: "http://www.languageguide.org/french/grammar/" },
        { title: "Study.com - Irregular Verbs", url: "https://study.com/" }
      ]},
      { name: "Grammar - Adjectives, Adverbs, and Comparatives", revisionLinks: [
        { title: "BBC Bitesize - Adjectives", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "Kwiziq - French Grammar", url: "https://kwiziq.com/" },
        { title: "Tex's French Grammar", url: "https://www.laits.utexas.edu/tex/" }
      ]},
      { name: "Grammar - Negatives and Questions", revisionLinks: [
        { title: "BBC Bitesize - Negatives", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "Think French - Question Formation", url: "https://www.thinkfrench.com/" }
      ]},
      { name: "Grammar - Near Future (Futur Proche) and Past (Passé Composé)", revisionLinks: [
        { title: "BBC Bitesize - Future Tense", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "BBC Bitesize - Past Tense", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "French Today - Past Tense", url: "https://www.frenchtoday.com/" }
      ]},
      { name: "French Culture - Festivals, Customs, and Traditions", revisionLinks: [
        { title: "France.fr - Culture", url: "https://www.france.fr/" },
        { title: "Fete Des Lumieres", url: "https://www.fetedeslumieres.lyon.fr/" },
        { title: "Lonely Planet - France", url: "https://www.lonelyplanet.com/france" }
      ]},
      { name: "Listening Skills - Strategies and Practice", revisionLinks: [
        { title: "BBC Bitesize - Listening", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "RFI Savoirs - Audio", url: "https://savoirs.rfi.fr/" },
        { title: "News in Slow French", url: "https://www.newsinslowfrench.com/" }
      ]},
      { name: "Speaking Skills - Pronunciation and Fluency", revisionLinks: [
        { title: "Forvo - French Pronunciation", url: "https://forvo.com/languages/fr/" },
        { title: "Speechling - Speaking Practice", url: "https://speechling.com/" },
        { title: "Italki - French Tutors", url: "https://www.italki.com/" }
      ]},
      { name: "Writing Skills - Descriptions, Narratives, and Formal Writing", revisionLinks: [
        { title: "BBC Bitesize - Writing", url: "https://www.bbc.co.uk/bitesize/topics/z7k8jty" },
        { title: "French Essay Phrases", url: "https://www.lawlessfrench.com/writing/" },
        { title: "Bon Patron - Grammar Checker", url: "https://bonpatron.com/" }
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
    description: "Physical Education develops your physical literacy, fitness, and understanding of health. You'll explore body systems, training methods, sports tactics, nutrition, mental health, and leadership skills to maintain lifelong healthy, active lifestyles.",
    examBoard: "KS3 PE",
    topics: [
      { name: "Anatomy and Physiology - Muscular System and Movement", revisionLinks: [
        { title: "BBC Bitesize - Body Systems", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "Teach PE - Muscles", url: "https://www.teachpe.com/" },
        { title: "Kenhub - Muscle Anatomy", url: "https://www.kenhub.com/" },
        { title: "Visible Body - 3D Anatomy", url: "https://www.visiblebody.com/" }
      ]},
      { name: "Anatomy and Physiology - Cardiovascular and Respiratory Systems", revisionLinks: [
        { title: "BBC Bitesize - Heart and Lungs", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "Teach PE - Cardiovascular", url: "https://www.teachpe.com/" },
        { title: "British Heart Foundation", url: "https://www.bhf.org.uk/" }
      ]},
      { name: "Fitness Training - Components of Fitness", revisionLinks: [
        { title: "BBC Bitesize - Fitness Components", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "Teach PE - Fitness Tests", url: "https://www.teachpe.com/" },
        { title: "Fitness Blender - Workouts", url: "https://www.fitnessblender.com/" }
      ]},
      { name: "Fitness Training - Methods and Principles (FITT, Overload)", revisionLinks: [
        { title: "BBC Bitesize - Training Methods", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "ACSM - Exercise Guidelines", url: "https://www.acsm.org/" },
        { title: "NHS - Fitness Guide", url: "https://www.nhs.uk/live-well/exercise/" }
      ]},
      { name: "Team Sports - Tactics, Strategies, and Positioning", revisionLinks: [
        { title: "BBC Bitesize - Sports Tactics", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "Teach PE - Games", url: "https://www.teachpe.com/" },
        { title: "Spoxx - Sports Tactics", url: "https://www.sports-reference.com/" }
      ]},
      { name: "Individual Sports - Techniques and Skill Development", revisionLinks: [
        { title: "BBC Bitesize - Skills", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "YouTube - Sports Tutorials", url: "https://www.youtube.com/" },
        { title: "Coaches Info - Technique", url: "https://www.coachesinfo.com/" }
      ]},
      { name: "Nutrition and Diet - Macronutrients and Micronutrients", revisionLinks: [
        { title: "BBC Bitesize - Nutrition", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "NHS - Eat Well", url: "https://www.nhs.uk/live-well/eat-well/" },
        { title: "British Nutrition Foundation", url: "https://www.nutrition.org.uk/" }
      ]},
      { name: "Nutrition and Diet - Energy Balance and Hydration", revisionLinks: [
        { title: "BBC Bitesize - Energy", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "Nutrition.org.uk - Hydration", url: "https://www.nutrition.org.uk/" },
        { title: "Change4Life - Healthy Eating", url: "https://www.nhs.uk/change4life/" }
      ]},
      { name: "Mental Health and Wellbeing - Stress Management and Resilience", revisionLinks: [
        { title: "BBC Bitesize - Wellbeing", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "Mind - Mental Health", url: "https://www.mind.org.uk/" },
        { title: "YoungMinds - Wellbeing", url: "https://www.youngminds.org.uk/" }
      ]},
      { name: "Mental Health - Confidence, Self-Esteem, and Goal Setting", revisionLinks: [
        { title: "BBC Bitesize - Self-Confidence", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "Sport in Mind - Mental Health", url: "https://sportinmind.org/" },
        { title: "SMART Goals Guide", url: "https://www.mindtools.com/" }
      ]},
      { name: "Sports Leadership - Communication and Organization", revisionLinks: [
        { title: "BBC Bitesize - Leadership", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "Sports Leaders UK", url: "https://www.sportsleaders.org/" },
        { title: "UK Coaching", url: "https://www.ukcoaching.org/" }
      ]},
      { name: "Sports Leadership - Fair Play and Sportsmanship", revisionLinks: [
        { title: "BBC Bitesize - Fair Play", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "Respect - FA Campaign", url: "https://www.thefa.com/" }
      ]},
      { name: "Dance - Choreography and Performance", revisionLinks: [
        { title: "BBC Bitesize - Dance", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "Royal Academy of Dance", url: "https://www.royalacademyofdance.org/" },
        { title: "A Dance Educator", url: "https://www.learner.org/" }
      ]},
      { name: "Gymnastics - Floor, Apparatus, and Safety", revisionLinks: [
        { title: "BBC Bitesize - Gymnastics", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "British Gymnastics", url: "https://www.british-gymnastics.org/" }
      ]},
      { name: "Athletics - Track and Field Events", revisionLinks: [
        { title: "BBC Bitesize - Athletics", url: "https://www.bbc.co.uk/bitesize/topics/zfufcdm" },
        { title: "UK Athletics", url: "https://www.uka.org.uk/" }
      ]},
      { name: "Safety in Sport - Injury Prevention and First Aid", revisionLinks: [
        { title: "NHS - Sports Injuries", url: "https://www.nhs.uk/conditions/sports-injuries/" },
        { title: "St John Ambulance - First Aid", url: "https://www.sja.org.uk/" },
        { title: "RICE Treatment Method", url: "https://www.nhs.uk/" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-art",
    name: "Art & Design",
    icon: <Palette className="w-5 h-5" />,
    color: "text-rose-500",
    bgColor: "bg-rose-100",
    description: "Art & Design unleashes your creativity and develops your visual literacy. You'll master drawing and painting techniques, explore diverse materials and processes, study influential artists, and develop your own artistic voice while building a portfolio of personal work.",
    examBoard: "KS3 Art & Design",
    topics: [
      { name: "Drawing Fundamentals - Line, Tone, Texture, and Form", revisionLinks: [
        { title: "BBC Bitesize - Drawing Skills", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Artists Network - Drawing Basics", url: "https://artistsnetwork.com/" },
        { title: "Drawspace - Drawing Lessons", url: "https://www.drawspace.com/" },
        { title: "Proko - Drawing Tutorials", url: "https://www.proko.com/" }
      ]},
      { name: "Observational Drawing - Still Life and Perspective", revisionLinks: [
        { title: "BBC Bitesize - Observation", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Tate - Drawing Techniques", url: "https://www.tate.org.uk/" },
        { title: "Draw Paint Academy - Perspective", url: "https://drawpaintacademy.com/" }
      ]},
      { name: "Colour Theory - Primary, Secondary, Complementary Colors", revisionLinks: [
        { title: "BBC Bitesize - Colour Theory", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Color Matters - Theory", url: "https://www.colormatters.com/" },
        { title: "Adobe - Color Wheel", url: "https://color.adobe.com/" }
      ]},
      { name: "Painting Techniques - Watercolor, Acrylic, and Oil", revisionLinks: [
        { title: "BBC Bitesize - Painting", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Artists Network - Painting", url: "https://artistsnetwork.com/" },
        { title: "WetCanvas - Painting Forums", url: "https://www.wetcanvas.com/" }
      ]},
      { name: "Printmaking - Lino, Screen, and Etching", revisionLinks: [
        { title: "BBC Bitesize - Printmaking", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Tate - Printmaking", url: "https://www.tate.org.uk/" },
        { title: "Printmaking Techniques", url: "https://www.printmakingtechniques.com/" }
      ]},
      { name: "Artist Research - Context, Style, and Influence", revisionLinks: [
        { title: "BBC Bitesize - Artist Analysis", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Tate - Artists A-Z", url: "https://www.tate.org.uk/" },
        { title: "Art UK - Discover Art", url: "https://artuk.org/" },
        { title: "Google Arts & Culture", url: "https://artsandculture.google.com/" }
      ]},
      { name: "Contemporary Art Movements - Pop Art, Street Art, Digital Art", revisionLinks: [
        { title: "Tate - Art Movements", url: "https://www.tate.org.uk/" },
        { title: "MoMA - Modern Art", url: "https://www.moma.org/" },
        { title: "Street Art News", url: "https://streetartnews.net/" }
      ]},
      { name: "Sculpture and 3D Design - Clay, Wire, and Mixed Media", revisionLinks: [
        { title: "BBC Bitesize - Sculpture", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Tate - Sculpture", url: "https://www.tate.org.uk/" },
        { title: "Sculpture.org", url: "https://www.sculpture.org/" }
      ]},
      { name: "Photography and Digital Media - Composition, Editing", revisionLinks: [
        { title: "BBC Bitesize - Photography", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Digital Photography School", url: "https://digital-photography-school.com/" },
        { title: "Adobe - Photoshop Tutorials", url: "https://helpx.adobe.com/uk/photoshop/tutorials.html" }
      ]},
      { name: "Textiles - Fabric, Dye, and Construction Techniques", revisionLinks: [
        { title: "BBC Bitesize - Textiles", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Textile Artist", url: "https://www.textileartist.org/" }
      ]},
      { name: "Graphic Design - Typography, Layout, and Logo Design", revisionLinks: [
        { title: "BBC Bitesize - Graphics", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Canva Design School", url: "https://www.canva.com/designschool/" },
        { title: "Adobe - Graphic Design", url: "https://www.adobe.com/uk/creativecloud.html" }
      ]},
      { name: "Portfolio Development - Sketchbooks and Presentation", revisionLinks: [
        { title: "BBC Bitesize - Portfolio", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "UCAS - Art Portfolio", url: "https://www.ucas.com/" },
        { title: "Art Portfolio Ideas", url: "https://www.studentartguide.com/" }
      ]},
      { name: "Art History - Renaissance, Impressionism, Modernism", revisionLinks: [
        { title: "Khan Academy - Art History", url: "https://www.khanacademy.org/humanities/art-history" },
        { title: "Met Museum - Timeline", url: "https://www.metmuseum.org/" },
        { title: "Art History Project", url: "https://www.arthistoryproject.com/" }
      ]},
      { name: "Critical Analysis - Writing About Art and Evaluation", revisionLinks: [
        { title: "BBC Bitesize - Analysis", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Tate - Art Terms", url: "https://www.tate.org.uk/" },
        { title: "Art Analysis Guide", url: "https://www.khanacademy.org/humanities/art-history" }
      ]},
      { name: "Sustainable Art - Environmental and Eco-Friendly Practices", revisionLinks: [
        { title: "BBC Bitesize - Sustainable Design", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Sustainable Arts", url: "https://www.sustainablearts.org/" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-music",
    name: "Music",
    icon: <Music className="w-5 h-5" />,
    color: "text-violet-600",
    bgColor: "bg-violet-100",
    description: "Music develops your appreciation, understanding, and performance skills across diverse genres and traditions. You'll explore music theory, composition techniques, the science of sound, and develop practical skills on instruments or voice while discovering music's cultural and historical significance.",
    examBoard: "KS3 Music",
    topics: [
      { name: "Music Notation - Staff, Clefs, and Note Values", revisionLinks: [
        { title: "BBC Bitesize - Music Notation", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Music Theory - Notation", url: "https://www.musictheory.net/" },
        { title: "Teoria - Music Theory", url: "https://www.teoria.com/" },
        { title: "8notes - Theory Lessons", url: "https://www.8notes.com/theory/" }
      ]},
      { name: "Rhythm and Time Signatures", revisionLinks: [
        { title: "BBC Bitesize - Rhythm", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Music Theory - Rhythm", url: "https://www.musictheory.net/" },
        { title: "Drum Beats Online", url: "https://www.drumeo.com/" }
      ]},
      { name: "Scales and Keys - Major, Minor, and Modes", revisionLinks: [
        { title: "BBC Bitesize - Scales", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "All Guitar Chords - Scales", url: "https://www.all-guitar-chords.com/" },
        { title: "Piano Scales", url: "https://pianoscales.org/" }
      ]},
      { name: "Chords and Harmony - Triads and Progressions", revisionLinks: [
        { title: "BBC Bitesize - Chords", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Hooktheory - Chord Progressions", url: "https://www.hooktheory.com/" },
        { title: "Chordify - Chord Detection", url: "https://chordify.net/" }
      ]},
      { name: "Instruments of the Orchestra - Strings, Woodwind, Brass, Percussion", revisionLinks: [
        { title: "BBC Bitesize - Orchestra", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Philharmonia - Orchestra", url: "https://www.philharmonia.co.uk/" },
        { title: "DSO Kids - Instruments", url: "https://www.dsokids.com/" }
      ]},
      { name: "Musical Elements - Dynamics, Articulation, Tempo, Texture", revisionLinks: [
        { title: "BBC Bitesize - Elements", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Teoria - Musical Elements", url: "https://www.teoria.com/" },
        { title: "Soundjunction - Elements", url: "https://www.soundjunction.org/" }
      ]},
      { name: "Music History - Baroque, Classical, Romantic Periods", revisionLinks: [
        { title: "BBC Bitesize - Music History", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Classic FM - Composers", url: "https://www.classicfm.com/" },
        { title: "Khan Academy - Music History", url: "https://www.khanacademy.org/humanities/music" }
      ]},
      { name: "Music History - Jazz, Blues, Rock, and Pop", revisionLinks: [
        { title: "BBC Bitesize - Genres", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "AllMusic - Genres", url: "https://www.allmusic.com/" },
        { title: "Rock & Roll Hall of Fame", url: "https://www.rockhall.com/" }
      ]},
      { name: "World Music - African, Asian, Latin American Traditions", revisionLinks: [
        { title: "BBC Bitesize - World Music", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Smithsonian Folkways", url: "https://folkways.si.edu/" },
        { title: "World Music Network", url: "https://www.worldmusic.net/" }
      ]},
      { name: "Composition Techniques - Melody Writing and Structure", revisionLinks: [
        { title: "BBC Bitesize - Composition", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Soundtrap - Online DAW", url: "https://www.soundtrap.com/" },
        { title: "Flat - Sheet Music", url: "https://flat.io/" }
      ]},
      { name: "Composition - Digital Music and MIDI", revisionLinks: [
        { title: "BBC Bitesize - Digital Music", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Ableton Learning Music", url: "https://learningmusic.ableton.com/" },
        { title: "BandLab - Free DAW", url: "https://www.bandlab.com/" }
      ]},
      { name: "Performance Skills - Vocal Technique and Breathing", revisionLinks: [
        { title: "BBC Bitesize - Singing", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Vocalist - Singing Tips", url: "https://www.vocalist.org.uk/" },
        { title: "30 Day Singer", url: "https://www.30daysinger.com/" }
      ]},
      { name: "Performance Skills - Instrumental Practice and Technique", revisionLinks: [
        { title: "BBC Bitesize - Instruments", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Virtual Piano", url: "https://virtualpiano.net/" },
        { title: "Ultimate Guitar - Tabs", url: "https://www.ultimate-guitar.com/" }
      ]},
      { name: "Music Technology - Recording and Production Basics", revisionLinks: [
        { title: "BBC Bitesize - Music Tech", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Audacity - Free Software", url: "https://www.audacityteam.org/" },
        { title: "GarageBand - Tutorial", url: "https://www.apple.com/mac/garageband/" }
      ]},
      { name: "Listening Skills - Analyzing and Appraising Music", revisionLinks: [
        { title: "BBC Bitesize - Analysis", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "Spotify - Music Library", url: "https://www.spotify.com/" },
        { title: "Naxos - Classical Music", url: "https://www.naxos.com/" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-dt",
    name: "Design Technology",
    icon: <Wrench className="w-5 h-5" />,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    description: "Designing and making products using materials and tools",
    examBoard: "KS3 Design & Technology",
    topics: [
      { name: "Materials - Woods, Metals, and Plastics", revisionLinks: [
        { title: "BBC Bitesize - Materials", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" },
        { title: "DT Pupil - Material Properties", url: "https://www.dtpupil.co.uk/materials" },
        { title: "Design Technology Wiki - Material Selection", url: "https://www.design-technology.info/information/index.htm" },
        { title: "YouTube - Wood Joints Tutorial", url: "https://www.youtube.com/watch?v=1QNI3u5U5bI" }
      ]},
      { name: "Design Process and Iteration", revisionLinks: [
        { title: "BBC Bitesize - Design Process", url: "https://www.bbc.co.uk/bitesize/guides/z9vfcj6/revision/1" },
        { title: "Design Council - Double Diamond", url: "https://www.designcouncil.org.uk/our-work/news-opinion/double-diamond" },
        { title: "DT Pupil - Design Cycle", url: "https://www.dtpupil.co.uk/designprocess" },
        { title: "Instructables - Design Thinking", url: "https://www.instructables.com/" }
      ]},
      { name: "Tools and Workshop Safety", revisionLinks: [
        { title: "HSE - Workshop Safety", url: "https://www.hse.gov.uk/education/secondary.htm" },
        { title: "DT Pupil - Hand Tools", url: "https://www.dtpupil.co.uk/tools" },
        { title: "TechSoft - Workshop Safety", url: "https://www.techsoft.co.uk/education/safety" },
        { title: "YouTube - Tool Safety Basics", url: "https://www.youtube.com/watch?v=example" }
      ]},
      { name: "CAD and Technical Drawing", revisionLinks: [
        { title: "Tinkercad - 3D Design Tutorials", url: "https://www.tinkercad.com/learn" },
        { title: "OnShape - CAD Fundamentals", url: "https://www.onshape.com/en/resource-center" },
        { title: "DT Pupil - Technical Drawing", url: "https://www.dtpupil.co.uk/drawing" },
        { title: "SketchUp - Learn 3D Modeling", url: "https://www.sketchup.com/learn" }
      ]},
      { name: "Mechanisms and Structures", revisionLinks: [
        { title: "BBC Bitesize - Mechanisms", url: "https://www.bbc.co.uk/bitesize/topics/zgfv9j6" },
        { title: "DT Pupil - Motion & Mechanisms", url: "https://www.dtpupil.co.uk/mechanisms" },
        { title: "Technology Student - Mechanisms", url: "https://www.technologystudent.com/despro_flsh/mech1.htm" },
        { title: "YouTube - How Gears Work", url: "https://www.youtube.com/watch?v=example" }
      ]},
      { name: "Sustainability and Eco-Design", revisionLinks: [
        { title: "BBC Bitesize - Sustainability", url: "https://www.bbc.co.uk/bitesize/guides/zq8tcdm/revision/1" },
        { title: "Design Council - Sustainable Design", url: "https://www.designcouncil.org.uk/our-work/sustainability" },
        { title: "Ellen MacArthur - Circular Economy", url: "https://ellenmacarthurfoundation.org/topics/circular-economy-introduction" },
        { title: "WRAP - Designing for Recycling", url: "https://wrap.org.uk/" }
      ]},
      { name: "Electronics and Control Systems", revisionLinks: [
        { title: "BBC Bitesize - Electronics", url: "https://www.bbc.co.uk/bitesize/subjects/zpm3cdm" },
        { title: "Technology Student - Circuits", url: "https://www.technologystudent.com/elec1/elec1.htm" },
        { title: "Crickweb - Circuit Builder", url: "https://www.crickweb.co.uk/ks2science.html" },
        { title: "Arduino - Getting Started", url: "https://www.arduino.cc/en/Guide" }
      ]},
      { name: "Textiles and Fashion Design", revisionLinks: [
        { title: "BBC Bitesize - Textiles", url: "https://www.bbc.co.uk/bitesize/subjects/zf3cdm" },
        { title: "Fashion United - Design Process", url: "https://fashionunited.uk/fashion-how-to" },
        { title: "DT Pupil - Fabric Properties", url: "https://www.dtpupil.co.uk/textiles" },
        { title: "Sewing.com - Basic Stitches", url: "https://sewing.com/sewing-stitches/" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-enterprise",
    name: "Enterprise",
    icon: <Lightbulb className="w-5 h-5" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    description: "Business skills, entrepreneurship, and project management",
    examBoard: "KS3 Business & Enterprise",
    topics: [
      { name: "Business Planning and Startup", revisionLinks: [
        { title: "BBC Bitesize - Business Planning", url: "https://www.bbc.co.uk/bitesize/guides/zqp8jty/revision/1" },
        { title: "Young Enterprise - Business Planning", url: "https://www.young-enterprise.org.uk/" },
        { title: "Business Gateway - Start Up Guide", url: "https://www.bgateway.com/start-up" },
        { title: "Gov.uk - Setting Up a Business", url: "https://www.gov.uk/set-up-business" }
      ]},
      { name: "Marketing and Customer Research", revisionLinks: [
        { title: "BBC Bitesize - Marketing Mix", url: "https://www.bbc.co.uk/bitesize/guides/zwfgcdm/revision/1" },
        { title: "Marketing Week - Basics", url: "https://marketingweek.com/" },
        { title: "HubSpot - Marketing Fundamentals", url: "https://academy.hubspot.com/courses/marketing" },
        { title: "SurveyMonkey - Creating Surveys", url: "https://www.surveymonkey.com/mp/survey-guidelines/" }
      ]},
      { name: "Finance and Budgeting", revisionLinks: [
        { title: "BBC Bitesize - Business Finance", url: "https://www.bbc.co.uk/bitesize/guides/zk7fcj6/revision/1" },
        { title: "Money Advice Service - Budgeting", url: "https://www.moneyadviceservice.org.uk/en/categories/budgeting" },
        { title: "NatWest - Money Sense", url: "https://natwest.mymoneysense.com/" },
        { title: "Barclays LifeSkills - Financial Basics", url: "https://barclayslifeskills.com/" }
      ]},
      { name: "Enterprise Project Management", revisionLinks: [
        { title: "Trello - Project Management Basics", url: "https://trello.com/guide" },
        { title: "MindTools - Project Planning", url: "https://www.mindtools.com/page6.html" },
        { title: "Asana - Getting Started Guide", url: "https://academy.asana.com/" },
        { title: "YouTube - Project Management Fundamentals", url: "https://www.youtube.com/watch?v=example" }
      ]},
      { name: "Communication and Pitching", revisionLinks: [
        { title: "TED - The Art of Pitching", url: "https://www.ted.com/playlists/474/the_art_of_the_persuasive_pre" },
        { title: "Toastmasters - Public Speaking", url: "https://www.toastmasters.org/" },
        { title: "YouTube - Elevator Pitch Tips", url: "https://www.youtube.com/watch?v=example" },
        { title: "Harvard Business Review - Presentation Skills", url: "https://hbr.org/topic/subject/communication" }
      ]},
      { name: "Risk Assessment and Problem Solving", revisionLinks: [
        { title: "HSE - Risk Assessment Guide", url: "https://www.hse.gov.uk/simple-health-safety/risk/" },
        { title: "MindTools - Problem Solving", url: "https://www.mindtools.com/page6.html" },
        { title: "Creative Education - Risk Assessment", url: "https://www.creativeeducation.co.uk/" },
        { title: "Business Balls - SWOT Analysis", url: "https://www.businessballs.com/swotanalysis.htm" }
      ]},
      { name: "Entrepreneurship and Innovation", revisionLinks: [
        { title: "Entrepreneur.com - Startup Guide", url: "https://www.entrepreneur.com/" },
        { title: "Startups.co.uk - Business Ideas", url: "https://startups.co.uk/" },
        { title: "Innovate UK - Innovation Support", url: "https://www.ukri.org/councils/innovate-uk/" },
        { title: "Prince's Trust - Enterprise Programme", url: "https://www.princes-trust.org.uk/help-for-young-people/enterprise" }
      ]},
      { name: "Legal and Ethical Business Practices", revisionLinks: [
        { title: "Citizens Advice - Business Rights", url: "https://www.citizensadvice.org.uk/work/rights-at-work/" },
        { title: "ACAS - Employment Rights", url: "https://www.acas.org.uk/" },
        { title: "Trading Standards - Business Advice", url: "https://www.tradingstandards.uk/" },
        { title: "Equality and Human Rights Commission", url: "https://www.equalityhumanrights.com/en" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-engineering",
    name: "Engineering Manufacturing",
    icon: <Cpu className="w-5 h-5" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    description: "Engineering principles and manufacturing processes",
    examBoard: "KS3 Engineering",
    topics: [
      { name: "Engineering Materials and Properties", revisionLinks: [
        { title: "BBC Bitesize - Material Properties", url: "https://www.bbc.co.uk/bitesize/guides/zqqmnbk/revision/1" },
        { title: "MatWeb - Material Database", url: "http://www.matweb.com/" },
        { title: "MakeItFrom - Material Comparison", url: "https://www.makeitfrom.com/" },
        { title: "Engineering Toolbox - Material Properties", url: "https://www.engineeringtoolbox.com/material-properties-d_1225.html" }
      ]},
      { name: "Manufacturing Processes", revisionLinks: [
        { title: "BBC Bitesize - Manufacturing", url: "https://www.bbc.co.uk/bitesize/topics/zfvgcdm" },
        { title: "How It's Made - Manufacturing Videos", url: "https://www.sciencechannel.com/tv-shows/how-its-made/" },
        { title: "Technology Student - Manufacturing", url: "https://www.technologystudent.com/equip1/equip1.htm" },
        { title: "YouTube - CNC Machining Basics", url: "https://www.youtube.com/watch?v=example" }
      ]},
      { name: "Mechanical Systems and Forces", revisionLinks: [
        { title: "BBC Bitesize - Forces and Motion", url: "https://www.bbc.co.uk/bitesize/guides/zgk8jty/revision/1" },
        { title: "Khan Academy - Physics", url: "https://www.khanacademy.org/science/physics" },
        { title: "HyperPhysics - Mechanics", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/mechanics.html" },
        { title: "Engineering Toolbox - Mechanics", url: "https://www.engineeringtoolbox.com/mechanics-t_21.html" }
      ]},
      { name: "Electrical and Electronic Systems", revisionLinks: [
        { title: "BBC Bitesize - Electricity", url: "https://www.bbc.co.uk/bitesize/guides/zqhjcdm/revision/1" },
        { title: "All About Circuits", url: "https://www.allaboutcircuits.com/" },
        { title: "SparkFun - Electronics Tutorials", url: "https://learn.sparkfun.com/" },
        { title: "Adafruit - Learning System", url: "https://learn.adafruit.com/" }
      ]},
      { name: "Quality Control and Testing", revisionLinks: [
        { title: "ASQ - Quality Control Basics", url: "https://asq.org/quality-resources/quality-control" },
        { title: "Six Sigma - Quality Methods", url: "https://www.sixsigma.com/" },
        { title: "Quality Magazine - Testing Methods", url: "https://www.qualitymag.com/" },
        { title: "British Standards Institute", url: "https://www.bsigroup.com/" }
      ]},
      { name: "CAD/CAM in Manufacturing", revisionLinks: [
        { title: "Autodesk - Fusion 360 Learning", url: "https://www.autodesk.com/products/fusion-360/learn" },
        { title: "SolidWorks - CAD Tutorials", url: "https://www.solidworks.com/sw/resources.htm" },
        { title: "OnShape - Cloud CAD", url: "https://www.onshape.com/en/resource-center/" },
        { title: "CNC Cookbook - G-Code Tutorial", url: "https://www.cnccookbook.com/" }
      ]},
      { name: "Automation and Robotics", revisionLinks: [
        { title: "RobotShop - Robotics Learning", url: "https://www.robotshop.com/" },
        { title: "Arduino - Robotics Projects", url: "https://create.arduino.cc/projecthub" },
        { title: "Raspberry Pi - Getting Started", url: "https://www.raspberrypi.org/learn/" },
        { title: "LEGO Education - Robotics", url: "https://education.lego.com/en-gb" }
      ]},
      { name: "Health and Safety in Engineering", revisionLinks: [
        { title: "HSE - Engineering Safety", url: "https://www.hse.gov.uk/engineering/" },
        { title: "IOSH - Safety Management", url: "https://www.iosh.com/" },
        { title: "RoSPA - Safety Training", url: "https://www.rospa.com/" },
        { title: "Engineering UK - Safety Standards", url: "https://www.engineeringuk.com/" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-digitalmedia",
    name: "Digital Media",
    icon: <Film className="w-5 h-5" />,
    color: "text-fuchsia-600",
    bgColor: "bg-fuchsia-100",
    description: "Digital content creation, media production, and design",
    examBoard: "KS3 Digital Media",
    topics: [
      { name: "Digital Graphics and Image Editing", revisionLinks: [
        { title: "BBC Bitesize - Graphics", url: "https://www.bbc.co.uk/bitesize/guides/zp9ngdm/revision/1" },
        { title: "Adobe - Photoshop Tutorials", url: "https://helpx.adobe.com/uk/photoshop/tutorials.html" },
        { title: "Canva - Design School", url: "https://www.canva.com/designschool/" },
        { title: "Pixlr - Free Photo Editor", url: "https://pixlr.com/" }
      ]},
      { name: "Video Production and Editing", revisionLinks: [
        { title: "BBC Bitesize - Video Production", url: "https://www.bbc.co.uk/bitesize/guides/zx8s4j6/revision/1" },
        { title: "Adobe - Premiere Pro Tutorials", url: "https://helpx.adobe.com/uk/premiere-pro/tutorials.html" },
        { title: "YouTube Creator Academy", url: "https://creatoracademy.youtube.com/page/home" },
        { title: "Film Riot - Video Making Tips", url: "https://www.youtube.com/user/filmriot" }
      ]},
      { name: "Audio Production and Sound Design", revisionLinks: [
        { title: "BBC Bitesize - Sound", url: "https://www.bbc.co.uk/bitesize/guides/z8xpmsg/revision/1" },
        { title: "Audacity - Audio Editing", url: "https://www.audacityteam.org/" },
        { title: "Sound on Sound - Recording", url: "https://www.soundonsound.com/" },
        { title: "BandLab - Music Creation", url: "https://www.bandlab.com/" }
      ]},
      { name: "Animation and Motion Graphics", revisionLinks: [
        { title: "BBC Bitesize - Animation", url: "https://www.bbc.co.uk/bitesize/guides/zny3cdm/revision/1" },
        { title: "Adobe - After Effects Tutorials", url: "https://helpx.adobe.com/uk/after-effects/tutorials.html" },
        { title: "Blender - 3D Animation", url: "https://www.blender.org/support/tutorials/" },
        { title: "Animate CC - 2D Animation", url: "https://helpx.adobe.com/uk/animate/tutorials.html" }
      ]},
      { name: "Web Design and User Experience", revisionLinks: [
        { title: "W3Schools - Web Development", url: "https://www.w3schools.com/" },
        { title: "Mozilla - Web Development", url: "https://developer.mozilla.org/en-US/docs/Web" },
        { title: "Codecademy - Learn to Code", url: "https://www.codecademy.com/" },
        { title: "Figma - UI Design", url: "https://www.figma.com/resources/learn-design/" }
      ]},
      { name: "Media Industry and Copyright", revisionLinks: [
        { title: "BBC Bitesize - Media Industry", url: "https://www.bbc.co.uk/bitesize/guides/z9yfr82/revision/1" },
        { title: "UK Copyright Service", url: "https://www.copyrightservice.co.uk/" },
        { title: "Creative Commons", url: "https://creativecommons.org/" },
        { title: "Ofcom - Media Regulation", url: "https://www.ofcom.org.uk/" }
      ]},
      { name: "Photography and Visual Composition", revisionLinks: [
        { title: "Digital Photography School", url: "https://digital-photography-school.com/" },
        { title: "Cambridge in Colour - Tutorials", url: "https://www.cambridgeincolour.com/" },
        { title: "Adobe Lightroom Tutorials", url: "https://helpx.adobe.com/uk/lightroom/tutorials.html" },
        { title: "Photography Life - Basics", url: "https://photographylife.com/" }
      ]},
      { name: "Social Media and Digital Marketing", revisionLinks: [
        { title: "Hootsuite - Social Media Guide", url: "https://blog.hootsuite.com/" },
        { title: "Sprout Social - Marketing", url: "https://sproutsocial.com/insights/" },
        { title: "Buffer - Social Media Strategy", url: "https://buffer.com/resources/" },
        { title: "Later - Instagram Marketing", url: "https://later.com/" }
      ]}
    ],
    yearGroup: 9,
  },
  {
    id: "y9-built",
    name: "Built Environment",
    icon: <Building2 className="w-5 h-5" />,
    color: "text-stone-600",
    bgColor: "bg-stone-100",
    description: "Architecture, construction, and the built world around us",
    topics: [
      { name: "Architectural Design Principles", revisionLinks: [{ title: "BBC Bitesize - Architecture", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" }] },
      { name: "Construction Materials and Methods", revisionLinks: [{ title: "BBC Bitesize - Construction", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" }] },
      { name: "Sustainable Building Design", revisionLinks: [{ title: "BBC Bitesize - Sustainability", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" }] },
      { name: "Urban Planning and Communities", revisionLinks: [{ title: "BBC Bitesize - Planning", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" }] },
      { name: "Technical Drawing and Scale", revisionLinks: [{ title: "BBC Bitesize - Drawing", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" }] },
      { name: "Building Regulations and Safety", revisionLinks: [{ title: "BBC Bitesize - Safety", url: "https://www.bbc.co.uk/bitesize/subjects/zpf3cdm" }] }
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
    description: "GCSE Mathematics covering Number, Algebra, Geometry, Statistics, and Ratio with Edexcel exam board. Develop problem-solving skills and mathematical reasoning for higher-tier content.",
    examBoard: "Edexcel",
    topics: [
      { name: "Number - Surds, Indices, Standard Form, Bounds", revisionLinks: [
        { title: "BBC Bitesize GCSE - Number", url: "https://www.bbc.co.uk/bitesize/topics/zqhs34j" },
        { title: "Corbettmaths - Number", url: "https://corbettmaths.com/contents/" },
        { title: "MathsGenie - Surds & Indices", url: "https://www.mathsgenie.co.uk/number.html" },
        { title: "DrFrostMaths - Number", url: "https://www.drfrostmaths.com/" }
      ]},
      { name: "Algebra - Quadratic Equations, Simultaneous Equations", revisionLinks: [
        { title: "BBC Bitesize GCSE - Algebra", url: "https://www.bbc.co.uk/bitesize/topics/zw6tyrd" },
        { title: "MathsGenie - Quadratic Equations", url: "https://www.mathsgenie.co.uk/algebra.html" },
        { title: "Corbettmaths - Solving Quadratics", url: "https://corbettmaths.com/contents/" }
      ]},
      { name: "Algebra - Inequalities, Algebraic Fractions", revisionLinks: [
        { title: "BBC Bitesize - Inequalities", url: "https://www.bbc.co.uk/bitesize/topics/zw6tyrd" },
        { title: "MathsGenie - Algebraic Fractions", url: "https://www.mathsgenie.co.uk/algebra.html" }
      ]},
      { name: "Graphs - Linear, Quadratic, Cubic, Reciprocal", revisionLinks: [
        { title: "BBC Bitesize - Graphs", url: "https://www.bbc.co.uk/bitesize/topics/zr98pbk" },
        { title: "Corbettmaths - Graphs", url: "https://corbettmaths.com/contents/" }
      ]},
      { name: "Graphs - Circle, Exponential, Trigonometric", revisionLinks: [
        { title: "MathsGenie - Graph Transformations", url: "https://www.mathsgenie.co.uk/graphs.html" },
        { title: "BBC Bitesize - Advanced Graphs", url: "https://www.bbc.co.uk/bitesize/topics/zr98pbk" }
      ]},
      { name: "Geometry - Pythagoras, Trigonometry (SOH CAH TOA)", revisionLinks: [
        { title: "BBC Bitesize - Trigonometry", url: "https://www.bbc.co.uk/bitesize/topics/zr98pbk" },
        { title: "Corbettmaths - Trigonometry", url: "https://corbettmaths.com/contents/" },
        { title: "MathsGenie - SOH CAH TOA", url: "https://www.mathsgenie.co.uk/trigonometry.html" }
      ]},
      { name: "Geometry - Sine Rule, Cosine Rule, Area of Triangle", revisionLinks: [
        { title: "BBC Bitesize - Advanced Trigonometry", url: "https://www.bbc.co.uk/bitesize/topics/zr98pbk" },
        { title: "Corbettmaths - Sine & Cosine Rule", url: "https://corbettmaths.com/contents/" }
      ]},
      { name: "Geometry - Circle Theorems", revisionLinks: [
        { title: "BBC Bitesize - Circle Theorems", url: "https://www.bbc.co.uk/bitesize/topics/zr98pbk" },
        { title: "MathsGenie - Circle Theorems", url: "https://www.mathsgenie.co.uk/geometry.html" }
      ]},
      { name: "Geometry - Vectors and Vector Geometry", revisionLinks: [
        { title: "BBC Bitesize - Vectors", url: "https://www.bbc.co.uk/bitesize/topics/zr98pbk" },
        { title: "Corbettmaths - Vectors", url: "https://corbettmaths.com/contents/" }
      ]},
      { name: "Statistics - Data Collection, Sampling, Averages", revisionLinks: [
        { title: "BBC Bitesize GCSE - Statistics", url: "https://www.bbc.co.uk/bitesize/topics/z8nycdm" },
        { title: "MathsGenie - Statistics", url: "https://www.mathsgenie.co.uk/statistics.html" }
      ]},
      { name: "Statistics - Cumulative Frequency, Box Plots, Histograms", revisionLinks: [
        { title: "BBC Bitesize - Representing Data", url: "https://www.bbc.co.uk/bitesize/topics/z8nycdm" },
        { title: "Corbettmaths - Cumulative Frequency", url: "https://corbettmaths.com/contents/" }
      ]},
      { name: "Statistics - Probability - Tree Diagrams, Venn Diagrams", revisionLinks: [
        { title: "BBC Bitesize - Probability", url: "https://www.bbc.co.uk/bitesize/topics/z8nycdm" },
        { title: "MathsGenie - Probability", url: "https://www.mathsgenie.co.uk/probability.html" }
      ]},
      { name: "Statistics - Conditional Probability", revisionLinks: [
        { title: "BBC Bitesize - Conditional Probability", url: "https://www.bbc.co.uk/bitesize/topics/z8nycdm" },
        { title: "Corbettmaths - Conditional Probability", url: "https://corbettmaths.com/contents/" }
      ]},
      { name: "Ratio and Proportion - Direct & Inverse Proportion", revisionLinks: [
        { title: "BBC Bitesize GCSE - Ratio", url: "https://www.bbc.co.uk/bitesize/topics/zsxhfg8" },
        { title: "MathsGenie - Proportion", url: "https://www.mathsgenie.co.uk/ratio.html" }
      ]},
      { name: "Ratio and Proportion - Compound Measures, Density, Pressure", revisionLinks: [
        { title: "BBC Bitesize - Compound Measures", url: "https://www.bbc.co.uk/bitesize/topics/zsxhfg8" },
        { title: "Corbettmaths - Speed, Density, Pressure", url: "https://corbettmaths.com/contents/" }
      ]},
      { name: "Sequences - nth Term, Quadratic Sequences", revisionLinks: [
        { title: "BBC Bitesize - Sequences", url: "https://www.bbc.co.uk/bitesize/topics/zw6tyrd" },
        { title: "MathsGenie - Sequences", url: "https://www.mathsgenie.co.uk/sequences.html" }
      ]},
      { name: "Transformations - Enlargement, Negative Scale Factor", revisionLinks: [
        { title: "BBC Bitesize - Transformations", url: "https://www.bbc.co.uk/bitesize/topics/zr98pbk" },
        { title: "Corbettmaths - Enlargement", url: "https://corbettmaths.com/contents/" }
      ]},
      { name: "Constructions and Loci", revisionLinks: [
        { title: "BBC Bitesize - Constructions", url: "https://www.bbc.co.uk/bitesize/topics/zr98pbk" },
        { title: "MathsGenie - Constructions", url: "https://www.mathsgenie.co.uk/constructions.html" }
      ]},
      { name: "Similarity and Congruence", revisionLinks: [
        { title: "BBC Bitesize - Similarity", url: "https://www.bbc.co.uk/bitesize/topics/zr98pbk" },
        { title: "Corbettmaths - Similar Shapes", url: "https://corbettmaths.com/contents/" }
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
    description: "GCSE English Language and Literature with AQA. Study Shakespeare, modern drama, poetry anthologies, and develop analytical and creative writing skills for examination success.",
    examBoard: "AQA",
    topics: [
      { name: "Shakespeare - Macbeth: Characters & Themes", revisionLinks: [
        { title: "BBC Bitesize - Macbeth", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "SparkNotes - Macbeth", url: "https://www.sparknotes.com/shakespeare/macbeth/" },
        { title: "No Fear Shakespeare - Macbeth", url: "https://www.sparknotes.com/nofear/shakespeare/macbeth/" },
        { title: "Royal Shakespeare Company - Macbeth", url: "https://www.rsc.org.uk/macbeth" }
      ]},
      { name: "Shakespeare - Macbeth: Context & Language", revisionLinks: [
        { title: "BBC Bitesize - Macbeth Context", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "Shakespeare's Globe - Macbeth", url: "https://www.shakespearesglobe.com/" }
      ]},
      { name: "Modern Text - An Inspector Calls: Themes", revisionLinks: [
        { title: "BBC Bitesize - An Inspector Calls", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "SparkNotes - An Inspector Calls", url: "https://www.sparknotes.com/lit/inspectorcalls/" },
        { title: "LitCharts - An Inspector Calls", url: "https://www.litcharts.com/lit/an-inspector-calls" }
      ]},
      { name: "Modern Text - An Inspector Calls: Characters & Context", revisionLinks: [
        { title: "BBC Bitesize - AIC Characters", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "StudyRocket - An Inspector Calls", url: "https://studyrocket.co.uk/" }
      ]},
      { name: "Poetry Anthology - Power & Conflict: Key Poems", revisionLinks: [
        { title: "BBC Bitesize - Power & Conflict", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "Poetry Essay - Analysis", url: "https://poetryessay.co.uk/" },
        { title: "StudyRocket - Poetry Anthology", url: "https://studyrocket.co.uk/" }
      ]},
      { name: "Poetry Anthology - Comparison & Analysis Techniques", revisionLinks: [
        { title: "BBC Bitesize - Poetry Comparison", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "Mr Bruff - Poetry Analysis", url: "https://mrbruff.com/" }
      ]},
      { name: "Unseen Poetry - Analysis Techniques", revisionLinks: [
        { title: "BBC Bitesize - Unseen Poetry", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "StudyRocket - Unseen Poetry", url: "https://studyrocket.co.uk/" }
      ]},
      { name: "Unseen Poetry - Structure, Form & Language", revisionLinks: [
        { title: "BBC Bitesize - Poetry Techniques", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "Mr Bruff - Unseen Poetry", url: "https://mrbruff.com/" }
      ]},
      { name: "English Language - Paper 1: Fiction Reading", revisionLinks: [
        { title: "BBC Bitesize - Fiction Reading", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "Mr Bruff - Paper 1", url: "https://mrbruff.com/" }
      ]},
      { name: "English Language - Paper 1: Creative Writing", revisionLinks: [
        { title: "BBC Bitesize - Creative Writing", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "The Tutor Pages - Creative Writing", url: "https://www.thetutorpages.com/" }
      ]},
      { name: "English Language - Paper 2: Non-Fiction Reading", revisionLinks: [
        { title: "BBC Bitesize - Non-Fiction", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "StudyRocket - Paper 2", url: "https://studyrocket.co.uk/" }
      ]},
      { name: "English Language - Paper 2: Transactional Writing", revisionLinks: [
        { title: "BBC Bitesize - Transactional Writing", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "Mr Bruff - Writing Skills", url: "https://mrbruff.com/" }
      ]},
      { name: "Language Analysis - Writers' Methods & Effects", revisionLinks: [
        { title: "BBC Bitesize - Language Analysis", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "StudyRocket - Writers' Methods", url: "https://studyrocket.co.uk/" }
      ]},
      { name: "Language Analysis - Structure & Form", revisionLinks: [
        { title: "BBC Bitesize - Structure", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "Mr Bruff - Structure", url: "https://mrbruff.com/" }
      ]},
      { name: "Exam Technique - Timing & Essay Planning", revisionLinks: [
        { title: "BBC Bitesize - Exam Skills", url: "https://www.bbc.co.uk/bitesize/topics/zr9dmnb" },
        { title: "AQA - English GCSE", url: "https://www.aqa.org.uk/subjects/english" }
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
    description: "GCSE Combined Science (AQA Trilogy) covering Biology, Chemistry, and Physics. Study cell biology, atomic structure, forces, energy, chemical reactions, and complete required practicals.",
    examBoard: "AQA",
    topics: [
      { name: "Biology - Cell Biology: Structure, Transport, Division", revisionLinks: [
        { title: "BBC Bitesize GCSE - Cell Biology", url: "https://www.bbc.co.uk/bitesize/subjects/zng4d2p" },
        { title: "Free Science Lessons - Cells", url: "https://www.freesciencelessons.co.uk/gcse-biology/" },
        { title: "AQA - Cell Biology", url: "https://www.aqa.org.uk/subjects/science" },
        { title: "Cognito - Cell Biology", url: "https://cognitoscience.org/" }
      ]},
      { name: "Biology - Organisation: Digestive, Circulatory Systems", revisionLinks: [
        { title: "BBC Bitesize - Organisation", url: "https://www.bbc.co.uk/bitesize/subjects/zng4d2p" },
        { title: "Free Science Lessons - Organisation", url: "https://www.freesciencelessons.co.uk/gcse-biology/" }
      ]},
      { name: "Biology - Infection & Response: Disease, Immunity", revisionLinks: [
        { title: "BBC Bitesize - Infection", url: "https://www.bbc.co.uk/bitesize/subjects/zng4d2p" },
        { title: "Free Science Lessons - Infection", url: "https://www.freesciencelessons.co.uk/gcse-biology/" }
      ]},
      { name: "Biology - Bioenergetics: Photosynthesis, Respiration", revisionLinks: [
        { title: "BBC Bitesize - Bioenergetics", url: "https://www.bbc.co.uk/bitesize/subjects/zng4d2p" },
        { title: "Free Science Lessons - Bioenergetics", url: "https://www.freesciencelessons.co.uk/gcse-biology/" }
      ]},
      { name: "Biology - Homeostasis: Nervous, Endocrine Systems", revisionLinks: [
        { title: "BBC Bitesize - Homeostasis", url: "https://www.bbc.co.uk/bitesize/subjects/zng4d2p" },
        { title: "Free Science Lessons - Homeostasis", url: "https://www.freesciencelessons.co.uk/gcse-biology/" }
      ]},
      { name: "Biology - Inheritance, Variation & Evolution", revisionLinks: [
        { title: "BBC Bitesize - Genetics", url: "https://www.bbc.co.uk/bitesize/subjects/zng4d2p" },
        { title: "Free Science Lessons - Genetics", url: "https://www.freesciencelessons.co.uk/gcse-biology/" }
      ]},
      { name: "Chemistry - Atomic Structure & The Periodic Table", revisionLinks: [
        { title: "BBC Bitesize GCSE - Atomic Structure", url: "https://www.bbc.co.uk/bitesize/subjects/z8cycdm" },
        { title: "Free Science Lessons - Atomic Structure", url: "https://www.freesciencelessons.co.uk/gcse-chemistry/" },
        { title: "Cognito - Atomic Structure", url: "https://cognitoscience.org/" }
      ]},
      { name: "Chemistry - Bonding, Structure & Properties", revisionLinks: [
        { title: "BBC Bitesize - Bonding", url: "https://www.bbc.co.uk/bitesize/subjects/z8cycdm" },
        { title: "Free Science Lessons - Bonding", url: "https://www.freesciencelessons.co.uk/gcse-chemistry/" }
      ]},
      { name: "Chemistry - Quantitative Chemistry: Moles, Equations", revisionLinks: [
        { title: "BBC Bitesize - Quantitative Chemistry", url: "https://www.bbc.co.uk/bitesize/subjects/z8cycdm" },
        { title: "Free Science Lessons - Quantitative", url: "https://www.freesciencelessons.co.uk/gcse-chemistry/" }
      ]},
      { name: "Chemistry - Chemical Changes: Acids, Reactivity", revisionLinks: [
        { title: "BBC Bitesize - Chemical Changes", url: "https://www.bbc.co.uk/bitesize/subjects/z8cycdm" },
        { title: "Free Science Lessons - Chemical Changes", url: "https://www.freesciencelessons.co.uk/gcse-chemistry/" }
      ]},
      { name: "Chemistry - Energy Changes: Exothermic, Endothermic", revisionLinks: [
        { title: "BBC Bitesize - Energy Changes", url: "https://www.bbc.co.uk/bitesize/subjects/z8cycdm" },
        { title: "Free Science Lessons - Energy", url: "https://www.freesciencelessons.co.uk/gcse-chemistry/" }
      ]},
      { name: "Physics - Energy: Stores, Transfers, Efficiency", revisionLinks: [
        { title: "BBC Bitesize GCSE - Energy", url: "https://www.bbc.co.uk/bitesize/subjects/zpm6fg8" },
        { title: "Free Science Lessons - Energy", url: "https://www.freesciencelessons.co.uk/gcse-physics/" },
        { title: "Cognito - Energy", url: "https://cognitoscience.org/" }
      ]},
      { name: "Physics - Electricity: Circuits, Resistance, Mains", revisionLinks: [
        { title: "BBC Bitesize - Electricity", url: "https://www.bbc.co.uk/bitesize/subjects/zpm6fg8" },
        { title: "Free Science Lessons - Electricity", url: "https://www.freesciencelessons.co.uk/gcse-physics/" }
      ]},
      { name: "Physics - Particle Model & Atomic Structure", revisionLinks: [
        { title: "BBC Bitesize - Particle Model", url: "https://www.bbc.co.uk/bitesize/subjects/zpm6fg8" },
        { title: "Free Science Lessons - Particles", url: "https://www.freesciencelessons.co.uk/gcse-physics/" }
      ]},
      { name: "Physics - Forces: Motion, Pressure, Moments", revisionLinks: [
        { title: "BBC Bitesize - Forces", url: "https://www.bbc.co.uk/bitesize/subjects/zpm6fg8" },
        { title: "Free Science Lessons - Forces", url: "https://www.freesciencelessons.co.uk/gcse-physics/" }
      ]},
      { name: "Required Practicals - Biology Practicals", revisionLinks: [
        { title: "BBC Bitesize - Biology Practicals", url: "https://www.bbc.co.uk/bitesize/guides/zqwpmnb/revision/1" },
        { title: "AQA - Required Practicals", url: "https://www.aqa.org.uk/subjects/science" }
      ]},
      { name: "Required Practicals - Chemistry Practicals", revisionLinks: [
        { title: "BBC Bitesize - Chemistry Practicals", url: "https://www.bbc.co.uk/bitesize/guides/zqwpmnb/revision/1" },
        { title: "Free Science Lessons - Practicals", url: "https://www.freesciencelessons.co.uk/" }
      ]},
      { name: "Required Practicals - Physics Practicals", revisionLinks: [
        { title: "BBC Bitesize - Physics Practicals", url: "https://www.bbc.co.uk/bitesize/guides/zqwpmnb/revision/1" },
        { title: "Cognito - Practicals", url: "https://cognitoscience.org/" }
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
    description: "BTEC Tech Award in Enterprise developing business skills, marketing understanding, and financial literacy. Learn about entrepreneurship, market research, and business planning through practical projects.",
    topics: [
      { name: "Component 1: Exploring Enterprises - Types & Characteristics", revisionLinks: [
        { title: "BBC Bitesize - Business Types", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Tutor2u - Enterprise", url: "https://www.tutor2u.net/" },
        { title: "BTEC Enterprise Resources", url: "https://www.btec.co.uk/" }
      ]},
      { name: "Component 1: Entrepreneurial Mindset & Skills", revisionLinks: [
        { title: "BBC Bitesize - Entrepreneurship", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Young Enterprise", url: "https://www.young-enterprise.org.uk/" }
      ]},
      { name: "Component 1: Market Research - Primary & Secondary", revisionLinks: [
        { title: "BBC Bitesize - Market Research", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Tutor2u - Research Methods", url: "https://www.tutor2u.net/" }
      ]},
      { name: "Component 2: Planning & Pitching - Business Plans", revisionLinks: [
        { title: "BBC Bitesize - Business Planning", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Business Wales - Business Plans", url: "https://businesswales.gov.wales/" }
      ]},
      { name: "Component 2: Financial Planning - Costs, Revenue, Profit", revisionLinks: [
        { title: "BBC Bitesize - Finance", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Tutor2u - Financial Planning", url: "https://www.tutor2u.net/" }
      ]},
      { name: "Component 2: Cash Flow Forecasting", revisionLinks: [
        { title: "BBC Bitesize - Cash Flow", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Tutor2u - Cash Flow", url: "https://www.tutor2u.net/" }
      ]},
      { name: "Component 2: Presenting & Pitching Techniques", revisionLinks: [
        { title: "BBC Bitesize - Presentation Skills", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "MindTools - Pitching", url: "https://www.mindtools.com/" }
      ]},
      { name: "Component 3: Promotion - Marketing Mix (4Ps)", revisionLinks: [
        { title: "BBC Bitesize - Marketing", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Tutor2u - Marketing Mix", url: "https://www.tutor2u.net/" }
      ]},
      { name: "Component 3: Target Market & Segmentation", revisionLinks: [
        { title: "BBC Bitesize - Market Segmentation", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Tutor2u - Segmentation", url: "https://www.tutor2u.net/" }
      ]},
      { name: "Component 3: Digital Marketing & Social Media", revisionLinks: [
        { title: "BBC Bitesize - Digital Marketing", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Digital Marketing Institute", url: "https://digitalmarketinginstitute.com/" }
      ]},
      { name: "Finance - Break-even Analysis & Budgeting", revisionLinks: [
        { title: "BBC Bitesize - Break-even", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Tutor2u - Break-even", url: "https://www.tutor2u.net/" }
      ]},
      { name: "Customer Service Excellence", revisionLinks: [
        { title: "BBC Bitesize - Customer Service", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Institute of Customer Service", url: "https://www.instituteofcustomerservice.com/" }
      ]},
      { name: "Adding Value & Competitive Advantage", revisionLinks: [
        { title: "BBC Bitesize - Adding Value", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Tutor2u - Competitive Advantage", url: "https://www.tutor2u.net/" }
      ]},
      { name: "Risk Assessment & Business Risks", revisionLinks: [
        { title: "BBC Bitesize - Business Risks", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "Health & Safety Executive", url: "https://www.hse.gov.uk/" }
      ]},
      { name: "Legal Structures - Sole Trader, Partnership, Ltd Company", revisionLinks: [
        { title: "BBC Bitesize - Legal Structures", url: "https://www.bbc.co.uk/bitesize/subjects/zcdkng8" },
        { title: "GOV.UK - Business Structures", url: "https://www.gov.uk/business-legal-structures" }
      ]}
    ],
    yearGroup: 10,
  },
  {
    id: "geography",
    name: "Geography",
    icon: <Globe className="w-5 h-5" />,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    description: "GCSE Geography (AQA) exploring both physical and human geography. Study natural hazards, ecosystems, urban environments, resource management, and develop geographical skills including fieldwork.",
    examBoard: "AQA",
    topics: [
      { name: "Natural Hazards - Tectonic Hazards: Earthquakes & Volcanoes", revisionLinks: [
        { title: "BBC Bitesize GCSE - Tectonics", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "AQA Geography - Tectonics", url: "https://www.aqa.org.uk/subjects/geography" },
        { title: "Cool Geography - Tectonics", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "Natural Hazards - Weather Hazards: Tropical Storms, Climate Change", revisionLinks: [
        { title: "BBC Bitesize - Weather Hazards", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - Weather", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "The Living World - Ecosystems, Tropical Rainforests", revisionLinks: [
        { title: "BBC Bitesize - Ecosystems", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - Rainforests", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "The Living World - Hot Deserts & Cold Environments", revisionLinks: [
        { title: "BBC Bitesize - Deserts", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - Deserts", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "Physical Landscapes - Coastal Landscapes", revisionLinks: [
        { title: "BBC Bitesize - Coasts", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - Coasts", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "Physical Landscapes - River Landscapes", revisionLinks: [
        { title: "BBC Bitesize - Rivers", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - Rivers", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "Urban Issues - Urban Growth & Megacities", revisionLinks: [
        { title: "BBC Bitesize - Urban Issues", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - Urban", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "Urban Issues - Urban Sustainability", revisionLinks: [
        { title: "BBC Bitesize - Sustainable Cities", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - Sustainability", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "The Changing Economic World - Development & Indicators", revisionLinks: [
        { title: "BBC Bitesize - Development", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - Development", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "The Changing Economic World - The Changing UK Economy", revisionLinks: [
        { title: "BBC Bitesize - UK Economy", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - UK Economy", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "Resource Management - Food, Water, Energy", revisionLinks: [
        { title: "BBC Bitesize - Resources", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - Resources", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "Resource Management - Energy Option (if chosen)", revisionLinks: [
        { title: "BBC Bitesize - Energy", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - Energy", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "Geographical Skills - Map Skills, OS Maps, Grid References", revisionLinks: [
        { title: "BBC Bitesize - Map Skills", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Ordnance Survey - Map Skills", url: "https://www.ordnancesurvey.co.uk/" },
        { title: "Cool Geography - Map Skills", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "Geographical Skills - Graphs, Charts & Data Analysis", revisionLinks: [
        { title: "BBC Bitesize - Data Skills", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - Data", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "Fieldwork - Investigation Design & Methodology", revisionLinks: [
        { title: "BBC Bitesize - Fieldwork", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "AQA - Fieldwork", url: "https://www.aqa.org.uk/subjects/geography" }
      ]},
      { name: "Fieldwork - Data Presentation & Analysis", revisionLinks: [
        { title: "BBC Bitesize - Fieldwork Analysis", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - Fieldwork", url: "https://www.coolgeography.co.uk/" }
      ]},
      { name: "Fieldwork - Conclusions, Evaluation & GIS", revisionLinks: [
        { title: "BBC Bitesize - Evaluation", url: "https://www.bbc.co.uk/bitesize/topics/zdnkng8" },
        { title: "Cool Geography - GIS", url: "https://www.coolgeography.co.uk/" }
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
    description: "GCSE Design & Technology developing design thinking, practical making skills, and technical knowledge. Study materials, manufacturing, CAD/CAM, sustainability, and complete the NEA (Non-Examined Assessment) coursework project.",
    examBoard: "AQA",
    topics: [
      { name: "Design Process - Identifying Needs & Opportunities", revisionLinks: [
        { title: "BBC Bitesize - Design Process", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Design", url: "https://www.technologystudent.com/" },
        { title: "AQA DT - Design", url: "https://www.aqa.org.uk/subjects/design-and-technology" }
      ]},
      { name: "Design Process - Developing Design Ideas", revisionLinks: [
        { title: "BBC Bitesize - Developing Ideas", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Development", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Design Process - Modelling, Testing & Evaluation", revisionLinks: [
        { title: "BBC Bitesize - Modelling", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Testing", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Materials - Wood, Metal, Polymers, Paper & Board", revisionLinks: [
        { title: "BBC Bitesize - Materials", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Materials", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Materials - Textiles, Composites, Smart Materials", revisionLinks: [
        { title: "BBC Bitesize - Smart Materials", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Smart Materials", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Manufacturing - Forming, Cutting, Shaping, Joining", revisionLinks: [
        { title: "BBC Bitesize - Manufacturing", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Manufacture", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Manufacturing - Finishing Techniques & Quality", revisionLinks: [
        { title: "BBC Bitesize - Finishing", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Finishing", url: "https://www.technologystudent.com/" }
      ]},
      { name: "CAD (Computer Aided Design) - Software & Applications", revisionLinks: [
        { title: "BBC Bitesize - CAD", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - CAD", url: "https://www.technologystudent.com/" },
        { title: "Autodesk Tinkercad", url: "https://www.tinkercad.com/" }
      ]},
      { name: "CAM (Computer Aided Manufacture) - CNC, Laser Cutting, 3D Printing", revisionLinks: [
        { title: "BBC Bitesize - CAM", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - CAM", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Sustainability - Environmental Impact & Eco-Design", revisionLinks: [
        { title: "BBC Bitesize - Sustainability", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Sustainability", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Sustainability - 6Rs, Product Life Cycle, Circular Economy", revisionLinks: [
        { title: "BBC Bitesize - 6Rs", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "WRAP - Circular Economy", url: "https://wrap.org.uk/" }
      ]},
      { name: "Technical Principles - Forces, Stresses, Mechanical Devices", revisionLinks: [
        { title: "BBC Bitesize - Technical Principles", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Mechanisms", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Technical Principles - Electronics & Control Systems", revisionLinks: [
        { title: "BBC Bitesize - Electronics", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Electronics", url: "https://www.technologystudent.com/" }
      ]},
      { name: "NEA (Non-Examined Assessment) - Contextual Challenge", revisionLinks: [
        { title: "BBC Bitesize - NEA", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "AQA - NEA Guidance", url: "https://www.aqa.org.uk/subjects/design-and-technology" }
      ]},
      { name: "NEA - Portfolio Development & Evidence", revisionLinks: [
        { title: "BBC Bitesize - Portfolio", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Design Portfolio", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Health & Safety in the Workshop", revisionLinks: [
        { title: "BBC Bitesize - Health & Safety", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "HSE - School Workshops", url: "https://www.hse.gov.uk/" }
      ]},
      { name: "Ergonomics & Anthropometrics", revisionLinks: [
        { title: "BBC Bitesize - Ergonomics", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Ergonomics", url: "https://www.technologystudent.com/" }
      ]}
    ],
    yearGroup: 10,
  },
  {
    id: "computerscience",
    name: "Computer Science",
    icon: <Cpu className="w-5 h-5" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    description: "GCSE Computer Science (OCR) covering programming, algorithms, computer systems, data representation, networks, and cybersecurity. Develop computational thinking and practical programming skills in Python.",
    examBoard: "OCR",
    topics: [
      { name: "Algorithms - Computational Thinking & Problem Solving", revisionLinks: [
        { title: "BBC Bitesize - Algorithms", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "OCR - Computational Thinking", url: "https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2016/" },
        { title: "CS Newbs - Algorithms", url: "https://www.csenews.co.uk/" },
        { title: "W3Schools - Algorithms", url: "https://www.w3schools.com/python/" }
      ]},
      { name: "Algorithms - Sorting Algorithms (Bubble, Merge, Quick)", revisionLinks: [
        { title: "BBC Bitesize - Sorting", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "VisuAlgo - Sorting", url: "https://visualgo.net/" }
      ]},
      { name: "Algorithms - Searching Algorithms (Linear, Binary)", revisionLinks: [
        { title: "BBC Bitesize - Searching", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "CS Newbs - Searching", url: "https://www.csenews.co.uk/" }
      ]},
      { name: "Programming - Python Basics: Variables, Data Types", revisionLinks: [
        { title: "BBC Bitesize - Python", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "W3Schools - Python", url: "https://www.w3schools.com/python/" },
        { title: "Programiz - Python", url: "https://www.programiz.com/python-programming" }
      ]},
      { name: "Programming - Control Flow: If, For, While Loops", revisionLinks: [
        { title: "BBC Bitesize - Control Flow", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "W3Schools - Python Loops", url: "https://www.w3schools.com/python/" }
      ]},
      { name: "Programming - Functions, Procedures & Modular Code", revisionLinks: [
        { title: "BBC Bitesize - Functions", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "W3Schools - Functions", url: "https://www.w3schools.com/python/" }
      ]},
      { name: "Programming - File Handling & Data Structures", revisionLinks: [
        { title: "BBC Bitesize - File Handling", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "W3Schools - File Handling", url: "https://www.w3schools.com/python/" }
      ]},
      { name: "Programming - Validation, Testing & Debugging", revisionLinks: [
        { title: "BBC Bitesize - Testing", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "OCR - Programming", url: "https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2016/" }
      ]},
      { name: "Data Representation - Binary, Denary, Hexadecimal", revisionLinks: [
        { title: "BBC Bitesize - Data Representation", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "CS Newbs - Binary", url: "https://www.csenews.co.uk/" }
      ]},
      { name: "Data Representation - Images, Sound & Compression", revisionLinks: [
        { title: "BBC Bitesize - Images & Sound", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "CS Newbs - Compression", url: "https://www.csenews.co.uk/" }
      ]},
      { name: "Computer Systems - CPU, Von Neumann Architecture", revisionLinks: [
        { title: "BBC Bitesize - Computer Systems", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "CS Newbs - CPU", url: "https://www.csenews.co.uk/" }
      ]},
      { name: "Computer Systems - Memory, Storage & Embedded Systems", revisionLinks: [
        { title: "BBC Bitesize - Memory", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "OCR - Systems", url: "https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2016/" }
      ]},
      { name: "Networks - Network Types, Topologies, Protocols", revisionLinks: [
        { title: "BBC Bitesize - Networks", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "CS Newbs - Networks", url: "https://www.csenews.co.uk/" }
      ]},
      { name: "Networks - Internet, Client-Server, DNS, Cloud", revisionLinks: [
        { title: "BBC Bitesize - Internet", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "CS Newbs - Internet", url: "https://www.csenews.co.uk/" }
      ]},
      { name: "Cybersecurity - Threats, Malware, Social Engineering", revisionLinks: [
        { title: "BBC Bitesize - Cybersecurity", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "NCSC - Cyber Security", url: "https://www.ncsc.gov.uk/" }
      ]},
      { name: "Cybersecurity - Prevention: Encryption, Firewalls, Passwords", revisionLinks: [
        { title: "BBC Bitesize - Security Methods", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "CS Newbs - Security", url: "https://www.csenews.co.uk/" }
      ]},
      { name: "Impacts - Ethical, Legal, Cultural & Environmental", revisionLinks: [
        { title: "BBC Bitesize - Impacts", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "OCR - Impacts", url: "https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2016/" }
      ]},
      { name: "Programming Project - Practical Programming Tasks", revisionLinks: [
        { title: "BBC Bitesize - Programming", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" },
        { title: "OCR - Programming Project", url: "https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2016/" }
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
    description: "BTEC First Award in Engineering developing practical engineering principles, materials knowledge, and manufacturing understanding. Study engineering processes, technical drawing, quality control, and complete practical projects.",
    topics: [
      { name: "Engineering Sectors & Products - Industry Overview", revisionLinks: [
        { title: "BBC Bitesize - Engineering", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Engineering UK", url: "https://www.engineeringuk.com/" },
        { title: "Pearson BTEC - Engineering", url: "https://qualifications.pearson.com/" }
      ]},
      { name: "Engineering Materials - Ferrous & Non-Ferrous Metals", revisionLinks: [
        { title: "BBC Bitesize - Materials", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "MatWeb - Material Properties", url: "http://www.matweb.com/" }
      ]},
      { name: "Engineering Materials - Polymers, Ceramics, Composites", revisionLinks: [
        { title: "BBC Bitesize - Polymers", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Materials", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Material Properties - Mechanical, Physical, Chemical", revisionLinks: [
        { title: "BBC Bitesize - Material Properties", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "MatWeb - Properties Database", url: "http://www.matweb.com/" }
      ]},
      { name: "Material Selection & Application", revisionLinks: [
        { title: "BBC Bitesize - Material Selection", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Granta Design - CES Edupack", url: "https://www.grantadesign.com/" }
      ]},
      { name: "Manufacturing Processes - Forming & Shaping", revisionLinks: [
        { title: "BBC Bitesize - Manufacturing", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Manufacture", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Manufacturing Processes - Joining & Assembly", revisionLinks: [
        { title: "BBC Bitesize - Joining", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Joining", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Manufacturing Processes - Finishing & Treatments", revisionLinks: [
        { title: "BBC Bitesize - Finishing", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Finishing", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Engineering Drawings - Orthographic Projection", revisionLinks: [
        { title: "BBC Bitesize - Technical Drawing", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Orthographic", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Engineering Drawings - Isometric, Sectional Views", revisionLinks: [
        { title: "BBC Bitesize - Isometric", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Isometric", url: "https://www.technologystudent.com/" }
      ]},
      { name: "CAD (Computer Aided Design)", revisionLinks: [
        { title: "BBC Bitesize - CAD", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Autodesk Fusion 360", url: "https://www.autodesk.com/products/fusion-360/" }
      ]},
      { name: "Quality Control & Quality Assurance", revisionLinks: [
        { title: "BBC Bitesize - Quality", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "BSI - Quality Standards", url: "https://www.bsigroup.com/" }
      ]},
      { name: "Health & Safety in Engineering - Risk Assessment", revisionLinks: [
        { title: "BBC Bitesize - H&S", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "HSE - Engineering", url: "https://www.hse.gov.uk/" }
      ]},
      { name: "Health & Safety - PPE, COSHH, Legislation", revisionLinks: [
        { title: "BBC Bitesize - Safety Legislation", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "HSE - COSHH", url: "https://www.hse.gov.uk/coshh/" }
      ]},
      { name: "Component 1: Investigating Engineered Products", revisionLinks: [
        { title: "Pearson BTEC - Component 1", url: "https://qualifications.pearson.com/" },
        { title: "BBC Bitesize - Product Analysis", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }
      ]},
      { name: "Component 2: Investigating an Engineered Product (Practical)", revisionLinks: [
        { title: "Pearson BTEC - Component 2", url: "https://qualifications.pearson.com/" },
        { title: "Technologystudent - Projects", url: "https://www.technologystudent.com/" }
      ]}
    ],
    yearGroup: 10,
  },
  {
    id: "builtenvironment",
    name: "Built Environment",
    icon: <Building2 className="w-5 h-5" />,
    color: "text-stone-600",
    bgColor: "bg-stone-200",
    description: "BTEC First Award in Construction and the Built Environment exploring construction technology, design, sustainability, and building performance. Learn about the construction industry, technical design, and sustainable building practices.",
    topics: [
      { name: "Construction Industry Overview - Sectors & Careers", revisionLinks: [
        { title: "BBC Bitesize - Construction", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "CITB - Construction Industry", url: "https://www.citb.co.uk/" },
        { title: "Pearson BTEC - Built Environment", url: "https://qualifications.pearson.com/" }
      ]},
      { name: "Construction Technology - Substructure: Foundations", revisionLinks: [
        { title: "BBC Bitesize - Foundations", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "CITB - Substructure", url: "https://www.citb.co.uk/" }
      ]},
      { name: "Construction Technology - Superstructure: Walls, Floors, Roofs", revisionLinks: [
        { title: "BBC Bitesize - Superstructure", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "NHBC - House Building", url: "https://www.nhbc.co.uk/" }
      ]},
      { name: "Construction Technology - Building Services: M&E", revisionLinks: [
        { title: "BBC Bitesize - Building Services", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "CIBSE - Building Services", url: "https://www.cibse.org/" }
      ]},
      { name: "Construction Materials - Timber, Brick, Concrete, Steel", revisionLinks: [
        { title: "BBC Bitesize - Construction Materials", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Designing Buildings - Materials", url: "https://www.designingbuildings.co.uk/" }
      ]},
      { name: "Construction Materials - Properties, Selection & Sustainability", revisionLinks: [
        { title: "BBC Bitesize - Material Properties", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Green Building Council - Materials", url: "https://www.ukgbc.org/" }
      ]},
      { name: "Design & Planning - Architectural Drawings & CAD", revisionLinks: [
        { title: "BBC Bitesize - Design", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Autodesk - AutoCAD", url: "https://www.autodesk.com/products/autocad/" }
      ]},
      { name: "Design & Planning - Planning Permission & Regulations", revisionLinks: [
        { title: "BBC Bitesize - Planning", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Planning Portal - UK Planning", url: "https://www.planningportal.co.uk/" }
      ]},
      { name: "Building Regulations - Building Control & Compliance", revisionLinks: [
        { title: "BBC Bitesize - Regulations", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "GOV.UK - Building Regulations", url: "https://www.gov.uk/building-regulations" }
      ]},
      { name: "Sustainable Building - Green Technologies & BREEAM", revisionLinks: [
        { title: "BBC Bitesize - Sustainability", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "BREEAM - Sustainability", url: "https://www.breeam.com/" }
      ]},
      { name: "Sustainable Building - Energy Efficiency & Insulation", revisionLinks: [
        { title: "BBC Bitesize - Energy Efficiency", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Energy Saving Trust", url: "https://energysavingtrust.org.uk/" }
      ]},
      { name: "Site Safety - Health & Safety Legislation", revisionLinks: [
        { title: "BBC Bitesize - Site Safety", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "HSE - Construction", url: "https://www.hse.gov.uk/construction/" }
      ]},
      { name: "Site Safety - Risk Assessment & PPE", revisionLinks: [
        { title: "BBC Bitesize - H&S", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "CITB - Safety", url: "https://www.citb.co.uk/" }
      ]},
      { name: "Structural Performance - Loads, Forces & Stability", revisionLinks: [
        { title: "BBC Bitesize - Structures", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Designing Buildings - Structures", url: "https://www.designingbuildings.co.uk/" }
      ]},
      { name: "Component 1: Construction Technology Exam", revisionLinks: [
        { title: "Pearson BTEC - Component 1", url: "https://qualifications.pearson.com/" },
        { title: "BBC Bitesize - Revision", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" }
      ]}
    ],
    yearGroup: 10,
  },
  {
    id: "art",
    name: "Art & Design",
    icon: <Palette className="w-5 h-5" />,
    color: "text-rose-500",
    bgColor: "bg-rose-100",
    description: "GCSE Art & Design developing creative skills across multiple media including drawing, painting, printmaking, sculpture, and photography. Build a personal portfolio through sustained projects and artist research.",
    examBoard: "AQA",
    topics: [
      { name: "Drawing - Observation, Proportion, Tone, Texture", revisionLinks: [
        { title: "BBC Bitesize - Drawing", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Student Art Guide - Drawing", url: "https://www.studentartguide.com/" },
        { title: "AQA - Art GCSE", url: "https://www.aqa.org.uk/subjects/art-and-design" }
      ]},
      { name: "Drawing - Mark-making, Line Quality & Expression", revisionLinks: [
        { title: "BBC Bitesize - Drawing Techniques", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Student Art Guide - Techniques", url: "https://www.studentartguide.com/" }
      ]},
      { name: "Painting - Watercolour, Acrylic, Oil Techniques", revisionLinks: [
        { title: "BBC Bitesize - Painting", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Student Art Guide - Painting", url: "https://www.studentartguide.com/" }
      ]},
      { name: "Painting - Colour Theory, Mixing & Application", revisionLinks: [
        { title: "BBC Bitesize - Colour Theory", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Colour Academy", url: "https://www.colouracademy.com/" }
      ]},
      { name: "Printmaking - Lino, Etching, Screen Print, Mono", revisionLinks: [
        { title: "BBC Bitesize - Printmaking", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Student Art Guide - Printmaking", url: "https://www.studentartguide.com/" }
      ]},
      { name: "3D Work & Sculpture - Clay, Wire, Mixed Media", revisionLinks: [
        { title: "BBC Bitesize - Sculpture", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Student Art Guide - Sculpture", url: "https://www.studentartguide.com/" }
      ]},
      { name: "3D Work - Construction Techniques & Modelling", revisionLinks: [
        { title: "BBC Bitesize - 3D Construction", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Tate - Sculpture Techniques", url: "https://www.tate.org.uk/" }
      ]},
      { name: "Photography - Composition, Lighting, Editing", revisionLinks: [
        { title: "BBC Bitesize - Photography", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Student Art Guide - Photography", url: "https://www.studentartguide.com/" }
      ]},
      { name: "Artist Research - Context, Analysis & Response", revisionLinks: [
        { title: "BBC Bitesize - Artists", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Student Art Guide - Research", url: "https://www.studentartguide.com/" },
        { title: "Tate - Artists", url: "https://www.tate.org.uk/art/artists" }
      ]},
      { name: "Artist Research - Critical Analysis & Annotation", revisionLinks: [
        { title: "BBC Bitesize - Analysis", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Student Art Guide - Annotation", url: "https://www.studentartguide.com/" }
      ]},
      { name: "Portfolio Development - Sustained Project", revisionLinks: [
        { title: "BBC Bitesize - Portfolio", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "AQA - Portfolio", url: "https://www.aqa.org.uk/subjects/art-and-design" },
        { title: "Student Art Guide - Portfolio", url: "https://www.studentartguide.com/" }
      ]},
      { name: "Portfolio Development - Refinement & Presentation", revisionLinks: [
        { title: "BBC Bitesize - Presentation", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Student Art Guide - Layout", url: "https://www.studentartguide.com/" }
      ]},
      { name: "Portfolio Development - Externally Set Assignment", revisionLinks: [
        { title: "AQA - Externally Set Assignment", url: "https://www.aqa.org.uk/subjects/art-and-design" },
        { title: "BBC Bitesize - Exam Unit", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }
      ]},
      { name: "Mixed Media & Experimental Techniques", revisionLinks: [
        { title: "BBC Bitesize - Mixed Media", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Student Art Guide - Mixed Media", url: "https://www.studentartguide.com/" }
      ]},
      { name: "Textiles & Fashion Design (if chosen)", revisionLinks: [
        { title: "BBC Bitesize - Textiles", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Student Art Guide - Textiles", url: "https://www.studentartguide.com/" }
      ]},
      { name: "Graphic Communication (if chosen)", revisionLinks: [
        { title: "BBC Bitesize - Graphics", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Student Art Guide - Graphics", url: "https://www.studentartguide.com/" }
      ]}
    ],
    yearGroup: 10,
  },
  {
    id: "digitalmedia",
    name: "Digital Media",
    icon: <Film className="w-5 h-5" />,
    color: "text-violet-600",
    bgColor: "bg-violet-100",
    description: "BTEC Tech Award in Creative Media Production developing skills in video production, audio editing, graphic design, animation, and interactive media. Create professional media products using industry-standard software.",
    topics: [
      { name: "Component 1: Media Sectors & Audiences - Industry Overview", revisionLinks: [
        { title: "BBC Bitesize - Media", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Pearson BTEC - Digital Media", url: "https://qualifications.pearson.com/" },
        { title: "Media.info - Industry Data", url: "https://www.media.info/" }
      ]},
      { name: "Component 1: Audience Theory & Demographics", revisionLinks: [
        { title: "BBC Bitesize - Audience", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Media Theories - Audience", url: "https://www.media-studies.com/" }
      ]},
      { name: "Component 1: Research Methods & Media Products", revisionLinks: [
        { title: "BBC Bitesize - Research", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Pearson - Component 1", url: "https://qualifications.pearson.com/" }
      ]},
      { name: "Component 2: Pre-Production - Planning & Pitching", revisionLinks: [
        { title: "BBC Bitesize - Pre-Production", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Pearson - Component 2", url: "https://qualifications.pearson.com/" }
      ]},
      { name: "Video Production - Camera Techniques & Framing", revisionLinks: [
        { title: "BBC Bitesize - Camera", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Media College - Camera", url: "https://www.mediacollege.com/" }
      ]},
      { name: "Video Production - Editing: Premiere Pro/Final Cut", revisionLinks: [
        { title: "Adobe - Premiere Pro", url: "https://www.adobe.com/products/premiere.html" },
        { title: "BBC Bitesize - Editing", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }
      ]},
      { name: "Audio Production - Recording & Editing Techniques", revisionLinks: [
        { title: "BBC Bitesize - Audio", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Audacity - Audio Editing", url: "https://www.audacityteam.org/" }
      ]},
      { name: "Graphic Design - Photoshop, Illustrator, Layout", revisionLinks: [
        { title: "Adobe - Photoshop", url: "https://www.adobe.com/products/photoshop.html" },
        { title: "BBC Bitesize - Graphics", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }
      ]},
      { name: "Animation - 2D Animation Techniques", revisionLinks: [
        { title: "BBC Bitesize - Animation", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Animate - 2D Animation", url: "https://www.adobe.com/products/animate.html" }
      ]},
      { name: "Animation - Stop Motion & Motion Graphics", revisionLinks: [
        { title: "BBC Bitesize - Stop Motion", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Media College - Animation", url: "https://www.mediacollege.com/" }
      ]},
      { name: "Digital Storytelling - Narrative & Scriptwriting", revisionLinks: [
        { title: "BBC Bitesize - Storytelling", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "BBC Writersroom - Scriptwriting", url: "https://www.bbc.co.uk/writersroom/" }
      ]},
      { name: "Interactive Media - Web Design & Apps", revisionLinks: [
        { title: "BBC Bitesize - Web Design", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "W3Schools - Web Dev", url: "https://www.w3schools.com/" }
      ]},
      { name: "Media Theory - Semiotics & Representation", revisionLinks: [
        { title: "BBC Bitesize - Media Theory", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Media Studies - Theory", url: "https://www.media-studies.com/" }
      ]},
      { name: "Legal & Ethical Issues - Copyright, Regulation", revisionLinks: [
        { title: "BBC Bitesize - Media Law", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" },
        { title: "Ofcom - Broadcasting Code", url: "https://www.ofcom.org.uk/" }
      ]},
      { name: "Component 3: Create a Media Product (Practical)", revisionLinks: [
        { title: "Pearson - Component 3", url: "https://qualifications.pearson.com/" },
        { title: "BBC Bitesize - Production", url: "https://www.bbc.co.uk/bitesize/subjects/z6f3cdm" }
      ]}
    ],
    yearGroup: 10,
  },
  {
    id: "mechatronics",
    name: "Mechatronics & Robotics",
    icon: <Bot className="w-5 h-5" />,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
    description: "BTEC First Award in Engineering (Mechatronics pathway) combining mechanical, electronic, and software systems. Study robotics fundamentals, electronics, programming controllers, sensors, actuators, and build practical robot projects.",
    topics: [
      { name: "Mechatronics Systems Overview - Integration of M/E/S", revisionLinks: [
        { title: "BBC Bitesize - Engineering", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Institution of Engineering - Mechatronics", url: "https://www.theiet.org/" },
        { title: "Pearson BTEC - Engineering", url: "https://qualifications.pearson.com/" }
      ]},
      { name: "Robotics Fundamentals - Robot Components & Types", revisionLinks: [
        { title: "BBC Bitesize - Robotics", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Robot Shop - Robot Info", url: "https://www.robotshop.com/" }
      ]},
      { name: "Robotics Fundamentals - Degrees of Freedom & Kinematics", revisionLinks: [
        { title: "Robot Ignite Academy", url: "https://www.robotigniteacademy.com/" },
        { title: "SparkFun - Robotics", url: "https://www.sparkfun.com/" }
      ]},
      { name: "Electronics & Circuits - Basic Circuit Theory", revisionLinks: [
        { title: "BBC Bitesize - Electronics", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "All About Circuits", url: "https://www.allaboutcircuits.com/" },
        { title: "Electronics Tutorials", url: "https://www.electronics-tutorials.ws/" }
      ]},
      { name: "Electronics - Logic Gates, Boolean Algebra", revisionLinks: [
        { title: "BBC Bitesize - Logic Gates", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "All About Circuits - Logic", url: "https://www.allaboutcircuits.com/" }
      ]},
      { name: "Electronics - Power Supplies, Motors & Drivers", revisionLinks: [
        { title: "BBC Bitesize - Motors", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Adafruit - Motor Control", url: "https://www.adafruit.com/" }
      ]},
      { name: "Programming Controllers - Arduino Programming", revisionLinks: [
        { title: "Arduino - Getting Started", url: "https://www.arduino.cc/" },
        { title: "BBC Bitesize - Programming", url: "https://www.bbc.co.uk/bitesize/subjects/z34k7ty" }
      ]},
      { name: "Programming Controllers - MicroPython/Raspberry Pi", revisionLinks: [
        { title: "Raspberry Pi - Projects", url: "https://www.raspberrypi.org/" },
        { title: "MicroPython - Documentation", url: "https://micropython.org/" }
      ]},
      { name: "Sensors - Types: IR, Ultrasonic, Light, Touch", revisionLinks: [
        { title: "SparkFun - Sensors", url: "https://www.sparkfun.com/" },
        { title: "Adafruit - Sensors", url: "https://www.adafruit.com/" }
      ]},
      { name: "Sensors - Calibration & Signal Processing", revisionLinks: [
        { title: "All About Circuits - Sensors", url: "https://www.allaboutcircuits.com/" },
        { title: "Arduino - Sensor Tutorials", url: "https://www.arduino.cc/" }
      ]},
      { name: "Actuators - Servos, Steppers, DC Motors", revisionLinks: [
        { title: "SparkFun - Actuators", url: "https://www.sparkfun.com/" },
        { title: "Adafruit - Motors", url: "https://www.adafruit.com/" }
      ]},
      { name: "Actuators - Pneumatics & Hydraulics Basics", revisionLinks: [
        { title: "BBC Bitesize - Pneumatics", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "Technologystudent - Pneumatics", url: "https://www.technologystudent.com/" }
      ]},
      { name: "Control Systems - Open Loop vs Closed Loop", revisionLinks: [
        { title: "BBC Bitesize - Control Systems", url: "https://www.bbc.co.uk/bitesize/subjects/zf4dcqt" },
        { title: "All About Circuits - Control", url: "https://www.allaboutcircuits.com/" }
      ]},
      { name: "Control Systems - PID Control Basics", revisionLinks: [
        { title: "Robot Ignite Academy - PID", url: "https://www.robotigniteacademy.com/" },
        { title: "Adafruit - PID Tutorial", url: "https://www.adafruit.com/" }
      ]},
      { name: "Robot Building Projects - Line Following Robot", revisionLinks: [
        { title: "Instructables - Line Follower", url: "https://www.instructables.com/" },
        { title: "Arduino Project Hub", url: "https://create.arduino.cc/projecthub" }
      ]},
      { name: "Robot Building Projects - Obstacle Avoidance Robot", revisionLinks: [
        { title: "Instructables - Obstacle Avoidance", url: "https://www.instructables.com/" },
        { title: "SparkFun - Projects", url: "https://www.sparkfun.com/" }
      ]},
      { name: "Robot Building Projects - Robotic Arm/Manipulator", revisionLinks: [
        { title: "Instructables - Robotic Arm", url: "https://www.instructables.com/" },
        { title: "Thingiverse - Robot Arm", url: "https://www.thingiverse.com/" }
      ]}
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
      {
        id: "y9-maths-5",
        question: "Calculate: 12 + 8 × 3",
        options: ["60", "36", "48", "52"],
        correctAnswer: 1,
        explanation: "Following BIDMAS: 8 × 3 = 24, then 12 + 24 = 36"
      },
      {
        id: "y9-maths-6",
        question: "What is the LCM of 6 and 8?",
        options: ["2", "14", "24", "48"],
        correctAnswer: 2,
        explanation: "Multiples of 6: 6, 12, 18, 24... Multiples of 8: 8, 16, 24... LCM is 24"
      },
      {
        id: "y9-maths-7",
        question: "Convert 0.75 to a fraction in its simplest form",
        options: ["3/4", "75/100", "7/10", "4/5"],
        correctAnswer: 0,
        explanation: "0.75 = 75/100 = 3/4 when simplified"
      },
      {
        id: "y9-maths-8",
        question: "If 3 apples cost £1.20, how much would 5 apples cost?",
        options: ["£1.80", "£2.00", "£1.50", "£2.40"],
        correctAnswer: 1,
        explanation: "1 apple costs 40p, so 5 apples cost £2.00"
      },
      {
        id: "y9-maths-9",
        question: "Simplify the expression: 5x + 3y - 2x + 4y",
        options: ["3x + 7y", "7x - y", "3x + y", "7x + y"],
        correctAnswer: 0,
        explanation: "Combine like terms: 5x - 2x = 3x and 3y + 4y = 7y, so 3x + 7y"
      },
      {
        id: "y9-maths-10",
        question: "Solve: 3(x + 4) = 21",
        options: ["x = 7", "x = 3", "x = 11", "x = 9"],
        correctAnswer: 1,
        explanation: "3(x + 4) = 21 → x + 4 = 7 → x = 3"
      },
      {
        id: "y9-maths-11",
        question: "What is the next number in the sequence: 3, 7, 11, 15, ...?",
        options: ["17", "18", "19", "20"],
        correctAnswer: 2,
        explanation: "The sequence increases by 4 each time: 15 + 4 = 19"
      },
      {
        id: "y9-maths-12",
        question: "Find the value of 3a - 2b when a = 5 and b = 3",
        options: ["9", "11", "21", "7"],
        correctAnswer: 0,
        explanation: "3(5) - 2(3) = 15 - 6 = 9"
      },
      {
        id: "y9-maths-13",
        question: "What is the perimeter of a triangle with sides 6cm, 8cm, and 10cm?",
        options: ["18 cm", "24 cm", "48 cm²", "24 cm²"],
        correctAnswer: 1,
        explanation: "Perimeter = 6 + 8 + 10 = 24 cm"
      },
      {
        id: "y9-maths-14",
        question: "What is the volume of a cube with side length 4cm?",
        options: ["12 cm³", "16 cm³", "64 cm³", "48 cm³"],
        correctAnswer: 2,
        explanation: "Volume = 4³ = 4 × 4 × 4 = 64 cm³"
      },
      {
        id: "y9-maths-15",
        question: "In a right-angled triangle, the two shorter sides are 3cm and 4cm. What is the hypotenuse?",
        options: ["5 cm", "6 cm", "7 cm", "12 cm"],
        correctAnswer: 0,
        explanation: "Using Pythagoras: √(3² + 4²) = √(9 + 16) = √25 = 5 cm"
      },
      {
        id: "y9-maths-16",
        question: "What is the mean of: 5, 8, 12, 7, 8?",
        options: ["7", "8", "6", "8.5"],
        correctAnswer: 1,
        explanation: "Mean = (5 + 8 + 12 + 7 + 8) ÷ 5 = 40 ÷ 5 = 8"
      },
      {
        id: "y9-maths-17",
        question: "What is the probability of rolling a 6 on a fair dice?",
        options: ["1/5", "1/6", "6/1", "1/3"],
        correctAnswer: 1,
        explanation: "There is 1 favorable outcome (rolling a 6) out of 6 possible outcomes, so probability = 1/6"
      },
      {
        id: "y9-maths-18",
        question: "If the angles in a triangle are 45° and 65°, what is the third angle?",
        options: ["50°", "70°", "110°", "60°"],
        correctAnswer: 1,
        explanation: "Sum of angles in a triangle = 180°, so third angle = 180 - 45 - 65 = 70°"
      },
      {
        id: "y9-maths-19",
        question: "Divide £120 in the ratio 2:3",
        options: ["£48 and £72", "£40 and £80", "£60 and £60", "£50 and £70"],
        correctAnswer: 0,
        explanation: "2 + 3 = 5 parts. £120 ÷ 5 = £24 per part. 2 parts = £48, 3 parts = £72"
      },
      {
        id: "y9-maths-20",
        question: "What is 15% of 200?",
        options: ["20", "25", "30", "40"],
        correctAnswer: 2,
        explanation: "10% of 200 = 20, 5% of 200 = 10, so 15% = 20 + 10 = 30"
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
        explanation: "sin(30°) = 0.5 or 1/2. This is a standard trigonometric value you need to memorise."
      },
      {
        id: "y10-maths-3",
        question: "Solve 3x² - 12x + 9 = 0. What are the solutions?",
        options: ["x = 1 and x = 3", "x = -1 and x = -3", "x = 2 and x = 4", "x = 0 and x = 4"],
        correctAnswer: 0,
        explanation: "Factorise: 3(x² - 4x + 3) = 3(x - 1)(x - 3) = 0, so x = 1 or x = 3"
      },
      {
        id: "y10-maths-4",
        question: "In a right-angled triangle, the opposite side is 8cm and adjacent is 6cm. What is tan(θ)?",
        options: ["4/3", "3/4", "8/6", "6/8"],
        correctAnswer: 0,
        explanation: "tan(θ) = opposite/adjacent = 8/6 = 4/3"
      },
      {
        id: "y10-maths-5",
        question: "What is cos(60°)?",
        options: ["0", "0.5", "√3/2", "1"],
        correctAnswer: 1,
        explanation: "cos(60°) = 0.5 or 1/2. Remember: sin(30) = cos(60) = 0.5"
      },
      {
        id: "y10-maths-6",
        question: "Simplify √50 + √18",
        options: ["8√2", "5√2 + 3√2", "√68", "2√17"],
        correctAnswer: 0,
        explanation: "√50 = √(25×2) = 5√2, √18 = √(9×2) = 3√2, so 5√2 + 3√2 = 8√2"
      },
      {
        id: "y10-maths-7",
        question: "A circle has radius 5cm. What is its area?",
        options: ["10π cm²", "25π cm²", "5π cm²", "20π cm²"],
        correctAnswer: 1,
        explanation: "Area = πr² = π × 5² = 25π cm²"
      },
      {
        id: "y10-maths-8",
        question: "Find the nth term of the sequence: 5, 9, 13, 17, 21...",
        options: ["4n + 1", "4n + 5", "5n - 1", "3n + 2"],
        correctAnswer: 0,
        explanation: "Common difference = 4. First term: 4(1) + 1 = 5. Formula is 4n + 1"
      },
      {
        id: "y10-maths-9",
        question: "Calculate 2³ × 2⁵",
        options: ["2¹⁵", "2⁸", "4⁸", "4¹⁵"],
        correctAnswer: 1,
        explanation: "When multiplying with same base, add indices: 2³ × 2⁵ = 2⁸"
      },
      {
        id: "y10-maths-10",
        question: "If y is directly proportional to x, and y = 20 when x = 4, what is y when x = 7?",
        options: ["28", "35", "45", "140"],
        correctAnswer: 1,
        explanation: "y = kx, so 20 = k×4, k = 5. When x = 7: y = 5×7 = 35"
      },
      {
        id: "y10-maths-11",
        question: "What is the upper bound of 3.6m measured to the nearest 0.1m?",
        options: ["3.65m", "3.55m", "3.61m", "3.605m"],
        correctAnswer: 0,
        explanation: "Upper bound = 3.6 + 0.05 = 3.65m (half of the precision interval)"
      },
      {
        id: "y10-maths-12",
        question: "Solve the simultaneous equations: 2x + y = 7 and x - y = -1",
        options: ["x = 2, y = 3", "x = 3, y = 1", "x = 4, y = -1", "x = 1, y = 5"],
        correctAnswer: 0,
        explanation: "Adding equations: 3x = 6, so x = 2. Substituting: 2(2) + y = 7, so y = 3"
      },
      {
        id: "y10-maths-13",
        question: "What is the interior angle of a regular hexagon?",
        options: ["120°", "108°", "135°", "140°"],
        correctAnswer: 0,
        explanation: "Sum of interior angles = (n-2)×180° = (6-2)×180° = 720°. Each angle = 720°÷6 = 120°"
      },
      {
        id: "y10-maths-14",
        question: "Factorise fully: x² - 9",
        options: ["(x-3)(x+3)", "(x-3)²", "(x+3)²", "x(x-9)"],
        correctAnswer: 0,
        explanation: "This is difference of squares: x² - 9 = x² - 3² = (x-3)(x+3)"
      },
      {
        id: "y10-maths-15",
        question: "A box plot shows: Min=10, LQ=20, Median=30, UQ=40, Max=50. What is the interquartile range?",
        options: ["10", "20", "30", "40"],
        correctAnswer: 1,
        explanation: "IQR = UQ - LQ = 40 - 20 = 20"
      },
      {
        id: "y10-maths-16",
        question: "If 8ᵃ = 2, what is the value of a?",
        options: ["1/3", "1/2", "2", "3"],
        correctAnswer: 0,
        explanation: "8 = 2³, so 8ᵃ = (2³)ᵃ = 2³ᵃ = 2¹. Therefore 3a = 1, so a = 1/3"
      },
      {
        id: "y10-maths-17",
        question: "Find the equation of a line passing through (2, 5) with gradient 3",
        options: ["y = 3x - 1", "y = 3x + 1", "y = 3x - 5", "y = 3x + 5"],
        correctAnswer: 0,
        explanation: "Using y - y₁ = m(x - x₁): y - 5 = 3(x - 2), so y = 3x - 6 + 5 = 3x - 1"
      },
      {
        id: "y10-maths-18",
        question: "A number increased by 15% equals 230. What was the original number?",
        options: ["200", "195", "197.5", "202"],
        correctAnswer: 0,
        explanation: "Original × 1.15 = 230. Original = 230 ÷ 1.15 = 200"
      },
      {
        id: "y10-maths-19",
        question: "In a Venn diagram, if P(A) = 0.4, P(B) = 0.5 and P(A∩B) = 0.2, what is P(A∪B)?",
        options: ["0.7", "0.6", "0.9", "0.1"],
        correctAnswer: 0,
        explanation: "P(A∪B) = P(A) + P(B) - P(A∩B) = 0.4 + 0.5 - 0.2 = 0.7"
      },
      {
        id: "y10-maths-20",
        question: "A cylinder has radius 4cm and height 10cm. What is its volume?",
        options: ["160π cm³", "40π cm³", "80π cm³", "120π cm³"],
        correctAnswer: 0,
        explanation: "Volume = πr²h = π × 4² × 10 = 160π cm³"
      }
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
        explanation: "Pure water has a neutral pH of 7 at 25°C."
      },
      {
        id: "y10-sci-2",
        question: "Which organelle contains the cell's genetic material?",
        options: ["Mitochondria", "Ribosome", "Nucleus", "Cytoplasm"],
        correctAnswer: 2,
        explanation: "The nucleus contains chromosomes made of DNA which carries genetic information."
      },
      {
        id: "y10-sci-3",
        question: "In the equation for photosynthesis, what are the products?",
        options: ["Glucose and oxygen", "Carbon dioxide and water", "Glucose and carbon dioxide", "Oxygen and water"],
        correctAnswer: 0,
        explanation: "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Products are glucose and oxygen."
      },
      {
        id: "y10-sci-4",
        question: "What is the relative mass and charge of a neutron?",
        options: ["Mass 1, Charge 0", "Mass 0, Charge -1", "Mass 1, Charge +1", "Mass 0, Charge 0"],
        correctAnswer: 0,
        explanation: "A neutron has a relative mass of 1 and no charge (neutral)."
      },
      {
        id: "y10-sci-5",
        question: "Which blood vessel carries oxygenated blood from the lungs to the heart?",
        options: ["Aorta", "Pulmonary artery", "Pulmonary vein", "Vena cava"],
        correctAnswer: 2,
        explanation: "The pulmonary vein carries oxygenated blood from the lungs to the left atrium of the heart."
      },
      {
        id: "y10-sci-6",
        question: "What is the word equation for aerobic respiration?",
        options: ["Glucose + Oxygen → Carbon dioxide + Water + Energy", "Glucose → Lactic acid + Energy", "Carbon dioxide + Water → Glucose + Oxygen", "Glucose + Oxygen → Ethanol + Carbon dioxide + Energy"],
        correctAnswer: 0,
        explanation: "Aerobic respiration uses oxygen to break down glucose, releasing energy, CO₂ and water."
      },
      {
        id: "y10-sci-7",
        question: "Which group of the periodic table contains the alkali metals?",
        options: ["Group 0", "Group 1", "Group 7", "Group 2"],
        correctAnswer: 1,
        explanation: "Group 1 contains the alkali metals (Li, Na, K, Rb, Cs, Fr). They are highly reactive."
      },
      {
        id: "y10-sci-8",
        question: "What is the formula for work done?",
        options: ["Work = Force × Distance", "Work = Force ÷ Distance", "Work = Mass × Acceleration", "Work = Power × Time"],
        correctAnswer: 0,
        explanation: "Work done (J) = Force (N) × Distance moved in direction of force (m)."
      },
      {
        id: "y10-sci-9",
        question: "Which of these is a function of the nervous system?",
        options: ["Hormone production", "Digestion of food", "Coordination of body responses", "Waste removal"],
        correctAnswer: 2,
        explanation: "The nervous system detects stimuli and coordinates rapid responses via electrical impulses."
      },
      {
        id: "y10-sci-10",
        question: "What happens to the rate of reaction when temperature increases?",
        options: ["It decreases", "It stays the same", "It increases", "It stops"],
        correctAnswer: 2,
        explanation: "Increasing temperature increases particle kinetic energy, leading to more frequent and energetic collisions."
      },
      {
        id: "y10-sci-11",
        question: "What is the function of the cell membrane?",
        options: ["To produce proteins", "To control what enters and leaves the cell", "To store genetic material", "To release energy"],
        correctAnswer: 1,
        explanation: "The cell membrane is selectively permeable, controlling the movement of substances in and out."
      },
      {
        id: "y10-sci-12",
        question: "What is the chemical formula for calcium carbonate?",
        options: ["CaCO", "CaCO₂", "CaCO₃", "CaC"],
        correctAnswer: 2,
        explanation: "Calcium carbonate has the formula CaCO₃ (calcium ion Ca²⁺, carbonate ion CO₃²⁻)."
      },
      {
        id: "y10-sci-13",
        question: "In a food chain, which organisms are always the producers?",
        options: ["Animals", "Plants and algae", "Fungi", "Bacteria"],
        correctAnswer: 1,
        explanation: "Producers (plants and algae) make their own food through photosynthesis."
      },
      {
        id: "y10-sci-14",
        question: "What is the relationship between current, voltage and resistance (Ohm's Law)?",
        options: ["V = I × R", "V = I ÷ R", "V = R ÷ I", "V = I + R"],
        correctAnswer: 0,
        explanation: "Ohm's Law: Voltage (V) = Current (I) × Resistance (R)."
      },
      {
        id: "y10-sci-15",
        question: "Which hormone is responsible for lowering blood glucose levels?",
        options: ["Glucagon", "Insulin", "Adrenaline", "Thyroxine"],
        correctAnswer: 1,
        explanation: "Insulin (produced by pancreas) lowers blood glucose by promoting glucose uptake by cells and storage as glycogen."
      },
      {
        id: "y10-sci-16",
        question: "What is the atomic number of an element equal to?",
        options: ["Number of neutrons", "Number of protons", "Number of electrons in outer shell", "Mass number"],
        correctAnswer: 1,
        explanation: "Atomic number = number of protons. This determines the element's identity and position in periodic table."
      },
      {
        id: "y10-sci-17",
        question: "Which process describes the net movement of water molecules across a partially permeable membrane?",
        options: ["Diffusion", "Osmosis", "Active transport", "Evaporation"],
        correctAnswer: 1,
        explanation: "Osmosis is the net movement of water from high water potential to low water potential across a partially permeable membrane."
      },
      {
        id: "y10-sci-18",
        question: "What is the energy transfer efficiency between trophic levels typically?",
        options: ["90%", "50%", "10%", "100%"],
        correctAnswer: 2,
        explanation: "Approximately 10% of energy is transferred between trophic levels; 90% is lost through respiration, heat, and waste."
      },
      {
        id: "y10-sci-19",
        question: "What type of bonding involves the sharing of electron pairs?",
        options: ["Ionic", "Covalent", "Metallic", "Hydrogen"],
        correctAnswer: 1,
        explanation: "Covalent bonding involves sharing electron pairs between atoms, typically between non-metals."
      },
      {
        id: "y10-sci-20",
        question: "Which part of the brain controls body temperature?",
        options: ["Cerebellum", "Cerebrum", "Hypothalamus", "Medulla"],
        correctAnswer: 2,
        explanation: "The hypothalamus monitors blood temperature and triggers responses (sweating/shivering) to maintain homeostasis."
      }
    ]
  },
  {
    subjectId: "english",
    quizzes: [
      {
        id: "y10-eng-1",
        question: "In Macbeth, what is the significance of the dagger soliloquy in Act 2?",
        options: ["It reveals Macbeth's ambition", "It shows Macbeth's guilt and inner conflict before murder", "It introduces the witches' prophecy", "It shows Lady Macbeth's influence"],
        correctAnswer: 1,
        explanation: "The dagger soliloquy reveals Macbeth's psychological turmoil and guilt before killing Duncan, showing he's not entirely evil."
      },
      {
        id: "y10-eng-2",
        question: "What does 'pathetic fallacy' mean in literature?",
        options: ["A character feeling sorry for themselves", "Attributing human emotions to nature/weather to reflect mood", "A tragic ending", "Falling in love pathetically"],
        correctAnswer: 1,
        explanation: "Pathetic fallacy uses weather/nature to mirror characters' emotions (e.g., stormy weather during tragic scenes in Macbeth)."
      },
      {
        id: "y10-eng-3",
        question: "In 'An Inspector Calls', what is the Inspector's main function in the play?",
        options: ["To solve a real crime", "To make the Birlings confess to the police", "To teach moral lessons about social responsibility", "To arrest Eric Birling"],
        correctAnswer: 2,
        explanation: "The Inspector acts as a moral compass, forcing characters to confront their responsibility for Eva Smith's death and society's inequalities."
      },
      {
        id: "y10-eng-4",
        question: "What is the effect of sibilance in poetry?",
        options: ["It creates harsh, aggressive sounds", "It creates hissing/soft sounds often for sinister or gentle effect", "It slows the rhythm dramatically", "It creates loud, booming sounds"],
        correctAnswer: 1,
        explanation: "Sibilance (repetition of 's' sounds) creates hissing effects - sinister in 'snake' imagery or soft/whispering in gentle contexts."
      },
      {
        id: "y10-eng-5",
        question: "Which structural device involves a line running over into the next without punctuation?",
        options: ["Caesura", "Enjambment", "End-stop", "Stanza break"],
        correctAnswer: 1,
        explanation: "Enjambment (also called run-on line) continues meaning across lines without punctuation, creating flow and connection."
      },
      {
        id: "y10-eng-6",
        question: "In 'Ozymandias' by Shelley, what is the central theme?",
        options: ["The power of nature", "The inevitable decline of human power and pride", "The beauty of ancient Egypt", "The importance of war"],
        correctAnswer: 1,
        explanation: "The poem explores how even the greatest rulers and their achievements are eventually destroyed by time, showing the futility of pride."
      },
      {
        id: "y10-eng-7",
        question: "What is a semantic field?",
        options: ["A field of study about semantics", "A group of words related in meaning creating a theme/atmosphere", "A field in a database", "The study of farm language"],
        correctAnswer: 1,
        explanation: "A semantic field is a group of words with related meanings that collectively create a theme (e.g., violence, nature, war)."
      },
      {
        id: "y10-eng-8",
        question: "In the Power and Conflict anthology, what does 'Bayonet Charge' by Ted Hughes focus on?",
        options: ["The glory of war", "The chaos and dehumanisation of battle", "A peaceful countryside scene", "Romantic relationships during war"],
        correctAnswer: 1,
        explanation: "Hughes focuses on the disorientation, fear, and animalistic instincts in battle, contrasting with traditional heroic war poetry."
      },
      {
        id: "y10-eng-9",
        question: "What does the acronym PETAL stand for in essay structure?",
        options: ["Point, Evidence, Technique, Analysis, Link", "Point, Example, Technique, Analysis, Link", "Point, Evidence, Technique, Answer, Link", "Problem, Evidence, Technique, Analysis, Link"],
        correctAnswer: 0,
        explanation: "PETAL = Point, Evidence (quote), Technique, Analysis (zoom in), Link (back to question). Used for structured analysis paragraphs."
      },
      {
        id: "y10-eng-10",
        question: "In 'Macbeth', how is the theme of ambition presented through Lady Macbeth?",
        options: ["She encourages Macbeth to be content with his position", "She drives Macbeth's ambition through manipulation, showing ambition's corrupting power", "She is against Macbeth becoming king", "She shows that women cannot be ambitious"],
        correctAnswer: 1,
        explanation: "Lady Macbeth uses manipulation (questioning his masculinity) to spur Macbeth's ambition, but later succumbs to guilt, showing ambition destroys."
      },
      {
        id: "y10-eng-11",
        question: "What is the difference between dramatic irony and verbal irony?",
        options: ["There is no difference", "Dramatic irony is when audience knows something characters don't; verbal irony is saying opposite of what's meant", "Dramatic irony is verbal only", "Verbal irony happens in plays only"],
        correctAnswer: 1,
        explanation: "Dramatic irony = audience knows more than characters. Verbal irony (sarcasm) = saying opposite of intended meaning."
      },
      {
        id: "y10-eng-12",
        question: "In 'An Inspector Calls', what does the Titanic symbolise?",
        options: ["Luxury and wealth", "The Birlings' overconfidence and the collapse of Edwardian certainty", "Romance and love", "Transportation progress"],
        correctAnswer: 1,
        explanation: "The Titanic (which the Birlings say is 'unsinkable') symbolises their complacency and the impending collapse of their world view."
      },
      {
        id: "y10-eng-13",
        question: "What is the effect of using first-person narrative?",
        options: ["It creates distance from the character", "It allows direct access to character's thoughts and creates intimacy", "It is only used for villains", "It confuses the reader"],
        correctAnswer: 1,
        explanation: "First-person ('I') narration creates intimacy and immediate access to a character's perspective, though it's limited to their knowledge."
      },
      {
        id: "y10-eng-14",
        question: "Which language paper skill involves writing to describe?",
        options: ["Paper 1 Question 5", "Paper 2 Question 5", "Paper 1 Question 2", "Paper 2 Question 2"],
        correctAnswer: 0,
        explanation: "Paper 1 Question 5 is the creative writing section (40 marks) requiring narrative or descriptive writing based on a prompt."
      },
      {
        id: "y10-eng-15",
        question: "What is the function of a caesura in poetry?",
        options: ["To speed up the pace", "To create a pause or break in the middle of a line", "To rhyme words", "To create enjambment"],
        correctAnswer: 1,
        explanation: "A caesura is a deliberate pause/break (often marked by punctuation like comma or full stop) within a line, creating emphasis or contrast."
      },
      {
        id: "y10-eng-16",
        question: "In 'London' by William Blake, what is the poem's main criticism?",
        options: ["The weather in London", "The corruption and suffering caused by institutions (Church, State, Marriage)", "The buildings are too tall", "There are too many tourists"],
        correctAnswer: 1,
        explanation: "Blake criticises how institutions (Church, State, Marriage) trap people in 'mind-forged manacles' and cause widespread suffering."
      },
      {
        id: "y10-eng-17",
        question: "What is the term for words that sound like what they describe?",
        options: ["Alliteration", "Onomatopoeia", "Assonance", "Consonance"],
        correctAnswer: 1,
        explanation: "Onomatopoeia uses words that phonetically imitate the sounds they describe (e.g., 'buzz', 'crash', 'bang')."
      },
      {
        id: "y10-eng-18",
        question: "In Macbeth's 'Tomorrow' soliloquy, what is the tone?",
        options: ["Optimistic and hopeful", "Nihilistic and despairing - life is meaningless", "Angry and vengeful", "Joyful and triumphant"],
        correctAnswer: 1,
        explanation: "The 'Tomorrow and tomorrow' speech shows Macbeth's despair and realisation that life is meaningless ('a tale told by an idiot')."
      },
      {
        id: "y10-eng-19",
        question: "What is the purpose of using juxtaposition in writing?",
        options: ["To confuse the reader", "To place contrasting elements side by side for emphasis or effect", "To create rhyme", "To slow the pace"],
        correctAnswer: 1,
        explanation: "Juxtaposition places contrasting images/ideas side by side to highlight differences and create emphasis (e.g., rich/poor)."
      },
      {
        id: "y10-eng-20",
        question: "In 'An Inspector Calls', why is the telephone call at the end significant?",
        options: ["It confirms the Inspector was real", "It suggests the lessons might be forgotten if the Birlings face no consequences", "It shows Eric committed suicide", "It reveals the Inspector's true identity"],
        correctAnswer: 1,
        explanation: "The phone call (announcing a real inspector is coming) suggests the cycle will repeat, as the Birlings didn't genuinely change despite lessons."
      }
    ]
  },
  {
    subjectId: "y9-english",
    quizzes: [
      {
        id: "y9-eng-1",
        question: "What is a metaphor?",
        options: ["A direct comparison using 'like' or 'as'", "A comparison saying something IS something else", "Exaggeration for effect", "Giving human qualities to objects"],
        correctAnswer: 1,
        explanation: "A metaphor is a direct comparison stating that something IS something else (e.g., 'time is a thief'). A simile uses 'like' or 'as'."
      },
      {
        id: "y9-eng-2",
        question: "Which of these is a simile?",
        options: ["The wind howled", "Her smile was sunshine", "He ran like the wind", "The trees whispered secrets"],
        correctAnswer: 2,
        explanation: "'He ran like the wind' is a simile because it uses 'like' to make a comparison. 'The wind howled' and 'trees whispered' are personification. 'Her smile was sunshine' is a metaphor."
      },
      {
        id: "y9-eng-3",
        question: "What does 'personification' mean?",
        options: ["Comparing using 'like' or 'as'", "Giving human qualities to non-human things", "Exaggerating for effect", "Repeating words for emphasis"],
        correctAnswer: 1,
        explanation: "Personification gives human qualities to non-human things (e.g., 'the sun smiled down on us')."
      },
      {
        id: "y9-eng-4",
        question: "In Shakespeare's plays, what is 'iambic pentameter'?",
        options: ["A rhyme scheme", "A line with 10 syllables in alternating stressed/unstressed pattern", "A type of sonnet", "A character type"],
        correctAnswer: 1,
        explanation: "Iambic pentameter is a rhythmic pattern with 10 syllables per line, alternating unstressed and stressed syllables (da-DUM da-DUM). It's commonly used by Shakespeare."
      },
      {
        id: "y9-eng-5",
        question: "What is the main purpose of a persuasive text?",
        options: ["To entertain the reader", "To inform about facts", "To convince the reader of a viewpoint", "To describe a setting"],
        correctAnswer: 2,
        explanation: "Persuasive writing aims to convince the reader to adopt a particular viewpoint or take action. It uses rhetorical devices, evidence, and emotive language."
      },
      {
        id: "y9-eng-6",
        question: "Which sentence uses an adverb effectively?",
        options: ["The dog was brown", "She walked slowly to the door", "The flowers are beautiful", "He is a tall man"],
        correctAnswer: 1,
        explanation: "'She walked slowly to the door' uses an adverb ('slowly') to describe how the action was performed. Adverbs modify verbs, adjectives, or other adverbs."
      },
      {
        id: "y9-eng-7",
        question: "What is 'alliteration'?",
        options: ["Repeating the same letter sound at the start of words", "Words that sound like their meaning", "A comparison using 'like'", "The rhythm of a poem"],
        correctAnswer: 0,
        explanation: "Alliteration is the repetition of the same initial consonant sound in nearby words (e.g., 'Peter Piper picked a peck')."
      },
      {
        id: "y9-eng-8",
        question: "Which punctuation mark indicates a pause shorter than a full stop?",
        options: ["Comma", "Semicolon", "Colon", "Exclamation mark"],
        correctAnswer: 0,
        explanation: "A comma indicates a brief pause. A semicolon shows a stronger pause than a comma but weaker than a full stop."
      },
      {
        id: "y9-eng-9",
        question: "In poetry analysis, what does 'enjambment' mean?",
        options: ["Rhyme at the end of lines", "A line that runs on without punctuation into the next line", "The rhythm pattern", "A type of stanza"],
        correctAnswer: 1,
        explanation: "Enjambment is when a line of poetry runs over into the next line without a pause or punctuation at the end, creating flow and connection between lines."
      },
      {
        id: "y9-eng-10",
        question: "What is the 'theme' of a text?",
        options: ["The main characters", "The setting of the story", "The central message or big idea", "The plot events"],
        correctAnswer: 2,
        explanation: "Theme is the central message, universal truth, or big idea that runs through a text (e.g., love, betrayal, growing up, power)."
      },
      {
        id: "y9-eng-11",
        question: "Which literary device is used in: 'The thunder grumbled angrily'?",
        options: ["Simile", "Metaphor", "Personification", "Alliteration"],
        correctAnswer: 2,
        explanation: "This is personification because thunder (non-human) is given human qualities (grumbling angrily)."
      },
      {
        id: "y9-eng-12",
        question: "What does 'context' mean in literature?",
        options: ["The dictionary definition of words", "The circumstances in which a text was written and received", "The plot summary", "The characters' backgrounds"],
        correctAnswer: 1,
        explanation: "Context refers to the circumstances surrounding a text - when it was written, by whom, for what purpose, and the social/historical situation."
      },
      {
        id: "y9-eng-13",
        question: "What is 'foreshadowing'?",
        options: ["Describing the setting", "Hinting at future events", "Flashback to past events", "Introducing characters"],
        correctAnswer: 1,
        explanation: "Foreshadowing hints at or suggests what will happen later in the story, creating suspense and preparation for future events."
      },
      {
        id: "y9-eng-14",
        question: "Which is an example of 'hyperbole'?",
        options: ["I've told you a million times", "He is as fast as a cheetah", "The wind whispered", "The blue sky"],
        correctAnswer: 0,
        explanation: "'I've told you a million times' is hyperbole (exaggeration) because it's an obvious overstatement for effect."
      },
      {
        id: "y9-eng-15",
        question: "What is the purpose of 'pathetic fallacy'?",
        options: ["To make the reader laugh", "To reflect characters' emotions through weather/nature", "To describe the setting accurately", "To introduce characters"],
        correctAnswer: 1,
        explanation: "Pathetic fallacy uses weather/nature to reflect or echo characters' emotions (e.g., stormy weather during a tragic scene)."
      },
      {
        id: "y9-eng-16",
        question: "Which sentence is written in the passive voice?",
        options: ["The cat chased the mouse", "The mouse was chased by the cat", "The mouse ran quickly", "The cat pounced"],
        correctAnswer: 1,
        explanation: "'The mouse was chased by the cat' is passive voice because the subject (mouse) receives the action. Active voice would be 'The cat chased the mouse.'"
      },
      {
        id: "y9-eng-17",
        question: "What is 'dramatic irony'?",
        options: ["When the audience knows something characters don't", "When a character says the opposite of what they mean", "When the ending is surprising", "When there is a misunderstanding"],
        correctAnswer: 0,
        explanation: "Dramatic irony is when the audience/reader knows something that the characters don't, creating tension or humour."
      },
      {
        id: "y9-eng-18",
        question: "Which word class describes 'quickly'?",
        options: ["Adjective", "Adverb", "Verb", "Noun"],
        correctAnswer: 1,
        explanation: "'Quickly' is an adverb because it modifies a verb, describing how an action is performed. Adjectives describe nouns."
      },
      {
        id: "y9-eng-19",
        question: "What is 'sibilance'?",
        options: ["Repetition of 's' or 'sh' sounds", "Rhyming words", "Rhythm in poetry", "Repetition of consonants"],
        correctAnswer: 0,
        explanation: "Sibilance is the repetition of hissing 's' or 'sh' sounds (e.g., 'slippery snakes slithered silently'), often creating a sinister or soft effect."
      },
      {
        id: "y9-eng-20",
        question: "What is the purpose of a 'topic sentence' in a paragraph?",
        options: ["To end the paragraph", "To introduce the main idea of the paragraph", "To provide evidence", "To link to the next paragraph"],
        correctAnswer: 1,
        explanation: "A topic sentence introduces the main idea or focus of a paragraph, usually appearing at the beginning."
      },
    ]
  },
  {
    subjectId: "y9-science",
    quizzes: [
      {
        id: "y9-sci-1",
        question: "What is the function of the cell membrane?",
        options: ["To produce energy", "To control what enters and leaves the cell", "To contain genetic material", "To make proteins"],
        correctAnswer: 1,
        explanation: "The cell membrane controls what enters and leaves the cell, maintaining the internal environment."
      },
      {
        id: "y9-sci-2",
        question: "Which organelle is responsible for photosynthesis?",
        options: ["Nucleus", "Mitochondria", "Chloroplasts", "Ribosomes"],
        correctAnswer: 2,
        explanation: "Chloroplasts contain chlorophyll and are where photosynthesis takes place in plant cells."
      },
      {
        id: "y9-sci-3",
        question: "What is the atomic number of an element?",
        options: ["The number of neutrons", "The number of protons", "The total number of particles in the nucleus", "The number of electrons"],
        correctAnswer: 1,
        explanation: "The atomic number is the number of protons in the nucleus. It determines which element it is."
      },
      {
        id: "y9-sci-4",
        question: "What is the formula for calculating density?",
        options: ["Mass × Volume", "Mass ÷ Volume", "Volume ÷ Mass", "Mass + Volume"],
        correctAnswer: 1,
        explanation: "Density = Mass ÷ Volume, measured in g/cm³ or kg/m³."
      },
      {
        id: "y9-sci-5",
        question: "Which gas makes up approximately 21% of Earth's atmosphere?",
        options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
        correctAnswer: 2,
        explanation: "Oxygen makes up approximately 21% of Earth's atmosphere. Nitrogen is about 78%."
      },
      {
        id: "y9-sci-6",
        question: "What is the pH scale used to measure?",
        options: ["Temperature", "Acidity or alkalinity", "Density", "Speed"],
        correctAnswer: 1,
        explanation: "The pH scale measures how acidic or alkaline a substance is, from 0 (very acidic) to 14 (very alkaline)."
      },
      {
        id: "y9-sci-7",
        question: "What happens to particles when a substance is heated?",
        options: ["They lose energy and move slower", "They gain energy and move faster", "They stop moving", "They change size"],
        correctAnswer: 1,
        explanation: "When heated, particles gain kinetic energy and move faster, causing expansion and potentially state changes."
      },
      {
        id: "y9-sci-8",
        question: "Which of these is a chemical change?",
        options: ["Ice melting", "Paper burning", "Salt dissolving", "Glass breaking"],
        correctAnswer: 1,
        explanation: "Burning paper is a chemical change because new substances are formed (ash, smoke, gases). Melting and dissolving are physical changes."
      },
      {
        id: "y9-sci-9",
        question: "What is the unit of force?",
        options: ["Watt", "Newton", "Joule", "Pascal"],
        correctAnswer: 1,
        explanation: "Force is measured in Newtons (N). Weight is a force caused by gravity."
      },
      {
        id: "y9-sci-10",
        question: "Which blood vessel carries blood away from the heart?",
        options: ["Vein", "Artery", "Capillary", "Valve"],
        correctAnswer: 1,
        explanation: "Arteries carry blood away from the heart (usually oxygenated, except pulmonary artery). Veins return blood to the heart."
      },
      {
        id: "y9-sci-11",
        question: "What is the role of mitochondria?",
        options: ["Photosynthesis", "Cellular respiration", "Protein synthesis", "Waste removal"],
        correctAnswer: 1,
        explanation: "Mitochondria are the site of cellular respiration, where glucose reacts with oxygen to release energy (ATP)."
      },
      {
        id: "y9-sci-12",
        question: "What is the formula for speed?",
        options: ["Distance × Time", "Distance ÷ Time", "Time ÷ Distance", "Distance + Time"],
        correctAnswer: 1,
        explanation: "Speed = Distance ÷ Time, measured in m/s or km/h."
      },
      {
        id: "y9-sci-13",
        question: "Which state of matter has particles that are closest together?",
        options: ["Solid", "Liquid", "Gas", "Plasma"],
        correctAnswer: 0,
        explanation: "In solids, particles are tightly packed together in a fixed arrangement, vibrating in place."
      },
      {
        id: "y9-sci-14",
        question: "What is the word equation for photosynthesis?",
        options: ["Glucose + Oxygen → Carbon dioxide + Water", "Carbon dioxide + Water → Glucose + Oxygen", "Oxygen + Water → Glucose + Carbon dioxide", "Glucose → Carbon dioxide + Water"],
        correctAnswer: 1,
        explanation: "Photosynthesis: Carbon dioxide + Water → Glucose + Oxygen (using light energy and chlorophyll)."
      },
      {
        id: "y9-sci-15",
        question: "What is an element?",
        options: ["A mixture of different atoms", "A substance made of only one type of atom", "A combination of two or more substances", "A type of cell"],
        correctAnswer: 1,
        explanation: "An element is a pure substance consisting of only one type of atom (e.g., gold, oxygen, carbon)."
      },
      {
        id: "y9-sci-16",
        question: "Which organ system transports nutrients and oxygen around the body?",
        options: ["Digestive system", "Respiratory system", "Circulatory system", "Nervous system"],
        correctAnswer: 2,
        explanation: "The circulatory system (heart, blood vessels, blood) transports nutrients, oxygen, and waste products."
      },
      {
        id: "y9-sci-17",
        question: "What is a compound?",
        options: ["A mixture of elements", "A substance formed from two or more elements chemically bonded", "A type of atom", "A pure element"],
        correctAnswer: 1,
        explanation: "A compound is a substance formed when two or more elements are chemically bonded together (e.g., water H₂O, carbon dioxide CO₂)."
      },
      {
        id: "y9-sci-18",
        question: "What does the nucleus of an atom contain?",
        options: ["Only electrons", "Protons and neutrons", "Only protons", "Electrons and neutrons"],
        correctAnswer: 1,
        explanation: "The nucleus contains protons (positively charged) and neutrons (neutral). Electrons orbit outside the nucleus."
      },
      {
        id: "y9-sci-19",
        question: "What is the function of ribosomes?",
        options: ["To store genetic information", "To produce proteins", "To control cell activities", "To release energy"],
        correctAnswer: 1,
        explanation: "Ribosomes are the sites of protein synthesis, where amino acids are assembled into proteins."
      },
      {
        id: "y9-sci-20",
        question: "Which of these is a renewable energy source?",
        options: ["Coal", "Natural gas", "Solar power", "Oil"],
        correctAnswer: 2,
        explanation: "Solar power is renewable because the sun's energy is constantly replenished. Fossil fuels (coal, oil, gas) are finite."
      },
    ]
  },
  {
    subjectId: "y9-digitalmedia",
    quizzes: [
      {
        id: "y9-dm-1",
        question: "What does RGB stand for in digital graphics?",
        options: ["Red, Green, Blue", "Resolution, Graphics, Bitmap", "Raster, Gradient, Blend", "Red, Grey, Black"],
        correctAnswer: 0,
        explanation: "RGB stands for Red, Green, Blue - the primary colors of light used in digital displays and graphics."
      },
      {
        id: "y9-dm-2",
        question: "Which file format is best for photographs with millions of colors?",
        options: ["PNG", "JPEG", "GIF", "SVG"],
        correctAnswer: 1,
        explanation: "JPEG is best for photographs as it supports millions of colors and uses compression suitable for complex images."
      },
      {
        id: "y9-dm-3",
        question: "What is the rule of thirds in photography?",
        options: ["Dividing the image into 3 equal parts vertically", "A composition technique using a 3x3 grid", "Using only 3 colors in an image", "Taking 3 photos of the same subject"],
        correctAnswer: 1,
        explanation: "The rule of thirds is a composition technique where the image is divided into a 3x3 grid, and important elements are placed along the lines or intersections."
      },
      {
        id: "y9-dm-4",
        question: "What is a storyboard used for in video production?",
        options: ["Editing the final video", "Planning and visualizing shots before filming", "Creating the soundtrack", "Marketing the video"],
        correctAnswer: 1,
        explanation: "A storyboard is a visual planning tool that shows a sequence of drawings or images representing the shots planned for a video or film."
      },
      {
        id: "y9-dm-5",
        question: "What does FPS stand for in video?",
        options: ["Frames Per Second", "Film Production Standard", "Focus, Point, Shoot", "Final Production Stage"],
        correctAnswer: 0,
        explanation: "FPS (Frames Per Second) indicates how many individual images (frames) are displayed each second in a video. Standard is 24-30 FPS."
      },
      {
        id: "y9-dm-6",
        question: "Which color model is used for printing?",
        options: ["RGB", "CMYK", "HSB", "Pantone"],
        correctAnswer: 1,
        explanation: "CMYK (Cyan, Magenta, Yellow, Key/Black) is the color model used for printing, while RGB is used for digital screens."
      },
      {
        id: "y9-dm-7",
        question: "What is the purpose of a thumbnail image?",
        options: ["To store the full-resolution image", "To provide a small preview that loads quickly", "To edit the image", "To print the image"],
        correctAnswer: 1,
        explanation: "Thumbnails are small preview images that load quickly and help users identify content before loading the full-size version."
      },
      {
        id: "y9-dm-8",
        question: "What does UX stand for in web design?",
        options: ["User Experience", "Universal XML", "User Extension", "Uniform X-axis"],
        correctAnswer: 0,
        explanation: "UX (User Experience) refers to how a person feels when interacting with a digital product or service."
      },
      {
        id: "y9-dm-9",
        question: "What is the main advantage of vector graphics over bitmap graphics?",
        options: ["Better for photographs", "Can be scaled to any size without losing quality", "Smaller file sizes always", "More colors available"],
        correctAnswer: 1,
        explanation: "Vector graphics use mathematical formulas to create shapes, allowing them to be scaled infinitely without losing quality, unlike bitmap images."
      },
      {
        id: "y9-dm-10",
        question: "What is a 'jump cut' in video editing?",
        options: ["A transition between scenes", "An abrupt edit that breaks continuity", "Adding special effects", "Changing the video speed"],
        correctAnswer: 1,
        explanation: "A jump cut is an abrupt transition between two sequential shots that creates a visual jump, often used for effect or accidentally."
      },
      {
        id: "y9-dm-11",
        question: "What is the standard resolution for Full HD video?",
        options: ["1280x720", "1920x1080", "3840x2160", "640x480"],
        correctAnswer: 1,
        explanation: "Full HD (High Definition) is 1920x1080 pixels (1080p). 4K is 3840x2160, and 720p is 1280x720."
      },
      {
        id: "y9-dm-12",
        question: "What is Creative Commons licensing used for?",
        options: ["Selling digital media", "Protecting copyright while allowing sharing", "Encrypting files", "Creating watermarks"],
        correctAnswer: 1,
        explanation: "Creative Commons licenses allow creators to specify how others can use their work while retaining copyright, enabling legal sharing and reuse."
      },
      {
        id: "y9-dm-13",
        question: "What is the purpose of white balance in photography?",
        options: ["To make the background white", "To ensure colors look natural under different lighting", "To increase brightness", "To focus the camera"],
        correctAnswer: 1,
        explanation: "White balance adjusts colors so that white objects appear white under different lighting conditions (sunlight, fluorescent, tungsten)."
      },
      {
        id: "y9-dm-14",
        question: "What is responsive web design?",
        options: ["Design that loads quickly", "Design that adapts to different screen sizes", "Design with bright colors", "Design with animations"],
        correctAnswer: 1,
        explanation: "Responsive web design ensures websites look and function well on all devices by adapting layout and content to different screen sizes."
      },
      {
        id: "y9-dm-15",
        question: "What is a 'montage' in film?",
        options: ["A single long shot", "A sequence of short shots edited together", "A dialogue scene", "A special effect"],
        correctAnswer: 1,
        explanation: "A montage is a film editing technique where a series of short shots are edited into a sequence to condense time, information, or story."
      },
    ]
  },
  {
    subjectId: "y9-dt",
    quizzes: [
      {
        id: "y9-dt-1",
        question: "What is the design process cycle?",
        options: ["Investigate, Design, Make, Evaluate", "Draw, Build, Test, Sell", "Research, Sketch, Manufacture, Market", "Plan, Cut, Assemble, Paint"],
        correctAnswer: 0,
        explanation: "The design process typically follows: Investigate (research), Design (plan), Make (manufacture), Evaluate (test and improve)."
      },
      {
        id: "y9-dt-2",
        question: "Which material is an example of a thermoplastic?",
        options: ["Steel", "Acrylic (Perspex)", "Rubber", "Ceramic"],
        correctAnswer: 1,
        explanation: "Acrylic (Perspex) is a thermoplastic - it can be heated and reshaped multiple times. Steel is a metal, ceramic is brittle, rubber is an elastomer."
      },
      {
        id: "y9-dt-3",
        question: "What is the purpose of a prototype?",
        options: ["To sell the final product", "To test and improve the design before full production", "To replace the final design", "To use as a marketing photo"],
        correctAnswer: 1,
        explanation: "A prototype is an early sample or model used to test and evaluate a design, allowing improvements before expensive full-scale production."
      },
      {
        id: "y9-dt-4",
        question: "What does CAD stand for?",
        options: ["Computer Art Design", "Computer-Aided Design", "Creative Architecture Drawing", "Computer Application Development"],
        correctAnswer: 1,
        explanation: "CAD (Computer-Aided Design) uses computer software to create, modify, analyze, or optimize designs."
      },
      {
        id: "y9-dt-5",
        question: "What is the main advantage of using CAD over hand drawing?",
        options: ["It is always cheaper", "Easy to edit, precise measurements, and 3D visualization", "It requires no training", "It uses less electricity"],
        correctAnswer: 1,
        explanation: "CAD allows easy editing, precise measurements, 3D visualization, simulation testing, and easy sharing of designs."
      },
      {
        id: "y9-dt-6",
        question: "What is 'ergonomics' in design?",
        options: ["Making products look modern", "Designing products to fit human needs and capabilities", "Using expensive materials", "Making products waterproof"],
        correctAnswer: 1,
        explanation: "Ergonomics designs products and systems to fit the people who use them, considering comfort, safety, and efficiency."
      },
      {
        id: "y9-dt-7",
        question: "Which tool would be best for cutting curves in wood?",
        options: ["Tenon saw", "Coping saw", "Chisel", "File"],
        correctAnswer: 1,
        explanation: "A coping saw has a thin, narrow blade held in a frame that allows cutting curves and intricate shapes in wood."
      },
      {
        id: "y9-dt-8",
        question: "What is a 'mechanism' in Design Technology?",
        options: ["A type of material", "A device that transmits or changes motion or force", "A safety rule", "A finishing technique"],
        correctAnswer: 1,
        explanation: "A mechanism is a device that transmits or changes motion, force, or energy from one form to another (e.g., gears, levers, linkages)."
      },
      {
        id: "y9-dt-9",
        question: "What is the purpose of a 'specification' in the design process?",
        options: ["To list the colors available", "To state the requirements and constraints the design must meet", "To show the final price", "To advertise the product"],
        correctAnswer: 1,
        explanation: "A design specification lists all requirements, constraints, and criteria the final product must meet, guiding the design process."
      },
      {
        id: "y9-dt-10",
        question: "What does 'sustainability' mean in product design?",
        options: ["Making products last forever", "Meeting present needs without compromising future generations", "Using only recycled materials", "Making products expensive"],
        correctAnswer: 1,
        explanation: "Sustainable design meets current needs while minimizing environmental impact and ensuring resources remain available for the future."
      },
      {
        id: "y9-dt-11",
        question: "What is a 'scotch yoke' mechanism used for?",
        options: ["Cutting wood", "Converting rotary motion to linear motion", "Joining metals", "Polishing surfaces"],
        correctAnswer: 1,
        explanation: "A scotch yoke converts rotary motion (circular) into reciprocating linear motion (back-and-forth straight line movement)."
      },
      {
        id: "y9-dt-12",
        question: "Which safety equipment is essential when using a pillar drill?",
        options: ["Ear defenders only", "Safety goggles and secure loose clothing/hair", "Gloves at all times", "No safety equipment needed"],
        correctAnswer: 1,
        explanation: "Safety goggles protect eyes from flying debris, and securing loose items prevents them from being caught in rotating parts."
      },
      {
        id: "y9-dt-13",
        question: "What is 'tolerance' in manufacturing?",
        options: ["The patience of workers", "The acceptable variation in dimensions", "The amount of glue used", "The time taken to make a product"],
        correctAnswer: 1,
        explanation: "Tolerance is the acceptable range of variation in a physical dimension. Parts must fit together, so some variation is allowed."
      },
      {
        id: "y9-dt-14",
        question: "What does CAM stand for?",
        options: ["Computer-Aided Manufacturing", "Creative Art Material", "Computer Application Method", "Cutting And Measuring"],
        correctAnswer: 0,
        explanation: "CAM (Computer-Aided Manufacturing) uses computer software and machinery to automate manufacturing processes."
      },
      {
        id: "y9-dt-15",
        question: "What is the '6 Rs' principle in sustainable design?",
        options: ["Six different materials to use", "Refuse, Reduce, Reuse, Repair, Recycle, Rethink", "Six safety rules", "Six types of wood"],
        correctAnswer: 1,
        explanation: "The 6 Rs (Refuse, Reduce, Reuse, Repair, Recycle, Rethink) guide designers to create more sustainable, environmentally friendly products."
      },
    ]
  },
  {
    subjectId: "y9-enterprise",
    quizzes: [
      {
        id: "y9-ent-1",
        question: "What is a USP in business?",
        options: ["United Service Provider", "Unique Selling Point/Proposition", "Universal Standard Price", "User Support Program"],
        correctAnswer: 1,
        explanation: "USP (Unique Selling Point/Proposition) is what makes a product or service different from and better than competitors' offerings."
      },
      {
        id: "y9-ent-2",
        question: "What is a target market?",
        options: ["Where products are stored", "The specific group of customers a business aims to sell to", "A place to advertise", "The location of the business"],
        correctAnswer: 1,
        explanation: "A target market is a specific group of consumers a business aims its products and marketing at."
      },
      {
        id: "y9-ent-3",
        question: "What is market research used for?",
        options: ["To decorate the office", "To find out what customers want and need", "To hire employees", "To choose a business name"],
        correctAnswer: 1,
        explanation: "Market research gathers information about consumers' needs, preferences, and behaviors to make informed business decisions."
      },
      {
        id: "y9-ent-4",
        question: "What is a profit?",
        options: ["Total money received from sales", "Total money spent on products", "Income minus expenses/costs", "The price of one item"],
        correctAnswer: 2,
        explanation: "Profit is calculated as: Income (revenue from sales) minus Expenses (costs of running the business)."
      },
      {
        id: "y9-ent-5",
        question: "What does 'cash flow' mean?",
        options: ["The amount of water in a fountain", "The movement of money in and out of a business", "The speed of service", "The price of goods"],
        correctAnswer: 1,
        explanation: "Cash flow is the net amount of cash moving into and out of a business, crucial for paying bills and staying operational."
      },
      {
        id: "y9-ent-6",
        question: "What is a 'business plan' used for?",
        options: ["To decorate the office", "To outline business goals, strategies, and financial projections", "To apply for a loan only", "To hire staff only"],
        correctAnswer: 1,
        explanation: "A business plan documents business goals, strategies, target market, financial projections, and operational plans - essential for guidance and investment."
      },
      {
        id: "y9-ent-7",
        question: "What is branding?",
        options: ["Burning wood", "Creating a unique identity and image for a business/product", "Counting money", "Writing advertisements"],
        correctAnswer: 1,
        explanation: "Branding creates a distinctive identity through names, logos, design, and messaging that differentiates a business in consumers' minds."
      },
      {
        id: "y9-ent-8",
        question: "What is a stakeholder?",
        options: ["A type of share", "Anyone with an interest in the business (customers, employees, owners, community)", "A product feature", "A type of loan"],
        correctAnswer: 1,
        explanation: "Stakeholders are individuals, groups, or organizations with an interest or concern in a business's activities and success."
      },
      {
        id: "y9-ent-9",
        question: "What is 'break-even point'?",
        options: ["When the business closes", "When total costs equal total revenue (no profit or loss)", "When sales are highest", "When employees take a break"],
        correctAnswer: 1,
        explanation: "The break-even point is where total costs equal total revenue - the business is neither making a profit nor a loss."
      },
      {
        id: "y9-ent-10",
        question: "What is primary market research?",
        options: ["Research from books", "Data collected directly from original sources (surveys, interviews)", "Research from the internet", "Data from competitors"],
        correctAnswer: 1,
        explanation: "Primary research collects new data directly from sources through surveys, interviews, observations, or focus groups."
      },
      {
        id: "y9-ent-11",
        question: "What is a risk in business?",
        options: ["A type of insurance", "Something that could go wrong and affect success", "A type of investment", "The business name"],
        correctAnswer: 1,
        explanation: "A business risk is any factor that could negatively impact a business's ability to achieve its goals or operate successfully."
      },
      {
        id: "y9-ent-12",
        question: "What is 'supply and demand'?",
        options: ["The amount of products in storage", "The relationship between product availability and consumer desire for it", "The delivery route", "The type of packaging"],
        correctAnswer: 1,
        explanation: "Supply is how much producers offer; demand is how much consumers want. Price typically rises with high demand/low supply."
      },
      {
        id: "y9-ent-13",
        question: "What is an 'elevator pitch'?",
        options: ["A speech about elevators", "A brief persuasive speech to spark interest in a business idea", "A sales technique in tall buildings", "A type of advertisement"],
        correctAnswer: 1,
        explanation: "An elevator pitch is a brief, persuasive speech (30-60 seconds) to interest someone in a business idea, product, or service."
      },
      {
        id: "y9-ent-14",
        question: "What is social enterprise?",
        options: ["A business that only uses social media", "A business that aims to make positive social or environmental impact", "A business party", "A networking event"],
        correctAnswer: 1,
        explanation: "Social enterprises aim to make positive social or environmental impact while also generating profit to sustain their mission."
      },
      {
        id: "y9-ent-15",
        question: "What is the '4 Ps' of marketing?",
        options: ["Price, Product, Place, Promotion", "Plan, Prepare, Produce, Profit", "People, Process, Physical Evidence, Performance", "Package, Position, Perception, Performance"],
        correctAnswer: 0,
        explanation: "The Marketing Mix (4 Ps) are: Product (what you sell), Price (how much), Place (where you sell), Promotion (how you tell people)."
      },
    ]
  },
  {
    subjectId: "y9-engineering",
    quizzes: [
      {
        id: "y9-engin-1",
        question: "What is the unit of force?",
        options: ["Watt", "Newton", "Joule", "Kilogram"],
        correctAnswer: 1,
        explanation: "Force is measured in Newtons (N). Weight is a force caused by gravity. Watts measure power, Joules measure energy."
      },
      {
        id: "y9-engin-2",
        question: "What is a lever?",
        options: ["A type of screw", "A rigid bar that pivots on a fulcrum to multiply force", "An electronic component", "A measuring tool"],
        correctAnswer: 1,
        explanation: "A lever is a simple machine consisting of a rigid bar that pivots on a fixed point (fulcrum) to multiply force or change direction of force."
      },
      {
        id: "y9-engin-3",
        question: "What is an alloy?",
        options: ["A pure metal", "A mixture of two or more metals (or metal and non-metal)", "A type of plastic", "A ceramic material"],
        correctAnswer: 1,
        explanation: "An alloy is a mixture of metals (or a metal mixed with a non-metal) to improve properties like strength or corrosion resistance."
      },
      {
        id: "y9-engin-4",
        question: "What is the purpose of gears?",
        options: ["To make noise", "To transmit motion and force, change speed or direction", "To hold things together", "To measure temperature"],
        correctAnswer: 1,
        explanation: "Gears transmit rotational motion and force between shafts, allowing changes in speed, torque, or direction of motion."
      },
      {
        id: "y9-engin-5",
        question: "What is Ohm's Law?",
        options: ["V = I × R", "F = m × a", "E = mc²", "P = W ÷ t"],
        correctAnswer: 0,
        explanation: "Ohm's Law states: Voltage (V) = Current (I) × Resistance (R). It describes the relationship in electrical circuits."
      },
      {
        id: "y9-engin-6",
        question: "What is tension?",
        options: ["A type of material", "A pulling force that stretches or elongates", "A compression force", "A type of joint"],
        correctAnswer: 1,
        explanation: "Tension is a pulling force that acts to elongate or stretch a material (opposite of compression)."
      },
      {
        id: "y9-engin-7",
        question: "What is a circuit?",
        options: ["A race track", "A complete path for electric current to flow", "A type of machine", "A tool for cutting"],
        correctAnswer: 1,
        explanation: "An electrical circuit is a complete, closed loop that allows electric current to flow from a power source through components and back."
      },
      {
        id: "y9-engin-8",
        question: "What is the center of gravity?",
        options: ["The middle of the Earth", "The point where an object's weight appears to act", "The center of a gear", "The middle of a circuit"],
        correctAnswer: 1,
        explanation: "The center of gravity is the point where an object's entire weight appears to act, crucial for stability and balance."
      },
      {
        id: "y9-engin-9",
        question: "What is compression?",
        options: ["A pulling force", "A pushing/squeezing force that shortens or compacts", "A twisting force", "A cutting force"],
        correctAnswer: 1,
        explanation: "Compression is a pushing force that tends to shorten, compact, or crush a material (opposite of tension)."
      },
      {
        id: "y9-engin-10",
        question: "What is a pulley?",
        options: ["A type of screw", "A wheel with a groove for a rope/cable to change direction of force", "An electronic device", "A measuring instrument"],
        correctAnswer: 1,
        explanation: "A pulley is a wheel on an axle with a groove that guides a rope or cable, used to change direction of force or gain mechanical advantage."
      },
      {
        id: "y9-engin-11",
        question: "What is an insulator?",
        options: ["A material that conducts electricity easily", "A material that resists the flow of electricity", "A type of tool", "A measuring device"],
        correctAnswer: 1,
        explanation: "An insulator is a material that resists the flow of electricity (e.g., rubber, plastic, wood), protecting against electric shock."
      },
      {
        id: "y9-engin-12",
        question: "What is stress in engineering?",
        options: ["Feeling worried", "Force per unit area (pressure within a material)", "The speed of production", "The cost of materials"],
        correctAnswer: 1,
        explanation: "Stress = Force ÷ Area. It measures the internal forces within a material that resist deformation under external loads."
      },
      {
        id: "y9-engin-13",
        question: "What is torque?",
        options: ["A type of motor", "A turning/rotational force", "A linear measurement", "A type of gear"],
        correctAnswer: 1,
        explanation: "Torque is a measure of the turning/rotational force that causes an object to rotate around an axis."
      },
      {
        id: "y9-engin-14",
        question: "What is a cantilever?",
        options: ["A type of motor", "A beam anchored at one end with the other free", "An electronic component", "A type of plastic"],
        correctAnswer: 1,
        explanation: "A cantilever is a rigid structural element (like a beam) that extends horizontally and is supported at only one end."
      },
      {
        id: "y9-engin-15",
        question: "What is quality control?",
        options: ["Controlling the price", "Checking products meet required standards", "Controlling workers", "Setting the design"],
        correctAnswer: 1,
        explanation: "Quality control involves inspecting and testing products during and after manufacturing to ensure they meet specified standards."
      },
    ]
  },
  {
    subjectId: "y9-built",
    quizzes: [
      {
        id: "y9-built-1",
        question: "What is the purpose of building foundations?",
        options: ["To decorate the building", "To support the building's weight and transfer it to the ground", "To provide windows", "To make the roof"],
        correctAnswer: 1,
        explanation: "Foundations distribute the building's load to the ground, prevent settlement, and anchor the structure against wind and forces."
      },
      {
        id: "y9-built-2",
        question: "What is sustainable construction?",
        options: ["Building quickly", "Using environmentally friendly materials and methods", "Building tall buildings", "Using expensive materials"],
        correctAnswer: 1,
        explanation: "Sustainable construction minimizes environmental impact through efficient resource use, renewable materials, and energy-efficient design."
      },
      {
        id: "y9-built-3",
        question: "What is a load-bearing wall?",
        options: ["A wall with pictures on it", "A wall that supports weight from above", "An outside wall only", "A painted wall"],
        correctAnswer: 1,
        explanation: "A load-bearing wall supports structural weight from floors, roofs, or other walls above it. Removing it can cause collapse."
      },
      {
        id: "y9-built-4",
        question: "What is scale in architectural drawing?",
        options: ["The weight of the building", "The ratio between drawing size and real size", "The size of windows", "The type of roof"],
        correctAnswer: 1,
        explanation: "Scale is the ratio between dimensions on a drawing and actual dimensions (e.g., 1:100 means 1cm on paper = 100cm in reality)."
      },
      {
        id: "y9-built-5",
        question: "What is insulation used for?",
        options: ["Decorating walls", "Reducing heat transfer and improving energy efficiency", "Making walls stronger", "Creating windows"],
        correctAnswer: 1,
        explanation: "Insulation reduces heat transfer between inside and outside, improving energy efficiency and reducing heating/cooling costs."
      },
      {
        id: "y9-built-6",
        question: "What is urban planning?",
        options: ["Planning parties in cities", "The design and organization of buildings and spaces in towns/cities", "Building roads only", "Painting buildings"],
        correctAnswer: 1,
        explanation: "Urban planning organizes land use, infrastructure, and development in urban areas to create functional, sustainable communities."
      },
      {
        id: "y9-built-7",
        question: "What is a blueprint?",
        options: ["A type of paint", "A detailed technical drawing or plan of a building", "A type of foundation", "A building material"],
        correctAnswer: 1,
        explanation: "A blueprint is a detailed technical drawing or plan showing building design, dimensions, and construction details for builders to follow."
      },
      {
        id: "y9-built-8",
        question: "What is concrete made from?",
        options: ["Just water", "Cement, sand, aggregate, and water", "Only cement", "Wood and metal"],
        correctAnswer: 1,
        explanation: "Concrete is a mixture of cement (binder), sand (fine aggregate), gravel/stones (coarse aggregate), and water."
      },
      {
        id: "y9-built-9",
        question: "What is the purpose of a roof truss?",
        options: ["To look nice", "To support the roof and transfer weight to walls", "To create windows", "To paint the ceiling"],
        correctAnswer: 1,
        explanation: "Roof trusses are triangular frames that support the roof, distributing weight to load-bearing walls."
      },
      {
        id: "y9-built-10",
        question: "What is building regulations compliance?",
        options: ["Making buildings colorful", "Meeting legal standards for safety, health, and energy efficiency", "Using expensive materials", "Building quickly"],
        correctAnswer: 1,
        explanation: "Building regulations are legal standards ensuring buildings meet requirements for safety, health, accessibility, and energy efficiency."
      },
      {
        id: "y9-built-11",
        question: "What is a beam?",
        options: ["A type of window", "A horizontal structural member that carries loads", "A type of door", "A decorative element"],
        correctAnswer: 1,
        explanation: "A beam is a horizontal structural element that carries vertical loads, transferring them to columns or walls."
      },
      {
        id: "y9-built-12",
        question: "What is thermal mass?",
        options: ["The weight of heat", "A material's ability to absorb, store, and release heat", "The size of a building", "The cost of heating"],
        correctAnswer: 1,
        explanation: "Thermal mass is a material's capacity to absorb, store, and slowly release heat, helping regulate indoor temperatures."
      },
      {
        id: "y9-built-13",
        question: "What is a column?",
        options: ["A type of roof", "A vertical structural element that transfers loads to foundations", "A type of window", "A decorative painting"],
        correctAnswer: 1,
        explanation: "A column is a vertical structural member that carries compressive loads (weight from above) down to foundations."
      },
      {
        id: "y9-built-14",
        question: "What is meant by 'green building'?",
        options: ["Buildings painted green", "Environmentally sustainable building design and construction", "Buildings with gardens", "Expensive buildings"],
        correctAnswer: 1,
        explanation: "Green building creates structures using environmentally responsible processes and resource-efficient methods throughout a building's life."
      },
      {
        id: "y9-built-15",
        question: "What is a lintel?",
        options: ["A type of roof", "A horizontal support above a door or window opening", "A type of foundation", "A wall decoration"],
        correctAnswer: 1,
        explanation: "A lintel is a horizontal structural member (usually beam or arch) placed over an opening (door/window) to support the load above."
      },
    ]
  },
  // Year 10 Quizzes - GCSE Level
  {
    subjectId: "enterprise",
    quizzes: [
      {
        id: "y10-ent-1",
        question: "What is a sole trader?",
        options: ["A business owned by one person with unlimited liability", "A business with multiple owners", "A government-owned business", "A business with limited liability"],
        correctAnswer: 0,
        explanation: "A sole trader is a business owned and run by one person who has unlimited liability (personal assets at risk if business fails)."
      },
      {
        id: "y10-ent-2",
        question: "What does the 4Ps of the marketing mix stand for?",
        options: ["Product, Price, Place, Promotion", "Product, People, Place, Profit", "Plan, Price, Place, Promotion", "Product, Price, Planning, Profit"],
        correctAnswer: 0,
        explanation: "The 4Ps are Product (what you sell), Price (how much), Place (where sold), and Promotion (how advertised)."
      },
      {
        id: "y10-ent-3",
        question: "What is market segmentation?",
        options: ["Dividing a market into distinct groups of buyers with different needs", "Selling in multiple countries", "Breaking down products", "Dividing profits"],
        correctAnswer: 0,
        explanation: "Market segmentation divides the market into groups (demographic, geographic, psychographic, behavioural) to target specific customers."
      },
      {
        id: "y10-ent-4",
        question: "What is variable cost?",
        options: ["Costs that change with output level", "Costs that stay the same", "One-off costs", "Costs paid once a year"],
        correctAnswer: 0,
        explanation: "Variable costs change directly with production/output (e.g., raw materials, hourly wages). As output increases, variable costs increase."
      },
      {
        id: "y10-ent-5",
        question: "Calculate break-even point when fixed costs = £5000, price = £25, variable cost per unit = £15",
        options: ["200 units", "500 units", "250 units", "100 units"],
        correctAnswer: 1,
        explanation: "Break-even = Fixed Costs ÷ (Price - Variable Cost) = £5000 ÷ (£25 - £15) = £5000 ÷ £10 = 500 units"
      },
      {
        id: "y10-ent-6",
        question: "What is a cash flow forecast?",
        options: ["A prediction of money coming in and going out of a business", "A record of past sales", "A list of employees", "A marketing plan"],
        correctAnswer: 0,
        explanation: "A cash flow forecast predicts future cash inflows (sales, loans) and outflows (expenses, purchases) to identify potential shortfalls."
      },
      {
        id: "y10-ent-7",
        question: "What does USP stand for in marketing?",
        options: ["Unique Selling Point/Proposition", "Universal Sales Plan", "United Sales Program", "Ultimate Selling Price"],
        correctAnswer: 0,
        explanation: "USP (Unique Selling Point) is what makes a product/service different from competitors - the special feature that attracts customers."
      },
      {
        id: "y10-ent-8",
        question: "What is primary market research?",
        options: ["Collecting new data firsthand for a specific purpose", "Using existing data from reports", "Researching competitors only", "Reading books about business"],
        correctAnswer: 0,
        explanation: "Primary research collects new data directly (surveys, interviews, observations) specifically for your business needs."
      },
      {
        id: "y10-ent-9",
        question: "What is a franchise?",
        options: ["A business that licenses its brand and model to others", "A charity organization", "A government business", "A failed business"],
        correctAnswer: 0,
        explanation: "A franchise is when a business (franchisor) allows others (franchisees) to trade under their name using their proven business model."
      },
      {
        id: "y10-ent-10",
        question: "What is meant by 'adding value'?",
        options: ["Increasing the selling price above production cost", "Adding more money to the bank", "Increasing employee wages", "Adding new locations"],
        correctAnswer: 0,
        explanation: "Adding value means creating something worth more than the cost of resources used (selling price > cost of materials/production)."
      },
      {
        id: "y10-ent-11",
        question: "What is digital marketing?",
        options: ["Marketing using digital technologies like social media, websites, email", "Marketing using only print media", "Marketing in person only", "Marketing using radio only"],
        correctAnswer: 0,
        explanation: "Digital marketing uses online/digital channels: social media, websites, email, apps, SEO, PPC to reach target audiences."
      },
      {
        id: "y10-ent-12",
        question: "What is the difference between revenue and profit?",
        options: ["Revenue is total income; profit is revenue minus costs", "They are the same thing", "Profit is always higher", "Revenue is after tax"],
        correctAnswer: 0,
        explanation: "Revenue (turnover) = total income from sales. Profit = revenue - all costs (expenses). Profit is what the business actually keeps."
      },
      {
        id: "y10-ent-13",
        question: "What is branding?",
        options: ["Creating a unique name, design, symbol that identifies a product/business", "Printing labels", "Making advertisements only", "Hiring staff"],
        correctAnswer: 0,
        explanation: "Branding creates identity through name, logo, colors, messaging that distinguishes a business from competitors and builds recognition."
      },
      {
        id: "y10-ent-14",
        question: "What is a social enterprise?",
        options: ["A business with social/environmental aims that reinvests profits", "A business that uses social media", "A government department", "A charity that doesn't trade"],
        correctAnswer: 0,
        explanation: "Social enterprises have social/environmental missions at their core, reinvesting profits to further their cause rather than for private gain."
      },
      {
        id: "y10-ent-15",
        question: "Why is customer service important?",
        options: ["It builds loyalty, reputation, and can differentiate from competitors", "It's not important for small businesses", "It only matters online", "It's required by law only"],
        correctAnswer: 0,
        explanation: "Good customer service builds loyalty, creates positive word-of-mouth, differentiates from competitors, and increases repeat business."
      }
    ]
  },
  {
    subjectId: "geography",
    quizzes: [
      {
        id: "y10-geo-1",
        question: "What causes tectonic plates to move?",
        options: ["Convection currents in the mantle", "Wind blowing on land", "Ocean tides", "The moon's gravity"],
        correctAnswer: 0,
        explanation: "Tectonic plates move due to convection currents in the semi-fluid mantle, caused by heat from radioactive decay in Earth's core."
      },
      {
        id: "y10-geo-2",
        question: "What type of plate boundary creates fold mountains?",
        options: ["Destructive boundary", "Constructive boundary", "Conservative boundary", "Transform boundary"],
        correctAnswer: 0,
        explanation: "Fold mountains form at destructive (convergent) boundaries where plates collide, forcing rock layers to buckle and fold upwards."
      },
      {
        id: "y10-geo-3",
        question: "What is the Richter scale used to measure?",
        options: ["Magnitude of earthquakes", "Temperature", "Rainfall", "Wind speed"],
        correctAnswer: 0,
        explanation: "The Richter scale measures earthquake magnitude (energy released). Each whole number increase represents 10x more ground motion."
      },
      {
        id: "y10-geo-4",
        question: "What is urbanisation?",
        options: ["The increasing proportion of population living in towns/cities", "Building rural houses", "Creating national parks", "Planting trees in cities"],
        correctAnswer: 0,
        explanation: "Urbanisation is the growth in the proportion of people living in urban areas, caused by rural-urban migration and natural increase."
      },
      {
        id: "y10-geo-5",
        question: "What is a HIC?",
        options: ["High Income Country", "Highly Industrialized City", "Hot Island Climate", "High Investment Corporation"],
        correctAnswer: 0,
        explanation: "HIC = High Income Country (formerly MEDC). These are wealthy developed countries with advanced economies and high living standards."
      },
      {
        id: "y10-geo-6",
        question: "Which of these is a primary economic activity?",
        options: ["Mining", "Teaching", "Banking", "Retail"],
        correctAnswer: 0,
        explanation: "Primary activities extract raw materials from Earth (mining, fishing, farming, forestry). Secondary = manufacturing, Tertiary = services."
      },
      {
        id: "y10-geo-7",
        question: "What is a tropical rainforest biome characterised by?",
        options: ["High temperatures and rainfall year-round", "Cold winters and hot summers", "Low rainfall", "High altitude"],
        correctAnswer: 0,
        explanation: "Tropical rainforests have consistently high temperatures (25-28°C) and rainfall (>2000mm/year), with dense biodiversity and layered vegetation."
      },
      {
        id: "y10-geo-8",
        question: "What is interdependence in ecosystems?",
        options: ["Species relying on each other for survival", "Countries trading with each other", "Cities connecting by roads", "Rivers joining together"],
        correctAnswer: 0,
        explanation: "Interdependence is how species in an ecosystem rely on each other for food, shelter, pollination, oxygen, and nutrient cycling."
      },
      {
        id: "y10-geo-9",
        question: "What causes desertification?",
        options: ["Climate change, overgrazing, deforestation, and poor farming practices", "Too much rain", "Building too many houses", "Planting too many trees"],
        correctAnswer: 0,
        explanation: "Desertification is caused by climate change, unsustainable farming, overgrazing, deforestation, and overuse of water reducing land productivity."
      },
      {
        id: "y10-geo-10",
        question: "What is a 6-figure grid reference?",
        options: ["A precise location using 6 digits (3 for easting, 3 for northing)", "A 6-digit phone number", "6 different locations", "6 grid squares"],
        correctAnswer: 0,
        explanation: "6-figure grid references give precise locations (to 100m accuracy) using 3 digits for easting (horizontal) and 3 for northing (vertical)."
      },
      {
        id: "y10-geo-11",
        question: "What is the demographic transition model?",
        options: ["A model showing population change as a country develops", "A weather prediction model", "A migration pattern", "A city planning tool"],
        correctAnswer: 0,
        explanation: "The DTM shows how birth rates and death rates change as a country develops through 5 stages, affecting total population growth."
      },
      {
        id: "y10-geo-12",
        question: "What is the water cycle?",
        options: ["The continuous movement of water between Earth and atmosphere", "A washing machine cycle", "A recycling program", "A dam system"],
        correctAnswer: 0,
        explanation: "The water cycle describes evaporation, transpiration, condensation, precipitation, infiltration, and runoff as water moves through the environment."
      },
      {
        id: "y10-geo-13",
        question: "What is sustainable resource management?",
        options: ["Using resources to meet current needs without compromising future generations", "Using all resources quickly", "Not using any resources", "Importing all resources"],
        correctAnswer: 0,
        explanation: "Sustainable management balances economic, social, and environmental needs, ensuring resources remain available for future generations."
      },
      {
        id: "y10-geo-14",
        question: "What is the multiplier effect in urban development?",
        options: ["New jobs creating additional jobs and economic growth", "A math calculation", "Population growth", "Transport expansion only"],
        correctAnswer: 0,
        explanation: "The multiplier effect: initial investment/jobs create further jobs and spending, multiplying economic growth in an area."
      },
      {
        id: "y10-geo-15",
        question: "What fieldwork technique measures river velocity?",
        options: ["Flow meter or float method", "Quadrat", "Soil pH test", "Clinometer"],
        correctAnswer: 0,
        explanation: "River velocity is measured using a flow meter (propeller device) or float method (timing object over fixed distance)."
      }
    ]
  },
  {
    subjectId: "dt",
    quizzes: [
      {
        id: "y10-dt-1",
        question: "What does CAD stand for?",
        options: ["Computer Aided Design", "Computer Automated Drawing", "Creative Art Design", "Computer Assisted Development"],
        correctAnswer: 0,
        explanation: "CAD = Computer Aided Design. Software used to create 2D drawings and 3D models digitally (e.g., AutoCAD, Fusion 360, Tinkercad)."
      },
      {
        id: "y10-dt-2",
        question: "What is the design process?",
        options: ["A systematic approach to solving design problems: investigate, design, plan, create, evaluate", "Making things quickly", "Buying products online", "Selling products"],
        correctAnswer: 0,
        explanation: "The design process involves: investigating (research), designing (ideas), planning (specifications), creating (making), evaluating (testing)."
      },
      {
        id: "y10-dt-3",
        question: "What is hardwood?",
        options: ["Wood from broadleaf deciduous trees - dense and durable", "Soft, weak wood", "Artificial wood", "Wood from conifers"],
        correctAnswer: 0,
        explanation: "Hardwoods come from broadleaf deciduous trees (oak, beech, mahogany). They are denser, harder, and more durable than softwoods."
      },
      {
        id: "y10-dt-4",
        question: "What is the 6Rs of sustainable design?",
        options: ["Refuse, Reduce, Reuse, Repair, Recycle, Rethink", "Read, Write, Repeat", "Red, Green, Blue", "Run, Jump, Skip"],
        correctAnswer: 0,
        explanation: "6Rs: Refuse (don't use), Reduce (less material), Reuse (use again), Repair (fix), Recycle (process), Rethink (consider alternatives)."
      },
      {
        id: "y10-dt-5",
        question: "What is CAM?",
        options: ["Computer Aided Manufacture", "Computer Art Making", "Computer Assisted Marketing", "Computer Animation Method"],
        correctAnswer: 0,
        explanation: "CAM = Computer Aided Manufacture. Computers control machines (CNC mills, laser cutters, 3D printers) to make products from digital designs."
      },
      {
        id: "y10-dt-6",
        question: "What is thermoplastic?",
        options: ["Plastic that can be reheated and reshaped multiple times", "Plastic that hardens permanently when heated", "Metal that melts", "Wood that bends"],
        correctAnswer: 0,
        explanation: "Thermoplastics (acrylic, HIPS, nylon) soften when heated and can be reshaped repeatedly. Thermosetting plastics set permanently when heated."
      },
      {
        id: "y10-dt-7",
        question: "What does ergonomic design consider?",
        options: ["How products fit users and reduce strain/injury", "Only the color of products", "The price only", "Marketing only"],
        correctAnswer: 0,
        explanation: "Ergonomics designs products to fit the user, considering body dimensions (anthropometrics), comfort, safety, and reducing strain/injury."
      },
      {
        id: "y10-dt-8",
        question: "What is quality control?",
        options: ["Checking products meet required standards at various stages", "Making products quickly", "Selling expensive products", "Hiring more staff"],
        correctAnswer: 0,
        explanation: "Quality control involves inspection and testing at various production stages to ensure products meet specifications and standards."
      },
      {
        id: "y10-dt-9",
        question: "What is a specification?",
        options: ["A detailed list of requirements a product must meet", "A type of pen", "A design sketch", "A colour"],
        correctAnswer: 0,
        explanation: "A specification lists measurable criteria (size, materials, function, aesthetics) that a design must meet to be successful."
      },
      {
        id: "y10-dt-10",
        question: "What is vacuum forming?",
        options: ["A process where plastic sheet is heated and sucked over a mould", "A type of welding", "3D printing", "Casting metal"],
        correctAnswer: 0,
        explanation: "Vacuum forming heats a plastic sheet until soft, then uses vacuum suction to pull it over a mould, creating shaped products."
      },
      {
        id: "y10-dt-11",
        question: "What is an alloy?",
        options: ["A mixture of metals (or metal and non-metal) to improve properties", "A pure metal", "A type of plastic", "A ceramic material"],
        correctAnswer: 0,
        explanation: "Alloys mix metals (or metal with non-metal) to create materials with improved properties like strength (e.g., steel = iron + carbon)."
      },
      {
        id: "y10-dt-12",
        question: "What is one-point perspective drawing?",
        options: ["A 3D drawing technique with one vanishing point", "Drawing with one pencil", "A flat drawing", "Drawing from above"],
        correctAnswer: 0,
        explanation: "One-point perspective shows 3D objects with parallel lines converging to a single vanishing point, creating depth and realism."
      },
      {
        id: "y10-dt-13",
        question: "What is a prototype?",
        options: ["An early sample or model to test a design", "The final product", "A marketing poster", "A type of material"],
        correctAnswer: 0,
        explanation: "A prototype is an early sample/model used to test and evaluate a design before full production, allowing improvements."
      },
      {
        id: "y10-dt-14",
        question: "What is the main advantage of CNC machines?",
        options: ["High precision and repeatability", "They are cheap", "They don't need electricity", "They work slowly"],
        correctAnswer: 0,
        explanation: "CNC (Computer Numerical Control) machines offer high precision, consistency, repeatability, and can work 24/7 producing identical parts."
      },
      {
        id: "y10-dt-15",
        question: "What is product life cycle assessment?",
        options: ["Analyzing environmental impact from raw materials to disposal", "How long a product lasts", "When to replace a product", "Product warranty period"],
        correctAnswer: 0,
        explanation: "Life cycle assessment evaluates environmental impact throughout a product's life: extraction, manufacture, use, and disposal/recycling."
      }
    ]
  },
  {
    subjectId: "computerscience",
    quizzes: [
      {
        id: "y10-cs-1",
        question: "What is binary?",
        options: ["A base-2 number system using only 0 and 1", "A type of computer", "A programming language", "A computer virus"],
        correctAnswer: 0,
        explanation: "Binary is a base-2 number system that computers use internally, represented by electrical signals (0 = off, 1 = on)."
      },
      {
        id: "y10-cs-2",
        question: "Convert the denary number 13 to binary",
        options: ["1101", "1010", "1110", "1001"],
        correctAnswer: 0,
        explanation: "13 in binary is 1101 (8+4+0+1 = 13). Using 8-4-2-1 place values."
      },
      {
        id: "y10-cs-3",
        question: "What is an algorithm?",
        options: ["A step-by-step set of instructions to solve a problem", "A type of virus", "A computer game", "A website"],
        correctAnswer: 0,
        explanation: "An algorithm is a precise, step-by-step set of instructions to solve a problem or complete a task - like a recipe."
      },
      {
        id: "y10-cs-4",
        question: "What is the output of: PRINT('Hello' + 'World')?",
        options: ["HelloWorld", "Hello World", "Hello", "World"],
        correctAnswer: 0,
        explanation: "String concatenation joins them directly without spaces. 'Hello' + 'World' = 'HelloWorld'"
      },
      {
        id: "y10-cs-5",
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Computer Power Unit", "Central Program Utility", "Computer Processing User"],
        correctAnswer: 0,
        explanation: "CPU = Central Processing Unit. The 'brain' of the computer that executes instructions and processes data."
      },
      {
        id: "y10-cs-6",
        question: "What is the fetch-decode-execute cycle?",
        options: ["The basic operation cycle of the CPU", "A computer game", "A type of virus scan", "A printing process"],
        correctAnswer: 0,
        explanation: "Fetch-decode-execute is how the CPU works: fetches instruction from memory, decodes what to do, executes the operation."
      },
      {
        id: "y10-cs-7",
        question: "What is a variable in programming?",
        options: ["A named storage location that holds a value which can change", "Something that never changes", "A type of computer", "A mathematical equation"],
        correctAnswer: 0,
        explanation: "A variable is a named container storing data that can be modified during program execution (e.g., score = score + 1)."
      },
      {
        id: "y10-cs-8",
        question: "What is a loop in programming?",
        options: ["Code that repeats a set of instructions", "A circular wire", "A type of virus", "A computer network"],
        correctAnswer: 0,
        explanation: "Loops (for, while, repeat-until) repeat code blocks multiple times without rewriting, saving time and reducing errors."
      },
      {
        id: "y10-cs-9",
        question: "What is RAM?",
        options: ["Random Access Memory - volatile temporary storage", "Read Always Memory", "Remote Access Module", "Read And Make"],
        correctAnswer: 0,
        explanation: "RAM is volatile temporary memory that stores data/programs currently in use. It's fast but lost when power is off."
      },
      {
        id: "y10-cs-10",
        question: "What is the difference between ROM and RAM?",
        options: ["ROM is permanent read-only; RAM is temporary read-write", "They are the same", "ROM is faster", "RAM is permanent"],
        correctAnswer: 0,
        explanation: "ROM (Read Only Memory) is permanent, non-volatile storage for boot instructions. RAM is temporary, volatile working memory."
      },
      {
        id: "y10-cs-11",
        question: "What is a network?",
        options: ["Connected computers/devices that can share resources", "A spider web", "A type of cable", "A computer game"],
        correctAnswer: 0,
        explanation: "A network connects two or more computers/devices to share data, resources (printers), and communicate."
      },
      {
        id: "y10-cs-12",
        question: "What is an IP address?",
        options: ["A unique identifier for a device on a network", "A postal address", "A type of software", "A computer virus"],
        correctAnswer: 0,
        explanation: "IP (Internet Protocol) address uniquely identifies devices on networks, enabling data routing (e.g., 192.168.1.1)."
      },
      {
        id: "y10-cs-13",
        question: "What is malware?",
        options: ["Malicious software designed to harm systems or steal data", "Good software", "Computer games", "Operating systems"],
        correctAnswer: 0,
        explanation: "Malware (malicious software) includes viruses, worms, trojans, ransomware designed to damage, disrupt, or steal data."
      },
      {
        id: "y10-cs-14",
        question: "What is encryption?",
        options: ["Converting data into code to prevent unauthorized access", "Deleting data", "Copying data", "Printing data"],
        correctAnswer: 0,
        explanation: "Encryption scrambles data using algorithms so only authorized parties with keys can read it, protecting sensitive information."
      },
      {
        id: "y10-cs-15",
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "HighTech Modern Language", "Home Tool Markup Language", "HyperText Making Links"],
        correctAnswer: 0,
        explanation: "HTML = HyperText Markup Language. The standard markup language for creating web pages and applications."
      }
    ]
  },
  {
    subjectId: "engineering",
    quizzes: [
      {
        id: "y10-eng-1",
        question: "What is tensile strength?",
        options: ["Resistance to breaking under tension/pulling", "Resistance to compression", "Electrical conductivity", "Thermal expansion"],
        correctAnswer: 0,
        explanation: "Tensile strength measures a material's resistance to breaking under tension (pulling/stretching forces)."
      },
      {
        id: "y10-eng-2",
        question: "What is a beam?",
        options: ["A horizontal structural member that carries loads", "A type of wire", "An electrical component", "A tool"],
        correctAnswer: 0,
        explanation: "A beam is a horizontal structural element that resists loads applied perpendicular to its length, commonly used in buildings."
      },
      {
        id: "y10-eng-3",
        question: "What is the centre of gravity?",
        options: ["The point where an object's weight appears to act", "The centre of the Earth", "The middle of a gear", "The top of a building"],
        correctAnswer: 0,
        explanation: "Centre of gravity is the point where the entire weight of an object appears to act, crucial for stability analysis."
      },
      {
        id: "y10-eng-4",
        question: "What is a moment (in engineering)?",
        options: ["The turning effect of a force", "A unit of time", "A type of material", "A manufacturing process"],
        correctAnswer: 0,
        explanation: "Moment = Force × Perpendicular distance from pivot. It measures the turning effect/force of a rotation."
      },
      {
        id: "y10-eng-5",
        question: "What is the difference between stress and strain?",
        options: ["Stress is force/area; strain is deformation/original length", "They are the same thing", "Stress is good; strain is bad", "Stress is thermal; strain is electrical"],
        correctAnswer: 0,
        explanation: "Stress = Force ÷ Cross-sectional area. Strain = Extension ÷ Original length. Stress causes strain."
      },
      {
        id: "y10-eng-6",
        question: "What is a gearbox used for?",
        options: ["To change speed and torque in mechanical systems", "To store tools", "To generate electricity", "To cut materials"],
        correctAnswer: 0,
        explanation: "A gearbox uses gears to change the speed, torque, and direction of mechanical power from an engine/motor."
      },
      {
        id: "y10-eng-7",
        question: "What is Young's Modulus?",
        options: ["A measure of material stiffness (stress ÷ strain)", "A person's age", "A type of motor", "A safety device"],
        correctAnswer: 0,
        explanation: "Young's Modulus (E) = Stress ÷ Strain. It measures material stiffness - higher values mean stiffer materials."
      },
      {
        id: "y10-eng-8",
        question: "What is thermoplastic?",
        options: ["A plastic that softens when heated and hardens when cooled", "A metal", "A ceramic", "A type of wood"],
        correctAnswer: 0,
        explanation: "Thermoplastics can be repeatedly softened by heating and hardened by cooling, allowing reshaping and recycling."
      },
      {
        id: "y10-eng-9",
        question: "What is quality assurance?",
        options: ["Systematic activities to ensure quality requirements are met", "Checking products once", "Selling products", "Making products quickly"],
        correctAnswer: 0,
        explanation: "Quality assurance is process-focused, ensuring systems work to prevent defects (broader than quality control)."
      },
      {
        id: "y10-eng-10",
        question: "What is a first-class lever?",
        options: ["The fulcrum is between the effort and the load", "The load is between fulcrum and effort", "The effort is between fulcrum and load", "There is no fulcrum"],
        correctAnswer: 0,
        explanation: "In first-class levers (seesaw, scissors), the fulcrum lies between the effort and load, providing mechanical advantage."
      },
      {
        id: "y10-eng-11",
        question: "What is the safe working load (SWL)?",
        options: ["The maximum load a structure/equipment can safely handle", "The heaviest possible load", "The average load", "The minimum load"],
        correctAnswer: 0,
        explanation: "SWL is the maximum load a lifting device, structure, or equipment can safely lift/support without failure."
      },
      {
        id: "y10-eng-12",
        question: "What is a force?",
        options: ["A push or pull that can change an object's motion or shape", "A type of energy", "A material property", "A measurement unit"],
        correctAnswer: 0,
        explanation: "Force is a push or pull acting on an object, causing changes in motion, direction, or shape. Measured in Newtons (N)."
      },
      {
        id: "y10-eng-13",
        question: "What is welding?",
        options: ["Joining metals using heat to melt and fuse materials together", "Gluing materials", "Screwing parts", "Painting surfaces"],
        correctAnswer: 0,
        explanation: "Welding joins metals by using high heat to melt parts together, often with filler material, creating a strong joint."
      },
      {
        id: "y10-eng-14",
        question: "What is the difference between mass and weight?",
        options: ["Mass is the amount of matter; weight is the force of gravity on that mass", "They are the same", "Mass changes with location; weight doesn't", "Mass is measured in Newtons"],
        correctAnswer: 0,
        explanation: "Mass (kg) is constant amount of matter. Weight (N) = mass × gravity, changing with gravitational pull."
      },
      {
        id: "y10-eng-15",
        question: "What is an I-beam?",
        options: ["A beam with an I-shaped cross-section for efficient load bearing", "A beam shaped like the letter L", "A round beam", "A wooden beam only"],
        correctAnswer: 0,
        explanation: "I-beams have an I-shaped cross-section with flanges (top/bottom) and web (middle), providing excellent strength-to-weight ratio."
      }
    ]
  },
  {
    subjectId: "builtenvironment",
    quizzes: [
      {
        id: "y10-be-1",
        question: "What is a foundation?",
        options: ["The structural element that transfers building loads to the ground", "The roof of a building", "The windows", "The front door"],
        correctAnswer: 0,
        explanation: "Foundations support the building, distribute loads to soil/rock, prevent settlement, and anchor against uplift/wind forces."
      },
      {
        id: "y10-be-2",
        question: "What is a load-bearing wall?",
        options: ["A wall that supports weight from above", "An external wall only", "A wall with pictures", "A decorative wall"],
        correctAnswer: 0,
        explanation: "Load-bearing walls support structural loads (floors, roofs, other walls). Removing them can cause structural failure."
      },
      {
        id: "y10-be-3",
        question: "What is sustainable construction?",
        options: ["Building with minimal environmental impact using eco-friendly materials", "Building quickly", "Building cheaply", "Building tall buildings only"],
        correctAnswer: 0,
        explanation: "Sustainable construction reduces environmental impact through energy efficiency, renewable materials, waste reduction, and sustainable design."
      },
      {
        id: "y10-be-4",
        question: "What is Building Regulations approval?",
        options: ["Legal requirement ensuring buildings meet safety and energy standards", "Optional advice", "Just a building permit", "Only for big buildings"],
        correctAnswer: 0,
        explanation: "Building Regulations are legal minimum standards for design, construction, and alterations covering safety, health, accessibility, energy efficiency."
      },
      {
        id: "y10-be-5",
        question: "What is BIM?",
        options: ["Building Information Modelling - digital 3D building design and management", "British Industrial Materials", "Building Inspection Method", "Basic Installation Manual"],
        correctAnswer: 0,
        explanation: "BIM creates digital 3D models containing building information, improving design coordination, clash detection, and project management."
      },
      {
        id: "y10-be-6",
        question: "What is U-value?",
        options: ["A measure of heat loss through building elements - lower is better", "A type of concrete", "A building code", "A window size"],
        correctAnswer: 0,
        explanation: "U-value measures thermal transmittance (W/m²K). Lower U-values mean better insulation and less heat loss through walls, roofs, windows."
      },
      {
        id: "y10-be-7",
        question: "What is the main purpose of a damp-proof course (DPC)?",
        options: ["To prevent moisture rising from the ground into walls", "To make walls stronger", "To support the roof", "To decorate walls"],
        correctAnswer: 0,
        explanation: "A DPC is a waterproof barrier in walls that stops moisture rising from the ground (rising damp), protecting the building."
      },
      {
        id: "y10-be-8",
        question: "What is a lintel?",
        options: ["A horizontal support above a door or window opening", "A type of roof", "A foundation", "A wall decoration"],
        correctAnswer: 0,
        explanation: "A lintel is a horizontal structural member (concrete, steel, or timber) that spans openings, supporting loads above doors/windows."
      },
      {
        id: "y10-be-9",
        question: "What does HVAC stand for?",
        options: ["Heating, Ventilation and Air Conditioning", "High Voltage Air Current", "Home Ventilation And Cooling", "Heat Vent Air Control"],
        correctAnswer: 0,
        explanation: "HVAC systems control building climate (temperature, humidity, air quality) for comfort and health."
      },
      {
        id: "y10-be-10",
        question: "What is retrofitting?",
        options: ["Adding new technology/features to older buildings", "Building new houses", "Demolishing old buildings", "Selling buildings"],
        correctAnswer: 0,
        explanation: "Retrofitting upgrades existing buildings with modern systems (insulation, renewables, safety features) to improve performance."
      },
      {
        id: "y10-be-11",
        question: "What is a brownfield site?",
        options: ["Previously developed land that can be re-used", "Green countryside", "A new housing estate", "A farm"],
        correctAnswer: 0,
        explanation: "Brownfield sites are previously developed (industrial/commercial) areas that can be redeveloped, preserving greenfield land."
      },
      {
        id: "y10-be-12",
        question: "What is thermal mass?",
        options: ["A material's ability to absorb and store heat energy", "The weight of insulation", "The temperature of air", "A type of concrete"],
        correctAnswer: 0,
        explanation: "Thermal mass (in concrete, brick, stone) absorbs heat during the day and releases it at night, stabilizing indoor temperatures."
      },
      {
        id: "y10-be-13",
        question: "What is Party Wall Agreement?",
        options: ["Legal agreement for work on shared walls between properties", "A wall decoration agreement", "A party planning document", "A construction permit"],
        correctAnswer: 0,
        explanation: "Party Wall Act requires agreement from neighbours before work on shared walls/structures, protecting adjoining properties."
      },
      {
        id: "y10-be-14",
        question: "What is passive solar design?",
        options: ["Using building design to collect, store, and distribute solar energy naturally", "Using solar panels only", "Using electric heaters", "Blocking all sunlight"],
        correctAnswer: 0,
        explanation: "Passive solar design uses orientation, glazing, thermal mass, and shading to capture and distribute solar heat without mechanical systems."
      },
      {
        id: "y10-be-15",
        question: "What is the purpose of scaffolding?",
        options: ["Temporary structure to support work at height safely", "Permanent building support", "Decoration only", "Storage"],
        correctAnswer: 0,
        explanation: "Scaffolding provides temporary elevated platforms for construction, maintenance, and repair work, ensuring worker safety."
      }
    ]
  },
  {
    subjectId: "art",
    quizzes: [
      {
        id: "y10-art-1",
        question: "What is tone in art?",
        options: ["The lightness or darkness of a colour", "The texture", "The size", "The smell"],
        correctAnswer: 0,
        explanation: "Tone refers to the lightness or darkness of a colour/shade, creating depth, form, and contrast in artwork."
      },
      {
        id: "y10-art-2",
        question: "What is primary research in art?",
        options: ["Gathering information firsthand through observation, photography, drawing", "Looking at books only", "Copying other artists", "Reading online only"],
        correctAnswer: 0,
        explanation: "Primary research involves direct observation, sketching, photography, and gathering original source material from real-life subjects."
      },
      {
        id: "y10-art-3",
        question: "What is perspective drawing?",
        options: ["A technique to represent 3D objects on 2D surface", "Drawing from memory", "Drawing only faces", "Using only one colour"],
        correctAnswer: 0,
        explanation: "Perspective creates the illusion of depth and space on a flat surface using vanishing points, horizon lines, and foreshortening."
      },
      {
        id: "y10-art-4",
        question: "What is a colour wheel?",
        options: ["A circular diagram showing relationships between colours", "A round painting", "A type of brush", "A spinning toy"],
        correctAnswer: 0,
        explanation: "The colour wheel shows colour relationships: primary, secondary, tertiary, and complementary colours opposite each other."
      },
      {
        id: "y10-art-5",
        question: "What is mixed media?",
        options: ["Artwork using more than one medium/material", "Only painting", "Only drawing", "Only sculpture"],
        correctAnswer: 0,
        explanation: "Mixed media combines different materials (paint, collage, fabric, photography, found objects) in one artwork for varied textures/effects."
      },
      {
        id: "y10-art-6",
        question: "What is the rule of thirds?",
        options: ["Dividing composition into 9 parts for balanced placement", "Using 3 colours only", "Making 3 sketches", "Working for 3 hours"],
        correctAnswer: 0,
        explanation: "Rule of thirds divides the frame into 9 equal parts with 2 horizontal and 2 vertical lines, placing key elements on intersections."
      },
      {
        id: "y10-art-7",
        question: "What is a motif?",
        options: ["A recurring element, pattern, or theme in artwork", "A type of paint", "A large sculpture", "A signature"],
        correctAnswer: 0,
        explanation: "A motif is a repeated element (shape, colour, pattern, symbol) that unifies artwork and reinforces themes."
      },
      {
        id: "y10-art-8",
        question: "What is an etching?",
        options: ["A printmaking technique using acid to cut into metal plates", "A type of painting", "A sculpture method", "A digital technique"],
        correctAnswer: 0,
        explanation: "Etching uses acid to bite lines into a metal plate, which holds ink and prints onto paper, creating fine detailed prints."
      },
      {
        id: "y10-art-9",
        question: "What does 'abstract' art mean?",
        options: ["Art that doesn't attempt to represent external reality", "Art that is very realistic", "Art using only black and white", "Art made by computers"],
        correctAnswer: 0,
        explanation: "Abstract art uses shapes, colours, forms to achieve effects rather than depicting objects/figures realistically."
      },
      {
        id: "y10-art-10",
        question: "What is proportion in art?",
        options: ["The relationship of size between different elements", "The type of paint used", "The frame size", "The price"],
        correctAnswer: 0,
        explanation: "Proportion is the relative size and scale of elements in artwork, creating harmony or deliberate distortion for effect."
      },
      {
        id: "y10-art-11",
        question: "What is impasto?",
        options: ["Thick paint application creating texture", "Thin watercolour wash", "A type of canvas", "A drawing tool"],
        correctAnswer: 0,
        explanation: "Impasto applies paint thickly so brushstrokes/knife marks create texture and 3D surface quality (used by Van Gogh)."
      },
      {
        id: "y10-art-12",
        question: "What is a portfolio?",
        options: ["A collection of artwork showing development and skills", "A single painting", "A type of frame", "An art shop"],
        correctAnswer: 0,
        explanation: "A portfolio presents a curated selection of artwork demonstrating skills, ideas development, research, and final outcomes."
      },
      {
        id: "y10-art-13",
        question: "What is composition?",
        options: ["The arrangement of visual elements in artwork", "The type of paint", "The canvas size", "The signature"],
        correctAnswer: 0,
        explanation: "Composition is how elements (line, shape, colour, texture) are arranged to create balance, interest, and guide the viewer's eye."
      },
      {
        id: "y10-art-14",
        question: "What is a maquette?",
        options: ["A small-scale model or preliminary sculpture", "A large final sculpture", "A painting sketch", "A type of tool"],
        correctAnswer: 0,
        explanation: "A maquette is a small-scale preliminary model used to plan and visualize larger sculptures before committing resources."
      },
      {
        id: "y10-art-15",
        question: "What is the purpose of annotation in a sketchbook?",
        options: ["To explain ideas, techniques, and development", "To decorate only", "To fill empty space", "To write the price"],
        correctAnswer: 0,
        explanation: "Annotation explains the thinking process, materials used, what worked/didn't, next steps, and links to artists/context."
      }
    ]
  },
  {
    subjectId: "digitalmedia",
    quizzes: [
      {
        id: "y10-dm-1",
        question: "What is the rule of thirds in photography/film?",
        options: ["Dividing frame into thirds for balanced composition", "Using 3 cameras", "Taking 3 photos", "Using 3 colours only"],
        correctAnswer: 0,
        explanation: "Rule of thirds divides the frame with 2 horizontal and 2 vertical lines, placing subjects on intersection points for visual interest."
      },
      {
        id: "y10-dm-2",
        question: "What does FPS stand for in video?",
        options: ["Frames Per Second", "Fast Photo Speed", "Film Production Standard", "Final Picture Size"],
        correctAnswer: 0,
        explanation: "FPS (Frames Per Second) is how many individual images display per second. Higher FPS = smoother motion (24fps film, 60fps gaming)."
      },
      {
        id: "y10-dm-3",
        question: "What is a storyboard?",
        options: ["A visual plan showing sequence of shots in film/video", "A type of camera", "A script only", "A music playlist"],
        correctAnswer: 0,
        explanation: "Storyboards are comic-strip style drawings planning each shot's composition, camera angles, movement, and timing before filming."
      },
      {
        id: "y10-dm-4",
        question: "What is white balance?",
        options: ["Adjusting colours so white appears truly white under different lighting", "Making everything white", "Balancing the camera", "A type of filter"],
        correctAnswer: 0,
        explanation: "White balance corrects colour temperature so white objects appear white (not yellow/orange/blue) under different light sources."
      },
      {
        id: "y10-dm-5",
        question: "What is resolution in digital media?",
        options: ["The number of pixels in an image or video", "The sound quality", "The file size only", "The screen brightness"],
        correctAnswer: 0,
        explanation: "Resolution is pixel dimensions (width × height). Higher resolution = more detail but larger file size (e.g., 1920×1080 = Full HD)."
      },
      {
        id: "y10-dm-6",
        question: "What is a jump cut?",
        options: ["An abrupt transition between shots of the same subject", "A smooth transition", "A special effect", "A camera movement"],
        correctAnswer: 0,
        explanation: "Jump cuts abruptly shift time/position within the same scene, often used for stylistic effect or condensing time."
      },
      {
        id: "y10-dm-7",
        question: "What is the 180-degree rule?",
        options: ["An imaginary line maintaining consistent screen direction", "A camera angle limit", "A lighting rule", "An editing time limit"],
        correctAnswer: 0,
        explanation: "The 180° rule keeps camera on one side of an imaginary line between subjects, maintaining consistent left/right spatial relationships."
      },
      {
        id: "y10-dm-8",
        question: "What is a lower third?",
        options: ["Graphic overlay in bottom third of screen (names, titles, info)", "A type of camera shot", "A lighting position", "An audio effect"],
        correctAnswer: 0,
        explanation: "Lower thirds are graphic overlays in the bottom screen area displaying names, titles, locations, or additional information."
      },
      {
        id: "y10-dm-9",
        question: "What is b-roll?",
        options: ["Supplementary footage that supports the main narrative", "The main interview footage", "Audio only", "Text graphics"],
        correctAnswer: 0,
        explanation: "B-roll is secondary footage (cutaways, establishing shots, details) that illustrates the story and covers edit points."
      },
      {
        id: "y10-dm-10",
        question: "What is depth of field?",
        options: ["The range of distance in focus in an image", "The file size", "The screen depth", "The audio depth"],
        correctAnswer: 0,
        explanation: "Depth of field is the distance range that appears acceptably sharp. Shallow DOF isolates subjects; deep DOF keeps everything sharp."
      },
      {
        id: "y10-dm-11",
        question: "What is a close-up shot?",
        options: ["Framing that fills screen with subject's face/detail", "A distant shot", "A moving shot", "An aerial shot"],
        correctAnswer: 0,
        explanation: "Close-ups tightly frame the subject (usually face) to show detail, emotion, or importance, drawing audience attention."
      },
      {
        id: "y10-dm-12",
        question: "What is continuity editing?",
        options: ["Editing maintaining consistent spatial/temporal relationships", "Random editing", "Fast cutting only", "Slow motion only"],
        correctAnswer: 0,
        explanation: "Continuity editing creates seamless flow between shots, maintaining consistent time, space, and action for narrative clarity."
      },
      {
        id: "y10-dm-13",
        question: "What is colour grading?",
        options: ["Adjusting colours/mood in post-production", "Painting the set", "Choosing costumes", "Selecting locations"],
        correctAnswer: 0,
        explanation: "Colour grading adjusts hue, saturation, brightness in post-production to create mood, consistency, and visual style."
      },
      {
        id: "y10-dm-14",
        question: "What is a voiceover?",
        options: ["Narration recorded separately from picture", "Music only", "Sound effects", "Dialogue on set"],
        correctAnswer: 0,
        explanation: "Voiceover is narration recorded in post-production, often explaining, commenting, or providing context over visuals."
      },
      {
        id: "y10-dm-15",
        question: "What is mise-en-scène?",
        options: ["Everything placed in the frame: set, props, costume, lighting, actors", "Only the camera angle", "Only the dialogue", "Only the editing"],
        correctAnswer: 0,
        explanation: "Mise-en-scène ('placing on stage') includes everything in the shot: setting, props, costume, lighting, actor positioning, composition."
      }
    ]
  },
  {
    subjectId: "mechatronics",
    quizzes: [
      {
        id: "y10-mech-1",
        question: "What is mechatronics?",
        options: ["Integration of mechanical, electronic, and software engineering", "Only mechanics", "Only electronics", "Only programming"],
        correctAnswer: 0,
        explanation: "Mechatronics combines mechanical engineering, electronics, control systems, and computer science to design smart products."
      },
      {
        id: "y10-mech-2",
        question: "What is a microcontroller?",
        options: ["A small computer on a single chip with CPU, memory, I/O", "A large computer", "A mechanical switch", "A battery"],
        correctAnswer: 0,
        explanation: "Microcontrollers (Arduino, Raspberry Pi Pico) are compact computers with processor, memory, and programmable I/O on one chip."
      },
      {
        id: "y10-mech-3",
        question: "What is an actuator?",
        options: ["A device that converts energy into physical motion", "A sensor", "A battery", "A computer"],
        correctAnswer: 0,
        explanation: "Actuators create physical movement from electrical signals (motors, servos, solenoids, pneumatic cylinders)."
      },
      {
        id: "y10-mech-4",
        question: "What is a sensor?",
        options: ["A device that detects physical input and converts it to electrical signals", "A motor", "A battery", "A computer program"],
        correctAnswer: 0,
        explanation: "Sensors detect physical properties (light, temperature, distance, pressure) and convert them to electrical signals for processing."
      },
      {
        id: "y10-mech-5",
        question: "What is PWM?",
        options: ["Pulse Width Modulation - controlling power delivery", "A type of motor", "A programming language", "A battery type"],
        correctAnswer: 0,
        explanation: "PWM rapidly switches power on/off to control average voltage delivered to motors, LEDs, etc., controlling speed/brightness."
      },
      {
        id: "y10-mech-6",
        question: "What is an ultrasonic sensor used for?",
        options: ["Measuring distance using sound waves", "Measuring temperature", "Measuring light", "Measuring weight"],
        correctAnswer: 0,
        explanation: "Ultrasonic sensors emit high-frequency sound pulses and measure echo time to calculate distance to objects."
      },
      {
        id: "y10-mech-7",
        question: "What is a servo motor?",
        options: ["A motor with precise position control (0-180 degrees)", "A motor that always spins", "A generator", "A battery"],
        correctAnswer: 0,
        explanation: "Servo motors rotate to specific angles (typically 0-180°) with precise position control, ideal for robotics joints."
      },
      {
        id: "y10-mech-8",
        question: "What is an LDR?",
        options: ["Light Dependent Resistor - resistance changes with light", "A motor", "A type of battery", "A computer"],
        correctAnswer: 0,
        explanation: "LDR (Light Dependent Resistor) changes resistance based on light intensity - high resistance in dark, low in light."
      },
      {
        id: "y10-mech-9",
        question: "What is closed-loop control?",
        options: ["System using feedback to adjust output", "System without feedback", "Open door control", "Manual control only"],
        correctAnswer: 0,
        explanation: "Closed-loop control uses sensors to monitor output and adjust input accordingly (e.g., thermostat maintaining temperature)."
      },
      {
        id: "y10-mech-10",
        question: "What is an H-bridge?",
        options: ["A circuit allowing DC motor to run forwards and backwards", "A type of bridge", "A programming language", "A sensor"],
        correctAnswer: 0,
        explanation: "H-bridge circuits control DC motor direction and speed by switching polarity of voltage applied to the motor."
      },
      {
        id: "y10-mech-11",
        question: "What is an IR sensor?",
        options: ["Infrared sensor detecting infrared radiation", "A weight sensor", "A sound sensor", "A humidity sensor"],
        correctAnswer: 0,
        explanation: "IR sensors detect infrared light (invisible to human eye), used in remote controls, line followers, proximity detection, and thermal imaging."
      },
      {
        id: "y10-mech-12",
        question: "What is an Arduino?",
        options: ["An open-source microcontroller platform", "A type of robot", "A programming language", "A sensor company"],
        correctAnswer: 0,
        explanation: "Arduino is an open-source electronics platform with easy-to-use hardware (microcontroller boards) and software (IDE) for interactive projects."
      },
      {
        id: "y10-mech-13",
        question: "What is debouncing?",
        options: ["Removing false signals when mechanical switches close", "Cleaning a switch", "A type of motor", "A programming bug"],
        correctAnswer: 0,
        explanation: "Debouncing eliminates electrical noise/rapid on-off signals when mechanical switches bounce, ensuring clean input readings."
      },
      {
        id: "y10-mech-14",
        question: "What is a stepper motor?",
        options: ["A motor that moves in precise discrete steps", "A continuous spinning motor", "A sensor", "A battery"],
        correctAnswer: 0,
        explanation: "Stepper motors move in discrete steps (e.g., 1.8° per step) allowing precise position control without feedback (used in 3D printers, CNC)."
      },
      {
        id: "y10-mech-15",
        question: "What is kinematics?",
        options: ["The study of motion without considering forces", "The study of forces", "The study of electricity", "The study of heat"],
        correctAnswer: 0,
        explanation: "Kinematics describes motion (position, velocity, acceleration) without considering forces causing the motion."
      }
    ]
  },
];

// Mock papers data for Year 11 and Year 9
const mockPapers: SubjectMockPapers[] = [
  // Year 9 Mock Papers
  {
    subjectId: "y9-maths",
    papers: [
      { id: "y9-math-aqa-f1", title: "AQA Foundation Paper 1 (Non-Calculator)", examBoard: "AQA", year: "2024", paper: "1F", topics: ["Number Operations & BIDMAS", "Factors, Multiples & Primes", "Fractions, Decimals & Percentages", "Algebra Basics - Expressions & Simplifying", "Solving Linear Equations", "Substitution & Formulas"], difficulty: "Foundation", url: "/papers/y9-maths/aqa-foundation-paper1.html" },
      { id: "y9-math-aqa-f2", title: "AQA Foundation Paper 2 (Calculator)", examBoard: "AQA", year: "2024", paper: "2F", topics: ["3D Shapes - Volume & Surface Area", "Area & Perimeter", "Pythagoras Theorem", "Transformations", "Statistics & Probability", "Coordinates & Graphs"], difficulty: "Foundation", url: "/papers/y9-maths/aqa-foundation-paper2.html" },
      { id: "y9-math-aqa-h1", title: "AQA Higher Paper 1 (Non-Calculator)", examBoard: "AQA", year: "2024", paper: "1H", topics: ["Number Operations & BIDMAS", "Factors, Multiples & Primes", "Fractions, Decimals & Percentages", "Algebra Basics - Expressions & Simplifying", "Solving Linear Equations", "Sequences & Patterns"], difficulty: "Higher", url: "/papers/y9-maths/aqa-higher-paper1.html" },
      { id: "y9-math-edexcel-f1", title: "Edexcel Foundation Paper 1 (Non-Calculator)", examBoard: "Edexcel", year: "2024", paper: "1F", topics: ["Number Operations & BIDMAS", "Factors, Multiples & Primes", "Fractions, Decimals & Percentages", "Ratio & Proportion", "Area & Perimeter", "Statistics & Probability"], difficulty: "Foundation", url: "/papers/y9-maths/edexcel-foundation-paper1.html" },
      { id: "y9-math-edexcel-h1", title: "Edexcel Higher Paper 1 (Non-Calculator)", examBoard: "Edexcel", year: "2024", paper: "1H", topics: ["Number Operations & BIDMAS", "Factors, Multiples & Primes", "Fractions, Decimals & Percentages", "Algebra Basics", "Simultaneous Equations", "Sequences & Patterns"], difficulty: "Higher", url: "/papers/y9-maths/edexcel-higher-paper1.html" },
    ]
  },
  {
    subjectId: "y9-english",
    papers: [
      { id: "y9-eng-aqa-reading", title: "AQA Reading Paper", examBoard: "AQA", year: "2024", paper: "Reading", topics: ["Novel Study - Character Analysis", "Poetry Forms and Techniques", "Inference and Analysis", "Non-Fiction Analysis", "Creative Writing"], difficulty: "Foundation", url: "/papers/y9-english/aqa-reading-paper.html" },
      { id: "y9-eng-aqa-writing", title: "AQA Writing Paper", examBoard: "AQA", year: "2024", paper: "Writing", topics: ["Creative Writing Skills", "Shakespeare Introduction", "SPaG", "Persuasive Writing"], difficulty: "Foundation", url: "/papers/y9-english/aqa-writing-paper.html" },
      { id: "y9-eng-edexcel-lang", title: "Edexcel Language Paper 1", examBoard: "Edexcel", year: "2024", paper: "1EN0/01", topics: ["Fiction Reading", "Creative Writing"], difficulty: "Foundation", url: "/papers/y9-english/edexcel-language1.html" },
      { id: "y9-eng-edexcel-lit", title: "Edexcel Literature Paper 1", examBoard: "Edexcel", year: "2024", paper: "1ET0/01", topics: ["Shakespeare", "Post-1914 Literature"], difficulty: "Higher", url: "/papers/y9-english/edexcel-literature1.html" },
    ]
  },
  {
    subjectId: "y9-science",
    papers: [
      { id: "y9-sci-aqa-paper1", title: "AQA Combined Science Paper 1", examBoard: "AQA", year: "2024", paper: "Paper 1", topics: ["Cells and Organisms", "Atomic Structure", "Chemical Reactions", "Forces and Motion", "Energy Transfers"], difficulty: "Foundation", url: "/papers/y9-science/aqa-combined-paper1.html" },
      { id: "y9-sci-aqa-bio", title: "AQA Biology Paper 1", examBoard: "AQA", year: "2024", paper: "8461/1F", topics: ["Cell Biology", "Organisation", "Infection and Response"], difficulty: "Foundation", url: "/papers/y9-science/aqa-biology-paper1.html" },
      { id: "y9-sci-edexcel-combined", title: "Edexcel Combined Science", examBoard: "Edexcel", year: "2024", paper: "1SC0/1F", topics: ["Key Concepts", "Cells and Control", "Genetics", "States of Matter"], difficulty: "Foundation", url: "/papers/y9-science/edexcel-combined.html" },
      { id: "y9-sci-edexcel-physics", title: "Edexcel Physics Paper 1", examBoard: "Edexcel", year: "2024", paper: "1PH0/1F", topics: ["Motion", "Forces", "Conservation of Energy", "Waves"], difficulty: "Higher", url: "/papers/y9-science/edexcel-physics1.html" },
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
  {
    subjectId: "y9-digitalmedia",
    papers: [
      { id: "y9-dm-mock1", title: "Digital Media - Visual Design", examBoard: "KS3", year: "2024", paper: "Paper 1", topics: ["Digital Graphics", "Photography", "Color Theory", "Composition"], difficulty: "Foundation", url: "/papers/y9-digitalmedia/mock1.html" },
      { id: "y9-dm-mock2", title: "Digital Media - Video & Audio", examBoard: "KS3", year: "2024", paper: "Paper 2", topics: ["Video Production", "Audio Editing", "Animation Basics", "Storyboarding"], difficulty: "Foundation", url: "/papers/y9-digitalmedia/mock2.html" },
      { id: "y9-dm-mock3", title: "Digital Media - Web & UX", examBoard: "KS3", year: "2024", paper: "Paper 3", topics: ["Web Design", "User Experience", "Social Media", "Copyright"], difficulty: "Foundation", url: "/papers/y9-digitalmedia/mock3.html" },
    ]
  },
  {
    subjectId: "y9-dt",
    papers: [
      { id: "y9-dt-mock1", title: "Design Technology - Materials", examBoard: "KS3", year: "2024", paper: "Paper 1", topics: ["Materials Properties", "Material Selection", "Sustainability", "Eco-Design"], difficulty: "Foundation", url: "/papers/y9-dt/mock1.html" },
      { id: "y9-dt-mock2", title: "Design Technology - Processes", examBoard: "KS3", year: "2024", paper: "Paper 2", topics: ["Manufacturing Processes", "Tools and Equipment", "CAD/CAM", "Quality Control"], difficulty: "Foundation", url: "/papers/y9-dt/mock2.html" },
      { id: "y9-dt-mock3", title: "Design Technology - Design Skills", examBoard: "KS3", year: "2024", paper: "Paper 3", topics: ["Design Process", "Technical Drawing", "Mechanisms", "Electronics"], difficulty: "Foundation", url: "/papers/y9-dt/mock3.html" },
    ]
  },
  {
    subjectId: "y9-enterprise",
    papers: [
      { id: "y9-ent-mock1", title: "Enterprise - Business Basics", examBoard: "KS3", year: "2024", paper: "Paper 1", topics: ["Business Planning", "Marketing", "Market Research", "Finance Basics"], difficulty: "Foundation", url: "/papers/y9-enterprise/mock1.html" },
      { id: "y9-ent-mock2", title: "Enterprise - Entrepreneurship", examBoard: "KS3", year: "2024", paper: "Paper 2", topics: ["Entrepreneurship", "Project Management", "Communication", "Risk Assessment"], difficulty: "Foundation", url: "/papers/y9-enterprise/mock2.html" },
      { id: "y9-ent-mock3", title: "Enterprise - Business Operations", examBoard: "KS3", year: "2024", paper: "Paper 3", topics: ["Business Ethics", "Legal Issues", "Customer Service", "Growth Strategies"], difficulty: "Foundation", url: "/papers/y9-enterprise/mock3.html" },
    ]
  },
  {
    subjectId: "y9-engineering",
    papers: [
      { id: "y9-engin-mock1", title: "Engineering - Materials & Forces", examBoard: "KS3", year: "2024", paper: "Paper 1", topics: ["Material Properties", "Forces", "Mechanical Systems", "Structures"], difficulty: "Foundation", url: "/papers/y9-engineering/mock1.html" },
      { id: "y9-engin-mock2", title: "Engineering - Electronics", examBoard: "KS3", year: "2024", paper: "Paper 2", topics: ["Electrical Systems", "Electronics", "Circuits", "Automation"], difficulty: "Foundation", url: "/papers/y9-engineering/mock2.html" },
      { id: "y9-engin-mock3", title: "Engineering - Manufacturing", examBoard: "KS3", year: "2024", paper: "Paper 3", topics: ["Manufacturing Processes", "CAD/CAM", "Quality Control", "Health & Safety"], difficulty: "Foundation", url: "/papers/y9-engineering/mock3.html" },
    ]
  },
  {
    subjectId: "y9-built",
    papers: [
      { id: "y9-built-mock1", title: "Built Environment - Design", examBoard: "KS3", year: "2024", paper: "Paper 1", topics: ["Architectural Design", "Technical Drawing", "Scale", "Planning"], difficulty: "Foundation", url: "/papers/y9-built/mock1.html" },
      { id: "y9-built-mock2", title: "Built Environment - Construction", examBoard: "KS3", year: "2024", paper: "Paper 2", topics: ["Construction Materials", "Building Methods", "Foundations", "Structures"], difficulty: "Foundation", url: "/papers/y9-built/mock2.html" },
      { id: "y9-built-mock3", title: "Built Environment - Sustainability", examBoard: "KS3", year: "2024", paper: "Paper 3", topics: ["Sustainable Design", "Energy Efficiency", "Green Building", "Regulations"], difficulty: "Foundation", url: "/papers/y9-built/mock3.html" },
    ]
  },
  // Year 10 Mock Papers - GCSE
  {
    subjectId: "maths",
    papers: [
      { id: "y10-math-edexcel-1f", title: "Edexcel Mathematics Paper 1 (Non-Calculator)", examBoard: "Edexcel", year: "2023", paper: "1F", topics: ["Number - Fractions, Decimals, Percentages", "Algebra - Equations and Inequalities", "Ratio and Proportion"], difficulty: "Foundation", url: "#" },
      { id: "y10-math-edexcel-2f", title: "Edexcel Mathematics Paper 2 (Calculator)", examBoard: "Edexcel", year: "2023", paper: "2F", topics: ["Geometry - Angles and Shapes", "Statistics - Data Handling", "Graphs - Linear and Quadratic"], difficulty: "Foundation", url: "#" },
      { id: "y10-math-edexcel-1h", title: "Edexcel Mathematics Paper 1 (Non-Calculator)", examBoard: "Edexcel", year: "2023", paper: "1H", topics: ["Surds and Indices", "Quadratic Equations", "Simultaneous Equations", "Algebraic Fractions"], difficulty: "Higher", url: "#" },
      { id: "y10-math-edexcel-2h", title: "Edexcel Mathematics Paper 2 (Calculator)", examBoard: "Edexcel", year: "2023", paper: "2H", topics: ["Trigonometry - SOH CAH TOA", "Circle Theorems", "Vectors", "Probability - Conditional"], difficulty: "Higher", url: "#" },
    ]
  },
  {
    subjectId: "english",
    papers: [
      { id: "y10-eng-lang-p1", title: "AQA English Language Paper 1 - Explorations in Creative Reading and Writing", examBoard: "AQA", year: "2023", paper: "8700/1", topics: ["Fiction Reading - 4 Questions", "Creative Writing - Descriptive/Narrative (40 marks)"], difficulty: "GCSE", url: "/papers/y10-english/lang-paper1.html" },
      { id: "y10-eng-lang-p2", title: "AQA English Language Paper 2 - Writers' Viewpoints and Perspectives", examBoard: "AQA", year: "2023", paper: "8700/2", topics: ["Non-Fiction Reading - 4 Questions", "Transactional Writing - Argue/Persuade/Inform (40 marks)"], difficulty: "GCSE", url: "/papers/y10-english/lang-paper2.html" },
      { id: "y10-eng-lit-p1", title: "AQA English Literature Paper 1 - Shakespeare and the 19th Century Novel", examBoard: "AQA", year: "2023", paper: "8702/1", topics: ["Macbeth - Extract and Essay (34 marks)", "A Christmas Carol/Jekyll & Hyde - Extract and Essay (30 marks)"], difficulty: "GCSE", url: "/papers/y10-english/lit-paper1.html" },
      { id: "y10-eng-lit-p2", title: "AQA English Literature Paper 2 - Modern Texts and Poetry", examBoard: "AQA", year: "2023", paper: "8702/2", topics: ["An Inspector Calls - Essay (34 marks)", "Power and Conflict Anthology - 2 Questions (32 marks)", "Unseen Poetry - 2 Questions (24 marks)"], difficulty: "GCSE", url: "/papers/y10-english/lit-paper2.html" },
    ]
  },
  {
    subjectId: "science",
    papers: [
      { id: "y10-sci-aqa-bio1f", title: "AQA Biology Paper 1 (Foundation)", examBoard: "AQA", year: "2023", paper: "8461/1F", topics: ["Cell Biology", "Organisation", "Infection and Response", "Bioenergetics"], difficulty: "Foundation", url: "#" },
      { id: "y10-sci-aqa-bio1h", title: "AQA Biology Paper 1 (Higher)", examBoard: "AQA", year: "2023", paper: "8461/1H", topics: ["Cell Biology - Diffusion/Osmosis", "Organisation - Digestive/Circulatory", "Infection and Response", "Photosynthesis/Respiration"], difficulty: "Higher", url: "#" },
      { id: "y10-sci-aqa-chem1f", title: "AQA Chemistry Paper 1 (Foundation)", examBoard: "AQA", year: "2023", paper: "8462/1F", topics: ["Atomic Structure", "Bonding", "Quantitative Chemistry"], difficulty: "Foundation", url: "#" },
      { id: "y10-sci-aqa-chem1h", title: "AQA Chemistry Paper 1 (Higher)", examBoard: "AQA", year: "2023", paper: "8462/1H", topics: ["Atomic Structure and Periodic Table", "Bonding and Structure", "Moles and Equations"], difficulty: "Higher", url: "#" },
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
      {
        id: "y9-math-v4",
        title: "Factors, Multiples and Prime Numbers",
        duration: "11:25",
        thumbnail: "https://img.youtube.com/vi/nN4NW2ZqZbs/0.jpg",
        url: "https://www.youtube.com/watch?v=nN4NW2ZqZbs",
        description: "Understanding factors, multiples and prime factorization"
      },
      {
        id: "y9-math-v5",
        title: "Percentages - Increase, Decrease, Multipliers",
        duration: "14:15",
        thumbnail: "https://img.youtube.com/vi/JeVSmq1Nrpw/0.jpg",
        url: "https://www.youtube.com/watch?v=JeVSmq1Nrpw",
        description: "Master percentage calculations including compound interest"
      },
      {
        id: "y9-math-v6",
        title: "Ratio and Proportion Explained",
        duration: "16:30",
        thumbnail: "https://img.youtube.com/vi/7bN43aWXP7E/0.jpg",
        url: "https://www.youtube.com/watch?v=7bN43aWXP7E",
        description: "How to work with ratios and solve proportion problems"
      },
      {
        id: "y9-math-v7",
        title: "Algebra - Expanding and Factorising",
        duration: "13:45",
        thumbnail: "https://img.youtube.com/vi/6U4rAVj5j8c/0.jpg",
        url: "https://www.youtube.com/watch?v=6U4rAVj5j8c",
        description: "Learn to expand brackets and factorise expressions"
      },
      {
        id: "y9-math-v8",
        title: "Sequences and the nth Term",
        duration: "10:50",
        thumbnail: "https://img.youtube.com/vi/7JaS7r6ZdXE/0.jpg",
        url: "https://www.youtube.com/watch?v=7JaS7r6ZdXE",
        description: "Understanding linear sequences and finding the nth term"
      },
      {
        id: "y9-math-v9",
        title: "Coordinates and Linear Graphs",
        duration: "12:20",
        thumbnail: "https://img.youtube.com/vi/YQSfKtCZq48/0.jpg",
        url: "https://www.youtube.com/watch?v=YQSfKtCZq48",
        description: "Plotting coordinates and drawing straight line graphs"
      },
      {
        id: "y9-math-v10",
        title: "Angles - Properties and Rules",
        duration: "14:00",
        thumbnail: "https://img.youtube.com/vi/3g74cD0KZFw/0.jpg",
        url: "https://www.youtube.com/watch?v=3g74cD0KZFw",
        description: "Angle rules including parallel lines and polygons"
      },
      {
        id: "y9-math-v11",
        title: "Area and Perimeter of Shapes",
        duration: "15:30",
        thumbnail: "https://img.youtube.com/vi/kqqmJiJez6o/0.jpg",
        url: "https://www.youtube.com/watch?v=kqqmJiJez6o",
        description: "Calculating area and perimeter of 2D shapes including compound shapes"
      },
      {
        id: "y9-math-v12",
        title: "Volume of 3D Shapes",
        duration: "13:10",
        thumbnail: "https://img.youtube.com/vi/gI7-zK3b7ME/0.jpg",
        url: "https://www.youtube.com/watch?v=gI7-zK3b7ME",
        description: "Finding volume of prisms, cubes and cuboids"
      },
      {
        id: "y9-math-v13",
        title: "Transformations - Reflection, Rotation, Translation",
        duration: "17:45",
        thumbnail: "https://img.youtube.com/vi/2dw2P6sD2DI/0.jpg",
        url: "https://www.youtube.com/watch?v=2dw2P6sD2DI",
        description: "Understanding all types of geometric transformations"
      },
      {
        id: "y9-math-v14",
        title: "Pythagoras Theorem",
        duration: "11:15",
        thumbnail: "https://img.youtube.com/vi/AA6RfgfG_8w/0.jpg",
        url: "https://www.youtube.com/watch?v=AA6RfgfG_8w",
        description: "Using Pythagoras to find missing sides in right-angled triangles"
      },
      {
        id: "y9-math-v15",
        title: "Mean, Median, Mode and Range",
        duration: "9:30",
        thumbnail: "https://img.youtube.com/vi/5C9LrMha1fE/0.jpg",
        url: "https://www.youtube.com/watch?v=5C9LrMha1fE",
        description: "How to calculate averages and find the range"
      },
      {
        id: "y9-math-v16",
        title: "Probability Basics and Tree Diagrams",
        duration: "16:20",
        thumbnail: "https://img.youtube.com/vi/4Bf2pEQ7rhg/0.jpg",
        url: "https://www.youtube.com/watch?v=4Bf2pEQ7rhg",
        description: "Understanding probability and using tree diagrams"
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

  // Search and Camera state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{subject: Subject; matchingTopics: Topic[]}[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Search function
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    
    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    
    const results = yearSubjects.map(subject => {
      const matchingTopics = subject.topics.filter(topic => 
        topic.name.toLowerCase().includes(query) ||
        topic.revisionLinks.some(link => 
          link.title.toLowerCase().includes(query) ||
          link.url.toLowerCase().includes(query)
        )
      );
      
      const subjectMatches = 
        subject.name.toLowerCase().includes(query) ||
        subject.description.toLowerCase().includes(query) ||
        (subject.examBoard && subject.examBoard.toLowerCase().includes(query));
      
      return { subject, matchingTopics, subjectMatches };
    }).filter(result => result.matchingTopics.length > 0 || result.subjectMatches);
    
    setSearchResults(results.map(r => ({ subject: r.subject, matchingTopics: r.matchingTopics })));
    setShowSearchResults(true);
    setIsSearching(false);
  };

  // Camera functions
  const activateCamera = async (cameraType: string) => {
    try {
      setCameraError(null);
      setSelectedCamera(cameraType);
      
      let constraints: MediaStreamConstraints = {
        video: true,
        audio: false
      };
      
      if (cameraType === "front") {
        constraints.video = { facingMode: "user" };
      } else if (cameraType === "back") {
        constraints.video = { facingMode: "environment" };
      } else if (cameraType === "document") {
        constraints.video = { 
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        };
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraStream(stream);
      setCameraActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError("Unable to access camera. Please check permissions and try again.");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setCameraActive(false);
    setCapturedImage(null);
    setAnalysisResult(null);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(imageData);
        analyzeImage(imageData);
      }
    }
  };

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    // Simulate AI analysis with a delay
    setTimeout(() => {
      const analyses = [
        "This appears to be a mathematical equation. Based on the content, this relates to Algebra - Solving Linear Equations. I've found relevant resources in the Year 9 Maths curriculum.",
        "This image shows a science diagram. This relates to Cell Biology - Structure of Plant and Animal Cells. Check the Year 9 Science topics for revision materials.",
        "This looks like an English text passage. The content suggests analysis of Character Development and Themes. I recommend checking the Novel Study section in Year 9 English.",
        "This appears to be a historical document or source. This relates to Source Analysis skills in History. Visit the Year 9 History curriculum for practice materials.",
        "This image contains geographical data or maps. This relates to Map Skills and Data Interpretation in Geography. Check the Year 9 Geography topics."
      ];
      
      const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)];
      setAnalysisResult(randomAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
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
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md border border-gray-200"
      >
        {sidebarOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-pink-900 via-pink-800 to-rose-900 transform transition-transform duration-300 shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-300 to-rose-300 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white/30">
              <BookOpen className="w-8 h-8 text-pink-900" />
            </div>
            <div>
              <h1 className="text-5xl font-black italic text-white drop-shadow-lg" style={{ fontFamily: 'cursive, Brush Script MT, Georgia, serif' }}>StudyHub</h1>
              <p className="text-sm text-pink-200 font-semibold">Year {selectedYear} Revision</p>
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl p-5 mb-6 shadow-xl border-4 border-white/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/30 p-2 rounded-full">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-base font-black text-white uppercase tracking-wider">Study Streak</span>
            </div>
            <p className="text-5xl font-black text-white drop-shadow-lg">{studyStreak} days</p>
            <p className="text-base text-white/90 mt-2 font-bold">Keep it going! 🔥</p>
          </div>

          {/* Year Selector */}
          <div className="mb-6">
            <p className="text-sm font-black text-pink-300 uppercase tracking-wider mb-3 px-2">Year Group</p>
            <div className="grid grid-cols-3 gap-3 px-2">
              <button
                onClick={() => { setSelectedYear(9); setSelectedSubject(null); setActiveTab("about"); }}
                className={`py-3 px-4 rounded-xl text-lg font-black transition-all shadow-lg ${
                  selectedYear === 9
                    ? "bg-white text-pink-600 scale-105 shadow-xl"
                    : "bg-pink-700/50 text-pink-200 hover:bg-pink-600 hover:text-white"
                }`}
              >
                Y9
              </button>
              <button
                onClick={() => { setSelectedYear(10); setSelectedSubject(null); setActiveTab("about"); }}
                className={`py-3 px-4 rounded-xl text-lg font-black transition-all shadow-lg ${
                  selectedYear === 10
                    ? "bg-white text-pink-600 scale-105 shadow-xl"
                    : "bg-pink-700/50 text-pink-200 hover:bg-pink-600 hover:text-white"
                }`}
              >
                Y10
              </button>
              <button
                onClick={() => { setSelectedYear(11); setSelectedSubject(null); setActiveTab("about"); }}
                className={`py-3 px-4 rounded-xl text-lg font-black transition-all shadow-lg ${
                  selectedYear === 11
                    ? "bg-white text-pink-600 scale-105 shadow-xl"
                    : "bg-pink-700/50 text-pink-200 hover:bg-pink-600 hover:text-white"
                }`}
              >
                Y11
              </button>
            </div>
          </div>

          {/* Subject List */}
          <nav>
            <p className="text-3xl font-black italic text-white mb-4 px-2 drop-shadow-lg" style={{ fontFamily: 'cursive, Brush Script MT, Georgia, serif' }}>Subjects</p>
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
              {yearSubjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => { setSelectedSubject(subject); setSidebarOpen(false); setActiveTab("about"); }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all shadow-md ${
                    selectedSubject?.id === subject.id
                      ? "bg-white text-pink-700 scale-[1.02] shadow-xl"
                      : "bg-pink-800/40 hover:bg-pink-700/60 text-pink-100 hover:scale-[1.02]"
                  }`}
                >
                  <span className={`p-2.5 rounded-lg shadow-inner ${selectedSubject?.id === subject.id ? "bg-pink-100" : "bg-pink-900/50"}`}>
                    <span className={selectedSubject?.id === subject.id ? "text-pink-600" : "text-pink-300"}>
                      {subject.icon}
                    </span>
                  </span>
                  <span className="text-base font-bold">{subject.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b-4 border-pink-400 px-4 sm:px-8 py-5 shadow-xl">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="lg:ml-0 ml-12">
              <h2 className="text-2xl font-black text-pink-700">{selectedSubject ? selectedSubject.name : "Dashboard"}</h2>
              <p className="text-base text-pink-600 font-semibold">
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
            <div className="max-w-7xl mx-auto">
               {/* StudyHub Title Banner */}
              <div className="text-center mb-8 py-8">
                <h1 
                  className="text-6xl md:text-7xl font-bold italic text-pink-500 mb-4 drop-shadow-lg" 
                  style={{ fontFamily: 'cursive, Brush Script MT, Georgia, serif' }}
                >
                  StudyHub
                </h1>
                <p className="text-xl text-slate-600 italic">
                  Your Complete UK School Curriculum Resource
                </p>
              </div>

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

              {/* Search and Camera Section */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 shadow-lg border-2 border-pink-200 mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Search className="w-6 h-6 text-pink-500" />
                  Find Your Curriculum
                </h3>
                
                {/* Search Input */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Search UK school subjects, topics, or resources..." 
                      className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent font-bold text-slate-900 placeholder-slate-400"
                    />
                    {searchQuery && (
                      <button 
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <select 
                      value={selectedCamera}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCamera(value);
                        if (value) {
                          activateCamera(value);
                        } else {
                          stopCamera();
                        }
                      }}
                      className="px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 font-bold text-slate-900 bg-white cursor-pointer"
                    >
                      <option value="">📷 Select Camera</option>
                      <option value="front">Front Camera</option>
                      <option value="back">Back Camera</option>
                      <option value="document">Document Scanner</option>
                    </select>
                    <button 
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md disabled:opacity-50"
                    >
                      {isSearching ? (
                        <RotateCcw className="w-5 h-5 animate-spin" />
                      ) : (
                        <Search className="w-5 h-5" />
                      )}
                      Search
                    </button>
                  </div>
                </div>

                {/* Camera Preview & Controls */}
                {cameraActive && (
                  <div className="bg-white rounded-xl p-4 border-2 border-pink-200 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-slate-900 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-pink-500" />
                        Camera Active - {selectedCamera === "front" ? "Front" : selectedCamera === "back" ? "Back" : "Document Scanner"} Mode
                      </h4>
                      <button 
                        onClick={stopCamera}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-bold transition-colors"
                      >
                        <X className="w-4 h-4 inline mr-1" />
                        Close Camera
                      </button>
                    </div>
                    
                    {cameraError ? (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                        <p className="font-bold">Camera Error</p>
                        <p className="text-sm">{cameraError}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative bg-black rounded-xl overflow-hidden" style={{ maxHeight: '400px' }}>
                          <video 
                            ref={videoRef}
                            autoPlay 
                            playsInline
                            muted
                            className="w-full h-auto"
                          />
                        </div>
                        
                        <div className="flex justify-center gap-4">
                          <button 
                            onClick={captureImage}
                            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md"
                          >
                            <Camera className="w-5 h-5" />
                            Capture & Analyze
                          </button>
                        </div>
                        
                        {/* Hidden canvas for image capture */}
                        <canvas ref={canvasRef} className="hidden" />
                      </div>
                    )}
                  </div>
                )}

                {/* Captured Image & Analysis */}
                {capturedImage && (
                  <div className="bg-white rounded-xl p-4 border-2 border-pink-200 mb-6">
                    <h4 className="font-bold text-slate-900 mb-3">Captured Image</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <img 
                          src={capturedImage} 
                          alt="Captured document" 
                          className="w-full rounded-lg border border-gray-200"
                        />
                      </div>
                      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4">
                        <h5 className="font-bold text-pink-900 mb-2 flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          AI Analysis
                        </h5>
                        {isAnalyzing ? (
                          <div className="flex items-center gap-2 text-pink-700">
                            <RotateCcw className="w-5 h-5 animate-spin" />
                            <span>Analyzing image...</span>
                          </div>
                        ) : analysisResult ? (
                          <div>
                            <p className="text-slate-700 mb-3">{analysisResult}</p>
                            <button 
                              onClick={() => {
                                setCapturedImage(null);
                                setAnalysisResult(null);
                              }}
                              className="text-sm text-pink-600 hover:text-pink-800 font-bold"
                            >
                              Capture another image
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}

                {/* Search Results */}
                {showSearchResults && (
                  <div className="bg-white rounded-xl p-4 border-2 border-pink-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-slate-900">
                        Search Results for "{searchQuery}" ({searchResults.length} subjects found)
                      </h4>
                      <button 
                        onClick={clearSearch}
                        className="text-sm text-pink-600 hover:text-pink-800 font-bold"
                      >
                        Clear Results
                      </button>
                    </div>
                    
                    {searchResults.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <Search className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p className="font-bold">No results found</p>
                        <p className="text-sm">Try searching for different keywords</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {searchResults.map(({ subject, matchingTopics }) => (
                          <div key={subject.id} className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-start gap-3 mb-3">
                              <span className={`w-10 h-10 rounded-lg ${subject.bgColor} flex items-center justify-center ${subject.color} flex-shrink-0`}>
                                {subject.icon}
                              </span>
                              <div className="flex-1">
                                <h5 className="font-bold text-slate-900">{subject.name}</h5>
                                <p className="text-sm text-slate-600">{subject.description}</p>
                                <button 
                                  onClick={() => setSelectedSubject(subject)}
                                  className="mt-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-bold transition-colors"
                                >
                                  View Subject
                                </button>
                              </div>
                            </div>
                            
                            {matchingTopics.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-sm font-bold text-slate-700 mb-2">Matching Topics:</p>
                                <div className="space-y-2">
                                  {matchingTopics.map((topic, idx) => (
                                    <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100">
                                      <p className="font-bold text-slate-800 text-sm">{topic.name}</p>
                                      <div className="mt-2 flex flex-wrap gap-2">
                                        {topic.revisionLinks.slice(0, 3).map((link, lidx) => (
                                          <a 
                                            key={lidx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs px-3 py-1 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition-colors"
                                          >
                                            {link.title}
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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

              {/* All Subjects Grid */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">All Subjects ({yearSubjects.length})</h3>
                <span className="text-sm text-slate-500">Click any subject to start learning</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {yearSubjects.map((subject) => {
                  const subjectProgress = Math.round((completedTopics.filter((t) => subject.topics.map(st => st.name).includes(t)).length / subject.topics.length) * 100);
                  const hasQuiz = getSubjectQuizzes(subject.id).length > 0;
                  const hasVideos = getSubjectVideos(subject.id).length > 0;
                  const hasMocks = getSubjectMockPapers(subject.id).length > 0;
                  return (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject)}
                      className={`bg-white rounded-xl p-5 shadow-sm border-2 border-gray-100 hover:border-pink-300 hover:shadow-lg transition-all text-left group`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`w-12 h-12 rounded-xl ${subject.bgColor} flex items-center justify-center ${subject.color} group-hover:scale-110 transition-transform`}>
                          {subject.icon}
                        </span>
                        <div className="flex items-center gap-1">
                          {hasVideos && (
                            <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-medium" title="Video tutorials available">
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
