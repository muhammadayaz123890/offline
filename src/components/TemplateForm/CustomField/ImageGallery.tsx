import React, { useState, useEffect } from 'react';
import { useHookFormContext } from 'mui-react-hook-form-plus';
import { Box, ImageList, ImageListItem } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
//import "react-medium-image-zoom/dist/styles.css";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useCamera } from './useCamera.tsx';
import { Button, Modal } from 'antd';
import Zoom from 'react-medium-image-zoom';
import Icon, { CloseCircleOutlined } from '@ant-design/icons';
import { uuidv4 } from '@firebase/util';
import 'react-medium-image-zoom/dist/styles.css';
import './ImageGallery.css';
const Label = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.5),
  textAlign: 'center',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

const ImageGallery = ({ name = '', disabled, formName }) => {
  const { setValue, watch, getValues } = useHookFormContext();
  const value = getValues(formName + '.fleet_data') || [];
  console.log(value);

  const { captureImage, imageData, switchCameraFacingMode, setIsReadyToCheck } = useCamera(); // customHook that contains logics
  const [imageDatas, handleImageDatas] = useState<any>(value); // capture imageUrls are saved in this state.

  useEffect(() => {
    //whenever imageData changed, which means captureImage is executed, imageUrl is cumulated in the array.
    if (imageData) {
      let id = uuidv4();
      handleImageDatas([
        ...imageDatas,
        {
          base64: imageData,
          id,
          path: `tasks/tempaltes/${id}.jpg`,
        },
      ]);
      console.log(imageDatas);
    }
  }, [imageData]);

  useEffect(() => {
    setValue(formName + '.fleet_data', imageDatas);
  }, [imageDatas]);

  const [open, setOpen] = useState(false);

  return (
    <Box p={2}>
      <Button
        onClick={() => {
          setOpen(!open);
          setIsReadyToCheck(true);
        }}
      >
        open Modal
      </Button>
      {imageDatas.length > 0 && (
        <Box
          id="Images"
          style={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            gridGap: 10,
            marginTop: 5,
            marginBottom: 5,
            width: '100%',
          }}
          p={1}
        >
          {imageDatas.map((imageData, index) => {
            return (
              imageData && (
                <Box
                  key={index}
                  height={71}
                  style={{
                    border: '1px solid black',
                    justifyContent: 'center',
                    flex: '0 0 auto',
                    display: 'flex',
                  }}
                >
                  <CloseCircleOutlined
                    color="#E90505"
                    onClick={() => {
                      handleImageDatas(imageDatas.filter((x) => imageData.id != x.id));
                    }}
                    style={{
                      zIndex: 99,
                    }}
                  />
                  <Zoom>
                    <img
                      key={index}
                      src={imageData.base64}
                      alt="NoImage"
                      style={{
                        objectFit: 'contain',
                        maxWidth: '70px',
                        maxHeight: '70px',
                      }}
                    />
                  </Zoom>
                </Box>
              )
            );
          })}
        </Box>
      )}
      <Modal
        title="Camera"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        style={{
          backgroundColor: 'red',
        }}
        bodyStyle={{
          height: '88%',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        {imageDatas.length > 0 && (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              zIndex: 99,
              padding: 5,
            }}
          >
            <div
              id="Images"
              style={{
                display: 'flex',
                overflowX: 'auto',
                flexWrap: 'nowrap',
                overflowY: 'hidden',
                whiteSpace: 'nowrap',
                gridGap: 5,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              {imageDatas.map((imageData, index) => {
                return (
                  imageData && (
                    <div
                      key={index}
                      style={{
                        border: '1px solid black',
                        width: '75px',
                        height: '75px',
                        flex: '0 0 auto',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        key={index}
                        src={imageData.base64}
                        alt="NoImage"
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  )
                );
              })}
            </div>
          </div>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 4,
          }}
          className="my-5"
        >
          <video style={{ objectFit: 'cover', height: '100%' }} />
          <canvas style={{ opacity: 0, height: 300, width: 300, display: 'none' }} />
          <Button
            onClick={captureImage}
            style={{
              borderRadius: '50%',
              position: 'absolute',
              bottom: '10%',
            }}
          >
            Take
          </Button>
          {/*<Button onClick={switchCameraFacingMode}>switch</Button>*/}
        </div>
      </Modal>
    </Box>
    /* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'flex-start' }}>
      <div className="VideoAndCanvas">
        <video width={300} style={{ objectFit: 'contain' }} />
        <canvas style={{ opacity: 0 }} />
      </div>
      <button onClick={captureImage}>capturar</button>
      <button onClick={switchCameraFacingMode}>switch</button>
      {imageDatas.length > 0 && (
        <div
          id="Images"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: '1%',
            padding: '1%',
          }}
        >
          {imageDatas.map((imageData, index) => {
            return imageData.length > 10 && <img key={index} src={imageData} width={300 * 0.45} alt="NoImage" />;
          })}
        </div>
      )}
    </div> */
  );
};

export default ImageGallery;
