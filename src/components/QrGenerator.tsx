import React from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ value }: { value: string }) => {
  return <QRCode value={value} />;
};

export default QRCodeGenerator;
