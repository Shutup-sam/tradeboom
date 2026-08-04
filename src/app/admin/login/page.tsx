'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyAdminPassword } from '@/actions/admin';
import { Lock, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import { MagneticButton } from '@/components/ui/button';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await verifyAdminPassword(password);
      if (res.success) {
        setSuccess(true);
        router.refresh();
        setTimeout(() => {
          router.push('/admin');
        }, 800);
      } else {
        setError(res.error || 'Authorization failed.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-ink-950 px-4 py-12">
      {/* Background radial overlays */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/[0.04] blur-[150px]" />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.01] p-8 backdrop-blur-2xl shadow-2xl relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-electric-400/20 bg-electric-400/10 mb-4">
            <Lock className="h-5 w-5 text-electric-400" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Admin Gate</h1>
          <p className="mt-1 text-xs text-white/50">Verify password credentials to access metrics.</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-pass" className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              Admin Password
            </label>
            <input
              id="admin-pass"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-electric-400/40 focus:bg-white/[0.05] focus:ring-1 focus-visible:ring-1 focus-visible:ring-electric-400/40"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2.5 rounded-xl border border-crimson-500/20 bg-crimson-500/5 p-3 text-xs text-crimson-400" role="alert">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-400">
              <Check className="h-4 w-4 shrink-0" />
              <span>Redirecting to Dashboard...</span>
            </div>
          )}

          <MagneticButton
            type="submit"
            disabled={loading || success}
            className="h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-electric-500 text-sm font-semibold text-white transition-all hover:bg-electric-400 hover:shadow-glow-blue active:scale-[0.97] disabled:opacity-50"
          >
            {loading ? 'Verifying...' : (
              <>
                Unlock Control Panel
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </MagneticButton>
        </form>
      </div>
    </main>
  );
}
