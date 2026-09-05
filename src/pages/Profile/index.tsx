import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { ConfirmModal } from "../../components/ConfirmModal";
import { useProfile } from "./useProfile";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  Content,
  Section,
  SectionTitle,
  InfoRow,
  InfoLabel,
  InfoValue,
  Badge,
  Form,
  SuccessText,
  ErrorText,
  DangerSection,
  DangerText,
} from "./styles";

export const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    profile,
    loading,
    passwordForm,
    showDelete,
    setShowDelete,
    successMessage,
    passwordError,
    handleChangePassword,
    handleDelete,
  } = useProfile();

  if (loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  if (!profile) return null;

  return (
    <Layout
      breadcrumb={[
        { label: "Home", onClick: () => navigate("/") },
        { label: "Perfil" },
      ]}
    >
      <Content>
        <Section>
          <SectionTitle>Información</SectionTitle>
          <InfoRow>
            <InfoLabel>Nombre</InfoLabel>
            <InfoValue>{profile.name}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{profile.email}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Métodos de acceso</InfoLabel>
            <InfoValue>
              {profile.has_google && (
                <Badge
                  $color={theme.colors.success}
                  $bg={theme.colors.successLight}
                >
                  Google
                </Badge>
              )}
              {profile.has_password && (
                <Badge
                  $color={theme.colors.primary}
                  $bg={theme.colors.primaryLight}
                >
                  Contraseña
                </Badge>
              )}
            </InfoValue>
          </InfoRow>
        </Section>

        <Section>
          <SectionTitle>
            {profile.has_password ? "Cambiar contraseña" : "Añadir contraseña"}
          </SectionTitle>
          <Form>
            {profile.has_password && (
              <Input
                label="Contraseña actual"
                placeholder="Tu contraseña actual"
                type="password"
                registration={passwordForm.register("current_password", {
                  required: "Obligatorio",
                })}
                error={passwordForm.formState.errors.current_password?.message}
              />
            )}
            <Input
              label="Nueva contraseña"
              placeholder="Mínimo 6 caracteres"
              type="password"
              registration={passwordForm.register("password", {
                required: "Obligatorio",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
              error={passwordForm.formState.errors.password?.message}
            />
            {passwordError && <ErrorText>{passwordError}</ErrorText>}
            {successMessage && <SuccessText>{successMessage}</SuccessText>}
            <Button onClick={handleChangePassword}>
              {profile.has_password
                ? "Cambiar contraseña"
                : "Añadir contraseña"}
            </Button>
          </Form>
        </Section>

        <DangerSection>
          <SectionTitle>Zona peligrosa</SectionTitle>
          <DangerText>
            Al eliminar tu cuenta se borrarán todos tus mazos, categorías,
            tarjetas y progreso de estudio. Esta acción no se puede deshacer.
          </DangerText>
          <Button $variant="danger" onClick={() => setShowDelete(true)}>
            Eliminar cuenta
          </Button>
        </DangerSection>
      </Content>

      {showDelete && (
        <ConfirmModal
          title="Eliminar cuenta"
          message="¿Estás seguro? Se borrarán todos tus datos permanentemente."
          confirmLabel="Eliminar mi cuenta"
          onConfirm={handleDelete}
          onClose={() => setShowDelete(false)}
        />
      )}
    </Layout>
  );
};
