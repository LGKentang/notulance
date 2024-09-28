import { getAllUsers } from "@/api/user-api";
import { NavBar } from "@/components/ui/navbar";
import { FirebaseUser } from "@/interfaces/firebase-user";
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
            <NavBar/>
            <div id="section-1" className="bg-white">
                <div id="absolute-1" className="absolute top-1/2 left-1/2 -translate-x-72 -translate-y-28">
                    <img className="" src="/HomeImage.png"/>
                    <br/>
                    <form className="flex space-x-2">
                        <Input type="text" placeholder="“Deep Learning Notes in BINUS University”" className="outline rounded-2xl"/>
                        <Button type="submit" className="bg-white">
                            <img src="/Search.png" className="w-16"/>
                        </Button>
                    </form>
                </div>
                <div id="absolute-2" className="absolute py-12 px-56">
                    <h1>Get notes, or bucks. <br />
                    Whichever you need.</h1>
                    <br />
                    <h4>Join a community of students from <br/> all around the world.</h4>
                </div>

                <div id="flex-1" className="flex items-start justify-between">
                    <img src="/Home1AA.png" className="w-52"/>
                    <img src="/Home1AB.png" />
                </div>
                <div id="middle" className="h-36"></div>
                <div id="flex-2" className="flex items-start justify-between">
                    <img src="/Home1BA.png" />
                    <img src="/Home1BB.png" />
                </div>
                {/* <h1>Get notes, or bucks. <br />
                Whichever you need.</h1>
                <br />
                <h4>Join a community of high-achieving and hard-working students from all around the world.</h4>
                <br />
                <Input className="w-1/2" /> */}
            </div>
            <div id="section-2">
                <div id="container" className="p-20 flex items-center justify-between bg-[url('/BackgroundImage.png')]">
                    <Card className="w-[350px] drop-shadow-2xl outline">
                        <CardContent>
                            <img className=""  src="/Home2A.png" alt=""/>
                        </CardContent>
                        <CardHeader>
                            <CardTitle>Find any note</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="w-[350px] drop-shadow-2xl outline">
                        <CardContent>
                        <img className="w-64"  src="/Home2B.png" alt="" />
                        </CardContent>
                        <CardHeader>
                            <CardTitle>Turn notes to money.</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="w-[350px] drop-shadow-2xl outline">
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
                <br/>
                <div id="container" className="ml-20 mr-36 flex justify-between items-start">
                    <img src="/Home3A.png"/>
                    <img src="/Home3B.png" className=""/>
                </div>
            </div>
            <div id="footer" className="p-10 bg-white flex justify-center">
                <span className="text-xl">Copyright - xxxxx 2024</span>
            </div>
        </div>
    );
}

export default Home;