#!/bin/bash

# Monarch AI Website Setup Script
# This script creates the complete project structure and files

echo "🚀 Setting up Monarch AI Website..."
echo "=================================="

# Create project directory
PROJECT_NAME="monarch-ai-website"
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p pages
mkdir -p styles
mkdir -p public

# Create package.json
echo "📦 Creating package.json..."
cat > package.json << 'EOF'
{
  "name": "monarch-ai-website",
  "version": "1.0.0",
  "description": "Monarch AI - Intelligent Systems for Growth",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.292.0"
  },
  "devDependencies": {
    "@types/node": "^20.8.0",
    "@types/react": "^18.2.25",
    "@types/react-dom": "^18.2.11",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.51.0",
    "eslint-config-next": "14.0.4",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2"
  },
  "keywords": ["AI", "automation", "business", "workflows", "nextjs"],
  "author": "Moses Njau <moses.njau@monarch-ai.cloud>",
  "license": "MIT"
}
EOF

# Create tailwind.config.js
echo "🎨 Creating Tailwind configuration..."
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'SF Pro Text', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 4s ease-in-out infinite',
        'bounce': 'bounce 2s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
}
EOF

# Create postcss.config.js
echo "⚙️ Creating PostCSS configuration..."
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Create next.config.js
echo "⚙️ Creating Next.js configuration..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.prod.website-files.com'],
  },
  experimental: {
    optimizeCss: true,
  }
}

module.exports = nextConfig
EOF

# Create .gitignore
echo "🚫 Creating .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db
EOF

# Create pages/_app.js
echo "📄 Creating _app.js..."
cat > pages/_app.js << 'EOF'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
EOF

# Create styles/globals.css
echo "🎨 Creating global styles..."
cat > styles/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply font-sans antialiased;
  }
}

@layer components {
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float 6s ease-in-out infinite 2s;
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent;
  }
  
  .backdrop-blur-glass {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

/* Focus styles */
.focus-visible:focus {
  @apply outline-none ring-2 ring-black ring-offset-2;
}

/* Cal.com embed styles */
.cal-floating-button {
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  z-index: 1000 !important;
}
EOF

# Create a placeholder for the main page (user will need to copy the full component)
echo "📄 Creating index.js placeholder..."
cat > pages/index.js << 'EOF'
// IMPORTANT: Replace this file with the complete React component from the artifact
// Copy the entire content from the "pages/index.js" artifact

import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black mb-4">Monarch AI</h1>
        <p className="text-gray-600 mb-8">Intelligent Systems for Growth</p>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p><strong>Setup Required:</strong></p>
          <p>Please replace this file with the complete React component from the artifact "pages/index.js"</p>
        </div>
      </div>
    </div>
  );
}
EOF

# Create README.md
echo "📖 Creating README.md..."
cat > README.md << 'EOF'
# Monarch AI Website

A stunning, modern website for Monarch AI - Intelligent Systems for Growth.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Replace the main page**
   - Copy the complete React component from the artifact
   - Replace the content in `pages/index.js`

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📞 Contact

**Moses Njau**  
Email: moses.njau@monarch-ai.cloud  
Phone: +32 499 87 97 28  
Location: Brussels, Belgium

---

**Made with ❤️ in Brussels 🇧🇪**
EOF

# Create favicon placeholder
echo "🖼️ Creating favicon placeholder..."
echo "<!-- Replace with actual favicon -->" > public/favicon.ico

echo ""
echo "✅ Project structure created successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. cd $PROJECT_NAME"
echo "2. Copy the complete React component from the artifact to pages/index.js"
echo "3. npm install"
echo "4. npm run dev"
echo ""
echo "🎉 Your Monarch AI website will be ready!"
echo ""
echo "📁 Project created in: $(pwd)"
echo ""