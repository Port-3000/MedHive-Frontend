"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Brain, Heart, Image, Microscope, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ModelHub() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = [
    { id: "all", name: "All Models" },
    { id: "diagnostic", name: "Diagnostic" },
    { id: "imaging", name: "Medical Imaging" },
    { id: "nlp", name: "NLP & Analysis" },
    { id: "predictive", name: "Predictive" },
  ];

  const models = [
    {
      id: "symptom-analysis",
      title: "LLM Symptom Analysis",
      description: "An advanced language model that analyzes patient-reported symptoms using a Retrieval Augmented Generation (RAG) approach to provide preliminary diagnostics and recommendations.",
      image: "https://images.unsplash.com/photo-1576671413497-287a5b9e7901?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "nlp",
      icon: <Brain className="h-6 w-6" />,
      accuracy: "89%",
      contributors: 32,
      lastUpdated: "2 days ago",
    },
    {
      id: "ecg-analysis",
      title: "ECG Curve Analysis",
      description: "Detects abnormalities in heart rhythm from ECG readouts, identifying patterns associated with arrhythmias, myocardial infarction, and other cardiac conditions.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "diagnostic",
      icon: <Heart className="h-6 w-6" />,
      accuracy: "94%",
      contributors: 28,
      lastUpdated: "1 week ago",
    },
    {
      id: "pneumonia-xray",
      title: "Pneumonia X-Ray Detection",
      description: "Analyzes chest X-ray images to detect pneumonia with high sensitivity and specificity, differentiating between bacterial and viral causes.",
      image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "imaging",
      icon: <Image className="h-6 w-6" />,
      accuracy: "92%",
      contributors: 45,
      lastUpdated: "3 days ago",
    },
    {
      id: "breast-cancer",
      title: "Breast Cancer Detection",
      description: "Analyzes mammography images to detect early signs of breast cancer, identifying suspicious masses and calcifications.",
      image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "imaging",
      icon: <Microscope className="h-6 w-6" />,
      accuracy: "91%",
      contributors: 37,
      lastUpdated: "5 days ago",
    },
    {
      id: "glaucoma-fundus",
      title: "Glaucoma FUNDUS Analysis",
      description: "Detects signs of glaucoma from retinal fundus images by analyzing optic disc changes and identifying neural damage patterns.",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "imaging",
      icon: <Image className="h-6 w-6" />,
      accuracy: "88%",
      contributors: 23,
      lastUpdated: "1 week ago",
    },
    {
      id: "health-predictor",
      title: "Health Outcome Predictor",
      description: "Predicts potential health outcomes based on patient history, demographic data, and lifestyle factors using advanced machine learning algorithms.",
      image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "predictive",
      icon: <Brain className="h-6 w-6" />,
      accuracy: "85%",
      contributors: 19,
      lastUpdated: "2 weeks ago",
    },
  ];

  // Filter models based on search query and active category
  const filteredModels = models.filter((model) => {
    const matchesSearch = model.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || model.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main className={`min-h-screen ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-medhive-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-medhive-100 text-medhive-700 rounded-full text-sm font-medium mb-4 animate-fade-up">
              MedHive Model Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              Discover Our Healthcare AI Models
            </h1>
            <p className="text-lg text-gray-600 mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
              Explore our collection of federated learning models trained across hospital networks while preserving patient privacy.
            </p>
            
            <div className="relative max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '300ms' }}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search for models..." 
                className="pl-10 py-6 border-gray-200 rounded-full shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Category Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center animate-fade-up" style={{ animationDelay: '400ms' }}>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={activeCategory === category.id 
                  ? "bg-medhive-500 hover:bg-medhive-600" 
                  : "border-gray-200 text-gray-700 hover:border-medhive-300 hover:text-medhive-600"}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Models Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredModels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredModels.map((model, index) => (
                <Link 
                  href={`/model-hub/${model.id}`} 
                  key={model.id}
                  className="group animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BlurContainer className="h-full overflow-hidden" hoverable>
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={model.image} 
                        alt={model.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <span className="flex items-center justify-center h-10 w-10 rounded-full bg-medhive-100 text-medhive-600 mr-3">
                            {model.icon}
                          </span>
                          <h3 className="text-xl font-semibold group-hover:text-medhive-600 transition-colors">
                            {model.title}
                          </h3>
                        </div>
                        <span className="text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                          {model.accuracy}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {model.description}
                      </p>
                      
                      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                        <span>{model.contributors} Contributors</span>
                        <span>Updated {model.lastUpdated}</span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                          {categories.find(c => c.id === model.category)?.name}
                        </span>
                        <span className="inline-flex items-center text-sm font-medium text-medhive-600">
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </BlurContainer>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-medium mb-2">No models found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Contribute to MedHive" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8 md:p-10 lg:p-12">
                <h3 className="text-2xl font-bold mb-4">Want to contribute your own models?</h3>
                <p className="text-gray-600 mb-6">
                  Join our hospital network and contribute to the advancement of medical AI while maintaining full control over your data privacy.
                </p>
                <Button className="bg-medhive-500 hover:bg-medhive-600">
                  Learn About Contributing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
