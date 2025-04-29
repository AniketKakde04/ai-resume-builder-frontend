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
    <div className='mt-4 print:mt-3'>
      <h2 className='font-bold text-sm border-b border-black mb-2'>
        EDUCATION
      </h2>
      
      {resumeInfo?.education?.map((edu, index) => (
        <div key={index} className="mb-3 print:mb-2">
          <div className="flex justify-between">
            <h3 className="font-medium text-xs print:text-[11pt]">
              {edu.universityName}
            </h3>
            <span className="text-xs print:text-[11pt]">
              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
            </span>
          </div>
          <p className="text-xs print:text-[11pt] text-gray-600">
            {edu.degree} {edu.major}
          </p>
          {edu.description && (
            <p className="text-xs print:text-[11pt] mt-1">
              {edu.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;