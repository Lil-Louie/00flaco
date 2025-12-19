import { Link } from "react-router-dom";

function Games() {
  const games = [
    {
      title: "Wordle",
      description: "Guess the country by shape. A fun geography challenge!",
      to: "/games/wordle",
    },
    {
      title: "Snake",
      description: "Classic snake game built with React.",
      to: "/games/snake",
    },
  ];

  return (
    <div className="px-10 lg:py-24 space-y-8">
      <h1 className="text-3xl font-bold">Games</h1>
      <p className="text-gray-300">Select a game to play:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Link
            key={game.title}
            to={game.to}
            className="
              block p-6 rounded-xl border border-white/10 bg-white/5
              hover:bg-white/10 hover:border-white/20
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
              transition
            "
          >
            <h2 className="text-xl font-semibold">{game.title}</h2>
            <p className="mt-2 text-sm text-gray-400">{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Games;
