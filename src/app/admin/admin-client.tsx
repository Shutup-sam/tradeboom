'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAdmin } from '@/actions/admin';
import {
  Users,
  Mail,
  Search,
  Download,
  LogOut,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  interest: string;
  message?: string;
  createdAt: string;
};

type Subscriber = {
  email: string;
  createdAt: string;
};

interface Props {
  initialContacts: Contact[];
  initialSubscribers: Subscriber[];
}

export function AdminDashboardClient({ initialContacts, initialSubscribers }: Props) {
  const [activeTab, setActiveTab] = useState<'contacts' | 'subscribers'>('contacts');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.refresh();
    router.push('/admin/login');
  };

  const filteredContacts = initialContacts.filter((c) => {
    const term = search.toLowerCase();
    return (
      c.firstName.toLowerCase().includes(term) ||
      c.lastName.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.interest.toLowerCase().includes(term) ||
      (c.message && c.message.toLowerCase().includes(term))
    );
  });

  const filteredSubscribers = initialSubscribers.filter((s) => {
    return s.email.toLowerCase().includes(search.toLowerCase());
  });

  const exportToCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    if (activeTab === 'contacts') {
      csvContent += 'First Name,Last Name,Email,Course Interest,Message,Date\n';
      filteredContacts.forEach((c) => {
        const msg = c.message ? c.message.replace(/"/g, '""') : '';
        csvContent += `"${c.firstName}","${c.lastName}","${c.email}","${c.interest}","${msg}","${c.createdAt}"\n`;
      });
    } else {
      csvContent += 'Email,Date\n';
      filteredSubscribers.forEach((s) => {
        csvContent += `"${s.email}","${s.createdAt}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `${activeTab}_leads_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-ink-950 text-white font-sans">
      {/* Background radial effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-1/4 top-1/4 h-[35rem] w-[35rem] rounded-full bg-electric-500/[0.03] blur-[150px]" />
        <div className="absolute left-1/4 bottom-1/4 h-[35rem] w-[35rem] rounded-full bg-emerald-500/[0.02] blur-[150px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-base font-extrabold tracking-tight text-white">
              TRADE <span className="text-gradient-aurora italic font-semibold">BOOM</span>
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white/50 uppercase tracking-wider">
              Control Panel
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3.5 py-2 text-xs font-semibold hover:bg-white/10 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.01] p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">Total Leads</span>
              <Users className="h-4 w-4 text-electric-400" />
            </div>
            <p className="mt-3 font-mono text-3xl font-extrabold text-white">{initialContacts.length}</p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.01] p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">Subscribers</span>
              <Mail className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-3 font-mono text-3xl font-extrabold text-white">{initialSubscribers.length}</p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.01] p-6 backdrop-blur-xl sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">Active Interest</span>
              <TrendingUp className="h-4 w-4 text-crimson-400" />
            </div>
            <p className="mt-3 text-sm font-semibold text-white/80">
              {initialContacts.length > 0
                ? `${((initialContacts.filter(c => c.interest.includes('Mentorship')).length / initialContacts.length) * 100).toFixed(0)}% Mentorship`
                : 'No course stats yet'}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex rounded-xl bg-white/[0.03] p-1 border border-white/[0.06] self-start">
            <button
              onClick={() => {
                setActiveTab('contacts');
                setSearch('');
              }}
              className={cn(
                'rounded-lg px-4 py-2 text-xs font-semibold transition-colors',
                activeTab === 'contacts' ? 'bg-electric-500 text-white' : 'text-white/60 hover:text-white'
              )}
            >
              Contact Leads ({filteredContacts.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('subscribers');
                setSearch('');
              }}
              className={cn(
                'rounded-lg px-4 py-2 text-xs font-semibold transition-colors',
                activeTab === 'subscribers' ? 'bg-electric-500 text-white' : 'text-white/60 hover:text-white'
              )}
            >
              Newsletter ({filteredSubscribers.length})
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder={activeTab === 'contacts' ? 'Search name, email, or course...' : 'Search subscriber email...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full sm:w-64 rounded-xl border border-white/[0.08] bg-white/[0.02] pl-10 pr-4 text-xs text-white placeholder-white/30 outline-none focus:border-electric-400/40 focus:bg-white/[0.04]"
              />
            </div>

            <button
              onClick={exportToCSV}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-white px-4 text-xs font-bold text-ink-950 transition-colors hover:bg-white/90 active:scale-[0.98]"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.01] backdrop-blur-xl">
          <div className="overflow-x-auto">
            {activeTab === 'contacts' ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-white/40">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Interest</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-xs text-white/30 font-medium">
                        No contact leads found.
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((c, i) => (
                      <tr key={i} className="text-xs text-white/80 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-semibold text-white">
                          {c.firstName} {c.lastName}
                        </td>
                        <td className="px-6 py-4 font-mono text-white/60">{c.email}</td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-electric-500/10 border border-electric-500/20 px-2.5 py-0.5 text-[10px] font-bold text-electric-400 uppercase tracking-wider">
                            {c.interest}
                          </span>
                        </td>
                        <td className="px-6 py-4 max-w-xs truncate text-white/50">{c.message || '—'}</td>
                        <td className="px-6 py-4 font-mono text-[10px] text-white/40">
                          {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-white/40">
                    <th className="px-6 py-4">Subscriber Email</th>
                    <th className="px-6 py-4">Subscribe Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="px-6 py-12 text-center text-xs text-white/30 font-medium">
                        No subscribers found.
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((s, i) => (
                      <tr key={i} className="text-xs text-white/80 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-mono text-white">{s.email}</td>
                        <td className="px-6 py-4 font-mono text-[10px] text-white/40">
                          {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '—'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
