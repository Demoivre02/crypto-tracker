'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from 'next-themes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TimeRange = '24h' | '7d' | '30d' | '90d';

interface PriceData {
  date: Date;
  price: number;
}

interface PriceStatistics {
  currentPrice: number;
  highPrice: number;
  lowPrice: number;
  priceChange: number;
  priceChangePercentage: number;
}

const formatDate = (date: Date, timeRange: TimeRange): string => {
  switch (timeRange) {
    case '24h':
      return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    case '7d':
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    default:
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

// Add statistics calculation helper
const calculateStatistics = (data: PriceData[]): PriceStatistics => {
  const prices = data.map(d => d.price);
  const currentPrice = prices[prices.length - 1];
  const startPrice = prices[0];
  return {
    currentPrice,
    highPrice: Math.max(...prices),
    lowPrice: Math.min(...prices),
    priceChange: currentPrice - startPrice,
    priceChangePercentage: ((currentPrice - startPrice) / startPrice) * 100,
  };
};

// Generate mock data for the given number of days
const generateMockData = (days: number): PriceData[] => {
  const data: PriceData[] = [];
  let lastPrice = 100;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Generate more volatile price changes for shorter time periods
    const volatility = days <= 1 ? 0.02 : days <= 7 ? 0.015 : 0.01;
    const change = (Math.random() - 0.5) * volatility;
    lastPrice = lastPrice * (1 + change);

    data.push({
      date,
      price: lastPrice,
    });
  }
  
  return data;
};

export default function TrendingChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [chartData, setChartData] = useState<ChartData<'line'> | null>(null);
  const [statistics, setStatistics] = useState<PriceStatistics | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDark ? '#fff' : '#000',
        bodyColor: isDark ? '#fff' : '#000',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            // Ensure value is a number before using toFixed
            return `$${typeof value === 'number' ? value.toFixed(2) : value}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: timeRange === '24h' ? 8 : 6,
        },
      },
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
          callback: (value) => {
            // Ensure value is a number before using toFixed
            return `$${typeof value === 'number' ? value.toFixed(2) : value}`;
          },
        },
        beginAtZero: false,
      },
    },
  };

  useEffect(() => {
    const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const data = generateMockData(days);
    const stats = calculateStatistics(data);
    setStatistics(stats);

    setChartData({
      labels: data.map(d => formatDate(d.date, timeRange)),
      datasets: [
        {
          label: 'Price',
          data: data.map(d => d.price),
          borderColor: stats.priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            if (stats.priceChange >= 0) {
              gradient.addColorStop(0, 'rgba(34, 197, 94, 0.4)');
              gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
            } else {
              gradient.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
              gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
            }
            return gradient;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointBackgroundColor: stats.priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
          pointHoverBackgroundColor: stats.priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
          pointBorderColor: '#fff',
          pointHoverBorderColor: '#fff',
        },
      ],
    });
  }, [timeRange, theme]);

  return (
    <div className="space-y-4">
      {/* Time range selector */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-md shadow-sm">
          {(['24h', '7d', '30d', '90d'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm ${
                timeRange === range
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-accent text-muted-foreground'
              } ${
                range === '24h'
                  ? 'rounded-l-md'
                  : range === '90d'
                  ? 'rounded-r-md'
                  : ''
              } transition-colors`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Statistics Display */}
      {statistics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Current</p>
            <p className="text-lg font-medium">${statistics.currentPrice.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Change</p>
            <p className={`text-lg font-medium ${
              statistics.priceChange >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {statistics.priceChange >= 0 ? '+' : ''}
              {statistics.priceChangePercentage.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">High</p>
            <p className="text-lg font-medium">${statistics.highPrice.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Low</p>
            <p className="text-lg font-medium">${statistics.lowPrice.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-64">
        {chartData ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="flex items-center justify-center h-full">Loading chart...</div>
        )}
      </div>
    </div>
  );
}