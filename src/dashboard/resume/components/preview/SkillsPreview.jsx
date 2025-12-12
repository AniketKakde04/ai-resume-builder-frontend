import React from 'react'

function SkillsPreview({ resumeInfo }) {
  return (
    <div className='my-6 px-2 sm:px-4 print:my-4'>
      <div className='mb-4 print:mb-3'>
        <h2
          className='text-center font-bold text-sm mb-2 print:mb-1'
          style={{ color: resumeInfo?.themeColor }}
        >
          Technical Skills
        </h2>
        <hr style={{ borderColor: resumeInfo?.themeColor }} />
      </div>

      <div className='flex flex-wrap justify-center gap-2 print:gap-x-4'>
        {resumeInfo?.skills?.map((skill, index) => (
          <div 
            key={index}
            className='relative text-sm print:text-[10pt]'
          >
            <span 
              className='font-medium px-2 py-1 bg-gray-100 rounded'
              style={{ 
                color: resumeInfo?.themeColor || '#2d3748',
                backgroundColor: resumeInfo?.themeColor ? `${resumeInfo.themeColor}15` : '#f7fafc'
              }}
            >
              {skill.name}
            </span>
            {index < resumeInfo.skills.length - 1 && (
              <span 
                className='absolute -right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 print:text-gray-500'
                style={{ color: resumeInfo?.themeColor ? `${resumeInfo.themeColor}80` : '#a0aec0' }}
              >
                |
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsPreview