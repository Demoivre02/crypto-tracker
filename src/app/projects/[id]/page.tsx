'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CryptoProject } from '@/types';
import { mockProjects } from '@/data/mockprojects';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { ArrowLeftIcon, GlobeAltIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<CryptoProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching the project data
    const fetchProject = () => {
      setLoading(true);
      // Find the project in our mock data
      const projectId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
      const foundProject = mockProjects.find((p) => p.id === projectId);
      
      if (foundProject) {
        setProject(foundProject);
      }
      
      setLoading(false);
    };

    fetchProject();
  }, [params.id]);

  const formatLaunchDate = (date: string | undefined) => {
    if (!date) return 'TBA';
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
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
    if (change === undefined) return 'N/A';
    const isPositive = change >= 0;
    return (
      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </span>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 animate-pulse">
        {/* Navigation placeholder */}
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
        
        {/* Header placeholder */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 md:mt-0"></div>
        </div>
        
        {/* Project Overview placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Funding Information placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p>The project you're looking for doesn't exist or has been removed.</p>
        <Link href="/projects" className="text-blue-500 hover:underline mt-4 inline-block">
          <ArrowLeftIcon className="h-4 w-4 inline mr-1" />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link 
          href="/projects" 
          className="text-blue-500 hover:text-blue-700 inline-flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Projects
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            {project.name} {project.symbol && `(${project.symbol})`}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">{project.category}</p>
        </div>

        <div
          className={`px-3 py-1 text-sm rounded-full mt-2 md:mt-0 ${
            project.status === 'live'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : project.status === 'upcoming'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
          }`}
        >
          {project.status}
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{project.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Blockchain</h3>
            <p className="text-gray-900 dark:text-white">{project.blockchain || 'Multiple/TBA'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Launch Date</h3>
            <p className="text-gray-900 dark:text-white">{formatLaunchDate(project.launchDate)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Round</h3>
            <p className="text-gray-900 dark:text-white">{project.round}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</h3>
            {project.socialLinks?.website ? (
              <a 
                href={project.socialLinks.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center"
              >
                <GlobeAltIcon className="h-4 w-4 mr-1" />
                Visit
              </a>
            ) : (
              <p className="text-gray-900 dark:text-white">N/A</p>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className={`px-3 py-1 text-sm rounded-full ${
                  tag === 'NEW' || tag === 'VERY HIGH'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Funding Information */}
      {(project.totalRaised !== undefined || project.preValuation !== undefined || project.investorCount !== undefined) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Funding Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {project.totalRaised !== undefined && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Raised</h3>
                <p className="text-xl font-semibold">{formatCurrency(project.totalRaised)}</p>
              </div>
            )}
            {project.preValuation !== undefined && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pre-Valuation</h3>
                <p className="text-xl font-semibold">{formatCurrency(project.preValuation)}</p>
              </div>
            )}
            {project.investorCount !== undefined && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Investor Count</h3>
                <p className="text-xl font-semibold">{formatInvestorCount(project.investorCount)}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Market Data */}
      {(project.marketCap || project.price) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Market Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.price && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Price</h3>
                <p className="text-xl font-semibold">{formatPrice(project.price)}</p>
              </div>
            )}
            {project.priceChange24h !== undefined && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">24h Change</h3>
                <p className="text-xl font-semibold">{formatPriceChange(project.priceChange24h)}</p>
              </div>
            )}
            {project.marketCap && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Cap</h3>
                <p className="text-xl font-semibold">{formatCurrency(project.marketCap)}</p>
              </div>
            )}
            {project.volume24h && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">24h Volume</h3>
                <p className="text-xl font-semibold">{formatCurrency(project.volume24h)}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Social Links */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Social Links</h2>
        <div className="flex flex-wrap gap-4">
          {project.socialLinks?.website && (
            <a 
              href={project.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <GlobeAltIcon className="h-5 w-5 mr-2" />
              Website
            </a>
          )}
          {project.socialLinks?.telegram && (
            <a 
              href={project.socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
              Telegram
            </a>
          )}
          {project.socialLinks?.twitter && (
            <a 
              href={project.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </a>
          )}
          {project.socialLinks?.discord && (
            <a 
              href={project.socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
              </svg>
              Discord
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
