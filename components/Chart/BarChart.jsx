import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 1, clicks: 2890 },
    { name: 2, clicks: 3200 },
    { name: 3, clicks: 1800 },
    { name: 4, clicks: 2100 },
    { name: 5, clicks: 4000 },
    { name: 6, clicks: 2500 },
    { name: 7, clicks: 1600 },
    { name: 8, clicks: 1800 },
    { name: 9, clicks: 2700 },
    { name: 10, clicks: 3900 },
    { name: 11, clicks: 3200 },
    { name: 12, clicks: 2400 },
    { name: 13, clicks: 1800 },
    { name: 14, clicks: 2200 },
    { name: 15, clicks: 3500 },
    { name: 16, clicks: 4200 },
    { name: 17, clicks: 5200 },
    { name: 18, clicks: 3900 },
    { name: 19, clicks: 4700 },
    { name: 20, clicks: 5600 },
    { name: 21, clicks: 4500 },
    { name: 22, clicks: 3600 },
    { name: 23, clicks: 3900 },
    { name: 24, clicks: 4800 },
    { name: 25, clicks: 3900 },
    { name: 26, clicks: 2800 },
    { name: 27, clicks: 2200 },
    { name: 28, clicks: 1600 },
    { name: 29, clicks: 2100 },
    { name: 30, clicks: 3600 },
    { name: 31, clicks: 39000 }
];


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="flex flex-col max-w-[200px] break-words bg-card p-4 border border-[#10b981] rounded-md">
                <p className="text-muted-foreground">{`${label} march`}</p>
                <p>
                    <span className="text-muted-foreground">Clicks: </span>
                    <span className="text-[#10b981]">{payload[0].value}</span>
                </p>
            </div>
        );
    }

    return null;
};



export function AnalyticsBarChart() {

    return (
        <div className='w-full h-[100%] justify-center items-center flex'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={300}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 5,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="clicks" barSize={20} fill="rgb(16 185 129)" />
                </BarChart>
            </ResponsiveContainer>
        </div>

    )
}