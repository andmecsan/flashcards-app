import { Logo } from "../../components/Logo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useLogin } from "./useLogin";
import google from "../../assets/google.svg";
import {
  PageWrapper,
  Card,
  Subtitle,
  Form,
  Divider,
  DividerLine,
  DividerText,
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

        <Button
          $variant="ghost"
          $fullWidth
          icon={<img src={google} alt="Google" width={20} height={20} />}
          onClick={handleGoogleLogin}
        >
          Continuar con Google
        </Button>

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
