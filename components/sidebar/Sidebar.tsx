"use client"

import { useNotesStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, FileText, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const Sidebar = () => {
  const { notes, activeNoteId, addNote, setActiveNote, deleteNote } = useNotesStore()
  
  return (
    <div className="h-full flex flex-col border-r border-border">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold">My Notes</h2>
        <Button 
          onClick={addNote} 
          variant="ghost" 
          size="icon"
          title="Create new note"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea className="flex-grow">
        {notes.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground">
            No notes yet. Create one to get started.
          </div>
        ) : (
          <div className="py-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`group flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-muted/50 ${
                  note.id === activeNoteId ? 'bg-muted' : ''
                }`}
                onClick={() => setActiveNote(note.id)}
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate">
                      {note.title || 'Untitled Note'}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {formatDistanceToNow(new Date(note.updatedAt), { 
                        addSuffix: true 
                      })}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNote(note.id)
                  }}
                  title="Delete note"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default Sidebar