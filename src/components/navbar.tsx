
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
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

const NavBar = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
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
                className="text-lg flex items-center text-black hover:text-slate-900/80 duration-150"
              >
                <img src="/notulance.png" alt="" className="w-10 h-10" />
                Notulance
              </a>
          </div>
          <div id="right" className="flex items-center space-x-16">
              <a href="/note/search"><Button variant="link">Search</Button></a>
              <a href="/note/sell"><Button variant="link">Sell</Button></a>
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
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Name</DropdownMenuLabel>
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
