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
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

const Home = () => {
    return (
        <div className="h-screen font-itim">

            <NavBar />
            <div
                id="section-1"
                className=""
                style={{
                    background: 'url(/home/home-bg-full.png) no-repeat center center',
                    backgroundSize: 'cover',
                    height: 'auto',
                    minHeight: '100vh',
                    display: 'flex',
                }}
            >

                <div className="sm:hidden mt-12 px-3">
                    <h1 className="text-center sm:text-left text-4xl">Get notes, or bucks.
                        Whichever you need.</h1>

                    <h4 className="text-gray-500 text-center sm:text-left text-xl">Join a community of students from <br /> all around the world.</h4>
                </div>


                <div id="absolute-2" className="absolute pl-[5rem] pt-[3rem] sm:pl-[11rem] sm:pt-[1rem] scale-75 sm:scale-100 hidden sm:block">
                    <h1 className="text-center sm:text-left">Get notes, or bucks. <br />
                        Whichever you need.</h1>
                    <h4 className="text-gray-500 text-center sm:text-left">Join a community of students from <br /> all around the world.</h4>
                </div>

                <div id="absolute-1" className="absolute bottom-0 pb-[10.5rem] px-3 flex w-full justify-center block sm:hidden">
                    <form className="flex space-x-2 w-full sm:w-auto justify-center sm:justify-start">
                        <Input type="text" placeholder="“Deep Learning Notes in BINUS University”" className="outline rounded-2xl w-[90%] sm:w-[40rem]" />
                        <Button type="submit" className="rounded-full" variant={"decline"}>
                            <img src="/search-transparent.png" className="w-8" style={{ filter: 'invert(100%)' }} />
                        </Button>
                    </form>
                </div>

                <div id="absolute-1" className="absolute bottom-0 pb-[2.5rem] flex w-full justify-center hidden sm:flex">
                    <form className="flex space-x-2 w-full sm:w-auto justify-center sm:justify-start">
                        <Input type="text" placeholder="“Deep Learning Notes in BINUS University”" className="outline rounded-2xl w-[90%] sm:w-[40rem]" />
                        <Button type="submit" className="rounded-full" variant={"decline"}>
                            <img src="/search-transparent.png" className="w-8" style={{ filter: 'invert(100%)' }} />
                        </Button>
                    </form>
                </div>


            </div>

            <div id="section-2" className="p-5 sm:p-20 flex flex-col sm:flex-row justify-between bg-[url('/BackgroundImage.png')]">
                <Card className="w-full sm:w-[300px] drop-shadow-2xl outline mb-4 sm:mb-0">
                    <CardContent>
                        <img className="w-full" src="/Home2A.png" alt="" />
                    </CardContent>
                    <CardHeader>
                        <CardTitle>Find any note</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="w-full sm:w-[300px] drop-shadow-2xl outline mb-4 sm:mb-0">
                    <CardContent>
                        <img className="w-full" src="/Home2B.png" alt="" />
                    </CardContent>
                    <CardHeader>
                        <CardTitle>Turn notes to money.</CardTitle>
                        <CardDescription>Your deployed note will be an income</CardDescription>
                    </CardHeader>
                </Card>
                <Card className="w-full sm:w-[300px] drop-shadow-2xl outline">
                    <CardContent>
                        <img className="w-full" src="/Home2C.png" alt="" />
                    </CardContent>
                    <CardHeader>
                        <CardTitle>Valid and trusted.</CardTitle>
                        <CardDescription>We ensure the note review as priority</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="flex flex-col p-5 sm:p-20 bg-white">
                <div>
                    <h1 className="mb-8 sm:mb-16 text-center sm:text-left">Anywhere, any note.</h1>
                </div>

                <div className="flex flex-row gap-20">
                    <div className="sm:w-1/2 grid grid-cols-3 gap-4">
                        <img src="/univ/binus.jpg" alt="" className="w-[150px] h-auto object-cover" />
                        <img src="/univ/itb.png" alt="" className="w-[150px] h-auto object-cover" />
                        <img src="/univ/ui.png" alt="" className="w-[150px] h-auto object-cover" />
                        <img src="/univ/brawijaya.jpeg" alt="" className="w-[150px] h-auto object-cover" />
                        <img src="/univ/unpad.png" alt="" className="w-[150px] h-auto object-cover" />
                        <img src="/univ/ukp.jpeg" alt="" className="w-[150px] h-auto object-cover" />
                    </div>

                    <div className="sm:w-1/2 flex justify-center items-center">
                        <img src="/Home3B.png" className="w-full sm:w-auto max-w-full object-cover" alt="Girl Image" />
                    </div>
                </div>

            </div>

            {/* <div id="section-3" className="p-5 sm:p-20 bg-white">
                <h1 className="mb-8 sm:mb-16 text-center sm:text-left">Anywhere, any note.</h1>

                <div className="flex flex-wrap gap-4">

                    <div className="sm:w-1/2 grid grid-cols-3 gap-4">
                        <img src="/univ/binus.jpg" alt="" className="w-[150px] h-auto object-cover" />
                        <img src="/univ/itb.png" alt="" className="w-[150px] h-auto object-cover" />
                        <img src="/univ/ui.png" alt="" className="w-[150px] h-auto object-cover" />
                        <img src="/univ/brawijaya.jpeg" alt="" className="w-[150px] h-auto object-cover" />
                        <img src="/univ/unpad.png" alt="" className="w-[150px] h-auto object-cover" />
                        <img src="/univ/ukp.jpeg" alt="" className="w-[150px] h-auto object-cover" />
                    </div>

                    <div className="sm:w-1/2 flex justify-center items-center">
                        <img src="/Home3B.png" className="w-full sm:w-auto max-w-full object-cover" alt="Girl Image" />
                    </div>
                </div>
            </div> */}






            {/* <div id="section-3" className="p-5 sm:p-20 bg-white">
                <h1 className="mb-8 sm:mb-16 text-center sm:text-left">Anywhere, any note.</h1>

                <img src="/univ/binus.jpg" alt="" />
                <img src="/univ/itb.png" alt="" />
                <img src="/univ/ui.png" alt="" />
                <img src="/univ/brawijaya.jpeg" alt="" />
                <img src="/univ/unpad.png" alt="" />
                <img src="/univ/ukp.jpeg" alt="" />


                <div id="container" className="">
                    <img src="/Home3A.png" className="flex-grow w-full sm:w-auto max-w-full" alt="Image 1" />
                    <img src="/Home3B.png" className="flex-grow w-full sm:w-auto max-w-full" alt="Image 2" />
                </div>
            </div> */}


            <Footer />
        </div>
    );
}

export default Home;
