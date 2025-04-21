import React from 'react'

function SkillsPreview({ resumeInfo }) {
  return (
    <div className='my-6 px-2 sm:px-4'>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}>
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className='flex items-center gap-1'>
            <h2 className='text-xs min-w-[80px]'>{skill.name}</h2>
            <div className='h-2 bg-gray-200 w-full rounded-full max-w-[120px]'>
              <div
                className='h-2 rounded-full'
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: `${Math.min(skill?.rating * 20, 100)}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsPreview
