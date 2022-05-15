import { InfoCircle } from '@styled-icons/bootstrap/InfoCircle';
import { Button, TextInput } from '$web/components';
import { CreateProjectStyleWrapper } from './create-project.style';

export function CreateProject() {
  return (
    <CreateProjectStyleWrapper>
      <div className="container">
        <h1 className="page-title">Create Project</h1>

        <p>
          <InfoCircle size={16} /> None of the fields are mandatory. If you leave the Project Name
          empty, the project will be created with a random name.
        </p>

        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <TextInput label="Project Name" />
          <TextInput label="Git URL" />

          <Button type="submit">Create</Button>
        </form>
      </div>
    </CreateProjectStyleWrapper>
  );
}
