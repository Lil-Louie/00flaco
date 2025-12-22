import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

function Home() {
  return (
    <div
      className="
        mx-auto
        flex flex-col lg:flex-row
        gap-25 lg:gap-20
        px-4 lg:px-0
      "
    >
      {/* Sidebar:
          - show on mobile/tablet
          - becomes sticky + sized only on lg+ */}
      <aside
        className="
          flex flex-col
          text-sm
          lg:w-[40%]
          lg:sticky lg:top-0
          lg:max-h-screen
          lg:justify-between
          lg:py-25
          lg:pl-30
          lg:m-0
          mt-10 ml-2 
          gap-0
        "
      >
        <div className="space-y-8 lg:space-y-12">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
              Hi, I’m Luis
            </h1>

            <h2 className="mt-2 font-bold text-xl text-slate-100">
              Software Engineer <span className="text-slate-400">| Front-End Focus</span>
            </h2>


            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-sm lg:max-w-md">
              I create things, learn constantly, and share the process here.
            </p>
          </div>

          {/* In-page nav (only on lg+) */}
          <nav className="hidden lg:block lg:pt-0 pt-4" aria-label="In-page jump links">
            <ul className="w-max space-y-1">
              <li>
                <a href="#about" className="group flex items-center py-3">
                  <span className="mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200">
                    About
                  </span>
                </a>
              </li>

              <li>
                <a href="#projects" className="group flex items-center py-3">
                  <span className="mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200">
                    Projects
                  </span>
                </a>
              </li>

              <li>
                <a href="#games" className="group flex items-center py-3">
                  <span className="mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200">
                    Games
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>


        {/* Social Row */}
        <ul className=" mt-8 flex items-center gap-6 text-sm text-slate-400" aria-label="Social media">
          <li>
            <a
              className=" transition hover:text-slate-200"
              href="https://www.linkedin.com/in/luis-galvez-diaz-2a448a192/"
              target="_blank"
              rel="noreferrer noopener"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="transition hover:text-slate-200"
              href="https://www.instagram.com/00flacco"
              target="_blank"
              rel="noreferrer noopener"
            >
              Instagram
            </a>
          </li>
        </ul>
      </aside>

      {/* Main content:
          - normal page flow on < lg
          - scrollable panel on lg+ */}
      <main
        id="main"
        className="
          w-full flex-1
          space-y-25
          lg:pt-25
          lg:pr-35
          overflow-visible
          text-slate-300
          leading-relaxed
        "
      >
      <section id="about" className="scroll-mt-24">
        {/* Mobile section label */}
        <h3 className="lg:hidden mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">
          About
        </h3>
        <div className="max-w-prose space-y-5 text-slate-300 leading-relaxed">
          <p>
            I’m a developer passionate about creating simple, elegant user interfaces
            that prioritize performance and usability. I enjoy the craft of combining
            beauty and clarity with resilience and robustness. As a developer, these
            are the values I live by and strive to embed into every project.
          </p>

          <p>
            I am a recent graduate with a double major in pure mathematics and computer
            science, based in Northern California, and I’m pursuing a career as a
            software engineer with a front-end focus. Over the past year, I’ve built
            many front-end projects both independently and collaboratively. My proudest
            work is my personal website, and my most professional accomplishment is a
            business website I created for a small company I worked with.
          </p>

          <p>
            During my undergraduate studies, I worked on several full-stack projects
            with teams that used agile-based workflows to define measurable goals and
            maintain productivity. I also took on the responsibility of building a
            business website for a small company, which successfully gained traction
            after launch.
          </p>

          <p>
            In my spare time, I self-study pure mathematics, especially modern algebra,
            and explore topics in security and software exploits. My life isn’t
            completely consumed by computers, though; I spend a lot of time exercising,
            traveling, and enjoying quality time with my partner.
          </p>
        </div>
      </section>


        <section id="projects" className="scroll-mt-24 space-y-6">
          <h2 className="text-3xl font-bold text-slate-100">Projects</h2>

          <div className="space-y-10">
          <ProjectCard
              title="Tevent"
              description="A full-stack event discovery and management app that lets individuals and local businesses create, share, and explore events happening nearby. Authenticated users can create accounts, publish events, view attendance, and see event locations on an interactive map. Built with React, Node.js, MongoDB, Auth0, JWT, a calendar interface, and Google Maps."
              link="https://github.com/Lil-Louie/Tevent"
              tech={["React", "Node.js", "ScheduleX", "Auth0", "MongoDB"]}
            />

            <ProjectCard
              title="GameUP"
              description="A full-stack pickup game discovery platform that lets users explore, create, and join local games ranging from sports to video games. Features authenticated user accounts, event creation and management, attendance visibility, and dedicated explore and profile pages. Built with React, Node.js, MySQL, Railway, Koa, and Tailwind CSS."
              link="https://github.com/Lil-Louie/GameUP"
              tech={["React", "Tailwind", "Node.js", "Koa", "MySQL"]}
            />

            <ProjectCard
              title="Solano Solar Cleaning"
              description="A modern, SEO-optimized website for a solar panel cleaning business. Designed and built from the ground up with a clean responsive layout and fast-loading static deployment."
              link="https://solanosolarcleaning.com"
              tech={["HTML", "CSS", "JavaScript", "Node.js", "SEO"]}
            />
          </div>
        </section>

        <section id="games" className="scroll-mt-24 space-y-6">
          <h2 className="text-3xl font-bold text-slate-100">Games</h2>

          <div className="space-y-10">
            <Link to="/games/snake" className="block">
              <ProjectCard
                title="Snake"
                description="A classic Snake game built with React featuring a custom game loop, constant-time (O(1)) movement and collision checks, and responsive keyboard controls."
                link="/games/snake"
                tech={["React", "Game Loop", "MUI"]}
              />
            </Link>

            <Link to="/games/wordle" className="block">
              <ProjectCard
                title="Wordle"
                description="A Wordle-inspired word guessing game featuring deterministic game logic, structured state management, and a polished, responsive user interface."
                link="/games/wordle"
                tech={["React", "State Mgmt", "UX"]}
              />
            </Link>
          </div>
        </section>
        <div className=""/>
      </main>
    </div>
  );
}

export default Home;
