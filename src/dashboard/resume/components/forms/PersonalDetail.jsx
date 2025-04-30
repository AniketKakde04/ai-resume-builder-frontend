import React, { useEffect, useState, useContext } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

function PersonalDetail({ enabledNext }) {
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    enabledNext(false)
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setResumeInfo({ ...resumeInfo, [name]: value })
  }

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = { data: formData }

    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then(() => {
        enabledNext(true)
        setLoading(false)
        toast('Details updated')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} className="w-full" />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} className="w-full" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} className="w-full" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} className="w-full" />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} className="w-full" />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} className="w-full" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm">LinkedIn URL</label>
            <Input 
              name="linkedin" 
              defaultValue={resumeInfo?.linkedin} 
              onChange={handleInputChange} 
              className="w-full"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm">GitHub URL</label>
            <Input 
              name="github" 
              defaultValue={resumeInfo?.github} 
              onChange={handleInputChange} 
              className="w-full"
              placeholder="https://github.com/username"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit" className="theme-button" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetail