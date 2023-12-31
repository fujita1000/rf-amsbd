// src/components/Threads/ThreadForm.js
import React, { useState } from 'react';
import { db, collection, addDoc, serverTimestamp } from '../../lib/firebase';

const ThreadForm = ({ onThreadCreate, onCloseModal }) => {
  const [threadTitle, setThreadTitle] = useState('');
  const [threadDescription, setThreadDescription] = useState('');

  const handleThreadTitleChange = (e) => {
    setThreadTitle(e.target.value);
  };

  const handleThreadDescriptionChange = (e) => {
    setThreadDescription(e.target.value);
  };

  const handleCreateThread = async () => {
    if (threadTitle.trim() !== '') {
      try {
        // 制限を超えていないか確認
        const storedThreadCreationData = JSON.parse(localStorage.getItem('threadCreationData')) || { count: 0, lastCreationTimestamp: null };

        if (storedThreadCreationData.count >= 3 && Date.now() - storedThreadCreationData.lastCreationTimestamp < 3600000) {
          alert('スレッド作成の制限を超えています。');
          return;
        }

        // Firestoreにデータを追加
        const docRef = await addDoc(collection(db, 'threads'), {
          title: threadTitle,
          description: threadDescription,
          createdAt: serverTimestamp(),
        });

        // onThreadCreateが渡された場合は、コールバックを実行
        if (onThreadCreate) {
          onThreadCreate({
            id: docRef.id,
            title: threadTitle,
            description: threadDescription,
            createdAt: serverTimestamp(),
          });
        }

        // スレッド作成データを更新
        const newThreadCreationData = {
          count: storedThreadCreationData.count + 1,
          lastCreationTimestamp: Date.now(),
        };
        localStorage.setItem('threadCreationData', JSON.stringify(newThreadCreationData));

        // 入力フォームをリセット
        setThreadTitle('');
        setThreadDescription('');
        onCloseModal();
      } catch (error) {
        console.error('Error creating thread:', error);
      }
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