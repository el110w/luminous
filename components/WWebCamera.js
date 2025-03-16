import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react';

const WebCamera = forwardRef((props, ref) => {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null); //capture indiv frames

  useEffect(() => {
    const getWebCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true});
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing webcam:',err);
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


  useImperativeHandle(ref, () => ({
    captureFrame: () => {
      return new Promise((resolve) => {
        if (videoRef.current && canvasRef.current) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const imageSrc = canvas.toDataURL('image/jpeg'); //capture img as jpeg
          console.log("Captured Image:", imageSrc);
          props.onCapture(imageSrc); //send image to parent component
          resolve(imageSrc);
        }


      })
      
    }
  }));


  if (hasError) {
    return <p>Couldn't access webcam. Please make sure your camera is connected and try again.</p>
  }

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ 
        width: '672', height: '445.5', objectFit: 'contain',
        transform: 'scaleX(-1)' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} /> {/* Hidden Canvas */}
    </div>
  );

});

export default WebCamera;


