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
    <div className="min-h-screen bg-white/10 backdrop-blur-lg p-6 rounded-xl">
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to={'/dashboard'}>
            <Button><Home /></Button>
          </Link>
          <ThemeColor />
        </div>

        <div className='flex gap-2'>
          {activeFormIndex > 1 && (
            <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className='flex gap-2 text-white'
            size='sm'
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

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
  )
}

export default FormSection
