import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className="w-screen h-screen flex justify-center">
            <div className="w-[50%] flex justify-center items-center">
                <img src="data:image/jpeg;base64,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" alt="" />
            </div>
            <div className="w-[50%] flex items-center">
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
        </div>
    );
};

export default Login;