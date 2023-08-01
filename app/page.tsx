import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex h-screen bg-orange-100'>
      <div className='w-screen h-screen space-y-20 flex flex-col justify-center items-center'>
        <Image
          width={512}
          height={512}
          src='/logo.png'
          alt='Platforms on Vercel'
          className='w-48 h-48'
        />
        <div className='text-center space-y-20 max-w-screen-sm mb-10'>
          <h1 className='font-bold text-4xl'>Welcome to the Support Desk</h1>
          <div className='flex justify-between space-x-20 text-lg'>
            <Link href='/request'>
              <div className='p-10 bg-orange-300 hover:bg-amber-500 border-1 border-amber-500 hover:underline'>
                Submit a Request
              </div>
            </Link>
            <Link href='/panel'>
              <div className='p-10 bg-orange-300 hover:bg-amber-500 border-1 border-amber-500 hover:underline'>
                Visit Agent Portal
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
