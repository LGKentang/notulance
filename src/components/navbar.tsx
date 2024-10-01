
import { Button } from "./ui/button";

const NavBar = () => {
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
              <a href="/login"><Button variant="default">Sign In</Button></a>
          </div>
      </div>
  );
};

export { NavBar }
