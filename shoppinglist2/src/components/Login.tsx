import { ChangeEvent, useState } from "react";
import { Button, TextField, Divider, Box, CircularProgress, Stack, Snackbar, Alert } from "@mui/material";
import { AccountCredentials } from "../../types";
import { login, authenticateWithGoogleToken } from "../api/shoppingApi";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

type LoginProps = {
  loginSuccess: () => void;
}

function Login({loginSuccess}: LoginProps) {
  const [ user, setUser ] = useState<AccountCredentials>({username: '', password: ''});
  const [ open, setOpen ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('Login faild');
  const [ loading, setLoading ] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  // 아이디/비밀번호 로그인
  const handleUsernamePasswordLogin = () => {
    setLoading(true); // 로딩시작
    login(user).then(authorizationHeader => {
      sessionStorage.setItem('jwt', authorizationHeader);
      loginSuccess();
    }) 
    .catch( error => {
      console.error("Login error : ", error)
      setOpen(true);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  // Google 로그인 관련
  const handleGoogleLoginSuccess = async (credentialReponse : CredentialResponse) => {
    console.log('Google Login Success(Frontend상황에서) : ', credentialReponse);
    if(credentialReponse.credential) {
      setLoading(true);
      try {
        const backendJwt = await authenticateWithGoogleToken(credentialReponse.credential);
        sessionStorage.setItem('jwt', backendJwt);
        loginSuccess();
      }
      catch (error:any) {
        console.error('구글 로그인 후에 백엔드 부분에서 인증 실패 했습니다. ', error);
        setErrorMsg(`구글 로그인은 성공했는데 백엔드에서 터졌습니다. ${error?.message || '알 수 없는 에러'}`)
        setOpen(true);
      }
      finally {
        setLoading(false);
      }
    }else {
      console.error('응답 결과에서 Google Credential을 찾을수 없습니다.');
      setErrorMsg('Google Login Failed : Credential Not Found ');
      setOpen(true);
    }
  };

  // Google 로그인 실패 관련 callback
  const handleGoogleLoginError = () => {
    console.error('Google Login Failed (Frontend)');
    setErrorMsg('구글 로그인 자체가 실패했습니다. 다시 시도하거나 좀 있다 시도하세요.');
    setOpen(false);
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if( event.key === 'Enter' && !loading) {  // 로딩 중일 때는 엔터키로 로그인 못하게.
      handleUsernamePasswordLogin();
    }
  }

  return (
    <>
      <Stack spacing={2} alignItems="center" mt={10}>
        <h2>Login</h2>
        <TextField 
          name="username"
          label="Username"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          autoFocus
          sx={{width: '300px'}}
        />
        <TextField 
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          autoFocus
          sx={{width: '300px'}}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUsernamePasswordLogin}
          disabled={loading}
          sx={{width: '300px'}}
        >
          {loading ? <CircularProgress size={24} color='inherit' /> : 'Login with Username'}
        </Button>

        <Divider sx={{width: '300px', my: 2}}>OR</Divider>

        {/* Google 로그인 버튼 부분입니다. */}
        <Box sx={{width: '300px', display: 'flex', justifyContent: 'center', opacity: loading ? 0.5 : 1}}>
          {/** Loading 중일 때는 Google 버튼을 숨기거나 비활성화. 근데 우리는 위에 ㅣ봤듯이 투명도 조절 */}
          {!loading && (
            <GoogleLogin 
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              useOneTap={false}
            />
          )}
          {loading && <CircularProgress size={24} />}
        </Box>
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert severity="error" onClose={() => setOpen(false)}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Login