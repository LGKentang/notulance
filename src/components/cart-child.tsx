import { removeCartItem } from "@/api/cart-api";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { FaTrash } from 'react-icons/fa';

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
            <Button variant="decline"><FaTrash /></Button>
        </div>
    )
}