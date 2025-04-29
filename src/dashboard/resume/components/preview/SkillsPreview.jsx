import React from 'react'

function SkillsPreview({ resumeInfo }) {
  return (
    <div className='my-4 px-2 sm:px-4'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor,
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact'
        }}
      >
        SKILLS
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact'
        }}
      />

      <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 print:mt-2'>
        {resumeInfo?.skills?.map((skill, index) => (
          <div 
            key={index}
            className='text-xs px-2 py-1 print:py-0.5 text-center border rounded-sm'
            style={{
              borderColor: resumeInfo?.themeColor || '#e5e7eb',
              color: resumeInfo?.themeColor || '#374151',
              printColorAdjust: 'exact',
              WebkitPrintColorAdjust: 'exact'
            }}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsPreview