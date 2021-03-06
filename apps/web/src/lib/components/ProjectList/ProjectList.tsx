import { Link } from 'react-router-dom';
import { Git } from '@styled-icons/boxicons-logos/Git';
import { IProject } from '@the-secret-store/api-interfaces/entities';
import { ProjectListStyleWrapper } from './project-list.style';

export function ProjectList(props: ProjectListProps) {
  return (
    <ProjectListStyleWrapper>
      {props.projects.map(project => {
        return (
          <li key={project.id.toString()}>
            <Link className='link' to={`/projects/${project.id}`} state={project}>
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
  projects: IProject[];
}
