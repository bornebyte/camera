import { useCallback, useRef, useState, Fragment } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = useRef(null); // Use React.useRef<Webcam> for TypeScript
  const [imgSrc, setImgSrc] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc]);

  const handleStartCamera = () => {
    setImgSrc(null); // Clear previous image
    setIsCameraOn(true);
  };

  const handleStopCamera = () => {
    setIsCameraOn(false);
  };

  const handleRetake = () => {
    setImgSrc(null);
  };

  const handleDownload = () => {
    if (imgSrc) {
      const a = document.createElement("a");
      a.href = imgSrc;
      a.download = "webcam-capture.jpeg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <>
      {!isCameraOn && !imgSrc && (
        <button onClick={handleStartCamera}>Start Camera </button>
      )}
      {isCameraOn && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          minScreenshotWidth={180}
          minScreenshotHeight={180}
        />
      )}
      <div className="flex justify-start items-center gap-10">
        {isCameraOn && !imgSrc && <button onClick={capture}> Capture Photo </button>}
        {isCameraOn && <button onClick={handleStopCamera}> Stop Camera </button>}
      </div>

      {imgSrc && (
        <img src={imgSrc} alt="Captured" />
      )}
      <div className="flex justify-start items-center gap-10">
        {imgSrc && <button onClick={handleRetake}> Retake Photo </button>}
      </div>
      {imgSrc && <button onClick={handleDownload}> Download Photo </button>}
    </>
  );
};
export default WebcamCapture
