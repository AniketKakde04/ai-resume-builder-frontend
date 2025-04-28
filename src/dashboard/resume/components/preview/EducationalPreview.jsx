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
    <div className='my-6 px-2 sm:px-4'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}>
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.education?.map((education, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold'
            style={{ color: resumeInfo?.themeColor }}>
            {education?.universityName}
          </h2>
          <h2 className='text-xs flex flex-col sm:flex-row justify-between'>
            <span>{education?.degree} {education?.major}</span>
            <span>
              {formatDate(education?.startDate)} - {formatDate(education?.endDate)}
            </span>
          </h2>
          <p className='text-xs my-2 leading-relaxed'>
            {education?.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default EducationalPreview