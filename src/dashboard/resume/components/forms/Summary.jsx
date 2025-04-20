import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIchatSession } from './../../../../../service/AIModal'

const prompt =
  'Job Title: {jobTitle} , Depends on job title give me list of summary for 3 experience level, Mid Level and Fresher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format'

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [summary, setSummary] = useState()
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState()

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      })
  }, [summary])

  const GenerateSummaryFromAI = async () => {
    setLoading(true)
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle)
    const result = await AIchatSession.sendMessage(PROMPT)
    const parsed = JSON.parse(result.response.text())
    setAiGenerateSummaryList(parsed)
    setLoading(false)
  }

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      data: {
        summary: summary,
      },
    }
    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then(() => {
        enabledNext(true)
        setLoading(false)
        toast('Details updated')
      })
      .catch(() => setLoading(false))
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summary</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">Add a summary for your job title</p>

      <form className="mt-6" onSubmit={onSave}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <label className="font-medium">Add Summary</label>
          <Button type="button" size="sm" onClick={GenerateSummaryFromAI} className="theme-button flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Generate from AI
          </Button>
        </div>

        <Textarea
          className="mt-4 w-full"
          required
          value={summary}
          defaultValue={summary || resumeInfo?.summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <div className="mt-4 flex justify-end">
          <Button type="submit" className="theme-button" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>

      {aiGeneratedSummaryList && (
        <div className="my-6">
          <h2 className="font-bold text-lg mb-2">AI Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item?.summary)}
              className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 shadow cursor-pointer transition hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <h3 className="text-primary font-semibold mb-1">Level: {item?.experience_level}</h3>
              <p className="text-sm">{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Summary
