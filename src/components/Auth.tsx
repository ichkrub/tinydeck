import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function Auth() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Check if we're already logged in and handle auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        router.replace('/dashboard');
      }
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        router.replace('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage('Signing in...');
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      setMessage('Login successful!');
      // The onAuthStateChange handler will handle redirect
      
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.message === 'Invalid login credentials'
        ? 'Invalid email or password'
        : error.message || 'Error signing in. Please try again.';
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    try {
      setLoading(true);
      setMessage('Connecting to ' + provider + '...');
      
      const { error, data } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            // For Google, request offline access and force consent screen
            ...(provider === 'google' && {
              access_type: 'offline',
              prompt: 'consent',
            }),
          },
        }
      });

      if (error) throw error;
      
      // On successful OAuth initiation, the provider's popup/redirect will handle the rest
      setMessage('Redirecting to ' + provider + '...');
      
    } catch (error: any) {
      console.error('OAuth error:', error);
      let errorMessage: string;
      
      if (error.message?.includes('popup_closed_by_user')) {
        errorMessage = 'Sign in cancelled. Please try again.';
      } else if (error.message?.includes('popup_blocked')) {
        errorMessage = 'Pop-up blocked. Please enable pop-ups for this site.';
      } else {
        errorMessage = error.message || 'Error signing in. Please try again.';
      }
      
      setMessage(errorMessage);
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage('Please enter your email address first.');
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) throw error;
      
      setMessage('Check your email for the password reset link!');
    } catch (error) {
      setMessage('Error sending reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#141921]/80 backdrop-blur-sm rounded-2xl border border-gray-800 p-12 text-center max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-6">Sign In to TinyDeck</h2>
      
      {/* OAuth Buttons */}
      <div className="space-y-4 mb-8">
        <button
          onClick={() => handleOAuthLogin('github')}
          disabled={loading}
          className="flex items-center justify-center w-full px-4 py-3 bg-[#1E2430] border border-gray-700 rounded-lg text-white hover:bg-[#262f3d] transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Continue with GitHub
        </button>
        <button
          onClick={() => handleOAuthLogin('google')}
          disabled={loading}
          className="flex items-center justify-center w-full px-4 py-3 bg-[#1E2430] border border-gray-700 rounded-lg text-white hover:bg-[#262f3d] transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
            <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
            <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
            <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
          </svg>
          Continue with Google
        </button>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-400 bg-[#141921]">or</span>
        </div>
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-[#1E2430] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-[#1E2430] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign in with email'}
        </button>
      </form>

      {message && (
        <div className="mt-4 text-sm font-medium text-center">
          <p className={message.includes('Error') ? 'text-red-400' : 'text-green-400'}>
            {message}
          </p>
        </div>
      )}

      <p className="mt-6 text-sm text-gray-400">
        Not registered yet?{' '}
        <Link href="/signup" className="text-indigo-400 hover:text-indigo-300">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
