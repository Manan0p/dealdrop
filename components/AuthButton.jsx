"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { LogIn, LogOut } from 'lucide-react'
import { AuthModal } from './AuthModal'

const AuthButton = ({user}) => {
    const [showAuthModal, setShowAuthModal] = useState(false);

    if (user) {
        return (
            <form action={() => {}}>
                <Button variant='ghost' size='sm' className={"gap-2"}  type="submit">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </form>
        )
    }

  return (
    <div>
        <Button onClick={() => setShowAuthModal(true)} variant="default" size="sm" className={"bg-orange-500 hover:bg-orange-600 gap-2"} >
            <LogIn className="h-4 w-4" />
            Sign In
        </Button>

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}

export default AuthButton