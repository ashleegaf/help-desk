import Image from 'next/image';
import Link from 'next/link';
import TicketPanel from '@/components/ticket-panel';

const PanelPage = () => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <div className='flex flex-col grow w-full overflow-hidden'>
        <div className='flex items-center justify-center space-x-10 border-b border-gray-200 bg-zinc-50 px-4 py-4 text-center sm:px-16'>
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
          <h1 className='font-bold text-2xl'>All Tickets</h1>
        </div>
        <TicketPanel />
      </div>
    </div>
  );
};

export default PanelPage;
