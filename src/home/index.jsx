import Header from '@/components/custom/Header'
import React from 'react'

function Home() {
  const features = [
    {
      title: "PDF Export",
      emoji: "📄",
      description: "Download polished resumes in professional PDF format"
    },
    {
      title: "Live Editing",
      emoji: "✍️",
      description: "Instant preview with real-time content updates"
    },
    {
      title: "Color Customization",
      emoji: "🎨",
      description: "Multiple theme colors to match your style"
    },
    {
      title: "AI Suggestions",
      emoji: "🤖",
      description: "Smart content recommendations as you type"
    }
  ];

  const proFeatures = [
    {
      title: "ATS Optimizer",
      emoji: "🔍",
      description: "Beat applicant tracking systems with optimized resumes"
    },
    {
      title: "Job Matcher",
      emoji: "🎯",
      description: "Automatically tailor resumes to job descriptions"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated Background */}
      <div className="fixed -top-40 -left-60 w-[800px] h-[800px] bg-blue-300/10 rounded-full mix-blend-screen blur-3xl md:-top-20 md:-left-40" />

      <Header />

      {/* Hero Section */}
      <section className="relative px-4 py-12 md:py-24 md:px-6 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <div className="backdrop-blur-md bg-white/10 px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-white/20">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent text-sm md:text-base">
              AI Resume Builder
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent px-4 leading-tight">
            Build Better Resumes Faster
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Create professional resumes with powerful free tools, unlock advanced AI features when you need them
          </p>
          <a href="/dashboard" className="backdrop-blur-md bg-white/10 border border-white/20 px-6 py-2.5 md:px-8 md:py-3.5 rounded-lg hover:bg-white/20 transition-all text-sm md:text-base " style={{ color:"white" }}>
            Start Building Free →
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative px-4 py-12 md:py-16 md:px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div key={index} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 md:p-6 h-full">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto">
                <span className="text-xl md:text-2xl">{feature.emoji}</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-center md:text-left">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-xs md:text-sm text-center md:text-left">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Section */}
      <section className="relative px-4 py-12 md:py-16 md:px-6 mx-auto max-w-7xl">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 md:p-12">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="bg-purple-500/20 px-3 py-1 rounded-full text-xs md:text-sm">
              Coming Soon
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Pro Features</h2>
            <p className="text-gray-300 text-sm md:text-base max-w-xl">
              Advanced tools for professional users
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
              {proFeatures.map((feature, index) => (
                <div key={index} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-4 md:p-6 h-full">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto">
                    <span className="text-xl md:text-2xl">{feature.emoji}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-xs md:text-sm text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 py-8 md:py-12 mt-12 md:mt-24 border-t border-white/20 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm md:text-base text-gray-400">
            © {new Date().getFullYear()} ResumeCraft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home