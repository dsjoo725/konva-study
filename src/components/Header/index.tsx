import IconButton from '@/shared/@common/ui/IconButton';
import styles from './styles.module.scss';
import {
  BarcodeIcon,
  CircleIcon,
  ImageIcon,
  LineIcon,
  RectangleIcon,
  TextIcon,
} from '@/shared/@common/icons';
import { DownloadIcon, PencilIcon } from 'lucide-react';

const Header = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.toolbar}>
        <IconButton>
          <RectangleIcon />
        </IconButton>
        <IconButton>
          <CircleIcon />
        </IconButton>
        <IconButton>
          <LineIcon />
        </IconButton>
        <IconButton>
          <TextIcon />
        </IconButton>
        <IconButton>
          <BarcodeIcon />
        </IconButton>
        <IconButton>
          <ImageIcon />
        </IconButton>
      </div>

      <div className={styles.titlebar}>
        새 디자인
        <PencilIcon size={16} />
      </div>
      <IconButton>
        <DownloadIcon />
      </IconButton>
    </div>
  );
};

export default Header;
