import React, { useState, useRef } from 'react';
import { SendHorizontal, PaperclipIcon, Trash2 } from 'lucide-react';
import { encryptMessage, encryptFile } from '../utils/encryption';

interface MessageInputProps {
  roomId: string;
  publicKey: string;
  onSendMessage: (roomId: string, content: string, type: string, file?: File) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  roomId,
  publicKey,
  onSendMessage,
}) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if ((!message && !selectedFile) || !publicKey) return;

    if (selectedFile) {
      try {
        const fileType = selectedFile.type.startsWith('image/') ? 'image' : 'file';

        // Encrypt file content
        const encryptedFileContent = await encryptFile(selectedFile, publicKey);

        // Send the message with the encrypted file
        onSendMessage(roomId, encryptedFileContent, fileType, selectedFile);

        // Clear the file input
        setSelectedFile(null);
        setFilePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error processing file:', error);
      }
    }

    if (message) {
      // Encrypt text message
      const encryptedMessage = encryptMessage(message, publicKey);
      onSendMessage(roomId, encryptedMessage, 'text');
      setMessage('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 border-t border-slate-700 bg-slate-900">
      {selectedFile && (
        <div className="mb-3 p-2 bg-slate-800 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            {filePreview ? (
              <div className="w-10 h-10 mr-2 overflow-hidden rounded">
                <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 mr-2 bg-slate-700 rounded flex items-center justify-center">
                <PaperclipIcon size={18} />
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-sm text-slate-200 truncate">{selectedFile.name}</p>
              <p className="text-xs text-slate-400">{Math.round(selectedFile.size / 1024)} KB</p>
            </div>
          </div>
          <button
            type="button"
            className="p-1 text-slate-400 hover:text-error transition-colors"
            onClick={removeSelectedFile}
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="p-2 rounded-full text-slate-400 hover:text-teal-400 hover:bg-slate-800 cursor-pointer transition-colors"
        >
          <PaperclipIcon size={20} />
        </label>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="input flex-grow"
        />

        <button
          type="submit"
          className="p-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={(!message && !selectedFile) || !publicKey}
        >
          <SendHorizontal size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;