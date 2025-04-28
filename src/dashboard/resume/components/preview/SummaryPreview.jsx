import React from 'react';

function SummaryPreview({ resumeInfo }) {
  return (
    <div className="text-[10pt] print:text-[9.5pt] leading-tight text-center">
      {resumeInfo.summary}
    </div>
  );
}

export default SummaryPreview;