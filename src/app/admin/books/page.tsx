"use client";

import React, { useState, useEffect } from 'react';
import { makeBookUseCases } from '@/core/factories/makeBookUseCases';
import { Book } from '@/core/domain/entities/Book';
import { BookForm, BookInterface } from '@/components/BookForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

export default function BooksAdminPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);
  const { user } = useAuth();
  const bookUseCases = makeBookUseCases();

  const loadBooks = async () => {
    try {
      const allBooks = await bookUseCases.findAllBook.execute();
      setBooks(allBooks);
    } catch (error) {
      toast.error('Erro ao carregar livros');
      console.error('Error loading books:', error);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleCreateBook = async (bookData: BookInterface) => {
    try {
      if (!user) {
        toast.error('Usuário não autenticado');
        return;
      }

      await bookUseCases.registerBook.execute({
        title: bookData.title,
        author: bookData.author,
        bindingType: bookData.bindingType,
        pages: bookData.pages,
        coverType: bookData.coverType,
        price: bookData.price,
        photoUrl: bookData.imageUrl,
        userId: user.id,
      });
      toast.success('Livro criado com sucesso!');
      setIsDialogOpen(false);
      loadBooks();
    } catch (error) {
      toast.error('Erro ao criar livro');
      console.error('Error creating book:', error);
    }
  };

  const handleUpdateBook = async (bookData: BookInterface) => {
    try {
      if (!bookData.id || !user) {
        toast.error('Dados inválidos');
        return;
      }

      await bookUseCases.updateBook.execute({
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        bindingType: bookData.bindingType,
        pages: bookData.pages,
        coverType: bookData.coverType,
        price: bookData.price,
        photoUrl: bookData.imageUrl,
        userId: user.id,
      });
      toast.success('Livro atualizado com sucesso!');
      setIsDialogOpen(false);
      setEditingBook(undefined);
      loadBooks();
    } catch (error) {
      toast.error('Erro ao atualizar livro');
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!confirm('Tem certeza que deseja excluir este livro?')) {
      return;
    }

    try {
      await bookUseCases.deleteBook.execute({ id: bookId });
      toast.success('Livro excluído com sucesso!');
      loadBooks();
    } catch (error) {
      toast.error('Erro ao excluir livro');
      console.error('Error deleting book:', error);
    }
  };

  const openCreateDialog = () => {
    setEditingBook(undefined);
    setIsDialogOpen(true);
  };

  const openEditDialog = (book: Book) => {
    setEditingBook(book);
    setIsDialogOpen(true);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Gerenciar Livros</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>Novo Livro</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBook ? 'Editar Livro' : 'Novo Livro'}</DialogTitle>
            </DialogHeader>
            <BookForm
              book={editingBook}
              onSubmit={editingBook ? handleUpdateBook : handleCreateBook}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingBook(undefined);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Páginas</TableHead>
            <TableHead>Tipo de Encadernação</TableHead>
            <TableHead>Tipo de Capa</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title.value}</TableCell>
              <TableCell>{book.author.value}</TableCell>
              <TableCell>{book.pages}</TableCell>
              <TableCell>{book.bindingType.value}</TableCell>
              <TableCell>{book.coverType.value}</TableCell>
              <TableCell>R$ {book.price.toFixed(2)}</TableCell>
              <TableCell>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button size="sm" onClick={() => openEditDialog(book)}>
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteBook(book.id)}>
                    Excluir
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
