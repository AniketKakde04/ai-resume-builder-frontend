import React from 'react'

function ProjectPreview({ resumeInfo }) {
  return (
    <div className='mb-4 print:mb-2'>
      <h2 className='text-center font-semibold text-[11pt] print:text-[10pt] mb-1'
        style={{ color: resumeInfo?.themeColor }}>
        PROJECTS
      </h2>
      
      {resumeInfo?.projects?.map((project, index) => (
        <div key={index} className='mb-3 print:mb-1'>
          <div className='flex justify-between items-start'>
            <h3 className='text-[10pt] print:text-[9.5pt] font-medium'>
              {project?.projectName}
            </h3>
            {project?.link && (
              <span className='text-[9pt] print:text-[8.5pt] text-blue-500'>
                [Link]
              </span>
            )}
          </div>
          <p className='text-[9pt] print:text-[8.5pt] text-gray-600'>
            {project?.technologies}
          </p>
          <p className='text-[9pt] print:text-[8.5pt] text-gray-600 mt-1 print:mt-0'>
            {project?.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ProjectPreview;