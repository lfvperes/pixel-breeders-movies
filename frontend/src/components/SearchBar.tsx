interface Props {
    value: string;
    onChange: (value: string) => void;
  }
  
  export function SearchBar({ value, onChange }: Props) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full px-5 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-yellow-400 transition-colors text-base"
        />
      </div>
    );
  }