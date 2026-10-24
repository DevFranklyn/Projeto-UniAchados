import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LostItem } from '../types';
import { mockItems } from '../mocks/db';

interface ItemsState {
  items: LostItem[];
  addItem: (item: LostItem) => void;
  updateItemStatus: (id: string, newStatus: LostItem['status']) => void;
}

export const useItemsStore = create<ItemsState>()(
  persist(
    (set) => ({
      items: mockItems, // Começa com os dados do mock
      addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
      updateItemStatus: (id, newStatus) => set((state) => ({
        items: state.items.map(item => 
          item.id === id ? { ...item, status: newStatus } : item
        )
      })),
    }),
    {
      name: 'achados-perdidos-items',
    }
  )
);