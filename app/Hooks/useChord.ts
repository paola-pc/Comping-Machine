import { create } from 'zustand';
// zustand, light weight library for global state management, simpler than redux... yes
export interface useChordType {
  chordType: string,
  rootNote: string,
  updateType: Function,
  updateRoot: Function,
}
// Creation of the store:

const useChord = create<useChordType>((set) => ({
  chordType: '',
  rootNote: '',
  updateType: (type:string) => set({ chordType: type}),
  updateRoot: (note:string) => set({ rootNote: note }),
}))

export default useChord;