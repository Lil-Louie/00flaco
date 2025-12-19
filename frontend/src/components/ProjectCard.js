function ProjectCard({ title, description, link, tech = [] }) {
    return (
      <div className="border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-colors">
        <h3 className="text-2xl font-semibold">{title}</h3>
  
        <p className="text-gray-400 mt-2">{description}</p>
  
        {tech.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-4">
            {tech.map((t) => (
              <li
                key={t}
                className="text-xs bg-gray-800 px-2 py-1 rounded-md text-gray-300"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
  
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-400 hover:text-blue-300 mt-4"
          >
            View Project →
          </a>
        )}
      </div>
    );
  }
  
  export default ProjectCard;
  