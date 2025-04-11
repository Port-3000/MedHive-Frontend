"use client"
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react';

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief AI Officer",
      bio: "Expert in machine learning for healthcare with 10+ years of experience in developing medical diagnostic systems.",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Engineering",
      bio: "Pioneered secure distributed systems for healthcare with a focus on privacy-preserving technologies.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Dr. Aisha Patel",
      role: "Medical Director",
      bio: "Board-certified radiologist with expertise in AI applications for medical imaging and diagnostics.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "David Kim",
      role: "Security Officer",
      bio: "Former cybersecurity expert for major healthcare systems, specializing in HIPAA compliance and data protection.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
  ];

  const mission = [
    {
      title: "Privacy-First Approach",
      description: "We believe that medical innovation shouldn't compromise patient privacy. Our federated learning platform keeps sensitive data where it belongs—within hospital walls."
    },
    {
      title: "Collaborative Innovation",
      description: "By enabling hospitals to work together without sharing raw data, we're creating medical AI that's more accurate, more diverse, and more beneficial for all patients."
    },
    {
      title: "Democratizing Medical AI",
      description: "We're building a future where every healthcare provider, regardless of size, can benefit from state-of-the-art AI diagnostics and predictions."
    },
  ];

  return (
    <main className={`min-h-screen ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-medhive-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-medhive-100 text-medhive-700 rounded-full text-sm font-medium mb-4 animate-fade-up">
              About MedHive
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              Our Mission and Vision
            </h1>
            <p className="text-lg text-gray-600 mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
              We're revolutionizing how healthcare institutions collaborate on AI development while preserving patient privacy.
            </p>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                MedHive began with a simple observation: hospitals had valuable patient data that could revolutionize medical AI, but privacy concerns prevented collaboration. Our founders, a team of AI researchers and medical professionals, saw an opportunity to bridge this gap.
              </p>
              <p className="text-gray-600 mb-4">
                In 2020, we developed our first federated learning prototype, allowing two hospitals to collaborate on a pneumonia detection model without sharing patient X-rays. The results were groundbreaking—a model that performed better than either hospital could develop alone.
              </p>
              <p className="text-gray-600 mb-6">
                Today, MedHive connects over 25 healthcare institutions worldwide, enabling secure collaboration on AI models that are transforming diagnostics, treatment planning, and patient care—all while keeping patient data secure and private.
              </p>
              <div className="flex items-center space-x-4">
                <ShieldCheck className="h-10 w-10 text-medhive-500" />
                <div>
                  <h3 className="font-medium">HIPAA Compliant & ISO 27001 Certified</h3>
                  <p className="text-sm text-gray-500">Enterprise-grade security for healthcare data</p>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
              <BlurContainer 
                className="relative aspect-square max-w-[500px] mx-auto p-2 overflow-hidden"
                intensity="low"
                hoverable
              >
                <div className="absolute inset-0 bg-noise opacity-10" />
                <img 
                  src="https://images.unsplash.com/photo-1581091878591-4f0714c6f36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Medical AI Team" 
                  className="w-full h-full object-cover rounded-xl"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <BlurContainer className="p-4" intensity="high">
                    <h3 className="text-lg font-semibold mb-2">Founded by AI & Medical Experts</h3>
                    <p className="text-sm text-gray-700">
                      Bridging the gap between cutting-edge technology and healthcare
                    </p>
                  </BlurContainer>
                </div>
              </BlurContainer>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
            <span className="inline-block px-3 py-1 bg-medhive-100 text-medhive-700 rounded-full text-sm font-medium mb-4">
              Our Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Drives Our Innovation
            </h2>
            <p className="text-lg text-gray-600">
              At MedHive, we're guided by a set of core principles that shape everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mission.map((item, index) => (
              <BlurContainer 
                key={index} 
                className="p-8 h-full animate-fade-up" 
                style={{ animationDelay: `${index * 100 + 600}ms` }}
                hoverable
              >
                <div className="h-16 w-16 rounded-full bg-medhive-100 flex items-center justify-center text-medhive-600 text-xl font-bold mb-6">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </BlurContainer>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
            <span className="inline-block px-3 py-1 bg-medhive-100 text-medhive-700 rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet the Experts Behind MedHive
            </h2>
            <p className="text-lg text-gray-600">
              We've assembled a team of leaders in AI, medicine, and data security to build the future of healthcare collaboration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <BlurContainer 
                key={index} 
                className="p-0 overflow-hidden animate-fade-up" 
                style={{ animationDelay: `${index * 100 + 700}ms` }}
                hoverable
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-medhive-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </BlurContainer>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <BlurContainer 
              className="p-0 overflow-hidden animate-fade-up" 
              style={{ animationDelay: `800ms` }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-gray-600 mb-8">
                    Have questions about MedHive or want to learn more about joining our federated learning network? Our team is here to help.
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="font-medium mb-2">Email Us</h3>
                      <a href="mailto:info@medhive.ai" className="text-medhive-600 flex items-center hover:underline">
                        <Mail className="h-4 w-4 mr-2" />
                        info@medhive.ai
                      </a>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Visit Our Office</h3>
                      <p className="text-gray-600">
                        123 Innovation Drive<br />
                        Suite 400<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                  
                  <Button className="bg-medhive-500 hover:bg-medhive-600">
                    Schedule a Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="MedHive Office" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </BlurContainer>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
