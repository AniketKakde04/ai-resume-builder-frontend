import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'

import PersonalDetail from './forms/PersonalDetail'
import Summary from './forms/Summary'
import Skills from './forms/Skills'
import ThemeColor from './ThemeColor'
import Experience from './forms/Experience'
import Education from './forms/Education'

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const { resumeId } = useParams()

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4 sm:p-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Left Side: Home + Theme */}
        <div className="flex gap-3">
          <Link to="/dashboard">
            <button className="bg-black text-white px-3 py-2 rounded hover:bg-gray-800 transition flex items-center gap-2">
              <Home className="w-4 h-4" /> Home
            </button>
          </Link>
          <ThemeColor />
        </div>

        {/* Right Side: Nav Buttons */}
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <button
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition flex items-center gap-2"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          <button
            disabled={!enableNext}
            className={`px-4 py-2 rounded flex items-center gap-2 font-medium transition ${
              enableNext
                ? 'bg-pink-600 text-white hover:bg-pink-700'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="mt-4">
        {activeFormIndex === 1 ? (
          <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 2 ? (
          <Summary enabledNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 3 ? (
          <Experience />
        ) : activeFormIndex === 4 ? (
          <Education />
        ) : activeFormIndex === 5 ? (
          <Skills />
        ) : activeFormIndex === 6 ? (
          <Navigate to={`/my-resume/${resumeId}/view`} />
        ) : null}
      </div>
    </div>
  )
}

export default FormSection
