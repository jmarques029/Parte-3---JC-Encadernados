import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '@/app/page';
import { makeBookUseCases } from '@/core/factories/makeBookUseCases';
import { Book } from '@/core/domain/entities/Book';
import { Title } from '@/core/domain/value-objects/Title';
import { Author } from '@/core/domain/value-objects/Author';
import { BindingType } from '@/core/domain/value-objects/BindingType';
import { CoverType } from '@/core/domain/value-objects/CoverType';
import { Photo } from '@/core/domain/value-objects/Photo';
import { User } from '@/core/domain/entities/User';
import { Name } from '@/core/domain/value-objects/Name';
import { Email } from '@/core/domain/value-objects/Email';
import { Password } from '@/core/domain/value-objects/Password';

jest.mock('@/core/factories/makeBookUseCases');

describe('HomePage', () => {
  const mockUser = User.create(
    '1',
    Name.create('John Doe'),
    Email.create('john@example.com'),
    Password.create('Password123!')
  );

  const mockBooks = [
    Book.create(
      '1',
      Title.create('Test Book 1'),
      Author.create('Author 1'),
      BindingType.create('HARDCOVER'),
      100,
      CoverType.create('LEATHER'),
      29.99,
      Photo.create('https://example.com/book1.jpg'),
      '1',
      mockUser
    ),
    Book.create(
      '2',
      Title.create('Test Book 2'),
      Author.create('Author 2'),
      BindingType.create('SOFTCOVER'),
      200,
      CoverType.create('PAPER'),
      19.99,
      Photo.create('https://example.com/book2.jpg'),
      '1',
      mockUser
    ),
  ];

  beforeEach(() => {
    const mockFindAllBook = {
      execute: jest.fn().mockResolvedValue(mockBooks),
    };

    (makeBookUseCases as jest.Mock).mockReturnValue({
      findAllBook: mockFindAllBook,
      registerBook: jest.fn(),
      updateBook: jest.fn(),
      deleteBook: jest.fn(),
      findBook: jest.fn(),
    });
  });

  it('should render the homepage with books', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Nossos Livros')).toBeInTheDocument();
    });
  });

  it('should display all books', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Test Book 1')).toBeInTheDocument();
      expect(screen.getByText('Test Book 2')).toBeInTheDocument();
      expect(screen.getByText('Author 1')).toBeInTheDocument();
      expect(screen.getByText('Author 2')).toBeInTheDocument();
    });
  });

  it('should show book owner name', async () => {
    render(<HomePage />);

    await waitFor(() => {
      const ownerElements = screen.getAllByText(/Dono: John Doe/i);
      expect(ownerElements.length).toBeGreaterThan(0);
    });
  });

  it('should show loading state initially', () => {
    render(<HomePage />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });
});
