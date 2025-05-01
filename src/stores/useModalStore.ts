import { create } from "zustand";

type ModalState = {
  openCreateTask: boolean;
  openEditTask: boolean;
  openDeleteTask: boolean;
  openLogout: boolean;
  setOpenCreateTask: (open: boolean) => void;
  setOpenEditTask: (open: boolean) => void;
  setOpenDeleteTask: (open: boolean) => void;
  setOpenLogout: (open: boolean) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  openCreateTask: false,
  openEditTask: false,
  openDeleteTask: false,
  openLogout: false,
  setOpenCreateTask: (open) => set({ openCreateTask: open }),
  setOpenEditTask: (open) => set({ openEditTask: open }),
  setOpenDeleteTask: (open) => set({ openDeleteTask: open }),
  setOpenLogout: (open) => set({ openLogout: open }),
}));
