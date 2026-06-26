/**
 * FilterBar component
 * Tabs for All / Active / Completed with live counts
 *
 * @param {string}   filter        - Current active filter
 * @param {Function} onFilterChange - Callback when tab changes
 * @param {number}   totalCount    - Total task count
 * @param {number}   activeCount   - Incomplete task count
 * @param {number}   completedCount - Completed task count
 */
function FilterBar({ filter, onFilterChange, totalCount, activeCount, completedCount }) {
  const tabs = [
    { key: 'all',       label: 'All',       count: totalCount     },
    { key: 'active',    label: 'Active',    count: activeCount    },
    { key: 'completed', label: 'Completed', count: completedCount },
  ]

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
      {tabs.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`
            flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            ${filter === key
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }
          `}
          aria-pressed={filter === key}
        >
          {label}
          <span
            className={`
              inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium
              transition-colors duration-200
              ${filter === key
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-200 text-gray-500'
              }
            `}
          >
            {count}
          </span>
        </button>
      ))}
    </div>
  )
}

export default FilterBar