import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  id: number;
  name: string;
  onEdit: () => void;
  onDelete: () => void;
}

function GenreCard({ id, name, onEdit, onDelete }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <IconButton onClick={onEdit}><EditIcon /></IconButton>
        <IconButton onClick={onDelete}><DeleteIcon /></IconButton>
      </CardContent>
    </Card>
  );
}

export default GenreCard;
