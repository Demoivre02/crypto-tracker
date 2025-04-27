'use client';

import dynamic from 'next/dynamic';
import { Card, Title, Text } from '@tremor/react';

// Dynamically import chart components to avoid SSR issues
const TrendingChart = dynamic(() => import('@/components/charts/TrendingChart'), {
  ssr: false
});

export default function ChartWrapper() {
  return (
    <Card>
      <Title>Market Overview</Title>
      <Text>Real-time market data and trends for you</Text>
      <div className="mt-4 h-[200px]">
        <TrendingChart />
      </div>
    </Card>
  );
}