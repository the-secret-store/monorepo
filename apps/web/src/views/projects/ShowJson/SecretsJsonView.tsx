import { useLocation, useNavigate } from 'react-router-dom';
import { IProject } from '@the-secret-store/api-interfaces/entities';
import { Button, JsonViewer } from '$web/components';
import { ShowJsonStyleWrapper } from './show-json.style';

export function ShowSecretsAsJson() {
  const navigate = useNavigate();
  const { secrets, name } = useLocation().state as IProject;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <ShowJsonStyleWrapper>
      <h1 className='page-title'>{name}</h1>
      <h5>Secrets as JSON</h5>
      <JsonViewer json={secrets} />
      <Button onClick={goBack}>{'<- '}Back</Button>
    </ShowJsonStyleWrapper>
  );
}
