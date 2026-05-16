"use client";

import { useRef, useEffect, useState } from "react";
import { useChat } from "ai/react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

const MAX_QUESTIONS = 5;

const SUGGESTED = [
  "What's his work experience?",
  "Tell me about his projects",
  "What technologies does he use?",
  "What is he studying at UIUC?",
  "How can I get in touch with him?",
];

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-[#FB923C] font-mono text-2xl leading-none select-none">/</span>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
        {children}
      </h2>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2 rounded-xl w-fit" style={{ background: "var(--pill-bg)", border: "1px solid var(--border)" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--fg-muted)" }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export default function ChatBot() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Ref to the chat container div — scroll its own scrollTop, not the page
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // In-memory rate limit — resets on every page refresh
  const [questionsUsed, setQuestionsUsed] = useState(0);

  const exhausted = questionsUsed >= MAX_QUESTIONS;
  const remaining = MAX_QUESTIONS - questionsUsed;

  // Increment count on send (not on receive) so it decrements immediately
  const incrementCount = () => {
    setQuestionsUsed((prev) => prev + 1);
  };

  const { messages, input, setInput, handleInputChange, handleSubmit, append, isLoading } = useChat({
    api: "/api/chat",
  });

  // Scroll only the chat box, never the page
  useEffect(() => {
    const el = chatContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  // Submit via the form (Enter key or send button)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (exhausted || !input.trim() || isLoading) return;
    incrementCount();
    handleSubmit(e);
  };

  // Suggested question — use append() directly to avoid form/state race conditions
  const handleSuggestedClick = (q: string) => {
    if (exhausted || isLoading) return;
    incrementCount();
    append({ role: "user", content: q });
  };

  return (
    <section id="ask" className="py-28">
      <div ref={sectionRef} className="px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>ask me</SectionTitle>

          <p className="text-base leading-relaxed" style={{ color: "var(--fg-2)" }}>
            Chat with an AI trained on my resume, experience, and projects.
          </p>
          <p className="mb-6 mt-1 font-mono text-sm" style={{ color: "var(--fg-dim)" }}>
            {remaining} / {MAX_QUESTIONS} questions remaining this session.
          </p>

          {/* Suggested question pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {SUGGESTED.map((q) => (
              <button
                key={q}
                onClick={() => handleSuggestedClick(q)}
                disabled={exhausted || isLoading}
                className="font-mono text-xs rounded-full px-3 py-1.5 border transition-all"
                style={{
                  borderColor: "var(--border)",
                  color: exhausted ? "var(--fg-dim)" : "var(--fg-muted)",
                  background: "transparent",
                  opacity: exhausted ? 0.4 : 1,
                  cursor: exhausted ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!exhausted) (e.currentTarget as HTMLElement).style.color = "var(--fg)";
                }}
                onMouseLeave={(e) => {
                  if (!exhausted) (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat window — overflow-y scroll on the container itself */}
          <div
            ref={chatContainerRef}
            className="rounded-2xl border mb-3 overflow-y-auto p-4 flex flex-col gap-3"
            style={{
              background: "var(--pill-bg)",
              borderColor: "var(--border)",
              minHeight: "280px",
              maxHeight: "360px",
            }}
          >
            {/* Welcome message — always visible */}
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-2"
              >
                <span className="text-lg leading-none mt-0.5">🤖</span>
                <div
                  className="rounded-xl rounded-tl-none px-3 py-2 text-sm leading-relaxed max-w-[85%]"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--fg)" }}
                >
                  Hi! I'm trained on Anant's resume and portfolio. Ask me anything about his experience, projects, or skills!
                </div>
            </motion.div>

            {/* Messages */}
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-start gap-2 ${m.role === "user" ? "justify-end" : ""}`}
                >
                  {m.role === "assistant" && (
                    <span className="text-lg leading-none mt-0.5 shrink-0">🤖</span>
                  )}
                  <div
                    className="rounded-xl px-3 py-2 text-sm leading-relaxed max-w-[85%]"
                    style={
                      m.role === "user"
                        ? {
                            background: "#FB923C",
                            color: "#0a0a0a",
                            borderRadius: "12px 12px 4px 12px",
                          }
                        : {
                            background: "var(--bg)",
                            border: "1px solid var(--border)",
                            color: "var(--fg)",
                            borderRadius: "12px 12px 12px 4px",
                          }
                    }
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2"
              >
                <span className="text-lg leading-none mt-0.5">🤖</span>
                <TypingIndicator />
              </motion.div>
            )}

            {/* Exhausted message */}
            {exhausted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-xs font-mono py-2"
                style={{ color: "var(--fg-dim)" }}
              >
                You've used all {MAX_QUESTIONS} questions this session — refresh to start over.
              </motion.p>
            )}
          </div>

          {/* Input row */}
          <form onSubmit={onSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              disabled={exhausted || isLoading}
              placeholder={exhausted ? "No questions remaining this session" : "Ask something about Anant..."}
              className="flex-1 rounded-xl border px-4 py-2.5 text-sm font-mono outline-none transition-colors"
              style={{
                background: "var(--pill-bg)",
                borderColor: "var(--border)",
                color: "var(--fg)",
                opacity: exhausted ? 0.5 : 1,
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#FB923C")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
            <button
              type="submit"
              disabled={exhausted || !input.trim() || isLoading}
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-all shrink-0"
              style={{
                background: exhausted || !input.trim() ? "var(--border)" : "#FB923C",
                color: exhausted || !input.trim() ? "var(--fg-dim)" : "#0a0a0a",
                cursor: exhausted || !input.trim() ? "not-allowed" : "pointer",
              }}
              aria-label="Send message"
            >
              <Send size={16} strokeWidth={2} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
