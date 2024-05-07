import Link from "next/link"

export const SignInButton = () => {
    return(
        <Link href="/login" className="text-2xl px-4 py-2 animate-btn-secondary">Sign In</Link>
    )
}