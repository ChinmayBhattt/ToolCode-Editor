import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Terminal from './components/Terminal';
import StatusBar from './components/StatusBar';
import CommandPalette from './components/CommandPalette';

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle sidebar (Ctrl/Cmd + B)
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarVisible(prev => !prev);
      }
      
      // Toggle terminal (Ctrl/Cmd + `)
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setIsTerminalVisible(prev => !prev);
      }
      
      // Show command palette (Ctrl/Cmd + Shift + P)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommand = (commandId: string) => {
    switch (commandId) {
      case 'toggle-sidebar':
        setIsSidebarVisible(prev => !prev);
        break;
      case 'toggle-terminal':
        setIsTerminalVisible(prev => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-vscode-bg text-white">
      <div className="flex flex-1 overflow-hidden">
        {isSidebarVisible && <Sidebar />}
        <div className="flex flex-col flex-1">
          <Editor />
          {isTerminalVisible && <Terminal />}
        </div>
      </div>
      <StatusBar />
      {showCommandPalette && (
        <CommandPalette 
          onClose={() => setShowCommandPalette(false)}
          onCommand={handleCommand}
        />
      )}
    </div>
  );
}

export default App; 