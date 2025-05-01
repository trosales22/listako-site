import { FC, ReactNode } from 'react';

interface TableProps {
  headers: string[];
  headerColor?: string;
  borderColor?: string;
  headerTextColor?: string;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  rounded?: boolean;
}

const Table: FC<TableProps> = ({
  headers,
  headerColor = '',
  borderColor = 'border-base-content/5',
  headerTextColor = 'text-white',
  children,
  className = '',
  bordered = false,
  rounded = false,
}) => {
  return (
    <div
      className={`${bordered ? `border ${borderColor}` : ''} ${
        rounded ? 'rounded-t-xl' : ''
      } bg-base-100 ${className}`}
    >
      <div className="overflow-x-auto">
        <table className={`table w-full ${rounded ? 'rounded-t-xl' : ''}`}>
          <thead className={`${headerColor} ${rounded ? 'rounded-t-xl' : ''} ${headerTextColor}`}>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
