import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { userLogin } from "@/handlers/auth-handler";
import { useState } from "react";
import Swal from 'sweetalert2'

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async() => {
        try {
            setLoading(true);
            const response = await userLogin(email, password);

            if (response && response.success) {
                setLoading(false);
                window.location.href = '/'; 
            }
        } catch (error) {
            console.log(error)
            setPassword('')
        }
    }

    return (
        <div className="font-itim">
            <div className="w-full flex px-40 py-16 items-center justify-between">
                <div className="flex items-center">
                    <a href="/"
                    className="text-2xl flex items-center text-black hover:text-slate-900/80 duration-150 space-x-1">
                        <img src="/notulance.png" alt="" className="w-10 h-10" />
                        <div>Notulance</div>
                    </a>
                </div>
                <a href="/register">
                    <Button variant="link" className="text-xl">New Here?</Button>
                    <Button variant="link" className="text-xl text-blue-500">Register</Button>
                </a>
            </div>
            <div className="w-screen flex justify-center ">
                <div className="w-[50%] flex justify-center items-center">
                    <img src="/login-img.png" alt="" />
                </div>
                <div className="w-[50%] flex items-center">
                    <Card className="rounded-lg w-[400px]">
                        <CardHeader>
                            <CardTitle className="text-5xl">Welcome Back !</CardTitle>
                            <CardDescription className="text-xl text-gray-400">How have you been, friend?</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Email</p>
                            <Input 
                                className=""
                                type="email" 
                                // placeholder="Email"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                                />
                            <div className="mb-2" />
                            <p>Password</p>
                            <Input 
                                className=""
                                type="password" 
                                // placeholder="Password" 
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                            <a href="/register">
                                <Button variant="link" className="p-0.5">Don't have an account?</Button>
                            </a>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                variant="decline"
                                className="w-full"
                                onClick={() => handleLogin()}
                            >
                                Log In
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                {loading ? 
                    <div className="bg-black w-screen h-screen absolute opacity-50">
                        <p className="absolute top-1/2 left-1/2 text-white text-5xl transform -translate-x-1/2 -translate-y-1/2">
                            Loading...
                        </p>
                    </div>
                    :
                    <></>
                }
            </div>
            <div id="footer" className="mt-10 p-10 bg-white flex justify-center">
                <div className='text-center'>
                    <p className="text-xl">Copyright. @2024. All Right Reserved.</p>
                    <p className="text-xs">Made by Darren, Jessica, Rey, Wilmer</p>
                </div>
            </div>
        </div>
    );
};

export default Login;