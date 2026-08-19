import prisma from '@/lib/prisma';
import BooksClient from './BooksClient';

export default async function BooksPage() {
  const books = await prisma.book.findMany({ orderBy: { createdAt: 'desc' } });
  return <BooksClient books={books} />;
}
