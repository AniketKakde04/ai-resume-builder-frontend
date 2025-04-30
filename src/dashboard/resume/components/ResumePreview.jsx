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
                 w-full max-w-[900px] mx-auto 
                 bg-white text-[10.5pt]
                 rounded-lg overflow-hidden
                 print:p-0 print:shadow-none
                 print:min-h-[1123px]"
      style={{
        borderColor: resumeInfo?.themeColor || '#000000',
      }}
    >
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 5mm 5mm;
              marks: none;
              @top-left { content: none; }
              @top-right { content: none; }
              @bottom-left { content: none; }
              @bottom-right { content: none; }
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .avoid-break {
              break-inside: avoid-page;
            }
          }
        `}
      </style>

      <div className="print:mx-4 print:my-0 print:pt-1">
        <div className="mb-2 avoid-break">
          <PersonalDetailPreview resumeInfo={resumeInfo} />
        </div>

        {resumeInfo?.summary && (
          <div className="mb-2 avoid-break">
            <SummaryPreview resumeInfo={resumeInfo} />
          </div>
        )}

        {resumeInfo?.education?.length > 0 && (
          <div className="mb-2 avoid-break">
            <EducationalPreview resumeInfo={resumeInfo} />
          </div>
        )}

        {resumeInfo?.experience?.length > 0 && (
          <div className="mb-2 avoid-break">
            <ExperiencePreview resumeInfo={resumeInfo} />
          </div>
        )}

        {resumeInfo?.projects?.length > 0 && (
          <div className="mb-2 avoid-break">
            <ProjectPreview resumeInfo={resumeInfo} />
          </div>
        )}

        {resumeInfo?.achievements?.length > 0 && (
          <div className="mb-2 avoid-break">
            <AchievementsPreview resumeInfo={resumeInfo} />
          </div>
        )}

        {resumeInfo?.skills?.length > 0 && (
          <div className="mb-2 avoid-break">
            <SkillsPreview resumeInfo={resumeInfo} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;