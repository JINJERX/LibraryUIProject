import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import AuthorCard from '../components/AuthorCard';
import AuthorForm from '../components/AuthorForm';
import { getAllAuthors, createAuthor, updateAuthor, deleteAuthor } from '../services/authorService';

interface Author {
  id: number;
  name: string;
}

const AuthorsPage: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);

  useEffect(() => {
    getAllAuthors()
      .then(setAuthors)
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (name: string) => {
    createAuthor(name)
      .then((newAuthor: Author) => {
        setAuthors(prev => [...prev, newAuthor]);
        setShowForm(false);
      })
      .catch((err: any) => alert(err.message));
  };

  const handleEdit = (author: Author) => {
    setEditingAuthor(author);
    setShowForm(true);
  };

  const handleUpdate = (name: string) => {
    if (!editingAuthor) return;
    updateAuthor(editingAuthor.id, name)
      .then((updated: Author) => {
        setAuthors(prev => prev.map(a => a.id === updated.id ? updated : a));
        setEditingAuthor(null);
        setShowForm(false);
      })
      .catch((err: any) => alert(err.message));
  };

  const handleDelete = (id: number) => {
    deleteAuthor(id)
      .then(() => setAuthors(prev => prev.filter(a => a.id !== id)))
      .catch((err: any) => alert(err.message));
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Авторы
          </Typography>

          {showForm ? (
            <AuthorForm
              initialName={editingAuthor?.name}
              onSubmit={editingAuthor ? handleUpdate : handleAdd}
              onCancel={() => { setShowForm(false); setEditingAuthor(null); }}
            />
          ) : (
            <Button variant="contained" onClick={() => setShowForm(true)} sx={{ mb: 2 }}>
              ➕ Добавить автора
            </Button>
          )}

          {loading ? (
            <Typography>Загрузка...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            authors.map((author) => (
              <AuthorCard
                key={author.id}
                author={author}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthorsPage;
