
'use client';

import { CryptoProject } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { GlobeAltIcon, ChatBubbleLeftIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ProjectCardProps {
  project: CryptoProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  };
  
  const formatPriceChange = (change?: number) => {
    if (change === undefined) return 'N/A';
    const isPositive = change >= 0;
    return (
      <span className={`${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </span>
    );
  };

  const formatMarketCap = (marketCap?: number) => {
    if (!marketCap) return 'N/A';
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground">{project.symbol}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs capitalize
          ${project.status === 'upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            project.status === 'live' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}>
          {project.status}
        </span>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {project.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Launch Date</p>
          <p className="text-sm font-medium">
            {formatDistanceToNow(new Date(project.launchDate), { addSuffix: true })}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Price</p>
          <p className="text-sm font-medium flex items-center gap-2">
            {formatPrice(project.price)}
            {project.priceChange24h !== undefined && (
              <span className="ml-2">
                {formatPriceChange(project.priceChange24h)}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Market Cap</p>
          <p className="text-sm font-medium">{formatMarketCap(project.marketCap)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">24h Volume</p>
          <p className="text-sm font-medium">{formatMarketCap(project.volume24h)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex space-x-2">
          {project.socialLinks.website && (
            <Link
              href={project.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent"
            >
              <GlobeAltIcon className="h-5 w-5 text-muted-foreground" />
            </Link>
          )}
          {project.socialLinks.telegram && (
            <Link
              href={project.socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent"
            >
              <ChatBubbleLeftIcon className="h-5 w-5 text-muted-foreground" />
            </Link>
          )}
        </div>
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center text-sm text-primary hover:text-primary/80"
        >
          <ChartBarIcon className="h-4 w-4 mr-1" />
          View Details
        </Link>
      </div>
    </div>
  );
}

