// src/app/page.tsx

"use client";
import { useState, useEffect } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { BlurContainer } from "@/components/ui/BlurContainer";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowRight,
  Brain,
  Database,
  Lock,
  Server,
  Shield,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

import {
  RiShieldCheckLine,
  RiLock2Line,
  RiGroupLine,
  RiBarChart2Line,
} from "@remixicon/react";

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      title: "Privacy-Preserving ML",
      description:
        "Our federated learning approach keeps patient data secure within hospital premises while enabling collaborative model training.",
      icon: <Shield className="h-8 w-8 text-medhive-400" />,
      delay: 100,
    },
    {
      title: "Advanced Encryption",
      description:
        "Hospital contributions are encrypted with state-of-the-art methods, ensuring complete privacy of sensitive medical data.",
      icon: <Lock className="h-8 w-8 text-medhive-400" />,
      delay: 200,
    },
    {
      title: "AI Disease Analysis",
      description:
        "Access cutting-edge ML models for symptom analysis, medical imaging diagnostics, and predictive healthcare insights.",
      icon: <Brain className="h-8 w-8 text-medhive-400" />,
      delay: 300,
    },
    {
      title: "Hospital Network",
      description:
        "Join our growing community of healthcare institutions collaborating to improve medical AI for everyone.",
      icon: <UserPlus className="h-8 w-8 text-medhive-400" />,
      delay: 400,
    },
    {
      title: "Distributed Infrastructure",
      description:
        "Our system architecture ensures resilience, reliability, and performance at scale for mission-critical healthcare applications.",
      icon: <Server className="h-8 w-8 text-medhive-400" />,
      delay: 500,
    },
    {
      title: "Comprehensive Analytics",
      description:
        "Gain insights into model performance, data contributions, and the impact of your participation in federated learning.",
      icon: <Database className="h-8 w-8 text-medhive-400" />,
      delay: 600,
    },
  ];

  const modelShowcase = [
    {
      title: "Symptom Analysis",
      description:
        "LLM-powered medical symptom analysis with RAG for accurate preliminary diagnostics.",
      image:
        "https://images.unsplash.com/photo-1631815588090-d1bcbe9a8c33?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      path: "/model-hub/symptom-analysis",
    },
    {
      title: "ECG Analysis",
      description:
        "Heart rhythm abnormality detection from ECG curves with advanced neural networks.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      path: "/model-hub/ecg-analysis",
    },
    {
      title: "Pneumonia Detection",
      description:
        "X-ray image analysis for pneumonia diagnosis with high sensitivity and specificity.",
      image:
        "https://images.unsplash.com/photo-1576089073624-b5f8bada6bf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      path: "/model-hub/pneumonia-detection",
    },
  ];

  return (
    <main
      className={`min-h-screen ${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500 bg-black`}
    >
      <div className="fixed inset-0 z-0">
        <HeroGeometric />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="md:pt-16 md:pb-28 lg:pt-20 lg:pb-28 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 xl:gap-20 text-white">
              <div
                className="lg:w-7/12 animate-fade-up"
                style={{ animationDelay: "100ms" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  <StatusBadge
                    leftIcon={RiShieldCheckLine}
                    rightIcon={RiLock2Line}
                    leftLabel="Privacy"
                    rightLabel="On‑Premise"
                    status="success"
                  />

                  <StatusBadge
                    leftIcon={RiLock2Line}
                    rightIcon={RiGroupLine}
                    leftLabel="Secure"
                    rightLabel="Federated AI"
                    status="success"
                  />

                  <StatusBadge
                    leftIcon={RiShieldCheckLine}
                    rightIcon={RiLock2Line}
                    leftLabel="End‑to‑End"
                    rightLabel="Encryption"
                    status="success"
                  />
                </div>

                <h1 className="font-['Kagitingan'] text-4xl md:text-5xl lg:text-8xl font-bold tracking-tight mb-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight max-w-3xl">
                  Building Medical AI That’s
                  <br />
                  <span className="text-white inline-block w-[240px] sm:w-[270px] mt-1">
                    <Typewriter
                      words={["Private", "Secure", "Collaborative", "Ethical"]}
                      loop
                      cursor
                      cursorStyle="|"
                      typeSpeed={80}
                      deleteSpeed={50}
                      delaySpeed={2000}
                    />
                  </span>
                </h1>

                <p className="text-base md:text-lg text-gray-200 mb-10 max-w-2xl pt-3 font-['Poppins']">
                  MedHive enables hospitals to collaboratively train machine
                  learning models without sharing sensitive patient data. Join
                  the revolution in privacy-preserving federated learning for
                  healthcare.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10 pt-2">
                  <Link href="/login?new=true">
                    <InteractiveHoverButton />
                  </Link>
                  <Button
                    variant="outline"
                    className="h-12 font-['Lilita_One'] text-lg border-gray-600 text-white bg-gradient-to-r from-medhive-500/20 to-medhive-500/10 backdrop-blur-lg hover:from-medhive-500/30 hover:to-medhive-500/20 transition-all duration-300"
                  >
                    Watch Demo
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-5 text-sm text-gray-300">
                  <span className="flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-medhive-400" />
                    HIPAA Certified
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center">
                    <Lock className="h-4 w-4 mr-1 text-medhive-400" />
                    Fully Encrypted
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center">
                    <Database className="h-4 w-4 mr-1 text-medhive-400" />
                    25+ Hospital Networks
                  </span>
                </div>
              </div>

              <div
                className="lg:w-5/12 animate-fade-in"
                style={{ animationDelay: "300ms" }}
              >
                <div className="relative max-w-lg mx-auto overflow-hidden rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-[1.02]">
                  <div className="w-full h-auto">
                    <Image
                      src="/Hero.png"
                      alt="Medical AI Visualization"
                      width={800}
                      height={600}
                      className="object-cover w-full h-full"
                      priority
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      MedHive Federated Learning
                    </h3>
                    <p className="text-sm text-gray-200">
                      Collaborative model training without exposing raw patient
                      data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen flex flex-col justify-center items-center px-4 py-12 sm:py-16">
          <div className="max-w-4xl w-full text-center mb-8 sm:mb-12">
            <span className="inline-block px-4 py-2 bg-medhive-400/10 text-medhive-400 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              Why Choose MedHive
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-medhive-200 to-medhive-400 bg-clip-text text-transparent">
              Built for Trust.
              <br className="hidden md:block" /> Powered by Collaboration.
            </h2>
            <p className="text-lg text-medhive-300 mx-auto max-w-2xl">
              MedHive unites healthcare networks using secure, decentralized AI
              to train models—without compromising data privacy.
            </p>
          </div>

          <div className="flex-grow flex items-center justify-center w-full max-w-7xl">
            <AnimatedTabs className="px-4" />
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <span className="inline-block px-3 py-1 bg-medhive-100 text-medhive-700 rounded-full text-sm font-medium mb-4">
                  Our Models
                </span>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  Cutting-Edge Healthcare AI
                </h2>
              </div>
              <Link
                href="/model-hub"
                className="inline-flex items-center text-white font-medium mt-4 md:mt-0 hover:text-gray-200 transition-colors"
              >
                Explore All Models
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modelShowcase.map((model, index) => (
                <Link
                  href={model.path}
                  key={index}
                  className="group animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BlurContainer
                    className="h-full overflow-hidden bg-black/50"
                    intensity="low"
                    hoverable
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={model.image}
                        alt={model.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors text-white">
                        {model.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{model.description}</p>
                      <span className="inline-flex items-center text-sm font-medium text-medhive-400">
                        Learn more
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </BlurContainer>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-medhive-900 to-medhive-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-up">
                Join the Future of Medical AI Research
              </h2>
              <p
                className="text-xl opacity-80 mb-8 animate-fade-up"
                style={{ animationDelay: "100ms" }}
              >
                Whether you're a hospital, research institution, or healthcare
                provider, MedHive provides the infrastructure to collaborate
                securely and advance medical AI.
              </p>
              <div
                className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                <Link href="/login?new=true">
                  <Button
                    size="lg"
                    className="bg-white text-medhive-800 hover:bg-gray-100"
                  >
                    Register as Hospital
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white/10"
                >
                  Learn About Contribution
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
