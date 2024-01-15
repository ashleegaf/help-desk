import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType, MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { Space } from 'antd';
import { DetailedTicket, AgentItems } from 'types/types';
import { updateDB, updateState } from 'utils/utils';

const statusItems: MenuProps['items'] = [
  { key: 'New', label: 'New' },
  { key: 'In Progress', label: 'In Progress' },
  { key: 'Resolved', label: 'Resolved' },
];

// Create map between a column header's dataIndex and ticket data keys to populate rows
export const createColumns = (
  tickets: DetailedTicket[],
  setTickets: React.Dispatch<React.SetStateAction<DetailedTicket[]>>,
  agentItems: AgentItems[]
): TableColumnsType<DetailedTicket> => {
  return [
    { title: 'Requestor', dataIndex: ['user', 'name'], key: 'requestor' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    {
      title: 'Agent',
      dataIndex: ['agent', 'name'],
      key: 'agent',
      render: (dataIndex) => (
        <Space size='middle'>
          <Dropdown menu={{ items: agentItems }}>
            <a>
              <DownOutlined /> {dataIndex}
            </a>
          </Dropdown>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (dataIndex, record) => (
        <Space size='middle'>
          <Dropdown
            menu={{
              items: statusItems,
              onClick: async ({ key }) => {
                const data = await updateDB(record.id, 'status', key);

                if (data.statusData !== null) {
                  updateState(record, tickets, setTickets, 'status', key);
                }
              },
            }}>
            <a onClick={(e) => e.preventDefault()}>
              <DownOutlined /> {dataIndex}
            </a>
          </Dropdown>
        </Space>
      ),
    },
    { title: 'Last Message', dataIndex: 'lastMsg', key: ';lastMsg' },
  ];
};
