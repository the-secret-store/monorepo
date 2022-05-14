import { Button } from '$web/components/Button';
import { useNavigate } from 'react-router-dom';
import { ShowJsonStyleWrapper } from './show-json.style';

export function ShowSecretsAsJson() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <ShowJsonStyleWrapper>
      <h1 className="page-title">Secrets as JSON</h1>
      <code>{JSON.stringify({ KEY: 'value', SECRET: 'oh-secret' }, null, '\t')}</code>
      <Button onClick={goBack}>{'<- '}Back</Button>
    </ShowJsonStyleWrapper>
  );
}
