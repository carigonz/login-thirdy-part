import React from 'react';
import { GoogleLoginButton } from 'ts-react-google-login-component';
import { setGoogleSession } from '../../../api/session-storage';
import { clientId } from './utils';

interface PropTypes {
  class: string;
  text: string;
  onAccess: () => void;
}
export class Login extends React.Component<PropTypes> {
  preLoginTracking() {
    console.log('Attempt to login with google');
  }

  errorHandler(error: string) {
    // handle error if login got failed...
    console.error(error)
  }

  responseGoogle(googleUser: gapi.auth2.GoogleUser) {
    const { onAccess } = this.props;
    console.log('Login ~ responseGoogle ~ onAccess', onAccess);
    const google = googleUser.getAuthResponse(true).id_token;
    // For now, we just check session and give access to app, not the best way but works
    setGoogleSession({ google });
    onAccess();
  }

  render() {
    const clientConfig = { client_id: clientId };
    return (
    <div>
      <GoogleLoginButton
        classNames={`custom_class center-block ${this.props.class}`}
        responseHandler={this.responseGoogle}
        clientConfig={clientConfig}
        preLogin={this.preLoginTracking}
        failureHandler={this.errorHandler}
      >
        <div className={this.props.text}>Sign in with Gmail</div>
      </GoogleLoginButton>
    </div>
    )
  }

}