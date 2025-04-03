import { useState, useEffect, useRef } from 'react';

interface Command {
  id: string;
  title: string;
  action?: () => void;
}

interface CommandPaletteProps {
  onClose: () => void;
  onCommand: (commandId: string) => void;
}

const CommandPalette = ({ onClose, onCommand }: CommandPaletteProps) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      id: 'new-file',
      title: 'New File',
    },
    {
      id: 'open-file',
      title: 'Open File',
    },
    {
      id: 'save-file',
      title: 'Save File',
    },
    {
      id: 'toggle-terminal',
      title: 'Toggle Terminal',
    },
    {
      id: 'toggle-sidebar',
      title: 'Toggle Sidebar',
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        const command = filteredCommands[selectedIndex];
        if (command.action) {
          command.action();
        } else {
          onCommand(command.id);
        }
        onClose();
      }
    }
  };

  const handleCommandClick = (command: Command) => {
    if (command.action) {
      command.action();
    } else {
      onCommand(command.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20">
      <div className="w-1/2 bg-[#252526] rounded-lg shadow-lg">
        <div className="p-4">
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-[#3c3c3c] text-white px-4 py-2 rounded focus:outline-none"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.map((cmd, index) => (
            <div
              key={cmd.id}
              className={`px-4 py-2 cursor-pointer ${
                index === selectedIndex ? 'bg-[#3c3c3c]' : 'hover:bg-[#2d2d2d]'
              }`}
              onClick={() => handleCommandClick(cmd)}
            >
              {cmd.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette; 