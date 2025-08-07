import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface Props {
  initialName?: string;
  onSubmit: (name: string) => void;
  onCancel?: () => void;
}

function GenreForm({ initialName = '', onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initialName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onSubmit(name.trim());
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Название жанра"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Сохранить</Button>
      {onCancel && <Button sx={{ mt: 2, ml: 2 }} onClick={onCancel}>Отмена</Button>}
    </Box>
  );
}

export default GenreForm;
