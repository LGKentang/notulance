
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import CartChild from "./cart-child";
import { getCartById } from "@/api/cart-api";
import { getUserByAuthId } from "@/api/user-api";
import { FirebaseUser } from "@/interfaces/user/firebase-user";
import { checkoutCart } from "@/handlers/cart-handler";

const NavBar = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [cart, setCart] = useState<any | null>([])
  const [userGlobal, setUser] = useState<FirebaseUser | null>(null)

  const handleLogout = async () => {
    const auth = getAuth();
  
    // Check if a user is currently signed in
    if (auth.currentUser) {
      try {
        // Sign out the user
        await auth.signOut()
        console.log("User has been logged out.");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    } else {
      console.log("No user is signed in.");
    }
  };

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthenticated(true);

        const userId = user.uid;
        setUser(await getUserByAuthId(userId) as FirebaseUser | null);
        if (!user) throw new Error("User is not found");
        const cartId = userGlobal?.cartId as string
        const theCart = await getCartById(cartId) 

        if(theCart != null){
          const cartItems = theCart.items
          setCart(cartItems)
          console.log(cartItems)
        }
      } 
      else {
        setAuthenticated(false);
      }
    });


    return () => unsubscribe();
  }, []);

  return (
      <div className="w-full flex px-20 py-8 items-center justify-between font-itim shadow-md drop-shadow-sm">
          <div className="flex items-center">
              <a 
                href="/"
                className="text-2xl flex items-center text-black hover:text-slate-900/80 duration-150 space-x-1"
              >
                <img src="/notulance.png" alt="" className="w-10 h-10" />
                <div>Notulance</div>
              </a>

          </div>
          <div id="right" className="flex items-center space-x-16">
              <a href="/note/search"><Button variant="link" className="text-xl">Search</Button></a>
              <a href="/note/sell"><Button variant="link" className="text-xl">Sell</Button></a>

              {authenticated ? (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-14 rounded-3xl">
                        <img src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png"></img>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 z-50 bg-white">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">My Shopping Cart</h4>
                          <p className="text-sm text-muted-foreground">
                            Your added notes in search page will be shown here:
                          </p>
                        </div>
                        <div className="grid gap-2">
                          {cart.map((x: any, index: number) => 
                            <CartChild title={x.item.title} index={index} key={index}/>
                          )}
                        </div>  
                        <div>
                          <span>Total price: Rp-</span>
                        </div>
                        <div className="flex justify-between">
                        <Button variant="decline">Clear Cart</Button>
                        <Button variant="agree" onClick={checkoutCart}>Checkout!</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="p-0">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>N</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-36 max-w-56">
                      <DropdownMenuLabel>{userGlobal?.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => {window.location.href = '/profile'}}>
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {window.location.href = '/seller-profile'}}>
                          Seller Profile
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
                
              ) : (
                <a href="/login"><Button variant="default" className="bg-red-500">Sign In</Button></a>
              )}
          </div>
      </div>
  );
};

export { NavBar }
