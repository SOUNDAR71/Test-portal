import React, { useEffect, useRef } from "react";


const ExamCamera = ({ onSnapshot }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
    startCamera();

    const interval = setInterval(() => {
      if (videoRef.current && onSnapshot) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append("snapshot", blob, "snapshot.jpg");
          onSnapshot(formData);
        }, "image/jpeg");
      }
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, [onSnapshot]);

  return (
    <>
      <div className="fixed bottom-5 left-5 w-48 h-36 border-2 border-black rounded-lg overflow-hidden shadow-lg z-50">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
        />
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
};

export default ExamCamera;
