import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { userRegister } from "@/handlers/auth-handler";
import { useState } from "react";
import Swal from "sweetalert2";

const Register = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const clearField = () => {
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    const handleRegister = async () => {
        try {
            setLoading(true);
            const response = await userRegister(name, email, confirmPassword, password);
        
            if (response && response.success) {
                clearField();
                setLoading(false);
                Swal.fire({
                    title: "Registration success!",
                    icon: "success",
                    confirmButtonColor: "#F44336"
                  }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/login'; 
                    }
                  });
            }
        } catch (error) {
            console.error("Error during registration:", error);
            clearField();
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center font-itim">
            <div className="w-[50%] flex justify-center items-center">
                <img src="/register-img.png" alt="" />
            </div>
            <div className="w-[50%] flex items-center">
                <Card className="rounded-lg w-[400px]">
                    <CardHeader>
                        <CardTitle>Welcome to Notulance</CardTitle>
                        <CardDescription>Let's get to know each other</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input
                            className=""
                            type="text" 
                            placeholder="Name"
                            value={name}
                            onChange={(e) => {setName (e.target.value)}}
                        />
                        <div className="mb-2" />
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
                        <div className="mb-2" />
                        <Input 
                            className=""
                            type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                        />
                        <a href="/login">
                            <Button variant="link" className="p-0.5">Already have an account?</Button>
                        </a>
                    </CardContent>
                    <CardFooter>
                        <Button 
                            variant="decline"
                            className="w-full"
                            onClick={() => handleRegister()}
                        >
                            Sign Up
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

export default Register;