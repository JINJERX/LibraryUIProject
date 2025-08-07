import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import AuthorsPage from './pages/AuthorsPage';
import GenresPage from './pages/GenresPage';
import EditBookPage from './pages/EditBookPage';

function Navigation() {
  return (
    <nav style={{ padding: '16px', display: 'flex', gap: '16px', background: '#eee' }}>
      <Link to="/">🏠 Главная</Link>
      <Link to="/add-book">📖 Добавить книгу</Link>
      <Link to="/authors">👤 Авторы</Link>
      <Link to="/genres">🎭 Жанры</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/edit-book/:id" element={<EditBookPage />} />
      </Routes>
    </Router>
  );
}

export default App;

