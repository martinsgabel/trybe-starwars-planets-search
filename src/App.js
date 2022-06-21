import React from 'react';
import StarProvider from './StarContext/StarProvider';
import TableList from './Components/TableList';
import Header from './Components/Header';

function App() {
  return (
    <StarProvider>
      <Header />
      <TableList />
    </StarProvider>
  );
}

export default App;
