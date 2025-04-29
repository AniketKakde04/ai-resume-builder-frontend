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
    <div className="p-4 sm:p-6 print:p-4 w-full max-w-[800px] mx-auto bg-white text-[11pt]">
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      
      {resumeInfo?.summary && (
        <div className="mt-4 print:mt-3">
          <SummaryPreview resumeInfo={resumeInfo} />
        </div>
      )}

      <div className="space-y-4 print:space-y-3">
        {resumeInfo?.experience?.length > 0 && (
          <ExperiencePreview resumeInfo={resumeInfo} />
        )}
        
        {resumeInfo?.projects?.length > 0 && (
          <ProjectPreview resumeInfo={resumeInfo} />
        )}
        
        {resumeInfo?.education?.length > 0 && (
          <EducationalPreview resumeInfo={resumeInfo} />
        )}
        
        {resumeInfo?.skills?.length > 0 && (
          <SkillsPreview resumeInfo={resumeInfo} />
        )}
        
        {resumeInfo?.achievements?.length > 0 && (
          <AchievementsPreview resumeInfo={resumeInfo} />
        )}
      </div>
    </div>
  );
}

export default ResumePreview;