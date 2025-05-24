import React from 'react';
import { FileText, Image, File, Clock } from 'lucide-react';
import { Message, EncryptionStatus } from '../types';
import { decryptMessage } from '../utils/encryption';

interface MessageItemProps {
  message: Message;
  encryptionStatus: EncryptionStatus;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  encryptionStatus
}) => {
  const { content, type, timestamp, file } = message;

  const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const renderContent = () => {
    const displayedContent = encryptionStatus.hasKey && !encryptionStatus.isEncrypted && encryptionStatus.key
      ? decryptMessage(content, encryptionStatus.key)
      : content;

    if (type === 'text') {
      return (
        <p className={encryptionStatus.isEncrypted ? 'encryption-text text-teal-300' : 'text-slate-200'}>
          {displayedContent}
        </p>
      );
    } else if (type === 'image' && file) {
      return encryptionStatus.isEncrypted ? (
        <div className="flex items-center space-x-2 text-slate-300">
          <Image size={18} />
          <span className="encryption-text text-teal-300">{displayedContent}</span>
        </div>
      ) : (
        <div>
          <div className="rounded overflow-hidden mb-2">
            <img src={displayedContent} alt="Shared image" className="max-w-full h-auto" />
          </div>
          <p className="text-sm text-slate-400">{file.name}</p>
        </div>
      );
    } else if (type === 'file' && file) {
      return (
        <div className="flex items-center space-x-2 text-slate-300">
          {encryptionStatus.isEncrypted ? (
            <>
              <File size={18} />
              <span className="encryption-text text-teal-300">{displayedContent}</span>
            </>
          ) : (
            <>
              <FileText size={18} />
              <a
                href={displayedContent}
                download={file.name}
                className="text-teal-400 hover:text-teal-300 underline"
              >
                {file.name} ({Math.round(file.size / 1024)} KB)
              </a>
            </>
          )}
        </div>
      );
    }

    return <p className="encryption-text text-teal-300">{displayedContent}</p>;
  };

  return (
    <div className={`${encryptionStatus.isEncrypted ? '' : 'encryption-animation'} p-3 bg-slate-800 rounded-lg max-w-3xl`}>
      <div className="flex justify-between items-start mb-2">
        <span className="font-medium text-teal-400">User</span>
        <div className="flex items-center text-slate-500 text-xs">
          <Clock size={12} className="mr-1" />
          {formattedTime}
        </div>
      </div>

      <div className="message-content">
        {renderContent()}
      </div>
    </div>
  );
};