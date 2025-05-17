import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Analysis from '../forms/analysis';
export default function AnalysisPanel({ show, onClose }) {
  return (
    <div className={`fixed top-0 right-0 h-screen w-full md:w-[400px] lg:w-[500px] bg-background 
      border-l shadow-xl transition-transform duration-300 z-40
      ${show ? 'translate-x-0' : 'translate-x-full'}`}>
      
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-muted/50">
          <h2 className="text-xl font-bold">Resume Analysis</h2>
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="hover:bg-muted rounded-full theme-button"
            aria-label="Close analysis panel"
          >
            <X size={18} />
          </Button>
        </div>
        
        {/* Analysis Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Analysis compact={true} />
        </div>
      </div>
    </div>
  )
}