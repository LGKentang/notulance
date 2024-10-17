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
        <div className="w-screen h-screen flex justify-center font-itim">
            <div className="w-[50%] flex justify-center items-center">
                <img src="/login-img.png" alt="" />
            </div>
            <div className="w-[50%] flex items-center">
                <Card className="rounded-lg w-[400px]">
                    <CardHeader>
                        <CardTitle>Welcome Back !</CardTitle>
                        <CardDescription>Where have you been?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input 
                            className=""
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <div className="mb-2" />
                        <Input 
                            className=""
                            type="password" 
                            placeholder="Password" 
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
    );
};

export default Login;