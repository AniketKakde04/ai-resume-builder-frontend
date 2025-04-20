import React from 'react'

function SummaryPreview({ resumeInfo }) {
  return (
    <div className="px-2 sm:px-4">
      <p className='text-xs leading-relaxed'>
        {resumeInfo?.summary}
      </p>
    </div>
  )
}

export default SummaryPreview
