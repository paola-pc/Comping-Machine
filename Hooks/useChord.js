import { create } from 'zustand';

const useChord = create((set) => ({
  chordType: '',
  rootNote: '',
  chordIsReady: false,
  updateType: (type) => set({ chordType: type}),
  updateRoot: (note) => set({ rootNote: note }),
  setChordIsReady: (bool) => set({ chordIsReady: bool})
}))

export default useChord;