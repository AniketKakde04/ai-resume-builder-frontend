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
  const [skillsList, setSkillsList] = useState([{ name: '', rating: 0 }])
  const { resumeId } = useParams()
  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  useEffect(() => {
    resumeInfo?.skills && setSkillsList(resumeInfo.skills)
  }, [])

  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList]
    newEntries[index][name] = value
    setSkillsList(newEntries)
  }

  const AddNewSkills = () => {
    setSkillsList([...skillsList, { name: '', rating: 0 }])
  }

  const RemoveSkills = () => {
    setSkillsList((prev) => prev.slice(0, -1))
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(resumeId, data).then(() => {
      setLoading(false)
      toast('Details updated!')
    }).catch(() => {
      setLoading(false)
      toast('Server Error, Try again!')
    })
  }

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, skills: skillsList })
  }, [skillsList])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your top professional key skills</p>

      {skillsList.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row justify-between items-center mb-4 border rounded-lg p-3 gap-4"
        >
          <div className="w-full sm:w-2/3">
            <label className="text-xs">Name</label>
            <Input
              className="w-full"
              defaultValue={item.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
            />
          </div>
      
        </div>
      ))}

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={AddNewSkills} className="theme-button">
            + Add Skill
          </Button>
          <Button variant="outline" onClick={RemoveSkills} className="theme-button">
            - Remove
          </Button>
        </div>
        <Button className="theme-button" disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Skills
