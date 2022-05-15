import { useLocation } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import { LockShield } from '@styled-icons/fluentui-system-regular/LockShield';
import { IProject } from '@the-secret-store/api-interfaces/entities';
import { Button, Chip, TableRow, TableView, TextInput } from '$web/components';
import { ProjectOverviewStyleWrapper } from './project-overview.style';

export function ProjectOverview() {
  const project = useLocation().state as IProject;

  return (
    <ProjectOverviewStyleWrapper>
      <div className="container">
        <header className="project-info">
          <div className="row">
            <h6>{project.id}</h6>
          </div>
          <div className="row">
            <h1 className="page-title">{project.name}</h1>
            <p>
              Last updated: <TimeAgo datetime={project.updatedAt} />
            </p>
            <p>
              Created: <TimeAgo datetime={project.createdAt} />
            </p>
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
