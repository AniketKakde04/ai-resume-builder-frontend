import React from 'react'

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isNaN(date) ? '' : date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
};

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className='mb-4 print:mb-2'>
      <h2 className='text-center font-semibold text-[11pt] print:text-[10pt] mb-1'
        style={{ color: resumeInfo?.themeColor }}>
        EXPERIENCE
      </h2>
      
      {resumeInfo?.experience?.map((exp, index) => (
        <div key={index} className='mb-3 print:mb-1'>
          <div className='flex justify-between items-start'>
            <div>
              <h3 className='text-[10pt] print:text-[9.5pt] font-medium'>
                {exp?.title}
              </h3>
              <p className='text-[9pt] print:text-[8.5pt] text-gray-600'>
                {exp?.companyName}, {exp?.city}
              </p>
            </div>
            <span className='text-[9pt] print:text-[8.5pt] whitespace-nowrap'>
              {formatDate(exp?.startDate)} - {exp?.currentlyWorking ? 'Present' : formatDate(exp?.endDate)}
            </span>
          </div>
          <div className='text-[9pt] print:text-[8.5pt] text-gray-600 mt-1 print:mt-0'
            dangerouslySetInnerHTML={{ __html: exp?.workSummary || '' }} />
        </div>
      ))}
    </div>
  )
}

export default ExperiencePreview;