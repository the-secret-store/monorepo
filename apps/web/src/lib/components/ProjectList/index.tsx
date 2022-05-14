import { Link } from 'react-router-dom';
import { Git } from '@styled-icons/boxicons-logos/Git';
import { ProjectListStyleWrapper } from './project-list.style';

export function ProjectList(props: ProjectListProps) {
  return (
    <ProjectListStyleWrapper>
      {props.projects.map(project => {
        return (
          <li key={project.id}>
            <Link className="link" to={`/projects/${project.id}`}>
              <p>{project.name}</p>

              {project.gitUrl && (
                <a href={project.gitUrl}>
                  <Git size={26} />
                </a>
              )}
            </Link>
          </li>
        );
      })}
    </ProjectListStyleWrapper>
  );
}

interface ProjectListProps {
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  gitUrl?: string;
}
