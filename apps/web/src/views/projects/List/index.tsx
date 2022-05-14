import { NavBar, ProjectList } from '$web/components';
import { ProjectListPageWrapper } from './project-list.page.style';
import { getProjects } from './projects.service';

export function Projects() {
  const projects = getProjects();

  return (
    <>
      <NavBar />
      <ProjectListPageWrapper>
        <h1>Projects</h1>
        <ProjectList projects={projects} />
      </ProjectListPageWrapper>
    </>
  );
}
