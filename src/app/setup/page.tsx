"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { UserRole } from '@/utils/db_types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { BlurContainer } from '@/components/ui/BlurContainer';

export default function SetupPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    organization: '',
    role: '' as UserRole
  });

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Update user profile
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          full_name: formData.full_name,
          phone: formData.phone,
          organization: formData.organization,
          role: formData.role as UserRole,
        });
      
      if (error) throw error;
      
      setFormSubmitted(true);
      // Redirect after short delay to show success message
      setTimeout(() => router.push('/'), 1500);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to save profile information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <BlurContainer className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Complete Your Profile
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 mt-2">
            Please provide some additional information to get started
          </p>
        </div>

        {formSubmitted ? (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-3 text-lg font-medium text-gray-900">Setup Complete!</h2>
            <p className="mt-2 text-gray-500">Redirecting you to the dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-teal-500 dark:bg-zinc-700 dark:text-white"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-teal-500 dark:bg-zinc-700 dark:text-white"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-teal-500 dark:bg-zinc-700 dark:text-white"
                placeholder="Enter your organization name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-teal-500 dark:bg-zinc-700 dark:text-white"
              >
                <option value="" disabled>Select your role</option>
                <option value="admin">Administrator</option>
                <option value="data_provider">Data Provider</option>
                <option value="contributor">Contributor</option>
                <option value="user">User</option>
              </select>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-medhive-600 hover:bg-medhive-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : "Complete Setup"}
              </Button>
            </div>
          </form>
        )}

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center justify-center mx-auto text-medhive-600 hover:text-medhive-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
          </button>
        </div>
      </BlurContainer>
    </div>
  );
}
