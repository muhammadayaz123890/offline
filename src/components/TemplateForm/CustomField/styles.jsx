export const styles = {
  uploadThumbnailRoot: {
    position: 'absolute',
    borderRadius: 2,
    '& > input': {
      visibility: 'hidden',
      width: '110px',
      height: '110px',
    },
    '& .preview-thumbnail': {
      position: 'absolute',
      top: 0,
    },
    '& .pt-label': {
      position: 'absolute',
      top: 0,
      zIndex: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      backgroundColor: '#00000045',

      borderRadius: 2,
    },
  },
};
