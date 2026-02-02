// app/components/StocksTable.tsx
'use client'

import { useState, useEffect } from 'react'

type SortField = 'ticker' | 'name' | 'price' | 'changePercent' | 'volume' | 'pe' | 'marketCap' | 'dividendYield'
type SortDirection = 'asc' | 'desc'

interface Stock {
  ticker: string
  name: string
  price: number
  change: number
  changePercent: number
  currency: string
  pe: number | null
  marketCap: number
  dividendYield: number | null
  volume: number
  isPEA: boolean
}

export default function StocksTable() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const [sortField, setSortField] = useState<SortField>('changePercent')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchStocks() {
      try {
        setLoading(true)
        const response = await fetch('/api/stocks')
        
        if (!response.ok) {
          throw new Error('Erreur de chargement')
        }
        
        const data = await response.json()
        setStocks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchStocks()
    const interval = setInterval(fetchStocks, 12000000) // Rafraîchir toutes les 200 minutes (limite API)
    return () => clearInterval(interval)
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const filteredAndSortedStocks = stocks
    .filter(stock => {
      if (filter === 'pea' && !stock.isPEA) return false
      if (filter === 'world' && stock.isPEA) return false
      
      if (searchTerm) {
        const search = searchTerm.toLowerCase()
        return (
          stock.ticker.toLowerCase().includes(search) ||
          stock.name.toLowerCase().includes(search)
        )
      }
      
      return true
    })
    .sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]
      
      // Gérer les valeurs null (les mettre à la fin)
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <span className="text-gray-400">⇅</span>
    }
    return sortDirection === 'asc' ? <span>↑</span> : <span>↓</span>
  }

  // Fonction pour formater les grands nombres
  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
    return value.toLocaleString()
  }

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2">Chargement des données boursières...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Erreur: {error}
      </div>
    )
  }

  return (
    <div className="p-6">
      
      {/* Barre de recherche et filtres */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou ticker..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`bourse px-4 py-2 rounded-lg font-medium hover:cursor-pointer ${
              filter === 'all' 
                ? 'bg-blue-600 ' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Tous ({stocks.length})
          </button>
          <button
            onClick={() => setFilter('pea')}
            className={`bourse px-4 py-2 rounded-lg font-medium hover:cursor-pointer ${
              filter === 'pea' 
                ? 'bg-green-600 ' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            PEA ({stocks.filter(s => s.isPEA).length})
          </button>
          <button
            onClick={() => setFilter('world')}
            className={`bourse px-4 py-2 rounded-lg font-medium hover:cursor-pointer ${
              filter === 'world' 
                ? 'bg-purple-600 ' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            International ({stocks.filter(s => !s.isPEA).length})
          </button>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        {filteredAndSortedStocks.length} résultat(s)
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th 
                onClick={() => handleSort('ticker')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-200"
              >
                <div className="flex items-center gap-2">
                  Ticker <SortIcon field="ticker" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('name')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-200"
              >
                <div className="flex items-center gap-2">
                  Nom <SortIcon field="name" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('price')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-200"
              >
                <div className="flex items-center justify-end gap-2">
                  Prix <SortIcon field="price" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('changePercent')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-200"
              >
                <div className="flex items-center justify-end gap-2">
                  Variation <SortIcon field="changePercent" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('pe')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-200"
              >
                <div className="flex items-center justify-end gap-2">
                  P/E <SortIcon field="pe" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('marketCap')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-200"
              >
                <div className="flex items-center justify-end gap-2">
                  Cap. Bours. <SortIcon field="marketCap" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('dividendYield')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-200"
              >
                <div className="flex items-center justify-end gap-2">
                  Div. Yield <SortIcon field="dividendYield" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('volume')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-200"
              >
                <div className="flex items-center justify-end gap-2">
                  Volume <SortIcon field="volume" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedStocks.map((stock) => (
              <tr key={stock.ticker} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-gray-900">
                      {stock.ticker}
                    </span>
                    {stock.isPEA && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                        PEA
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {stock.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="font-semibold text-gray-900">
                    {stock.price.toFixed(2)} {stock.currency}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex flex-col items-end">
                    <span className={`font-semibold ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? '+' : ''}
                      {stock.change.toFixed(2)} {stock.currency}
                    </span>
                    <span className={`text-sm ${
                      stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ({stock.changePercent >= 0 ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="font-medium text-gray-900">
                    {stock.pe != null ? stock.pe.toFixed(2) : 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                  {formatMarketCap(stock.marketCap)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                  {stock.dividendYield != null 
                    ? (stock.dividendYield * 100).toFixed(2) + '%' 
                    : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                  {stock.volume.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedStocks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun résultat trouvé
        </div>
      )}
    </div>
  )
}