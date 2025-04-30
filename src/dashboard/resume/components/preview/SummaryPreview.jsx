// SummaryPreview.jsx
import React from 'react'

function SummaryPreview({ resumeInfo }) {
  return (
    <div className="px-2 sm:px-4 print:my-4">
      <p className='text-xs leading-relaxed print:text-[10pt] print:leading-snug'>
        {resumeInfo?.summary}
      </p>
    </div>
  )
}

export default SummaryPreview