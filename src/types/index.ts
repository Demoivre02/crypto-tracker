export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  price_change_24h: number;
  market_cap: number;
  volume_24h: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  launch_date: string;
  category: string;
  blockchain: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  status: 'upcoming' | 'live' | 'ended';
}

export interface CryptoProject {
  id: string;
  name: string;
  symbol: string | undefined;
  description: string;
  totalRaised: number | undefined;
  preValuation: number | undefined;
  round: string;
  launchDate: string | any;
  status: 'upcoming' | 'live' | 'ended';
  category: string;
  blockchain: string | undefined;
  marketCap?: number;
  price?: number;
  priceChange24h?: number;
  volume24h?: number;
  investorCount: number | undefined;
  socialLinks: {
    website?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
  tags: string[];
}

export interface ProjectListProps {
  projects: CryptoProject[];
  category?: string;
  status?: 'upcoming' | 'live' | 'ended';
}

export interface WalletInfo {
  address: string;
  chainId: number;
  connected: boolean;
}

