import React, { useContext, useState } from 'react'
import { GiHamburgerMenu, GiBackwardTime } from "react-icons/gi"
import { FaPlus } from "react-icons/fa6"
import { motion } from "framer-motion";
import { LuBotMessageSquare } from "react-icons/lu";

import { BsQuestionSquareFill } from "react-icons/bs"
import { IoSettings } from "react-icons/io5"
import { Context } from '../context/Context'

const Sidebar = () => {
    const [extend, setExtend] = useState(false)
    const { Sent, prevPrompt, setRecPrompt, newChat } = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecPrompt(prompt)
        await Sent(prompt)
    }

    return (
        <div className={`
  bg-gray-100 min-h-screen p-2 flex flex-col justify-between shadow transition-all duration-300
  ${extend ? 'w-42 sm:w-30 md:w-44 lg:w-52' : 'w-14 sm:w-10 md:w-12 lg:w-15'}
`}>


            <div>

                <div
                    onClick={() => setExtend(!extend)}
                    className='p-2 hover:bg-gray-200 rounded-full cursor-pointer mb-4 flex items-center justify-center'
                >
                    <GiHamburgerMenu className='w-6 h-6 text-gray-700  left-2 top-2' />
                </div>

                <div className='w-full p-1 flex items-center space-x-3 hover:bg-gray-400 hover:rounded-full cursor-pointer mb-3' onClick={newChat}>
                    <FaPlus className='w-8 h-8 text-gray-600 rounded-full bg-gray-200 p-2' />
                    {extend && <p className='text-gray-700 font-medium truncate'>New Chat</p>}
                </div>

                {extend && (
                    <div className='p-2'>
                        <p className='text-gray-900 text-sm mb-3'>Recent</p>
                        {prevPrompt.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 1 }}
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className='rounded-full p-2 flex items-center space-x-2 hover:bg-gray-200 cursor-pointer'
                                onClick={() => loadPrompt(item)}
                            >
                                <LuBotMessageSquare className='w-6 h-6 min-w-[24px] min-h-[24px] text-gray-700' />
                                <p className='text-gray-700 text-sm truncate'>{item}...</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <div className='space-y-2 pb-4 '>
                <div className='p-1 flex items-center rounded-full space-x-2 hover:bg-gray-200 cursor-pointer'>
                    <BsQuestionSquareFill className='w-5 h-5 text-gray-800' />
                    {extend && <p className='text-gray-700 truncate'>Help</p>}
                </div>
                <div className='p-1 flex items-center rounded-full space-x-2 hover:bg-gray-200 cursor-pointer'>
                    <GiBackwardTime className='w-5 h-5 text-gray-800' />
                    {extend && <p className='text-gray-700 truncate'>Activity</p>}
                </div>
                <div className='p-1 flex items-center rounded-full space-x-2 hover:bg-gray-200 cursor-pointer'>
                    <IoSettings className='w-5 h-5 text-gray-800' />
                    {extend && <p className='text-gray-700 truncate'>Settings</p>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
