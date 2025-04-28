import React from 'react'

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div className="text-center mb-4 print:mb-2">
      <h1 className='font-bold text-xl print:text-lg leading-tight'
        style={{ color: resumeInfo?.themeColor }}>
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>
      <h2 className='font-medium text-sm print:text-xs mt-1 print:mt-0'>
        {resumeInfo?.jobTitle}
      </h2>
      <div className='text-xs print:text-[9pt] mt-1 print:mt-0 space-y-0.5'>
        <p>{resumeInfo?.address}</p>
        <div className='flex flex-col sm:flex-row justify-center gap-1 print:gap-0.5'>
          <span>{resumeInfo?.phone}</span>
          <span>{resumeInfo?.email}</span>
        </div>
      </div>
    </div>
  )
}

export default PersonalDetailPreview;