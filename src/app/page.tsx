'use client';

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const res = await fetch('/api/query', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    setResults(data.results);
    setLoading(false);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Find Local Technicians</h1>
      <p className="text-sm text-gray-600 mb-6">
  The <strong>Neptune Score</strong> is a custom ranking based on technician rating, number of reviews, and hourly rate. Higher is better.
</p>

      
      <input
        type="text"
        placeholder="e.g. Best dishwasher repair in SF"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>

      {loading && <p className="mt-4 text-gray-500">Searching...</p>}
      {!loading && results.length === 0 && (
  <p className="mt-4 text-red-500">No results found. Try a different query.</p>
)}


      <div className="mt-6 space-y-4">
        {results.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p>Rating: {item.rating}</p>
            <p>Price: {item.price}</p>
            <p>
              <a href={item.bookingLink} target="_blank" className="text-blue-600 underline">
                Book here
              </a>
            </p>
            <p>
              Neptune Score: <strong>{item.neptuneScore}</strong>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
