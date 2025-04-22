import { FC } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
    value?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange, placeholder = "Search...", className }) => {
    return (
        <div className={`relative w-full ${className}`}>
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
            </span>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-full px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
            />
        </div>
    );
};

export default SearchInput;
