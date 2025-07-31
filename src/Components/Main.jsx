import React, { useContext } from 'react';
import { FaCompass, FaLightbulb, FaCode, FaMicrophone } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";
import { GrGallery } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Context } from '../context/Context';
import { RiRobot3Fill } from "react-icons/ri";
import clsx from 'clsx';
import { useRef } from 'react';

const Main = () => {
    const { Sent, recPrompt, showResult, loading, resData, input, setInput } = useContext(Context);
    const fileInputRef = useRef(null);

    const { user } = useUser();

    return (
        <div
            className={clsx(
                "flex-1 flex flex-col justify-between min-h-screen relative max-w-full",
                "px-3 sm:px-6 md:px-8 lg:px-10",
                " mx-25 max-md:mx-2"
            )}
        >
            <nav className='flex items-center justify-between p-4 sm:px-6 lg:px-8  max-w-full'>
                <p className='text-2xl sm:text-3xl mt-4 bg-gradient-to-r from-black via-pink-500 to-purple-600 text-transparent bg-clip-text font-extrabold'>
                    Zeno
                </p>
                <SignedOut>
                    <SignInButton className='bg-red-600 text-white py-1 px-3 rounded-md cursor-pointer font-serif text-base sm:text-lg font-bold' />
                </SignedOut>
                <SignedIn>
                    <div className="scale-110 sm:scale-125">
                        <UserButton />
                    </div>
                </SignedIn>
            </nav>

            <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
                {!showResult ? (
                    <>
                        <div className="my-8 sm:my-10 text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-700 via-red-700 to-purple-600 text-transparent bg-clip-text font-bold text-center sm:text-left w-full">
                            <p>Hello, <span className='bg-gradient-to-r from-pink-400 via-red-500 to-purple-400 text-transparent bg-clip-text'>{user?.firstName || 'there'}!</span></p>
                            <p>How can I help you today?</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-6">
                            {[
                                { Icon: FaCompass, text: 'Suggest beautiful places to see on an upcoming road trip.' },
                                { Icon: FaLightbulb, text: 'Briefly summarize this concept: Urban planning' },
                                { Icon: FiMessageCircle, text: 'Brainstorm team bonding activities for our work retreat' },
                                { Icon: FaCode, text: 'Improve the readability of the following code.' },
                            ].map(({ Icon, text }, i) => (
                                <div key={i} className="h-[150px] p-4 bg-[#f0f4f9] rounded-xl cursor-pointer relative hover:bg-gray-300">
                                    <p className='text-[#585858] text-base sm:text-lg'>{text}</p>
                                    <Icon className='h-8 w-8 p-1.5 absolute bg-white rounded-full bottom-3 right-3' />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className='p-4 max-h-[70vh] overflow-y-auto scrollbar-hide'>
                        <div className="my-4 flex flex-wrap items-center justify-end gap-3 bg-gray-100 rounded p-3">
                            <p className="text-base sm:text-lg font-medium break-words max-w-[80%]">{recPrompt}</p>
                            {user?.imageUrl && (
                                <img
                                    src={user.imageUrl}
                                    alt={user.firstName}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            )}
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-md">
                            <RiRobot3Fill className="text-2xl text-purple-600 w-10 h-10 min-w-[40px] min-h-[40px] rounded-full" />
                            {loading ? (
                                <div className="w-full flex flex-col gap-3">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-3 w-full bg-gradient-to-r from-purple-300 via-gray-100 to-purple-300 rounded"
                                            style={{
                                                animation: 'loader 1.2s linear infinite',
                                                backgroundSize: '800px 50px',
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            ) : (
                                <p
                                    className="text-gray-800 text-[15px] font-mono leading-[1.5]"
                                    dangerouslySetInnerHTML={{ __html: resData }}
                                ></p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Input Section */}
            <div className='sticky bottom-0 left-0 right-0 w-full px-2 sm:px-4 py-4 bg-white z-10'>
                <div className='w-full max-w-5xl mx-auto'>
                    <div className='flex items-center gap-2 sm:gap-4 bg-[#f0f4f9] px-3 sm:px-4 py-2 rounded-full w-full'>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            placeholder='Enter a prompt here'
                            className='flex-1 bg-transparent border-none outline-none text-sm sm:text-base py-2 px-1 sm:px-2 w-full'
                        />
                        <div className='flex items-center gap-2 sm:gap-3'>
                            <GrGallery className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer' />
                            <FaMicrophone className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer' />
                            {input ? <IoSend className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer' onClick={() => Sent()} /> : null}

                        </div>
                    </div>
                    <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-2 px-2 leading-tight">
                        ⚠️ <span className="font-semibold">Disclaimer:</span> Zeno may generate inaccurate or biased information, including about people. Please verify its responses independently.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
