import React, { useRef, useEffect } from 'react';
import { MessageItem } from './MessageItem';
import { Message, EncryptionStatus } from '../types';

interface MessageListProps {
  messages: Message[];
  encryptionStatus: EncryptionStatus;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  encryptionStatus
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto px-4 py-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
          <p className="text-lg">No messages yet</p>
          <p className="text-sm">Start the conversation by sending a message</p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              encryptionStatus={encryptionStatus}
            />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default MessageList;