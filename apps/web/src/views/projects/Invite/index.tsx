import { Button } from '$web/components/Button';
import { NavBar } from '$web/components/NavBar';
import { TextInput } from '$web/components/TextInput';
import { useParams } from 'react-router-dom';
import { InviteUsersStyleWrapper } from './invite-users.style';

export function InviteUserPage() {
  const { projectId } = useParams();

  return (
    <>
      <NavBar />
      <InviteUsersStyleWrapper>
        <h1 className="page-title">Invite user to {projectId}</h1>

        <form>
          <TextInput label="Email" name="email" />
          <Button type="submit">Invite</Button>
        </form>
      </InviteUsersStyleWrapper>
    </>
  );
}
