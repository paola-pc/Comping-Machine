import { set } from 'react-hook-form';
import { create } from 'zustand';
// zustand, light weight library for global state management, simpler than redux... yes

// Creation of the store:
const useChord = create((set) => ({
  chordType: '',
  rootNote: '',
  chordIsReady: false,
  updateType: (type) => set({ chordType: type}),
  updateRoot: (note) => set({ rootNote: note }),
  setChordIsReady: (bool) => set({ chordIsReady: bool})
}))

export default useChord;