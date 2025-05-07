"use client"

import { useState, useEffect } from 'react'
import { useNotesStore } from '@/lib/store'
import TipTapEditor from './TipTapEditor'
import ChatButton from '../chat/ChatButton'
import ChatInterface from '../chat/ChatInterface'
import { Input } from '@/components/ui/input'

const NoteEditor = () => {
  const { notes, activeNoteId, updateNote, isChatOpen } = useNotesStore()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  
  const activeNote = notes.find(note => note.id === activeNoteId)
  
  // Update local state when active note changes
  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title)
      setContent(activeNote.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [activeNote])
  
  // Update note in store when title or content changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (activeNoteId) {
      updateNote(activeNoteId, newTitle, content)
    }
  }
  
  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    if (activeNoteId) {
      updateNote(activeNoteId, title, newContent)
    }
  }
  
  if (!activeNote) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No note selected</p>
      </div>
    )
  }
  
  return (
    <div className="h-full flex flex-col relative">
      <div className="py-4 px-4 md:px-8">
        <Input
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled Note"
          className="text-xl font-semibold border-none bg-transparent focus-visible:ring-0 px-0 w-full"
        />
      </div>
      
      <div className="flex-grow overflow-auto px-4 md:px-8 pb-24">
        <TipTapEditor 
          content={content} 
          onChange={handleContentChange} 
        />
      </div>
      
      <ChatButton />
      
      {isChatOpen && activeNoteId && (
        <ChatInterface noteId={activeNoteId} />
      )}
    </div>
  )
}

export default NoteEditor