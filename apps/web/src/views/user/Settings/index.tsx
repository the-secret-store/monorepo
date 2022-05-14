import { Key } from '@styled-icons/fluentui-system-regular/Key';
import { Button, NavBar } from '$web/components';
import { SettingsStyleWrapper } from './settings.style';

export function UserSettings() {
  return (
    <SettingsStyleWrapper>
      <NavBar />
      <div className="container">
        <h1>Settings</h1>

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
          <Button>Generate Token</Button>
        </div>
      </div>
    </SettingsStyleWrapper>
  );
}
