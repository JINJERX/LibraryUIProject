import { API_BASE_URL } from '../config'

const API_URL = `${API_BASE_URL}/api/genres`;

export async function getAllGenres() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Ошибка загрузки жанров');
  return res.json();
}

export async function createGenre(name: string) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error('Ошибка при добавлении жанра');
  return res.json();
}

export async function updateGenre(id: number, name: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error('Ошибка при обновлении жанра');
  return res.json();
}

export async function deleteGenre(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Ошибка при удалении жанра');
}
