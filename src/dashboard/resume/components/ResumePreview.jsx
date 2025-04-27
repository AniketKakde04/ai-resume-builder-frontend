import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';
import ProjectPreview from './preview/ProjectPreview';
import AchievementsPreview from './preview/AchievementsPreview'; // Import AchievementsPreview

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px] 
                 sm:p-10 md:p-12 lg:p-14 
                 w-full max-w-[900px] mx-auto 
                 bg-white 
                 rounded-lg 
                 overflow-hidden"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Detail */}
      <div className="mb-6">
        <PersonalDetailPreview resumeInfo={resumeInfo} />
      </div>

      {/* Summary */}
      <div className="mb-6">
        <SummaryPreview resumeInfo={resumeInfo} />
      </div>

      {/* Professional Experience */}
      {resumeInfo?.experience?.length > 0 && (
        <div className="mb-6">
          <ExperiencePreview resumeInfo={resumeInfo} />
        </div>
      )}

      {/* Educational */}
      {resumeInfo?.education?.length > 0 && (
        <div className="mb-6">
          <EducationalPreview resumeInfo={resumeInfo} />
        </div>
      )}

      {/* Projects */}
      {resumeInfo?.projects?.length > 0 && (
        <div className="mb-6">
          <ProjectPreview resumeInfo={resumeInfo} />
        </div>
      )}

      {/* Achievements */}
      {resumeInfo?.achievements?.length > 0 && (
        <div className="mb-6">
          <AchievementsPreview resumeInfo={resumeInfo} />
        </div>
      )}

      {/* Skills */}
      {resumeInfo?.skills?.length > 0 && (
        <div className="mb-6">
          <SkillsPreview resumeInfo={resumeInfo} />
        </div>
      )}
    </div>
  );
}

export default ResumePreview;