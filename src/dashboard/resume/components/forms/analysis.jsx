import React, { useContext, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import { 
  LoaderCircle, 
  Brain, 
  CheckCircle, 
  AlertCircle, 
  Rocket,
  Search,
  Layers
} from 'lucide-react';
import { AIchatSession } from './../../../../../service/AIModal';
import { toast } from 'sonner';

function Analysis({ compact = false }) {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateAnalysisPrompt = () => `
    Analyze this resume against the job description. Provide:
    1. Top 10 ATS keywords with relevance scores
    2. Skill gaps and improvements
    3. Key strengths
    4. Skills hierarchy
    5. Match percentage
    
    Resume: ${JSON.stringify({
      summary: resumeInfo?.summary,
      experience: resumeInfo?.experience,
      skills: resumeInfo?.skills,
      education: resumeInfo?.education,
      projects: resumeInfo?.projects,
      achievements: resumeInfo?.achievements
    })}
    
    Job Description: ${jobDescription.trim()}
    
    Respond in JSON format:
    {
      "ats_keywords": [{ "keyword": "", "score": 0, "placement": "" }],
      "skill_gaps": [],
      "improvements": [],
      "positives": [],
      "skills_hierarchy": {
        "core": [],
        "advanced": [],
        "distinguishing": []
      },
      "match_percentage": 0
    }
  `;

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    setLoading(true);
    setAnalysisResult(null);

    try {
      const prompt = generateAnalysisPrompt();
      const result = await AIchatSession.sendMessage(prompt);
      const parsed = JSON.parse(result.response.text());
      setAnalysisResult(parsed);
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${compact ? 'p-2' : 'p-4 md:p-6'} space-y-6`}>
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Brain className="h-6 w-6 text-primary" />
          Resume Analysis
        </h2>
        <p className="text-muted-foreground text-sm">
          Get AI-powered insights to optimize your resume
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <Textarea
          rows={4}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="text-sm min-h-[120px] border-2 focus:border-primary"
        />
        <Button
          className="w-full gap-2 font-medium"
          onClick={handleAnalyze}
          disabled={loading || !jobDescription.trim()}
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            <>
              <Rocket className="h-4 w-4" />
              Analyze Now
            </>
          )}
        </Button>
      </div>

      {analysisResult && (
        <div className="space-y-6">
          {/* Match Score Card */}
          <div className="bg-card p-6 rounded-xl border">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">MATCH SCORE</span>
              </div>
              <div className="text-5xl font-bold text-primary">
                {analysisResult.match_percentage}%
              </div>
              <Progress 
                value={analysisResult.match_percentage} 
                className="h-2 bg-muted"
                indicatorClassName="bg-primary"
              />
            </div>
          </div>

          {/* ATS Keywords Section */}
          <div className="bg-card p-6 rounded-xl border">
            <div className="flex items-center gap-3 mb-6">
              <Search className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">ATS Keywords</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysisResult.ats_keywords?.map((kw, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/5 rounded-lg border">
                  <div className="space-y-1">
                    <span className="font-medium">{kw.keyword}</span>
                    <p className="text-xs text-muted-foreground">{kw.placement}</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    Score: {kw.score}/10
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Hierarchy Section */}
          <div className="bg-card p-6 rounded-xl border">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold">Skill Breakdown</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <h4 className="font-medium text-purple-600 mb-3">Core Skills</h4>
                <div className="space-y-2">
                  {analysisResult.skills_hierarchy?.core?.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 bg-purple-600 rounded-full" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <h4 className="font-medium text-blue-600 mb-3">Advanced Skills</h4>
                <div className="space-y-2">
                  {analysisResult.skills_hierarchy?.advanced?.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 bg-blue-600 rounded-full" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <h4 className="font-medium text-green-600 mb-3">Unique Skills</h4>
                <div className="space-y-2">
                  {analysisResult.skills_hierarchy?.distinguishing?.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 bg-green-600 rounded-full" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Improvements Section */}
          <div className="bg-red-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-2 text-red-600">Improvements</h4>
            <ul className="list-disc pl-4 space-y-2">
              {analysisResult.improvements?.map((item, i) => (
                <li key={i} className="text-red-800">{item}</li>
              ))}
            </ul>
          </div>

          {/* Strengths & Gaps Section */}
          <div className="bg-card p-6 rounded-xl border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-emerald-600">
                  <CheckCircle className="h-5 w-5" />
                  <h4 className="font-semibold">Strengths</h4>
                </div>
                <ul className="space-y-3">
                  {analysisResult.positives?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-amber-600">
                  <AlertCircle className="h-5 w-5" />
                  <h4 className="font-semibold">Skill Gaps</h4>
                </div>
                <ul className="space-y-3">
                  {analysisResult.skill_gaps?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analysis;