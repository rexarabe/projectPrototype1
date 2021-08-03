import React from 'react';
import { connect } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { authActionLogin, clearAuth } from '../../actions/actionCreator';
import styles from './LoginForm.module.sass';
import FormInput from '../FormInput/FormInput';
import Schems from '../../validators/validationSchems';
import Error from '../Error/Error';

class LoginForm extends React.Component {
  componentWillUnmount() {
    this.props.authClear();
  }

    clicked = (values) => {
      this.props.loginRequest({ data: values, history: this.props.history });
    };

    render() {
      const { error, isFetching } = this.props.auth;
      const { submitting, authClear } = this.props;

      const formInputClasses = {
        container: styles.inputContainer,
        input: styles.input,
        warning: styles.fieldWarning,
        notValid: styles.notValid,
        valid: styles.valid,
      };

      return (
        <div className={styles.loginForm}>
          {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={authClear}
          />
          )}
          <h2>LOGIN TO YOUR ACCOUNT</h2>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={this.clicked}
            validationSchema={Schems.LoginSchem}
          >
            <Form>
              <FormInput classes={formInputClasses} name="email" type="text" label="Email Address"/>
              <FormInput classes={formInputClasses} name="password" type="password" label="Password"/>
              <button type="submit" disabled={submitting} className={styles.submitContainer}>
                <span className={styles.inscription}>
                  {isFetching
                    ? 'Submitting...'
                    : 'LOGIN'}
                </span>
              </button>
              <button type="button" className={styles.googleButton}>
                <a target="_blank" href="https://accounts.google.com/o/oauth2/auth?response_type=code&amp;redirect_uri=https%3A%2F%2Fwww.squadhelp.com%2Flogin.php&amp;client_id=78274772730-f62839c388e8b785mhfh211vr4ueva08.apps.googleusercontent.com&amp;scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&amp;access_type=offline&amp;approval_prompt=auto">Sign in with Google</a>
              </button>
            </Form>
          </Formik>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => (
  {
    loginRequest: ({ data, history }) => dispatch(authActionLogin(data, history)),
    authClear: () => dispatch(clearAuth()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
