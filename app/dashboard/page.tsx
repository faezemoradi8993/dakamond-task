'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import styles from '@/styles/components/Dashboard.module.scss';
import Button from '@/components/Button';

export default function DashboardPage() {
  const { user, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace('/auth');
  }, [user]);

  if (!user) return null;

  return (
    <div className={styles.dashboard}>
      <div className={styles.card}>
        <img src={user.picture} alt="avatar" />
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Country:</strong> {user.country}</p>
        <Button
          text="خروج"
          onClick={() => {
            logout();
            router.push('/auth');
          }}
        />
      </div>
    </div>
  );
}
