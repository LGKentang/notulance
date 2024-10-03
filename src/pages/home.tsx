import { getAllUsers } from "@/api/user-api";
import { NavBar } from "@/components/navbar";
import { FirebaseUser } from "@/interfaces/user/firebase-user";
import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Home = () => {
    // Test Fetch
    // const [data, setData] = useState<FirebaseUser[]>();

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         const data = await getAllUsers()
    //         console.log(data);
    //     }
    //     fetchUserData()
    // },[])

    return (
        <div className="w-screen h-screen font-itim">
            <NavBar />
            <div
                id="section-1"
                className="bg-white flex "
                style={{
                    background: 'url(/home/home-bg-full.png) no-repeat center center',
                    backgroundSize: '100vw auto',
                    width: '100vw',
                    height: 'auto',
                    minHeight: '100vh',
                    display: 'flex',
                }}
            >
                <div id="absolute-2" className="absolute pl-[11rem] pt-[1.rem] scale-75">
                    <h1>Get notes, or bucks. <br />
                        Whichever you need.</h1>
                    <br />
                    <h4 className="text-gray-500">Join a community of students from <br /> all around the world.</h4>
                </div>

                <div id="absolute-1" className="absolute bottom-0 pb-[2.5rem] flex w-full justify-center">

                    <br />
                    <form className="flex space-x-2">
                        <Input type="text" placeholder="“Deep Learning Notes in BINUS University”" className="outline rounded-2xl w-[40rem]" />
                        <Button type="submit" className="rounded-full">
                            <img src="/search-transparent.png" className="w-8" style={{filter:'invert(100%)'}} />

                        </Button>
                    </form>
                </div>



            </div>
            <div id="section-2">
                <div id="container" className="p-20 flex items-center justify-between bg-[url('/BackgroundImage.png')]">
                    <Card className="w-[300px] drop-shadow-2xl outline">
                        <CardContent>
                            <img className="" src="/Home2A.png" alt="" />
                        </CardContent>
                        <CardHeader>
                            <CardTitle>Find any note</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="w-[300px] drop-shadow-2xl outline">
                        <CardContent>
                            <img className="w-64" src="/Home2B.png" alt="" />
                        </CardContent>
                        <CardHeader>
                            <CardTitle>Turn notes to money.</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="w-[300px] drop-shadow-2xl outline">
                        <CardContent>
                            <img className="w-64" src="/Home2C.png" alt="" />
                        </CardContent>
                        <CardHeader>
                            <CardTitle>Valid and trusted.</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                    </Card>
                    <div>
                    </div>
                </div>
            </div>
            <div id="section-3" className="p-20 bg-white">
                <h1 className="mb-16">Anywhere, any note.</h1>
                <br />
                <div id="container" className="ml-20 mr-36 flex justify-between items-start">
                    <img src="/Home3A.png" />
                    <img src="/Home3B.png" className="" />
                </div>
            </div>
            <div id="footer" className="p-10 bg-white flex justify-center">
                <span className="text-xl">Copyright - xxxxx 2024</span>
            </div>
        </div>

    );
}

export default Home;