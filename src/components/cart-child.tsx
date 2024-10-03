import { removeCartItem } from "@/api/cart-api";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function CartChild({ title, index }: { title: string, index: number }){
    async function handleRemoveCartItem(index: number){
        await removeCartItem(index)
        window.location.reload()
    }
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4">
                <img src="/notulance.png" className="w-6">{/*thumbnail*/}</img>
                <Label htmlFor="width" className="w-32">{title}</Label>
            </div>
            <Button className="w-3 bg-red-500 rounded-3xl" onClick={()=>handleRemoveCartItem(index)}>X</Button>
        </div>
    )
}