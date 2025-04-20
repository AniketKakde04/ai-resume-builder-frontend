import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

function Education() {
  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()
  const [educationalList, setEducationalList] = useState([
    { universityName: '', degree: '', major: '', startDate: '', endDate: '', description: '' }
  ])

  useEffect(() => {
    resumeInfo && setEducationalList(resumeInfo?.education)
  }, [])

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice()
    const { name, value } = event.target
    newEntries[index][name] = value
    setEducationalList(newEntries)
  }

  const AddNewEducation = () => {
    setEducationalList([...educationalList, {
      universityName: '', degree: '', major: '', startDate: '', endDate: '', description: ''
    }])
  }

  const RemoveEducation = () => {
    setEducationalList((prev) => prev.slice(0, -1))
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(() => {
      setLoading(false)
      toast('Details updated!')
    }).catch(() => {
      setLoading(false)
      toast('Server Error, Please try again!')
    })
  }

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, education: educationalList })
  }, [educationalList])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>

      {educationalList.map((item, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-3 my-5 rounded-lg">
          <div className="sm:col-span-2">
            <label>University Name</label>
            <Input name="universityName" className="w-full" onChange={(e) => handleChange(e, index)} defaultValue={item.universityName} />
          </div>
          <div>
            <label>Degree</label>
            <Input name="degree" className="w-full" onChange={(e) => handleChange(e, index)} defaultValue={item.degree} />
          </div>
          <div>
            <label>Major</label>
            <Input name="major" className="w-full" onChange={(e) => handleChange(e, index)} defaultValue={item.major} />
          </div>
          <div>
            <label>Start Date</label>
            <Input type="date" name="startDate" className="w-full" onChange={(e) => handleChange(e, index)} defaultValue={item.startDate} />
          </div>
          <div>
            <label>End Date</label>
            <Input type="date" name="endDate" className="w-full" onChange={(e) => handleChange(e, index)} defaultValue={item.endDate} />
          </div>
          <div className="sm:col-span-2">
            <label>Description</label>
            <Textarea name="description" className="w-full" onChange={(e) => handleChange(e, index)} defaultValue={item.description} />
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewEducation} className="theme-button">+ Add More</Button>
          <Button variant="outline" onClick={RemoveEducation} className="theme-button">- Remove</Button>
        </div>
        <Button className="theme-button" disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Education
