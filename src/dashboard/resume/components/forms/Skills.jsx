import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
function Skills() {

    const [skillsList,setSkillsList]=useState([{
        name:'',
        rating:0
    }])
    const {resumeId}=useParams();

    const [loading,setLoading]=useState(false);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
   
    useEffect(()=>{
        resumeInfo&&setSkillsList(resumeInfo?.skills)
      },[])
   
    const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice();
      
        newEntries[index][name]=value;
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:'',
        rating:0 
        }])
    }
    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
    }

    const onSave=()=>{

        setLoading(true);
        const data={
            data:{
                skills:skillsList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId,data)
        .then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
            toast('Server Error, Try again!')
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            skills:skillsList
        })
    },[skillsList])
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Skills</h2>
    <p>Add Your top professional key skills</p>

    <div>
        {skillsList.map((item,index)=>(
            <div key={index} className='flex justify-between mb-2 border rounded-lg p-3 '>
                <div>
                    <label className='text-xs'>Name</label>
                    <Input className="w-full"
                    defaultValue={item.name}
                    onChange={(e)=>handleChange(index,'name',e.target.value)} />
                </div>
                <Rating style={{ maxWidth: 120 }} value={item.rating||0} 
                onChange={(v)=>handleChange(index,'rating',v)}/>

            </div>
        ))}
    </div>
    <div className='flex justify-between'>
  <div className='flex gap-2'>
    <Button className="bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition" onClick={AddNewSkills}>+ Add More Skill</Button>
    <Button className="bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition" onClick={RemoveSkills}>- Remove</Button>
  </div>
  <Button
    disabled={loading}
    onClick={onSave}
    className={`px-4 py-2 rounded-md flex items-center gap-2 font-semibold transition ${
      loading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-pink-600 text-white hover:bg-pink-700'
    }`}
  >
    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
  </Button>
</div>

    </div>
  )
}

export default Skills