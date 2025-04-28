import { Loader2, PlusSquare, X } from 'lucide-react';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from '../../../service/GlobalApi';
import { useNavigate } from 'react-router';
import { useUser } from '@clerk/clerk-react';

function AddResume() {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const onCreate = async () => {
        setLoading(true);
        const uuid = uuidv4();
        const data = {
            data: {
                title: resumeTitle,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                resumeid: uuid,
                userName: user?.fullName,
            },
        };
        GlobalApi.CreateNewResume(data).then(
            (resp) => {
                if (resp) {
                    setLoading(false);
                    navigation(`/dashboard/resume/${resp.data.data.documentId}/edit`);
                }
            },
            (error) => {
                setLoading(false);
                console.log(error.response?.data || error.message);
            }
        );
    };

    return (
        <div>
            <div
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl h-48 md:h-56 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all group"
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare className="h-8 w-8 text-gray-300 group-hover:text-white transition-colors" />
            </div>
            
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="backdrop-blur-md bg-gray-900/80 border border-white/20 text-white max-w-[95%] md:max-w-md rounded-2xl max-h-[90vh] overflow-y-auto">
                    {/* Single Custom Close Button */}
                    <DialogClose asChild>
                        <Button
                            className="theme-button absolute right-4 top-4 h-9 w-9 p-2 z-50"
                            variant="ghost"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>

                    <DialogHeader>
                        <DialogTitle className="text-lg md:text-xl pr-12">New Resume</DialogTitle>
                        <DialogDescription className="mt-2 space-y-4">
                            <Input
                                className="bg-gray-800/20 border-gray-700 text-white placeholder-gray-400 text-sm md:text-base focus:ring-1 focus:ring-white"
                                placeholder="Enter resume title"
                                onChange={(e) => setResumeTitle(e.target.value)}
                            />
                            <div className="flex flex-col sm:flex-row justify-end gap-3 pb-4">
                                <Button
                                    disabled={!resumeTitle || loading}
                                    onClick={onCreate}
                                    className="theme-button w-full sm:w-auto"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin h-4 w-4 md:h-5 md:w-5" />
                                    ) : 'Create'}
                                </Button>
                                <Button 
                                    variant="outline"
                                    onClick={() => setOpenDialog(false)}
                                    className="theme-button w-full sm:w-auto"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddResume;
