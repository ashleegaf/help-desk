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

export interface DetailedTicket {
  id: number;
  userId: number;
  subject: string;
  description: string;
  status: string;
  lastMsg: string;
  agentId: number | null;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    email: string;
  };
  agent: {
    id?: number | undefined;
    name: string;
  };
}

export interface PanelData {
  detailedTickets: DetailedTicket[];
  filteredAgents: Agent[];
}

export interface TicketUpdates {
  agentData: Record<string, any> | null;
  statusData: Record<string, any> | null;
  emailDate: Record<string, any> | null;
}

export interface Agent {
  id: number;
  name: string;
}

export interface AgentItems {
  key: string;
  label: string;
}
