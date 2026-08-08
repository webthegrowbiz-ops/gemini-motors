/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Isolated Gemini Motors website AI chatbot.
 * Sends messages to the n8n webhook and displays response.reply.
 */

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, MessageCircle, Send, X } from 'lucide-react';
import { CHAT_WIDGET_CONFIG } from '../../data';

const WELCOME_MESSAGE =
  'Hi! 👋 Welcome to Gemini Motors. How can I help you today?';

const ERROR_MESSAGE =
  "Sorry, I'm having trouble connecting right now. Please try again or contact Gemini Motors directly.";

const SESSION_STORAGE_KEY = 'gm_website_chat_session_v1';

const TEST_WEBHOOK_URL = 'https://thegrowbiz.app.n8n.cloud/webhook-test/gemini-chat';
const PRODUCTION_WEBHOOK_URL = 'https://thegrowbiz.app.n8n.cloud/webhook/gemini-chat';

type ChatRole = 'assistant' | 'user';

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

interface PersistedChatSession {
  sessionId: string;
  name: string;
  phone: string;
}

interface N8nChatResponse {
  success?: boolean;
  reply?: string;
}

function getWebhookUrl(): string {
  const fromEnv = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL?.trim();
  if (fromEnv) return fromEnv;
  return PRODUCTION_WEBHOOK_URL;
}

function createId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function loadPersistedSession(): PersistedChatSession {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedChatSession>;
      if (parsed.sessionId) {
        return {
          sessionId: parsed.sessionId,
          name: parsed.name?.trim() || '',
          phone: parsed.phone?.trim() || '',
        };
      }
    }
  } catch {
    // Ignore storage read errors and create a fresh session.
  }

  return {
    sessionId: createId('gm'),
    name: '',
    phone: '',
  };
}

function persistSession(session: PersistedChatSession): void {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Ignore storage write errors.
  }
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

async function sendChatMessage(payload: {
  sessionId: string;
  name: string;
  phone: string;
  message: string;
}): Promise<string> {
  const response = await fetch(getWebhookUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      sessionId: payload.sessionId,
      name: payload.name,
      phone: payload.phone,
      message: payload.message,
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded with ${response.status}`);
  }

  const data = (await response.json()) as N8nChatResponse;
  const reply = typeof data.reply === 'string' ? data.reply.trim() : '';

  if (!reply) {
    throw new Error('Webhook response missing reply');
  }

  return reply;
}

export default function WebsiteChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [session, setSession] = useState<PersistedChatSession>(() => loadPersistedSession());
  const [nameDraft, setNameDraft] = useState('');
  const [phoneDraft, setPhoneDraft] = useState('');
  const [contactError, setContactError] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: WELCOME_MESSAGE,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const hasContactDetails = Boolean(session.name && session.phone);
  const webhookReady = useMemo(() => Boolean(getWebhookUrl()), []);

  useEffect(() => {
    persistSession(session);
  }, [session]);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (hasContactDetails) {
      inputRef.current?.focus();
    }
  }, [isOpen, hasContactDetails]);

  if (!CHAT_WIDGET_CONFIG.enabled || CHAT_WIDGET_CONFIG.mode !== 'ai-chatbot') {
    return null;
  }

  const appendMessage = (role: ChatRole, content: string) => {
    setMessages((current) => [
      ...current,
      {
        id: createId(role),
        role,
        content,
      },
    ]);
  };

  const handleContactSubmit = (event: FormEvent) => {
    event.preventDefault();
    const name = nameDraft.trim();
    const phone = phoneDraft.trim();

    if (!name) {
      setContactError('Please enter your name.');
      return;
    }

    if (!isValidPhone(phone)) {
      setContactError('Please enter a valid phone number.');
      return;
    }

    setContactError('');
    setSession((current) => ({
      ...current,
      name,
      phone,
    }));
    appendMessage(
      'assistant',
      `Thanks, ${name}. You can ask about vehicles, finance, service, or availability anytime.`
    );
  };

  const handleSend = async (event?: FormEvent) => {
    event?.preventDefault();

    const message = input.trim();
    if (!message || isSending || !hasContactDetails || !webhookReady) return;

    setInput('');
    appendMessage('user', message);
    setIsSending(true);

    try {
      const reply = await sendChatMessage({
        sessionId: session.sessionId,
        name: session.name,
        phone: session.phone,
        message,
      });
      appendMessage('assistant', reply);
    } catch {
      appendMessage('assistant', ERROR_MESSAGE);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-[60] flex flex-col items-end gap-3 md:bottom-6">
      {isOpen && (
        <section
          className="pointer-events-auto flex h-[min(32rem,calc(100dvh-8.5rem))] w-[min(22.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl shadow-blue-950/20"
          aria-label="Gemini Motors AI chatbot"
        >
          <header className="flex items-center justify-between bg-gradient-to-r from-[#174f96] via-[#1f5fae] to-[#2f75c9] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-bold tracking-wide">Gemini Motors Assistant</p>
              <p className="text-[11px] font-medium text-blue-100">AI support for sales & service</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              aria-label="Close chatbot"
            >
              <X size={16} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#f8f9ff] px-3 py-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-[#1f5fae] text-white'
                      : 'rounded-bl-md border border-slate-200 bg-white text-[#0b1c30]'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 shadow-sm">
                  <Loader2 size={14} className="animate-spin text-[#1f5fae]" />
                  Typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {!hasContactDetails ? (
            <form onSubmit={handleContactSubmit} className="space-y-2 border-t border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold text-slate-700">
                Share your details so we can assist you better.
              </p>
              <input
                type="text"
                value={nameDraft}
                onChange={(event) => setNameDraft(event.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9ff] px-3 py-2.5 text-sm text-[#0b1c30] outline-none transition focus:border-[#1f5fae] focus:ring-2 focus:ring-blue-100"
              />
              <input
                type="tel"
                value={phoneDraft}
                onChange={(event) => setPhoneDraft(event.target.value)}
                placeholder="Phone number"
                autoComplete="tel"
                className="w-full rounded-xl border border-slate-200 bg-[#f8f9ff] px-3 py-2.5 text-sm text-[#0b1c30] outline-none transition focus:border-[#1f5fae] focus:ring-2 focus:ring-blue-100"
              />
              {contactError ? <p className="text-xs font-medium text-red-600">{contactError}</p> : null}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f5fae] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#2f75c9]"
              >
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your message..."
                disabled={isSending}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-[#f8f9ff] px-3 py-2.5 text-sm text-[#0b1c30] outline-none transition focus:border-[#1f5fae] focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1f5fae] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#2f75c9] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
          )}
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#174f96] via-[#1f5fae] to-[#2f75c9] text-white shadow-2xl shadow-blue-950/30 transition hover:scale-105 hover:shadow-blue-900/40 active:scale-95"
        aria-label={isOpen ? 'Close Gemini Motors chatbot' : 'Open Gemini Motors chatbot'}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
