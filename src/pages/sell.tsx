import { NavBar } from '@/components/navbar';
import { SubjectCombo } from '@/components/subject-combo';
import { Input } from '@/components/ui/input';
import { UniversityCombo } from '@/components/univ-combo';
import { Label } from "@/components/ui/label"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { startReviewNote } from '@/handlers/review-handler';
import { uploadPdfToStorage } from '@/api/file-api';

const Sell = () => {
    const [file, setFile] = useState<Blob | null>(null); 
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [grade, setGrade] = useState<number>()
    const [year, setYear] = useState<number>()
    const [university, setUniversity] = useState<string>("")
    const [subject, setSubject] = useState<string>("")

    function saveFile(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file && file.type === "application/pdf") {
          setFile(file);
        } else {
          console.error("Please select a valid PDF file.");
        }
      }

    const handleUpload = () => {
        if (!file) {
            console.error("No PDF selected");
            return;
        }
        // const fileUrl = uploadPdfToStorage(file)
        // startReviewNote

        
    }

    return (
        <div className="w-screen h-screen flex flex-col overflow-y-scroll font-itim">
            <NavBar />
            <div className='flex p-10 px-44 justify-center items-center space-x-2'>
                <div className='text-red-400'>
                    Upload notes
                </div>
                <Separator className='w-[10%] rounded-full'/>
                <div className='text-gray-400'>
                    Reviewing notes
                </div>
                <Separator className='w-[10%] rounded-full'/>
                <div className='text-gray-400'>
                    Reviewing result
                </div>
            </div>
            <Separator />
            <div className='flex flex-col py-10 px-44 space-y-5'>
                <div className='flex space-x-5 justify-center'>
                    <Input 
                        className='w-[50%]'
                        placeholder='Note title'
                        type='text'
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}}
                    />
                        <Input 
                            className='w-[25%]'
                            placeholder='Grade'
                            type='number'
                            value={grade}
                            onChange={(e) => {setGrade(parseInt(e.target.value))}}
                            min={1}
                        />
                </div>
                <div className='flex space-x-5 justify-center'>
                    <Textarea
                        className='w-[77%]'
                        placeholder='Note description'
                        value={desc}
                        onChange={(e) => {setDesc(e.target.value)}}
                    />
                </div>
                <div className='flex space-x-5 justify-center'>
                    <UniversityCombo 
                        onUniversitySelect={setUniversity}
                    />
                    <SubjectCombo 
                        onSubjectSelect={setSubject} 
                    />
                    <Input 
                        className='w-[10%]'
                        placeholder='Year'
                        type='number'
                        value={year}
                        onChange={(e) => {setYear(parseInt(e.target.value)); console.log(year)}}
                        min={2000}
                    />
                </div>
                <div className="flex flex-col space-y-1.5 px-32">
                    <Label htmlFor="pdf">{"File (.pdf)"}</Label>
                    <Input 
                        id="pdf" 
                        type="file" 
                        accept="application/pdf"
                        onChange={saveFile}
                    />
                </div>
            </div>
            <div className='flex flex-col px-44 justify-center items-center'>
                <Button
                    variant="destructive"
                >
                    Upload note
                </Button>
            </div>
        </div>
    );
};

export default Sell;