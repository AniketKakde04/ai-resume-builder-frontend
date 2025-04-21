import React from 'react'
import './SkillsPrint.css'

function SkillsPreview({ resumeInfo }) {
  return (
    <div className='my-6 px-2 sm:px-4'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor || '#000',
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact'
        }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor || '#000',
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact'
        }}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills.map((skill, index) => {
          const widthPercent = Math.min(skill?.rating * 20, 100)
          return (
            <div key={index} className='flex items-center gap-2'>
              <h2 className='text-xs min-w-[80px]'>{skill.name}</h2>
              <div className='skill-bar-wrapper'>
                <div
                  className='skill-bar-fill'
                  style={{
                    backgroundColor: resumeInfo?.themeColor || '#000',
                    width: `${widthPercent}%`,
                    printColorAdjust: 'exact',
                    WebkitPrintColorAdjust: 'exact'
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillsPreview
