import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ArrowRight, Zap, Bot, Target, Sparkles, CheckCircle, Play, Users, Clock, Star, ArrowDown, Menu, X, Phone, Mail, MapPin, BarChart3, MessageSquare, Settings } from 'lucide-react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFormFocused, setIsFormFocused] = useState(false);
  
  // Typeform integration state
  const [showTypeform, setShowTypeform] = useState(false);
  const typeformContainerRef = useRef(null);
  
  // Typebot integration state
  const [showTypebot, setShowTypebot] = useState(false);

  // Set document title and meta tags
  useEffect(() => {
    document.title = "Monarch AI - Intelligent Systems for Growth";
    
    // Create or update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Add or update favicon
    const updateFavicon = () => {
      let favicon = document.querySelector('link[rel="icon"]');
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.setAttribute('rel', 'icon');
        document.head.appendChild(favicon);
      }
      favicon.setAttribute('href', '/favicon.svg');
      favicon.setAttribute('type', 'image/svg+xml');
    };

    updateMetaTag('description', 'Transform your business with tailored AI and process automation solutions. Replacing operational drag with streamlined workflows that give you back your time.');
    updateMetaTag('keywords', 'AI automation, business automation, workflow optimization, process automation, Belgium, Brussels');
    updateMetaTag('author', 'Moses Njau');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1');
    updateMetaTag('og:title', 'Monarch AI - Intelligent Systems for Growth', true);
    updateMetaTag('og:description', 'Transform your business with tailored AI and process automation solutions.', true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', 'https://monarch-ai.com', true);
    
    updateFavicon();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isFormFocused && !showTypeform && !showTypebot) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFormFocused, showTypeform, showTypebot]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isFormFocused && !showTypeform && !showTypebot) {
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
  }, [isFormFocused, showTypeform, showTypebot]);

  // Clean Typeform/Typebot integration
  useEffect(() => {
    if (showTypeform || showTypebot) {
      // Disable all animations when forms are shown
      document.body.classList.add('typeform-active');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('typeform-active');
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.classList.remove('typeform-active');
      document.body.style.overflow = 'auto';
    };
  }, [showTypeform, showTypebot]);

  // Load Typeform script dynamically
  useEffect(() => {
    if (showTypeform && !window.tf) {
      const script = document.createElement('script');
      script.src = 'https://embed.typeform.com/next/embed.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [showTypeform]);

  // Load Cal.com script
  useEffect(() => {
    if (!window.Cal) {
      const script = document.createElement('script');
      script.innerHTML = `
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
      `;
      document.head.appendChild(script);
    }
  }, []);

  const FloatingOrb = ({ size = 'w-64 h-64', position, delay = 0 }) => (
    <div 
      className={`${size} ${position} absolute rounded-full opacity-10`}
      style={{
        background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
        transform: (isFormFocused || showTypeform || showTypebot) ? 'translate(0px, 0px)' : `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        transition: (isFormFocused || showTypeform || showTypebot) ? 'none' : 'transform 0.8s ease-out'
      }}
    />
  );

  const AnimatedSection = ({ children, id, className = "" }) => (
    <div
      id={id}
      data-animate
      className={`transform transition-all duration-1000 ${
        isVisible[id] && !isFormFocused && !showTypeform && !showTypebot ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-100'
      } ${className}`}
    >
      {children}
    </div>
  );

  // Typeform handlers
  const openTypeform = () => {
    setShowTypeform(true);
    setIsFormFocused(true);
  };

  const closeTypeform = () => {
    setShowTypeform(false);
    setIsFormFocused(false);
  };

  // Method 1: Popup Typeform (Recommended)
  const openTypeformPopup = () => {
    if (window.tf) {
      window.tf.load({
        url: 'https://form.typeform.com/to/uWjbOr2r',
        mode: 'popup',
        autoClose: true,
        onClose: () => {
          setIsFormFocused(false);
        }
      });
    } else {
      // Fallback: open in new tab
      window.open('https://form.typeform.com/to/uWjbOr2r', '_blank');
    }
    setIsFormFocused(true);
  };

  // Method 2: Redirect to Typeform
  const redirectToTypeform = () => {
    window.open('https://form.typeform.com/to/uWjbOr2r', '_blank');
  };

  // Typebot handlers
  const openTypebot = () => {
    setShowTypebot(true);
    setIsFormFocused(true);
  };

  const closeTypebot = () => {
    setShowTypebot(false);
    setIsFormFocused(false);
  };

  const processes = [
    {
      title: "Deep Analysis",
      description: "We map every workflow, identify bottlenecks, and understand your current processes to design the perfect automation blueprint.",
      duration: "Days 1-2",
      icon: Target,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      step: "01"
    },
    {
      title: "Blueprint Design",
      description: "Custom automation architecture tailored to your specific business needs, creating a transparent process with fixed pricing.",
      duration: "Days 3-4", 
      icon: Settings,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      step: "02"
    },
    {
      title: "System Development",
      description: "Building and integrating your intelligent automation systems with existing tools, ensuring seamless operation.",
      duration: "Days 5-8",
      icon: Zap,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      step: "03"
    },
    {
      title: "Delivery & Support",
      description: "Functional system delivered in 10 business days with full training and ongoing support for your success.",
      duration: "Days 9-10",
      icon: CheckCircle,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      step: "04"
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
      name: "Clotilde Boureau",
      role: "Project Manager", 
      company: "Unilever",
      content: "Moses is really accommodating and can get things done quickly; I would recommend him to anyone looking for a reliable and efficient partner.",
      rating: 5
    },
    {
      name: "Patrick Borde",
      role: "Transformation Director",
      company: "Unilever", 
      content: "The tools that Moses built are efficient and easy to use. I think the greatest challenge was the language barrier, but he was able to overcome it and deliver a great products.",
      rating: 5
    },
    {
      name: "Guilhem Jalade ",
      role: "Project Manager Data & AI",
      company: "Unilever",
      content: "Its amazing how he was able to deliver and manage multiple systems at the same time. He is a great problem solver and has a lot of experience in the field.",
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

  const solutions = [
    {
      title: "For Marketing Agencies",
      systemName: "The Digital Footprint Engine", 
      description: "An automated system for marketing agencies to instantly audit new leads and generate strategic reports. We turn your sales process into a high-speed, scalable machine.",
      icon: BarChart3,
      gradient: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "For Real Estate & Loan Brokers",
      systemName: "The Intelligent Lead Assistant",
      description: "A bespoke AI assistant for brokers that captures and qualifies every new lead from your website or email 24/7, sending personalized replies and booking appointments automatically. Never miss a deal again.",
      icon: MessageSquare,
      gradient: "from-green-500 to-blue-600", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "For Service-Based SMEs",
      systemName: "The Custom Operations Workflow",
      description: "An integrated system that connects your existing software (CRM, project management, email) into a single, seamless workflow. We eliminate manual data entry and administrative drag, freeing you to focus on your clients.",
      icon: Settings,
      gradient: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-white overflow-hidden relative">


        {/* Enhanced CSS with FIXED modal positioning */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              33% { transform: translateY(-8px) rotate(1deg); }
              66% { transform: translateY(-4px) rotate(-1deg); }
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
              25% { transform: scale(1.02); }
              50% { transform: scale(1.05); }
              75% { transform: scale(1.02); }
            }
            
            @keyframes confetti {
              0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
            
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.02); opacity: 0.9; }
            }
            
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            @keyframes slideIn {
              from { 
                opacity: 0;
                transform: scale(0.95) translateY(20px) !important;
              }
              to { 
                opacity: 1;
                transform: scale(1) translateY(0) !important;
              }
            }
            
            .animate-scroll {
              animation: scroll 60s linear infinite;
            }
            
            .animate-scroll:hover {
              animation-play-state: paused;
            }
            
            .carousel-container:hover .pause-indicator {
              opacity: 1;
            }
            
            .tech-card {
              transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
              backdrop-filter: blur(10px);
            }
            
            .tech-card:hover {
              transform: translateY(-8px) scale(1.03);
              animation: glow 3s ease-in-out infinite;
            }
            
            .tech-card:hover .tech-icon {
              transform: scale(1.1) rotate(3deg);
              filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
              transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .tech-card:hover .tech-label {
              color: #1f2937;
              font-weight: 600;
            }
            
            .tech-icon {
              transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .tech-label {
              transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .carousel-container {
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
            }
            
            .floating-bg {
              animation: float 8s ease-in-out infinite;
            }
            
            .shimmer-effect {
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
              background-size: 200px 100%;
              animation: shimmer 4s infinite;
            }
            
            .tech-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
              transition: left 0.8s cubic-bezier(0.16, 1, 0.3, 1);
              border-radius: 1rem;
            }
            
            .tech-card:hover::before {
              left: 100%;
            }
            
            .celebrate-btn {
              animation: celebrate 1s ease-in-out;
            }
            
            .confetti {
              position: absolute;
              width: 10px;
              height: 10px;
              background: #22c55e;
              animation: confetti 4s linear infinite;
            }
            
            .confetti:nth-child(2) { background: #3b82f6; animation-delay: 0.8s; left: 20%; }
            .confetti:nth-child(3) { background: #f59e0b; animation-delay: 1.6s; left: 40%; }
            .confetti:nth-child(4) { background: #ef4444; animation-delay: 2.4s; left: 60%; }
            .confetti:nth-child(5) { background: #8b5cf6; animation-delay: 3.2s; left: 80%; }
            
            .pulse-success {
              animation: pulse 3s infinite;
            }
            
            /* Smooth hover transitions for cards */
            .hover\\:border-gray-300:hover {
              transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .hover\\:-translate-y-1:hover {
              transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .hover\\:-translate-y-2:hover {
              transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .hover\\:shadow-xl:hover {
              transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .hover\\:shadow-2xl:hover {
              transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            /* Button hover animations */
            .group:hover .group-hover\\:translate-x-1 {
              transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .group:hover .group-hover\\:scale-105 {
              transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            .group:hover .group-hover\\:scale-110 {
              transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            /* IMPROVED TYPEFORM/TYPEBOT ISOLATION - FIXED CSS */
            body.typeform-active {
              scroll-behavior: auto;
              overflow: hidden;
            }
            
            /* Only disable animations for specific elements, NOT the modal */
            body.typeform-active [data-animate] {
              animation-play-state: paused !important;
              transition: none !important;
            }
            
            body.typeform-active .floating-bg,
            body.typeform-active .animate-scroll,
            body.typeform-active .tech-card {
              animation-play-state: paused !important;
              transition: none !important;
            }
            
            /* Typebot container with MAXIMUM specificity */
            .typebot-container {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              background: rgba(0, 0, 0, 0.8) !important;
              z-index: 99999 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              backdrop-filter: blur(4px) !important;
              animation: fadeIn 0.3s ease-out !important;
            }
            
            .typebot-wrapper {
              width: 90% !important;
              max-width: 800px !important;
              height: 90% !important;
              background: white !important;
              border-radius: 12px !important;
              position: relative !important;
              overflow: hidden !important;
              animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
              transform: scale(1) !important;
              opacity: 1 !important;
            }
            
            .typebot-close {
              position: absolute !important;
              top: 16px !important;
              right: 16px !important;
              background: #000 !important;
              color: white !important;
              border: none !important;
              border-radius: 50% !important;
              width: 40px !important;
              height: 40px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              cursor: pointer !important;
              z-index: 100001 !important;
              font-size: 18px !important;
              font-weight: bold !important;
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }
            
            .typebot-close:hover {
              background: #333 !important;
              transform: scale(1.1) !important;
            }
            
            /* Typebot iframe styling */
            .typebot-embed {
              width: 100% !important;
              height: 100% !important;
              border: none !important;
              border-radius: 12px !important;
            }
            
            /* Typeform container isolation */
            .typeform-container {
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              background: rgba(0, 0, 0, 0.8) !important;
              z-index: 99999 !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              backdrop-filter: blur(4px) !important;
              animation: fadeIn 0.3s ease-out !important;
            }
            
            .typeform-wrapper {
              width: 90% !important;
              max-width: 800px !important;
              height: 90% !important;
              background: white !important;
              border-radius: 12px !important;
              position: relative !important;
              overflow: hidden !important;
              animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }
            
            .typeform-close {
              position: absolute !important;
              top: 16px !important;
              right: 16px !important;
              background: #000 !important;
              color: white !important;
              border: none !important;
              border-radius: 50% !important;
              width: 40px !important;
              height: 40px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              cursor: pointer !important;
              z-index: 100001 !important;
              font-size: 18px !important;
              font-weight: bold !important;
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }
            
            .typeform-close:hover {
              background: #333 !important;
              transform: scale(1.1) !important;
            }
            
            /* Typeform iframe styling */
            .typeform-embed {
              width: 100% !important;
              height: 100% !important;
              border: none !important;
              border-radius: 12px !important;
            }
          `
        }} />

        {/* Floating Background Elements */}
        <FloatingOrb size="w-96 h-96" position="-top-48 -right-48" delay={0} />
        <FloatingOrb size="w-80 h-80" position="top-1/3 -left-40" delay={2} />
        <FloatingOrb size="w-72 h-72" position="bottom-1/4 right-1/4" delay={4} />

        {/* Typeform Modal */}
        {showTypeform && (
          <div className="typeform-container">
            <div className="typeform-wrapper">
              <button 
                className="typeform-close"
                onClick={closeTypeform}
                aria-label="Close form"
                type="button"
              >
                ×
              </button>
              <iframe
                ref={typeformContainerRef}
                className="typeform-embed"
                src="https://form.typeform.com/to/uWjbOr2r"
                title="Contact Form"
              />
            </div>
          </div>
        )}

        {/* Typebot Modal - FIXED IMPLEMENTATION */}
        {showTypebot && (
          <div className="typebot-container">
            <div className="typebot-wrapper">
              <button 
                className="typebot-close"
                onClick={closeTypebot}
                aria-label="Close chat"
                type="button"
              >
                ×
              </button>
              <iframe
                className="typebot-embed"
                src="https://typebot.io/monarch-ai-demo-6j8nxkc?hideHeader=true"
                title="Typebot Chat"
                allow="microphone; camera"
                loading="lazy"
              />
            </div>
          </div>
        )}

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
                  className="group bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-500 ease-out flex items-center space-x-2"
                >
                  <span>Free Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-400 ease-out" />
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
                  {/* Option 1: Popup Typeform (Recommended) */}
                  <button 
                    onClick={openTypeformPopup}
                    className="group bg-black text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-700 ease-out transform hover:-translate-y-1 hover:shadow-2xl flex items-center space-x-3"
                  >
                    <span>Get Your Free Automation Blueprint</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500 ease-out" />
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
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:border-gray-300 transition-all duration-700 ease-out transform hover:-translate-y-1 hover:shadow-lg">
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

        {/* Solutions Carousel Section */}
        <AnimatedSection id="solutions" className="py-20 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-black mb-6">
                Your Business, Automated.
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how our tailored automation solutions transform different industries, streamlining operations and accelerating growth.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              {solutions.map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <div key={index} className={`${solution.bgColor} ${solution.borderColor} border-2 rounded-3xl p-8 group relative overflow-hidden flex flex-col min-h-[500px]`}>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-br ${solution.gradient} rounded-2xl flex items-center justify-center mb-6 flex-shrink-0`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Content - flex-grow to fill available space */}
                      <div className="flex-1 flex flex-col">
                        <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">
                          {solution.title}
                        </div>
                        <h3 className="text-2xl font-bold text-black mb-4">
                          {solution.systemName}
                        </h3>
                        <p className="text-gray-600 leading-relaxed flex-1 mb-8">
                          {solution.description}
                        </p>
                      </div>
                      
                      {/* CTA Button - always at bottom */}
                      <div className="mt-auto flex-shrink-0">
                        <button 
                          onClick={openTypebot}
                          type="button"
                          className="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center space-x-2"
                        >
                          <span>Start My Analysis</span>
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center bg-gray-50 text-gray-700 px-6 py-3 rounded-full text-sm font-medium mb-4 border border-gray-200">
                <Sparkles className="w-4 h-4 mr-2" />
                All solutions include our 10-day delivery guarantee
              </div>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Don't see your industry? We create custom automation solutions for any service-based business. Let's discuss your specific needs.
              </p>
            </div>
          </div>
        </AnimatedSection>

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
                        <img src="/images/relume.jpeg" alt="Relume" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Relume</span>
                  </div>

                  {/* Airtable */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/airtable.svg" alt="Airtable" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Airtable</span>
                  </div>

                  {/* N8N */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                         <img src="/images/N8n.svg" alt="N8N" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">N8N</span>
                  </div>

                  {/* Google Sheets */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/Google_Sheets_Logo.svg" alt="Google Sheets" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Google Sheets</span>
                  </div>

                  {/* OpenAI */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/openai.svg" alt="OpenAI" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">OpenAI</span>
                  </div>

                  {/* Gemini */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/gemini-color.svg" alt="Gemini" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Gemini</span>
                  </div>

                  {/* Make */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/make-color.svg" alt="Make" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Make</span>
                  </div>

                  {/* Webflow */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/webflow.svg" alt="Webflow" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Webflow</span>
                  </div>

                  {/* Base44 */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/base44.jpeg" alt="Base44" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Base44</span>
                  </div>

                  {/* Notion */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/Notion_Logo_0.svg" alt="Notion" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Notion</span>
                  </div>
                </div>

                {/* Duplicate set for infinite scroll */}
                <div className="flex space-x-8 min-w-max">
                  {/* Relume */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/relume.jpeg" alt="Relume" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Relume</span>
                  </div>

                  {/* Airtable */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/airtable.svg" alt="Airtable" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Airtable</span>
                  </div>

                  {/* N8N */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/N8n.svg" alt="N8N" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">N8N</span>
                  </div>

                  {/* Google Sheets */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/Google_Sheets_Logo.svg" alt="Google Sheets" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Google Sheets</span>
                  </div>

                  {/* OpenAI */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/openai.svg" alt="OpenAI" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">OpenAI</span>
                  </div>

                  {/* Gemini */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/gemini-color.svg" alt="Gemini" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Gemini</span>
                  </div>

                  {/* Make */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/make-color.svg" alt="Make" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Make</span>
                  </div>

                  {/* Webflow */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/webflow.svg" alt="Webflow" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Webflow</span>
                  </div>

                  {/* Base44 */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/base44.jpeg" alt="Base44" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Base44</span>
                  </div>

                  {/* Notion */}
                  <div className="flex flex-col items-center group mx-4">
                    <div className="tech-card relative w-24 h-24 bg-white/80 border border-gray-200/50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                      <div className="tech-icon">
                        <img src="/images/Notion_Logo_0.svg" alt="Notion" className="w-12 h-12 object-contain" />
                      </div>
                    </div>
                    <span className="tech-label text-sm font-medium text-gray-700 whitespace-nowrap">Notion</span>
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
              {processes.map((process, index) => {
                const IconComponent = process.icon;
                return (
                  <div key={index} className="relative">
                    <div className={`${process.bgColor} border-2 border-gray-200 rounded-2xl p-8 text-center relative overflow-hidden group`}>
                      {/* Step Number */}
                      <div className="absolute top-4 right-4 text-6xl font-black text-black/5 select-none">
                        {process.step}
                      </div>
                      
                      {/* Icon Container */}
                      <div className={`w-20 h-20 bg-gradient-to-br ${process.color} rounded-2xl flex items-center justify-center mb-6 mx-auto relative z-10`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-4">
                        <Clock className="w-4 h-4 text-gray-600 mr-2" />
                        <span className="text-sm font-semibold text-gray-700">{process.duration}</span>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-2xl font-bold text-black mb-4">{process.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{process.description}</p>
                    </div>
                    
                    {/* Arrow connector */}
                    {index < processes.length - 1 && (
                      <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-gray-600" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">Ready to Transform Your Business?</h3>
                <p className="text-gray-600 mb-6">Join hundreds of businesses that have automated their growth with our proven 10-day process.</p>
                <button 
                  onClick={() => window.open('https://cal.com/monarch-ai-cloud/30min', '_blank')}
                  className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-300 inline-flex items-center space-x-2"
                >
                  <span>Start Your Automation Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
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

        {/* Contact Section - Clean Typeform Integration */}
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

              {/* Typeform Integration Options */}
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-6">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Choose your preferred way to connect with us and discuss your automation needs.
                </p>
                
                <div className="space-y-4">
                  {/* Method 1: Modal Typeform */}
                  <button 
                    onClick={openTypeform}
                    type="button"
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>📝 Fill Out Quick Form</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  {/* Method 2: Direct Redirect */}
                  <button 
                    onClick={redirectToTypeform}
                    type="button"
                    className="w-full border border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>🔗 Open in New Tab</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <div className="border-t border-gray-200 pt-4 mt-6">
                    <button 
                      onClick={() => window.open('https://cal.com/monarch-ai-cloud/30min', '_blank')}
                      className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>📅 Schedule Call Instead</span>
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-blue-800 text-sm">
                    <strong>💡 Pro tip:</strong> The popup form is the smoothest experience, while the modal gives you more control.
                  </p>
                </div>
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
            onClick={openTypeformPopup}
            className="bg-black text-white px-6 py-4 rounded-full font-bold shadow-2xl hover:bg-gray-800 transition-all duration-500 ease-out transform hover:-translate-y-1 flex items-center space-x-2"
          >
            <span className="hidden sm:inline">Quick Form</span>
            <span className="sm:hidden">📝</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-400 ease-out" />
          </button>
        </div>
      </div>
    </>
  );
}