import Layout from './components/Layout';
import Home from './pages/Home';
import Games from './pages/Games';
import Snake from './games/snake/snake';   // example
import Wordle from './games/wordle/Wordle';     // when you have it
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/snake" element={<Snake />} />
        <Route path="/games/wordle" element={<Wordle />} />
      </Routes>
    </Layout>
  );
}

export default App;
