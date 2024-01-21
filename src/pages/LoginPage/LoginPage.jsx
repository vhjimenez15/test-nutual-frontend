import React, { FunctionComponent } from 'react';
import {
  TextField,
  Button,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Grid
} from '@mui/material';
import Lottie from 'lottie-react';
import MawiAnimateLogin from '../../static/lottiefiles/MAWI.json';
// styles
import { loginStyles } from './loginPage.styles';
// resources (images, icons, etc..)
import logo from '../../static/images/LOGO.svg';
// hooks
import { useForm } from 'react-hook-form';
// custom components
import LoadingDialog from '../../components/LoadingDialog';
// store
import { useAccount } from '../../hooks/account';
import { useAppDispatch } from '../../hooks/app';
import { accountStart, accountLogout } from '../../store/reducers/account';
// globals
import { ResourceState } from '../../utils/constant';
import { getErrorMessageApi } from '../../utils/general';

type FormValuesLogin = {
  email: string;
  password: string;
  tz_session?: string;
  keep_login?: boolean;
};

const LoginPage: FunctionComponent = () => {
  // constants
  const account = useAccount();
  const dispatch = useAppDispatch();
  const { classes } = loginStyles();
  // states
  const [openLoading, setOpenLoading] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [keepLogin, setKeepLogin] = React.useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<FormValuesLogin>({ mode: 'onChange' });

  React.useEffect(() => {
    setOpenLoading(account.status === ResourceState.LOADING);
    if (account.status === ResourceState.ERROR) {
      const message = getErrorMessageApi(account.error);
      setError('email', { type: 'manual', message }, { shouldFocus: true });
      dispatch(accountLogout());
    }
  }, [account]);

  // functions
  const onSubmit = async (data: FormValuesLogin) => {
    clearErrors(['email', 'password']);
    data['tz_session'] = Intl.DateTimeFormat().resolvedOptions().timeZone;
    data['keep_login'] = keepLogin;
    dispatch(accountStart(data));
  };

  const togglePass = () => setShowPass(!showPass);
  const toggleCheck = ({ target }: any) => setKeepLogin(target.checked);

  const onError = (errors: any, e: any) => console.log(errors, e);

  return (
    <div className={classes.main}>
      <LoadingDialog
        open={openLoading}
        onClose={() => {
          setOpenLoading(false);
        }}
      />
      <Grid container wrap="wrap-reverse" className="wrapper-login">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className="login"
        >
          <div className="wrapper-login-form">
            <Typography variant="h3">
              Inicia sesión con tu cuenta de <span>Mawi.</span>
            </Typography>
            <p className="welcome">
              ¡Bienvenido! Por favor ingresa tus credenciales para iniciar
              sesión.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="login-form"
            >
              <label className={classes.labelRoot}>Usuario</label>
              <TextField
                fullWidth
                placeholder="Ej: emartinez"
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : null}
                InputProps={{
                  type: 'text',
                  id: 'email',
                  autoComplete: 'hidden',
                  ...register('email', {
                    required: 'Este campo es obligatorio'
                  })
                }}
                className={classes.textFieldRoot}
                FormHelperTextProps={{
                  sx: {
                    textAlign: 'right',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                  }
                }}
              />
              <label className={classes.labelRoot}>Contraseña</label>
              <TextField
                fullWidth
                InputProps={{
                  id: 'password',
                  autoComplete: 'hidden',
                  type: showPass ? 'text' : 'password',
                  endAdornment: (
                    <i
                      onClick={togglePass}
                      style={{
                        color: showPass ? '#C2C4C7' : '#00C052',
                        cursor: 'pointer'
                      }}
                      className={`fa ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}
                    />
                  ),
                  ...register('password', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                      value: 8,
                      message: 'Este campo debe incluir 8 caracteres'
                    }
                  })
                }}
                className={classes.textFieldRoot}
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password.message : null}
                FormHelperTextProps={{
                  sx: {
                    textAlign: 'right',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                  }
                }}
              />
              <FormGroup className="form-group--checkbox">
                <FormControlLabel
                  control={<Checkbox color="primary" onChange={toggleCheck} />}
                  label="Matener mi sesión iniciada"
                />
                <Link variant="button" color="primary" underline="none">
                  Olvidé mi contraseña
                </Link>
              </FormGroup>
              <Button
                type="submit"
                className="login-button"
                variant="contained"
              >
                Iniciar sesión
                <div className="badge-login">
                  <i className="fa-solid fa-angle-right"></i>
                </div>
              </Button>
            </form>
            <div className="wrapper-login-footer">
              <ul>
                <li>
                  <Link href="#" underline="always">
                    {'Términos de uso'}
                  </Link>
                </li>
                <li>
                  <Link href="#" underline="always">
                    {'Declaración de privacidad'}
                  </Link>
                </li>
                <li>
                  <Link href="#" underline="always">
                    {'Centro de ayuda'}
                  </Link>
                </li>
              </ul>
              <Link href="#">{'© IPTegra'}</Link>
            </div>
          </div>
        </Grid>
        <Grid container className="brand" direction="column">
          <figure className="brand__logo">
            <img src={logo} alt="" />
          </figure>
          <div className="brand__slogan">
            <Typography variant="h4" fontWeight="bold">
              Multiagente de Whastapp®
            </Typography>
            <Typography variant="h6">Para tu empresa o negocio</Typography>
          </div>
          <Lottie
            animationData={MawiAnimateLogin}
            loop={true}
            autoplay={true}
            initialSegment={[1, 30]}
            className="brand__animate"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
