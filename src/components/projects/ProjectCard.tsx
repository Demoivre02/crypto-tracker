'use client';

import { CryptoProject } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { GlobeAltIcon, ChatBubbleLeftIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ProjectCardProps {
  project: CryptoProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const {
    id,
    name,
    symbol,
    description,
    status,
    category,
    blockchain,
    marketCap,
    price,
    priceChange24h,
    volume24h,
    launchDate,
    round,
    totalRaised,
    preValuation,
    investorCount,
    tags,
    socialLinks
  } = project;

  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  };
  
  const formatLaunchDate = () => {
    if (!launchDate) return 'TBA';
    const date = new Date(launchDate);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return 'N/A';
    
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  const formatInvestorCount = (count: number | undefined) => {
    if (count === undefined) return 'N/A';
    
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatPriceChange = (change?: number) => {
    if (change === undefined) return null;
    const isPositive = change >= 0;
    return (
      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
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
          <h3 className="text-lg font-semibold">
            {name} {symbol ? `(${symbol})` : ''}
          </h3>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs capitalize
          ${status === 'upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            status === 'live' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}>
          {status}
        </span>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {description}
      </p>

      {/* Project Details */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-4">
        <div>
          <span className="text-gray-500 dark:text-gray-400">Chain:</span> {blockchain || 'N/A'}
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">Launch:</span> {formatLaunchDate()}
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">Round:</span> {round}
        </div>
        {investorCount !== undefined && (
          <div>
            <span className="text-gray-500 dark:text-gray-400">Investors:</span> {formatInvestorCount(investorCount)}
          </div>
        )}
      </div>

      {/* Funding Information */}
      {(totalRaised !== undefined || preValuation !== undefined) && (
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
          {totalRaised !== undefined && (
            <div>
              <p className="text-xs text-muted-foreground">Total Raised</p>
              <p className="text-sm font-medium">{formatCurrency(totalRaised)}</p>
            </div>
          )}
          {preValuation !== undefined && (
            <div>
              <p className="text-xs text-muted-foreground">Pre-Valuation</p>
              <p className="text-sm font-medium">{formatCurrency(preValuation)}</p>
            </div>
          )}
        </div>
      )}

      {/* Market Data */}
      {(marketCap || volume24h || price) && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {marketCap && (
            <div>
              <p className="text-xs text-muted-foreground">Market Cap</p>
              <p className="text-sm font-medium">{formatMarketCap(marketCap)}</p>
            </div>
          )}
          {volume24h && (
            <div>
              <p className="text-xs text-muted-foreground">24h Volume</p>
              <p className="text-sm font-medium">{formatMarketCap(volume24h)}</p>
            </div>
          )}
          {price && (
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-sm font-medium flex items-center">
                {formatPrice(price)}
                {priceChange24h !== undefined && (
                  <span className="ml-2">
                    {formatPriceChange(priceChange24h)}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className={`px-2 py-0.5 text-xs rounded-full ${
                tag === 'NEW' || tag === 'VERY HIGH'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer with Social Links and View Details */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex space-x-2">
          {socialLinks?.website && (
            <Link
              href={socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent"
            >
              <GlobeAltIcon className="h-5 w-5 text-muted-foreground" />
            </Link>
          )}
          {socialLinks?.telegram && (
            <Link
              href={socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent"
            >
              <ChatBubbleLeftIcon className="h-5 w-5 text-muted-foreground" />
            </Link>
          )}
        </div>
        <Link
          href={`/projects/${id}`}
          className="inline-flex items-center text-sm text-primary hover:text-primary/80"
        >
          <ChartBarIcon className="h-4 w-4 mr-1" />
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
