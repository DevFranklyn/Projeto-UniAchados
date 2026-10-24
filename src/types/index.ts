export type UserRole = 'ADMIN' | 'PORTEIRO' | 'USUARIO';
export type ObjectStatus = 'DISPONIVEL' | 'SINALIZADO' | 'DEVOLVIDO' | 'ARQUIVADO';
export type Category = 'ELETRONICOS' | 'DOCUMENTOS' | 'VESTUARIO' | 'MATERIAIS' | 'OUTROS';

export interface User {
  id: string;
  matricula?: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
}

export interface LostItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  location: string;
  dateFound: string;
  imageUrl: string;
  status: ObjectStatus;
  porterId: string;
  finderName?: string;
  finderMatricula?: string;
  receivedByName?: string;
  receivedByMatricula?: string;
  receivedByCPF?: string;
  receivedByAddress?: string;
  deliveredAt?: string;
}