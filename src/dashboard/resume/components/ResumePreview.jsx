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
    <div className="h-full p-4 sm:p-6 print:p-2 w-full max-w-[800px] mx-auto bg-white text-[10pt] print:text-[9.5pt] print:leading-[1.1]">
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm 8mm;
          }
          .print-section {
            page-break-inside: avoid;
          }
          .print-col {
            width: 49% !important;
            float: left;
          }
          .print-col:last-child {
            float: right;
          }
        }
      `}</style>

      {/* Header Section */}
      <div className="print-section mb-4 print:mb-2">
        <PersonalDetailPreview resumeInfo={resumeInfo} />
      </div>

      {/* Summary */}
      {resumeInfo?.summary && (
        <div className="print-section mb-4 print:mb-2">
          <SummaryPreview resumeInfo={resumeInfo} />
        </div>
      )}

      {/* Two Column Layout */}
      <div className="flex flex-col sm:flex-row print:block gap-4 print:gap-1">
        {/* Left Column */}
        <div className="sm:w-1/2 print-col space-y-4 print:space-y-1">
          {resumeInfo?.education?.length > 0 && (
            <div className="print-section">
              <EducationalPreview resumeInfo={resumeInfo} />
            </div>
          )}
          
          {resumeInfo?.skills?.length > 0 && (
            <div className="print-section">
              <SkillsPreview resumeInfo={resumeInfo} />
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="sm:w-1/2 print-col space-y-4 print:space-y-1">
          {resumeInfo?.experience?.length > 0 && (
            <div className="print-section">
              <ExperiencePreview resumeInfo={resumeInfo} />
            </div>
          )}
          
          {resumeInfo?.projects?.length > 0 && (
            <div className="print-section">
              <ProjectPreview resumeInfo={resumeInfo} />
            </div>
          )}
          
          {resumeInfo?.achievements?.length > 0 && (
            <div className="print-section">
              <AchievementsPreview resumeInfo={resumeInfo} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;