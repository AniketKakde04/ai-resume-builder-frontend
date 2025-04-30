// ExperiencePreview.jsx
import React from 'react'

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isNaN(date) ? '' : date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className='my-4 px-2 sm:px-4 print:my-2'>
      <h2 
        className='text-center font-bold text-sm mb-2 print:mb-1 print:text-[11pt] print:mt-3'
        style={{ color: resumeInfo?.themeColor || '#000000' }}
      >
        Professional Experience
      </h2>
      <hr style={{ 
        borderColor: resumeInfo?.themeColor || '#000000',
        backgroundColor: resumeInfo?.themeColor || '#000000'
      }} />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className='my-4 print:my-2 avoid-break'>
          <h2 
            className='text-sm font-bold print:text-[10.5pt]'
            style={{ color: resumeInfo?.themeColor || '#000000' }}
          >
            {experience?.title}
          </h2>
          <div className='text-xs flex flex-col sm:flex-row justify-between print:text-[9.5pt]'>
            <span>{experience?.companyName}, {experience?.city}, {experience?.state}</span>
            <span>
              {formatDate(experience?.startDate)} To {' '}
              {experience?.currentlyWorking ? 'Present' : formatDate(experience?.endDate)}
            </span>
          </div>
          <div 
            className='text-xs mt-1 leading-relaxed print:text-[9pt] print:leading-tight'
            dangerouslySetInnerHTML={{ __html: experience?.workSummary || '' }}
          />
        </div>
      ))}
    </div>
  )
}

export default ExperiencePreview;