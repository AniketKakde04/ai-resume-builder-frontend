import React from 'react'

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
            <span>{experience?.startDate} To {experience?.currentlyWorking ? 'Present' : experience?.endDate}</span>
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
