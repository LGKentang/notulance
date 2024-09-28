import { getAllUsers } from "@/api/user-api";
import { NavBar } from "@/components/navbar";
import { FirebaseUser } from "@/interfaces/user/firebase-user";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input";

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
        <div className="w-screen h-screen">
            <NavBar/>
            <div id="section-1" className={cn("p-20 bg-gray-200 h-1000")}>
                <h1>Get notes, or bucks. <br />
                Whichever you need.</h1>
                <br />
                <h4>Join a community of high-achieving and hard-working students from all around the world.</h4>
                <br />
                <Input className={cn("w-1/2")} />
            </div>
            <div id="section-2">
                <div id="container" className={cn("p-20 flex items-center justify-between")}>
                    <div>
                        <img className={cn("w-10")}  src="data:image/jpeg;base64,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" alt="" />
                        <span>Find any note.</span>
                    </div>
                    <div>
                        <img className={cn("w-12")}  src="data:image/jpeg;base64,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" alt="" />
                        <span>Turn notes to money.</span>
                    </div>
                    <div>
                        <img className={cn("w-10")} src="data:image/jpeg;base64,/9j/2wCEAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDIBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAEAAQAMBIgACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AKaWx37upA24qC4gMbuDjPH8q17cAEjGcnj61yHjTVZrO4WygO15E3O/cKeAB+RohUjNXRitTPvPFsltIINPjQrHwZHGcnvgelc/qGpXepS+ZcylvRRwo+gqtihhgUzRIsQaje2kLRwXUsSN1CORWlpPinUNOmBed7iAn545Gzx7E9DWETxQpweelO9gsj0y61C21ErNbTiVcdv4faqw3blZW2gHriuE0+8ayvo5FJClsOPUV28kbEMd3GeB7VjLe5lJWOqs5X6/LuJx0rzzxpcm48TTLsC+Sqxj34zn9a7uKK88wOitgY7YrhfGU0cniOVUj2vGipI395sZz+RA/CijT5I2HT3Ocb7+KRzmnN8pOetdLJ8P9dTwo3iN4I0swgk2M+JCh/j246c+ucVqzU5Sk470uR3H5VsnwnrR8NDxALFhppbHm7hnGcZx1xnjOKkDEHBz+tdtZXn2mxikLAttG7B71xPtW1pFpd2t4xlQpGVIIJ6mpkiJq6PS9OvXjCKW/d9xTtW0TTtbTDQgTSHP2hAAwx79/pVOGJ7cn5WZD3PSsi6046Vrv25dce1glk3uhYBXPU9Tj9K3jHl0Zmn2OP1HSr7S59l3A8fzEKxHytj0Peuo1b4oapqng+Pw81rBCojSKWdCcui4wMds4Gf6Vzviu9jv9ekktrhpIkUL97K574rKDY4PIqGbLY7bVPh2ml/D+18TzasnmTxxutr5f3i5GAGz1CnJ47Gp1+JJ/wCFcDwuLD/SPL8g3G4bfLznOP72OP19q4UzyuiQvIzRp91Schc+g7VoaDcQJqSR3ESSJL8g3KDtYng0rDZNomim5dbuf5Yg2UXH3j/hW9KgLbtvfFaMq4BwOAOBVQqfM2spAIJpum2c7lfU61JCFMciE+2Kx/EWhf2tpxiSMNMGBRm4AHetrcWYfKf96lyw9qp1FcIx0PEzCYZpFK8ZxgjBpQq+h+ma9W1fw9Y6wQ84ZJh0ljwGP19a52bwEFlPl6iBGR/FHyP1qOZGyZxZABDj8qu6SyQ6taO0YfEq/L+NdOfAsX2cAag3m9zsG38s0618Frb3kE7324RkMyiPGSD25o5kDaNy4APReKgdVchv7o61oNGp6vUUkSAcuCK050zC1j//2Q==" alt="" />
                        <span>Valid and trusted.</span>
                    </div>
                </div>
            </div>
            <div id="section-3" className={cn("p-20 bg-gray-200")}>
                <h1>Anywhere, any note.</h1>

            </div>
            <div id="footer" className={cn("p-10 bg-gray-200 flex items-center justify-between")}>
                <span>Copyright - xxxxx 2024</span>
            </div>
        </div>
    );
}

export default Home;