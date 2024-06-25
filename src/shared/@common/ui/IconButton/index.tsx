import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
}
const IconButton = ({ children }: Props) => {
  return <button className={styles.layout}>{children}</button>;
};

export default IconButton;
