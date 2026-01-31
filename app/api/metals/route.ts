// app/api/metals/route.js
import { NextResponse } from 'next/server';

export async function GET() {
    // Méthode 2: Fallback vers GoldPrice.org Data API
    try { 
      console.log('Tentative GoldPrice.org...');
      const response = await fetch('https://data-asg.goldprice.org/dbXRates/USD', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        cache: 'no-store'
      });
      
      if (!response.ok) throw new Error('GoldPrice.org non disponible');
      
      const data = await response.json();
      
      // Les prix sont en format inversé (USD par once)
      const goldPrice =  data.items[0].xauPrice;
      const silverPrice =  data.items[0].xagPrice;

      if (!goldPrice || !silverPrice || isNaN(goldPrice) || isNaN(silverPrice)) {
        throw new Error('Prix invalides');
      }

      console.log('✅ GoldPrice.org réussi');
      console.log('Prix de l\'or:', goldPrice, 'Prix de l\'argent:', silverPrice);
      return NextResponse.json({
        gold: { 
          price: goldPrice,
          source: 'GoldPrice.org'
        },
        silver: { 
          price: silverPrice,
          source: 'GoldPrice.org'
        },
        success: true,
        timestamp: data.items[0].timestamp || new Date().toISOString()
      });
    } catch (error2) {
      console.error('❌ GoldPrice.org échoué:', error2.message);
      
      // Méthode 3: Fallback vers Alpha Vantage (avec clé API)
      try {
        console.log('Tentative Alpha Vantage...');
        const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
        
        if (!API_KEY) {
          throw new Error('Clé API Alpha Vantage manquante');
        }
        
        // Récupérer l'or
        const goldResponse = await fetch(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=XAU&to_currency=USD&apikey=${API_KEY}`,
          { cache: 'no-store' }
        );
        const goldData = await goldResponse.json();
        
        if (goldData['Error Message'] || goldData['Note']) {
          throw new Error('Limite API Alpha Vantage atteinte');
        }
        
        // Pause pour éviter la limite de 5 req/min
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Récupérer l'argent
        const silverResponse = await fetch(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=XAG&to_currency=USD&apikey=${API_KEY}`,
          { cache: 'no-store' }
        );
        const silverData = await silverResponse.json();
        
        if (silverData['Error Message'] || silverData['Note']) {
          throw new Error('Limite API Alpha Vantage atteinte');
        }
        
        const goldPrice = parseFloat(goldData['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        const silverPrice = parseFloat(silverData['Realtime Currency Exchange Rate']['5. Exchange Rate']);

        if (!goldPrice || !silverPrice || isNaN(goldPrice) || isNaN(silverPrice)) {
          throw new Error('Prix invalides');
        }

        console.log('✅ Alpha Vantage réussi');
        return NextResponse.json({
          gold: { 
            price: goldPrice,
            source: 'Alpha Vantage',
            lastRefreshed: goldData['Realtime Currency Exchange Rate']['6. Last Refreshed']
          },
          silver: { 
            price: silverPrice,
            source: 'Alpha Vantage',
            lastRefreshed: silverData['Realtime Currency Exchange Rate']['6. Last Refreshed']
          },
          success: true,
          timestamp: new Date().toISOString()
        });
      } catch (error3) {
        console.error('❌ Alpha Vantage échoué:', error3.message);
        
        // Toutes les méthodes ont échoué
        return NextResponse.json(
          { 
            error: 'Toutes les sources de données ont échoué',
            details: {
              goldprice: error2.message,
              alphavantage: error3.message
            }
          },
          { status: 500 }
        );
      }
    }
  }
