import React, { useState } from 'react';

function ListEnergy() {
  const [energyId, setEnergyId] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/listenergy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ energyId }),
      });
      if (!res.ok) throw new Error('Error fetching energy details');
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setResponse({ success: false, message: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">List Energy</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={energyId}
            onChange={(e) => setEnergyId(e.target.value)}
            placeholder="Energy ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        {response && (
          <p className={`mt-4 text-center ${response.success ? 'text-green-500' : 'text-red-500'}`}>
            {response.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ListEnergy;