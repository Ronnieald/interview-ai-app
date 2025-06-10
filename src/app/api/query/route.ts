import { NextRequest, NextResponse } from 'next/server';
import source1 from '@/data/source1.json';
import source2 from '@/data/source2.json';
import source3 from '@/data/source3.json';

type Technician = {
  name: string;
  rating: number;
  price: string;
  reviewCount: number;
  location: string;
  bookingLink: string;
  neptuneScore?: number;
};

function calculateNeptuneScore(rating: number, reviewCount: number, priceStr: string): number {
  const price = parseInt(priceStr.replace(/[^0-9]/g, '')) || 100;
  return Math.round((rating * 20 + reviewCount * 0.1 - price * 0.5) * 10) / 10;
}

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  // Simulate basic LLM understanding
  const searchTerm = query.toLowerCase();

  const allData: Technician[] = [...source1, ...source2, ...source3];

  // Filter by location and service type
  const filtered = allData.filter(item =>
    searchTerm.includes('dishwasher') &&
    item.location.toLowerCase().includes('san francisco')
  );

  const withScore = filtered.map(item => ({
    ...item,
    neptuneScore: calculateNeptuneScore(item.rating, item.reviewCount, item.price)
  }));

  return NextResponse.json({ results: withScore });
}
