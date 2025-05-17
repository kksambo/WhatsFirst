import React, { useState, useMemo } from 'react';

interface Client {
  id: number;
  name: string;
  startDate: string;
  duration: string;
}

const sampleData: Client[] = [
  { id: 1, name: 'Airi Satou', startDate: '2008/11/28', duration: '40 min' },
  { id: 2, name: 'Angelica Ramos', startDate: '2009/10/09', duration: '30 min' },
  { id: 3, name: 'Ashton Cox', startDate: '2009/01/12', duration: '20 min' },
  { id: 4, name: 'Bradley Greer', startDate: '2012/10/13', duration: '10 min' },
  { id: 5, name: 'Brenden Wagner', startDate: '2011/06/07', duration: '35 min' },
  { id: 6, name: 'Brielle Williamson', startDate: '2012/12/02', duration: '30 min' },
  { id: 7, name: 'Bruno Nash', startDate: '2011/05/03', duration: '30 min' },
  { id: 8, name: 'Caesar Vance', startDate: '2011/12/12', duration: '15 min' },
  { id: 9, name: 'Cedric Kelly', startDate: '2012/03/29', duration: '5 min' },
];

const TablesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Client; direction: 'asc' | 'desc' } | null>(null);

  const filteredData = useMemo(() => {
    let filtered = sampleData.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortConfig) {
      filtered = filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [search, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    return filteredData.slice(startIndex, startIndex + entriesPerPage);
  }, [filteredData, currentPage, entriesPerPage]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handleSort = (key: keyof Client) => {
    setSortConfig((prev) => {
      if (prev?.key === key && prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-blue-600"># BRAND</h1>
        <input
          type="text"
          placeholder="Search for..."
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <main className="mt-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Clients</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div>
                <label htmlFor="entries" className="text-sm text-gray-600 mr-2">
                  Show
                </label>
                <select
                  id="entries"
                  className="border border-gray-300 rounded-md px-2 py-1"
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th
                    className="border border-gray-200 px-4 py-2 cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </th>
                  <th
                    className="border border-gray-200 px-4 py-2 cursor-pointer"
                    onClick={() => handleSort('startDate')}
                  >
                    Start Date
                  </th>
                  <th
                    className="border border-gray-200 px-4 py-2 cursor-pointer"
                    onClick={() => handleSort('duration')}
                  >
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="border border-gray-200 px-4 py-2">{client.name}</td>
                    <td className="border border-gray-200 px-4 py-2">{client.startDate}</td>
                    <td className="border border-gray-200 px-4 py-2">{client.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600">
                Showing {Math.min((currentPage - 1) * entriesPerPage + 1, filteredData.length)} to{' '}
                {Math.min(currentPage * entriesPerPage, filteredData.length)} of {filteredData.length}
              </p>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-gray-200 rounded-md"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  «
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 bg-gray-200 rounded-md"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-6 text-center text-sm text-gray-600">
        Copyright © Brand 2025
      </footer>
    </div>
  );
};

export default TablesPage;