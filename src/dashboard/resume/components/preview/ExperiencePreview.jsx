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
    <div className='my-6 px-2 sm:px-4'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}>
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold'
            style={{ color: resumeInfo?.themeColor }}>
            {experience?.title}
          </h2>
          <h2 className='text-xs flex flex-col sm:flex-row justify-between'>
            <span>{experience?.companyName}, {experience?.city}, {experience?.state}</span>
            <span>
              {formatDate(experience?.startDate)} To {' '}
              {experience?.currentlyWorking ? 'Present' : formatDate(experience?.endDate)}
            </span>
          </h2>

          <div
            className='text-xs my-2 experience-preview leading-relaxed'
            dangerouslySetInnerHTML={{
              __html: experience?.workSummary || ''
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default ExperiencePreview