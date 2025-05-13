"use client";

interface NoteInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  onCancel: () => void;
}

export const NoteInput = ({ value, onChange, onAdd, onCancel }: NoteInputProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-3 w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введите текст заметки"
        className={`
          w-full px-3 py-2 text-neutral-900
          text-sm sm:text-base
          border border-gray-300 rounded-md
          focus:outline-none focus:ring-1 focus:ring-violet-500
          transition-all duration-200
        `}
        autoFocus
        onKeyDown={(e) => e.key === 'Enter' && onAdd()}
      />
      
      <div className="flex flex-row sm:flex-col md:flex-row gap-2 justify-end sm:justify-start">
        <button
          onClick={onAdd}
          className={`
            px-3 py-2 w-full sm:w-auto
            text-sm sm:text-base
            text-white bg-violet-600 hover:bg-violet-700
            rounded-md transition-colors
            whitespace-nowrap
          `}
        >
          ОК
        </button>
        <button
          onClick={onCancel}
          className={`
            px-3 py-2 w-full sm:w-auto
            text-sm sm:text-base
            text-gray-600 hover:text-gray-800
            rounded-md transition-colors
            whitespace-nowrap
          `}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};