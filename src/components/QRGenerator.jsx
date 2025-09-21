// src/components/QRGenerator.jsx
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRGenerator = ({ value, size = 128, title }) => {
  if (!value) return null;

  return (
    <div className="text-center p-2 border rounded-lg bg-white">
      {title && <p className="font-semibold mb-2">{title}</p>}
      <div className="flex justify-center">
        <QRCodeSVG value={value} size={size} />
      </div>
      <p className="text-xs break-all mt-2 text-gray-600">{value}</p>
    </div>
  );
};

export default QRGenerator;