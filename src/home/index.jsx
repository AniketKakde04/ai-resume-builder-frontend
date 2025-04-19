import Header from '@/components/custom/Header'
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import React from 'react'

function Home() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen">
      {/* Background Blob Animation */}
      <div className="absolute -top-20 -left-40 w-[600px] h-[600px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-40 left-80 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-1000" />

      <Header />

      {/* Hero Section */}
      <section className="relative z-10 py-12 px-4 mx-auto max-w-screen-xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Design Smarter <br />
          <span className="text-pink-500">Resumes with AI</span>
        </h1>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          An intelligent resume builder that helps you craft standout resumes in minutes.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/dashboard"
            className="px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition"
          >
            Get Started
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3 border border-white text-white rounded-md hover:bg-white hover:text-black transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative z-10 py-12 px-4 mx-auto max-w-screen-xl">
        <h2 className="text-4xl font-bold text-center mb-2">How it Works</h2>
        <p className="text-gray-400 text-center mb-6">
          Just 3 simple steps to a perfect resume
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
            icon: <AtomIcon className="h-8 w-8" />,
            title: "Write a Prompt",
            text: "Start with a short prompt about your background or job goal."
          }, {
            icon: <Edit className="h-8 w-8" />,
            title: "Customize",
            text: "Tweak layout, tone, and content to fit your unique style."
          }, {
            icon: <Share2 className="h-8 w-8" />,
            title: "Share or Download",
            text: "Export your resume and start applying like a pro."
          }].map((step, idx) => (
            <div key={idx} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 text-center shadow-md hover:shadow-pink-500/30 transition">
              <div className="mb-4 text-pink-400 mx-auto">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-6 border-t border-white/10 text-center text-sm text-gray-400 mt-12">
        <p>© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="/" className="hover:text-white transition">Privacy Policy</a>
          <a href="/" className="hover:text-white transition">Terms of Service</a>
        </div>
      </footer>
    </div>
  )
}

export default Home
