import { NavBar } from '@/components/navbar';
import { SubjectCombo } from '@/components/subject-combo';
import { Input } from '@/components/ui/input';
import { UniversityCombo } from '@/components/univ-combo';
import { Label } from "@/components/ui/label";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { startReviewNote, updateNoteReviewResult } from '@/handlers/review-handler';
import { uploadPdfToStorage } from '@/api/file-api';
import { getAuth } from 'firebase/auth';
import { getCurrentUserId, getUserById } from '@/api/user-api';
import { Timestamp } from 'firebase/firestore';
import { Note } from '@/interfaces/general/note';
import { ReviewResult } from '@/interfaces/enum/review_enum';

const Sell = () => {
    const [file, setFile] = useState<Blob | null>(null);
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [grade, setGrade] = useState<number>();
    const [year, setYear] = useState<number>();
    const [university, setUniversity] = useState<string>('');
    const [subject, setSubject] = useState<string>('');

    function clearField() {
        setTitle('');
        setDesc('');
        setUniversity('');
        setSubject('');
    }

    function saveFile(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setFile(file);
        } else {
            console.error("Please select a valid PDF file.");
        }
    }

    const handleUpload = async () => {
        if (!file) {
            console.error("No PDF selected");
            return;
        }
        const userId = await getCurrentUserId();
        const user = await getUserById(userId);
        if (!user) {
            console.error("User not logged in");
            return;
        }

        const note: Note = {
            title: title,
            description: desc,
            writerId: userId,
            price: 17500,
            subject: subject,
            releaseDate: Timestamp.fromDate(new Date()),
            fileId: '',
            university: university,
            grade: grade,
            score: 0,
            bundleId: null,
            thumbnailUrl: "https://example.com/thumbnail.jpg",
            totalPages: 100,
            ranking: 2,
        };

        const uploaded = await startReviewNote(userId, note, file);
        clearField();

        console.log("Upload successful");

        await updateNoteReviewResult(uploaded.id, ReviewResult.Accepted);
    };

    return (
        <div className="w-screen h-screen flex flex-col overflow-y-scroll font-itim">
            <NavBar />

            <div className='flex p-5 md:p-10 md:px-44 justify-center items-center space-x-2'>
                <div className='text-red-400 flex flex-col items-center'>
                    <img src='/check.png' className='w-16 md:w-20' />
                    <p className="text-center md:text-left">Upload notes</p>
                </div>
                <Separator className='w-[10%] h-1 md:h-2 rounded-full' />
                <div className='text-gray-400 flex flex-col items-center'>
                    <img src='/check-2.png' className='w-16 md:w-20' />
                    <p className="text-center md:text-left">Reviewing notes</p>
                </div>
                <Separator className='w-[10%] h-1 md:h-2 rounded-full' />
                <div className='text-gray-400 flex flex-col items-center'>
                    <img src='/check-2.png' className='w-16 md:w-20' />
                    <p className="text-center md:text-left">Reviewing result</p>
                </div>
            </div>



            <Separator />
            <div className='flex flex-col py-5 px-5 md:py-10 md:px-44 space-y-5'>
                <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 justify-center'>
                    <Input
                        className='w-full md:w-[50%]'
                        placeholder='Note title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        className='w-full md:w-[25%]'
                        placeholder='Grade'
                        type='number'
                        value={grade}
                        onChange={(e) => setGrade(parseInt(e.target.value))}
                        min={1}
                    />
                </div>
                <div className='flex space-x-0 justify-center md:space-x-5'>
                    <Textarea
                        className='w-full md:w-[77%]'
                        placeholder='Note description'
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-5 justify-center'>
                    <UniversityCombo onUniversitySelect={setUniversity} />
                    <SubjectCombo onSubjectSelect={setSubject} />
                    <Input
                        className='w-full md:w-[10%]'
                        placeholder='Year'
                        type='number'
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        min={2000}
                    />
                </div>
                <div className="flex flex-col space-y-1.5 md:px-32">
                    <Label htmlFor="pdf">File (.pdf)</Label>
                    <Input
                        id="pdf"
                        type="file"
                        accept="application/pdf"
                        onChange={saveFile}
                    />
                </div>
            </div>
            <div className='flex flex-col px-5 md:px-44 justify-center items-center'>
                <Button
                    variant="destructive"
                    onClick={handleUpload}
                    className="w-full md:w-auto"
                >
                    Upload note
                </Button>
            </div>
        </div>
    );
};

export default Sell;
