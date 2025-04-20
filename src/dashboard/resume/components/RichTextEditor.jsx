import React from 'react';
import {
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnItalic,
  Toolbar,
  BtnLink,
  BtnBold,
  EditorProvider,
  Editor,
} from 'react-simple-wysiwyg';
import { useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { AIchatSession } from '../../../../service/AIModal';

const PROMPT = 'position title: {positionTitle}, Depends on position title give me 3-4 lines for my experience in resume written as paragraphs (Please do not add experience level and No JSON array), give me result in HTML tags';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo?.experience[index]?.title) {
      toast('Please Add Position Title');
      setLoading(false);
      return;
    }
    try {
      const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
      const result = await AIchatSession.sendMessage(prompt);
      const jsonResponse = JSON.parse(result.response.text());

      let htmlContent = '';
      Object.entries(jsonResponse).forEach(([key, value]) => {
        htmlContent += `<p>${value}</p>`;
      });

      setValue(htmlContent);
      onRichTextEditorChange({ target: { value: htmlContent } });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Responsive label and button layout */}
      <div className='flex flex-wrap items-center justify-between gap-2 my-2'>
        <label className='text-xs sm:text-sm font-medium'>Summary</label>
        <Button
          onClick={GenerateSummaryFromAI}
          className="theme-button px-3 py-1 text-xs sm:text-sm w-full sm:w-auto flex items-center gap-1 justify-center"
        >
          {loading ? (
            <LoaderCircle className='animate-spin w-4 h-4' />
          ) : (
            <>
              <Brain className='h-4 w-4 text-white' />
              Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
