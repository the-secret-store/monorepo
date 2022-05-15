import { LockShield } from '@styled-icons/fluentui-system-regular/LockShield';
import { Button, Chip, NavBar, TableRow, TableView, TextInput } from '$web/components';
import { ProjectOverviewStyleWrapper } from './project-overview.style';
import { useLocation } from 'react-router-dom';
import { IProject } from '@the-secret-store/api-interfaces/entities';

export function ProjectOverview() {
  const project = useLocation().state as IProject;

  return (
    <ProjectOverviewStyleWrapper>
      <NavBar />
      <div className="container">
        <header className="project-info">
          <div className="row">
            <h6>{project.id}</h6>
          </div>
          <div className="row">
            <h1 className="page-title">{project.name}</h1>
            <p>Last updated: {new Date(project.updatedAt).toLocaleTimeString()}</p>
            <p>Created: {new Date(project.createdAt).toLocaleTimeString()}</p>
          </div>
          <div className="row">
            <Chip>
              <LockShield size={14} />
              <span>{project.scope}</span>
            </Chip>
          </div>
        </header>
        <TableView>
          <TableRow>
            <p>Key</p>
            <p>Value</p>
          </TableRow>
          {Object.entries(project.secrets).map(([key, value]) => (
            <TableRow key={key}>
              <TextInput value={key} />
              <TextInput value={value} />
            </TableRow>
          ))}
        </TableView>

        <div className="actions">
          <div className="left">
            <Button>Save</Button>
            <Button
              link="./show-secrets-as-json"
              state={{ secrets: project.secrets, name: project.name }}
            >
              Show Secrets as JSON
            </Button>
            <Button>Options</Button>
          </div>

          <div className="right">
            <Button variant="error">Delete Project</Button>
          </div>
        </div>
      </div>
    </ProjectOverviewStyleWrapper>
  );
}
