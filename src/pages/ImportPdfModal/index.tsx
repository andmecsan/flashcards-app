import { Upload, FileText } from "lucide-react";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { useImportPdf } from "./useImportPdf";
import type { ImportPdfModalProps } from "./types";
import {
  Form,
  DropZone,
  HiddenInput,
  DropIcon,
  DropText,
  FileName,
  ErrorText,
  LoadingWrapper,
  LoadingText,
} from "./styles";

export const ImportPdfModal = ({ deckId, onClose }: ImportPdfModalProps) => {
  const { file, error, loading, handleFileChange, handleSubmit } = useImportPdf(
    deckId,
    onClose,
  );

  return (
    <Modal title="Importar PDF" onClose={onClose}>
      {loading ? (
        <LoadingWrapper>
          <Loader />
          <LoadingText>
            La IA está generando las tarjetas, puede tardar unos segundos...
          </LoadingText>
        </LoadingWrapper>
      ) : (
        <Form>
          <DropZone $hasFile={!!file}>
            <HiddenInput
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
            {file ? (
              <>
                <DropIcon>
                  <FileText size={32} />
                </DropIcon>
                <FileName>{file.name}</FileName>
                <DropText>Haz clic para cambiar el archivo</DropText>
              </>
            ) : (
              <>
                <DropIcon>
                  <Upload size={32} />
                </DropIcon>
                <DropText>Haz clic para seleccionar un PDF</DropText>
              </>
            )}
          </DropZone>

          {error && <ErrorText>{error}</ErrorText>}

          <Button $fullWidth onClick={handleSubmit} disabled={!file}>
            Generar tarjetas
          </Button>
        </Form>
      )}
    </Modal>
  );
};
