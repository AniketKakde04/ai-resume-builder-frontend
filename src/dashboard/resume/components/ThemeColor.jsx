import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function ThemeColor() {
    const colors = [
        "#000000", "#4A4A4A", "#D3D3D3", "#FFFFFF", "#001F3F",
        "#36454F", "#4682B4", "#708090", "#008080", "#228B22",
        "#800020", "#556B2F", "#AFEEEE", "#F5F5DC", "#E6E6FA",
        "#98FB98", "#F08080"
    ]

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState();
    const { resumeId } = useParams();

    const onColorSelect = (color) => {
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        });
        const data = {
            data: {
                themeColor: color
            }
        }
        GlobalApi.UpdateResumeDetail(resumeId, data).then(resp => {
            console.log(resp);
            toast('Theme Color Updated')
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    className="theme-button" // Assign a custom class
                >
                    <LayoutGrid /> Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="bg-white shadow-lg border border-gray-300 rounded-md p-4 z-50"
            >
                <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
                <div className='grid grid-cols-5 gap-3'>
                    {colors.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => onColorSelect(item)}
                            className={`h-5 w-5 rounded-full cursor-pointer
                                hover:border-black border
                                ${selectedColor === item && 'border border-black'}
                            `}
                            style={{
                                background: item
                            }}
                        >
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ThemeColor