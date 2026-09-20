const COLUMN_CLASSES = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export default function EditorialGrid({ children, columns = 4 }) {
  const colsClass = COLUMN_CLASSES[columns] || COLUMN_CLASSES[4];
  return <div className={`grid grid-cols-1 gap-8 ${colsClass}`}>{children}</div>;
}
