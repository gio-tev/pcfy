import { Routes, Route } from 'react-router-dom';

import Landing from './pages/landing';
import Employee from './pages/employee';
import Laptop from './pages/laptop';
import Success from './pages/success';
import Records from './pages/records';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/laptop" element={<Laptop />} />
      <Route path="/success" element={<Success />} />
      <Route path="/records" element={<Records />} />
    </Routes>
  );
}
export default App;
