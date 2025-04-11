"use client"
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, BarChart3, Building2, Database, LineChart, Lock, Server, ShieldCheck, UserPlus, Users } from 'lucide-react';

export default function Contribute() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const hospitalBenefits = [
    {
      icon: <LineChart className="h-6 w-6 text-medhive-500" />,
      title: "Customized Models",
      description: "Train models that are fine-tuned to your specific patient demographics and disease patterns."
    },
    {
      icon: <Lock className="h-6 w-6 text-medhive-500" />,
      title: "Complete Data Privacy",
      description: "Your patient data never leaves your premises, ensuring full compliance with privacy regulations."
    },
    {
      icon: <Database className="h-6 w-6 text-medhive-500" />,
      title: "Infrastructure Included",
      description: "We provide all the hardware and software infrastructure needed for federated learning."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-medhive-500" />,
      title: "Regulatory Compliance",
      description: "Built-in HIPAA, GDPR, and other regulatory compliance for worry-free implementation."
    },
  ];

  const communityBenefits = [
    {
      icon: <Users className="h-6 w-6 text-medhive-500" />,
      title: "Diverse Model Training",
      description: "Access to models trained on diverse patient populations for better generalization."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-medhive-500" />,
      title: "Performance Insights",
      description: "Track model improvements over time as the federated network grows."
    },
    {
      icon: <Server className="h-6 w-6 text-medhive-500" />,
      title: "Robust Architecture",
      description: "A distributed system that ensures reliability and fault tolerance."
    },
    {
      icon: <UserPlus className="h-6 w-6 text-medhive-500" />,
      title: "Growing Network",
      description: "Join a community of researchers and clinicians dedicated to advancing medical AI."
    },
  ];

  const performanceStats = [
    {
      metric: "Hospitals",
      value: "25+",
      description: "Healthcare institutions contributing to our federated network."
    },
    {
      metric: "Model Accuracy",
      value: "+18%",
      description: "Average improvement in model accuracy compared to single-institution training."
    },
    {
      metric: "Patient Records",
      value: "1.2M+",
      description: "Anonymized patient records used for training across the network."
    },
    {
      metric: "Security Level",
      value: "End-to-End",
      description: "Enterprise-grade encryption and security protocols."
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
              Join The Network
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              Contribute to Medical AI Innovation
            </h1>
            <p className="text-lg text-gray-600 mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
              Become part of our federated learning network to help develop more accurate and diverse healthcare AI models while maintaining data privacy.
            </p>
          </div>
        </div>
      </section>
      
      {/* Tabs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="hospitals" className="animate-fade-up" style={{ animationDelay: '300ms' }}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="hospitals" className="text-sm sm:text-base">For Hospitals</TabsTrigger>
              <TabsTrigger value="community" className="text-sm sm:text-base">Community</TabsTrigger>
              <TabsTrigger value="admin" className="text-sm sm:text-base">Admin Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hospitals">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Join Our Hospital Network</h2>
                  <p className="text-gray-600 mb-8">
                    As a participating hospital, you can contribute to and benefit from our federated learning platform while keeping your patient data secure on your premises.
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    {hospitalBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1 mr-4">
                          {benefit.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-1">{benefit.title}</h3>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="bg-medhive-500 hover:bg-medhive-600">
                    Register as Hospital
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <BlurContainer 
                  className="p-0 overflow-hidden" 
                  intensity="low"
                  hoverable
                >
                  <img 
                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Hospital Network" 
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-medium text-lg mb-2">Secure Onboarding Process</h3>
                    <p className="text-gray-600">
                      Our team works directly with your IT department to set up the secure federated learning infrastructure without disrupting your existing workflows.
                    </p>
                    <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                      <Building2 className="h-5 w-5 text-medhive-500 mr-2" />
                      <span className="text-sm text-gray-500">25+ hospitals already in our network</span>
                    </div>
                  </div>
                </BlurContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="community">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <BlurContainer 
                  className="p-0 overflow-hidden order-2 md:order-1" 
                  intensity="low"
                  hoverable
                >
                  <img 
                    src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Medical Research Community" 
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-medium text-lg mb-2">Collaborative Improvement</h3>
                    <p className="text-gray-600">
                      Our community dashboard shows real-time model performance improvements as new data and research facilities join the network.
                    </p>
                    <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                      <Users className="h-5 w-5 text-medhive-500 mr-2" />
                      <span className="text-sm text-gray-500">Join 500+ researchers and clinicians</span>
                    </div>
                  </div>
                </BlurContainer>
                
                <div className="order-1 md:order-2">
                  <h2 className="text-3xl font-bold mb-6">Community Dashboard</h2>
                  <p className="text-gray-600 mb-8">
                    Our community portal gives researchers, clinicians and healthcare professionals visibility into model performance and network growth.
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    {communityBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1 mr-4">
                          {benefit.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-1">{benefit.title}</h3>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="bg-medhive-500 hover:bg-medhive-600">
                    View Community Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="admin">
              <div>
                <div className="max-w-3xl mx-auto text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6">Administrator Reports</h2>
                  <p className="text-gray-600">
                    Comprehensive analytics and reports for MedHive administrators to monitor system performance, security, and network growth.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {performanceStats.map((stat, index) => (
                    <BlurContainer 
                      key={index} 
                      className="p-6 text-center" 
                      hoverable
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <h3 className="text-medhive-600 font-bold text-3xl mb-2">{stat.value}</h3>
                      <p className="font-medium mb-1">{stat.metric}</p>
                      <p className="text-sm text-gray-600">{stat.description}</p>
                    </BlurContainer>
                  ))}
                </div>
                
                <BlurContainer 
                  className="p-8" 
                  intensity="medium"
                >
                  <h3 className="text-xl font-bold mb-6">Administrator Access Required</h3>
                  <p className="text-gray-600 mb-6">
                    This section requires administrator privileges to access detailed reports, execution logs, and system configuration settings.
                  </p>
                  <Button variant="outline" className="border-medhive-500 text-medhive-600 hover:bg-medhive-50">
                    Admin Login
                    <Lock className="ml-2 h-4 w-4" />
                  </Button>
                </BlurContainer>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 bg-medhive-100 text-medhive-700 rounded-full text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Federated Learning Process
            </h2>
            <p className="text-lg text-gray-600">
              Our federated learning system enables collaborative model training without sharing sensitive patient data.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-medhive-100 -translate-y-1/2 z-0 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="relative z-10 animate-fade-up" style={{ animationDelay: '100ms' }}>
                <div className="flex justify-center mb-6 md:mb-12">
                  <div className="h-16 w-16 rounded-full bg-medhive-100 flex items-center justify-center text-medhive-600 text-lg font-bold border-4 border-white">
                    1
                  </div>
                </div>
                <BlurContainer className="h-full p-6 text-center" hoverable>
                  <h3 className="text-xl font-bold mb-3">Local Training</h3>
                  <p className="text-gray-600">
                    Models are trained locally at each hospital using their own patient data, keeping sensitive information secure.
                  </p>
                </BlurContainer>
              </div>
              
              {/* Step 2 */}
              <div className="relative z-10 animate-fade-up" style={{ animationDelay: '200ms' }}>
                <div className="flex justify-center mb-6 md:mb-12">
                  <div className="h-16 w-16 rounded-full bg-medhive-100 flex items-center justify-center text-medhive-600 text-lg font-bold border-4 border-white">
                    2
                  </div>
                </div>
                <BlurContainer className="h-full p-6 text-center" hoverable>
                  <h3 className="text-xl font-bold mb-3">Secure Weight Sharing</h3>
                  <p className="text-gray-600">
                    Only encrypted model weights are shared with the central server, never the raw patient data.
                  </p>
                </BlurContainer>
              </div>
              
              {/* Step 3 */}
              <div className="relative z-10 animate-fade-up" style={{ animationDelay: '300ms' }}>
                <div className="flex justify-center mb-6 md:mb-12">
                  <div className="h-16 w-16 rounded-full bg-medhive-100 flex items-center justify-center text-medhive-600 text-lg font-bold border-4 border-white">
                    3
                  </div>
                </div>
                <BlurContainer className="h-full p-6 text-center" hoverable>
                  <h3 className="text-xl font-bold mb-3">Global Aggregation</h3>
                  <p className="text-gray-600">
                    The central server aggregates model improvements from all participants to create a better global model.
                  </p>
                </BlurContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <BlurContainer 
            className="max-w-5xl mx-auto p-12 text-center" 
            variant="dark"
            intensity="medium"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Join the Medical AI Revolution?</h2>
            <p className="text-xl opacity-80 mb-8 max-w-2xl mx-auto">
              Whether you're a hospital, research institution, or healthcare provider, MedHive provides the infrastructure to collaborate securely.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-medhive-800 hover:bg-gray-100"
              >
                Register as Hospital
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                Learn About Contribution
              </Button>
            </div>
          </BlurContainer>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
