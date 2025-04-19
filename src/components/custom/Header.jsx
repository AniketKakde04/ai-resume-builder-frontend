import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const { user, isSignedIn } = useUser();

    return (
        <div className="w-full z-20 backdrop-blur-md bg-white/10 border-b border-white/20 text-white px-6 py-4 flex justify-between items-center shadow-md">
            <Link to="/">
                {/* <img src="/logo.png" width={50} height={50} alt="Logo" className="hover:opacity-90 transition-opacity" /> */}
                <h2>ResumeCraft</h2>
            </Link>

            {isSignedIn ? (
                <div className="flex items-center gap-4">
                    <Link to="/dashboard">
                        <Button  className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-black transition">
                            Dashboard
                        </Button>
                    </Link>
                    <UserButton />
                </div>
            ) : (
                <Link to="/auth/sign-in">
                    <Button className="bg-white text-white font-semibold hover:bg-gray-100 transition">
                        Get Started
                    </Button>
                </Link>
            )}
        </div>
    );
}

export default Header;
