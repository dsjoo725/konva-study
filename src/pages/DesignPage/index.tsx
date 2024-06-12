import styles from './styles.module.scss';

import Toolbar from '@/components/Toolbar';
import Canvas from '@/components/Canvas';

const DesignPage = () => {
  return (
    <div className={styles.layout}>
      <h1>KonvaStudy</h1>
      <div className={styles.container}>
        <Toolbar />
        <Canvas />
      </div>
    </div>
  );
};

export default DesignPage;
