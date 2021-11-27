import ClassName from 'models/classname';

import styles from './Image.module.scss';

const Image = ({ children, className, width = '100%', height = 'auto', src, alt, srcSet, dangerouslySetInnerHTML }) => {
  const imageClassName = new ClassName(styles.image);

  imageClassName.addIf(className, className);

  return (
    <figure className={imageClassName.toString()}>
      <div className={styles.featuredImageImg}>
        <img
          width={width}
          height={height}
          src={src}
          alt={alt || ''}
          srcSet={srcSet}
          sizes={'(max-width: 400px) 300px, 700px'}
        />
      </div>
      {children && <figcaption>{children}</figcaption>}
      {dangerouslySetInnerHTML && (
        <figcaption
          dangerouslySetInnerHTML={{
            __html: dangerouslySetInnerHTML,
          }}
        />
      )}
    </figure>
  );
};

export default Image;
