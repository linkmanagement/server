import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COUNTRIES } from '../CountrySelector/countries';



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


function filterAnalytics(analytics, selectedMonthYear, country) {

    let filteredAnalytics = analytics?.filter(analytic => {
        let analyticDate = new Date(analytic.timestamp);
        let analyticMonth = analyticDate.getMonth() + 1;
        let analyticYear = analyticDate.getFullYear();
        let analyticCountry = analytic.countryCode;
        console.log('1', analyticMonth, analyticYear, analyticCountry);
        console.log('2', selectedMonthYear.month, selectedMonthYear.year, country);
        return analyticMonth === selectedMonthYear.month && analyticYear === selectedMonthYear.year && (analyticCountry === country || country === 'world');
    });

    return filteredAnalytics;
}

function convertAnalyticsToChartData(analytics, selectedMonthYear) {
    let data = [];
    let clicks = 0;
    let month = selectedMonthYear.month;
    let year = selectedMonthYear.year;

    let daysInMonth = new Date(year, month, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        let clicks = analytics.filter(analytic => {
            let analyticDate = new Date(analytic.timestamp);
            let analyticDay = analyticDate.getDate();
            return analyticDay === i;
        }).length;
        data.push({ name: i, clicks: clicks });
    }

    return data;
}



export function AnalyticsBarChart({ analytics, selectedMonthYear, country }) {
    let data = convertAnalyticsToChartData(filterAnalytics(analytics, selectedMonthYear, country), selectedMonthYear);
    let totalClicks = data.reduce((acc, curr) => acc + curr.clicks, 0);
    let countryName = COUNTRIES.find(c => c.value === country)?.title;
    let monthName = new Date(selectedMonthYear.year, selectedMonthYear.month - 1, 1).toLocaleString('default', { month: 'long' });
    let timeText = `${countryName} | ${monthName}, ${selectedMonthYear.year} | total Clicks ${totalClicks}`;

    return (
        <div className='w-full h-[100%] justify-center items-center flex flex-col'>
            <p className='text-sm text-[#10b981]'>
                {timeText}
            </p>

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