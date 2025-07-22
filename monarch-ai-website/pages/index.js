import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { ChevronRight, ArrowRight, Zap, Bot, Target, Sparkles, CheckCircle, Play, Users, Clock, Star, ArrowDown, Menu, X, Phone, Mail, MapPin } from 'lucide-react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const formRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isFormFocused) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFormFocused]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isFormFocused) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            }
          });
        }
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isFormFocused]);

  // Simple form focus/blur handlers - REMOVED COMPLEX LOGIC
  useEffect(() => {
    // Disable all animations when interacting with forms
    const handleFocusIn = () => {
      setIsFormFocused(true);
      document.body.classList.add('form-focused');
      document.body.style.overflow = 'hidden'; // Prevent scroll during form interaction
    };
    
    const handleFocusOut = () => {
      setTimeout(() => {
        setIsFormFocused(false);
        document.body.classList.remove('form-focused');
        document.body.style.overflow = 'auto'; // Re-enable scroll
      }, 100);
    };

    if (formRef.current) {
      formRef.current.addEventListener('focusin', handleFocusIn);
      formRef.current.addEventListener('focusout', handleFocusOut);
    }

    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener('focusin', handleFocusIn);
        formRef.current.removeEventListener('focusout', handleFocusOut);
      }
      document.body.classList.remove('form-focused');
      document.body.style.overflow = 'auto'; // Cleanup
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormState({ isSubmitting: true, isSubmitted: false, error: null });

    try {
      // TODO: Change to the actual webhook URL
      const webhookUrl = 'https://mosesnjau.app.n8n.cloud/webhook-test/0080f04d-40e2-42e4-8656-02ca76add398';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'monarch-ai-website'
        }),
      });

      if (response.ok) {
        setFormState({ isSubmitting: false, isSubmitted: true, error: null });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setFormState({ 
        isSubmitting: false, 
        isSubmitted: false, 
        error: 'Something went wrong. Please try again or contact us directly.' 
      });
    }
  };

  const resetForm = () => {
    setFormState({ isSubmitting: false, isSubmitted: false, error: null });
  };

  const FloatingOrb = ({ size = 'w-64 h-64', position, delay = 0 }) => (
    <div 
      className={`${size} ${position} absolute rounded-full opacity-10`}
      style={{
        background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
        transform: isFormFocused ? 'translate(0px, 0px)' : `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        transition: isFormFocused ? 'none' : 'transform 0.8s ease-out'
      }}
    />
  );

  const AnimatedSection = ({ children, id, className = "" }) => (
    <div
      id={id}
      data-animate
      className={`transform transition-all duration-1000 ${
        isVisible[id] && !isFormFocused ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-100'
      } ${className}`}
    >
      {children}
    </div>
  );

  const processes = [
    {
      title: "Deep Analysis",
      description: "We map every workflow, identify bottlenecks, and understand your current processes to design the perfect automation blueprint.",
      duration: "Days 1-2",
      icon: "🔍"
    },
    {
      title: "Blueprint Design",
      description: "Custom automation architecture tailored to your specific business needs, creating a transparent process with fixed pricing.",
      duration: "Days 3-4", 
      icon: "📋"
    },
    {
      title: "System Development",
      description: "Building and integrating your intelligent automation systems with existing tools, ensuring seamless operation.",
      duration: "Days 5-8",
      icon: "⚙️"
    },
    {
      title: "Delivery & Support",
      description: "Functional system delivered in 10 business days with full training and ongoing support for your success.",
      duration: "Days 9-10",
      icon: "🚀"
    }
  ];

  const features = [
    {
      title: "Streamline Your Processes with Automation",
      description: "Automate repetitive tasks to save time and reduce errors. Transform your business by automating repetitive tasks, freeing up valuable time for your team.",
      benefits: ["40+ hours saved weekly", "99.9% accuracy rate", "24/7 operation"]
    },
    {
      title: "Intelligent App Integration", 
      description: "Connecting your CRM, project manager, and other apps into a single, seamless system that eliminates data silos.",
      benefits: ["Connect 100+ apps", "Real-time data sync", "Zero downtime migration"]
    },
    {
      title: "Bespoke Automation Solutions",
      description: "Our custom automation systems are designed specifically for your unique business needs. Experience seamless integration and enhanced efficiency.",
      benefits: ["Tailored approach", "Proven results", "Expert solutions"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah van der Berg",
      role: "Operations Director", 
      company: "FlowTech Solutions",
      content: "Monarch AI transformed our entire workflow. We're saving 35 hours per week and our team can finally focus on strategic work instead of administrative tasks. The 10-day delivery was exactly as promised.",
      rating: 5
    },
    {
      name: "Marcus Chen",
      role: "CEO",
      company: "AutoScale BV", 
      content: "The automation systems they built are incredible. Everything just works seamlessly, and our productivity has increased by 300%. Best investment we've made for our business growth.",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Founder",
      company: "StreamlineOps",
      content: "Professional, efficient, and results-driven. Moses delivered exactly what was promised – a functional system that revolutionized our operations. No consultation fees was a great touch.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How quickly can you implement automation for my business?",
      answer: "Our promise is simple: a transparent process, a fixed price, and a functional system delivered in 10 business days. This includes analysis, design, development, testing, and deployment with full training."
    },
    {
      question: "Will the automation work with my existing software?", 
      answer: "Yes, our systems are designed to integrate seamlessly with your current tools. We specialize in connecting your CRM, project manager, and other apps into a single, seamless system."
    },
    {
      question: "Do you really offer free consultations?",
      answer: "Absolutely! We offer complimentary consultations with no fees. Learn how we can help optimize your workflows at no cost, available both remote and onsite."
    },
    {
      question: "What kind of support do you provide after implementation?",
      answer: "Our commitment to your success doesn't end at launch. We provide ongoing support and can easily modify or expand your automation systems as your business evolves."
    },
    {
      question: "How much technical knowledge do I need?",
      answer: "None. Our automation systems are designed to run independently. We provide full training and our systems are built to be user-friendly while handling complex processes behind the scenes."
    }
  ];

  return (
    <>
      <Head>
        <title>Monarch AI - Intelligent Systems for Growth</title>
        <meta name="description" content="Transform your business with tailored AI and process automation solutions. Replacing operational drag with streamlined workflows that give you back your time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="AI automation, business automation, workflow optimization, process automation, Belgium, Brussels" />
        <meta name="author" content="Moses Njau" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Monarch AI - Intelligent Systems for Growth" />
        <meta property="og:description" content="Transform your business with tailored AI and process automation solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://monarch-ai.com" />
        
        {/* Custom CSS with form-optimized animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); }
              50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.3); }
            }
            
            @keyframes shimmer {
              0% { background-position: -200px 0; }
              100% { background-position: calc(200px + 100%) 0; }
            }
            
            @keyframes celebrate {
              0%, 100% { transform: scale(1); }
              25% { transform: scale(1.05); }
              50% { transform: scale(1.1); }
              75% { transform: scale(1.05); }
            }
            
            @keyframes confetti {
              0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
            
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.05); opacity: 0.8; }
            }
            
            .animate-scroll {
              animation: scroll 40s linear infinite;
            }
            
            .animate-scroll:hover {
              animation-play-state: paused;
            }
            
            .carousel-container:hover .pause-indicator {
              opacity: 1;
            }
            
            .tech-card {
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              backdrop-filter: blur(10px);
            }
            
            .tech-card:hover {
              transform: translateY(-12px) scale(1.05);
              animation: glow 2s ease-in-out infinite;
            }
            
            .tech-card:hover .tech-icon {
              transform: scale(1.1) rotate(5deg);
              filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
            }
            
            .tech-card:hover .tech-label {
              color: #1f2937;
              font-weight: 600;
            }
            
            .tech-icon {
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .tech-label {
              transition: all 0.3s ease;
            }
            
            .carousel-container {
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
            }
            
            .floating-bg {
              animation: float 6s ease-in-out infinite;
            }
            
            .shimmer-effect {
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
              background-size: 200px 100%;
              animation: shimmer 3s infinite;
            }
            
            .tech-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
              transition: left 0.6s;
              border-radius: 1rem;
            }
            
            .tech-card:hover::before {
              left: 100%;
            }
            
            .celebrate-btn {
              animation: celebrate 0.6s ease-in-out;
            }
            
            .confetti {
              position: absolute;
              width: 10px;
              height: 10px;
              background: #22c55e;
              animation: confetti 3s linear infinite;
            }
            
            .confetti:nth-child(2) { background: #3b82f6; animation-delay: 0.5s; left: 20%; }
            .confetti:nth-child(3) { background: #f59e0b; animation-delay: 1s; left: 40%; }
            .confetti:nth-child(4) { background: #ef4444; animation-delay: 1.5s; left: 60%; }
            .confetti:nth-child(5) { background: #8b5cf6; animation-delay: 2s; left: 80%; }
            
            .pulse-success {
              animation: pulse 2s infinite;
            }
            
            /* FORM ISOLATION - COMPLETELY DISABLE ALL ANIMATIONS */
            #contact {
              transform: none !important;
              transition: none !important;
            }
            
            #contact * {
              transform: none !important;
              transition: none !important;
            }
            
            #contact input,
            #contact textarea,
            #contact button {
              transform: none !important;
              transition: none !important;
              animation: none !important;
            }
            
            /* Prevent scroll jumping */
            body.form-focused {
              scroll-behavior: auto;
            }
            
            /* GLOBAL ANIMATION FREEZE WHEN FORM IS FOCUSED */
            body.form-focused * {
              animation-play-state: paused !important;
              transform: none !important;
              transition: none !important;
            }
            
            body.form-focused [data-animate] {
              transform: none !important;
              animation: none !important;
            }
          `
        }} />
        
        {/* Cal.com embed script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function (C, A, L) { 
                let p = function (a, ar) { a.q.push(ar); }; 
                let d = C.document; 
                C.Cal = C.Cal || function () { 
                  let cal = C.Cal; 
                  let ar = arguments; 
                  if (!cal.loaded) { 
                    cal.ns = {}; 
                    cal.q = cal.q || []; 
                    d.head.appendChild(d.createElement("script")).src = A; 
                    cal.loaded = true; 
                  } 
                  if (ar[0] === L) { 
                    const api = function () { p(api, arguments); }; 
                    const namespace = ar[1]; 
                    api.q = api.q || []; 
                    if(typeof namespace === "string"){
                      cal.ns[namespace] = cal.ns[namespace] || api;
                      p(cal.ns[namespace], ar);
                      p(cal, ["initNamespace", namespace]);
                    } else p(cal, ar); 
                    return;
                  } 
                  p(cal, ar); 
                }; 
              })(window, "https://app.cal.com/embed/embed.js", "init");
              Cal("init", "30min", {origin:"https://app.cal.com"});
              Cal.ns["30min"]("floatingButton", {"calLink":"monarch-ai-cloud/30min","config":{"layout":"month_view"}}); 
              Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
            `
          }}
        />
      </Head>

      <div className="min-h-screen bg-white overflow-hidden relative">
        {/* Floating Background Elements */}
        <FloatingOrb size="w-96 h-96" position="-top-48 -right-48" delay={0} />
        <FloatingOrb size="w-80 h-80" position="top-1/3 -left-40" delay={2} />
        <FloatingOrb size="w-72 h-72" position="bottom-1/4 right-1/4" delay={4} />

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-bold text-2xl text-black">Monarch AI</span>
                  <div className="text-xs text-gray-600 -mt-1">Intelligent Systems for Growth</div>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#services" className="text-gray-700 hover:text-black transition-colors font-medium">Services</a>
                <a href="#process" className="text-gray-700 hover:text-black transition-colors font-medium">Process</a>
                <a href="#about" className="text-gray-700 hover:text-black transition-colors font-medium">About</a>
                <a href="#contact" className="text-gray-700 hover:text-black transition-colors font-medium">Contact</a>
                <button 
                  onClick={() => window.open('https://cal.com/monarch-ai-cloud/30min', '_blank')}
                  className="group bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Free Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
                <div className="flex flex-col space-y-4 mt-4">
                  <a href="#services" className="text-gray-700 font-medium">Services</a>
                  <a href="#process" className="text-gray-700 font-medium">Process</a>
                  <a href="#about" className="text-gray-700 font-medium">About</a>
                  <a href="#contact" className="text-gray-700 font-medium">Contact</a>
                  <button 
                    onClick={() => window.open('https://cal.com/monarch-ai-cloud/30min', '_blank')}
                    className="bg-black text-white px-6 py-3 rounded-full font-semibold text-center"
                  >
                    Free Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection id="hero" className="text-center">
              <div className="mb-12">
                <div className="inline-flex items-center bg-gray-50 text-gray-700 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-gray-200">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Building Intelligent Systems for Service-Based Businesses
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight text-black">
                  Automate Your
                  <br />
                  <span className="bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">
                    Growth
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
                  Transform your business with tailored AI and process automation solutions. Our specialty is replacing the operational drag of manual tasks with streamlined, automated workflows that give you back your time.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                  <button 
                    onClick={() => window.open('https://cal.com/monarch-ai-cloud/30min', '_blank')}
                    className="group bg-black text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-2xl flex items-center space-x-3"
                  >
                    <span>Get Your Free Automation Blueprint</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">No Consultation Fees</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold">Remote or Onsite</span>
                    </div>
                  </div>
                </div>

                {/* Hero Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {[
                    { value: "40+", label: "Hours Saved Weekly", subtext: "Average client result" },
                    { value: "10", label: "Business Days", subtext: "Delivery guarantee" },
                    { value: "100%", label: "Satisfaction Rate", subtext: "Client success stories" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:border-gray-300 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg">
                      <div className="text-4xl font-black text-black mb-2">{stat.value}</div>
                      <div className="text-gray-800 font-semibold mb-1">{stat.label}</div>
                      <div className="text-gray-500 text-sm">{stat.subtext}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Services Section */}
        <AnimatedSection id="services" className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
                Streamline Your Workflow
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your business by automating repetitive tasks, freeing up valuable time for your team. Embrace efficiency and accuracy, allowing your staff to concentrate on what truly matters.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl">
                  <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6">
                    {index === 0 && <Zap className="w-8 h-8 text-white" />}
                    {index === 1 && <Target className="w-8 h-8 text-white" />}
                    {index === 2 && <Bot className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Live Technology Stack Carousel Section */}
        <AnimatedSection id="technology" className="py-20 px-6 relative overflow-hidden">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="floating-bg absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
            <div className="floating-bg absolute top-1/2 -right-10 w-60 h-60 bg-gradient-to-r from-green-100/30 to-blue-100/30 rounded-full blur-3xl" style={{ animationDelay: '2s' }}></div>
            <div className="floating-bg absolute -bottom-10 left-1/3 w-32 h-32 bg-gradient-to-r from-purple-100/30 to-pink-100/30 rounded-full blur-3xl" style={{ animationDelay: '4s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-black mb-6 bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent">
                Powered by Industry Leaders
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We leverage the most advanced tools and platforms to build your automation systems, ensuring reliability, scalability, and cutting-edge performance.
              </p>
            </div>

            {/* Enhanced Live Carousel Container */}
            <div className="carousel-container group relative overflow-hidden rounded-3xl p-8 border border-gray-200/50 shadow-xl">
              <div className="flex animate-scroll">
                {/* First set of tools */}
                <div className="flex space-x-8 min-w-max">
                  {/* Relume */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/relume.jpeg" alt="Relume" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Relume</span>
                  </div>

                  {/* Airtable */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/airtable.svg" alt="Airtable" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Airtable</span>
                  </div>

                  {/* N8N */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                         <img src="/images/N8n.svg" alt="N8N" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">N8N</span>
                  </div>

                  {/* Google Sheets */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/Google_Sheets_Logo.svg" alt="Google Sheets" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Google Sheets</span>
                  </div>

                  {/* OpenAI */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/openai.svg" alt="OpenAI" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">OpenAI</span>
                  </div>

                  {/* Gemini */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/gemini-color.svg" alt="Gemini" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Gemini</span>
                  </div>

                  {/* Make */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/make-color.svg" alt="Make" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Make</span>
                  </div>

                  {/* Webflow */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/webflow.svg" alt="Webflow" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Webflow</span>
                  </div>

                  {/* Base44 */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/base44.jpeg" alt="Base44" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Base44</span>
                  </div>
                </div>

                {/* Duplicate set for infinite scroll */}
                <div className="flex space-x-8 min-w-max">
                  {/* Relume */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/relume.jpeg" alt="Relume" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Relume</span>
                  </div>

                  {/* Airtable */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/airtable.svg" alt="Airtable" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Airtable</span>
                  </div>

                  {/* N8N */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/N8n.svg" alt="N8N" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">N8N</span>
                  </div>

                  {/* Google Sheets */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/Google_Sheets_Logo.svg" alt="Google Sheets" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Google Sheets</span>
                  </div>

                  {/* OpenAI */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/openai.svg" alt="OpenAI" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">OpenAI</span>
                  </div>

                  {/* Gemini */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/gemini-color.svg" alt="Gemini" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Gemini</span>
                  </div>

                  {/* Make */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/make-color.svg" alt="Make" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Make</span>
                  </div>

                  {/* Webflow */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/webflow.svg" alt="Webflow" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Webflow</span>
                  </div>

                  {/* Base44 */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/base44.jpeg" alt="Base44" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Base44</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Gradient overlays with dynamic effects */}
              <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10"></div>
              <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10"></div>
              
              {/* Subtle glow effect on container */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
              
              {/* Interactive pause indicator */}
              <div className="pause-indicator absolute top-4 right-4 opacity-0 transition-opacity duration-300 pointer-events-none">
                <div className="bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span>Paused</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center space-x-2 text-gray-400 text-sm mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Hover to pause • Authentic brand assets</span>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
                And many more. We continuously evaluate and integrate the latest tools to ensure your automation systems are built with the best technology available.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Process Section */}
        <AnimatedSection id="process" className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
                Our Proven Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A transparent process, a fixed price, and a functional system delivered in 10 business days. Your success is the only measure of ours.
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {processes.map((process, index) => (
                <div key={index} className="relative">
                  <div className="bg-white border border-gray-200 rounded-3xl p-8 text-center hover:border-gray-300 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl">
                    <div className="text-5xl mb-6">{process.icon}</div>
                    <div className="text-sm font-bold text-gray-500 mb-2">{process.duration}</div>
                    <h3 className="text-xl font-bold text-black mb-4">{process.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{process.description}</p>
                  </div>
                  {index < processes.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Why Choose Us Section */}
        <AnimatedSection id="why-choose" className="py-20 px-6 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                  Why Choose Us for Your Automation Needs?
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Our expertise in AI and automation sets us apart. We deliver tailored solutions that drive efficiency and growth.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Tailored Approach",
                      description: "We analyse your processes to create a system that truly fits your business."
                    },
                    {
                      title: "Proven Results",
                      description: "Our clients see measurable improvements in efficiency and productivity after implementation."
                    },
                    {
                      title: "Client-Centric Approach",
                      description: "We prioritise your needs and goals throughout every step of the process."
                    },
                    {
                      title: "Ongoing Support",
                      description: "Our commitment to your success doesn't end at launch."
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center">
                  <div className="text-6xl font-black text-white mb-4">Trust</div>
                  <div className="text-xl text-gray-300 mb-6">isn't claimed, it's earned.</div>
                  <p className="text-gray-400 leading-relaxed">
                    Our promise is simple: a transparent process, a fixed price, and a functional system delivered in 10 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonials Section */}
        <AnimatedSection id="testimonials" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
                Client Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how we've transformed businesses with intelligent automation solutions.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-gray-300 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl">
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                  <div className="border-t border-gray-100 pt-6">
                    <div className="font-bold text-black">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                    <div className="text-gray-500 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection id="faq" className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our automation services.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-all duration-300">
                  <h3 className="text-xl font-bold text-black mb-4">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection id="cta" className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-5xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                Transform Your Business Today!
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Unlock the potential of automation and elevate your operations to new heights. Get a free consultation and see exactly how we can save you 40+ hours per week.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <button 
                  onClick={() => window.open('https://cal.com/monarch-ai-cloud/30min', '_blank')}
                  className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  Schedule Your Free Consultation
                </button>
                <button className="border border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No consultation fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>10-day delivery guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Fixed price promise</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section - NO ANIMATIONS */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600">
                We'd love to hear from you and discuss how we can automate your growth.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-2">Email</h3>
                    <a href="mailto:moses.njau@monarch-ai.cloud" className="text-gray-600 hover:text-black transition-colors">
                      moses.njau@monarch-ai.cloud
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-2">Phone</h3>
                    <a href="tel:+32499879728" className="text-gray-600 hover:text-black transition-colors">
                      +32 499 87 97 28
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-2">Location</h3>
                    <p className="text-gray-600">Brussels, Belgium</p>
                    <p className="text-gray-500 text-sm">Remote & On-site consultations available</p>
                  </div>
                </div>
              </div>

              {/* FORM WITH NO ANIMATIONS OR TRANSFORMS */}
              <div 
                className="bg-gray-50 rounded-3xl p-8 border border-gray-200 relative" 
                style={{ transform: 'none', transition: 'none' }}
                ref={formRef}
              >
                {!formState.isSubmitted ? (
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none bg-white"
                        style={{ transition: 'none', transform: 'none' }}
                        required
                        disabled={formState.isSubmitting}
                        autoComplete="given-name"
                      />
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none bg-white"
                        style={{ transition: 'none', transform: 'none' }}
                        required
                        disabled={formState.isSubmitting}
                        autoComplete="family-name"
                      />
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none bg-white"
                      style={{ transition: 'none', transform: 'none' }}
                      required
                      disabled={formState.isSubmitting}
                      autoComplete="email"
                    />
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Company Name" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none bg-white"
                      style={{ transition: 'none', transform: 'none' }}
                      disabled={formState.isSubmitting}
                      autoComplete="organization"
                    />
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none bg-white"
                      style={{ transition: 'none', transform: 'none' }}
                      disabled={formState.isSubmitting}
                      autoComplete="tel"
                    />
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your automation needs..." 
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none resize-none bg-white"
                      style={{ transition: 'none', transform: 'none' }}
                      required
                      disabled={formState.isSubmitting}
                    />
                    
                    {formState.error && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                        {formState.error}
                      </div>
                    )}
                    
                    <button 
                      type="submit"
                      disabled={formState.isSubmitting}
                      className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      style={{ transition: 'none', transform: 'none' }}
                    >
                      {formState.isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Let's have a quick chat</span>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8 relative overflow-hidden">
                    {/* Confetti Animation */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="confetti" style={{ left: '10%' }}></div>
                      <div className="confetti" style={{ left: '30%' }}></div>
                      <div className="confetti" style={{ left: '50%' }}></div>
                      <div className="confetti" style={{ left: '70%' }}></div>
                      <div className="confetti" style={{ left: '90%' }}></div>
                    </div>
                    
                    <div className="celebrate-btn bg-green-500 text-white rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center mb-6 pulse-success">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-black mb-4">Thank You! 🎉</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Your message has been sent successfully! We'll get back to you within 24 hours to discuss your automation needs.
                    </p>
                    
                    <div className="space-y-4">
                      <button 
                        onClick={() => window.open('https://cal.com/monarch-ai-cloud/30min', '_blank')}
                        className="celebrate-btn w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                      >
                        <span>📅 Book Your Free Consultation</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      
                      <button 
                        onClick={resetForm}
                        className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <p className="text-blue-800 text-sm">
                        <strong>What's next?</strong> We'll analyze your requirements and prepare a custom automation blueprint for your business.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12 mb-12">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <Bot className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <span className="font-bold text-2xl">Monarch AI</span>
                    <div className="text-xs text-gray-400 -mt-1">Intelligent Systems for Growth</div>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed max-w-md">
                  Building intelligent systems for service-based businesses ready to scale. Replacing operational drag with streamlined automation.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4">Services</h4>
                <div className="space-y-2 text-gray-400">
                  <div><a href="#services" className="hover:text-white transition-colors">Workflow Automation</a></div>
                  <div><a href="#services" className="hover:text-white transition-colors">App Integration</a></div>
                  <div><a href="#services" className="hover:text-white transition-colors">Custom AI Solutions</a></div>
                  <div><a href="#services" className="hover:text-white transition-colors">Process Optimization</a></div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4">Company</h4>
                <div className="space-y-2 text-gray-400">
                  <div><a href="#why-choose" className="hover:text-white transition-colors">About Us</a></div>
                  <div><a href="#process" className="hover:text-white transition-colors">Our Process</a></div>
                  <div><a href="#testimonials" className="hover:text-white transition-colors">Case Studies</a></div>
                  <div><a href="#contact" className="hover:text-white transition-colors">Contact</a></div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-400 text-sm mb-4 md:mb-0">
                  © 2024 Monarch AI. All rights reserved.
                </div>
                <div className="flex items-center space-x-6 text-gray-400 text-sm">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                  <div className="flex items-center space-x-2">
                    <span>Made in Brussels</span>
                    <span>🇧🇪</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating CTA Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={() => window.open('https://cal.com/monarch-ai-cloud/30min', '_blank')}
            className="bg-black text-white px-6 py-4 rounded-full font-bold shadow-2xl hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2"
          >
            <span className="hidden sm:inline">Free Consultation</span>
            <span className="sm:hidden">📞</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}