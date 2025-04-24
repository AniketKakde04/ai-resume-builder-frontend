import React from 'react'

function AchievementsPreview({ resumeInfo }) {
  return (
    <div className='my-6 px-2 sm:px-4'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Achievements
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.achievements?.map((achievement, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold'>{achievement?.title}</h2>
          <p className='text-xs my-2 leading-relaxed'>{achievement?.description}</p>
        </div>
      ))}
    </div>
  )
}

export default AchievementsPreview