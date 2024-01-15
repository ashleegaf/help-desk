'use client';

import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { Spin } from 'antd';
import { Table } from 'antd';
import { DetailedTicket, Agent, PanelData } from 'types/types';
import { expandedRowRender } from '@/components/tickets/TicketPanelRow';
import { createColumns } from '@/components/tickets/TicketPanelColumn';

const TicketPanel = () => {
  const [tickets, setTickets] = useState<DetailedTicket[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  
  const getTickets = async () => {
    try {
      const res = await fetch('/api/view-tickets');
  
      if (res.ok) {
        const { detailedTickets, filteredAgents }: PanelData = await res.json();
  
        setTickets(detailedTickets);
        setAgents(filteredAgents);
      }
    } catch (error) {
      console.error(`Error fetching tickets and agents for panel. ${error}`);
    }
  };

  // Fetch tickets on page load
  useEffect(() => {
    getTickets();
  }, []);

  // Refresh panel data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      getTickets();
    }, 1 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Create column data
  const agentItems = agents.map((agent) => ({
    key: agent.id.toString(),
    label: agent.name,
  }));

  const columns = createColumns(tickets, setTickets, agentItems);

  return (
    <>
      <ConfigProvider renderEmpty={() => <Spin size={'large'} />}>
        <Table
          showHeader={tickets[0] ? true : false}
          columns={columns}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
          dataSource={tickets}
          rowKey='id'
          size='middle'
        />
      </ConfigProvider>
    </>
  );
};

export default TicketPanel;
