import { useEffect, useRef, useState } from "react";

export default function useWebcamSecurity(onViolation) {
  const videoRef = useRef(null);
  const [cameraAccess, setCameraAccess] = useState(false);

  useEffect(() => {
    // Request camera access
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraAccess(true);
      } catch (err) {
        onViolation("Webcam access denied! Test cannot continue.");
      }
    };

    enableCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        // Stop all tracks when component unmounts
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [onViolation]);

  return { videoRef, cameraAccess };
}
