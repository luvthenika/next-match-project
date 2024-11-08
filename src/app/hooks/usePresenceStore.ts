import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
type PresenceState = {
  members: string[]; //ids of the user who are connected to the app
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
};
// Your store is a hook
const UsePresenceStore = create<PresenceState>()(
    devtools(
      persist(
        (set) => ({
          members: [],
          add: (id) => set((state) => ({ members: [...state.members, id] })),
          remove: (id) =>
            set((state) => ({ members: state.members.filter((m) => m !== id) })),
          set: (ids) => set({ members: ids }),
        }),
        { name: 'presence-store' }
      )
    )
  );
  
    

export default UsePresenceStore;
