import type { LostItem, User } from '../types';

export const mockUsers: User[] = [
  { id: '1', matricula: 'admin', email: 'admin@uninassau.edu.br', password: '123456', name: 'Administrador UNINASSAU', role: 'ADMIN' },
  { id: '2', matricula: 'porteiro', email: 'porteiro@uninassau.edu.br', password: '123456', name: 'Carlos (Porteiro)', role: 'PORTEIRO' },
];

export const mockItems: LostItem[] = [
  {
    id: 'obj-1',
    title: 'Fone de Ouvido Bluetooth',
    description: 'Fone branco, marca JBL. Encontrado na tomada perto do quadro.',
    category: 'ELETRONICOS',
    location: 'Bloco B - Sala 204',
    dateFound: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
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
  }
];