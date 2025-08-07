import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/api/authors`;

export async function getAllAuthors() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Ошибка загрузки авторов');
  return await res.json();
}

export async function createAuthor(name: string) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error('Ошибка при добавлении автора');
  return await res.json();
}

export async function updateAuthor(id: number, name: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error('Ошибка при обновлении автора');
  return await res.json();
}

export async function deleteAuthor(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Ошибка при удалении автора');
}
