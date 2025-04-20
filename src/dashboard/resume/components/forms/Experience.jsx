import React, { useState, useEffect, useContext } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import GlobalApi from './../../../../../service/GlobalApi'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummary: ''
}

function Experience() {
  const [experienceList, setExperienceList] = useState([{ ...formField }])
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [loading, setLoading] = useState(false)
  const params = useParams()

  useEffect(() => {
    resumeInfo?.experience?.length > 0 && setExperienceList(resumeInfo.experience)
  }, [])

  const handleChange = (index, event) => {
    const newEntries = [...experienceList]
    const { name, value } = event.target
    newEntries[index][name] = value
    setExperienceList(newEntries)
  }

  const handleRichTextEditor = (value, name, index) => {
    const htmlContent = value.target.value
    const newEntries = [...experienceList]
    newEntries[index][name] = htmlContent
    setExperienceList(newEntries)
    setResumeInfo(prev => ({ ...prev, experience: newEntries }))
  }

  const AddNewExperience = () => {
    setExperienceList([...experienceList, { ...formField }])
  }

  const RemoveExperience = () => {
    setExperienceList(prev => prev.slice(0, -1))
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest)
      }
    }
    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then(() => {
        setLoading(false)
        toast('Details updated!')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, experience: experienceList })
  }, [experienceList])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your previous job experience</p>

      {experienceList.map((item, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-3 my-5 rounded-lg">
          <div>
            <label className="text-xs">Position Title</label>
            <Input name="title" className="w-full" defaultValue={item.title} onChange={(e) => handleChange(index, e)} />
          </div>
          <div>
            <label className="text-xs">Company Name</label>
            <Input name="companyName" className="w-full" defaultValue={item.companyName} onChange={(e) => handleChange(index, e)} />
          </div>
          <div>
            <label className="text-xs">City</label>
            <Input name="city" className="w-full" defaultValue={item.city} onChange={(e) => handleChange(index, e)} />
          </div>
          <div>
            <label className="text-xs">State</label>
            <Input name="state" className="w-full" defaultValue={item.state} onChange={(e) => handleChange(index, e)} />
          </div>
          <div>
            <label className="text-xs">Start Date</label>
            <Input type="date" name="startDate" className="w-full" defaultValue={item.startDate} onChange={(e) => handleChange(index, e)} />
          </div>
          <div>
            <label className="text-xs">End Date</label>
            <Input type="date" name="endDate" className="w-full" defaultValue={item.endDate} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="text-xs">Work Summary</label>
            <RichTextEditor
              index={index}
              defaultValue={item?.workSummary || ''}
              onRichTextEditorChange={(value) =>
                handleRichTextEditor(value, 'workSummary', index)
              }
            />
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
        <div className="flex gap-2 flex-wrap">
          <Button className="theme-button" onClick={AddNewExperience}>+ Add More Experience</Button>
          <Button className="theme-button" onClick={RemoveExperience}>- Remove</Button>
        </div>
        <Button className="theme-button" disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Experience
