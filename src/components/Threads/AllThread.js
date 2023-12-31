import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, onSnapshot } from '../../lib/firebase';
import { Link } from 'react-router-dom';

const AllThread = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const threadsCollection = collection(db, 'threads');
        const threadsSnapshot = await getDocs(threadsCollection);
        const sortedThreads = threadsSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
        setThreads(sortedThreads);
      } catch (error) {
        console.error('スレッドの取得中にエラーが発生しました:', error);
      }
    };

    fetchThreads();

    const unsubscribe = onSnapshot(collection(db, 'threads'), (snapshot) => {
      const sortedThreads = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
      setThreads(sortedThreads);
    });

    return () => unsubscribe();
  }, []);

  if (threads.length === 0) {
    return <p>利用可能なスレッドはありません。</p>;
  }

  return (
    <div>
      <h2 className='mb-[20px]'>全てのスレッド</h2>
      <ul>
        {threads.map(thread => (
          <li key={thread.id} className='mb-[20px]'>
            <Link to={`/${thread.id}`}>
              <h3 className='text-[20px] font-medium'>{thread.title}</h3>
              <p className="line-clamp-2 md:line-clamp-none">{thread.description}</p>
              <p>投稿日時:({thread.createdAt?.toDate().toLocaleString()})</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllThread;