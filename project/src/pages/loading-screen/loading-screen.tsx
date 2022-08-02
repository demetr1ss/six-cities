import styles from './loading-screen.module.css';

export default function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.water}></div>
    </div>
  );
}

