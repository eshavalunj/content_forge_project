"use client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Zap,
  GraduationCap,
  Briefcase,
  MessageCircle,
  Palette,
  ArrowLeftRight,
  Shield,
  Lightbulb,
  BookOpen,
  Search,
  CheckCircle,
  Download,
  Github,
  Twitter,
  Linkedin,
  Star,
  ChevronRight,
  Sparkles,
  Code2,
  Brain,
  Menu,
  X,
} from "lucide-react";

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Palette,
    title: "Tone Rewriting",
    desc: "Transform your writing across 12+ tones: Professional, Academic, Casual, Persuasive, Empathetic, Authoritative, and more.",
    color: "#00f0ff",
    bg: "rgba(0,240,255,0.08)",
  },
  {
    icon: ArrowLeftRight,
    title: "Expand / Condense",
    desc: "Intelligently expand bullet points into full paragraphs, or condense lengthy text while preserving the core message.",
    color: "#7b61ff",
    bg: "rgba(123,97,255,0.08)",
  },
  {
    icon: Shield,
    title: "Plagiarism Checker",
    desc: "Local-first similarity detection. Highlight duplicate phrases, check citation integrity, and ensure content originality.",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
  },
  {
    icon: Lightbulb,
    title: "Hook Generator",
    desc: "Auto-generate compelling openers for essays, LinkedIn posts, cold emails, and social media content that stop the scroll.",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
  },
  {
    icon: BookOpen,
    title: "Student Tools",
    desc: "Essay structure builder, SOP writer, citation formatter (APA/MLA/Chicago), and argument strengthener for academic excellence.",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
  },
  {
    icon: Search,
    title: "SEO Optimizer",
    desc: "Embed high-value keywords naturally, boost readability scores, and generate meta descriptions and title tags automatically.",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.08)",
  },
  {
    icon: CheckCircle,
    title: "Grammar & Clarity",
    desc: "Beyond spell-check: restructure convoluted sentences, fix passive voice overuse, and improve overall flow and coherence.",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
  },
  {
    icon: Download,
    title: "Export Options",
    desc: "Export to Markdown, DOCX, PDF, or plain text. One-click copy, version history, and diff view for before/after comparison.",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.08)",
  },
];

const modes = [
  {
    key: "student",
    icon: GraduationCap,
    title: "Student",
    subtitle: "Academic Excellence",
    desc: "Essays, SOPs, citations, argument building, and academic tone tuning — everything you need to write at a higher level.",
    tags: ["Essays", "SOPs", "Citations", "Academic"],
    accent: "#00f0ff",
  },
  {
    key: "professional",
    icon: Briefcase,
    title: "Professional",
    subtitle: "Career-Ready Writing",
    desc: "LinkedIn posts, cover letters, SEO content, persuasive emails, and executive communications that convert.",
    tags: ["LinkedIn", "SEO", "Cover Letters", "B2B"],
    accent: "#7b61ff",
  },
  {
    key: "everyday",
    icon: MessageCircle,
    title: "Everyday",
    subtitle: "Casual & Social",
    desc: "Chat messages, social hooks, captions, texts, and everyday writing that sounds genuinely like you — but better.",
    tags: ["Social", "Captions", "Casual", "Hooks"],
    accent: "#60a5fa",
  },
];

const testimonials = [
  {
    quote: "AI Writer completely revolutionized how I write my essays. The Academic mode restructured my thesis in minutes — my professor said it was my best work.",
    author: "Priya M.",
    role: "Computer Science Student, IIT Delhi",
    rating: 5,
    avatar: "PM",
    color: "#00f0ff",
  },
  {
    quote: "I use the LinkedIn optimization feature every week. My posts went from 200 to 2,400 impressions overnight. The hook generator is absolute gold.",
    author: "Marcus T.",
    role: "Product Manager, Series B Startup",
    rating: 5,
    avatar: "MT",
    color: "#7b61ff",
  },
  {
    quote: "Finally an AI writing tool that doesn't feel robotic. The Everyday mode captures my voice perfectly — my DMs get replies now!",
    author: "Saanvi K.",
    role: "Content Creator & Blogger",
    rating: 5,
    avatar: "SK",
    color: "#60a5fa",
  },
];

const codeSnippet = `# AI Writer SDK
import aiwriter

# Initialize with your preferred mode
ai = aiwriter.Client(mode="student")

# Enhance your text
result = ai.enhance(
  text="My thesis is about ML",
  tone="academic",
  expand=True
)

print(result.enhanced_text)
# ✓ "This thesis investigates the 
#    intersection of machine learning..."`;

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Features", "Docs", "Pricing", "Blog"];

  return (
    <nav
      className="navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,240,255,0.08)" : "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div
              className="p-1.5 rounded-lg"
              style={{ background: "rgba(0,240,255,0.12)", border: "1px solid rgba(0,240,255,0.25)" }}
            >
              <Zap size={18} style={{ color: "#00f0ff" }} />
            </div>
            <span
              className="font-bold text-lg tracking-tight"
              style={{ fontFamily: "Inter, sans-serif", color: "var(--text-primary)" }}
            >
              AI<span style={{ color: "#00f0ff" }}>Writer</span>
            </span>
          </motion.a>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">
                {link}
              </a>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#"
              className="ghost-btn flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={16} />
              GitHub
            </motion.a>
            <Link href="/writer">
              <motion.span
                className="gradient-btn flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Sparkles size={15} />
                Get Started
              </motion.span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "var(--text-secondary)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
            style={{ borderColor: "var(--border-color)", background: "rgba(10,14,23,0.98)" }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="nav-link py-2 text-base"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}
              <div className="flex gap-3 mt-2">
                <a href="#" className="ghost-btn flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm flex-1 justify-center">
                  <Github size={15} /> GitHub
                </a>
                <Link href="/writer" className="gradient-btn flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm flex-1 justify-center">
                  <Sparkles size={14} /> Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20 overflow-hidden bg-grid">
      {/* Glow orbs */}
      <div className="glow-orb-cyan" style={{ top: "-200px", left: "-200px" }} />
      <div className="glow-orb-purple" style={{ bottom: "-100px", right: "-150px" }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,240,255,0.05) 0%, transparent 60%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Top badge */}
        <motion.div variants={fadeUp} className="flex justify-center mb-6">
          <span className="section-badge">
            <Sparkles size={11} />
            Powered by Local-First AI
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-black leading-tight mb-6"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
        >
          <span className="gradient-text">AI-Powered Writer:</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>
            Tailored Modes for Students,
          </span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>
            Professionals, &amp;{" "}
            <span style={{ color: "var(--text-secondary)" }}>Everyday Creators</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontSize: "1.15rem", color: "var(--text-secondary)" }}
        >
          Enhance text with AI:{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Tones, hooks, plagiarism checks</span>, and
          more — local-first, explainable, and blazingly fast.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/writer">
            <motion.span
              className="gradient-btn flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,240,255,0.3)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Zap size={18} />
              Start Free
            </motion.span>
          </Link>
          <Link href="/writer">
            <motion.span
              className="outline-btn flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Try the Tool
              <ChevronRight size={17} />
            </motion.span>
          </Link>
        </motion.div>

        {/* Code block */}
        <motion.div
          variants={fadeUp}
          className="code-block w-full max-w-2xl mx-auto text-left"
          whileHover={{ scale: 1.01 }}
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: "1px solid rgba(0,240,255,0.1)" }}
          >
            <div className="code-dot" style={{ background: "#ff5f57" }} />
            <div className="code-dot" style={{ background: "#febc2e" }} />
            <div className="code-dot" style={{ background: "#28c840" }} />
            <span
              className="ml-auto text-xs"
              style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}
            >
              main.py
            </span>
          </div>
          <pre
            className="px-5 py-4 overflow-x-auto"
            style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}
          >
            <code>
              {codeSnippet.split("\n").map((line, i) => {
                if (line.startsWith("#")) {
                  return (
                    <span key={i} className="block" style={{ color: "var(--text-muted)" }}>
                      {line}
                      {"\n"}
                    </span>
                  );
                }
                if (line.includes("mode=") || line.includes("tone=") || line.includes("True")) {
                  return (
                    <span key={i} className="block">
                      {line
                        .split(/(["'][^"']*["']|True)/g)
                        .map((part, j) =>
                          part.startsWith('"') || part.startsWith("'") || part === "True" ? (
                            <span key={j} style={{ color: "#00f0ff" }}>
                              {part}
                            </span>
                          ) : (
                            <span key={j} style={{ color: "var(--text-secondary)" }}>
                              {part}
                            </span>
                          )
                        )}
                      {"\n"}
                    </span>
                  );
                }
                if (line.includes("✓")) {
                  return (
                    <span key={i} className="block" style={{ color: "#34d399" }}>
                      {line}
                      {"\n"}
                    </span>
                  );
                }
                return (
                  <span key={i} className="block" style={{ color: "var(--text-secondary)" }}>
                    {line}
                    {"\n"}
                  </span>
                );
              })}
            </code>
          </pre>
        </motion.div>

        {/* Social proof numbers */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12"
        >
          {[
            { value: "12K+", label: "Active Users" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "50ms", label: "Avg Response Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-black gradient-text-cyan"
              >
                {stat.value}
              </div>
              <div className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Modes ─────────────────────────────────────────────────────────────────────
function ModesSection() {
  return (
    <section id="features" className="py-24 px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(123,97,255,0.05) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="section-badge">
              <Brain size={11} />
              Adaptive Intelligence
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-black mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}
          >
            Choose Your{" "}
            <span className="gradient-text">Mode</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto" }}>
            AI Writer adapts its intelligence to your specific use case — not the other way around.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <Link key={mode.key} href={`/writer?mode=${mode.key}`}>
                <motion.div
                  variants={fadeUp}
                  className={`mode-card ${mode.key} p-8 cursor-pointer`}
                >
                  <div
                    className="inline-flex p-3 rounded-xl mb-5"
                    style={{ background: `${mode.accent}12`, border: `1px solid ${mode.accent}30` }}
                  >
                    <Icon size={24} style={{ color: mode.accent }} />
                  </div>
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: mode.accent }}
                  >
                    {mode.subtitle}
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {mode.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                    {mode.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {mode.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          background: `${mode.accent}10`,
                          border: `1px solid ${mode.accent}25`,
                          color: mode.accent,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: mode.accent }}
                  >
                    Open {mode.title} Mode <ChevronRight size={13} />
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Features ──────────────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section className="py-24 px-4 relative" style={{ background: "rgba(13,18,32,0.5)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="section-badge">
              <Code2 size={11} />
              Full-Stack Writing Tools
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-black mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}
          >
            Powerful <span className="gradient-text">Features</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto" }}>
            Every tool you need to write faster, smarter, and with more confidence — all in one place.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                variants={fadeUp}
                className="glass-card p-6 flex flex-col"
              >
                <div
                  className="feature-icon-wrap mb-4"
                  style={{ background: feat.bg, border: `1px solid ${feat.color}30` }}
                >
                  <Icon size={20} style={{ color: feat.color }} />
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "var(--text-primary)", fontSize: "0.95rem" }}
                >
                  {feat.title}
                </h3>
                <p
                  className="text-sm leading-relaxed flex-1 mb-4"
                  style={{ color: "var(--text-muted)", lineHeight: "1.6" }}
                >
                  {feat.desc}
                </p>
                <Link
                  href="/writer"
                  className="inline-flex items-center gap-1 text-xs font-semibold transition-all duration-200 hover:gap-2"
                  style={{ color: feat.color }}
                >
                  Try it <ChevronRight size={13} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,240,255,0.03) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="section-badge">
              <Star size={11} />
              Social Proof
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-black mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}
          >
            What <span className="gradient-text">Users Say</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={fadeUp}
              className="testimonial-card p-7 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#fbbf24" style={{ color: "#fbbf24" }} />
                ))}
              </div>
              {/* Quote */}
              <blockquote
                className="text-sm leading-relaxed flex-1 mb-6"
                style={{ color: "var(--text-secondary)", fontStyle: "italic" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${t.color}15`, border: `1px solid ${t.color}40`, color: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {t.author}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Section ───────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="signup" className="cta-section py-28 px-4 relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.3), rgba(123,97,255,0.3), transparent)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(0,240,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-5">
            <span className="section-badge">
              <Zap size={11} />
              Free to Use — No Signup
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-black mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.025em" }}
          >
            Ready to Write <span className="gradient-text">Smarter?</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mb-10"
            style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}
          >
            Jump straight into the tool — pick your mode and start writing better immediately.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/writer?mode=student">
              <motion.span
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{ background: "rgba(0,240,255,0.1)", border: "1px solid rgba(0,240,255,0.35)", color: "#00f0ff" }}
              >
                <GraduationCap size={16} /> Student Mode
              </motion.span>
            </Link>
            <Link href="/writer?mode=professional">
              <motion.span
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{ background: "rgba(123,97,255,0.1)", border: "1px solid rgba(123,97,255,0.35)", color: "#7b61ff" }}
              >
                <Briefcase size={16} /> Professional Mode
              </motion.span>
            </Link>
            <Link href="/writer?mode=everyday">
              <motion.span
                className="gradient-btn flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold"
                whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(0,240,255,0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Zap size={16} /> Start Writing
              </motion.span>
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-5 text-xs" style={{ color: "var(--text-muted)" }}>
            No credit card. No signup. Just paste and enhance.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap"],
    Resources: ["Docs", "Blog", "Cookbook", "API Reference"],
    Company: ["About", "Careers", "Privacy", "Terms"],
  };

  return (
    <footer
      className="pt-16 pb-8 px-4"
      style={{ borderTop: "1px solid var(--border-color)", background: "rgba(10,14,23,0.95)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="p-1.5 rounded-lg"
                style={{ background: "rgba(0,240,255,0.1)", border: "1px solid rgba(0,240,255,0.2)" }}
              >
                <Zap size={16} style={{ color: "#00f0ff" }} />
              </div>
              <span className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                AI<span style={{ color: "#00f0ff" }}>Writer</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)", maxWidth: "240px" }}>
              Local-first AI writing tools built for students, professionals, and everyday creators.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <motion.a
                  key={href + Icon.name}
                  href={href}
                  className="ghost-btn p-2 rounded-lg"
                  whileHover={{ scale: 1.1, color: "#00f0ff" }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid var(--border-color)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 AI Writer •{" "}
            <span style={{ color: "#00f0ff" }}>Built for DevHacks</span>
          </p>
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
            <span>Made with</span>
            <Zap size={11} style={{ color: "#00f0ff", margin: "0 2px" }} />
            <span>using Next.js + AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <Navbar />
      <main>
        <Hero />
        <ModesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </motion.div>
  );
}
