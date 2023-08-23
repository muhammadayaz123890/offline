import React, { useState, useEffect, Fragment } from 'react';

import { useHookFormContext } from 'mui-react-hook-form-plus';
import { Box, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { nanoid } from 'nanoid';
import { get, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FILE_TYPE_LIST } from '../../../helpers/constants';

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1000000; // 1MB

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const Item = ({ id, uri, viewUrl, type, removeImg }) => {
  const [loading, setLoading] = useState(false);

  const onRemoveImg = async () => {
    try {
      setLoading(true);
      removeImg(id);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          width: '50px',
          height: '50px',
          borderRadius: '6px',
          overflow: 'hidden',
          shadow: 1,
          border: '1px solid lightgray',
          borderColor: 'gray.200',
        }}
      >
        <a href={viewUrl} target="_blank">
          {type?.includes('image/') ? (
            <img
              src={uri || 'https://wallpaperaccess.com/full/317501.jpg'}
              alt="img"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full bg-red-600 font-mono font-bold text-white">
              <span className="m-auto">PDF</span>
            </div>
          )}
        </a>
      </Box>
      <Box
        sx={{
          width: '24px',
          height: '24px',
          position: 'absolute',
          top: -10,
          right: -10,
          zIndex: 100,
          bgcolor: 'white',
          borderRadius: '100%',
          boxShadow: 1,
          border: '1px solid lightgray',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1,
        }}
        onClick={onRemoveImg}
        disabled={loading}
      >
        {loading ? <CircularProgress size={6} /> : <CloseIcon fontSize="1" />}
      </Box>
    </Box>
  );
};

const CustomPicker = ({ value, onChange, afterChange, isView }) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!!value && value?.length > 0) {
      setFiles(value);
    }
  }, []);
  useEffect(() => {
    onChange(files);
    afterChange?.();
  }, [files]);

  const handleImageRemove = (id) => {
    setFiles((pfiles) => {
      return pfiles.filter((f) => f?.id !== id);
    });
  };

  const generateDataURl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false,
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  };

  const handleUploadChange = async ({ target: { files: selectFiles } }) => {
    try {
      const file = selectFiles ? selectFiles[0] : '';
      const viewUrl = URL.createObjectURL(file);
      if (files.length === 5) {
        toast.error('You can only upload 5 files');
        return;
      }
      if (file.size > DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
        toast.error(`File size should be 1mb or less`);
        return;
      }
      if (!FILE_TYPE_LIST.includes(file.type)) {
        toast.error(`File type is not supported`);
        return;
      }
      const dataUrl = await generateDataURl(file);

      const nId = nanoid();
      setFiles((pfiles) => [...pfiles, { uri: dataUrl, type: file.type, id: nId, viewUrl }]);
    } catch (err) {
      console.log(err);
      toast.error(`Upload failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ my: 2, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {(files.length > 0 || loading) &&
        files.map((file) => (
          <Item
            key={file?.id}
            id={file?.id}
            uri={file?.uri}
            viewUrl={file?.viewUrl}
            type={file?.type}
            removeImg={handleImageRemove}
          />
        ))}
      <IconButton sx={{ border: '1px dashed', borderRadius: '6px', p: 0 }}>
        <label className="flex h-12 w-12 cursor-pointer items-center justify-center p-2">
          <input
            name="file-upload"
            accept="image/jpeg,image/png,application/pdf"
            className="hidden"
            id="button-file"
            type="file"
            onInput={handleUploadChange}
            onClick={(event) => {
              // @ts-ignore
              event.target.value = null;
            }}
            disabled={isView}
          />
          <AddIcon />
        </label>
      </IconButton>
    </Box>
  );
};

const FileImagePicker = ({ label = '', name, isRequired = false, isView }) => {
  const {
    control,
    formState: { errors },
    getValues,
  } = useHookFormContext();

  const hasError = get(errors, name)?.message;
  return (
    <Box sx={{ width: '100%' }}>
      <p>{label}</p>
      <Controller
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <CustomPicker
              value={value}
              onChange={onChange}
              afterChange={() => {
                // console.log("afterChange");
              }}
              isView={isView}
            />
          );
        }}
        name={name}
        rules={{
          validate: (value) => {
            if ((value && value.length > 0) || !isRequired) {
              return true;
            } else {
              return 'Required';
            }
          },
        }}
      />
      {hasError && <p>{hasError}</p>}
    </Box>
  );
};
export default FileImagePicker;
