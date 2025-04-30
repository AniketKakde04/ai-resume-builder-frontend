// ProjectPreview.jsx
import React from 'react'

function ProjectPreview({ resumeInfo }) {
  return (
    <div className='my-4 px-2 sm:px-4 print:my-2'>
      <h2
        className='text-center font-bold text-sm mb-2 print:mb-1'
        style={{ color: resumeInfo?.themeColor }}
      >
        Projects
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.projects.map((project, index) => (
        <div key={index} className='my-5 print:my-3'>
          <h2
            className='text-sm font-bold print:text-[11pt]'
            style={{ color: resumeInfo?.themeColor }}
          >
            {project?.projectName}
          </h2>
          <h2 className='text-xs flex flex-col sm:flex-row justify-between print:text-[10pt]'>
            <span>{project?.technologies}</span>
            {project?.link && (
              <a
                href={project?.link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 underline print:text-black'
              >
                View Project
              </a>
            )}
          </h2>
          <p className='text-xs my-2 leading-relaxed print:text-[10pt] print:my-1'>
            {project?.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ProjectPreview