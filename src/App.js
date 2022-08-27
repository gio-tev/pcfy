import { Routes, Route } from 'react-router-dom';

import Landing from './pages/landing';
import Employee from './pages/employee';
import Laptop from './pages/laptop';

import RecordList from './pages/record-list';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/laptop" element={<Laptop />} />
      <Route path="/record-list" element={<RecordList />} />
    </Routes>
  );
}
export default App;
