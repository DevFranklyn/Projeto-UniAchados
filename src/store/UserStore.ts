import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { mockUsers } from '../mocks/db';

interface UsersState {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
  updatePassword: (email: string, newPassword: string) => boolean;
  registerStudentByEmail: (email: string) => User | null;
}

export const useUsersStore = create<UsersState>()(
  persist(
    (set, get) => ({
      users: mockUsers,
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      removeUser: (id) => set((state) => ({ users: state.users.filter(u => u.id !== id) })),
      
      updatePassword: (email, newPassword) => {
        const userExists = get().users.find(u => u.email === email);
        if (userExists) {
          set((state) => ({
            users: state.users.map(u => u.email === email ? { ...u, password: newPassword } : u)
          }));
          return true;
        }
        return false;
      },

      registerStudentByEmail: (email) => {
        const existingUser = get().users.find(u => u.email === email);
        if (existingUser) return existingUser;

        const matriculaExtraida = email.split('@')[0];
        const newUser: User = {
          id: crypto.randomUUID(),
          email,
          matricula: matriculaExtraida,
          name: `Aluno ${matriculaExtraida}`,
          role: 'USUARIO',
        };

        set((state) => ({ users: [...state.users, newUser] }));
        return newUser;
      }
    }),
    { name: 'achados-perdidos-users' }
  )
);