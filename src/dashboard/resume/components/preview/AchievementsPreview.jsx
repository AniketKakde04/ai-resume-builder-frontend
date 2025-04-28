import React from 'react';

function AchievementsPreview({ resumeInfo }) {
  return (
    <div className="space-y-[3mm]">
      <h2 className="text-center font-bold text-[11pt] print:text-[10.5pt] mb-[1mm]"
        style={{ color: resumeInfo?.themeColor }}>
        ACHIEVEMENTS
      </h2>
      <hr className="border-t-[0.5mm]" style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.achievements?.map((achievement, index) => (
        <div key={index} className="space-y-[1mm]">
          <h3 className="font-semibold text-[10pt] print:text-[9.5pt]">
            {achievement.title}
          </h3>
          <p className="text-[9pt] print:text-[8.5pt] leading-tight">
            {achievement.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AchievementsPreview;