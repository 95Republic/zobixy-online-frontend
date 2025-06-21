import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai';
import { GrEmoji } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { add_friend, messageClear, send_message, updateMessage } from '../../store/reducers/chatReducer';
import toast from 'react-hot-toast';
import io from 'socket.io-client';
import { FaList } from 'react-icons/fa';

const socket = io('http://localhost:5000');

const Chat = () => {
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const { sellerId } = useParams();
    const { userInfo } = useSelector(state => state.auth);
    const { fd_messages = [], currentFd, my_friends = [], successMessage } = useSelector(state => state.chat);
    
    const [text, setText] = useState('');
    const [receiverMessage, setReceiverMessage] = useState('');
    const [activeSeller, setActiveSeller] = useState([]);
    const [show, setShow] = useState(false);

    // Socket connection and event listeners
    useEffect(() => {
        socket.emit('add_user', userInfo.id, userInfo);
        
        const handleSellerMessage = (msg) => setReceiverMessage(msg);
        const handleActiveSeller = (sellers) => setActiveSeller(sellers);
        
        socket.on('seller_message', handleSellerMessage);
        socket.on('activeSeller', handleActiveSeller);
        
        return () => {
            socket.off('seller_message', handleSellerMessage);
            socket.off('activeSeller', handleActiveSeller);
        };
    }, [userInfo.id]);

    // Add friend when sellerId changes
    useEffect(() => {
        if (sellerId) {
            dispatch(add_friend({
                sellerId,
                userId: userInfo.id
            }));
        }
    }, [sellerId, dispatch, userInfo.id]);

    // Send message handler
    const send = useCallback(() => {
        if (text && sellerId) {
            dispatch(send_message({
                userId: userInfo.id,
                text,
                sellerId,
                name: userInfo.name
            }));
            setText('');
        }
    }, [text, sellerId, dispatch, userInfo.id, userInfo.name]);

    // Handle successful message sending
    useEffect(() => {
        if (successMessage && fd_messages.length > 0) {
            socket.emit('send_customer_message', fd_messages[fd_messages.length - 1]);
            dispatch(messageClear());
        }
    }, [successMessage, fd_messages, dispatch]);

    // Handle incoming messages
    useEffect(() => {
        if (receiverMessage) {
            if (sellerId === receiverMessage.senderId && userInfo.id === receiverMessage.receiverId) {
                dispatch(updateMessage(receiverMessage));
            } else {
                toast.success(`${receiverMessage.senderName} sent a message`);
                dispatch(messageClear());
            }
        }
    }, [receiverMessage, sellerId, userInfo.id, dispatch]);

    // Auto-scroll to new messages
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [fd_messages]);

    // Toggle sidebar visibility
    const toggleSidebar = useCallback(() => {
        setShow(prev => !prev);
    }, []);

    return (
        <div className='bg-white p-3 rounded-md'>
            <div className='w-full flex'>
                {/* Sidebar */}
                <div className={`w-[230px] md-lg:absolute bg-white md-lg:h-full ${show ? '-left-0' : '-left-[350px]'} transition-all duration-300 z-40`}>
                    <div className='flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]'>
                        <span><AiOutlineMessage /></span>
                        <span>Message</span>
                    </div>
                    <div className='w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3 overflow-y-auto'>
                        {my_friends?.map((f, i) => (
                            <Link 
                                to={`/dashboard/chat/${f.fdId}`} 
                                key={i}  
                                className='flex gap-2 justify-start items-center pl-2 py-[5px] hover:bg-gray-100 rounded'
                            >
                                <div className='w-[30px] h-[30px] rounded-full relative'>
                                    {activeSeller.some(c => c.sellerId === f.fdId) && (
                                        <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
                                    )}
                                    <img src={f.image} alt={f.name} className='w-full h-full rounded-full object-cover' />
                                </div>
                                <span className='truncate'>{f.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className='w-[calc(100%-230px)] md-lg:w-full'>
                    {currentFd ? (
                        <div className='w-full h-full'>
                            {/* Chat Header */}
                            <div className='flex justify-between gap-3 items-center text-slate-600 text-xl h-[50px]'>
                                <div className='flex gap-2 items-center'>
                                    <div className='w-[30px] h-[30px] rounded-full relative'>
                                        {activeSeller.some(c => c.sellerId === currentFd.fdId) && (
                                            <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
                                        )}
                                        <img src={currentFd.image} alt={currentFd.name} className='w-full h-full rounded-full object-cover' />
                                    </div>
                                    <span>{currentFd.name}</span>
                                </div>
                                <div 
                                    onClick={toggleSidebar}
                                    className='w-[35px] h-[35px] hidden md-lg:flex cursor-pointer rounded-sm justify-center items-center bg-sky-500 text-white hover:bg-sky-600'
                                >
                                    <FaList />
                                </div>
                            </div>

                            {/* Messages */}
                            <div className='h-[400px] w-full bg-slate-100 p-3 rounded-md'>
                                <div className='w-full h-full overflow-y-auto flex flex-col gap-3'>
                                    {fd_messages?.map((m, i) => (
                                        <div 
                                            ref={i === fd_messages.length - 1 ? scrollRef : null} 
                                            key={i} 
                                            className={`w-full flex gap-2 items-center text-[14px] ${
                                                currentFd?.fdId !== m.receiverId ? 'justify-start' : 'justify-end'
                                            }`}
                                        >
                                            <img 
                                                className='w-[30px] h-[30px] rounded-full' 
                                                src="http://localhost:3000/images/user.png" 
                                                alt="User" 
                                            />
                                            <div className={`p-2 rounded-md ${
                                                currentFd?.fdId !== m.receiverId 
                                                    ? 'bg-purple-500 text-white' 
                                                    : 'bg-cyan-500 text-white'
                                            }`}>
                                                <span>{m.message}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className='flex p-2 justify-between items-center w-full'>
                                <div className='w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full hover:bg-gray-100'>
                                    <label className='cursor-pointer' htmlFor="file-input">
                                        <AiOutlinePlus />
                                    </label>
                                    <input id="file-input" className='hidden' type="file" />
                                </div>
                                <div className='border h-[40px] ml-2 w-[calc(100%-90px)] rounded-full relative'>
                                    <input 
                                        value={text} 
                                        onChange={(e) => setText(e.target.value)} 
                                        onKeyPress={(e) => e.key === 'Enter' && send()}
                                        type="text" 
                                        placeholder='Type a message...' 
                                        className='w-full rounded-full h-full outline-none p-3 pr-10'
                                    />
                                    <div className='absolute right-2 top-1/2 transform -translate-y-1/2'>
                                        <GrEmoji className='text-xl cursor-pointer' />
                                    </div>
                                </div>
                                <div 
                                    onClick={send}
                                    className='w-[40px] h-[40px] p-2 flex justify-center items-center rounded-full hover:bg-gray-100 cursor-pointer'
                                >
                                    <IoSend className='text-2xl text-sky-500' />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div 
                            onClick={toggleSidebar}
                            className='w-full h-[400px] flex justify-center items-center text-lg font-bold text-slate-600 cursor-pointer hover:bg-gray-50'
                        >
                            <span>Select a Seller to Chat</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;