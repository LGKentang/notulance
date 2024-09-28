import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const NavBar = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
        <div className="flex p-7 items-center justify-between bg-white drop-shadow-2xl">
            <div id="left" className="flex">
                <img src="/public/notulance.png" className="w-10 mx-5"/>
                <a href="" className="text-black text-3xl">Notulance</a>
            </div>
            <div id="right" className="w-1/4 flex items-center justify-between" 
            >
                <a href="" className="text-black">Search</a>
                <a href="" className="text-black">Sell</a>
                <a href="/login" className="text-black">
                    <button className="text-white bg-red-500 mr-20" >Sign In</button>
                </a>
            </div>
        </div>
    )
  }
)
NavBar.displayName = "Input"

export { NavBar }
