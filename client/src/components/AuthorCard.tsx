import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  author: { id: number; name: string };
  onEdit: (author: { id: number; name: string }) => void;
  onDelete: (id: number) => void;
}

const AuthorCard: React.FC<Props> = ({ author, onEdit, onDelete }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{author.name}</Typography>
        <Box>
          <IconButton onClick={() => onEdit(author)}><EditIcon /></IconButton>
          <IconButton onClick={() => onDelete(author.id)}><DeleteIcon /></IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AuthorCard;
