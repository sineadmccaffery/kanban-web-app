type FilterProps = {
  filters: {
    section: string;
    priority: string;
    assignee: string;
  };
  setFilters: (f: any) => void;
  sortBy: string;
  setSortBy: (s: any) => void;
  sortOrder: string;
  setSortOrder: (o: any) => void;
};

export default function FilterBar({
  filters,
  setFilters,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: FilterProps) {
  return (
    <div className="flex flex-wrap gap-4 px-4 py-3 bg-gray-100 rounded-md justify-evenly items-center sticky top-0 z-10">
      <div className="min-w-[150px] bg-gray-100 rounded-md p-2">
        <label className="block text-md font-medium mb-1">Section</label>
        <select
          value={filters.section}
          onChange={(e) => setFilters({ ...filters, section: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="">All</option>
          <option value="To Do">To Do</option>
          <option value="Doing">Doing</option>
          <option value="Review">Review</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="min-w-[150px] bg-gray-100 rounded-md p-2">
        <label className="block text-md font-medium mb-1">Priority</label>
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="min-w-[150px] bg-gray-100 rounded-md p-2">
        <label className="block text-md font-medium mb-1">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="">None</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="min-w-[150px] bg-gray-100 rounded-md p-2">
        <label className="block text-md font-medium mb-1">Order</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}
