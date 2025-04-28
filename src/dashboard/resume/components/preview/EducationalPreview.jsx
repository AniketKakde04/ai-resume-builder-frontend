import React from 'react'

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isNaN(date) ? '' : date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
};

function EducationalPreview({ resumeInfo }) {
  return (
    <div className='mb-4 print:mb-2'>
      <h2 className='text-center font-semibold text-[11pt] print:text-[10pt] mb-1'
        style={{ color: resumeInfo?.themeColor }}>
        EDUCATION
      </h2>
      
      {resumeInfo?.education?.map((education, index) => (
        <div key={index} className='mb-3 print:mb-1'>
          <div className='flex justify-between items-start'>
            <div>
              <h3 className='text-[10pt] print:text-[9.5pt] font-medium'>
                {education?.universityName}
              </h3>
              <p className='text-[9pt] print:text-[8.5pt] text-gray-600'>
                {education?.degree} {education?.major}
              </p>
            </div>
            <span className='text-[9pt] print:text-[8.5pt] whitespace-nowrap'>
              {formatDate(education?.startDate)} - {formatDate(education?.endDate)}
            </span>
          </div>
          {education?.description && (
            <p className='text-[9pt] print:text-[8.5pt] mt-1 print:mt-0 text-gray-600'>
              {education?.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default EducationalPreview;