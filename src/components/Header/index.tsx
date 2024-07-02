import { DownloadIcon, PencilIcon } from 'lucide-react';

import styles from './styles.module.scss';

import IconButton from '@/shared/@common/ui/IconButton';
import {
  BarcodeIcon,
  CircleIcon,
  ImageIcon,
  LineIcon,
  RectangleIcon,
  TextIcon,
} from '@/shared/@common/icons';
import { useCreateShape } from '@/shared/design/hooks/useCreateShape';
import {
  DEFAULT_CIRCLE_CONFIG,
  DEFAULT_LINE_CONFIG,
  DEFAULT_RECTANGLE_CONFIG,
  DEFAULT_TEXT_CONFIG,
} from '@/shared/design/constant';

const Header = () => {
  const { createCircle, createRectangle, createText, createLine } = useCreateShape();

  return (
    <div className={styles.layout}>
      <div className={styles.toolbar}>
        <IconButton onClick={() => createRectangle(DEFAULT_RECTANGLE_CONFIG)}>
          <RectangleIcon />
        </IconButton>
        <IconButton onClick={() => createCircle(DEFAULT_CIRCLE_CONFIG)}>
          <CircleIcon />
        </IconButton>
        <IconButton onClick={() => createLine(DEFAULT_LINE_CONFIG)}>
          <LineIcon />
        </IconButton>
        <IconButton onClick={() => createText(DEFAULT_TEXT_CONFIG)}>
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
