import { Loader2, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
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
                className="h-[280px] p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white cursor-pointer hover:shadow-pink-500/20 transition-all"
                onClick={() => setOpenDialog(true)}
            >
                <PlusSquare className="h-8 w-8" />
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="backdrop-blur-md bg-white/10 border border-white/20 text-white">
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        
                        <DialogDescription>
                            <p className="mb-2">Add a title for your new resume</p>
                            <Input
                                className="my-2 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                                placeholder="Ex. Full Stack Resume"
                                onChange={(e) => setResumeTitle(e.target.value)}
                            />
                        </DialogDescription>
                        <div className="flex justify-end gap-5 mt-4">
                        <Button
    variant="ghost"
    onClick={() => setOpenDialog(false)}
    className="dialog-button"
>
    Cancel
</Button>
<Button
    disabled={!resumeTitle || loading}
    onClick={onCreate}
    className="dialog-button"
>
    {loading ? (
        <Loader2 className="animate-spin" />
    ) : (
        'Create'
    )}
</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddResume;