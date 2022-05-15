import type { AxiosError } from 'axios';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import { Key2 as Key, Settings } from '@styled-icons/remix-line';
import { Jsonwebtokens } from '@styled-icons/simple-icons/Jsonwebtokens';
import { Button } from '$web/components';
import { useRequest } from '$web/hooks';
import { SettingsStyleWrapper } from './settings.style';
import { Requests } from '$web/constants';

export function UserSettings() {
  const request = useRequest();

  const generateToken = async () => {
    const toastId = toast.loading('Generating token...');
    try {
      const { result } = (await request.get(Requests.users.GENERATE_TOKEN)).data;
      toast.update(toastId, {
        type: 'success',
        isLoading: false,
        render: 'Token copied to clipboard',
        autoClose: 3000,
      });
      copy(result);
    } catch (error) {
      toast.update(toastId, {
        type: 'error',
        isLoading: false,
        render: (error as AxiosError)?.response?.data.message,
        autoClose: 8000,
      });
    }
  };

  return (
    <SettingsStyleWrapper>
      <div className="container">
        <h1 className="page-title">
          <Settings size={30} />
          User Settings
        </h1>

        <div className="setting">
          <h2>
            <Key size={25} />
            Access Token
          </h2>
          <p>
            Access tokens are used to authenticate your requests to the secret store from your CLI.
            You can generate as many tokens as you want, keep the token secret and do not store it
            in your code or files.
          </p>
          <Button onClick={generateToken}>
            <Jsonwebtokens size={16} />
            Generate Token
          </Button>
        </div>
      </div>
    </SettingsStyleWrapper>
  );
}
