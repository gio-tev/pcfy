import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/landing';
import Employee from './pages/employee';
import Laptop from './pages/laptop';
import Records from './pages/records';
import Record from './pages/record';

const App = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/employee" element={<Employee />} />
    <Route path="/laptop" element={<Laptop />} />
    <Route path="/records" element={<Records />} />
    <Route path="/records/:id" element={<Record />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
