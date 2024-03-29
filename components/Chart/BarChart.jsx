import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 1, pv: 2890 },
    { name: 2, pv: 3200 },
    { name: 3, pv: 1800 },
    { name: 4, pv: 2100 },
    { name: 5, pv: 4000 },
    { name: 6, pv: 2500 },
    { name: 7, pv: 1600 },
    { name: 8, pv: 1800 },
    { name: 9, pv: 2700 },
    { name: 10, pv: 3900 },
    { name: 11, pv: 3200 },
    { name: 12, pv: 2400 },
    { name: 13, pv: 1800 },
    { name: 14, pv: 2200 },
    { name: 15, pv: 3500 },
    { name: 16, pv: 4200 },
    { name: 17, pv: 5200 },
    { name: 18, pv: 3900 },
    { name: 19, pv: 4700 },
    { name: 20, pv: 5600 },
    { name: 21, pv: 4500 },
    { name: 22, pv: 3600 },
    { name: 23, pv: 3900 },
    { name: 24, pv: 4800 },
    { name: 25, pv: 3900 },
    { name: 26, pv: 2800 },
    { name: 27, pv: 2200 },
    { name: 28, pv: 1600 },
    { name: 29, pv: 2100 },
    { name: 30, pv: 3600 },
    { name: 31, pv: 3900 }
];


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="flex flex-col max-w-[200px] break-words bg-blue-300">
                <p className="text-blue-900">{`${label} : ${JSON.stringify(payload)}`}</p>
                <p className="desc">Anything you want can be displayed here.</p>
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
                    <Bar dataKey="pv" barSize={20} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>

    )
}