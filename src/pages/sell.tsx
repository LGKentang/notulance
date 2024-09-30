import { NavBar } from '@/components/navbar';
import { SubjectCombo } from '@/components/subject-combo';
import { Input } from '@/components/ui/input';
import { UniversityCombo } from '@/components/univ-combo';
import { Label } from "@/components/ui/label"
import { useEffect, useState } from 'react';

const Sell = () => {
    const [university, setUniversity] = useState<string>("")
    const [subject, setSubject] = useState<string>("")

    return (
        <div className="w-screen h-screen flex flex-col">
            <NavBar />
            <div className='flex p-10 justify-between px-44'>
                <div>
                    Upload notes
                </div>
                <div>
                    Reviewing notes...
                </div>
                <div>
                    Reviewing result
                </div>
            </div>
            <div className='flex flex-col py-10 px-44 space-y-5'>
                <div className='flex space-x-5 justify-center'>
                    <Input 
                        className='w-[50%]'
                        placeholder='Note title'
                    />
                    <Input 
                        className='w-[25%]'
                        placeholder='Grade'
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
                    />
                </div>
                <div className="flex flex-col space-y-1.5 px-32">
                    <Label htmlFor="pdf">{"File (.pdf)"}</Label>
                    <Input id="pdf" type="file"/>
                </div>
            </div>
        </div>
    );
};

export default Sell;