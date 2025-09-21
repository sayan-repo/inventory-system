// src/components/QRScanner.jsx
import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X } from 'lucide-react';

const QRScanner = ({ onScanSuccess, onScanFailure, onClose }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader', 
      { fps: 10, qrbox: { width: 250, height: 250 } }, 
      false // verbose
    );

    scanner.render(onScanSuccess, onScanFailure);

    // Cleanup function to stop the scanner
    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner.", error));
    };
  }, [onScanSuccess, onScanFailure]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75">
      <div id="qr-reader" className="w-full max-w-sm bg-white p-4 rounded-lg shadow-xl"></div>
      <button onClick={onClose} className="mt-4 p-3 rounded-full bg-white text-gray-800 hover:bg-gray-200">
        <X size={24} />
      </button>
    </div>
  );
};

export default QRScanner;