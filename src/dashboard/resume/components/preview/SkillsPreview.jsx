import React from 'react'

function SkillsPreview({ resumeInfo }) {
  return (
    <div style={{ marginTop: '1.5rem', padding: '0 1rem' }}>
      <h2
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '0.875rem',
          marginBottom: '0.5rem',
          color: resumeInfo?.themeColor || '#000',
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact'
        }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor || '#000',
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact'
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
        {resumeInfo?.skills?.map((skill, index) => {
          const widthPercent = Math.min(skill?.rating * 20, 100)

          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.75rem', minWidth: '80px' }}>{skill.name}</div>

              {/* Rating bar */}
              <div
                style={{
                  height: '8px',
                  width: '100%',
                  maxWidth: '120px',
                  backgroundColor: '#e5e7eb', // fallback grey
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  printColorAdjust: 'exact',
                  WebkitPrintColorAdjust: 'exact'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${widthPercent}%`,
                    backgroundColor: resumeInfo?.themeColor || '#000',
                    borderRadius: '9999px',
                    printColorAdjust: 'exact',
                    WebkitPrintColorAdjust: 'exact'
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillsPreview
