import { useState, useEffect } from 'react';
import { DocumentTextIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const StatusBar = () => {
  const [language, setLanguage] = useState('TypeScript');
  const [encoding, setEncoding] = useState('UTF-8');
  const [lineEnding, setLineEnding] = useState('LF');
  const [lineNumber, setLineNumber] = useState(1);
  const [columnNumber, setColumnNumber] = useState(1);

  return (
    <div className="h-6 bg-[#007acc] text-white text-xs flex items-center px-2 justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <DocumentTextIcon className="w-4 h-4 mr-1" />
          <span>main.tsx</span>
        </div>
        <div className="flex items-center">
          <CodeBracketIcon className="w-4 h-4 mr-1" />
          <span>{language}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span>{encoding}</span>
        <span>{lineEnding}</span>
        <span>Ln {lineNumber}, Col {columnNumber}</span>
      </div>
    </div>
  );
};

export default StatusBar; 