import styles from '@/styles/components/Input.module.scss';

export default function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className={styles.inputGroup}>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}
