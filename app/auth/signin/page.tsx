'use client'

import { useEffect, useState } from 'react';

export default function SignIn() {
  const [token, setToken] = useState<string>('');
  useEffect(() => {
    const initToken = async () => {
      const response = await fetch(`//${location.host}/api/auth/csrf`);
      const { csrfToken } = await response.json();
      setToken(csrfToken);
    };
    initToken();
  }, []);
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input type="hidden" name="csrfToken" value={token} />
      <label>
        Username
        <input name="username" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}
