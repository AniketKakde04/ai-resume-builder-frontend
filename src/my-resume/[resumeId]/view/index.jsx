import React, { useState, useEffect } from 'react'
import Header from "../../../components/custom/Header"
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import { RWebShare } from "react-web-share";
import GlobalApi from '@service/GlobalApi'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, [])

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload = () => {
        window.print();
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <Header />
                <div className='my-4 mx-4 md:mx-6 lg:mx-8'>
                    <h2 className='text-center text-xl font-medium'>Congratulations! Your AI generated resume is ready</h2>
                    <p className='text-center text-gray-400 text-sm'>Now you are ready to download resume and you can share unique url with your friends</p>
                    <div className='flex justify-center my-4'>
                        <Button onClick={HandleDownload} className="theme-button">Download</Button>
                    </div>
                </div>
            </div>

            <style>
                {`
                    @media print {
                        @page {
                            size: A4;
                            margin: 8mm;
                        }
                        
                        #no-print {
                            display: none !important;
                        }
                        
                        #print-area {
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                            max-width: none !important;
                        }
                        
                        body {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                            margin: 0;
                            padding: 0;
                        }
                        
                        * {
                            box-sizing: border-box;
                        }
                    }
                `}
            </style>

            <div>
                <div id="print-area" className='mx-auto max-w-[850px] print:max-w-none print:mx-0'>
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume

