import styles from '@/styles/components/Button.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export default function Button({ text, ...props }: Props) {
  return <button className={styles.button} {...props}>{text}</button>;
}
