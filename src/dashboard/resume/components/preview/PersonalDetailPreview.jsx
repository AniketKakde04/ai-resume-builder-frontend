import React from 'react'

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div className="text-center px-2 sm:px-4 print:px-0 print:mb-1 print:pt-2">
      <h2 
        className='font-bold text-xl print:text-[20pt] print:leading-tight print:mt-1'
        style={{ color: resumeInfo?.themeColor || '#000000' }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className='font-medium text-sm print:text-[12pt] print:mt-1'>
        {resumeInfo?.jobTitle}
      </h2>
      <h2 
        className='font-normal text-xs print:text-[10pt] print:mt-1'
        style={{ color: resumeInfo?.themeColor || '#000000' }}
      >
        {resumeInfo?.address}
      </h2>

      <div className='flex flex-col sm:flex-row justify-between gap-1 sm:gap-0 mt-2 text-xs print:mt-1 print:text-[9pt]'>
        <h2 style={{ color: resumeInfo?.themeColor || '#000000' }}>{resumeInfo?.phone}</h2>
        <h2 style={{ color: resumeInfo?.themeColor || '#000000' }}>{resumeInfo?.email}</h2>
      </div>

      <hr 
        className='border-[1.5px] my-2 print:my-1 print:border-[1px]' 
        style={{ 
          borderColor: resumeInfo?.themeColor || '#000000',
          backgroundColor: resumeInfo?.themeColor || '#000000'
        }} 
      />
    </div>
  )
}

export default PersonalDetailPreview;