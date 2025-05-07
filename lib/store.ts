import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note, ChatHistory, ChatMessage } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  chatHistories: ChatHistory[];
  isChatOpen: boolean;
  
  addNote: () => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (id: string) => void;
  
  addChatMessage: (noteId: string, content: string, role: 'user' | 'assistant') => void;
  toggleChat: () => void;
  closeChat: () => void;
}

// Enhanced AI response function that generates more contextual responses
const getAIResponse = (userMessage: string, noteContent: string): string => {
  const keywords = ['what', 'how', 'why', 'can', 'could', 'should', 'would'];
  const isQuestion = keywords.some(keyword => userMessage.toLowerCase().includes(keyword));
  
  // Extract a relevant snippet from the note content
  const contentPreview = noteContent.slice(0, 100).trim();
  
  if (isQuestion) {
    return `Based on your note "${contentPreview}...", I think I can help. ${
      userMessage.toLowerCase().includes('what') 
        ? "Let me explain this concept in detail."
        : "Here's my suggestion for your question."
    }`;
  }
  
  const responses = [
    `I see you're working on "${contentPreview}...". Would you like me to help you expand on these ideas?`,
    `Interesting point about "${contentPreview}...". I can help you develop this further.`,
    `I've analyzed your note and found some key themes. Would you like me to elaborate on any particular aspect?`,
    `Based on your content, I can suggest some related topics or help you structure your thoughts better.`,
    `I notice you're exploring some interesting concepts. Would you like me to provide additional insights?`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      activeNoteId: null,
      chatHistories: [],
      isChatOpen: false,

      addNote: () => {
        const newId = uuidv4();
        const newNote: Note = {
          id: newId,
          title: 'Untitled Note',
          content: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          notes: [...state.notes, newNote],
          activeNoteId: newId,
        }));
      },

      updateNote: (id, title, content) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, title, content, updatedAt: new Date() }
              : note
          ),
        }));
      },

      deleteNote: (id) => {
        const { notes, activeNoteId } = get();
        const filteredNotes = notes.filter((note) => note.id !== id);
        
        let newActiveNoteId = activeNoteId;
        if (activeNoteId === id) {
          newActiveNoteId = filteredNotes.length > 0 ? filteredNotes[0].id : null;
        }
        
        set({
          notes: filteredNotes,
          activeNoteId: newActiveNoteId,
          chatHistories: get().chatHistories.filter((history) => history.noteId !== id),
        });
      },

      setActiveNote: (id) => {
        set({ activeNoteId: id, isChatOpen: false });
      },

      addChatMessage: (noteId, content, role) => {
        const newMessage: ChatMessage = {
          id: uuidv4(),
          content,
          role,
          timestamp: new Date(),
        };
        
        const existingHistoryIndex = get().chatHistories.findIndex(
          (history) => history.noteId === noteId
        );
        
        if (existingHistoryIndex >= 0) {
          set((state) => {
            const updatedHistories = [...state.chatHistories];
            updatedHistories[existingHistoryIndex] = {
              ...updatedHistories[existingHistoryIndex],
              messages: [...updatedHistories[existingHistoryIndex].messages, newMessage],
            };
            return { chatHistories: updatedHistories };
          });
        } else {
          set((state) => ({
            chatHistories: [
              ...state.chatHistories,
              { noteId, messages: [newMessage] },
            ],
          }));
        }
        
        if (role === 'user') {
          setTimeout(() => {
            const activeNote = get().notes.find(note => note.id === noteId);
            const aiResponse = getAIResponse(content, activeNote?.content || '');
            get().addChatMessage(noteId, aiResponse, 'assistant');
          }, 1000);
        }
      },

      toggleChat: () => {
        set((state) => ({ isChatOpen: !state.isChatOpen }));
      },

      closeChat: () => {
        set({ isChatOpen: false });
      },
    }),
    {
      name: 'notes-storage',
    }
  )
);