import Image from 'next/image';
import Link from 'next/link';
import RequestForm from '@/components/FormRequest';

const RequestPage = () => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <div className='flex flex-col grow w-full overflow-hidden'>
        <div className='flex items-center justify-center border-b border-gray-200 bg-zinc-50 px-4 py-4 text-center sm:px-16'>
          <Link href='/'>
            <Image
              src='/logo.png'
              priority
              alt='Logo'
              className='h-10 w-10 rounded-full'
              width={20}
              height={20}
            />
          </Link>
        </div>
        <RequestForm />
      </div>
    </div>
  );
};

export default RequestPage;
