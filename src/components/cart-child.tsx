import { removeCartItem } from "@/api/cart-api";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { FaTrash } from 'react-icons/fa';

export default function CartChild({ title, index, onRemove }: { title: string, index: number, onRemove: () => void }) {
  
    const handleRemoveCartItem = async (index: number) => {
        await removeCartItem(index);
        onRemove();
    };

    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4">
                <img src="/notulance.png" className="w-6" alt="Thumbnail" /> {/* thumbnail */}
                <Label htmlFor="width" className="w-32">{title}</Label>
            </div>
            <Button variant="decline" onClick={() => handleRemoveCartItem(index)}>
                <FaTrash />
            </Button>
        </div>
    );
}
