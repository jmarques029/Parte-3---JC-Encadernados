"use client";

import React, { useState, useEffect } from 'react';
import { makeLoanUseCases } from '@/core/factories/makeLoanUseCases';
import { Loan } from '@/core/domain/entities/Loan';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

export default function LoansAdminPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const { user } = useAuth();
  const loanUseCases = makeLoanUseCases();

  const loadLoans = async () => {
    try {
      if (!user) return;

      const userLoans = await loanUseCases.findLoansByUser.execute({ userId: user.id });
      setLoans(userLoans);
    } catch (error) {
      toast.error('Erro ao carregar empréstimos');
      console.error('Error loading loans:', error);
    }
  };

  useEffect(() => {
    loadLoans();
  }, [user]);

  const handleReturnBook = async (loanId: string) => {
    try {
      await loanUseCases.returnBook.execute({ loanId });
      toast.success('Livro devolvido com sucesso!');
      loadLoans();
    } catch (error) {
      toast.error('Erro ao devolver livro');
      console.error('Error returning book:', error);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Meus Empréstimos</h1>

      {loans.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Você não tem empréstimos ativos.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Livro</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Data do Empréstimo</TableHead>
              <TableHead>Data de Devolução</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.book?.title.value || 'N/A'}</TableCell>
                <TableCell>{loan.book?.author.value || 'N/A'}</TableCell>
                <TableCell>{new Date(loan.loanDate).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>
                  {loan.returnDate ? new Date(loan.returnDate).toLocaleDateString('pt-BR') : '-'}
                </TableCell>
                <TableCell>
                  {loan.returnDate ? (
                    <span style={{ color: 'green' }}>Devolvido</span>
                  ) : (
                    <span style={{ color: 'orange' }}>Emprestado</span>
                  )}
                </TableCell>
                <TableCell>
                  {!loan.returnDate && (
                    <Button size="sm" onClick={() => handleReturnBook(loan.id)}>
                      Devolver
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
