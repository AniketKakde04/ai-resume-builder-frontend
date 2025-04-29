import React from 'react';

function SkillsPreview({ resumeInfo }) {
  // Group skills by category if available
  const groupedSkills = resumeInfo?.skills?.reduce((acc, skill) => {
    const category = skill.category || 'Technical';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill.name);
    return acc;
  }, {});

  return (
    <div className='mt-4 print:mt-3'>
      <h2 className='font-bold text-sm border-b border-black mb-2'>
        SKILLS
      </h2>
      
      {Object.entries(groupedSkills || {}).map(([category, skills]) => (
        <div key={category} className="mb-2 print:mb-1">
          <h3 className="font-medium text-xs print:text-[11pt]">{category}:</h3>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="text-xs print:text-[11pt] px-2 py-0.5 bg-gray-100 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillsPreview;