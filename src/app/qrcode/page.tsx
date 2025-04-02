"use client";
import React from 'react';
import Image from 'next/image';

export default function QRCodePage() {
  const handleFullscreenClick = () => {
    if (!document.fullscreenElement) {
      const element = document.documentElement as any;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
      }
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen p-4 text-center cursor-pointer"
      onClick={handleFullscreenClick}
    >
      <h1 className="text-2xl font-bold mb-4">Born To Run</h1>
      <p className="mb-4">
        Scan the QR code below to start the game on your mobile device!
      </p>
      <Image
        src="/images/qrcode.png"
        alt="QR Code"
        width={200}
        height={200}
        className="mb-4"
      />
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">How to Play:</h2>
        <ul className="list-disc list-inside">
          <li>Select your runner and race.</li>
          <li>Manage your stamina and hydration.</li>
          <li>Make decisions during events to overcome challenges.</li>
          <li>Complete the race before time runs out!</li>
        </ul>
      </div>
    </div>
  );
}
