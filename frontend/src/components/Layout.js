import background from '../assets/background.jpg';

function Layout({ children }) {
  return (
    <div
      className="App bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <main className="p-0 text-white">
        {children}
      </main>
    </div>
  );
}

export default Layout;
