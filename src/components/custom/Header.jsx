import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

function Header() {
    const { user, isSignedIn } = useUser();

    return (
        <div className="w-full z-20 bg-gray-900/80 backdrop-blur-md border-b border-white/20 text-white px-4 py-3 md:px-6 md:py-4 flex justify-between items-center shadow-lg">
            <Link to="/">
                <h2 className="text-xl md:text-2xl font-bold text-white hover:text-purple-300 transition-colors">
                    ResumeCraft
                </h2>
            </Link>

            {isSignedIn ? (
                <div className="flex items-center gap-2 md:gap-4">
                    <a
                        href="/dashboard"
                        className="px-4 py-2 md:px-6 md:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm md:text-base hover:bg-white/20 transition-all"
                        style={{ color: "white" }}
                    >
                        Dashboard
                    </a>
                
                    <UserButton
                        appearance={{
                            elements: {
                                userButtonTrigger: "h-8 w-8 md:h-10 md:w-10",
                                userButtonPopoverCard: "backdrop-blur-md bg-gray-900/80 border border-white/20",
                            },
                        }}
                    />
                </div>
            ) : (
                <div className="flex gap-2">
                    <Link to="/auth/sign-in">
                        <Button className="backdrop-blur-md bg-white/10 border border-white/20 px-6 py-2.5 md:px-8 md:py-3.5 rounded-lg hover:bg-white/20 transition-all text-sm md:text-base" style={{ color: "white" }}>
                            Get Started
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Header;