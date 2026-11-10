import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, token } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (token) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen font-['DM_Sans',sans-serif] antialiased">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Fraunces:opsz,wght@9..144,300;9..144,400&display=swap');`}</style>

      <div className="hidden w-1/2 lg:block">
        <div className="relative flex h-full flex-col justify-between bg-[#2a1b13] p-12">
          <Link to="/" className="flex items-center gap-2 text-[#e9dccb]">
            <Coffee className="h-5 w-5" strokeWidth={1.5} />
            <span className="font-['Fraunces',serif] text-xl tracking-tight">Maison Mocha</span>
          </Link>

          <div className="mx-auto max-w-md">
            <div className="mb-8 flex h-64 w-64 items-center justify-center rounded-full bg-[#3b2a20] mx-auto">
              <span className="text-[120px] leading-none">☕</span>
            </div>
            <h2 className="font-['Fraunces',serif] text-3xl font-light text-[#e9dccb] text-center">
              Welcome back to your favourite corner.
            </h2>
            <p className="mt-4 text-center text-[#b9a690]">
              Sign in to manage your orders, track rewards, and discover new blends crafted just for you.
            </p>
          </div>

          <p className="text-xs text-[#8f7a66]">© 2026 Maison Mocha</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-[#faf6ef] px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-2 lg:hidden">
            <Link to="/" className="flex items-center gap-2 text-[#3b2a20]">
              <Coffee className="h-5 w-5" strokeWidth={1.5} />
              <span className="font-['Fraunces',serif] text-xl tracking-tight">Maison Mocha</span>
            </Link>
          </div>

          <div className="mt-8 lg:mt-0">
            <h1 className="font-['Fraunces',serif] text-4xl font-light tracking-tight text-[#2a1b13]">
              Sign in
            </h1>
            <p className="mt-3 text-[#6b5444]">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-[#8a5a3c] underline decoration-[#c9a27e] underline-offset-4 transition-colors hover:text-[#3b2a20]">
                Create one
              </Link>
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#3b2a20]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#e6d8c6] bg-white px-4 py-3.5 text-[#2a1b13] placeholder-[#b9a690] outline-none transition-all duration-300 focus:border-[#c9a27e] focus:ring-2 focus:ring-[#c9a27e]/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#3b2a20]">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#e6d8c6] bg-white px-4 py-3.5 text-[#2a1b13] placeholder-[#b9a690] outline-none transition-all duration-300 focus:border-[#c9a27e] focus:ring-2 focus:ring-[#c9a27e]/20"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#3b2a20] px-8 py-4 text-sm font-medium text-[#f7f1e8] transition-all duration-300 hover:bg-[#2a1b13] hover:shadow-lg hover:shadow-[#3b2a20]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#f7f1e8]/30 border-t-[#f7f1e8]" />
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#e6d8c6]" />
            <span className="text-xs text-[#b9a690]">or</span>
            <div className="h-px flex-1 bg-[#e6d8c6]" />
          </div>

          <Link
            to="/"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#e6d8c6] bg-white px-8 py-4 text-sm font-medium text-[#3b2a20] transition-all duration-300 hover:border-[#c9a27e] hover:shadow-sm"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

