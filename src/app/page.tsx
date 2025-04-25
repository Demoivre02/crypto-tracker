import { Card, Title, Text } from '@tremor/react';
import ChartWrapper from '@/components/charts/ChartWrapper';

export default function Home() {
  return (
    <div className="space-y-8">
       <ChartWrapper />
      <section className="text-center my-4 py-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Track Crypto Projects & Market Data
        </h1>
        <p className="text-xl pt-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Stay updated with the latest cryptocurrency projects, market trends, and real-time data analysis.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       

        <Card>
          <Title>Trending Projects</Title>
          <Text>Most viewed upcoming launches</Text>
          <div className="mt-4 space-y-4">
            {/* We'll add project list components here later */}
          </div>
        </Card>

        <Card>
          <Title>Latest Updates</Title>
          <Text>Recent cryptocurrency news and updates</Text>
          <div className="mt-4 space-y-4">
            {/* We'll add news feed components here later */}
          </div>
        </Card>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* We'll add featured project cards here later */}
        </div>
      </section>
    </div>
  );
}