import React from 'react';

function ProjectPreview({ resumeInfo }) {
  return (
    <div className="space-y-[3mm]">
      <h2 className="text-center font-bold text-[11pt] print:text-[10.5pt] mb-[1mm]"
        style={{ color: resumeInfo?.themeColor }}>
        PROJECTS
      </h2>
      <hr className="border-t-[0.5mm]" style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.projects?.map((project, index) => (
        <div key={index} className="space-y-[1mm]">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-[10pt] print:text-[9.5pt]">
              {project.projectName}
            </h3>
            {project.link && (
              <span className="text-[9pt] print:text-[8.5pt] text-blue-600 print:text-black">
                [Link]
              </span>
            )}
          </div>
          <p className="text-[9.5pt] print:text-[9pt] text-gray-600">
            {project.technologies}
          </p>
          <p className="text-[9pt] print:text-[8.5pt] leading-tight">
            {project.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;