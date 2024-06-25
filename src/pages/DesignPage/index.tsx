import styles from './styles.module.scss';

import Header from '@/components/Header';
import Canvas from '@/components/Canvas';
import Sidebar from '@/components/Sidebar';

const DesignPage = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        <Canvas />
        <Sidebar />
      </div>
    </div>
  );
};

export default DesignPage;
