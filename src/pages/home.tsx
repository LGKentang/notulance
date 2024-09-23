import { getAllUsers } from "@/api/user-api";
import { FirebaseUser } from "@/interfaces/firebase-user";
import { useEffect, useState } from "react";

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
            {"Hello I'm Home ;)"}
        </div>
    );
}

export default Home;