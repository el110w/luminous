import React, { useEffect, useRef, useState } from 'react';

export default function WebCamera() {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const getWebCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing webcam: ', err);
        setHasError(true);
      }
    };

    getWebCamera();

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        const tracks = stream?.getTracks();
        tracks?.forEach(track => track.stop());
      }
    };
  }, []);

  if (hasError) {
    return <p>Could not access webcam. Please make sure your camera is connected and try again.</p>;
  }

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ 
        width: '100%', height: 'auto', objectFit: 'contain',
        transform: 'scaleX(-1)' }} />
    </div>
  );
}