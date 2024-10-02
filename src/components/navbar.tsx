
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
import { FirebaseUser } from "@/interfaces/user/firebase-user";
import { getCurrentUserId, getUserById } from "@/api/user-api";

const NavBar = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  useEffect(() => {
    const auth = getAuth();

    const getUser = async() => {
      const userId = await getCurrentUserId();
      const user = await getUserById(userId);
      setUser(user)
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        getUser()
      } else {
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

                      <CartChild title="Introduction to Automata Theory 2"/>
                      
                    </div>
                    <div>
                      <span>Total price: Rp37,500</span>
                    </div>
                    <div className="flex justify-between">
                      <Button className="w-24 bg-red-400 rounded-3xl">Clear Cart</Button>
                      <Button className="w-24 bg-green-400 rounded-3xl">Checkout!</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0">
                      <Avatar>
                        <AvatarImage src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png" />
                        <AvatarFallback>N</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Cart Items:</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Seller Profile
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      Empty Cart
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}

              {authenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>N</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-32 max-w-48">
                    <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Seller Profile
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a href="/login"><Button variant="default">Sign In</Button></a>
              )}
          </div>
      </div>
  );
};

export { NavBar }
