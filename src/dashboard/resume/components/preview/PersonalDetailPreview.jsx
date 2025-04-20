import React from 'react'

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div className="text-center px-2 sm:px-4">
      <h2 className='font-bold text-xl'
        style={{ color: resumeInfo?.themeColor }}>
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className='font-medium text-sm'>{resumeInfo?.jobTitle}</h2>
      <h2 className='font-normal text-xs'
        style={{ color: resumeInfo?.themeColor }}>
        {resumeInfo?.address}
      </h2>

      <div className='flex flex-col sm:flex-row justify-between gap-1 sm:gap-0 mt-2 text-xs'>
        <h2 style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.phone}</h2>
        <h2 style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.email}</h2>
      </div>

      <hr className='border-[1.5px] my-2' style={{ borderColor: resumeInfo?.themeColor }} />
    </div>
  )
}

export default PersonalDetailPreview
