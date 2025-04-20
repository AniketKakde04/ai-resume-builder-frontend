import React from 'react'
import Header from "../../../components/custom/Header"
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import { useState } from 'react'    
import { useEffect } from 'react'
import { RWebShare } from "react-web-share";

import GlobalApi from '@service/GlobalApi'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
function ViewResume() {

    const [resumeInfo,setResumeInfo]=useState();
    const {resumeId}=useParams();

    useEffect(()=>{
        GetResumeInfo();
    },[])
    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }
    const HandleDownload=()=>{
        window.print();
    }
  
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
        <div id="no-print">
            <Header/>
        <div className='my-10 mx-10 md:mx-20 lg:ms-36'>
            <h2 className='text-center text-2xl font-medium'>Congratulations! Your AI generated resume is ready</h2>
            <p className='text-center text-gray-400'>Now you are ready to download resume and you can share unique url with your friends</p>
            <div className='flex justify-center px-44 my-10'>
                <Button onClick={HandleDownload} className="theme-button">Download</Button>

            </div>
            </div>
          
        </div>
        <div>
        <div id="print-area" className='my-10 mx-10 md:mx-20 lg:ms-36'>
                <ResumePreview/>
            </div>
            </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume