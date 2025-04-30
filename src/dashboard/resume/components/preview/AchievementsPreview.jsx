// AchievementsPreview.jsx
import React from 'react';

function AchievementsPreview({ resumeInfo }) {
  return (
    <div className="my-6 px-2 sm:px-4 print:my-4">
      <h2
        className="text-center font-bold text-sm mb-2 print:mb-1"
        style={{ color: resumeInfo?.themeColor }}
      >
        Achievements
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.achievements?.map((achievement, index) => (
        <div key={index} className="my-5 print:my-3">
          <h3
            className="text-sm font-bold print:text-[11pt]"
            style={{ color: resumeInfo?.themeColor }}
          >
            {achievement?.title}
          </h3>
          <p className="text-xs my-2 leading-relaxed print:text-[10pt] print:my-1">
            {achievement?.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AchievementsPreview;