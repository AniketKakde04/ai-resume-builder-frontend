import React, { useRef, useState, useEffect } from 'react'
import Header from "../../../components/custom/Header"
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import { RWebShare } from "react-web-share"
import GlobalApi from '@service/GlobalApi'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import ReactToPrint from 'react-to-print'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState()
  const { resumeId } = useParams()
  const componentRef = useRef()

  useEffect(() => {
    GetResumeInfo()
  }, [])

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(resp => {
      setResumeInfo(resp.data.data)
    })
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className='my-10 mx-10 md:mx-20 lg:ms-36'>
          <h2 className='text-center text-2xl font-medium'>
            Congratulations! Your AI generated resume is ready
          </h2>
          <p className='text-center text-gray-400'>
            Now you are ready to download resume and you can share unique url with your friends
          </p>

          {/* React-to-Print Button */}
          <div className='flex justify-center px-44 my-10'>
            <ReactToPrint
              trigger={() => <Button className="theme-button">Download</Button>}
              content={() => componentRef.current}
              documentTitle="My_Resume"
              pageStyle={`
                @page { margin: 20mm }
                @media print {
                  body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                  }
                }
              `}
            />
          </div>
        </div>
      </div>

      {/* Resume content to print */}
      <div ref={componentRef}>
        <div className='my-10 mx-10 md:mx-20 lg:ms-36'>
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
