import { ZoomIn } from "lucide-react";
import mapAsset from "@/assets/ban-do-ket-noi-an-toan.png.asset.json";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ALT = "Bản đồ kết nối an toàn – Em không đơn độc";

export function SafetyMapImage() {
  return (
    <figure className="mx-auto max-w-4xl">
      <Dialog>
        <DialogTrigger asChild>
          <button aria-label="Phóng to bản đồ kết nối an toàn" className="group relative block w-full cursor-zoom-in overflow-hidden rounded-3xl border-2 border-pink-band bg-card shadow-sm transition-shadow hover:shadow-md">
            <img src={mapAsset.url} alt={ALT} width={1199} height={1312} className="h-auto w-full" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-auto p-2 sm:max-w-5xl">
          <DialogTitle className="sr-only">{ALT}</DialogTitle>
          <img src={mapAsset.url} alt={ALT} className="h-auto w-full" />
        </DialogContent>
      </Dialog>
      <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">
        <span className="mb-1 flex items-center justify-center gap-1 not-italic font-semibold text-primary"><ZoomIn className="h-4 w-4" />Nhấn vào ảnh để phóng to</span>
        Bản đồ kết nối an toàn – Những điểm tựa giúp học sinh biết tìm kiếm sự hỗ trợ khi gặp khó khăn.
      </figcaption>
    </figure>
  );
}
