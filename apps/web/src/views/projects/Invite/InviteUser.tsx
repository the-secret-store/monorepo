import { useState } from 'react';
import { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Requests } from '@the-secret-store/api-interfaces/constants';
import { IProject } from '@the-secret-store/api-interfaces/entities';
import { Button, Select, TextInput } from '$web/components';
import { useRequest } from '$web/hooks';
import { InviteUsersStyleWrapper } from './invite-users.style';

export function InviteUserPage() {
  const [invitationDetails, setInvitationDetails] = useState<{
    email: string;
    accessLevel: 'member' | 'collaborator';
  }>({
    email: '',
    accessLevel: 'member',
  });
  const project = useLocation().state as IProject;
  const request = useRequest();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setInvitationDetails(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading('Sending invitation...');

    try {
      await request.post(Requests.invitations.INVITE_TO_PROJECT, {
        ...invitationDetails,
        projectId: project.id,
      });
      toast.update(toastId, {
        render: `Invitation sent to ${invitationDetails.email}`,
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
        <Select
          label='Role'
          name='accessLevel'
          onChange={handleChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
          options={['member', 'collaborator']}
        />
        <Button type='submit'>Invite</Button>
      </form>
    </InviteUsersStyleWrapper>
  );
}
