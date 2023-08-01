'use client';

import React, { useState, useEffect } from 'react';
import { ConfigProvider, Spin, Table } from 'antd';
import { DetailedTicket, Agent, PanelData } from 'types/types';
import { expandedRowRender } from './ticket-panel-row-x';
import { createColumns } from './ticket-panel-col';

const TicketPanel = () => {
  const [tickets, setTickets] = useState<DetailedTicket[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/view-tickets');

      if (res.ok) {
        const { detailedTickets, filteredAgents }: PanelData = await res.json();
        console.log(detailedTickets)

        setTickets(detailedTickets);
        setAgents(filteredAgents);
      }
    } catch (error) {
      console.error(`Error fetching tickets and agents for panel. ${error}`);
    }
  };

  // Fetch tickets on page load
  useEffect(() => {
    fetchTickets();
  }, []);

  // Refresh panel data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTickets();
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
          // loading={}
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
