import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import  { Button } from '@/components/ui/button'
import RichTextEditor from '../RichTextEditor'
import { useEffect } from 'react'
import { useContext } from 'react'
import { toast } from 'sonner'

import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react'
import GlobalApi from './../../../../../service/GlobalApi';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '',
};

function Experience() {
    const [experienceList, setExperienceList] = useState([ { ...formField } ]); // Create a copy of formField
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading,setLoading]=useState(false);
    const params=useParams();

    useEffect(()=>{
        resumeInfo?.experience.length>0&&setExperienceList(resumeInfo?.experience)
        
    },[])

    const handleChange = (index, event) => {
        const newEntries = [...experienceList]; // Create a new array
        const { name, value } = event.target;
        newEntries[index][name] = value; // Update the specific field
        setExperienceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperienceList([...experienceList, { ...formField }]); // Add a new copy of formField
    };

    const RemoveExperience = () => {
        setExperienceList((prevList) => prevList.slice(0, -1)); // Remove the last experience
    };

    const handleRichTextEditor = (value, name, index) => {
        const newEntries = [...experienceList];
        // Extract the HTML content from the event object
        const htmlContent = value.target.value;
        newEntries[index] = {
            ...newEntries[index],
            workSummary: htmlContent
        };
        setExperienceList(newEntries);
        
        // Update resumeInfo context
        setResumeInfo(prev => ({
            ...prev,
            experience: newEntries
        }));
    };
    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList,
        });
    }, [experienceList]);


    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                experience:experienceList.map(({ id, ...rest }) => rest)
            }
        }

         console.log(experienceList);

         GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
            console.log(res);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
        })

    }
    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Professional Experience</h2>
                <p>Add your previous job experience</p>
                <div>
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                                <div>
                                    <label className="text-xs">Position Title</label>
                                    <Input
                                        name="title"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.title} // Use value instead of defaultValue
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Company Name</label>
                                    <Input
                                        name="companyName"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.companyName} // Use value instead of defaultValue
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">City</label>
                                    <Input
                                        name="city"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.city} // Use value instead of defaultValue
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">State</label>
                                    <Input
                                        name="state"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.state} // Use value instead of defaultValue
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Start Date</label>
                                    <Input
                                        type="date"
                                        name="startDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.startDate} // Use value instead of defaultValue
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">End Date</label>
                                    <Input
                                        type="date"
                                        name="endDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.endDate} // Use value instead of defaultValue
                                    />
                                </div>
                                <div className="col-span-2">
                                    {/* Work Summary */}
                                    <RichTextEditor
    index={index}
    defaultValue={item?.workSummary || ''} // Provide default empty string
    onRichTextEditorChange={(value) =>
        handleRichTextEditor(value, 'workSummary', index)
    }
/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between">
  <div className="gap-2 flex">
    <Button className="bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition" onClick={AddNewExperience}>+ Add More Experience</Button>
    <Button className="bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition" onClick={RemoveExperience}>- Remove</Button>
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
        </div>
    );
}

export default Experience;