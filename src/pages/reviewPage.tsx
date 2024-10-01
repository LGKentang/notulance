import { getAllReviews } from "@/api/review-api"
import { NavBar } from "@/components/navbar"
import { SubjectCombo } from "@/components/subject-combo"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UniversityCombo } from "@/components/univ-combo"
import { ReviewResult } from "@/interfaces/enum/review_enum"
import { Separator } from "@radix-ui/react-separator"
import { useEffect, useState } from "react"

export default function ReviewPage(){
    const [reviews, setReviews] = useState<any[] | null>()

    const loadReviews = async () => {
        const result = await getAllReviews(ReviewResult.Accepted)
        setReviews(result)
    }
    useEffect(() => {
        loadReviews()
    }, [])

    return(
        <div className="w-screen h-screen">
            <NavBar/>
            <div className="p-16">
                <h1 className="text-3xl">Review Page:</h1>
                <br/>
                <span>filter by:</span>
                <UniversityCombo
                    onUniversitySelect={()=>{}}
                />
                <SubjectCombo 
                    onSubjectSelect={()=>{}} 
                />
                <button className="bg-gray-200">result: pending</button>
                <button className="bg-red-200">result: accepted</button>
                <button className="bg-gray-200">result: denied</button>
            </div>
            <div className="grid px-44 grid-cols-3 justify-between gap-10">
                {reviews?.map((review, index) => (
                    <div key={index}>
                        <Card >
                            <CardHeader className="flex p-0 w-full max-h-48 items-center overflow-hidden">
                                <img src="/notulance.png" alt="" />
                            </CardHeader>
                            <Separator />
                            <CardContent className="p-3">
                                <h3 className="font-bold">{review.notes.title}</h3>
                                <p className="text-sm">{review.notes.description}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between p-3 text-sm">
                                <div>
                                    <p>{review.notes.university}</p>
                                    <p>Kemanggisan</p>
                                    <p>2024</p>
                                </div>
                                <a href={`/reviewPageDetail/${review.id}`}>
                                    <button className="bg-red-500 text-white">View Note</button>
                                </a>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

{/*                 
<Card >
    <CardHeader className="flex p-0 w-full max-h-48 items-center overflow-hidden">
        <img src="/notulance.png" alt="" />
    </CardHeader>
    <Separator />
    <CardContent className="p-2 font-bold">
        Algorithm and Programming
    </CardContent>
    <CardFooter className="flex justify-between p-3 text-sm">
        <div>
            <p>BINUS University</p>
            <p>Kemanggisan</p>
            <p>2024</p>
        </div>
        <button className="bg-red-500 text-white" onClick={handleGoToDetail}>View Note</button>
    </CardFooter>
</Card>
<Card >
    <CardHeader className="flex p-0 w-full max-h-48 items-center overflow-hidden">
        <img src="/notulance.png" alt="" />
    </CardHeader>
    <Separator />
    <CardContent className="p-2 font-bold">
        Entrepreneurship: Market Validation
    </CardContent>
    <CardFooter className="flex justify-between p-3 text-sm">
        <div>
            <p>BINUS University</p>
            <p>Alam Sutera</p>
            <p>2024</p>
        </div>
        <button className="bg-red-500 text-white" onClick={handleGoToDetail}>View Note</button>
    </CardFooter>
</Card> 
*/}