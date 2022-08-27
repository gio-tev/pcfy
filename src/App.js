import { Routes, Route } from 'react-router-dom';

import Landing from './pages/landing';
import Employee from './pages/employee';
import RecordList from './pages/record-list';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/record-list" element={<RecordList />} />
    </Routes>
  );
}
export default App;
