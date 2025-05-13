"use client";

interface NoteItemProps {
  id: number;
  label: string;
  checked: boolean;
  onToggle: (id: number) => void;
}

export const NoteItem = ({ id, label, checked, onToggle }: NoteItemProps) => {
  return (
    <label className="flex items-center gap-3 sm:gap-3 cursor-pointer group w-full">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={() => onToggle(id)}
        className="sr-only"
      />
      
      <div className={`
        w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 
        border-2 rounded-md flex items-center justify-center 
        transition-colors duration-200
        ${checked 
          ? 'bg-violet-500 border-violet-500' 
          : 'bg-white border-violet-500 group-hover:border-violet-300'
        }`}
      >
        {checked && (
          <svg 
            viewBox="0 0 14 14" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white w-3 h-3 sm:w-4 sm:h-4"  
          >
            <path 
              d="M2 7L5.5 11L12 3" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="square"  
              strokeLinejoin="miter" 
            />
          </svg>
        )}
      </div>
      
      <span className={`
        text-sm sm:text-base md:text-lg
        ${checked ? 'line-through text-gray-400' : 'text-violet-500'}
        break-words max-w-[calc(100%-3rem)] 
      `}>
        {label}
      </span>
    </label>
  );
};