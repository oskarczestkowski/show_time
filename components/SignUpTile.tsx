import Link from "next/link"
import { robotoCondensed } from "./JoinUsButton"

export const SignInButton = () => {
    return(
        <Link href="/login" className={`${robotoCondensed} text-3xl px-4 py-2 animate-btn-secondary`}>SIGN IN</Link>
    )
}