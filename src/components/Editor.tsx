import { useEffect, useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

const CodeEditor = () => {
  const [editorContent, setEditorContent] = useState<string>('// Welcome to VS Code Clone\n// Start coding here...');
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      lineNumbers: 'on',
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      renderWhitespace: 'selection',
      bracketPairColorization: { enabled: true },
      rulers: [80],
      wordWrap: 'on',
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Save file
      console.log('Saving file...');
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
      // Find
      editor.getAction('actions.find')?.run();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyH, () => {
      // Replace
      editor.getAction('editor.action.startFindReplaceAction')?.run();
    });

    // Add more editor features
    editor.addAction({
      id: 'format-document',
      label: 'Format Document',
      keybindings: [monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF],
      run: () => {
        editor.getAction('editor.action.formatDocument')?.run();
      }
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorContent(value);
    }
  };

  return (
    <div className="flex-1 relative">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue={editorContent}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          automaticLayout: true,
          fontSize: 14,
          lineNumbers: 'on',
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          renderWhitespace: 'selection',
          bracketPairColorization: { enabled: true },
          rulers: [80],
        }}
      />
    </div>
  );
};

export default CodeEditor; 