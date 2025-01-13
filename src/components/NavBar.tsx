// src/components/NavBar.tsx
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: 'white' }}>
      <ul style={{ display: 'flex', listStyleType: 'none', gap: '20px' }}>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        </li>
        <li>
          <Link to="/add-recipe" style={{ color: 'white', textDecoration: 'none' }}>Add Recipe</Link>
        </li>
        <li>
          <Link to="/recipe" style={{ color: 'white', textDecoration: 'none' }}>Recipes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
