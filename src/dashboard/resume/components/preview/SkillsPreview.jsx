import React from 'react'

function SkillsPreview({ resumeInfo }) {
  return (
    <div className='mb-4 print:mb-2'>
      <h2 className='text-center font-semibold text-[11pt] print:text-[10pt] mb-1'
        style={{ color: resumeInfo?.themeColor }}>
        SKILLS
      </h2>
      
      <div className='grid grid-cols-2 print:grid-cols-1 gap-2 print:gap-1'>
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className='flex items-center gap-1'>
            <span className='text-[9pt] print:text-[8.5pt] w-20 print:w-16 truncate'>
              {skill.name}
            </span>
            <div className='flex-1 h-1 print:h-[2px] bg-gray-200 rounded-full'>
              <div className='h-full rounded-full'
                style={{
                  width: `${Math.min(skill?.rating * 20, 100)}%`,
                  backgroundColor: resumeInfo?.themeColor
                }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsPreview;