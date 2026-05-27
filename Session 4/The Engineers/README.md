# 🌐 Session 4: Build Your First Website with AI

**Welcome to Web Development, Engineer.**

Today you're going to build your first website using Next.js, React, and Tailwind CSS. But here's the twist—you'll be using **GenAI tools** (like ChatGPT, GitHub Copilot, or Cursor AI) as your coding partner. This is exactly how professional developers work in 2026.

---

## 🎯 Mission Briefing

**Objective:** Transform a simple "Hello World" page into YOUR personal website.

**Tech Stack (Industry Standard):**
- **Next.js 14+** - The React framework used by Netflix, TikTok, and Notion
- **TypeScript** - JavaScript with superpowers (type safety)
- **Tailwind CSS** - Utility-first CSS framework (style without writing CSS files)

**What Makes This Different:**
- You start with a blank canvas (just "Hello World")
- YOU decide what to build (portfolio, blog, fan page, anything!)
- GenAI is your pair programming partner
- By the end, you'll have a real website you can deploy and share

---

## 🚀 Setup Instructions

### Step 1: Navigate to Your Project
```bash
cd "Session 4/The Engineers/eternal-flowers"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Dev Server
```bash
npm run dev
```

Open your browser to `http://localhost:3000` - you should see "Hello World!" on a blue background.

**✅ Success looks like:**
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000

✓ Ready in 2.3s
```

---

## 🧠 Core Concepts

### 1. **React Components**
Think of components as LEGO blocks. Each piece of your UI is a reusable component.

### 2. **Tailwind CSS**
Style elements using utility classes directly in your HTML:

```tsx
<h1 className="text-4xl font-bold text-blue-600">
  Hello!
</h1>
```

- `text-4xl` = large text
- `font-bold` = bold
- `text-blue-600` = blue color

### 3. **File-Based Routing**
Your folder structure IS your website structure:

```
app/
  page.tsx          → yoursite.com/
  about/
    page.tsx        → yoursite.com/about
```

---

## 🎮 Your Challenge

**Transform the Hello World page into whatever YOU want.**

### Ideas:
- 🎨 **Portfolio Website** - Showcase your projects from Sessions 1-3
- 📝 **Personal Blog** - Write about what you're learning
- 🎮 **Gaming Page** - Your favorite games, reviews, rankings
- 🎵 **Music Fan Page** - Your favorite artist or band
- ⚽ **Sports Page** - Your team, stats, predictions
- 🚀 **About Me** - Tell your story

### Suggested Steps:
1. **Change the text** - Replace "Hello World" with your actual content
2. **Change the colors** - Try `bg-purple-500`, `bg-green-600`, etc.
3. **Add more sections** - Copy the `<div>` and add more content below
4. **Add images** - Put images in `/public/` folder and use `<img src="/image.png" />`
5. **Create new pages** - Make an `app/about/page.tsx` folder and file

---

## 🤖 Using GenAI Like a Pro

### How to Prompt:
Instead of "make my website better", try:

```
"Create a hero section for a Next.js website about gaming. 
Use Tailwind CSS with a dark background, large heading, 
and two buttons (one primary, one secondary)."
```

### Example Prompts:
- "Add a navigation bar with links to Home and About using Tailwind"
- "Create a card component that displays project information"
- "Make a grid of 3 cards showing my favorite games"
- "Add a footer with social media links"

### ⚠️ Important Rules:
1. **READ the code AI gives you** - Don't blindly copy-paste
2. **Ask questions** - "What does this line do?"
3. **Experiment** - Change values, see what happens
4. **Save often** - The page auto-refreshes when you save

---

## 📁 Project Structure

```
eternal-flowers/
├── app/
│   ├── page.tsx          # Homepage (what you see at /)
│   ├── layout.tsx        # Wraps every page (add nav/footer here)
│   └── globals.css       # Global styles
├── public/               # Put images here
└── package.json          # Project info
```

---

## 💡 Quick Tailwind Reference

### Colors:
- `bg-blue-500` `bg-red-600` `bg-green-500` `bg-purple-600`
- `text-white` `text-black` `text-gray-700`

### Sizing:
- `text-sm` `text-lg` `text-4xl` `text-6xl`
- `w-full` `h-screen` `p-4` `m-8`

### Layout:
- `flex` `grid` `grid-cols-3`
- `items-center` `justify-center`
- `gap-4` `space-y-4`

### Effects:
- `hover:bg-blue-700` (changes on hover)
- `rounded-lg` (rounded corners)
- `shadow-xl` (drop shadow)

**Full docs:** https://tailwindcss.com/docs

---

## 🆘 Common Issues

### "npm: command not found"
Install Node.js from [nodejs.org](https://nodejs.org)

### "Port 3000 already in use"
Run `npm run dev -- -p 3001` to use a different port

### Changes not showing?
- Save the file (Cmd+S / Ctrl+S)
- Check terminal for errors
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

---

## 🏆 Success Criteria

By the end of the session, you should have:
- ✅ Changed the Hello World text to YOUR content
- ✅ Modified colors to match your style
- ✅ Added at least 2-3 sections with different content
- ✅ Used GenAI to help you at least once
- ✅ Learned something new about web development

**Bonus:**
- Create a second page (About, Projects, etc.)
- Add images
- Make it responsive (looks good on mobile)
- Deploy it to Vercel (free!)

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Tutorial](https://react.dev/learn)

---

**Remember:** There's no "right" answer. Make it YOURS. Have fun! 🚀

**Tech Stack (Industry Standard):**
- **Next.js 14+** - The React framework used by Netflix, TikTok, and Notion
- **TypeScript** - JavaScript with superpowers (type safety)
- **Tailwind CSS** - Utility-first CSS framework (style without writing CSS files)
- **React Components** - Reusable building blocks for your UI

**Why This Matters:**
- This website can become your **real portfolio** to show colleges, employers, or clients
- You'll learn the exact tools used at top tech companies
- You can deploy it **for free** and share the link with anyone in the world

---

## 🧠 Core Concepts You'll Master

### 1. **React Components**
Think of components as LEGO blocks. Each piece (button, navigation bar, card) is a reusable component:

```tsx
// A simple component
function Button() {
  return <button>Click Me!</button>
}

// Use it anywhere:
<Button />
<Button />
<Button />
```

### 2. **Props (Component Inputs)**
Components accept **props** (properties) to make them flexible:

```tsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>
}

// Usage:
<Greeting name="Alex" />  // Displays: Hello, Alex!
<Greeting name="Jordan" />  // Displays: Hello, Jordan!
```

### 3. **File-Based Routing**
In Next.js, your folder structure **IS** your website structure:

```
app/
  page.tsx          → yoursite.com/
  about/
    page.tsx        → yoursite.com/about
  projects/
    page.tsx        → yoursite.com/projects
```

No configuration needed. Create a folder, add `page.tsx`, and you have a new page!

### 4. **Tailwind CSS**
Style elements using utility classes directly in your HTML:

```tsx
// Traditional CSS:
<button className="my-custom-button">Click</button>
// (then write .my-custom-button { background: blue; padding: 10px; } in a CSS file)

// Tailwind CSS:
<button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
  Click
</button>
```

---

## 🚀 Setup Instructions

### Step 1: Navigate to Your Project Folder
```bash
cd "Session 4/The Engineers/eternal-flowers"
```

### Step 2: Install Dependencies
This downloads all the libraries your project needs (only need to do this once):
```bash
npm install
```

**Expected output:** You'll see a progress bar as npm downloads React, Next.js, Tailwind, etc.

### Step 3: Start the Development Server
```bash
npm run dev
```

**What this does:**
- Starts a local web server on your computer
- Opens your website at `http://localhost:3000`
- **Watches for changes** - every time you save a file, the page auto-refreshes!

**✅ Success looks like:**
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

✓ Ready in 2.3s
```

Now open your browser and go to `http://localhost:3000`. You should see your starter website!

---

## 🎮 Challenge 1: Customize Your Homepage

**Goal:** Make the homepage YOUR OWN. Change colors, text, and images.

**Tasks:**
1. Open `app/page.tsx`
2. Find the hero section (the big text at the top)
3. Change the heading to your name
4. Change the description to describe yourself
5. Modify the Tailwind classes to change colors:
   - `bg-blue-500` → `bg-purple-500` (changes background color)
   - `text-white` → `text-yellow-300` (changes text color)

**💡 Using GenAI:**
Try asking ChatGPT:
```
"Create a hero section for a Next.js website with my name 'Alex' 
and tagline 'Aspiring Software Engineer'. Use Tailwind CSS with 
a gradient background from purple to pink."
```

**⚠️ IMPORTANT:** Don't just copy-paste! Read the code the AI gives you. Change variable names. Understand what each line does.

**✅ Success Criteria:**
- Your name appears on the homepage
- Colors are different from the template
- Page automatically refreshes when you save changes

---

## 🎮 Challenge 2: Build Your About Page

**Goal:** Create a page that tells your story.

**Tasks:**
1. Navigate to `app/about/page.tsx`
2. Create a layout with:
   - A heading ("About Me")
   - A paragraph describing who you are
   - A list of your skills or hobbies
   - An image (use a placeholder from `public/images/`)

**💡 Using GenAI:**
```
"Create a Next.js about page component with TypeScript and Tailwind. 
Include a centered heading, a paragraph about me, and a 3-column grid 
of skill cards (HTML, CSS, JavaScript)."
```

**🎨 Styling Tips:**
- `max-w-4xl mx-auto` - Centers content with max width
- `grid grid-cols-3 gap-4` - Creates a 3-column grid
- `shadow-lg rounded-lg` - Adds shadow and rounded corners

**✅ Success Criteria:**
- Visiting `localhost:3000/about` shows your about page
- Content is personalized to you
- Page looks visually organized (not just plain text)

---

## 🎮 Challenge 3: Create a Projects Gallery

**Goal:** Showcase your work (real or imagined) in a grid layout.

**Tasks:**
1. Open `app/projects/page.tsx`
2. Create an array of project objects:
   ```tsx
   const projects = [
     { title: "Snake Game", description: "Classic Python game", image: "/images/snake.png" },
     { title: "Password Cracker", description: "Ethical hacking tool", image: "/images/lock.png" },
     // Add more...
   ];
   ```
3. Use the `ProjectCard` component to display each project
4. Map through the array to create multiple cards

**💡 Using GenAI:**
```
"In Next.js with TypeScript, show me how to map over an array of 
projects and render each one using a ProjectCard component. Use 
Tailwind to create a responsive grid (1 column on mobile, 3 on desktop)."
```

**🔥 Advanced Challenge:**
- Make cards clickable (link to GitHub repo or live demo)
- Add hover effects (card lifts up when you hover)
- Add filter buttons ("All", "Python", "Web")

**✅ Success Criteria:**
- Projects page displays at least 3 project cards
- Grid is responsive (changes layout on smaller screens)
- Each card shows title, description, and image

---

## 🚀 Bonus Challenges

### 🌟 Level 1: Add Navigation
- The `Header` component is already there but basic
- Add links to Home, About, and Projects pages
- Style the active page differently (hint: use `usePathname()` from Next.js)

### 🌟 Level 2: Dark Mode Toggle
- Use React state to toggle between light/dark themes
- Prompt AI: "How do I add a dark mode toggle in Next.js with Tailwind?"
- Persist the choice (stays dark even after refresh)

### 🌟 Level 3: Contact Form
- Create `app/contact/page.tsx`
- Add form fields (name, email, message)
- Use `useState` to handle form inputs
- (Advanced: Connect to email service like EmailJS)

### 🌟 Level 4: Animations
- Use Tailwind animation classes (`animate-bounce`, `animate-pulse`)
- Add page transitions when navigating
- Make elements fade in on scroll (use Intersection Observer)

### 🌟 Level 5: Deploy Your Website
- See `DEPLOYMENT.md` for full guide
- Deploy to Vercel (free, takes 2 minutes)
- Share your live website link with the class!

---

## 🤖 Using GenAI Like a Pro

### ✅ DO:
- **Ask specific questions:** "How do I center a div with Tailwind?" ✅
- **Request explanations:** "Explain what `useState` does in React" ✅
- **Iterate on responses:** "Make it more colorful" or "Add error handling" ✅
- **Debug together:** "I'm getting error 'Cannot find module React', how do I fix?" ✅

### ❌ DON'T:
- **Blindly copy-paste:** You MUST understand what the code does ❌
- **Ask vague questions:** "Make my website better" (too broad) ❌
- **Ignore errors:** If code doesn't work, read the error message first ❌
- **Lie about understanding:** If you don't get it, ask for simpler explanation ❌

### 🎯 Pro Prompting Formula:
```
[Action] + [What You're Building] + [Tech Stack] + [Specific Requirement]

Example:
"Create a navigation component for a Next.js website using 
TypeScript and Tailwind CSS with links to Home, About, and Projects 
that highlights the current page."
```

---

## 📁 Project Structure Explained

```
eternal-flowers/
├── app/                    # All your pages live here
│   ├── layout.tsx          # Wraps every page (header, footer)
│   ├── page.tsx            # Homepage (/)
│   ├── about/
│   │   └── page.tsx        # About page (/about)
│   └── projects/
│       └── page.tsx        # Projects page (/projects)
├── components/             # Reusable UI pieces
│   ├── Header.tsx          # Navigation bar
│   ├── Footer.tsx          # Bottom section
│   └── ProjectCard.tsx     # Card for project display
├── public/                 # Static files (images, fonts)
│   └── images/             # Your images go here
├── styles/
│   └── globals.css         # Global styles (mostly Tailwind imports)
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind customization (colors, fonts)
```

---

## 🆘 Common Issues & Fixes

### Issue: "npm: command not found"
**Fix:** You need to install Node.js first. Visit [nodejs.org](https://nodejs.org) and download the LTS version.

### Issue: Port 3000 already in use
**Fix:** Another app is using port 3000. Either:
- Close the other app
- Run `npm run dev -- -p 3001` (uses port 3001 instead)

### Issue: "Module not found: Can't resolve 'react'"
**Fix:** Dependencies didn't install. Run `npm install` again.

### Issue: Changes not showing on page
**Fix:** 
- Check the terminal for errors
- Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Restart dev server (Ctrl+C then `npm run dev`)

### Issue: Tailwind classes not working
**Fix:** Make sure you saved the file! Check `globals.css` has the Tailwind imports:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🎓 What You're Actually Learning

- **React Fundamentals:** Components, props, state, hooks
- **Modern Web Architecture:** Server vs client components
- **Professional Tooling:** npm, TypeScript, version control with Git
- **UI/UX Design Principles:** Layout, color theory, responsive design
- **AI Collaboration:** Prompting, debugging, iterating with AI tools
- **Deployment:** Taking projects from localhost to production

**This isn't "just a website."** You're learning the exact stack that powers Twitter, Airbnb, and thousands of startups.

---

## 🏆 Final Challenge: Make It Yours

By the end of this session, your website should:
1. ✅ Have at least 3 pages (Home, About, Projects)
2. ✅ Use custom colors/fonts that match YOUR style
3. ✅ Display real information about you
4. ✅ Work on mobile and desktop (responsive)
5. ✅ Have NO default template text remaining

**Stretch Goal:** Deploy to Vercel and send the link in our class Discord!

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Tutorial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Free Images: Unsplash](https://unsplash.com)
- [Free Icons: Heroicons](https://heroicons.com)

---

**Remember:** Every professional developer googles things, reads documentation, and uses AI tools. You're not cheating—you're working like a pro.

Now go build something amazing. 🚀

*"The best way to predict the future is to build it."*
