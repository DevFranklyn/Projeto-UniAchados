export type UserRole = 'ADMIN' | 'PORTEIRO' | 'USUARIO';

export type ObjectStatus = 'DISPONIVEL' | 'SINALIZADO' | 'DEVOLVIDO' | 'ARQUIVADO';

export type Category = 'ELETRONICOS' | 'DOCUMENTOS' | 'VESTUARIO' | 'MATERIAIS' | 'OUTROS';

export interface User {
  id: string;
  matricula: string;
  name: string;
  role: UserRole;
}

export interface LostItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  location: string; // Ex: "Bloco A - Sala 102"
  dateFound: string; // ISO String
  imageUrl: string;
  status: ObjectStatus;
  porterId: string; // Quem cadastrou
  finderName?: string; // Nome de quem entregou (restrito a Admin/Porteiro)
  finderMatricula?: string; // Matrícula de quem entregou (restrito a Admin/Porteiro)
}

export interface Notification {
  id: string;
  itemId: string;
  itemTitle: string;
  date: string;
  read: boolean;
  type: 'SINALIZACAO';
}