import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookDetailsPage from '@/app/detalhes/[id]/page';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { makeBookUseCases } from '@/core/factories/makeBookUseCases';
import { makeLoanUseCases } from '@/core/factories/makeLoanUseCases';
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

jest.mock('next/navigation');
jest.mock('@/context/AuthContext');
jest.mock('@/core/factories/makeBookUseCases');
jest.mock('@/core/factories/makeLoanUseCases');
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('BookDetailsPage', () => {
  const mockUser = User.create(
    '1',
    Name.create('John Doe'),
    Email.create('john@example.com'),
    Password.create('Password123!')
  );

  const mockBook = Book.create(
    '1',
    Title.create('Test Book'),
    Author.create('Test Author'),
    BindingType.create('HARDCOVER'),
    100,
    CoverType.create('LEATHER'),
    29.99,
    Photo.create('https://example.com/book.jpg'),
    '1',
    mockUser
  );

  const mockPush = jest.fn();
  const mockBorrowBook = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    const mockFindBook = {
      execute: jest.fn().mockResolvedValue(mockBook),
    };

    (makeBookUseCases as jest.Mock).mockReturnValue({
      findBook: mockFindBook,
    });

    mockBorrowBook.mockResolvedValue({});
    (makeLoanUseCases as jest.Mock).mockReturnValue({
      borrowBook: { execute: mockBorrowBook },
    });
  });

  it('should render book details', async () => {
    render(<BookDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
      expect(screen.getByText('Test Author')).toBeInTheDocument();
    });
  });

  it('should show loading state initially', () => {
    render(<BookDetailsPage />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should call borrowBook when button is clicked', async () => {
    render(<BookDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
    });

    const borrowButton = screen.getByText('Emprestar Livro');
    fireEvent.click(borrowButton);

    await waitFor(() => {
      expect(mockBorrowBook).toHaveBeenCalledWith({
        userId: '1',
        bookId: '1',
      });
      expect(mockPush).toHaveBeenCalledWith('/admin/loans');
    });
  });

  it('should redirect to login if user is not authenticated', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
    });

    render(<BookDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
    });

    const borrowButton = screen.getByText('Emprestar Livro');
    fireEvent.click(borrowButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });
});
