import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQRCodeStore } from "@/stores/qrCodeStore";
import { ChevronDown, Download } from "lucide-react";
import { Span } from "next/dist/trace";

interface SplitBtnProps {
  copyFunc: () => void;
  qrFunc: () => void;
  isFlipped: boolean;
}

const SplitBtn = ({ copyFunc, qrFunc, isFlipped }: SplitBtnProps) => {
  const noQRCodeFunc = () => console.log("No QR Code");
  const downloadQRCode =
    useQRCodeStore((state) => state.downloadQRCode) || noQRCodeFunc;

  return (
    <div className="flex items-center">
      <Button
        size="lg"
        className={`rounded-r-none ${isFlipped && "px-6"}`}
        onClick={isFlipped ? downloadQRCode : copyFunc}
      >
        {isFlipped ? (
          <div className="flex gap-2">
            <Download className="w-4 h-4" /> <span>QR Code</span>
          </div>
        ) : (
          "Share Link"
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" className={"rounded-l-none border-l px-2"}>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={qrFunc}>
            {isFlipped ? "Share Link" : "QR Code"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SplitBtn;
