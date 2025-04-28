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
    <div className="p-4 sm:p-6 print:p-[5mm] w-full max-w-[800px] mx-auto bg-white text-[10.5pt] print:text-[10pt]">
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 15mm 15mm;
          }
          .print-section {
            page-break-inside: avoid;
            margin-bottom: 6mm;
          }
          .print-section:last-child {
            margin-bottom: 0;
          }
        }
      `}</style>

      <div className="print-section">
        <PersonalDetailPreview resumeInfo={resumeInfo} />
        {resumeInfo?.summary && <SummaryPreview resumeInfo={resumeInfo} />}
      </div>

      <div className="print-section grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-[4mm]">
        <div className="space-y-[4mm]">
          {resumeInfo?.education?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
          {resumeInfo?.skills?.length > 0 && <SkillsPreview resumeInfo={resumeInfo} />}
        </div>
        
        <div className="space-y-[4mm]">
          {resumeInfo?.experience?.length > 0 && <ExperiencePreview resumeInfo={resumeInfo} />}
          {resumeInfo?.projects?.length > 0 && <ProjectPreview resumeInfo={resumeInfo} />}
        </div>
      </div>

      <div className="print-section">
        {resumeInfo?.achievements?.length > 0 && <AchievementsPreview resumeInfo={resumeInfo} />}
      </div>
    </div>
  );
}

export default ResumePreview;