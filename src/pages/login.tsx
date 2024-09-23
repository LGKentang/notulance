import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <Card className="rounded-lg w-[400px]">
                <CardHeader>
                    <CardTitle>Log in</CardTitle>
                    <CardDescription>Log in to Notulance.</CardDescription>
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
                </CardContent>
                <CardFooter>
                    <Button 
                        variant="default"
                        className="w-full"
                    >
                        Log In
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;