import React, { useRef, useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const AuthPage: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const email = emailRef.current?.value || '';
    const password = passRef.current?.value || '';
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-2">
          {isSignup ? 'Sign Up' : 'Login'} to Green Journal
        </h2>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        <input ref={emailRef} type="email" placeholder="Email" required className="w-full border p-2 rounded" />
        <input ref={passRef} type="password" placeholder="Password" required className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-semibold">
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <button type="button" className="w-full text-green-700 underline" onClick={() => setIsSignup((v) => !v)}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
