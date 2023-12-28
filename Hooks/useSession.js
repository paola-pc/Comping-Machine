import { create } from 'zustand';

const useSession = create((set) => ({
  chordType: '',
  rootNote: '',
  updateType: (type) => set({ chordType: type }),
  updateRoot: (note) => set({ rootNote: note }),
}))

export default useSession;