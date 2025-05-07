"use client"

import { useEffect } from 'react'
import Sidebar from '@/components/sidebar/Sidebar'
import NoteEditor from '@/components/editor/NoteEditor'
import { useNotesStore } from '@/lib/store'

export default function Home() {
  const { notes, addNote } = useNotesStore()
  
  // Create a default note if no notes exist
  useEffect(() => {
    if (notes.length === 0) {
      addNote()
    }
  }, [notes.length, addNote])
  
  return (
    <div className="flex h-screen">
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-hidden">
        <NoteEditor />
      </div>
    </div>
  )
}