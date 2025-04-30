import { Loader2Icon, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      toast.success('Resume deleted');
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      setLoading(false);
      toast.error('Deletion failed');
    });
  }

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl overflow-hidden hover:shadow-lg transition-all">
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className="aspect-square flex items-center justify-center p-4 md:p-6">
          <img 
            src="/cv.png" 
            alt="Resume" 
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
            style={{ filter: `drop-shadow(0 0 12px ${resume?.themeColor}40)` }}
          />
        </div>
      </Link>

      <div className="p-3 md:p-4 flex items-center justify-between border-t border-white/20">
        <h3 className="text-sm md:text-base font-medium truncate max-w-[70%]">
          {resume.title}
        </h3>
        
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
  <div className="bg-white p-1.5 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
    <MoreVertical className="h-4 w-4 md:h-5 md:w-5 text-black" />
  </div>
</DropdownMenuTrigger>



          <DropdownMenuContent className="backdrop-blur-md bg-gray-900/80 border border-white/20 text-white min-w-[140px]">
            <DropdownMenuItem
              className="text-sm hover:bg-white/10"
              onClick={() => navigation(`/dashboard/resume/${resume.documentId}/edit`)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-sm hover:bg-white/10"
              onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}
            >
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-sm text-red-300 hover:bg-red-500/20"
              onClick={() => setOpenAlert(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent className="backdrop-blur-md bg-gray-900/80 border border-white/20 text-white max-w-[90%] rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-base md:text-lg">
                Confirm Deletion
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm md:text-base">
                This will permanently delete "{resume.title}". This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel 
                className="hover:bg-white/10 text-black"
                onClick={() => setOpenAlert(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={onDelete} 
                disabled={loading}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300"
              >
                {loading ? (
                  <Loader2Icon className="animate-spin h-4 w-4" />
                ) : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;