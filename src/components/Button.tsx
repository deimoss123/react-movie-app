import styles from './Button.module.scss';

interface Props {
  text: string;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
}

export default function Button({
  text,
  className,
  type,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={
        styles.button +
        (disabled ? ` ${styles.disabled}` : '') +
        (className ? ` ${className}` : '')
      }
      type={type || 'button'}
    >
      {text}
    </button>
  );
}
