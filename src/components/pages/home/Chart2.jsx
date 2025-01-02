import React from 'react';
import { useSelector } from 'react-redux';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';

const Chart2 = () => {
    const themeMode = useSelector((state) => state.theme.mode);
    const orders = useSelector((state) => state.ordersData.orders);

    // Function to format the month (e.g., 11 => "Nov")
    const formatMonth = (monthNumber) => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return months[monthNumber - 1];
    };

    // Summing revenue and profit by month
    const summary = orders.reduce((acc, order) => {
        const [day, month, year] = order.orderDateTime.split(" ")[0].split("/");
        const orderDate = new Date(`${year}-${month}-${day}`);
        if (isNaN(orderDate)) {
            console.error("Invalid date:", order.orderDateTime);
            return acc; // Skip invalid dates
        }
        const monthName = formatMonth(orderDate.getMonth() + 1);
        if (!acc[monthName]) {
            acc[monthName] = { month: monthName, revenue: 0, profit: 0 };
        }

        acc[monthName].revenue += order.orderRevenue || 0;
        acc[monthName].profit += order.orderProfit || 0;

        return acc;
    }, {});

    // Full list of months for default year
    const allMonths = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Prepare the final array of data
    const yearSummary = allMonths.map(month => ({
        month,
        revenue: summary[month]?.revenue || 0,
        profit: summary[month]?.profit || 0,
    }));

    // console.log("yearSummary:", yearSummary);

    // Chart data mapping
    const data = yearSummary;

    // Color themes for light and dark modes
    const areaColors = {
        light: {
            revenue: '#6ab04c',
            profit: '#2980b9',
        },
        dark: {
            revenue: '#0088FE',
            profit: '#00C49F',
        },
    };

    const currentColors = themeMode === 'theme-mode-dark' ? areaColors.dark : areaColors.light;

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={themeMode === 'theme-mode-dark' ? '#333' : '#ccc'} />
                    <XAxis dataKey="month" stroke={themeMode === 'theme-mode-dark' ? '#fff' : '#7a7a7a'} />
                    <YAxis stroke={themeMode === 'theme-mode-dark' ? '#fff' : '#7a7a7a'} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: themeMode === 'theme-mode-dark' ? '#2d2d2d' : '#fff',
                            color: themeMode === 'theme-mode-dark' ? '#fff' : '#000',
                            borderRadius: '8px',
                        }}
                    />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stackId="1"
                        stroke={currentColors.revenue}
                        fill={currentColors.revenue}
                        fillOpacity={0.4}
                        isAnimationActive={true}
                    />
                    <Area
                        type="monotone"
                        dataKey="profit"
                        stackId="0"
                        stroke={currentColors.profit}
                        fill={currentColors.profit}
                        fillOpacity={0.3}
                        isAnimationActive={true}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart2;
