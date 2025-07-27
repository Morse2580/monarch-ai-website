import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock API response structure for demonstration
const mockAnalysisData = {
  url: "https://example-agency.com",
  overall_score: 78,
  sections: {
    user_experience: {
      score: 82,
      insight: "Strong visual hierarchy and intuitive navigation, but mobile responsiveness needs optimization.",
      recommendations: ["Implement responsive breakpoints", "Optimize touch targets", "Improve loading performance"]
    },
    content_strategy: {
      score: 74,
      insight: "Compelling messaging with clear value propositions, though some technical jargon may alienate non-technical prospects.",
      recommendations: ["Simplify technical language", "Add more case studies", "Strengthen calls-to-action"]
    },
    conversion_optimization: {
      score: 68,
      insight: "Multiple friction points in the conversion funnel. Contact forms are buried and trust signals are weak.",
      recommendations: ["Streamline contact flow", "Add social proof", "Implement exit-intent optimization"]
    },
    brand_positioning: {
      score: 85,
      insight: "Clear differentiation and premium positioning. Brand voice is consistent and professional throughout.",
      recommendations: ["Expand thought leadership content", "Strengthen industry expertise messaging"]
    }
  },
  strategic_question: "Your site positions you as premium consultants, but your conversion path suggests you're competing on convenience rather than expertise. How might we redesign your client acquisition to reflect the true value of strategic partnership?"
};

// Utility function to get score color
const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 70) return 'text-amber-600';
  return 'text-red-500';
};

// Utility function to get score background
const getScoreBg = (score) => {
  if (score >= 80) return 'bg-emerald-50 border-emerald-200';
  if (score >= 70) return 'bg-amber-50 border-amber-200';
  return 'bg-red-50 border-red-200';
};

// ReportHeader Component
const ReportHeader = ({ url, overallScore }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    <h1 className="font-display text-4xl lg:text-5xl font-bold text-text-primary mb-4" style={{ fontWeight: 700 }}>
      Digital Strategy Analysis
    </h1>
    <p className="font-sans text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
      A comprehensive evaluation of <span className="font-medium text-text-primary">{url}</span>
    </p>
    <div className={`inline-flex items-center px-8 py-4 rounded-2xl border-2 ${getScoreBg(overallScore)}`}>
      <div className="text-center">
        <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
          {overallScore}
        </div>
        <div className="text-sm text-text-secondary font-medium font-sans">
          Overall Score
        </div>
      </div>
    </div>
  </motion.div>
);

// Scorecard Component
const Scorecard = ({ sections }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
  >
    {Object.entries(sections).map(([key, section], index) => (
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 * (index + 3) }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl font-semibold text-text-primary capitalize">
            {key.replace('_', ' ')}
          </h3>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${getScoreBg(section.score)}`}>
            <span className={`text-xl font-bold ${getScoreColor(section.score)}`}>
              {section.score}
            </span>
          </div>
        </div>
        <p className="text-text-secondary text-base leading-relaxed mb-6">
          {section.insight}
        </p>
        <div className="space-y-2">
          <h4 className="font-medium text-text-primary text-sm uppercase tracking-wide">
            Key Recommendations
          </h4>
          <ul className="space-y-2">
            {section.recommendations.map((rec, idx) => (
              <li key={idx} className="text-sm text-text-secondary flex items-start">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

// InsightBlock Component
const InsightBlock = ({ question }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.8 }}
    className="bg-gradient-to-br from-brand-accent/5 to-brand-accent/10 rounded-3xl p-12 border border-brand-accent/20"
  >
    <div className="text-center max-w-4xl mx-auto">
      <h2 className="font-display text-2xl lg:text-3xl font-semibold text-text-primary mb-8">
        The Strategic Question
      </h2>
      <p className="text-lg leading-relaxed text-text-secondary mb-10">
        {question}
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-brand-accent text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-brand-accent/90 transition-colors duration-200 shadow-lg"
      >
        Let's Discuss This
      </motion.button>
    </div>
  </motion.div>
);

// Loading Component
const LoadingState = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-32"
  >
    <div className="relative w-20 h-20 mx-auto mb-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 border-4 border-gray-200 border-t-brand-accent rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-brand-accent rounded-full opacity-30"
      />
    </div>
    <h3 className="font-display text-2xl font-semibold text-text-primary mb-4">
      Analyzing Your Digital Presence
    </h3>
    <p className="font-sans text-text-secondary">
      Our AI is conducting a comprehensive audit of your website...
    </p>
  </motion.div>
);

// Input Component
const UrlInput = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-32"
    >
      <h1 className="font-display text-5xl lg:text-6xl font-extrabold text-text-primary mb-6" style={{ fontWeight: 800 }}>
        Monarch AI Canvas
      </h1>
      <p className="font-sans text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
        Get an instant, AI-powered analysis of your digital strategy. 
        Discover what's working, what isn't, and what comes next.
      </p>
      
      <div className="max-w-lg mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            placeholder="Enter your website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-brand-accent focus:outline-none focus:ring-4 focus:ring-brand-accent focus:ring-opacity-10 text-lg font-sans transition-all duration-200"
            disabled={isLoading}
          />
          <motion.button
            onClick={handleSubmit}
            disabled={isLoading || !url.trim()}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="bg-brand-accent text-white px-8 py-4 rounded-xl font-sans font-medium text-lg hover:bg-brand-accent-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Main App Component
const MonarchAICanvas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (url) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with realistic timing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real implementation, this would call your /api/analyze endpoint
      // const response = await fetch('/api/analyze', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ url })
      // });
      // const data = await response.json();
      
      // For demo, use mock data
      const data = { ...mockAnalysisData, url };
      setAnalysisData(data);
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Custom CSS for fonts and theme */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap');
        
        .font-display { font-family: 'Satoshi', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        :root {
          --background: #F9F9F9;
          --text-primary: #1A1A1A;
          --text-secondary: #737373;
          --brand-accent: #4F46E5;
          --brand-accent-hover: #433bdc;
        }
        
        .bg-background { background-color: var(--background); }
        .text-text-primary { color: var(--text-primary); }
        .text-text-secondary { color: var(--text-secondary); }
        .bg-brand-accent { background-color: var(--brand-accent); }
        .bg-brand-accent-hover { background-color: var(--brand-accent-hover); }
        .text-brand-accent { color: var(--brand-accent); }
        .border-brand-accent { border-color: var(--brand-accent); }
        .focus\\:border-brand-accent:focus { border-color: var(--brand-accent); }
        .focus\\:ring-brand-accent:focus { 
          --tw-ring-color: var(--brand-accent);
        }
        .focus\\:ring-opacity-10:focus {
          --tw-ring-opacity: 0.1;
        }
        .hover\\:bg-brand-accent-hover:hover { 
          background-color: var(--brand-accent-hover); 
        }
        .hover\\:text-brand-accent\\/80:hover { 
          color: rgb(79 70 229 / 0.8); 
        }
        .from-brand-accent\\/5 { 
          --tw-gradient-from: rgb(79 70 229 / 0.05); 
        }
        .to-brand-accent\\/10 { 
          --tw-gradient-to: rgb(79 70 229 / 0.1); 
        }
        .border-brand-accent\\/20 { 
          border-color: rgb(79 70 229 / 0.2); 
        }
      `}</style>
      
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <AnimatePresence mode="wait">
          {!analysisData && !isLoading && (
            <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          )}
          
          {isLoading && <LoadingState />}
          
          {analysisData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-8">
                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium"
                >
                  ← New Analysis
                </motion.button>
              </div>
              
              <ReportHeader 
                url={analysisData.url} 
                overallScore={analysisData.overall_score} 
              />
              
              <Scorecard sections={analysisData.sections} />
              
              <InsightBlock question={analysisData.strategic_question} />
            </motion.div>
          )}
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32"
            >
              <div className="text-red-500 text-lg mb-4">{error}</div>
              <button
                onClick={handleReset}
                className="text-brand-accent hover:text-brand-accent/80 font-medium"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MonarchAICanvas; 