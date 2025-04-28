import React from 'react';

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="space-y-[3mm]">
      <h2 className="text-center font-bold text-[11pt] print:text-[10.5pt] mb-[1mm]"
        style={{ color: resumeInfo?.themeColor }}>
        SKILLS
      </h2>
      <hr className="border-t-[0.5mm]" style={{ borderColor: resumeInfo?.themeColor }} />

      <div className="grid grid-cols-2 print:grid-cols-3 gap-[2mm]">
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className="flex items-center gap-[1mm]">
            <span className="text-[9.5pt] print:text-[9pt] flex-1">
              {skill.name}
            </span>
            <div className="w-[25mm] h-[1.5mm] bg-gray-200 rounded-full">
              <div className="h-full rounded-full"
                style={{
                  width: `${Math.min(skill.rating * 20, 100)}%`,
                  backgroundColor: resumeInfo?.themeColor
                }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;