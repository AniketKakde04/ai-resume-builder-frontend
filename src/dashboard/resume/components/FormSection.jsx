import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, Navigate, useParams } from 'react-router-dom'
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
    <div className="min-h-screen bg-white/10 backdrop-blur-lg p-4 sm:p-6 rounded-xl">
      {/* Header Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex gap-3">
          <Link to={'/dashboard'}>
            <Button className="bg-gray-900 text-white hover:bg-gray-800 transition">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
          <ThemeColor />
        </div>

        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              className="bg-gray-900 text-white hover:bg-gray-800"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className={`flex gap-2 text-white ${
              enableNext ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400 cursor-not-allowed'
            }`}
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Form Section */}
      <div>
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
