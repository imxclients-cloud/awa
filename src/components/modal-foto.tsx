import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const bordaSuave = { borderColor: "rgba(225,222,205,0.14)" };

type FotoAmpliada = {
  nome: string;
  cargo: string;
  src: string;
};

/**
 * Modal de ampliação de foto (assessores e especialistas).
 * Foto em destaque, tamanho generoso — mesmo padrão visual nas duas seções.
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
        className="z-[80] max-h-[92vh] w-[calc(100vw-2rem)] max-w-[560px] gap-0 overflow-hidden rounded-2xl border p-0 sm:rounded-2xl"
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

        <div className="max-h-[78vh] overflow-y-auto px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col items-center gap-5">
            {foto && (
              <img
                src={encodeURI(foto.src)}
                alt={`Foto de ${foto.nome}, ${foto.cargo} da A.W.A Capital`}
                className="h-auto w-full max-h-[min(62vh,520px)] max-w-[440px] rounded-2xl object-contain object-top shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
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
