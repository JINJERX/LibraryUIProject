import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Divider,
  Stack,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

interface Book {
  id: number;
  title: string;
  yearPublished: number;
  authorId: number;
  genreId: number;
  authorName: string;
  genreName: string;
}

interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
  onEdit: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 320,
        m: 2,
        boxShadow: 4,
        borderRadius: 3,
        transition: '0.3s',
        backgroundColor: '#fafafa',
        '&:hover': {
          boxShadow: 8,
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            {book.title}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit(book)}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(book.id)}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">
            📆 Год издания: <strong>{book.yearPublished}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ✍️ Автор: <strong>{book.authorName}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📚 Жанр: <strong>{book.genreName}</strong>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookCard;
