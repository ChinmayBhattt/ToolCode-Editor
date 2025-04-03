import { useState } from 'react';
import { FolderIcon, DocumentIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
}

const Sidebar = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'App.tsx', type: 'file' },
        { name: 'main.tsx', type: 'file' },
        {
          name: 'components',
          type: 'folder',
          children: [
            { name: 'Sidebar.tsx', type: 'file' },
            { name: 'Editor.tsx', type: 'file' },
          ],
        },
      ],
    },
  ]);

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (items: FileItem[], path = '') => {
    return items.map((item, index) => {
      const currentPath = path ? `${path}/${item.name}` : item.name;
      const isExpanded = expandedFolders.has(currentPath);

      return (
        <div key={currentPath} className="pl-4">
          <div
            className="flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer"
            onClick={() => item.type === 'folder' && toggleFolder(currentPath)}
          >
            {item.type === 'folder' ? (
              <>
                {isExpanded ? (
                  <ChevronDownIcon className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4 mr-1" />
                )}
                <FolderIcon className="w-4 h-4 mr-1" />
              </>
            ) : (
              <DocumentIcon className="w-4 h-4 mr-1" />
            )}
            <span>{item.name}</span>
          </div>
          {item.type === 'folder' && isExpanded && item.children && (
            <div className="ml-4">{renderFileTree(item.children, currentPath)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-64 bg-[#252526] border-r border-gray-700">
      <div className="p-2 font-medium">EXPLORER</div>
      <div className="mt-2">{renderFileTree(files)}</div>
    </div>
  );
};

export default Sidebar; 