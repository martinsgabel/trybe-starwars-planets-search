import React, { useContext, useEffect, useState } from 'react';
import StarContext from '../StarContext/StarContext';

// igual não está funcionando
// alguns filtros não funcionam
// não descobri como fazer o botão de delete funcionar

function Header() {
  const { filterByName, setFilterByName, setFilteredPlanets,
    planets, filterByNumericValues, setFilterByNumericValues } = useContext(StarContext);

  const [columnF, setColumnF] = useState('population');
  const [comparisonF, setComparisonF] = useState('maior que');
  const [valueF, setValueF] = useState(0);

  useEffect(() => {
    const filteredPlanetsByName = planets
      .filter((planet) => planet.name.toLowerCase().includes(filterByName));

    const filtersResult = filterByNumericValues.reduce((acc, filter) => (
      acc.filter((planeta) => {
        switch (filter.comparison) {
        case 'maior que':
          return planeta[filter.column] > Number(filter.value);
        case 'menor que':
          return planeta[filter.column] < Number(filter.value);
        case 'igual a':
          return planeta[filter.column] === Number(filter.value);
        default:
          return true;
        }
      })
    ), filteredPlanetsByName);

    console.log(filtersResult);

    setFilteredPlanets(filteredPlanetsByName);
  }, [planets, filterByName, filterByNumericValues]);

  function handleFilterByName({ target }) {
    setFilterByName(target.value.toLowerCase());
  }

  function handleNumbericValues() {
    setFilterByNumericValues(
      [...filterByNumericValues,
        {
          column: columnF,
          comparison: comparisonF,
          value: valueF,
        }],
    );
  }

  function handleDeleteFilter(ind) {
    return setFilterByNumericValues(filterByNumericValues
      .filter((_item, itemInd) => itemInd !== ind));
  }

  return (
    <div>
      <h1>Star Wars Project</h1>
      <div>
        <input
          data-testid="name-filter"
          placeholder="nome"
          value={ filterByName }
          onChange={ handleFilterByName }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          value={ columnF }
          onChange={ (e) => setColumnF(e.target.value) }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>

        <select
          data-testid="comparison-filter"
          value={ comparisonF }
          onChange={ (e) => setComparisonF(e.target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ valueF }
          onChange={ (e) => setValueF(e.target.value) }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleNumbericValues }
        >
          Filtrar
        </button>
      </div>
      {filterByNumericValues.map((filter, ind) => (
        <div key={ `${filter.column}-${ind}` }>
          <p
            key={ `${filter.column}-${ind}` }
          >
            {`${filter.column} ${filter.comparison} ${filter.value}`}
          </p>
          <button
            type="button"
            key={ `${filter.column}` }
            onClick={ () => handleDeleteFilter(ind) }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Header;
