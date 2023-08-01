import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Ticket, TicketUpdates } from 'types/types';

// Db queries to update agent, status, and email date
const updateAgent = async (id: number, email: string) => {
  if (!email) return null;

  const employee = await prisma.employee.findUnique({
    where: { email },
  });

  const updatedAgent = await prisma.ticket.update({
    where: { id },
    data: {
      agent: {
        connect: { id: employee?.id },
      },
    },
  });

  return updatedAgent;
};

const updateStatus = async (id: number, status: string) => {
  if (!status) return null;

  const updatedStatus = await prisma.ticket.update({
    where: { id },
    data: { status },
  });

  return updatedStatus;
};

const updateEmailDate = async (id: number) => {
  const updatedDate = await prisma.ticket.update({
    where: { id },
    data: { lastMsg: new Date() },
  });

  return updatedDate;
};

// Route handler to update a ticket's agent, status, or email date
export const PATCH = async (request: Request) => {
  const data = await request.json();
  const { id, field, key } = data;

  let agentData: Ticket | null = null;
  let statusData: Ticket | null = null;
  let emailDate: Ticket | null = null;

  if (field === 'email') agentData = await updateAgent(id, key);
  else if (field === 'status') statusData = await updateStatus(id, key);
  else if (field === 'lastMsg') emailDate = await updateEmailDate(id);

  const results: TicketUpdates = {
    agentData,
    statusData,
    emailDate,
  };

  return NextResponse.json({ data: results }, { status: 200 });
};
