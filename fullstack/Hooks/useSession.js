import { create } from 'zustand';
// zustand, light weight library for global state management, simpler than redux... yes

// Creation of the store:
const useSession = create((set) => ({
  chordType: '',
  rootNote: '',
  updateType: (type) => set({ chordType: type }),
  updateRoot: (note) => set({ rootNote: note }),
}))

export default useSession;