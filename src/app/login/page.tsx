"use client"
import { useState, useContext, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface FormState {
  email: string;
  password: string;
  isSignUp: boolean;
}

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState<FormState>({ email: '', password: '', isSignUp: false });
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    // Check if 'new' parameter is set to true
    const isNewUser = searchParams.get('new') === 'true';
    if (isNewUser) {
      setForm(prev => ({ ...prev, isSignUp: true }));
    }
  }, [searchParams]);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleMode = () => setForm({ ...form, isSignUp: !form.isSignUp });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    let result;
    if (form.isSignUp) {
      result=await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
    }
    else {
      result = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
    }
    if (result.error) {
      alert(result.error.message);
    } else {
        router.push('/SetUp');
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: `${window.location.protocol}//${window.location.host}/api/auth/confirm`
      },
    });
    if (error) alert(error.message);
  };

  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-2xl dark:bg-zinc-800">
          <div className="flex items-center">
            <Link href="/" className="mr-auto text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mx-auto">
              {form.isSignUp ? 'Create an Account' : 'Sign in to your account'}
            </h1>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Email Address <span className="text-red-500">*</span></label>
              <input 
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className={form.isSignUp? "w-full px-4 py-1 mt-1 border rounded-2xl dark:bg-zinc-700 dark:text-white focus:ring focus:ring-teal-500":"w-full px-4 py-2 mt-1 border rounded-2xl dark:bg-zinc-700 dark:text-white focus:ring focus:ring-teal-500"}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={isVisible ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className={form.isSignUp? "w-full px-4 py-1 mt-1 border rounded-2xl dark:bg-zinc-700 dark:text-white focus:ring focus:ring-teal-500":"w-full px-4 py-2 mt-1 border rounded-2xl dark:bg-zinc-700 dark:text-white focus:ring focus:ring-teal-500"}
                />
                <button type="button" onClick={toggleVisibility} className="absolute inset-y-0 right-3 flex items-center">
                  {isVisible ? <EyeOff className="text-zinc-500 dark:text-zinc-300 h-5 w-5" /> : <Eye className="text-zinc-500 dark:text-zinc-300 h-5 w-5" />}
                </button>
              </div>
            </div>
            {form.isSignUp? <div className="flex items-center space-x-2">
              <input
                required
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="w-4 h-4"
              />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                I agree to the
                <a href="/terms" className="text-teal-500 hover:underline"> Terms</a> &amp;
                <a href="/privacy" className="text-teal-500 hover:underline"> Privacy Policy</a>
              </span>
            </div>:''}
            <button type="submit" className="w-full px-4 py-2 text-white bg-pink-500 dark:bg-pink-600 rounded-full hover:bg-pink-600 dark:hover:bg-pink-700">
              {form.isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          <div className="flex items-center justify-between">
            <hr className="w-full border-zinc-300 dark:border-zinc-600" />
            <span className="px-2 text-sm text-zinc-500 dark:text-zinc-400">OR</span>
            <hr className="w-full border-zinc-300 dark:border-zinc-600" />
          </div>
          <button onClick={handleGoogleLogin} className="flex items-center justify-center w-full px-4 py-2 border rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700">
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </button>
          <p className="text-center text-sm text-zinc-400">
            {form.isSignUp ? 'Already have an account?' : 'Need to create an account?'}
            <button onClick={toggleMode} className="text-teal-400 hover:underline ml-1">
              {form.isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
  );
}