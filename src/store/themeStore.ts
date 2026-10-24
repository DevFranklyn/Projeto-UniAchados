import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((state) => {
        const newDark = !state.isDark;
        if (newDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        return { isDark: newDark };
      }),
    }),
    { 
      name: 'achados-perdidos-theme',
      onRehydrateStorage: () => (state) => {
        if (state?.isDark) document.documentElement.classList.add('dark');
      }
    }
  )
);