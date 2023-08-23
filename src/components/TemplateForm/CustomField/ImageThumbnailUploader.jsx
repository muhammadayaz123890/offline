import { useState } from 'react';
import { styles } from './styles';
import { Typography, Avatar, Box } from '@mui/material';
import { useEffect } from 'react';

const ImageThumbnailUploader = ({ setThumbnail, size = '6rem', label = 'Upload', view = '', disabled = false }) => {
  const [data, setData] = useState({ file: null, view: view });

  const { file } = data;
  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      function () {
        setThumbnail(reader.result);
      },
      false,
    );

    if (file) {
      reader.readAsDataURL(file);
    }

    return () => reader.removeEventListener('load', function () {}, false);
  }, [file]);

  const handleUploadChange = ({ target: { files } }) => {
    const file = files ? files[0] : '';
    const viewUrl = URL.createObjectURL(file);
    setData({
      file: file,
      view: viewUrl,
    });
    // setThumbnail(viewUrl);
  };
  return (
    <Box sx={{ width: size, height: size }}>
      <Box sx={{ ...styles.uploadThumbnailRoot, width: size, height: size }}>
        <input
          name="logo"
          accept="image/jpeg,image/gif,image/png"
          className="hidden"
          id="button-file"
          type="file"
          onInput={handleUploadChange}
          onClick={(event) => {
            // @ts-ignore
            event.target.value = null;
          }}
          disabled={disabled}
        />
        <div className="preview-thumbnail">
          <label htmlFor="button-file" style={{ width: size, height: size }}>
            <div className="pt-label cursor-pointer" style={{ width: size, height: size }}>
              {
                <Typography className="text-l my-8 font-bold" align="center">
                  {label}
                </Typography>
              }
            </div>
          </label>
          {data?.view?.length > 0 && (
            <Avatar variant="rounded" className={`hidden`} sx={{ width: size, height: size }} src={data.view} />
          )}
        </div>
      </Box>
    </Box>
  );
};

export default ImageThumbnailUploader;
