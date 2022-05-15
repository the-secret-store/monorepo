import { useParams } from 'react-router-dom';
import { Button, TextInput } from '$web/components';
import { InviteUsersStyleWrapper } from './invite-users.style';

export function InviteUserPage() {
  const { projectId } = useParams();

  return (
    <InviteUsersStyleWrapper>
      <h1 className="page-title">Invite user to {projectId}</h1>

      <form>
        <TextInput label="Email" name="email" />
        <Button type="submit">Invite</Button>
      </form>
    </InviteUsersStyleWrapper>
  );
}
