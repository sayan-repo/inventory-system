// src/components/DownloadableQR.jsx
import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';

const DownloadableQR = ({ value, title }) => {
  const qrRef = useRef(null);

  const handleDownload = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img');

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `${title || value}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="text-center p-4 border rounded-lg bg-white shadow-sm" ref={qrRef}>
      <p className="font-semibold mb-2">{title}</p>
      <div className="flex justify-center my-2">
        <QRCodeSVG value={value} size={128} />
      </div>
      <button onClick={handleDownload} className="mt-3 flex items-center gap-2 w-full justify-center px-3 py-1 text-sm text-white bg-gray-600 rounded hover:bg-gray-700">
        <Download size={14} />
        Download
      </button>
    </div>
  );
};

export default DownloadableQR;