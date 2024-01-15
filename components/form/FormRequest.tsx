'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const RequestForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target as HTMLFormElement);
    const formData = {
      name: form.get('name') as string,
      email: form.get('email') as string,
      subject: form.get('subject') as string,
      description: form.get('description') as string,
    };

    try {
      const res = await fetch('/api/submit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Message sent successfully! Redirecting home...');
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Error submitting request. Please retry.');
      console.error(error);
    }
  };

  return (
    <div className='grow flex justify-center items-center bg-orange-100'>
      <form onSubmit={submitRequest} className='w-5/12 flex flex-col'>
        <h1 className='block mb-6 text-4xl font-medium text-center text-gray-900'>
          Submit a request
        </h1>

        <div className='mb-6'>
          <label className='block text-md font-medium text-gray-900'>
            Your name
            <input
              type='text'
              id='name'
              name='name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </label>
        </div>

        <div className='mb-6'>
          <label className='block text-md font-medium text-gray-900'>
            Your email address
            <input
              type='email'
              id='email'
              name='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </label>
        </div>

        <div className='mb-6'>
          <label className='block text-md font-medium text-gray-900'>
            Subject
            <input
              type='text'
              id='subject'
              name='subject'
              maxLength={30}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              required
            />
          </label>
          <p className='text-sm'>Up to 30 characters allowed.</p>
        </div>

        <div className='mb-6'>
          <label className='block text-md font-medium text-gray-90'>
            Description
            <textarea
              id='description'
              name='description'
              rows={4}
              maxLength={250}
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Please describe the details of your issue...'
              required
            />
          </label>
          <p className='text-sm'>Up to 250 characters allowed.</p>
        </div>

        <div className='flex justify-center mt-3'>
          <button
            type='submit'
            disabled={loading}
            className={'text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-9 py-2.5 text-center ' + (loading ? 'bg-slate-100 text-slate-500' : 'bg-blue-700 hover:bg-blue-800')}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
