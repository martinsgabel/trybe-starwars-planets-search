import React, { useContext } from 'react';
import StarContext from '../StarContext/StarContext';

function Header() {
  const { filterByName, setFilterByName } = useContext(StarContext);
  return (
    <div>
      <h1>Star Wars Project</h1>
      <input
        data-testid="name-filter"
        placeholder="nome"
        value={ filterByName }
        onChange={ (e) => setFilterByName(e.target.value) }
      />
    </div>
  );
}

export default Header;
