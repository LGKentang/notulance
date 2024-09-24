import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const NavBar = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
        <div className={cn("flex p-7 items-center justify-between")}>
            <div id="left">
                <a href="" className={cn("text-black")}>Notulance</a>
            </div>
            <div id="right" className={cn("w-1/4 flex items-center justify-between")} 
            >
                <a href="" className={cn("text-black")}>Search</a>
                <a href="" className={cn("text-black")}>Sell</a>
                <a href="/login" className={cn("text-black")}>
                    <button className={cn("text-white bg-red-500")} >Sign In</button>
                </a>
            </div>
        </div>
    )
  }
)
NavBar.displayName = "Input"

export { NavBar }
