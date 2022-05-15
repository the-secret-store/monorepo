import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { InfoCircle } from '@styled-icons/bootstrap/InfoCircle';
import { IProject } from '@the-secret-store/api-interfaces/entities';
import { Button, TextInput } from '$web/components';
import { Requests } from '$web/constants';
import { useRequest } from '$web/hooks';
import { CreateProjectStyleWrapper } from './create-project.style';

export function CreateProject() {
  const [values, setValues] = useState({});
  const { request } = useRequest();
  const navigate = useNavigate();

  const createProject = async (): Promise<IProject> => {
    return (
      await request(Requests.projects.CREATE_PROJECT, {
        method: 'POST',
        data: values,
      })
    ).data.result;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const project = await createProject();
      console.debug(project);

      navigate(`/projects/${project.id}`, { state: project });
    } catch (error) {
      console.error((error as AxiosError).response?.data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  };

  return (
    <CreateProjectStyleWrapper>
      <div className="container">
        <h1 className="page-title">Create Project</h1>

        <p>
          <InfoCircle size={16} /> None of the fields are mandatory. If you leave the Project Name
          empty, the project will be created with a random name.
        </p>

        <form onSubmit={handleSubmit}>
          <TextInput label="Project Name" name="name" onChange={handleChange} />
          <TextInput label="Git URL" name="gitUrl" onChange={handleChange} />

          <Button type="submit">Create</Button>
        </form>
      </div>
    </CreateProjectStyleWrapper>
  );
}
