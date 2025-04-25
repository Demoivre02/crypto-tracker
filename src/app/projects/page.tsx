
'use client';

import { useState } from 'react';
import { ProjectList } from '@/components/projects/ProjectList';
import { CryptoProject } from '@/types';
import { MagnifyingGlassIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

// Mock data with more projects
export const mockProjects: CryptoProject[] = [
  {
    id: '1',
    name: 'DeFi Protocol Alpha',
    symbol: 'DPA',
    description: 'Next-generation decentralized finance protocol with advanced yield optimization.',
    launchDate: '2024-05-01',
    status: 'upcoming',
    category: 'DeFi',
    blockchain: 'BSC',
    marketCap: undefined,
    price: undefined,
    priceChange24h: undefined,
    volume24h: undefined,
    socialLinks: {
      website: 'https://example.com',
      telegram: 'https://t.me/example',
    },
    tags: ['DeFi', 'Yield', 'BSC'],
  },
  {
    id: '2',
    name: 'NFT Marketplace Beta',
    symbol: 'NFTB',
    description: 'Revolutionary NFT marketplace with cross-chain support and AI-powered recommendations.',
    launchDate: '2024-04-15',
    status: 'live',
    category: 'NFT',
    blockchain: 'BSC',
    marketCap: 5000000,
    price: 2.5,
    priceChange24h: 15.5,
    volume24h: 1000000,
    socialLinks: {
      website: 'https://example.com/nft',
      telegram: 'https://t.me/nft-example',
      discord: 'https://discord.gg/example',
    },
    tags: ['NFT', 'Marketplace', 'BSC'],
  },
  {
    id: '3',
    name: 'GameFi World',
    symbol: 'GFW',
    description: 'Immersive blockchain gaming platform with play-to-earn mechanics.',
    launchDate: '2024-06-01',
    status: 'upcoming',
    category: 'Gaming',
    blockchain: 'BSC',
    marketCap: undefined,
    price: undefined,
    priceChange24h: undefined,
    volume24h: undefined,
    socialLinks: {
      website: 'https://example.com/gamefi',
      telegram: 'https://t.me/gamefi-example',
      discord: 'https://discord.gg/gamefi',
    },
    tags: ['Gaming', 'P2E', 'BSC'],
  },
];

const categories = ['All', 'DeFi', 'NFT', 'Gaming'];
const statuses = ['All', 'upcoming', 'live', 'ended'] as const;

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<typeof statuses[number]>('All');
  
  type SortKey = 'name' | 'launchDate' | 'price' | 'marketCap';
  const [sortKey, setSortKey] = useState<SortKey>('launchDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortKey) {
      case 'name':
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case 'launchDate':
        return sortDirection === 'asc'
          ? new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime()
          : new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime();
      case 'price':
        const priceA = a.price ?? 0;
        const priceB = b.price ?? 0;
        return sortDirection === 'asc' ? priceA - priceB : priceB - priceA;
      case 'marketCap':
        const mcapA = a.marketCap ?? 0;
        const mcapB = b.marketCap ?? 0;
        return sortDirection === 'asc' ? mcapA - mcapB : mcapB - mcapA;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Crypto Projects</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>

          <select
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as typeof statuses[number])}
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
          >
            <option value="launchDate">Launch Date</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="marketCap">Market Cap</option>
          </select>

          <button
            onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-accent flex items-center justify-center"
            aria-label={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
          >
            {sortDirection === 'asc' ? (
              <ArrowUpIcon className="h-5 w-5" />
            ) : (
              <ArrowDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {sortedProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your criteria.</p>
        </div>
      ) : (
        <ProjectList projects={sortedProjects} />
      )}
    </div>
  );
}

