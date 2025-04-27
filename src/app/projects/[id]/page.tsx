'use client';

import { useEffect, useState } from 'react';
import { CryptoProject } from '@/types';
import { 
  ArrowLeftIcon,
  GlobeAltIcon, 
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import dynamic from 'next/dynamic';
import LoadingPage from './loading';
import { mockProjects } from '@/data/mockprojects';

// Dynamically import chart to avoid SSR issues
const Chart = dynamic(() => import('@/components/charts/TrendingChart').then(mod => mod.default || mod), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center">Loading chart...</div>
});

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProjectDetailsPage({ params }: PageProps) {
  const [project, setProject] = useState<CryptoProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageId, setPageId] = useState<string | null>(null);

  useEffect(() => {
    // Resolve the Promise to get the id
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setPageId(resolvedParams.id);
      } catch (error) {
        console.error('Error resolving params:', error);
      }
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    // Only fetch project when pageId is available
    if (!pageId) return;

    // Simulate API call
    const fetchProject = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const foundProject = mockProjects.find(p => p.id === pageId);
        setProject(foundProject ?? null);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [pageId]);

  if (!pageId || loading) {
    return <LoadingPage />;
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Project not found</p>
        <Link href="/projects" className="text-primary hover:underline mt-4 inline-block">
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/projects"
          className="p-2 rounded-lg hover:bg-accent"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
        <span className="text-xl text-muted-foreground">{project.symbol}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Project Overview Section */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="mt-1">{project.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="mt-1 font-medium">{project.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blockchain</p>
                  <p className="mt-1 font-medium">{project.blockchain}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs capitalize inline-block mt-1
                    ${project.status === 'upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    project.status === 'live' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}>
                    {project.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Launch Date</p>
                  <p className="mt-1 font-medium">
                    {new Date(project.launchDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Market Data Section */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-4">Market Data</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="mt-1 font-medium">
                  {project.price 
                    ? new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(project.price)
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">24h Change</p>
                <p className={`mt-1 font-medium ${
                  project.priceChange24h 
                    ? (project.priceChange24h > 0 ? 'text-green-500' : 'text-red-500')
                    : ''
                }`}>
                  {project.priceChange24h 
                    ? `${project.priceChange24h > 0 ? '+' : ''}${project.priceChange24h}%`
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="mt-1 font-medium">
                  {project.marketCap
                    ? new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'compact'
                      }).format(project.marketCap)
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">24h Volume</p>
                <p className="mt-1 font-medium">
                  {project.volume24h
                    ? new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'compact'
                      }).format(project.volume24h)
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-4">Social Links</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(project.socialLinks).map(([platform, url]) => {
                if (!url) return null;
                
                let icon;
                switch (platform) {
                  case 'website':
                    icon = <GlobeAltIcon className="h-5 w-5" />;
                    break;
                  case 'telegram':
                    icon = <ChatBubbleLeftIcon className="h-5 w-5" />;
                    break;
                  default:
                    icon = <GlobeAltIcon className="h-5 w-5" />;
                }

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    {icon}
                    <span className="capitalize">{platform}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Price Chart Section */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
            <div className="h-[400px]">
              <ErrorBoundary>
                <Chart />
              </ErrorBoundary>
            </div>
          </div>

          {/* Project Tags Section */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-semibold mb-4">Project Tags</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-accent text-accent-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}