import Header from '@/components/custom/Header'
import React from 'react'
import { motion } from 'framer-motion'

function Home() {
  const features = [
    {
      title: "Real-Time Preview",
      emoji: "👁️",
      description: "Instant preview with real-time editing capabilities"
    },
    {
      title: "PDF Export",
      emoji: "📄",
      description: "Download polished resumes in professional PDF format"
    },
    {
      title: "AI Suggestions",
      emoji: "🤖",
      description: "Smart content recommendations as you type"
    },
    {
      title: "Resume Analysis",
      emoji: "🔍",
      description: "Get tailored feedback based on job descriptions"
    },
    {
      title: "ATS Optimizer",
      emoji: "🎯",
      description: "Key word suggestions to beat applicant tracking systems"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated Background */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
        className="fixed -top-40 -left-60 w-[800px] h-[800px] bg-blue-300/10 rounded-full mix-blend-screen blur-3xl md:-top-20 md:-left-40"
      />

      <Header />

      {/* Hero Section */}
      <section className="relative px-4 py-12 md:py-24 md:px-6 mx-auto max-w-6xl">
        <motion.div 
          className="flex flex-col items-center text-center space-y-6 md:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-md bg-white/10 px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-white/20"
          >
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent text-sm md:text-base">
              AI Resume Builder
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent px-4 leading-tight"
          >
            Build Smarter Resumes Faster
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-gray-300 max-w-2xl leading-relaxed"
          >
            Create professional resumes with AI-powered tools and real-time optimization features
          </motion.p>

          <motion.a
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/dashboard"
            className="backdrop-blur-md bg-white/10 border border-white/20 px-6 py-2.5 md:px-8 md:py-3.5 rounded-lg hover:bg-white/20 transition-all text-sm md:text-base"
            style={{ color: "white" }}
          >
            Start Building Free →
          </motion.a>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative px-4 py-12 md:py-16 md:px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 md:p-6 h-full"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 mx-auto"
              >
                <span className="text-xl md:text-2xl">{feature.emoji}</span>
              </motion.div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-xs md:text-sm text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative px-4 py-8 md:py-12 mt-12 md:mt-24 border-t border-white/20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <p className="text-sm md:text-base text-gray-400">
            © {new Date().getFullYear()} ResumeCraft. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </div>
  )
}

export default Home