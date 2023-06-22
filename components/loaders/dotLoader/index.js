import styles from './styles.module.scss';
import DotLoader from 'react-spinners/DotLoader';

const DotLoaderSpinner = ({ loading }) => {
  return (
    <div className={styles.loader}>
      <DotLoader color="#2f82ff" loading={loading} />
    </div>
  );
};

export default DotLoaderSpinner;
