import { InfoCircle } from '@styled-icons/bootstrap/InfoCircle';
import { NavBar } from '$web/components/NavBar';
import { TextInput } from '$web/components/TextInput';
import { CreateProjectStyleWrapper } from './create-project.style';
import { Button } from '$web/components/Button';

export function CreateProject() {
  return (
    <CreateProjectStyleWrapper>
      <NavBar />
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
