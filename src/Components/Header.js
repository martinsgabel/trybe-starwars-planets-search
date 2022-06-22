import React, { useContext, useEffect, useState } from 'react';
import StarContext from '../StarContext/StarContext';

// onde colocar os sets que irão "excluir" as opções do select?

function Header() {
  const { filterByName, setFilterByName, setFilteredPlanets,
    planets, filterByNumericValues, setFilterByNumericValues } = useContext(StarContext);

  const [columnF, setColumnF] = useState('population');
  const [comparisonF, setComparisonF] = useState('maior que');
  const [valueF, setValueF] = useState(0);
  const [filteredColmun, setFilteredColmun] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

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
          return planeta[filter.column] === filter.value;
        default:
          return true;
        }
      })
    ), filteredPlanetsByName);

    console.log(filtersResult);

    setFilteredPlanets(filtersResult);
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

    setFilteredColmun(filteredColmun.filter((col) => col !== columnF));
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
          { filteredColmun.map((col) => (
            <option key={ col }>{ col }</option>
          ))}
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
          data-testid="button-filter"
          type="button"
          onClick={ handleNumbericValues }
        >
          Filtrar
        </button>

        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => setFilterByNumericValues([]) }
        >
          Remover Filtros
        </button>
      </div>
      {filterByNumericValues.map((filter, ind) => (
        <div data-testid="filter" key={ `${filter.column}-${ind}` }>
          <p
            key={ `${filter.column}-${ind}` }
          >
            {`${filter.column} ${filter.comparison} ${filter.value}`}
          </p>
          <button
            data-testid="filter"
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
