import { Book } from '../types/types';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/api/books`;

export async function getAllBooks(): Promise<Book[]> {
  const response = await axios.get<Book[]>(API_URL); 
  return response.data;
}

export async function updateBook(id: number, updatedBook: {
  title: string;
  year: number;
  authorId: number;
  genreId: number;
}) {
  const response = await axios.put(`${API_URL}/${id}`, updatedBook);
  return response.data;
}
