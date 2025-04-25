"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FormState {
  email: string;
  password: string;
  isSignUp: boolean;
  organization: string;
  full_name: string;
  phone: string;
}

export default function DataProviderAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    isSignUp: false,
    organization: "",
    full_name: "",
    phone: "",
  });
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    // Check if 'new' parameter is set to true
    const isNewUser = searchParams.get("new") === "true";
    if (isNewUser) {
      setForm((prev) => ({ ...prev, isSignUp: true }));
    }
  }, [searchParams]);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleMode = () => setForm({ ...form, isSignUp: !form.isSignUp });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuth = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    let result;
    if (form.isSignUp) {
      // First create the auth user - this stores email/password in auth table
      result = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (result.error) {
        alert(result.error.message);
        return;
      }

      if (result.data.user) {
        // Then create the profile in user_profiles table - without email/password
        const { error: profileError } = await supabase.from("user_profiles").insert([
          {
            id: result.data.user.id,
            organization: form.organization,
            full_name: form.full_name,
            phone: form.phone,
            role: "data_provider"
          },
        ]);

        if (profileError) {
          alert(profileError.message);
          return;
        }
      }
    } else {
      // Regular sign in with Supabase Auth
      result = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (result.error) {
        alert(result.error.message);
        return;
      }
    }

    router.push('/data-upload');
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative z-10 bg-gradient-to-b from-zinc-900 to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-transparent to-teal-500/30 animate-gradient-xy" />
      
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-2xl backdrop-blur-xl bg-zinc-900/80 border border-zinc-800 relative z-20">
        <div className="flex items-center">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400 mx-auto">
            {form.isSignUp ? "Create Data Provider Account" : "Sign in to your account"}
          </h1>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {form.isSignUp && (
            <>
              <div>
                <label className="block text-sm font-medium text-zinc-300">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  placeholder="Enter organization name"
                  value={form.organization}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 border border-zinc-700 rounded-xl bg-zinc-800/50 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300">
                  Your Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your role"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 border border-zinc-700 rounded-xl bg-zinc-800/50 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-1 border border-zinc-700 rounded-xl bg-zinc-800/50 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-zinc-700 rounded-xl bg-zinc-800/50 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={isVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border border-zinc-700 rounded-xl bg-zinc-800/50 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-white transition-colors"
              >
                {isVisible ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {form.isSignUp && (
            <div className="flex items-center space-x-2">
              <input
                required
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="w-4 h-4 accent-teal-500"
              />
              <span className="text-sm text-zinc-400">
                I agree to the
                <a href="/terms" className="text-teal-400 hover:text-teal-300 hover:underline mx-1">
                  Terms
                </a>
                &amp;
                <a href="/privacy" className="text-teal-400 hover:text-teal-300 hover:underline ml-1">
                  Privacy Policy
                </a>
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 font-semibold text-white bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-teal-500/20 transition-all duration-300"
          >
            {form.isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>
        
        <p className="text-center text-sm text-zinc-400">
          {form.isSignUp ? "Already have an account?" : "Need to create an account?"}
          <button
            onClick={toggleMode}
            className="text-teal-400 hover:text-teal-300 hover:underline ml-1 transition-colors"
          >
            {form.isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
