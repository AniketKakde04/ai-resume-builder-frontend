// EducationalPreview.jsx
import React from 'react'

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isNaN(date) ? '' : date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};

function EducationalPreview({ resumeInfo }) {
  return (
    <div className='my-4 px-2 sm:px-4 print:my-2'>
      <h2 
        className='text-center font-bold text-sm mb-2 print:mb-1 print:text-[11pt]'
        style={{ color: resumeInfo?.themeColor || '#000000' }}
      >
        Education
      </h2>
      <hr style={{ 
        borderColor: resumeInfo?.themeColor || '#000000',
        backgroundColor: resumeInfo?.themeColor || '#000000'
      }} />

      {resumeInfo?.education?.map((education, index) => (
        <div key={index} className='my-4 print:my-2 avoid-break'>
          <h2 
            className='text-sm font-bold print:text-[10.5pt]'
            style={{ color: resumeInfo?.themeColor || '#000000' }}
          >
            {education?.universityName}
          </h2>
          <div className='text-xs flex flex-col sm:flex-row justify-between print:text-[9.5pt]'>
            <span>{education?.degree} {education?.major}</span>
            <span>
              {formatDate(education?.startDate)} - {formatDate(education?.endDate)}
            </span>
          </div>
          <p className='text-xs mt-1 leading-relaxed print:text-[9pt] print:leading-tight'>
            {education?.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default EducationalPreview;