import { useCallback, useEffect, useState } from 'react';
import { IProject } from '@the-secret-store/api-interfaces/entities';
import { NavBar, ProjectList } from '$web/components';
import { Requests } from '$web/constants';
import { useRequest } from '$web/hooks';
import { ProjectListPageWrapper } from './project-list.page.style';

export function Projects() {
  const { request } = useRequest();
  const [projects, setProjects] = useState<IProject[]>();

  const getProjects = useCallback(
    async () => (await request(Requests.projects.GET_ACCESSIBLE)).data.result,
    [request]
  );

  useEffect(() => {
    getProjects().then(setProjects);
  }, [getProjects]);

  return (
    <ProjectListPageWrapper>
      <NavBar />
      <div className="container">
        <h1 className="page-title">Projects</h1>
        {projects && <ProjectList projects={projects} />}
      </div>
    </ProjectListPageWrapper>
  );
}
