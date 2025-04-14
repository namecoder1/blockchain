import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // CoinMarketCap API endpoint for BTC price
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
    const params = new URLSearchParams({
      'symbol': 'BTC',
      'convert': 'USD'
    });

    const response = await fetch(`${url}?${params}`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || '',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const btcPrice = data.data.BTC.quote.USD.price;

    return NextResponse.json({ 
      price: btcPrice,
      currency: 'USD',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching BTC price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch BTC price' },
      { status: 500 }
    );
  }
}
