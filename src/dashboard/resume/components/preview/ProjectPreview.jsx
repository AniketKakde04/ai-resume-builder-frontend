import React from 'react'

function ProjectPreview({ resumeInfo }) {
  return (
    <div className='my-6 px-2 sm:px-4'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Projects
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.projects.map((project, index) => (
        <div key={index} className='my-5'>
          <h2
            className='text-sm font-bold'
            style={{ color: resumeInfo?.themeColor }}
          >
            {project?.projectName}
          </h2>
          <h2 className='text-xs flex flex-col sm:flex-row justify-between'>
            <span>{project?.technologies}</span>
            {project?.link && (
              <a
                href={project?.link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 underline'
              >
                View Project
              </a>
            )}
          </h2>
          <p className='text-xs my-2 leading-relaxed'>{project?.description}</p>
        </div>
      ))}
    </div>
  )
}

export default ProjectPreview