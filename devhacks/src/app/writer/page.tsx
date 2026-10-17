"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
    Copy,
    RotateCcw,
    Loader2,
    ChevronLeft,
    Sparkles,
    ArrowRight,
    FileText,
    AlignLeft,
    Star,
} from "lucide-react";
import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Mode = "student" | "professional" | "everyday";
type Feature = {
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
    color: string;
    description: string;
};

// ─── Mode Config ───────────────────────────────────────────────────────────────
const modeConfig: Record<
    Mode,
    {
        label: string;
        icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
        accent: string;
        subtitle: string;
        placeholder: string;
        features: Feature[];
        tones: string[];
    }
> = {
    student: {
        label: "Student",
        icon: GraduationCap,
        accent: "#00f0ff",
        subtitle: "Academic Excellence",
        placeholder:
            "Paste your essay, SOP, thesis paragraph, or any academic text here...\n\nExample: 'Machine learning is changing many industries. It can do lots of things automatically and saves time for companies.'",
        features: [
            { id: "enhance", label: "Enhance Writing", icon: Sparkles, color: "#00f0ff", description: "Improve clarity and flow" },
            { id: "expand", label: "Expand", icon: ArrowRight, color: "#34d399", description: "Add depth and examples" },
            { id: "condense", label: "Condense", icon: AlignLeft, color: "#fbbf24", description: "Remove fluff, keep essence" },
            { id: "academic_tone", label: "Academic Tone", icon: BookOpen, color: "#a78bfa", description: "Formal scholarly language" },
            { id: "plagiarism", label: "Plagiarism Check", icon: Shield, color: "#f472b6", description: "Check for similarity issues" },
            { id: "hook", label: "Hook Generator", icon: Lightbulb, color: "#fb923c", description: "Create a compelling opener" },
        ],
        tones: ["Academic", "Formal", "Persuasive", "Analytical", "Descriptive", "Argumentative"],
    },
    professional: {
        label: "Professional",
        icon: Briefcase,
        accent: "#7b61ff",
        subtitle: "Career-Ready Writing",
        placeholder:
            "Paste your LinkedIn post, cover letter, email, or business content here...\n\nExample: 'I want to apply for the marketing manager position. I have experience in social media and I did good work at my last company.'",
        features: [
            { id: "enhance", label: "Polish Writing", icon: Sparkles, color: "#7b61ff", description: "Executive-level clarity" },
            { id: "linkedin", label: "LinkedIn Optimize", icon: Star, color: "#00f0ff", description: "Boost post engagement" },
            { id: "hook", label: "Hook Generator", icon: Lightbulb, color: "#fbbf24", description: "Scroll-stopping openers" },
            { id: "seo", label: "SEO Optimize", icon: Search, color: "#34d399", description: "Rank higher in search" },
            { id: "condense", label: "Executive Summary", icon: AlignLeft, color: "#f472b6", description: "BLUF — Bottom line up front" },
            { id: "persuasive", label: "Persuasive Tone", icon: Palette, color: "#fb923c", description: "Convert readers to action" },
        ],
        tones: ["Professional", "Confident", "Authoritative", "Empathetic", "Persuasive", "Diplomatic"],
    },
    everyday: {
        label: "Everyday",
        icon: MessageCircle,
        accent: "#60a5fa",
        subtitle: "Casual & Social",
        placeholder:
            "Paste your caption, text, DM, or any everyday content here...\n\nExample: 'Just finished my workout. Feeling good. Gonna eat some food and watch netflix later.'",
        features: [
            { id: "enhance", label: "Enhance Vibe", icon: Sparkles, color: "#60a5fa", description: "Sound naturally better" },
            { id: "hook", label: "Social Hook", icon: Lightbulb, color: "#fbbf24", description: "Grab attention instantly" },
            { id: "casual", label: "Casual Tone", icon: MessageCircle, color: "#34d399", description: "Friendly and approachable" },
            { id: "witty", label: "Make it Witty", icon: Star, color: "#f472b6", description: "Add humor and personality" },
            { id: "expand", label: "Add Detail", icon: ArrowRight, color: "#a78bfa", description: "Say more with context" },
            { id: "condense", label: "Keep it Short", icon: AlignLeft, color: "#fb923c", description: "Snappy and punchy" },
        ],
        tones: ["Casual", "Friendly", "Witty", "Energetic", "Relatable", "Humorous"],
    },
};

// ─── AI Transform Logic (simulated — swap this with real API) ──────────────────
function simulateEnhancement(text: string, mode: Mode, feature: string, tone: string): string {
    if (!text.trim()) return "";

    const t = text.trim();

    if (feature === "plagiarism") {
        return `🛡️ Plagiarism Analysis Report\n\n📊 Similarity Score: 4% (Low — Excellent)\n\n✅ Original content detected\n✅ No exact phrase matches found\n✅ Citation structure looks good\n\n💡 Suggestions:\n• Consider citing sources for any statistics mentioned\n• Paraphrase sections marked with quotes\n• Your argumentative structure is original\n\n─────────────────────────\nanalyzed ${t.split(" ").length} words | local-first scan`;
    }

    const prefixes: Record<string, Record<Mode, string>> = {
        enhance: {
            student: `Drawing upon a comprehensive analysis of the subject matter, ${t.charAt(0).toLowerCase() + t.slice(1).replace(/\.$/, "")} — a phenomenon that warrants rigorous academic examination and scholarly discourse in contemporary research literature.`,
            professional: `${t.charAt(0).toUpperCase() + t.slice(1).replace(/\.$/, "")}. This strategic insight positions us to capitalize on emerging opportunities and deliver measurable outcomes aligned with organizational objectives.`,
            everyday: `Okay but honestly? ${t.replace(/\.$/, "")} and I'm absolutely here for it 🙌 Felt good to finally put that out there.`,
        },
        hook: {
            student: `What if everything we assumed about this topic was fundamentally wrong?\n\n${t}\n\nThis paper challenges conventional wisdom and presents evidence that reframes our understanding entirely.`,
            professional: `Most people get this completely wrong.\n\n${t}\n\nHere's what the top 1% actually do differently — and why it matters for your career.`,
            everyday: `Nobody talks about this, but...\n\n${t}\n\nSave this before it gets buried 👇`,
        },
        expand: {
            student: `${t}\n\nThis assertion is further supported by empirical evidence from multiple longitudinal studies. Researchers have consistently demonstrated that this phenomenon manifests across diverse contextual settings, suggesting a robust underlying mechanism. Furthermore, the theoretical framework underpinning this argument draws from [Author, Year], whose seminal work established the foundational principles that continue to influence contemporary academic discourse.`,
            professional: `${t}\n\nTo provide additional context: this approach has been validated across multiple Fortune 500 implementations, yielding an average 34% improvement in efficiency metrics. Key stakeholders should note three primary impact areas: (1) operational scalability, (2) cost reduction through automation, and (3) enhanced team productivity. The ROI timeline typically ranges from 90 to 180 days post-deployment.`,
            everyday: `${t}\n\nAnd honestly? There's so much more to unpack here. It started when I realized that the little things really do add up. Whether it's the people you surround yourself with, the habits you build, or just the mindset you bring — it all compounds. Trust the process and keep showing up. 💪`,
        },
        condense: {
            student: `${t.split(" ").slice(0, Math.ceil(t.split(" ").length * 0.4)).join(" ")} — demonstrating significant scholarly merit.`,
            professional: `Bottom line: ${t.split(" ").slice(0, Math.ceil(t.split(" ").length * 0.3)).join(" ")} — delivering measurable impact.`,
            everyday: `TL;DR: ${t.split(" ").slice(0, Math.ceil(t.split(" ").length * 0.3)).join(" ")} ✨`,
        },
        academic_tone: {
            student: `From a scholarly perspective, ${t.charAt(0).toLowerCase() + t.slice(1).replace(/\.$/, "")}. This theoretical position merits consideration within the broader academic framework, as extant literature consistently underscores the multifaceted nature of this phenomenon. A nuanced examination reveals that contextual variables play a pivotal role in mediating the observed outcomes.`,
            professional: t,
            everyday: t,
        },
        linkedin: {
            student: t,
            professional: `🔥 ${t}\n\n3 things I've learned from this:\n\n1️⃣ Consistency beats perfection every time\n2️⃣ The best opportunities come from genuine relationships\n3️⃣ Your network is your net worth — invest accordingly\n\nWhat's been your biggest professional lesson this year?\n\n↓ Drop it in the comments — let's learn from each other\n\n#Leadership #CareerGrowth #ProfessionalDevelopment`,
            everyday: t,
        },
        seo: {
            student: t,
            professional: `${t}\n\n[SEO-Optimized Version]\n\nMeta Title: ${t.split(" ").slice(0, 7).join(" ")} | Expert Guide 2025\nMeta Description: Discover how ${t.split(" ").slice(0, 10).join(" ")} can transform your results. Learn proven strategies from industry experts.\n\nPrimary Keywords: ${t.split(" ").filter((w) => w.length > 4).slice(0, 5).join(", ")}\nReadability Score: 78/100 (Good)\nContent Score: Optimized ✓`,
            everyday: t,
        },
        persuasive: {
            student: t,
            professional: `Here's the hard truth most people ignore: ${t.charAt(0).toLowerCase() + t.slice(1).replace(/\.$/, "")}.\n\nThe data is clear. The evidence is undeniable. And those who act now will be positioned leagues ahead of those who wait.\n\nThe question isn't whether you should — it's whether you can afford not to.`,
            everyday: t,
        },
        casual: {
            student: t,
            professional: t,
            everyday: `Hey so like, ${t.charAt(0).toLowerCase() + t.slice(1).replace(/\.$/, "")} — and yeah, it's pretty much exactly what it sounds like! No cap, it's actually been kinda great overall 😄`,
        },
        witty: {
            student: t,
            professional: t,
            everyday: `${t.replace(/\.$/, "")} — which, plot twist, is apparently my whole personality now 😂 My past self would be so confused. My future self is probably shaking their head. But right now? Living for it.`,
        },
    };

    const toneMap: Record<string, string> = {
        Academic: "academically rigorous manner",
        Formal: "formal, structured manner",
        Casual: "casual, conversational manner",
        Professional: "professional, clear manner",
        Witty: "witty, engaging manner",
        Persuasive: "highly persuasive manner",
        Confident: "confident, decisive manner",
    };

    const toneNote = tone ? `\n\n[Tone applied: ${toneMap[tone] || tone}]` : "";

    const result =
        prefixes[feature]?.[mode] ||
        `✨ Enhanced (${feature} · ${tone || "default"} tone):\n\n${t}`;

    return result + toneNote;
}

// ─── Writer Page ───────────────────────────────────────────────────────────────
export default function WriterPage() {
    const [activeMode, setActiveMode] = useState<Mode>("student");
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [activeFeature, setActiveFeature] = useState<string | null>(null);
    const [selectedTone, setSelectedTone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const outputRef = useRef<HTMLDivElement>(null);

    const currentMode = modeConfig[activeMode];

    const handleTextChange = (val: string) => {
        setInputText(val);
        setWordCount(val.trim() ? val.trim().split(/\s+/).length : 0);
    };

    const switchMode = (mode: Mode) => {
        setActiveMode(mode);
        setActiveFeature(null);
        setSelectedTone("");
        setOutputText("");
    };

    const handleEnhance = useCallback(async () => {
        if (!inputText.trim()) return;
        const feature = activeFeature || "enhance";
        setIsLoading(true);
        setOutputText("");

        await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));

        const result = simulateEnhancement(inputText, activeMode, feature, selectedTone);
        setIsLoading(false);
        setOutputText(result);

        setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }, [inputText, activeMode, activeFeature, selectedTone]);

    const handleCopy = () => {
        if (!outputText) return;
        navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setInputText("");
        setOutputText("");
        setActiveFeature(null);
        setSelectedTone("");
        setWordCount(0);
    };

    return (
        <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
            {/* Top bar */}
            <header
                className="navbar sticky top-0 z-50"
                style={{ borderBottom: "1px solid var(--border-color)" }}
            >
                <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 text-sm transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            <ChevronLeft size={16} />
                            <span className="hidden sm:inline">Back</span>
                        </Link>
                        <div style={{ width: 1, height: 18, background: "var(--border-color)" }} />
                        <div className="flex items-center gap-2">
                            <div
                                className="p-1 rounded-md"
                                style={{ background: "rgba(0,240,255,0.1)", border: "1px solid rgba(0,240,255,0.2)" }}
                            >
                                <Zap size={14} style={{ color: "#00f0ff" }} />
                            </div>
                            <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                                AI<span style={{ color: "#00f0ff" }}>Writer</span>
                            </span>
                        </div>
                    </div>

                    {/* Mode tabs in header */}
                    <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)" }}>
                        {(Object.keys(modeConfig) as Mode[]).map((mode) => {
                            const cfg = modeConfig[mode];
                            const Icon = cfg.icon;
                            const isActive = activeMode === mode;
                            return (
                                <button
                                    key={mode}
                                    onClick={() => switchMode(mode)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                                    style={{
                                        background: isActive ? `${cfg.accent}18` : "transparent",
                                        color: isActive ? cfg.accent : "var(--text-muted)",
                                        border: isActive ? `1px solid ${cfg.accent}40` : "1px solid transparent",
                                    }}
                                >
                                    <Icon size={13} style={{ color: isActive ? cfg.accent : "var(--text-muted)" }} />
                                    <span className="hidden sm:inline">{cfg.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleReset}
                            className="ghost-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                        >
                            <RotateCcw size={13} />
                            <span className="hidden sm:inline">Reset</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* Mode banner */}
                <motion.div
                    key={activeMode}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-6 p-4 rounded-xl"
                    style={{
                        background: `${currentMode.accent}08`,
                        border: `1px solid ${currentMode.accent}20`,
                    }}
                >
                    <div
                        className="p-2 rounded-lg flex-shrink-0"
                        style={{ background: `${currentMode.accent}15`, border: `1px solid ${currentMode.accent}30` }}
                    >
                        <currentMode.icon size={20} style={{ color: currentMode.accent }} />
                    </div>
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: currentMode.accent }}>
                            {currentMode.subtitle}
                        </div>
                        <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                            {currentMode.label} Mode — {currentMode.features.length} tools available
                        </div>
                    </div>
                    <div className="ml-auto hidden sm:flex items-center gap-2">
                        {currentMode.tones.slice(0, 3).map((tone) => (
                            <span
                                key={tone}
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{
                                    background: `${currentMode.accent}10`,
                                    border: `1px solid ${currentMode.accent}25`,
                                    color: currentMode.accent,
                                }}
                            >
                                {tone}
                            </span>
                        ))}
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>+{currentMode.tones.length - 3} more</span>
                    </div>
                </motion.div>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {currentMode.features.map((feat) => {
                        const Icon = feat.icon;
                        const isActive = activeFeature === feat.id;
                        return (
                            <motion.button
                                key={feat.id}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setActiveFeature(isActive ? null : feat.id)}
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                                style={{
                                    background: isActive ? `${feat.color}18` : "rgba(255,255,255,0.04)",
                                    border: isActive ? `1px solid ${feat.color}50` : "1px solid var(--border-color)",
                                    color: isActive ? feat.color : "var(--text-secondary)",
                                }}
                                title={feat.description}
                            >
                                <Icon size={13} style={{ color: isActive ? feat.color : "var(--text-muted)" }} />
                                {feat.label}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Tone selector */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                        <Palette size={13} />
                        Tone:
                    </span>
                    {currentMode.tones.map((tone) => (
                        <button
                            key={tone}
                            onClick={() => setSelectedTone(selectedTone === tone ? "" : tone)}
                            className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200"
                            style={{
                                background: selectedTone === tone ? `${currentMode.accent}15` : "transparent",
                                border: selectedTone === tone ? `1px solid ${currentMode.accent}40` : "1px solid var(--border-color)",
                                color: selectedTone === tone ? currentMode.accent : "var(--text-muted)",
                            }}
                        >
                            {tone}
                        </button>
                    ))}
                </div>

                {/* Editor layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Input panel */}
                    <div
                        className="flex flex-col rounded-xl overflow-hidden"
                        style={{ border: "1px solid var(--border-color)", background: "rgba(13,18,32,0.7)" }}
                    >
                        {/* Panel header */}
                        <div
                            className="flex items-center justify-between px-4 py-3"
                            style={{ borderBottom: "1px solid var(--border-color)", background: "rgba(255,255,255,0.02)" }}
                        >
                            <div className="flex items-center gap-2">
                                <FileText size={14} style={{ color: "var(--text-muted)" }} />
                                <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                                    Your Text
                                </span>
                            </div>
                            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                                {wordCount} word{wordCount !== 1 ? "s" : ""}
                            </span>
                        </div>

                        {/* Textarea */}
                        <textarea
                            value={inputText}
                            onChange={(e) => handleTextChange(e.target.value)}
                            placeholder={currentMode.placeholder}
                            className="flex-1 w-full px-4 py-4 text-sm leading-relaxed resize-none outline-none"
                            style={{
                                background: "transparent",
                                color: "var(--text-primary)",
                                minHeight: "320px",
                                fontFamily: "Inter, sans-serif",
                            }}
                        />

                        {/* Panel footer */}
                        <div
                            className="flex items-center justify-between px-4 py-3"
                            style={{ borderTop: "1px solid var(--border-color)" }}
                        >
                            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                                {activeFeature && (
                                    <span
                                        className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                                        style={{ background: `${currentMode.accent}12`, color: currentMode.accent, border: `1px solid ${currentMode.accent}25` }}
                                    >
                                        <Sparkles size={10} />
                                        {currentMode.features.find((f) => f.id === activeFeature)?.label || "Enhance"}
                                    </span>
                                )}
                                {selectedTone && (
                                    <span style={{ color: "var(--text-muted)" }}>
                                        · {selectedTone} tone
                                    </span>
                                )}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleEnhance}
                                disabled={!inputText.trim() || isLoading}
                                className="gradient-btn flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={13} className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Zap size={13} />
                                        {activeFeature
                                            ? currentMode.features.find((f) => f.id === activeFeature)?.label || "Enhance"
                                            : "Enhance"}
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>

                    {/* Output panel */}
                    <div
                        ref={outputRef}
                        className="flex flex-col rounded-xl overflow-hidden"
                        style={{ border: `1px solid ${outputText ? `${currentMode.accent}20` : "var(--border-color)"}`, background: "rgba(13,18,32,0.7)", transition: "border-color 0.4s ease" }}
                    >
                        {/* Panel header */}
                        <div
                            className="flex items-center justify-between px-4 py-3"
                            style={{ borderBottom: "1px solid var(--border-color)", background: "rgba(255,255,255,0.02)" }}
                        >
                            <div className="flex items-center gap-2">
                                <Sparkles size={14} style={{ color: outputText ? currentMode.accent : "var(--text-muted)" }} />
                                <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                                    Enhanced Output
                                </span>
                            </div>
                            {outputText && (
                                <div className="flex items-center gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.06 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleCopy}
                                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all"
                                        style={{
                                            background: copied ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.05)",
                                            border: copied ? "1px solid rgba(52,211,153,0.4)" : "1px solid var(--border-color)",
                                            color: copied ? "#34d399" : "var(--text-secondary)",
                                        }}
                                    >
                                        {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                                        {copied ? "Copied!" : "Copy"}
                                    </motion.button>
                                </div>
                            )}
                        </div>

                        {/* Output content */}
                        <div className="flex-1 px-4 py-4 overflow-y-auto" style={{ minHeight: "320px" }}>
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center h-full gap-4 py-16"
                                    >
                                        <div className="relative">
                                            <div
                                                className="w-12 h-12 rounded-full"
                                                style={{ border: `2px solid ${currentMode.accent}30` }}
                                            />
                                            <div
                                                className="absolute inset-0 w-12 h-12 rounded-full animate-spin"
                                                style={{ border: `2px solid transparent`, borderTopColor: currentMode.accent }}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-semibold mb-1" style={{ color: "var(--text-secondary)" }}>
                                                AI is enhancing your text
                                            </div>
                                            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                                                {activeFeature === "plagiarism" ? "Scanning for similarity..." : `Applying ${selectedTone || currentMode.label} intelligence...`}
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : outputText ? (
                                    <motion.div
                                        key="output"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <pre
                                            className="text-sm leading-relaxed whitespace-pre-wrap"
                                            style={{ fontFamily: "Inter, sans-serif", color: "var(--text-primary)" }}
                                        >
                                            {outputText}
                                        </pre>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center"
                                    >
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                            style={{ background: `${currentMode.accent}10`, border: `1px solid ${currentMode.accent}20` }}
                                        >
                                            <currentMode.icon size={26} style={{ color: currentMode.accent, opacity: 0.7 }} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold mb-1" style={{ color: "var(--text-secondary)" }}>
                                                Your enhanced text will appear here
                                            </div>
                                            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                                                Paste your text, choose a feature, then hit Enhance
                                            </div>
                                        </div>
                                        {/* Quick start suggestions */}
                                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                                            {currentMode.features.slice(0, 3).map((feat) => {
                                                const Icon = feat.icon;
                                                return (
                                                    <button
                                                        key={feat.id}
                                                        onClick={() => setActiveFeature(feat.id)}
                                                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all"
                                                        style={{
                                                            background: `${feat.color}10`,
                                                            border: `1px solid ${feat.color}25`,
                                                            color: feat.color,
                                                        }}
                                                    >
                                                        <Icon size={11} />
                                                        {feat.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {outputText && (
                            <div
                                className="flex items-center justify-between px-4 py-3"
                                style={{ borderTop: "1px solid var(--border-color)" }}
                            >
                                <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                                    <CheckCircle size={12} style={{ color: "#34d399" }} />
                                    Enhanced with{" "}
                                    <span style={{ color: currentMode.accent }}>
                                        {currentMode.label} · {activeFeature ? currentMode.features.find((f) => f.id === activeFeature)?.label : "AI Enhance"}
                                    </span>
                                </div>
                                <button
                                    onClick={handleEnhance}
                                    className="text-xs transition-colors flex items-center gap-1"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    <RotateCcw size={11} />
                                    Regenerate
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mode switcher bottom cards */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(Object.entries(modeConfig) as [Mode, typeof modeConfig.student][]).map(([key, cfg]) => {
                        const Icon = cfg.icon;
                        const isActive = activeMode === key;
                        return (
                            <motion.button
                                key={key}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => switchMode(key)}
                                className="flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-300"
                                style={{
                                    background: isActive ? `${cfg.accent}08` : "rgba(13,18,32,0.5)",
                                    border: `1px solid ${isActive ? cfg.accent + "30" : "var(--border-color)"}`,
                                }}
                            >
                                <div
                                    className="p-2 rounded-lg flex-shrink-0"
                                    style={{ background: `${cfg.accent}15`, border: `1px solid ${cfg.accent}25` }}
                                >
                                    <Icon size={18} style={{ color: cfg.accent }} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold mb-0.5" style={{ color: isActive ? cfg.accent : "var(--text-primary)" }}>
                                        {cfg.label}
                                    </div>
                                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                                        {cfg.subtitle} · {cfg.features.length} tools
                                    </div>
                                </div>
                                {isActive && (
                                    <div
                                        className="ml-auto mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                        style={{ background: cfg.accent }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
