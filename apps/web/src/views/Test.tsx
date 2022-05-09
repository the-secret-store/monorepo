import { ProjectList } from '../lib/components/ProjectList';

export function TestPage() {
  return (
    <div style={{ margin: '2rem' }}>
      <ProjectList
        projects={[
          { id: '1', name: 'Project 1' },
          {
            id: '2',
            name: 'Project 2',
            gitUrl: 'github.com',
          },
        ]}
      />
    </div>
  );
}
