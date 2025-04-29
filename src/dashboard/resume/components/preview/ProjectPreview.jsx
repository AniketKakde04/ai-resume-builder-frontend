import React from 'react';

function ProjectPreview({ resumeInfo }) {
  return (
    <div className='mt-4 print:mt-3'>
      <h2 className='font-bold text-sm border-b border-black mb-2'>
        PROJECTS
      </h2>

      {resumeInfo?.projects?.map((project, index) => (
        <div key={index} className="mb-3 print:mb-2">
          <h3 className="font-medium text-xs print:text-[11pt]">
            {project?.projectName}
          </h3>
          <div className="text-xs print:text-[11pt] text-gray-600">
            {project?.technologies}
            {project?.link && (
              <span className="ml-2">[Project URL]</span>
            )}
          </div>
          <p className="text-xs print:text-[11pt] mt-1">
            {project?.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;