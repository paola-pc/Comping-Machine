import { create } from 'zustand';
// zustand, light weight library for global state management, simpler than redux??
export interface useSaveModelType {
  isOpen: boolean,
  onOpen: Function
  onClose: Function
}
// Creation of the store:
const useSaveModal = create<useSaveModelType>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({isOpen : false})
}))

export default useSaveModal;