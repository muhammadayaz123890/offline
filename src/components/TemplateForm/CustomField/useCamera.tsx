import { useEffect, useState, useCallback } from 'react';

type CameraFacingMode = 'environment' | 'user';

function useCardRatio(initialRatio) {
  const [aspectRatio, setAspectRatio] = useState(initialRatio);

  const calculateRatio = useCallback((height, width) => {
    if (height && width) {
      const isLandscape = height <= width;
      const ratio = isLandscape ? width / height : height / width;

      setAspectRatio(ratio);
    }
  }, []);

  return [aspectRatio, calculateRatio];
}

export const useCamera = () => {
  const [videoDem, handleVideoDem] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [cameraFacingMode, handleCameraFacingMode] = useState<CameraFacingMode>('environment');
  const [imageData, handleImageData] = useState('');
  const [isReadyToCheck, setIsReadyToCheck] = useState(false);
  const [aspectRatio, calculateRatio] = useCardRatio(1.586);
  let video: HTMLVideoElement;
  let canvas: HTMLCanvasElement;

  useEffect(() => {
    try {
      //find video and canvas elements by tagNames
      if (!isReadyToCheck) {
        video?.pause();
        throw 'error';
      }
      video = document.getElementsByTagName('video')[0];
      canvas = document.getElementsByTagName('canvas')[0];

      let constraint = {
        video: {
          minAspectRatio: aspectRatio,
          aspectRatio: aspectRatio,
          minFrameRate: 30,
          width: { min: 409, ideal: 409, max: 1920 },
          height: { min: 800, ideal: 800, max: 1080 },
          facingMode: cameraFacingMode,
        },
        audio: false,
      };
      navigator.mediaDevices
        .getUserMedia(constraint)
        .then((stream) => {
          video?.setAttribute('playsinline', 'true');
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            //get position of video tag;
            let { clientLeft, clientTop, videoWidth, videoHeight } = video;
            handleVideoDem({ w: videoWidth, h: videoHeight });
            calculateRatio(videoWidth, videoHeight);
            //align canvas position with video position
            //canvas.style.position = 'absolute';
            //canvas.style.left = clientLeft.toString();
            //canvas.style.top = clientTop.toString();
            console.log(`Video width: ${videoWidth} , Video Height: ${videoHeight}`)
            canvas.width = videoWidth
            canvas.height = videoHeight

            video?.play();
          };
        })
        .catch((e) => {
          console.log(e);
          alert(e);
        });
    } catch (e) {
      //alert('error1: ' + e);
      console.log(e);
    }
  }, [isReadyToCheck]);

  const switchCameraFacingMode = () => {
    handleCameraFacingMode((old) => (old === 'environment' ? 'user' : 'environment'));
  };

  const captureImage = async (): Promise<string> => {
    //take photo
    try {
      let video: HTMLVideoElement = document.getElementsByTagName('video')[0];
      let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
      let context = canvas.getContext('2d');
      console.log(videoDem.w, videoDem.h, aspectRatio);
      context?.drawImage(video, 0, 0, videoDem.w, videoDem.h);
      let imageData1 = canvas.toDataURL('image/png', .5);
      console.log('imageData', imageData);
      handleImageData(imageData1);
      
      return imageData1;
    } catch (e) {
      console.log(e);
      alert('Error in Capturing Image: ' + e);
      return '';
    }
  };

  return { cameraFacingMode, switchCameraFacingMode, imageData, captureImage, setIsReadyToCheck };
};
