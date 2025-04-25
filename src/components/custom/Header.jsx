import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const { user, isSignedIn } = useUser();

    return (
        <div className="w-full z-20 bg-gray-900 border-b border-white/20 text-white px-6 py-4 flex justify-between items-center shadow-md">
            <Link to="/">
                <h2 className="text-2xl font-bold text-white hover:text-yellow-300 transition duration-300">ResumeCraft</h2>
            </Link>

            {isSignedIn ? (
                <div className="flex items-center gap-4">
                    <a
                        href="/dashboard"
                        className="px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition"
                    >
                        Dashboard
                    </a>
                    <UserButton />
                </div>
            ) : (
                <Link to="/auth/sign-in">
                    <Button className="text-white font-semibold rounded-md hover:bg-gray-100 transition">
                        Get Started
                    </Button>
                </Link>
            )}
        </div>
    );
}

export default Header;