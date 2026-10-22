import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const bordaSuave = { borderColor: "rgba(225,222,205,0.14)" };

type FotoAmpliada = {
  nome: string;
  cargo: string;
  src: string;
};

/**
 * Modal de ampliação de foto no mesmo padrão visual do diálogo "Gerenciar Cookies":
 * painel escuro centralizado, cantos arredondados, borda suave e título na barra superior.
 */
export function ModalFoto({
  foto,
  onClose,
}: {
  foto: FotoAmpliada | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!foto} onOpenChange={(aberto) => !aberto && onClose()}>
      <DialogContent
        className="z-[80] max-h-[88vh] w-[calc(100vw-2rem)] max-w-[520px] gap-0 overflow-hidden rounded-2xl border p-0 sm:rounded-2xl"
        style={{ background: "#151515", borderColor: "rgba(225,222,205,0.14)" }}
      >
        <DialogTitle
          className="font-display border-b py-5 pr-14 pl-6 text-lg font-extrabold tracking-tight"
          style={bordaSuave}
        >
          {foto?.nome}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Foto ampliada de {foto?.nome}, {foto?.cargo} da A.W.A Capital.
        </DialogDescription>

        <div className="max-h-[64vh] overflow-y-auto px-6 py-6">
          <div className="flex flex-col items-center gap-4">
            {foto && (
              <img
                src={encodeURI(foto.src)}
                alt={`Foto de ${foto.nome}, ${foto.cargo} da A.W.A Capital`}
                className="max-h-[46vh] w-auto max-w-[320px] rounded-2xl object-contain"
              />
            )}
            {foto && (
              <p
                className="font-sans text-sm font-semibold tracking-[0.06em] uppercase"
                style={{ color: "rgba(225,222,205,0.55)" }}
              >
                {foto.cargo}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
