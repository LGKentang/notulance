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
} from "@/components/ui/dropdown-menu";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CartChild from "./cart-child";
import { getCartById } from "@/api/cart-api";
import { getUserByAuthId } from "@/api/user-api";
import { FirebaseUser } from "@/interfaces/user/firebase-user";
import { checkoutCart } from "@/handlers/cart-handler";
import { FiSidebar } from "react-icons/fi";
const NavBar = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [cart, setCart] = useState<any | null>([]);
  const [userGlobal, setUser] = useState<FirebaseUser | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const fetchCart = async () => {
    if (userGlobal?.cartId) {
      const cartId = userGlobal.cartId;
      const theCart = await getCartById(cartId);

      if (theCart != null) {
        const cartItems = theCart.items;
        setTotalPrice(theCart.totalPrice);
        setCart(cartItems);
        console.log(cartItems);
      }
    }
  };

  const onRemove = async () => {
    await fetchCart();
  };

  const handleLogout = async () => {
    const auth = getAuth();

    if (auth.currentUser) {
      try {
        await auth.signOut();
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
        const userData = await getUserByAuthId(userId) as FirebaseUser | null;
        setUser(userData);

        if (!userData) throw new Error("User is not found");
      } else {
        setAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [userGlobal]);

  return (
    <div className="w-full flex px-10 py-8 items-center justify-between font-itim shadow-lg drop-shadow-sm md:px-20">

      <div className="flex items-center">
        <a
          href="/"
          className="text-2xl flex items-center text-black hover:text-slate-900/80 duration-150 space-x-1"
        >
          <img src="/notulance.png" alt="" className="w-10 h-10" />
          <div>Notulance</div>
        </a>
      </div>

      {/* Desktop Navbar */}
      <div id="right" className="flex items-center space-x-16 hidden lg:flex">
        <a href="/note/search"><Button variant="link" className="text-xl">Search</Button></a>
        <a href="/note/sell"><Button variant="link" className="text-xl">Sell</Button></a>

        {authenticated ? (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-14 rounded-3xl">
                  <img src="https://cdn-icons-png.flaticon.com/512/1413/1413908.png" />
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
                      <CartChild title={x.item.title} index={index} key={index} onRemove={onRemove} />
                    )}
                  </div>
                  <div>
                    <span>Total price: Rp. {totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="decline">Clear Cart</Button>
                    <Button variant="agree" onClick={() => { checkoutCart() }}>Checkout!</Button>
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
                  <DropdownMenuItem onClick={() => { window.location.href = '/profile' }}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { window.location.href = '/seller-profile' }}>
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


      {/* Mobile Sidebar */}
      <div className="lg:hidden sticky z-20">
        <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} variant="outline" className="p-2">
          <FiSidebar />
        </Button>

        {isSidebarOpen && (
          <div className="fixed top-0 left-0 w-full h-max bg-white shadow-xl z-10000 transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between p-4">
              <h4 className="text-2xl font-semibold">Menu</h4>
              <Button onClick={() => setIsSidebarOpen(false)} variant="link" className="text-2xl text-gray-700 hover:text-red-500">
                X
              </Button>
            </div>
            <div className="flex flex-col items-center space-y-6 p-4">
              <a href="/note/search">
                <Button variant="link" className="text-2xl text-gray-700 hover:text-red-500 text-center">Search</Button>
              </a>
              <a href="/note/sell">
                <Button variant="link" className="text-2xl text-gray-700 hover:text-red-500 text-center">Sell</Button>
              </a>
              {authenticated ? (
                <>
                  <Button variant="link" className="text-2xl text-gray-700 hover:text-red-500 text-center" onClick={() => { window.location.href = '/profile' }}>Profile</Button>
                  <Button variant="link" className="text-2xl text-gray-700 hover:text-red-500 text-center" onClick={() => { window.location.href = '/seller-profile' }}>Seller Profile</Button>
                  <Button variant="link" className="text-2xl text-gray-700 hover:text-red-500 text-center" onClick={handleLogout}>Log out</Button>
                </>
              ) : (
                <a href="/login">
                  <Button variant="default" className="bg-red-500 hover:bg-red-600 text-white text-2xl text-center">Sign In</Button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export { NavBar };
