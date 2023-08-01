'use client';

import React from 'react';
import { DetailedTicket } from 'types/types';

// Generate expanded row data for ticket records via their rowKey
export const expandedRowRender = (record: DetailedTicket) => {
  return (
    <div className='flex justify-between px-11'>
      <div>
        <h3 className='font-bold'>Submitted on:</h3>
        <p>{record.createdAt}</p>
        <h3 className='font-bold'>Email:</h3>
        <p>{record.user.email}</p>
      </div>
      <div className='w-2/6'>
        <h3 className='font-bold'>Ticket Description:</h3>
        <p>{record.description}</p>
      </div>
      <div>
        <form
          className='flex'
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.target as HTMLFormElement);
            console.log(
              `Sending '${form.get('response')}' to ${record.user.email}...`
            );
            const text = document.getElementById(
              'response'
            ) as HTMLInputElement;
            text.value = '';
          }}>
          <div className='space-y-1.5'>
            <label className='flex flex-col'>
              <p className='font-bold'>
                Respond to{' '}
                <span className='text-blue-600'>{record.user.name}</span>:
              </p>
              <textarea
                id='response'
                name='response'
                rows={4}
                cols={55}
                className='px-1.5 border-black border shadow-sm'
              />
            </label>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5'>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
