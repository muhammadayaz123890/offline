import React from 'react';
import { useHookFormContext } from 'mui-react-hook-form-plus';
import ImageThumbnailUploader from './ImageThumbnailUploader';
const ImageField = ({ name = '', disabled }) => {
  const { setValue, watch, getValues } = useHookFormContext();
  const value = getValues(name);
  return <ImageThumbnailUploader view={value} setThumbnail={(url) => setValue(name, url)} />;
};

export default ImageField;
