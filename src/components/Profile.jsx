import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { supabase } from '../supabase';

export default function Profile() {
  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <p>{user?.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
