import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';

function StarProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const contextValue = {
    planets,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
  };

  useEffect(() => {
    async function getPlanets() {
      const data = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json());
      setPlanets(data.results);
    }
    getPlanets();
  }, []);
  return (
    <StarContext.Provider value={ contextValue }>
      { children }
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
