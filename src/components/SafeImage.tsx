import React, { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  localSrc: string;
  fallbackSrc: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  localSrc,
  fallbackSrc,
  alt = 'Изображение курса',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(localSrc);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(localSrc);
    setHasFailed(false);
  }, [localSrc]);

  const handleError = () => {
    if (!hasFailed) {
      setImgSrc(fallbackSrc);
      setHasFailed(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};
