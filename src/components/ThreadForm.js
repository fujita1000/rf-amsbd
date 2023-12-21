// src/components/ThreadForm.js
import React, { useState } from 'react';

const ThreadForm = ({ onThreadCreate }) => {
  const [threadTitle, setThreadTitle] = useState('');
  const [threadDescription, setThreadDescription] = useState('');

  const handleThreadTitleChange = (e) => {
    setThreadTitle(e.target.value);
  };

  const handleThreadDescriptionChange = (e) => {
    setThreadDescription(e.target.value);
  };

  const handleCreateThread = () => {
    if (threadTitle.trim() !== '') {
      onThreadCreate({ title: threadTitle, description: threadDescription });
      setThreadTitle('');
      setThreadDescription('');
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">スレッドタイトル:</label>
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="スレッドタイトルを入力してください"
        value={threadTitle}
        onChange={handleThreadTitleChange}
      />

      <label className="block mb-2 mt-4">スレッドの説明:</label>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="スレッドの説明を作成してください"
        value={threadDescription}
        onChange={handleThreadDescriptionChange}
      ></textarea>

      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        onClick={handleCreateThread}
      >
        スレッドを作成
      </button>
    </div>
  );
};

export default ThreadForm;