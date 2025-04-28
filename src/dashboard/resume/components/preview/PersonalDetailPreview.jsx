import React from 'react';

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div className="text-center space-y-[1mm] mb-[4mm]">
      <h1 className="font-bold text-[14pt] print:text-[13pt] leading-none"
        style={{ color: resumeInfo?.themeColor }}>
        {resumeInfo.firstName} {resumeInfo.lastName}
      </h1>
      <h2 className="font-medium text-[11pt] print:text-[10.5pt]">
        {resumeInfo.jobTitle}
      </h2>
      <div className="text-[9.5pt] print:text-[9pt] space-y-[0.5mm]">
        <p>{resumeInfo.address}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-[2mm]">
          <span>{resumeInfo.phone}</span>
          <span>{resumeInfo.email}</span>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetailPreview;