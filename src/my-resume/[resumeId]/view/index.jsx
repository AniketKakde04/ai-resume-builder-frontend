import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import html2pdf from 'html2pdf.js'
import Header from '../../../components/custom/Header'
import { Button } from '@/components/ui/button'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import GlobalApi from '@service/GlobalApi'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState(null)
  const { resumeId } = useParams()

  useEffect(() => {
    GlobalApi.GetResumeById(resumeId).then(resp => {
      setResumeInfo(resp.data.data)
    }).catch(err => {
      console.error('Failed to fetch resume:', err)
    })
  }, [resumeId])

  const HandleDownload = () => {
    const element = document.getElementById('resume-pdf')
    if (!element) return

    const options = {
      margin:       0.5,
      filename:     'My_Resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().set(options).from(element).save()
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {/* Header + Download Button */}
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:ms-36 text-center">
          <h2 className="text-2xl font-medium mb-2">
            Congratulations! Your AI generated resume is ready
          </h2>
          <p className="text-gray-400 mb-6">
            Now you are ready to download your resume and share the unique URL with friends.
          </p>
          <Button onClick={HandleDownload} className="theme-button">
            Download as PDF
          </Button>
        </div>
      </div>

      {/* Resume Content to Capture */}
      <div id="resume-pdf" className="my-10 mx-10 md:mx-20 lg:ms-36">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
