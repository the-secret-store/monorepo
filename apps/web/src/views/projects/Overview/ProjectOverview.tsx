import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import { LockShield } from '@styled-icons/fluentui-system-regular';
import { Braces, Save, Settings } from '@styled-icons/remix-line';
import { Eye, EyeSlash } from '@styled-icons/bootstrap';
import { IProject } from '@the-secret-store/api-interfaces/entities';
import { Button, Chip, Loader, TableRow, TableView, TextInput } from '$web/components';
import { ProjectOverviewStyleWrapper } from './project-overview.style';
import { useRequest } from '$web/hooks';
import { Requests } from '$web/constants';

export function ProjectOverview() {
  const { projectId } = useParams();
  const [project, setProject] = useState(useLocation().state as IProject);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showValues, setShowValues] = useState(false);
  const request = useRequest();

  const getProjectInfo = useCallback(async () => {
    if (project) return;
    if (!projectId) navigate('/projects');

    console.log('Project state not found, sending api request...');
    setIsLoading(true);
    const info = await (
      await request.get(Requests.projects.GET_PROJECT_INFO(projectId!))
    ).data.result;
    setProject(info);
    setIsLoading(false);
  }, [navigate, project, projectId, request]);

  useEffect(() => {
    getProjectInfo();
  }, [getProjectInfo]);

  const toggleValueVisibility = () => setShowValues(o => !o);

  return (
    <ProjectOverviewStyleWrapper>
      <div className='container'>
        {!project && isLoading && <Loader />}
        {project && (
          <>
            <header className='project-info'>
              <div className='row'>
                <h6>{project.id}</h6>
              </div>
              <div className='row'>
                <h1 className='page-title'>{project.name}</h1>
                <p>
                  Last updated: <TimeAgo datetime={project.updatedAt} />
                </p>
                <p>
                  Created: <TimeAgo datetime={project.createdAt} />
                </p>
              </div>
              <div className='row'>
                <Chip>
                  <LockShield size={14} />
                  <span>{project.scope}</span>
                </Chip>
              </div>
            </header>
            <TableView>
              <TableRow>
                <p>Key</p>
                <p className='value-head'>
                  Value
                  {!showValues ? (
                    <Eye size={20} onClick={toggleValueVisibility} />
                  ) : (
                    <EyeSlash size={20} onClick={toggleValueVisibility} />
                  )}
                </p>
              </TableRow>
              {Object.entries(project.secrets).map(([key, value]) => (
                <TableRow key={key}>
                  <TextInput value={key} />
                  <TextInput type={showValues ? 'text' : 'password'} value={value} />
                </TableRow>
              ))}
            </TableView>

            <div className='actions'>
              <div className='left'>
                <Button>
                  <Save size={20} />
                  Save
                </Button>
                <Button
                  link='./show-secrets-as-json'
                  state={{ secrets: project.secrets, name: project.name }}
                >
                  <Braces size={20} />
                  View JSON
                </Button>
              </div>

              <div className='right'>
                <Button variant='error' link={`/projects/${project.id}/settings`} state={project}>
                  <Settings size={20} /> Settings
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </ProjectOverviewStyleWrapper>
  );
}
