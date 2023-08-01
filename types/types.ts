export interface Ticket {
  id: number;
  userId: number;
  subject: string;
  description: string;
  status: string;
  lastMsg: Date;
  createdAt: Date;
  agentId: number | null;
  updatedAt: Date;
}

export interface TicketUpdates {
  agentData: Record<string, any> | null;
  statusData: Record<string, any> | null;
  emailDate: Record<string, any> | null;
}