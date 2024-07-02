import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

interface Props extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: ReactNode;
}
const IconButton = ({ children, ...props }: Props) => {
  return (
    <button className={styles.layout} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
