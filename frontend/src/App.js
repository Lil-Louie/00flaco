import Intro from './components/Intro';
import HomePage from './pages/HomePage';
import background from './assets/background.jpg'


function App() {
  return (
      <div className="App bg-cover bg-center bg-no-repeat min-h-screen"
           style={{ backgroundImage: `url(${background})` }}
      >
        <Intro/>
        <HomePage/>
      </div>
  );
}

export default App;
