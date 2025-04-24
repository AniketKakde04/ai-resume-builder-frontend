import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

function Projects() {
  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()
  const [projectsList, setProjectsList] = useState([
    { projectName: '', description: '', technologies: '', link: '' }
  ])

  useEffect(() => {
    resumeInfo && setProjectsList(resumeInfo?.projects || [])
  }, [])

  const handleChange = (event, index) => {
    const newEntries = projectsList.slice()
    const { name, value } = event.target
    newEntries[index][name] = value
    setProjectsList(newEntries)
  }

  const AddNewProject = () => {
    setProjectsList([...projectsList, {
      projectName: '', description: '', technologies: '', link: ''
    }])
  }

  const RemoveProject = () => {
    setProjectsList((prev) => prev.slice(0, -1))
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        projects: projectsList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(() => {
      setLoading(false)
      toast('Project details updated!')
    }).catch(() => {
      setLoading(false)
      toast('Server Error, Please try again!')
    })
  }

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, projects: projectsList })
  }, [projectsList])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Projects</h2>
      <p>Add details about your projects</p>

      {projectsList.map((item, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-3 my-5 rounded-lg">
          <div className="col-span-1 sm:col-span-2">
            <label>Project Name</label>
            <Input name="projectName" className="w-full" onChange={(e) => handleChange(e, index)} defaultValue={item.projectName} />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label>Description</label>
            <Textarea name="description" className="w-full" onChange={(e) => handleChange(e, index)} defaultValue={item.description} />
          </div>
          <div>
            <label>Technologies Used</label>
            <Input name="technologies" className="w-full" onChange={(e) => handleChange(e, index)} defaultValue={item.technologies} />
          </div>
          <div>
            <label>Project Link</label>
            <Input name="link" className="w-full" onChange={(e) => handleChange(e, index)} defaultValue={item.link} />
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={AddNewProject} className="theme-button">+ Add More</Button>
          <Button variant="outline" onClick={RemoveProject} className="theme-button">- Remove</Button>
        </div>
        <Button className="theme-button" disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Projects