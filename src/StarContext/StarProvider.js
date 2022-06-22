import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';

function StarProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [waterAvailabitly, setWaterAvailabitly] = useState(true);
  const [rotationAvailabitly, setRotationAvailabitly] = useState(true);
  const [diameterAvailabitly, setDiameterAvailabitly] = useState(true);
  const [orbitalAvailabitly, setOrbitalAvailabitly] = useState(true);
  const [populationAvailabitly, setPopulationAvailabitly] = useState(true);

  const contextValue = {
    planets,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    filteredPlanets,
    setFilteredPlanets,
    waterAvailabitly,
    setWaterAvailabitly,
    rotationAvailabitly,
    setRotationAvailabitly,
    diameterAvailabitly,
    setDiameterAvailabitly,
    orbitalAvailabitly,
    setOrbitalAvailabitly,
    populationAvailabitly,
    setPopulationAvailabitly,
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
