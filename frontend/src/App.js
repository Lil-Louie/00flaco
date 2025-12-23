import Layout from './components/Layout';
import Home from './pages/Home';
import Games from './pages/Games';
import Snake from './games/snake/snake';
import Wordle from './games/wordle/Wordle';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />

        <Route
          path="/games/snake"
          element={
            <div className="h-[100dvh] overflow-hidden overscroll-none">
              <Snake />
            </div>
          }
        />

        <Route
          path="/games/wordle"
          element={
            <div className="h-[100dvh] overflow-hidden overscroll-none">
              <Wordle />
            </div>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
