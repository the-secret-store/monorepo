import { Button } from '$web/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShowJsonStyleWrapper } from './show-json.style';

export function ShowSecretsAsJson() {
  const navigate = useNavigate();
  const secrets = useLocation().state;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <ShowJsonStyleWrapper>
      <h1 className="page-title">Secrets as JSON</h1>
      <code>{JSON.stringify(secrets, null, '\t')}</code>
      <Button onClick={goBack}>{'<- '}Back</Button>
    </ShowJsonStyleWrapper>
  );
}
