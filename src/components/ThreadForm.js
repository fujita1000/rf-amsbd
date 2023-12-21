// src/components/ThreadForm.js
import React, { useState } from 'react';

const ThreadForm = ({ onThreadCreate }) => {
  const [threadText, setThreadText] = useState('');

  const handleThreadTextChange = (e) => {
    setThreadText(e.target.value);
  };

  const handleCreateThread = () => {
    if (threadText.trim() !== '') {
      onThreadCreate(threadText);
      setThreadText('');
    }
  };

  return (
    <div className="mb-4">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Enter your thread here..."
        value={threadText}
        onChange={handleThreadTextChange}
      ></textarea>
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        onClick={handleCreateThread}
      >
        Create Thread
      </button>
    </div>
  );
};

export default ThreadForm;