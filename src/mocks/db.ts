import { LostItem, User, Notification } from '../types';

// Usuários de teste (para simular o login)
export const mockUsers: User[] = [
  { id: '1', matricula: 'admin', name: 'Administrador UNINASSAU', role: 'ADMIN' },
  { id: '2', matricula: 'porteiro', name: 'Carlos (Porteiro)', role: 'PORTEIRO' },
  { id: '3', matricula: '2024001', name: 'Maria Silva (Aluna)', role: 'USUARIO' },
];

// Objetos encontrados
export const mockItems: LostItem[] = [
  {
    id: 'obj-1',
    title: 'Fone de Ouvido Bluetooth',
    description: 'Fone branco, marca JBL. Encontrado na tomada perto do quadro.',
    category: 'ELETRONICOS',
    location: 'Bloco B - Sala 204',
    dateFound: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dias atrás
    imageUrl: 'https://placehold.co/400x300/EFF6FF/1E40AF?text=Fone+JBL',
    status: 'DISPONIVEL',
    porterId: '2',
    finderName: 'João (Aluno)',
    finderMatricula: '2023105',
  },
  {
    id: 'obj-2',
    title: 'Carteira de Estudante',
    description: 'Carteira da UNINASSAU em nome de Lucas.',
    category: 'DOCUMENTOS',
    location: 'Recepção Principal',
    dateFound: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://placehold.co/400x300/F8FAFC/0F172A?text=Documento',
    status: 'SINALIZADO',
    porterId: '2',
    finderName: 'Ana (Funcionária)',
    finderMatricula: '99882',
  },
  {
    id: 'obj-3',
    title: 'Casaco Moletom Preto',
    description: 'Moletom preto tamanho M, sem marca aparente.',
    category: 'VESTUARIO',
    location: 'Laboratório de Informática 3',
    dateFound: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://placehold.co/400x300/EFF6FF/1E40AF?text=Moletom',
    status: 'DISPONIVEL',
    porterId: '2',
  },
  {
    id: 'obj-4',
    title: 'Calculadora Científica',
    description: 'Calculadora Casio, com o nome Rafa escrito na tampa.',
    category: 'MATERIAIS',
    location: 'Bloco C - Pátio',
    dateFound: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://placehold.co/400x300/F8FAFC/0F172A?text=Calculadora',
    status: 'DEVOLVIDO',
    porterId: '2',
  }
];

// Notificações para o Porteiro
export const mockNotifications: Notification[] = [
  {
    id: 'not-1',
    itemId: 'obj-2',
    itemTitle: 'Carteira de Estudante',
    date: new Date().toISOString(),
    read: false,
    type: 'SINALIZACAO',
  }
];