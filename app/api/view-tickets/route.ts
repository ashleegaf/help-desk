import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { formatDate } from 'utils/utils';

// Db queries to retrieve detailed ticket data
const getTickets = async () => {
  const tickets = await prisma.ticket.findMany({
    orderBy: [{ id: 'asc' }],
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      agent: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return tickets;
};

const getAgents = async () => {
  const agents = await prisma.employee.findMany();
  return agents;
};

// Route handler to retrieve all tickets and agents
export const GET = async () => {
  const tickets = await getTickets();
  const agents = await getAgents();

  // Format ticket and agent data
  const detailedTickets = tickets.map((ticket) => {
    const agentName = ticket.agent?.name || 'Unassigned';
    const updatedTicket = {
      ...ticket,
      createdAt: formatDate(ticket.createdAt),
      updatedAt: formatDate(ticket.updatedAt),
      lastMsg: formatDate(ticket.lastMsg),
      agent: { ...ticket.agent, name: agentName },
    };

    return updatedTicket;
  });

  const filteredAgents = agents.map(a => ({
    id: a.id,
    name: a.name
  }))

  return NextResponse.json({ detailedTickets, filteredAgents }, { status: 200 });
};
