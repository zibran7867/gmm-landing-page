import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Create basic component versions of Material UI components
const Paper = ({ children, className }) => (
  <div className={`bg-white ${className}`}>{children}</div>
);

const TableContainer = ({ children, className }) => (
  <div className={`overflow-x-auto ${className}`}>{children}</div>
);

const Table = ({ children, className }) => (
  <table className={`min-w-full divide-y divide-gray-200 ${className}`}>{children}</table>
);

const TableHead = ({ children }) => <thead>{children}</thead>;

const TableBody = ({ children }) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;

const TableRow = ({ children, className }) => <tr className={className}>{children}</tr>;

const TableCell = ({ children, className }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
);

const Chip = ({ label, className }) => (
  <span className={`inline-flex px-2 py-1 rounded-full text-xs ${className}`}>
    {label}
  </span>
);

const TransactionTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample transaction data
  const rows = [
    { id: 1, date: '25-02-2025', debit: '100 USDT', credit: '-', type: 'SENT' },
    { id: 2, date: '26-02-2025', debit: '40 USDT', credit: '-', type: 'SENT' },
    { id: 3, date: '27-02-2025', debit: '-', credit: '125 USDT', type: 'RECEIVED' },
    { id: 4, date: '28-02-2025', debit: '35 USDT', credit: '-', type: 'SENT' },
    { id: 5, date: '01-03-2025', debit: '-', credit: '48 USDT', type: 'RECEIVED' },
    // Empty rows for demonstration
    { id: 6, date: '-', debit: '-', credit: '-', type: '-' },
    { id: 7, date: '-', debit: '-', credit: '-', type: '-' },
    { id: 8, date: '-', debit: '-', credit: '-', type: '-' },
    { id: 9, date: '-', debit: '-', credit: '-', type: '-' },
    { id: 10, date: '-', debit: '-', credit: '-', type: '-' },
  ];

  // Filter rows based on search term
  const filteredRows = rows.filter(row => 
    row.date.includes(searchTerm) || 
    row.debit.includes(searchTerm) || 
    row.credit.includes(searchTerm) || 
    row.type.includes(searchTerm.toUpperCase())
  );

  const displayedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handleChangePage = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="font-bold text-2xl text-gray-800">
            Transaction History
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Rows per page selector */}
            <div className="min-w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">Show</label>
              <select
                value={rowsPerPage}
                onChange={(e) => handleChangeRowsPerPage(Number(e.target.value))}
                className="h-10 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
            </div>
            
            {/* Search field */}
            <div className="w-full sm:w-64">
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-10 pl-10 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <TableContainer className="mb-4 rounded-md border border-gray-200">
          <Table>
            <TableHead>
              <TableRow className="bg-purple-900">
                <TableCell className="text-white font-bold">Sr. No.</TableCell>
                <TableCell className="text-white font-bold">Date</TableCell>
                <TableCell className="text-white font-bold">Debit</TableCell>
                <TableCell className="text-white font-bold">Credit</TableCell>
                <TableCell className="text-white font-bold">Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRows.map((row) => (
                <TableRow 
                  key={row.id}
                  className={`hover:bg-gray-50 ${row.date === '-' ? 'opacity-50' : ''}`}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell className="text-red-600 font-medium">
                    {row.debit !== '-' ? row.debit : '-'}
                  </TableCell>
                  <TableCell className="text-green-600 font-medium">
                    {row.credit !== '-' ? row.credit : '-'}
                  </TableCell>
                  <TableCell>
                    {row.type !== '-' && (
                      <Chip 
                        label={row.type} 
                        className={`${row.type === 'SENT' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'} text-xs font-medium`}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
              
              {/* Add empty rows if fewer than rowsPerPage */}
              {displayedRows.length < rowsPerPage && 
                Array(rowsPerPage - displayedRows.length).fill().map((_, index) => (
                  <TableRow key={`empty-${index}`} className="opacity-50">
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
              className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${page === 0 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Previous
            </button>
            <button
              onClick={() => handleChangePage(page + 1)}
              disabled={page >= totalPages - 1}
              className={`relative ml-3 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${page >= totalPages - 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{page * rowsPerPage + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min((page + 1) * rowsPerPage, filteredRows.length)}
                </span>{' '}
                of <span className="font-medium">{filteredRows.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => handleChangePage(page - 1)}
                  disabled={page === 0}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${page === 0 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {[...Array(totalPages).keys()].map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handleChangePage(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${pageNum === page ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'}`}
                  >
                    {pageNum + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handleChangePage(page + 1)}
                  disabled={page >= totalPages - 1}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${page >= totalPages - 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;