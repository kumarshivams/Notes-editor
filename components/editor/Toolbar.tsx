"use client"

import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type Editor } from '@tiptap/react'

interface ToolbarProps {
  editor: Editor | null
}

const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) {
    return null
  }

  return (
    <div className="border-b border-border mb-4 pb-2 flex items-center space-x-1">
      <Button 
        variant="ghost" 
        size="sm" 
        className={`p-1 ${editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        title="Heading 1"
      >
        <Heading1 className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`p-1 ${editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading 2"
      >
        <Heading2 className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`p-1 ${editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="Heading 3"
      >
        <Heading3 className="h-5 w-5" />
      </Button>
      
      <div className="h-4 border-l border-border mx-1" />
      
      <Button 
        variant="ghost" 
        size="sm" 
        className={`p-1 ${editor.isActive('bold') ? 'bg-muted' : ''}`}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        <Bold className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`p-1 ${editor.isActive('italic') ? 'bg-muted' : ''}`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
      >
        <Italic className="h-5 w-5" />
      </Button>
      
      <div className="h-4 border-l border-border mx-1" />
      
      <Button 
        variant="ghost" 
        size="sm" 
        className={`p-1 ${editor.isActive('bulletList') ? 'bg-muted' : ''}`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet List"
      >
        <List className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`p-1 ${editor.isActive('orderedList') ? 'bg-muted' : ''}`}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Ordered List"
      >
        <ListOrdered className="h-5 w-5" />
      </Button>
    </div>
  )
}

export default Toolbar