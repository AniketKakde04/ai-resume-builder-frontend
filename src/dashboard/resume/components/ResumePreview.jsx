import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';
import ProjectPreview from './preview/ProjectPreview';
import AchievementsPreview from './preview/AchievementsPreview';

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-lg h-full p-8 border-t-[15px] 
                 sm:p-6 md:p-8 lg:p-10 
                 w-full max-w-[800px] mx-auto 
                 bg-white text-[10.5pt]
                 rounded-lg 
                 overflow-hidden"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Detail */}
      <div className="mb-4">
        <PersonalDetailPreview resumeInfo={resumeInfo} />
      </div>

      {/* Summary */}
      <div className="mb-4">
        <SummaryPreview resumeInfo={resumeInfo} />
      </div>

      {/* Educational */}
      {resumeInfo?.education?.length > 0 && (
        <div className="mb-4">
          <EducationalPreview resumeInfo={resumeInfo} />
        </div>
      )}

      {/* Professional Experience */}
      {resumeInfo?.experience?.length > 0 && (
        <div className="mb-4">
          <ExperiencePreview resumeInfo={resumeInfo} />
        </div>
      )}

      {/* Projects */}
      {resumeInfo?.projects?.length > 0 && (
        <div className="mb-4">
          <ProjectPreview resumeInfo={resumeInfo} />
        </div>
      )}

      {/* Achievements */}
      {resumeInfo?.achievements?.length > 0 && (
        <div className="mb-4">
          <AchievementsPreview resumeInfo={resumeInfo} />
        </div>
      )}

      {/* Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <div className="mb-4">
          <SkillsPreview resumeInfo={resumeInfo} />
        </div>
      )}
    </div>
  );
}

export default ResumePreview;