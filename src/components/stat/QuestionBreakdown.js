import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd memu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

ReactDOM.render(
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Hover me, Click menu item <DownOutlined />
    </a>
  </Dropdown>,
  mountNode,
);









import React, { PureComponent } from 'react';
import PieChart from '@bit/recharts.recharts.pie-chart';
import Pie from '@bit/recharts.recharts.pie';
import Sector from '@bit/recharts.recharts.sector';
import Cell from '@bit/recharts.recharts.cell';
const data = [
	{ name: 'Group A', value: 400 },
	{ name: 'Group B', value: 300 },
	{ name: 'Group C', value: 300 },
	{ name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

export default class Example extends PureComponent {
	render() {
		return (
			<PieChart width={400} height={400}>
				<Pie
					data={data}
					cx={200}
					cy={200}
					labelLine={false}
					label={renderCustomizedLabel}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
				>
					{
						data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
					}
				</Pie>
			</PieChart>
		);
	}
}
