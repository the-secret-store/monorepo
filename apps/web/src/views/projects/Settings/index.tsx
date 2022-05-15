import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Settings } from '@styled-icons/remix-line';
import { UserPlus } from '@styled-icons/boxicons-regular';
import { IProject } from '@the-secret-store/api-interfaces/entities';
import { Button, TextInput } from '$web/components';
import { Requests } from '$web/constants';
import { useRequest } from '$web/hooks';
import { ProjectSettingsStyleWrapper } from './project-settings.style';

export function ProjectSettings() {
  const project = useLocation().state as IProject;
  const request = useRequest();
  const [usersWithAccess, setUsersWithAccess] = useState<UserWithAccess[]>();

  const findUsersWithAccess = useCallback(async () => {
    const users = (await request.get(Requests.projects.GET_USERS_WITH_ACCESS(project.id))).data
      .result;

    console.log(users);

    setUsersWithAccess(users);
  }, [request, project.id]);

  useEffect(() => {
    findUsersWithAccess();
  }, [findUsersWithAccess]);

  return (
    <ProjectSettingsStyleWrapper>
      <div className="container">
        <h1 className="page-title">
          <Settings size={30} /> Project Settings
        </h1>

        <div className="setting">
          <h2>Project Name</h2>
          <TextInput value={project.name} disabled />
          <p className="description">Currently, you are not allowed to change the project name.</p>
          <Button disabled>Save</Button>
        </div>

        {usersWithAccess && (
          <div className="users-with-access setting">
            <header>
              <div>
                <h2>Users with access</h2>
                <p>({usersWithAccess.length})</p>
              </div>
              <Button link={`/projects/${project.id}/invite`}>
                <UserPlus size={20} />
                Invite
              </Button>
            </header>

            <ul>
              {usersWithAccess.map(user => (
                <li className="user" key={user.id}>
                  <img src={user.avatar} alt={user.name} />
                  <p>{user.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ProjectSettingsStyleWrapper>
  );
}

type UserWithAccess = {
  name: string;
  avatar: string;
  id: string;
};
