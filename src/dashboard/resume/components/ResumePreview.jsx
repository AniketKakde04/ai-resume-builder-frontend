import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';
import ProjectPreview from './preview/ProjectPreview';
import AchievementsPreview from './preview/AchievementsPreview';

// Accept previewType as a prop
function ResumePreview({ previewType = 'default' }) {
  const { resumeInfo } = useContext(ResumeInfoContext);

  // Example: alternate style for 'alt' previewType
  const altStyle = previewType === 'alt';

  return (
    <div
      className={`shadow-lg h-full p-8 border-t-[15px] 
                 sm:p-6 md:p-8 lg:p-10 
                 w-full max-w-[900px] mx-auto 
                 ${altStyle ? 'bg-gray-100 text-blue-900' : 'bg-white text-[10.5pt]'}
                 rounded-lg overflow-hidden
                 print:p-0 print:shadow-none
                 print:min-h-[1123px]`}
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
          {/* Pass previewType to preview components if needed for more customization */}
          <PersonalDetailPreview resumeInfo={resumeInfo} previewType={previewType} />
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

        {resumeInfo?.skills?.length > 0 && (
          <div className="mb-2 avoid-break">
            <SkillsPreview resumeInfo={resumeInfo} />
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


      </div>
    </div>
  );
}

export default ResumePreview;