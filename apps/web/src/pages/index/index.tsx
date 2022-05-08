import { Route, Routes } from 'react-router-dom';
import { Text } from '../../components/Text';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Text>Home</Text>} />
      <Route path="/page-2" element={<Text>Page 2</Text>} />
    </Routes>
  );
}

export default App;
