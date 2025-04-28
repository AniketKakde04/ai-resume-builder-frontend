import React from 'react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date) ? '' : date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
};

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="space-y-[3mm]">
      <h2 className="text-center font-bold text-[11pt] print:text-[10.5pt] mb-[1mm]"
        style={{ color: resumeInfo?.themeColor }}>
        EXPERIENCE
      </h2>
      <hr className="border-t-[0.5mm]" style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience?.map((exp, index) => (
        <div key={index} className="space-y-[1mm]">
          <div className="flex justify-between">
            <h3 className="font-semibold text-[10pt] print:text-[9.5pt]">
              {exp.title}
            </h3>
            <span className="text-[9pt] print:text-[9pt]">
              {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
            </span>
          </div>
          <p className="text-[9.5pt] print:text-[9pt] text-gray-600">
            {exp.companyName}, {exp.city}
          </p>
          <div className="text-[9pt] print:text-[8.5pt] leading-tight"
            dangerouslySetInnerHTML={{ __html: exp.workSummary }} />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;