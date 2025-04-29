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
    <div className='mt-4 print:mt-3'>
      <h2 className='font-bold text-sm border-b border-black mb-2'>
        WORK EXPERIENCE
      </h2>
      
      {resumeInfo?.experience?.map((exp, index) => (
        <div key={index} className="mb-3 print:mb-2">
          <div className="flex justify-between">
            <h3 className="font-medium text-xs print:text-[11pt]">
              {exp.title}
            </h3>
            <span className="text-xs print:text-[11pt]">
              {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
            </span>
          </div>
          <p className="text-xs print:text-[11pt] text-gray-600">
            {exp.companyName}, {exp.city}
          </p>
          <ul className="list-disc pl-4 mt-1">
            {(exp.workSummary || '').split('\n').map((point, i) => (
              <li key={i} className="text-xs print:text-[11pt]">
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;