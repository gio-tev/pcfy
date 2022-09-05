import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import styles from './ImageUpload.module.css';
import dropImageMobile from '../../assets/drop-image-mobile.png';
import errorImage from '../../assets/error-image.png';
import checked from '../../assets/checked.png';
import useWidth from '../../hooks/useWidth';
import useLocalStorage from '../../hooks/useLocalStorage';
import Button from '../UI/button';
import useValidation from '../../hooks/useValidation';

const ImageUpload = ({ hasError, onImageUpload }) => {
  const mobile = useWidth();

  const { selectUploadFieldHasError } = useValidation();

  const [imagePreviewData, setImagePreviewData] = useLocalStorage('imagePreviewData', {});

  const [imageDataURL, setImageDataURL] = useLocalStorage('laptopImage', '');

  const { imageName, imageSize, imagePath } = imagePreviewData;

  const onDrop = useCallback(
    acceptedFiles => {
      const imagePath = URL.createObjectURL(acceptedFiles[0]);
      const imageName = acceptedFiles[0].name;
      const imageSize = (acceptedFiles[0].size / 1000000 + 0.1)
        .toString()
        .substring(0, 3);

      setImagePreviewData({ imageName, imageSize, imagePath });

      const reader = new FileReader();

      reader.onload = () => {
        setImageDataURL(reader.result);

        onImageUpload();
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
    [setImageDataURL, onImageUpload, setImagePreviewData]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUploadAgain = () => setImageDataURL('');

  return (
    <>
      {imageDataURL && (
        <div className={styles.imagePreviewContainer}>
          <img src={imagePath} alt="img upload" className={styles.previewImage} />

          <div className={styles.prevDescriptionContainer}>
            <div className={styles.prevDescriptionInnerContainer}>
              <img
                src={checked}
                alt="img checked"
                className={styles.previewImageChecked}
              />
              <p className={styles.imageName}>{imageName},</p>
              <p className={styles.imageSize}>{imageSize} mb</p>
            </div>
            <Button onClick={handleUploadAgain} className={styles.btnAgain}>
              თავიდან ატვირთე
            </Button>
          </div>
        </div>
      )}

      {!imageDataURL && (
        <div {...getRootProps()}>
          <div
            className={`${styles.imageContainer} ${
              selectUploadFieldHasError(imageDataURL, hasError)
                ? styles.imageError
                : undefined
            }`}
          >
            <input {...getInputProps()} />

            {!mobile && (
              <>
                <div className={styles.imageContentContainer}>
                  <img
                    src={errorImage}
                    alt="noImage"
                    className={`${styles.errorIcon} ${
                      selectUploadFieldHasError(imageDataURL, hasError)
                        ? styles.showErrorIcon
                        : undefined
                    }`}
                  />

                  <p className={styles.uploadTitle}>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</p>
                </div>

                <Button className={styles.uploadBtn}>ატვირთე</Button>
              </>
            )}

            {mobile && (
              <div className={styles.imageContentContainer}>
                <img src={dropImageMobile} alt="drop" className={styles.mobileDropIcon} />
                <p className={styles.uploadTitle}>ლეპტოპის ფოტოს ატვირთვა</p>

                <img
                  src={errorImage}
                  alt="noImage"
                  className={`${styles.errorIcon} ${
                    selectUploadFieldHasError(imageDataURL, hasError)
                      ? styles.showErrorIcon
                      : undefined
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
