import { Logo } from "../../components/Logo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLogin } from "./useLogin";
import {
  PageWrapper,
  Card,
  Subtitle,
  Form,
  Divider,
  DividerLine,
  DividerText,
  GoogleButton,
  GoogleIcon,
  SwitchText,
  SwitchLink,
  ErrorText,
  Footer,
} from "./styles";

interface LoginPageProps {
  onLogin: (token: string) => void;
}

export const Login = ({ onLogin }: LoginPageProps) => {
  const {
    isRegister,
    error,
    loginForm,
    registerForm,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    toggleMode,
  } = useLogin(onLogin);

  return (
    <PageWrapper>
      <Card>
        <Logo height={48} />
        <Subtitle>
          {isRegister
            ? "Crea tu cuenta para empezar a estudiar"
            : "Aprende con tarjetas inteligentes que se adaptan a tu ritmo"}
        </Subtitle>

        {isRegister ? (
          <Form>
            <Input
              label="Nombre"
              placeholder="Tu nombre"
              registration={registerForm.register("name", {
                required: "Obligatorio",
              })}
              error={registerForm.formState.errors.name?.message}
            />
            <Input
              label="Email"
              placeholder="tu@email.com"
              type="email"
              registration={registerForm.register("email", {
                required: "Obligatorio",
              })}
              error={registerForm.formState.errors.email?.message}
            />
            <Input
              label="Contraseña"
              placeholder="Mínimo 6 caracteres"
              type="password"
              registration={registerForm.register("password", {
                required: "Obligatorio",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
              error={registerForm.formState.errors.password?.message}
            />
            {error && <ErrorText>{error}</ErrorText>}
            <Button $fullWidth onClick={handleRegister}>
              Crear cuenta
            </Button>
          </Form>
        ) : (
          <Form>
            <Input
              label="Email"
              placeholder="tu@email.com"
              type="email"
              registration={loginForm.register("email", {
                required: "Obligatorio",
              })}
              error={loginForm.formState.errors.email?.message}
            />
            <Input
              label="Contraseña"
              placeholder="Tu contraseña"
              type="password"
              registration={loginForm.register("password", {
                required: "Obligatorio",
              })}
              error={loginForm.formState.errors.password?.message}
            />
            {error && <ErrorText>{error}</ErrorText>}
            <Button $fullWidth onClick={handleLogin}>
              Iniciar sesión
            </Button>
          </Form>
        )}

        <Divider>
          <DividerLine />
          <DividerText>o</DividerText>
          <DividerLine />
        </Divider>

        <GoogleButton onClick={handleGoogleLogin}>
          <GoogleIcon viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </GoogleIcon>
          Continuar con Google
        </GoogleButton>

        <SwitchText>
          {isRegister ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
          <SwitchLink onClick={toggleMode}>
            {isRegister ? "Inicia sesión" : "Regístrate"}
          </SwitchLink>
        </SwitchText>

        <Footer>
          Al continuar, aceptas los términos de uso y la política de privacidad
        </Footer>
      </Card>
    </PageWrapper>
  );
};
