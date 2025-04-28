import React from 'react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date) ? '' : date.toLocaleDateString('en-US', {
    month: 'short', 
    year: 'numeric'
  });
};

function EducationalPreview({ resumeInfo }) {
  return (
    <div className="space-y-[3mm]">
      <h2 className="text-center font-bold text-[11pt] print:text-[10.5pt] mb-[1mm]"
        style={{ color: resumeInfo?.themeColor }}>
        EDUCATION
      </h2>
      <hr className="border-t-[0.5mm]" style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.education?.map((edu, index) => (
        <div key={index} className="space-y-[1mm]">
          <div className="flex justify-between">
            <h3 className="font-semibold text-[10pt] print:text-[9.5pt]">
              {edu.universityName}
            </h3>
            <span className="text-[9pt] print:text-[9pt]">
              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
            </span>
          </div>
          <p className="text-[9.5pt] print:text-[9pt] text-gray-600">
            {edu.degree} {edu.major}
          </p>
          {edu.description && (
            <p className="text-[9pt] print:text-[8.5pt] leading-tight">
              {edu.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;