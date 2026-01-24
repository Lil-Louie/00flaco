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
              Software Engineer <span className="text-slate-400">| Security Engineer</span>
            </h2>


            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-sm lg:max-w-md">
            Pure Mathematics and Computer Science graduate pursuing software and security engineering roles.            </p>
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
          <p>During my undergraduate studies, I developed a strong understanding of
          C and C++ through hands on systems projects. These include building a C
          interpreter, implementing a Unix-style Bash shell, and performing binary
          exploitation on C executables in controlled, educational environments,
          with exploit payloads written in Python. Through this work, I gained
          practical experience with program execution, memory behavior, and
          low-level vulnerabilities, and developed a security mindset grounded
          in understanding why bugs and exploits work.
          </p>

          <p>In addition to systems and security work, I have experience building
          full-stack applications using TypeScript, React, Node.js, Tailwind,
          and PostgreSQL. During a semester-long, team-based project, we designed 
          and built a full-stack application for managing and promoting local events, 
          helping users discover activities in their area. I contributed across both 
          the frontend and backend, with a primary focus on backend development—designing 
          and implementing API routes, handling database queries, integrating services with 
          the frontend, and ensuring the application was reliable, well-tested, and easy to maintain.
          </p>

          <p>Pure mathematics taught me to approach problem-solving differently than applied 
          or computational math. Through proof-based coursework, I learned how to articulate 
          ideas clearly and build rigorous, logically sound arguments to prove theorems. This 
          experience shaped how I reason about correctness, edge cases, and assumptions, with 
          skills that carry directly into software and security engineering.
          </p>

          <p>
          Open to connecting and discussing projects, or opportunities (:
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
            <ProjectCard
              title="Snake"
              description="A classic Snake game built with React featuring a custom game loop, constant-time (O(1)) movement and collision checks, and responsive keyboard controls."
              link="/games/snake"
              tech={["React", "Game Loop", "MUI"]}
            />

            <ProjectCard
              title="Wordle"
              description="A Wordle-inspired word guessing game featuring deterministic game logic, structured state management, and a polished, responsive user interface."
              link="/games/wordle"
              tech={["React", "State Mgmt", "UX"]}
            />
          </div>
        </section>
        <div className=""/>
      </main>
    </div>
  );
}

export default Home;
