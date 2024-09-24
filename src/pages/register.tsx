import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { userRegister } from "@/handlers/auth-handler";
import { useState } from "react";

const Register = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleRegister = async() => {
        await userRegister(name, email, confirmPassword, password);
    }

    return (
        <div className="w-screen h-screen flex justify-center">
            <div className="w-[50%] flex justify-center items-center">
                unknown
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
                    </CardContent>
                    <CardFooter>
                        <Button 
                            variant="default"
                            className="w-full"
                            onClick={() => handleRegister()}
                        >
                            Sign Up
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Register;