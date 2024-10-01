import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function CartChild({ title }: { title: string }){
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4">
                <img src="/notulance.png" className="w-6">{/*thumbnail*/}</img>
                <Label htmlFor="width" className="w-32">{title}</Label>
            </div>
            <Button className="w-3 bg-red-500 rounded-3xl">X</Button>
        </div>
    )
}