import React from 'react'

const TableLayout = ({ columns, data, title = "Table"  }) => {
  return (
     <section className='w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 '>
      {/* Header Section */}
      <div className='pb-4  border-gray-200 rounded-xl'>
        <h2 className="text-xl font-bold text-blue-600 mb-3">{title}</h2>

       
      </div>
      <div className="overflow-x-auto rounded-xl mt-4 ">
        <table className="w-full min-w-full table-auto">
          <thead className="bg-gray-50 ">
            <tr className=' ' >
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className="px-4 py-3 text-left font-serif whitespace-nowrap md:min-w-[150px] text-gray-500 font-semibold tracking-wider border-b border-gray-200 "
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y text-yellow-500  divide-gray-200">
            {data && data.length > 0 ? (
              data.map((row, rIndex) => (
                <tr 
                  key={rIndex} 
                  className="hover:bg-gray-50  transition-colors"
                >
                  {columns.map((col, cIndex) => (
                    <td 
                      key={cIndex} 
                      className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                    >
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{data?.length || 0}</span> results
          </div>
          {/* Pagination buttons */}
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
              Previous
            </button>
            <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
            <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TableLayout