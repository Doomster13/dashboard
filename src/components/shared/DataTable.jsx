import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function DataTable({ columns, data, compact = false, expandable = false, renderExpanded }) {
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [expandedRows, setExpandedRows] = useState(new Set())

  const handleSort = (colKey) => {
    if (sortColumn === colKey) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(colKey)
      setSortDirection('asc')
    }
  }

  const toggleRow = (index) => {
    setExpandedRows(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const sortedData = sortColumn
    ? [...data].sort((a, b) => {
        const av = a[sortColumn]
        const bv = b[sortColumn]
        const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))
        return sortDirection === 'asc' ? cmp : -cmp
      })
    : data

  const cellPadding = compact ? 'px-3 py-2' : 'px-4 py-3'

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-stone-200">
            {expandable && <th className={`${cellPadding} w-8`}></th>}
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => col.sortable !== false && handleSort(col.key)}
                className={`${cellPadding} text-[11px] font-semibold text-stone-500 uppercase tracking-wider ${
                  col.sortable !== false ? 'cursor-pointer hover:text-stone-700' : ''
                } ${col.align === 'right' ? 'text-right' : ''}`}
                style={col.width ? { width: col.width } : {}}
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  {sortColumn === col.key && (
                    sortDirection === 'asc' ? <ChevronUp size={10} /> : <ChevronDown size={10} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <>
              <tr
                key={i}
                onClick={() => expandable && toggleRow(i)}
                className={`border-b border-stone-100 transition-colors ${
                  expandable ? 'cursor-pointer hover:bg-stone-50' : ''
                } ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}`}
              >
                {expandable && (
                  <td className={cellPadding}>
                    {expandedRows.has(i) ? <ChevronUp size={12} className="text-stone-400" /> : <ChevronDown size={12} className="text-stone-400" />}
                  </td>
                )}
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={`${cellPadding} text-xs text-stone-700 ${col.align === 'right' ? 'text-right' : ''}`}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
              {expandable && expandedRows.has(i) && renderExpanded && (
                <tr key={`exp-${i}`} className="bg-stone-50">
                  <td colSpan={columns.length + 1} className="px-6 py-4">
                    {renderExpanded(row)}
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}
