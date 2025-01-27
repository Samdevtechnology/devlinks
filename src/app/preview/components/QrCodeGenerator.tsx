import { useTheme } from "next-themes";
import { QRCodeSVG } from "qrcode.react";

const QrCodeGenerator = ({ link }: { link: string }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Determine background and foreground colors
  const bgColor = currentTheme === "dark" ? "#221F2E" : "#ffffff";
  const fgColor = currentTheme === "dark" ? "#AA87FF" : "#633CFF";

  // Render the QR code
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold">QR Code</h2>
      <QRCodeSVG
        value={link}
        size={220} // Size of the QR Code in pixels
        bgColor={bgColor} // Background color
        fgColor={fgColor} // Foreground color
        marginSize={4} // Include white margin
        className="mt-4"
      />
      <p className="mt-4 text-gray-600">Scan to visit</p>
    </div>
  );
};

export default QrCodeGenerator;
