import { NavBar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

const SellerProfile = () => {
    return(
        <div className="w-screen h-screen flex flex-col font-itim overflow-y-scroll">
            <NavBar/>
            <div id="container" className="p-20">
                <h1 className="text-5xl">Seller Profile:</h1>
                <div id="box-1" className="bg-gray-100 w-500 h-96 mt-10 p-6 rounded-3xl">
                    <p className="text-2xl">My notes on market:</p>
                    <img src="/darurat1.png"/>
                </div>
                <div id="box-1" className="bg-gray-100 w-500 h-96 mt-10 p-6 rounded-3xl">
                    <p className="text-2xl">Total Revenue:</p>
                    <img src="/darurat2.png"/>
                </div>
                <br/>
                <br/>
                <Button variant={"decline"} className="mr-6 text-lg p-6">Withdraw Revenue</Button>
                <Button variant={"agree"} className="bg-cyan-500 text-lg p-6" onClick={() => {window.location.href = '/sell'}}>Sell new note</Button>
            </div>
        </div>
    )
}

export default SellerProfile