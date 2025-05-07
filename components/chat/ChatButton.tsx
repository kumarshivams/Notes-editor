"use client"

import { Button } from '@/components/ui/button'
import { useNotesStore } from '@/lib/store'
import { MessageSquare } from 'lucide-react'

const ChatButton = () => {
  const { toggleChat, isChatOpen } = useNotesStore()
  
  return (
    <div className="absolute bottom-4 right-4">
      <Button
        onClick={toggleChat}
        variant="outline"
        size="icon"
        className={`h-12 w-12 rounded-full shadow-md transition-all duration-300 ${
          isChatOpen 
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-background text-foreground hover:bg-muted'
        }`}
      >
        <MessageSquare className="h-5 w-5" />
        <span className={`absolute h-2.5 w-2.5 top-1 right-1 rounded-full bg-primary-foreground ${
          isChatOpen ? 'opacity-100' : 'opacity-0'
        }`}></span>
      </Button>
    </div>
  )
}

export default ChatButton