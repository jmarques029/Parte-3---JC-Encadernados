"use client";

import React, { useState, useEffect } from 'react';
import { Book } from '@/core/domain/entities/Book';

export interface BookInterface {
  id?: string;
  title: string;
  author: string;
  bindingType: 'HARDCOVER' | 'SOFTCOVER' | 'SPIRAL';
  pages: number;
  coverType: 'LEATHER' | 'CLOTH' | 'PAPER';
  price: number;
  imageUrl: string;
}

interface BookFormProps {
  book?: Book;
  onSubmit: (book: BookInterface) => void;
  onCancel: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<BookInterface>({
    title: '',
    author: '',
    bindingType: 'HARDCOVER',
    pages: 0,
    coverType: 'LEATHER',
    price: 0,
    imageUrl: '',
  });

  useEffect(() => {
    if (book) {
      setFormData({
        id: book.id,
        title: book.title.value,
        author: book.author.value,
        bindingType: book.bindingType.value,
        pages: book.pages,
        coverType: book.coverType.value,
        price: book.price,
        imageUrl: book.photo.url,
      });
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pages' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div>
        <label htmlFor="author">Autor</label>
        <input
          id="author"
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div>
        <label htmlFor="bindingType">Tipo de Encadernação</label>
        <select
          id="bindingType"
          name="bindingType"
          value={formData.bindingType}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        >
          <option value="HARDCOVER">Capa Dura</option>
          <option value="SOFTCOVER">Capa Mole</option>
          <option value="SPIRAL">Espiral</option>
        </select>
      </div>

      <div>
        <label htmlFor="pages">Páginas</label>
        <input
          id="pages"
          name="pages"
          type="number"
          value={formData.pages}
          onChange={handleChange}
          required
          min="1"
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div>
        <label htmlFor="coverType">Tipo de Capa</label>
        <select
          id="coverType"
          name="coverType"
          value={formData.coverType}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        >
          <option value="LEATHER">Couro</option>
          <option value="CLOTH">Tecido</option>
          <option value="PAPER">Papel</option>
        </select>
      </div>

      <div>
        <label htmlFor="price">Preço (€)</label>
        <input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div>
        <label htmlFor="imageUrl">URL da Imagem</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          type="submit"
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#8B4513',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {book ? 'Atualizar' : 'Criar'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
