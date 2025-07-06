'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from '@/styles/components/Auth.module.scss';

export default function AuthPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const router = useRouter();

  const validateIranPhone = (value: string) => /^09\d{9}$/.test(value);

  const handleLogin = async () => {
    if (!validateIranPhone(phone)) {
      setError('شماره تلفن معتبر نیست');
      return;
    }

    const res = await fetch('https://randomuser.me/api/?results=1&nat=us');
    const data = await res.json();
    const user = data.results[0];

    setUser({
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      phone,
      country: user.location.country,
      picture: user.picture.large
    });

    router.push('/dashboard');
  };

  return (
    <div className={styles.auth}>
      <h1>ورود</h1>
      <Input
        label="شماره موبایل ایران"
        type="tel"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          setError('');
        }}
        placeholder="مثلاً 09123456789"
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button text="ورود" onClick={handleLogin} />
    </div>
  );
}
