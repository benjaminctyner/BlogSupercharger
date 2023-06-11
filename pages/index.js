import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

export default function Home() {
  console.log(user);
  return (
    <div>
      <h1 className='text-6xl'>Whats up!!</h1>
      <div>
        <div></div>
      </div>
    </div>
  );
}
