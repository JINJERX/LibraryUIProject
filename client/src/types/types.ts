export interface Book {
  id: number;
  title: string;
  yearPublished: number;
  authorId: number;
  genreId: number;
  authorName: string;
  genreName: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface BookFormData {
  id?: number;
  title: string;
  year: number;
  authorId: number;
  genreId: number;
}
