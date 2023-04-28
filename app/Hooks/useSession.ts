import { create } from 'zustand';
// zustand, light weight library for global state management, simpler than redux... yes

export interface SessionState {
  chordType: string;
  rootNote: string;
  updateType: (type: string) => void;
  updateRoot: (note: string) => void;
}
// Creation of the store:
const useSession = create<SessionState>((set) => ({
  chordType: '',
  rootNote: '',
  updateType: (type) => set({ chordType: type }),
  updateRoot: (note) => set({ rootNote: note }),
}))

export default useSession;