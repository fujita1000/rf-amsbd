// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../Threads/Modal';
import { useModal, useSidebar } from '../../lib/logic';

const Header = () => {
  const { ModalOpen, openModal, closeModal } = useModal();
  const { sidebarOpen, openSidebar, closeSidebar } = useSidebar();

  return (
    <>
      <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
        <nav className="mt-6 relative max-w-[85rem] w-full bg-white border border-gray-200 rounded-[36px] mx-2 py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto dark:bg-gray-800 dark:border-gray-700" aria-label="Global">
          <div className="flex items-center justify-between">
            <Link to="/" className='w-[300px]'><div className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="RF-AMSBD">RF-AMSBD</div></Link>
            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle w-8 h-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={sidebarOpen ? closeSidebar : openSidebar}
                aria-label="Toggle navigation"
              >
                <svg className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                <svg className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          </div>
          <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block">
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
              <Link to="/" className="font-medium text-blue-600 md:py-6 dark:text-blue-500" aria-current="page">HOME</Link>
              <div className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500" href="#">
                <button onClick={openModal} className='flex justify-center items-center'>
                  <img src="/images/kizi.svg" alt="スレッド作成ボタン" className="h-[40px] w-[40px] mr-[10px]"/>
                  スレッドを作成
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {sidebarOpen && (
        <>
        <motion.div
        className="sidebar fixed w-[70%] h-screen bg-white top-0 z-[100] shadow-md"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.2 }} // トランジションを線形に変更
        >
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
              <Link to="/" className="font-medium text-blue-600 md:py-6 dark:text-blue-500" aria-current="page">HOME</Link>
              <div className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500" href="#">
                <button onClick={openModal} className='flex justify-center items-center'>
                  <img src="/images/kizi.svg" alt="スレッド作成ボタン" className="h-[40px] w-[40px] mr-[10px]"/>
                  スレッドを作成
                </button>
              </div>
            </div>
            <button onClick={closeSidebar}>
              <div className='absolute top-[10px] right-[10px]'>
              <img src="/images/closebutton.svg" alt="Close" className='w-[40px] h-[40px]' />
              </div>
            </button>
          </motion.div>
          </>
        )}
      </AnimatePresence>
      <Modal ModalOpen={ModalOpen} handleClose={closeModal} />
    </>
  );
};

export default Header;