"use client"

import Link from "next/link"
import { FaUser, FaSignOutAlt, FaLock } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";
import { signIn, signOut, useSession } from "next-auth/react"

export function Header(){
    const { status, data } = useSession()

    async function handleLogin(){
        await signIn();
    }

    async function handleLogout(){
        await signOut();
    }

    return(
        <header className="w-full h-20 flex items-center justify-center bg-white shadow-sm">
            <div className="w-full max-w-7xl flex items-center justify-between px-2 py-4">
                <Link href='/'>
                    <h1 className="text-2xl font-bold hover:tracking-wider duration-500">
                        <span className="text-blue-600">Adv</span>Control
                    </h1>
                </Link>

                {status === "loading" && (
                    <button className="animate-spin">
                        <LuLoaderCircle size={25} className="text-gray-900"/>
                    </button>
                )}

                {status === "unauthenticated" && (
                    <button onClick={handleLogin}>
                        <FaLock size={25} className="text-gray-900 hover:text-gray-700 active:text-gray-500 duration-500" />
                    </button>
                )}

                {status === "authenticated" && (
                    <div className="flex gap-3">
                        <Link href='/dashboard'>
                            <FaUser size={25} className="text-gray-900 hover:text-gray-700 active:text-gray-500 duration-500" />
                        </Link>

                        <button onClick={handleLogout}>
                            <FaSignOutAlt size={25} className="text-red-600 hover:text-red-400 active:text-red-300 duration-500" />
                        </button>
                    </div>
                )}

            </div>
        </header>
    )
}