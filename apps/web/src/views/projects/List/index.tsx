import { NavBar, ProjectList } from '$web/components';
import { ProjectListPageWrapper } from './project-list.page.style';
import { getProjects } from './projects.service';

export function Projects() {
  const projects = getProjects();

  return (
    <ProjectListPageWrapper>
      <NavBar />
      <div className="container">
        <h1 className="page-title">Projects</h1>
        <ProjectList projects={projects} />
      </div>
    </ProjectListPageWrapper>
  );
}
