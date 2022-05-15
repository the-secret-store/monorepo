import { Key2 as Key, Settings } from '@styled-icons/remix-line';
import { Jsonwebtokens } from '@styled-icons/simple-icons/Jsonwebtokens';
import { Button } from '$web/components';
import { SettingsStyleWrapper } from './settings.style';

export function UserSettings() {
  return (
    <SettingsStyleWrapper>
      <div className="container">
        <h1 className="page-title">
          <Settings size={30} />
          Settings
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
          <Button>
            <Jsonwebtokens size={16} />
            Generate Token
          </Button>
        </div>
      </div>
    </SettingsStyleWrapper>
  );
}
