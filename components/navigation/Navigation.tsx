
import { MinorLogo } from "../Logo"

export default function Navigation() {

  return (
    <nav className="px-2 w-full bg-gray-800 items-center
         m-auto flex justify-between border-btop-0
         backdrop-blur-md opacity-100 fixed z-50">
      <div className="z-50">
        <MinorLogo />
      </div>
      <div className=" p-3 text-sm">

      </div>
    </nav>

  )
}