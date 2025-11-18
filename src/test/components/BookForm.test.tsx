import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookForm, BookInterface } from '@/components/BookForm';
import { Book } from '@/core/domain/entities/Book';
import { Title } from '@/core/domain/value-objects/Title';
import { Author } from '@/core/domain/value-objects/Author';
import { BindingType } from '@/core/domain/value-objects/BindingType';
import { CoverType } from '@/core/domain/value-objects/CoverType';
import { Photo } from '@/core/domain/value-objects/Photo';

describe('BookForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty form for new book', () => {
    render(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Autor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo de Encadernação/i)).toBeInTheDocument();
  });

  it('should render form with book data when editing', () => {
    const mockBook = Book.create(
      '1',
      Title.create('Test Book'),
      Author.create('Test Author'),
      BindingType.create('HARDCOVER'),
      100,
      CoverType.create('LEATHER'),
      29.99,
      Photo.create('https://example.com/book.jpg')
    );

    render(<BookForm book={mockBook} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByDisplayValue('Test Book')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Author')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
  });

  it('should call onSubmit with form data', () => {
    render(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const titleInput = screen.getByLabelText(/Título/i);
    const authorInput = screen.getByLabelText(/Autor/i);

    fireEvent.change(titleInput, { target: { value: 'New Book' } });
    fireEvent.change(authorInput, { target: { value: 'New Author' } });

    const form = titleInput.closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('should update form fields on change', () => {
    render(<BookForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const titleInput = screen.getByLabelText(/Título/i) as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    expect(titleInput.value).toBe('Updated Title');
  });
});
