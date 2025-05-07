"use client"

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect } from 'react'
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNotesStore } from '@/lib/store'

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
}

const TipTapEditor = ({ content, onChange }: TipTapEditorProps) => {
  const [isMounted, setIsMounted] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert focus:outline-none min-h-[200px] max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!isMounted) {
    return null
  }

  return (
    <div className="relative">
      {editor && (
        <BubbleMenu 
          editor={editor} 
          tippyOptions={{ duration: 100 }}
          className="bg-white dark:bg-gray-800 rounded-md shadow-md p-1 flex items-center gap-1 border border-gray-200 dark:border-gray-700"
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-1 h-8 ${editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}`}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-1 h-8 ${editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}`}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-1 h-8 ${editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}`}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-1 h-8 ${editor.isActive('bold') ? 'bg-muted' : ''}`}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-1 h-8 ${editor.isActive('italic') ? 'bg-muted' : ''}`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-1 h-8 ${editor.isActive('bulletList') ? 'bg-muted' : ''}`}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`p-1 h-8 ${editor.isActive('orderedList') ? 'bg-muted' : ''}`}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </BubbleMenu>
      )}
      <div className="prose-container">
        <style jsx global>{`
          .ProseMirror {
            min-height: 200px;
            padding: 1rem;
          }
          .ProseMirror h1 {
            font-size: 2em;
            font-weight: bold;
            margin-top: 0.67em;
            margin-bottom: 0.67em;
          }
          .ProseMirror h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin-top: 0.83em;
            margin-bottom: 0.83em;
          }
          .ProseMirror h3 {
            font-size: 1.17em;
            font-weight: bold;
            margin-top: 1em;
            margin-bottom: 1em;
          }
          .ProseMirror p {
            margin-top: 1em;
            margin-bottom: 1em;
          }
          .ProseMirror ul {
            list-style-type: disc;
            padding-left: 1.5em;
            margin-top: 1em;
            margin-bottom: 1em;
          }
          .ProseMirror ol {
            list-style-type: decimal;
            padding-left: 1.5em;
            margin-top: 1em;
            margin-bottom: 1em;
          }
        `}</style>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default TipTapEditor