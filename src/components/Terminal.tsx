import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';

const TerminalComponent = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      // Initialize terminal
      terminal.current = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        theme: {
          background: '#1e1e1e',
          foreground: '#ffffff',
        },
      });

      // Initialize addons
      fitAddon.current = new FitAddon();
      const webLinksAddon = new WebLinksAddon();

      // Load addons
      terminal.current.loadAddon(fitAddon.current);
      terminal.current.loadAddon(webLinksAddon);

      // Open terminal
      terminal.current.open(terminalRef.current);

      // Fit terminal to container
      fitAddon.current.fit();

      // Handle window resize
      const handleResize = () => {
        fitAddon.current?.fit();
      };
      window.addEventListener('resize', handleResize);

      // Write welcome message
      terminal.current.writeln('Welcome to VS Code Clone Terminal');
      terminal.current.writeln('Type "help" for available commands');

      // Handle input
      terminal.current.onData((data) => {
        terminal.current?.write(data);
      });

      return () => {
        window.removeEventListener('resize', handleResize);
        terminal.current?.dispose();
      };
    }
  }, []);

  return (
    <div className="h-64 bg-[#1e1e1e] border-t border-gray-700">
      <div className="h-full w-full" ref={terminalRef} />
    </div>
  );
};

export default TerminalComponent; 