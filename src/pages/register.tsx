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

    const clearField = () => {
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    const handleRegister = async () => {
        try {
            const response = await userRegister(name, email, confirmPassword, password);
        
            if (response && response.success) {
                clearField();
                window.location.href = '/login'; 
            }
        } catch (error) {
            console.error("Error during registration:", error);
            clearField();  // Handle errors but do not redirect
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center">
            <div className="w-[50%] flex justify-center items-center">
                <img src="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAEAAQAMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AKaWx37upA24qC4gMbuDjPH8q17cAEjGcnj61yHjTVZrO4WygO15E3O/cKeAB+RohUjNXRitTPvPFsltIINPjQrHwZHGcnvgelc/qGpXepS+ZcylvRRwo+gqtihhgUzRIsQaje2kLRwXUsSN1CORWlpPinUNOmBed7iAn545Gzx7E9DWETxQpweelO9gsj0y61C21ErNbTiVcdv4faqw3blZW2gHriuE0+8ayvo5FJClsOPUV28kbEMd3GeB7VjLe5lJWOqs5X6/LuJx0rzzxpcm48TTLsC+Sqxj34zn9a7uKK88wOitgY7YrhfGU0cniOVUj2vGipI395sZz+RA/CijT5I2HT3Ocb7+KRzmnN8pOetdLJ8P9dTwo3iN4I0swgk2M+JCh/j246c+ucVqzU5Sk470uR3H5VsnwnrR8NDxALFhppbHm7hnGcZx1xnjOKkDEHBz+tdtZXn2mxikLAttG7B71xPtW1pFpd2t4xlQpGVIIJ6mpkiJq6PS9OvXjCKW/d9xTtW0TTtbTDQgTSHP2hAAwx79/pVOGJ7cn5WZD3PSsi6046Vrv25dce1glk3uhYBXPU9Tj9K3jHl0Zmn2OP1HSr7S59l3A8fzEKxHytj0Peuo1b4oapqng+Pw81rBCojSKWdCcui4wMds4Gf6Vzviu9jv9ekktrhpIkUL97K574rKDY4PIqGbLY7bVPh2ml/D+18TzasnmTxxutr5f3i5GAGz1CnJ47Gp1+JJ/wCFcDwuLD/SPL8g3G4bfLznOP72OP19q4UzyuiQvIzRp91Schc+g7VoaDcQJqSR3ESSJL8g3KDtYng0rDZNomim5dbuf5Yg2UXH3j/hW9KgLbtvfFaMq4BwOAOBVQqfM2spAIJpum2c7lfU61JCFMciE+2Kx/EWhf2tpxiSMNMGBRm4AHetrcWYfKf96lyw9qp1FcIx0PEzCYZpFK8ZxgjBpQq+h+ma9W1fw9Y6wQ84ZJh0ljwGP19a52bwEFlPl6iBGR/FHyP1qOZGyZxZABDj8qu6SyQ6taO0YfEq/L+NdOfAsX2cAag3m9zsG38s0618Frb3kE7324RkMyiPGSD25o5kDaNy4APReKgdVchv7o61oNGp6vUUkSAcuCK050zC1j//2Q==" alt="" />
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