import { LockShield } from '@styled-icons/fluentui-system-regular/LockShield';
import { Button, Chip, NavBar, TableRow, TableView, TextInput } from '$web/components';
import { ProjectOverviewStyleWrapper } from './project-overview.style';
export function ProjectOverview() {
  return (
    <ProjectOverviewStyleWrapper>
      <NavBar />
      <div className="container">
        <header className="project-info">
          <div className="row">
            <h6>@krish_the_dev</h6>
          </div>
          <div className="row">
            <h1 className="page-title">Project Name</h1>
            <p>Last updated: Yesterday</p>
            <p>Created: Yesterday</p>
          </div>
          <div className="row">
            <Chip>
              <LockShield size={14} />
              <span>Private</span>
            </Chip>
          </div>
        </header>
        <TableView>
          <TableRow>
            <p>Key</p>
            <p>Value</p>
          </TableRow>
          <TableRow>
            <TextInput value={'API_KEY'} />
            <TextInput value={'*****'} />
          </TableRow>
          <TableRow>
            <TextInput value={'API_KEY'} />
            <TextInput value={'*****'} />
          </TableRow>
        </TableView>

        <div className="actions">
          <div className="left">
            <Button>Save</Button>
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
