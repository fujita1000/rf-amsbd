// pages/Thread.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, collection, addDoc, serverTimestamp, onSnapshot, doc } from '../lib/firebase';

const Thread = () => {
  const { threadId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('名無しさん');
  const [threadData, setThreadData] = useState({ title: '', description: '' }); 
  
  // ユーザーデータの初期化
  const initialUserPostData = { count: 0, lastPostTimestamp: null };

  // ローカルストレージからデータを取得
  const storedUserPostData = JSON.parse(localStorage.getItem('userPostData')) || initialUserPostData;

  const [userPostData, setUserPostData] = useState(storedUserPostData);

  // idに基づいて関連付けられたメッセージを取得する
  useEffect(() => {
    const messagesCollection = collection(db, 'threads', threadId, 'messages');

    const unsubscribeMessages = onSnapshot(messagesCollection, (snapshot) => {
      const sortedMessages = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => a.createdAt?.toDate() - b.createdAt?.toDate());

      setMessages(sortedMessages);
    });

    // スレッドのタイトルと説明を取得
    const threadDocRef = doc(db, 'threads', threadId);
    const unsubscribeThread = onSnapshot(threadDocRef, (threadSnapshot) => {
      if (threadSnapshot.exists()) {
        setThreadData(threadSnapshot.data());
      } else {
        // スレッドが存在しない場合の処理
        console.log('Thread not found');
      }
    });

    return () => {
      unsubscribeMessages();
      unsubscribeThread();
    };
  }, [threadId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        // 制限を超えていないか確認
        if (userPostData.count >= 5 && Date.now() - userPostData.lastPostTimestamp < 60000) {
          alert('一分間に５投稿まで可能です。');
          return;
        }

        // Firestoreにメッセージを追加
        const messagesCollection = collection(db, 'threads', threadId, 'messages');
        await addDoc(messagesCollection, {
          text: newMessage,
          createdAt: serverTimestamp(),
          username: username,
        });

        // メッセージを送信したら入力欄をクリア
        setNewMessage('');

        // ユーザーの投稿データを更新
        const newUserPostData = {
          count: userPostData.count + 1,
          lastPostTimestamp: Date.now(),
        };
        setUserPostData(newUserPostData);

        // ローカルストレージにデータを保存
        localStorage.setItem('userPostData', JSON.stringify(newUserPostData));
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <p>Title: {threadData.title}</p>
      <p>Description: {threadData.description}</p> 

      <div>
        {/* メッセージ表示部分 */}
        {messages.map(message => (
          <div key={message.id}>
            <p>{message.username}: {message.text}</p>
            <p>投稿日時: {message.createdAt?.toDate().toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* 名前入力フォーム */}
      <label>
        名前:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      {/* メッセージ入力フォーム */}
      <div>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>メッセージを送信</button>
      </div>
    </div>
  );
};

export default Thread;