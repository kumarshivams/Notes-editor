"use client"

import { useState, useRef, useEffect } from 'react'
import { useNotesStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SendHorizontal, X } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatMessage } from '@/types'

interface ChatInterfaceProps {
  noteId: string
}

const ChatInterface = ({ noteId }: ChatInterfaceProps) => {
  const { chatHistories, addChatMessage, closeChat } = useNotesStore()
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  
  const chatHistory = chatHistories.find(history => history.noteId === noteId)
  const messages = chatHistory?.messages || []
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setIsTyping(true)
      addChatMessage(noteId, message, 'user')
      setMessage('')
      // Simulate AI typing delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsTyping(false)
    }
  }
  
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background shadow-lg transition-all duration-300 ease-in-out overflow-hidden z-10 h-72">
      <div className="h-full flex flex-col">
        <div className="px-4 py-2 border-b border-border flex items-center justify-between">
          <h3 className="font-medium text-sm">AI Assistant</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={closeChat}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              Ask me anything about your note.
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <ChatMessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-2 rounded-lg max-w-[80%]">
                    <div className="flex space-x-2">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce delay-100">.</span>
                      <span className="animate-bounce delay-200">.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        
        <form onSubmit={handleSubmit} className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!message.trim() || isTyping}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface ChatMessageBubbleProps {
  message: ChatMessage
}

const ChatMessageBubble = ({ message }: ChatMessageBubbleProps) => {
  const isUser = message.role === 'user'
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  )
}

export default ChatInterface