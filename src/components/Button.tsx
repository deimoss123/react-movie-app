import styles from './Button.module.scss';

interface Props {
  text: string;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: (e: React.SyntheticEvent) => void;
}

export default function Button({ text, className, type, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={styles.button + (className ? ` ${className}` : '')}
      type={type || 'button'}
    >
      {text}
    </button>
  );
}
