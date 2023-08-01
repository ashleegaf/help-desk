import { DetailedTicket, TicketUpdates } from 'types/types';

export const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const updateState = (
  record: DetailedTicket,
  tickets: DetailedTicket[],
  setTix: React.Dispatch<React.SetStateAction<DetailedTicket[]>>,
  field: string,
  key: string,
  id?: number
): void => {
  const i = tickets.findIndex((ticket) => ticket.id === record.id);

  if (i !== -1) {
    const updatedTickets = [...tickets];

    updatedTickets[i] = {
      ...updatedTickets[i],
    };

    if (field === 'email') {
      updatedTickets[i].agent.id = id;
      updatedTickets[i].agent.name = key;
    }
    else if (field === 'status')
      updatedTickets[i].status = key;
    else if (field === 'lastMtg')
      updatedTickets[i].lastMsg = formatDate(new Date());

    setTix(updatedTickets);
  }
};

export const updateDB = async (id: number, field: string, key: string) => {
  const res = await fetch('api/update-ticket', {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ id, field, key }),
  });

  const data: TicketUpdates = await res.json();
  
  return data;
};