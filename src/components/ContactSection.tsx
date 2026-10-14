import React, { useState, useEffect } from 'react';
import { ContactMessage } from '../types/portfolio.ts';
import { Send, CheckCircle2, AlertCircle, Mail, MessageSquare, Inbox, Trash2, Clock } from 'lucide-react';

interface ContactSectionProps {
  onMessageSent?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onMessageSent }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<ContactMessage['category']>('Hiring / Job Opportunity');
  const [message, setMessage] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Recruiter Inbox view
  const [showInbox, setShowInbox] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const fetchInbox = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (showInbox) {
      fetchInbox();
    }
  }, [showInbox]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please provide your name, email, and message.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: subject || 'New Portfolio Inquiry',
          category,
          message
        })
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to submit message');
      }

      setSuccessMsg('Your message was saved to the database. You can view it live in the Portfolio Inbox tab below.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      if (onMessageSent) onMessageSent();
      if (showInbox) fetchInbox();
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      fetchInbox();
      if (onMessageSent) onMessageSent();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="contact" className="py-20 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-900">
          <div className="space-y-3">
            <div className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
              05. Direct Inquiries & Collaboration
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Get in Touch
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
              Interested in discussing a staff engineering opportunity, consulting on distributed systems,
              or optimizing database performance? Drop a message into the persistent portfolio inbox.
            </p>
          </div>

          {/* Toggle between Contact Form and Recruiter Inbox */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setShowInbox(!showInbox);
                if (!showInbox) fetchInbox();
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors border ${
                showInbox
                  ? 'bg-white text-neutral-950 border-white'
                  : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>{showInbox ? 'Show Contact Form' : 'View Recruiter Inbox (Live DB)'}</span>
            </button>
          </div>
        </div>

        {/* View 1: Contact Form */}
        {!showInbox && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-5">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Direct Contact Channels
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Messages submitted here write directly to the Express backend database
                    and trigger an instant confirmation record.
                  </p>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div className="flex items-center gap-3 text-neutral-300">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>elena.vance.systems@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300">
                    <MessageSquare className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Response timeframe: &lt; 24 hours</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400 space-y-2">
                  <div className="font-semibold text-neutral-300">Location Availability</div>
                  <div>San Francisco Bay Area · Open to Hybrid & Select Remote Roles</div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-5">
                
                {successMsg && (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-emerald-300 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 pt-0.5" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {errorMsg && (
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/60 text-rose-300 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 pt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Alex Mercer"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Inquiry Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as any)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                    >
                      <option value="Hiring / Job Opportunity">Hiring / Job Opportunity</option>
                      <option value="Contract / Consulting">Contract / Consulting</option>
                      <option value="Technical Inquiry">Technical Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      placeholder="e.g. Staff Full-Stack Role at Stripe"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell me about the role, technical challenge, or project scope..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-200 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Transmitting to Server...' : 'Send Message (Persist to DB)'}</span>
                </button>
              </form>
            </div>

          </div>
        )}

        {/* View 2: Recruiter Inbox (Direct inspection of contact messages table in DB) */}
        {showInbox && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-mono">
                Live Records from table <code className="text-white">contact_messages</code>
              </span>
              <button
                onClick={fetchInbox}
                className="text-xs text-neutral-300 hover:text-white flex items-center gap-1 font-mono"
              >
                <span>Refresh Inbox</span>
              </button>
            </div>

            {loadingMessages && (
              <div className="py-12 text-center text-xs font-mono text-neutral-500">
                Fetching records from database...
              </div>
            )}

            {!loadingMessages && messages.length === 0 && (
              <div className="py-12 text-center text-xs font-mono text-neutral-500 border border-neutral-900 rounded-xl">
                No messages found in the database.
              </div>
            )}

            {!loadingMessages && messages.length > 0 && (
              <div className="space-y-3">
                {messages.map(m => (
                  <div
                    key={m.id}
                    className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-3 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-white text-sm">{m.name}</span>
                        <span className="text-neutral-400">({m.email})</span>
                        <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[11px]">
                          {m.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-neutral-400 font-mono text-[11px]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neutral-500" />
                          <span>{new Date(m.createdAt).toLocaleDateString()}</span>
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(m.id)}
                          className="text-neutral-500 hover:text-rose-400 transition-colors"
                          title="Delete message from DB"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="font-semibold text-neutral-200">
                      Subject: {m.subject}
                    </div>

                    <p className="text-neutral-300 leading-relaxed font-mono text-xs bg-neutral-950/70 p-3 rounded-lg border border-neutral-800/70">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
