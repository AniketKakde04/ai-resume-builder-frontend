import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { Button } from '@/components/ui/button';
import { BarChart } from 'lucide-react';
import AnalysisPanel from '../../components/preview/AnalysisPanel';

function EditResume() {
    const {resumeId}=useParams();
    const [resumeInfo,setResumeInfo]=useState();
    const [showAnalysis, setShowAnalysis] = useState(false);

    useEffect(()=>{
        GetResumeInfo();
    },[])

    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
          setResumeInfo(resp.data.data);
        })
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      <div className='relative'>
        {/* Floating Analysis Toggle */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button 
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="shadow-lg flex gap-2 items-center theme-button p-4 rounded-full"
          >
            <BarChart size={18} />
            {showAnalysis ? 'Hide Insights' : 'Show Analysis'}
          </Button>
        </div>

        {/* Main Content */}
        <div className={`grid grid-cols-1 md:grid-cols-2 p-10 gap-10 transition-margin duration-300
          ${showAnalysis ? 'mr-[400px] lg:mr-[500px]' : ''}`}>
          <FormSection/>
          <ResumePreview/>
        </div>

        {/* Analysis Panel */}
        <AnalysisPanel show={showAnalysis} onClose={() => setShowAnalysis(false)}/>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume