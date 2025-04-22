import { create } from 'zustand';

type ModalState = {
    openCreateTask: boolean;
    openEditTask: boolean;
    openDeleteTask: boolean;
    setOpenCreateTask: (open: boolean) => void;
    setOpenEditTask: (open: boolean) => void;
    setOpenDeleteTask: (open: boolean) => void;
};

export const useModalStore = create<ModalState>((set) => ({
    openCreateTask: false,
    openEditTask: false,
    openDeleteTask: false,
    setOpenCreateTask: (open) => set({ openCreateTask: open }),
    setOpenEditTask: (open) => set({ openEditTask: open }),
    setOpenDeleteTask: (open) => set({ openDeleteTask: open })
}));
