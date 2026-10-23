import React from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import Button from './Button';

export const Table = ({
  columns = [],
  data = [],
  isLoading = false,
  sortColumn = '',
  sortDirection = 'asc',
  onSort,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  emptyMessage = 'No records found',
  className = '',
}) => {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-700/80">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && onSort && onSort(col.key)}
                  className={`py-3.5 px-4 font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 ${
                    col.sortable ? 'cursor-pointer select-none hover:text-primary-600 dark:hover:text-primary-400' : ''
                  } ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                >
                  <div className={`inline-flex items-center gap-1.5 ${col.align === 'right' ? 'justify-end' : ''}`}>
                    <span>{col.label}</span>
                    {col.sortable && sortColumn === col.key && (
                      sortDirection === 'asc' ? (
                        <ChevronUp className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700/60">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rIdx) => (
                <tr key={rIdx} className="animate-pulse">
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className="py-4 px-4">
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-md w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 px-4 text-center">
                  <div className="flex flex-col items-center justify-center text-neutral-400 dark:text-neutral-500">
                    <Inbox className="w-10 h-10 mb-2 opacity-50" />
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={row.id || row._id || rowIdx}
                  className="hover:bg-neutral-50/70 dark:hover:bg-neutral-750/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`py-3.5 px-4 text-neutral-700 dark:text-neutral-200 ${
                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                      }`}
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-100 dark:border-neutral-700/60 bg-neutral-50/50 dark:bg-neutral-900/30">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Page <span className="font-semibold text-neutral-800 dark:text-neutral-200">{currentPage}</span> of{' '}
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">{totalPages}</span>
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1 || isLoading}
              onClick={() => onPageChange(currentPage - 1)}
              icon={<ChevronLeft className="w-3.5 h-3.5" />}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages || isLoading}
              onClick={() => onPageChange(currentPage + 1)}
              icon={<ChevronRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
