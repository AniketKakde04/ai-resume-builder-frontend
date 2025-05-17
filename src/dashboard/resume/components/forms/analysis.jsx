import React, { useContext, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  LoaderCircle, 
  Brain, 
  CheckCircle, 
  AlertCircle, 
  Rocket,
  Search,
  Layers,
  FileText,
  Briefcase,
  GraduationCap,
  Trophy,
  Code2,
  Sparkles
} from 'lucide-react';
import { AIchatSession } from './../../../../../service/AIModal';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

function Analysis({ compact = false }) {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sectionIcons = {
    summary: <FileText className="h-4 w-4" />,
    skills: <Code2 className="h-4 w-4" />,
    experience: <Briefcase className="h-4 w-4" />,
    education: <GraduationCap className="h-4 w-4" />,
    projects: <Sparkles className="h-4 w-4" />,
    achievements: <Trophy className="h-4 w-4" />
  };

  const generateAnalysisPrompt = () => `
    Analyze this resume for a ${jobTitle.trim()} position against the provided job description. Provide:
    1. Top 10 ATS keywords with relevance scores and specific sections to add them
    2. Skill gaps with improvement strategies specific to ${jobTitle.trim()} role
    3. Key strengths aligned with ${jobTitle.trim()} requirements
    4. Skills hierarchy organized by importance for ${jobTitle.trim()}
    5. Match percentage specifically for ${jobTitle.trim()} role
    6. Role-specific edits for each resume section
    
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
      "ats_keywords": [{ 
        "keyword": "", 
        "score": 0, 
        "recommended_sections": [],
        "example_usage": ""
      }],
      "section_edits": {
        "summary": [],
        "skills": [],
        "experience": [],
        "education": [],
        "projects": [],
        "achievements": []
      },
      "skill_gaps": [{
        "skill": "",
        "importance": 0,
        "improvement_strategy": "",
        "resources": []
      }],
      "positives": [{
        "strength": "",
        "section": "",
        "impact": ""
      }],
      "skills_hierarchy": {
        "core": [],
        "advanced": [],
        "distinguishing": []
      },
      "match_percentage": 0,
      "role_specific_insights": ""
    }
  `;

  const handleAnalyze = async () => {
    if (!jobTitle.trim() || !jobDescription.trim()) {
      toast.error('Please enter both job title and description');
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
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Brain className="h-6 w-6 text-primary" />
          Targeted Resume Analysis
        </h2>
        <p className="text-muted-foreground text-sm">
          AI-powered analysis tailored to specific job roles
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <Input
            placeholder="Job Title (e.g., 'Senior Software Engineer')"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="text-sm border-2 focus:border-primary"
          />
          <Textarea
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here..."
            className="text-sm min-h-[120px] border-2 focus:border-primary"
          />
        </div>
        
        <Button
          className="w-full gap-2 font-medium theme-button"
          onClick={handleAnalyze}
          disabled={loading || !jobTitle.trim() || !jobDescription.trim()}
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
                <span className="text-sm font-medium">{jobTitle.trim()} MATCH SCORE</span>
              </div>
              <div className="text-5xl font-bold text-primary">
                {analysisResult.match_percentage}%
              </div>
              <div className="text-sm text-muted-foreground">
                {analysisResult.role_specific_insights}
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
              <h3 className="text-lg font-semibold">Keyword Optimization</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysisResult.ats_keywords?.map((kw, i) => (
                <div key={i} className="flex flex-col p-4 bg-muted/5 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{kw.keyword}</span>
                    <span className="text-sm font-medium text-blue-600">
                      Score: {kw.score}/10
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {kw.recommended_sections?.map((sec, j) => (
                      <Badge key={j} variant="secondary" className="capitalize">
                        {sectionIcons[sec]} {sec}
                      </Badge>
                    ))}
                  </div>
                  {kw.example_usage && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Example: "{kw.example_usage}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="bg-card p-6 rounded-xl border">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold">Skill Architecture</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <h4 className="font-medium text-purple-600 mb-3">Core Requirements</h4>
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
                <h4 className="font-medium text-green-600 mb-3">Unique Value</h4>
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

          {/* Skill Gaps & Improvements */}
          <div className="bg-card p-6 rounded-xl border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-emerald-600">
                  <CheckCircle className="h-5 w-5" />
                  <h4 className="font-semibold">Strategic Advantages</h4>
                </div>
                <ul className="space-y-3">
                  {analysisResult.positives?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
                      <div>
                        <div className="font-medium">{item.strength}</div>
                        <div className="text-muted-foreground text-xs">
                          {item.impact} ({item.section})
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-amber-600">
                  <AlertCircle className="h-5 w-5" />
                  <h4 className="font-semibold">Skill Development Plan</h4>
                </div>
                <ul className="space-y-3">
                  {analysisResult.skill_gaps?.map((gap, i) => (
                    <li key={i} className="text-sm">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                        <div>
                          <div className="font-medium">{gap.skill}</div>
                          <div className="text-muted-foreground">
                            {gap.improvement_strategy}
                          </div>
                          {gap.resources?.length > 0 && (
                            <div className="mt-1 text-xs text-blue-600">
                              Resources: {gap.resources.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
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