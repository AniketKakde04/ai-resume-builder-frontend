// SkillsPreview.jsx
import React from 'react'

function SkillsPreview({ resumeInfo }) {
  return (
    <div className='my-4 px-2 sm:px-4 print:my-2'>
      <h2
        className='text-center font-bold text-sm mb-2 print:mb-1 print:text-[11pt]'
        style={{ color: resumeInfo?.themeColor || '#000000' }}
      >
        Skills
      </h2>
      <hr style={{ 
        borderColor: resumeInfo?.themeColor || '#000000',
        backgroundColor: resumeInfo?.themeColor || '#000000'
      }} />

      <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 print:mt-1'>
        {resumeInfo?.skills?.map((skill, index) => (
          <div 
            key={index}
            className='text-xs px-2 py-1 text-center border rounded-sm 
                       print:text-[9pt] print:py-0.5 print:border-[0.5px]'
            style={{ 
              borderColor: resumeInfo?.themeColor || '#e5e7eb',
              color: resumeInfo?.themeColor || '#374151'
            }}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsPreview;