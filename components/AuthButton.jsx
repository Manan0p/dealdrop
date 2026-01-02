"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { LogIn } from 'lucide-react'
import { AuthModal } from './AuthModal'

const AuthButton = ({user}) => {
    const [showAuthModal, setShowAuthModal] = useState(false);

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