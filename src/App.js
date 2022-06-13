import React from 'react';
import StarProvider from './StarContext/StarProvider';
import ListFilter from './Components/ListFilter';
import Header from './Components/Header';

function App() {
  return (
    <StarProvider>
      <Header />
      <ListFilter />
    </StarProvider>
  );
}

export default App;
