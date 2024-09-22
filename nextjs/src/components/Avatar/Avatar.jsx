import styles from './Avatar.module.css';

const Avatar = ({ size, username, url }) => {
  if (url) {
    return (
      <img
        className={styles.avatar}
        src={url || '/images/default_user.jpg'}
        alt={username}
        width={size}
        height={size}
      />
    );
  } else {
    return <div
      className={styles.avatar}>
      {username[0]}
    </div>
  }

};

export default Avatar;
