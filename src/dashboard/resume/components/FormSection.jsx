import React, { useState } from 'react';
import PersonalDetail from './forms/PersonalDetail';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, Navigate, useParams } from 'react-router-dom';
import Summary from './forms/Summary';
import Skills from './forms/Skills';
import ThemeColor from './ThemeColor';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Projects from './forms/Projects';
import Achievements from './forms/Achievements'; // Import Achievements form

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const { resumeId } = useParams();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4 sm:p-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Left Side: Home + Theme Toggle */}
        <div className="flex gap-3">
          <Link to="/dashboard">
            <Button className="theme-button">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
          <ThemeColor />
        </div>

        {/* Right Side: Navigation Buttons */}
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              className="theme-button"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            size="sm"
            className={`theme-button ${
              enableNext
                ? 'bg-pink-600 hover:bg-pink-700'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div>
        {activeFormIndex === 1 ? (
          <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 2 ? (
          <Summary enabledNext={(v) => setEnableNext(v)} />
        ) : activeFormIndex === 3 ? (
          <Education />
        ) : activeFormIndex === 4 ? (
          <Experience />
        ) : activeFormIndex === 5 ? (
          <Projects />
        ) : activeFormIndex === 6 ? (
          <Achievements /> 
        ) : activeFormIndex === 7 ? (
          <Skills />
        ) : activeFormIndex === 8 ? (
          <Navigate to={`/my-resume/${resumeId}/view`} />
        ) : null}
      </div>
    </div>
  );
}

export default FormSection;