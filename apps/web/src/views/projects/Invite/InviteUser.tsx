import { useState } from 'react';
import { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IProject } from '@the-secret-store/api-interfaces/entities';
import { Button, TextInput } from '$web/components';
import { Requests } from '$web/constants';
import { useRequest } from '$web/hooks';
import { InviteUsersStyleWrapper } from './invite-users.style';

export function InviteUserPage() {
  const [email, setEmail] = useState<string>();
  const project = useLocation().state as IProject;
  const request = useRequest();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading('Sending invitation...');

    try {
      await request.post(Requests.invitations.INVITE_TO_PROJECT, { email, projectId: project.id });
      toast.update(toastId, {
        render: `Invitation sent to ${email}`,
        isLoading: false,
        type: 'success',
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        type: 'error',
        isLoading: false,
        render: 'There was an error inviting the user',
        autoClose: 8000,
      });

      console.error((error as AxiosError).response);
    }
  };

  return (
    <InviteUsersStyleWrapper>
      <h1 className='page-title'>Invite user to {project.name}</h1>

      <form onSubmit={handleSubmit}>
        <TextInput label='Email' name='email' onChange={handleChange} />
        <Button type='submit'>Invite</Button>
      </form>
    </InviteUsersStyleWrapper>
  );
}
