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
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(localSrc);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  useEffect(() => {
    const isLocal = localSrc && (localSrc.startsWith('/') || localSrc.startsWith('.') || !localSrc.startsWith('http'));
    if (isLocal && !localSrc.includes('data:image')) {
      const buster = localSrc.includes('?') ? `&t=${Date.now()}` : `?t=${Date.now()}`;
      setImgSrc(localSrc + buster);
    } else {
      setImgSrc(localSrc);
    }
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
      onError={handleError}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};
