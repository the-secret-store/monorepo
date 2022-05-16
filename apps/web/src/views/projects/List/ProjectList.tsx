import { useCallback, useEffect, useState } from 'react';
import { New as NewIcon } from '@styled-icons/fluentui-system-filled/New';
import { IProject } from '@the-secret-store/api-interfaces/entities';
import { Button, EmptyList, Loader, ProjectList } from '$web/components';
import { Requests } from '$web/constants';
import { useRequest } from '$web/hooks';
import { ProjectListPageWrapper } from './project-list.page.style';

export function Projects() {
  const request = useRequest();
  const [projects, setProjects] = useState<IProject[]>();
  const [isLoading, setIsLoading] = useState(true);

  const getProjects = useCallback(
    async () => (await request(Requests.projects.GET_ACCESSIBLE)).data.result,
    [request]
  );

  useEffect(() => {
    getProjects().then(p => {
      setProjects(p);
      setIsLoading(false);
    });
  }, [getProjects]);

  return (
    <ProjectListPageWrapper>
      <div className='container'>
        <header>
          <h1 className='page-title'>Projects</h1>
          <Button link='/projects/create'>
            <NewIcon size={20} />
            New Project
          </Button>
        </header>
        {isLoading && <Loader />}
        {projects && <ProjectList projects={projects} />}
        {!isLoading && (!projects || projects?.length === 0) && <EmptyList />}
      </div>
    </ProjectListPageWrapper>
  );
}
