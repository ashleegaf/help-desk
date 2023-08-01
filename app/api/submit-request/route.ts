import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Ticket submission db queries
const findUser = async (name: string, email: string) => {
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { name, email },
    });
  }

  return user;
};

const createTicket = async (subject: string, desc: string, userId: number) => {
  const ticket = await prisma.ticket.create({
    data: {
      user: {
        connect: { id: userId },
      },
      subject: subject,
      description: desc,
    },
  });

  return ticket;
};

// Route handler to create tickets for new and existing users
export const POST = async (req: Request) => {
  const { name, email, subject, description } = await req.json();

  if (!name || !email || !subject || !description) {
    return NextResponse.json(
      { error: 'Request is incomplete' },
      { status: 406 }
    );
  }

  let user = await findUser(name, email);
  const ticket = await createTicket(subject, description, user.id);

  return NextResponse.json({ data: ticket }, { status: 200 });
};
