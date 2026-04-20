import React, { useEffect, useState } from 'react'

import { BadgeCheck, Bookmark, BookMarked, Delete, DeleteIcon, Edit3, Heart, HeartCrack, HeartIcon, MessageCircle, MoreVertical, Option, OptionIcon, Save, Share, Share2, Trash, User } from 'lucide-react'
import { commentApi, postApi, userApi } from '../utils/AxiosInstance'
import { useSelector } from 'react-redux'
import { combineSlices } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
const Posts = () => {

    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [text, setText] = useState("")
    const [comment, setComment] = useState(null)
    const [edit, setEdit] = useState(false)
    const [caption, setCaption] = useState(null)
    const [postId, setPostId] = useState(null)


    useEffect(() => {
        async function getPosts() {
            try {
                let response = await userApi.get('/posts')
                console.log(response.data.posts);
                setPost(response.data.posts);
// alert(JSON.stringify(response.data))
            } catch (error) {
                console.log(error);
                // alert(error)

            }
        }
        getPosts()
    }, [])

    const onclickHandler = async (postId) => {
        try {
            console.log(postId);

            let response = await userApi.post(`/like/${postId}`)
            console.log(response);
            const updatedPost = response.data.post
            setPost(prev => prev.map(post =>
                post._id === updatedPost._id ? updatedPost : post
            ))
        } catch (error) {
            console.log(error);

        }
    }

    const addComment = async (postId, text) => {
        try {


            const response = await commentApi.post(`/add-comment/${postId}`, { text })
            console.log(response);
            setText("")
            const newComment = response.data.populatedComment;
            setPost(prev => prev.map(post =>
                post._id === postId ? { ...post, comments: [...post.comments, newComment] } : post
            ))


        } catch (error) {
            console.log(error);

        }
    }
    const editHandler = async (postId) => {
        try {

            const response = await postApi.put(`edit-post/${postId}`, {
                caption, headers: {
                    "Content-Type": "application/json"
                },
            })
            // console.log(response);
            const updatedPost = response.data.post
            setPost(prev => prev.map(post =>
                post?._id === updatedPost?._id ? updatedPost : post
            ))
            setEdit(false)

        } catch (error) {
            console.log(error);

        }
    }
    const deleteHandler = async (postId) => {
        try {
            const response = await postApi.delete(`delete-post/${postId}`)
            setPost(prev => prev.filter(post => post._id !== postId))

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <div className='w-full  relative  lg:w-1/2    border-slate-700 flex flex-col lg:pl-10 '>

                {post?.map(post => {
                    return (
                        < div className='border m-2 p-4 rounded-md bg-slate-800' key={post?._id} >

                            <div className='mt-5 pb-4 flex items-center justify-between gap-4 text-white '>
                                <div className=' flex  items-center gap-2' onClick={() => { navigate(`/profile/${post?.author?._id}`) }}>

                                    <span>{post?.author?.profilePic ? <img className='w-10 h-10 rounded-full' src={post?.author?.profilePic} /> : <User />}</span>
                                    <span className='flex gap-2 items-center justify-center'><p className='font-bold text-xl'>{post?.author?.username}</p><BadgeCheck /></span>
                                </div>
                                <span><MoreVertical /></span>


                            </div>
                            <div className=''>
                                <img
                                    src={post?.post}
                                    alt=""
                                    className='  w-full  object-fill'
                                />
                                <p className='text-white text-sm p-1'>
                                    {post?.caption}
                                </p>

                                {(postId === post._id && edit) &&
                                    <div>
                                        <input
                                            className='border p-1 rounded-md m-1 text-white text-sm' type='text'
                                            defaultValue={post?.caption}
                                            onChange={(e) => setCaption(e.target.value)} />
                                        <button
                                            className='bg-blue-500 text-white rounded-md p-1'
                                            onClick={() => editHandler(post?._id)}>save</button>

                                    </div>
                                }


                            </div>
                            <div className=' relative flex w-full  gap-1 p-2 lg:gap-5 pt-2 text-white'>
                                <div className='flex gap-2 items-center p-2 justify-between text-sm  '>

<div className='flex gap-2 items-center '>

                                    <span
                                        onClick={e => onclickHandler(post?._id)}>
                                        {post?.likes.includes(user?._id) ?
                                            <Heart fill='red' color='red' /> :
                                            <HeartIcon size={25} />}
                                    </span>
                                    <span> {post?.likes?.length} Likes</span>

                                    <span> <MessageCircle size={25} onClick={() => setComment(post?._id)} /></span>
                                    <span> {post?.comments?.length} Comments</span>
                                    {comment === post?._id && (
                                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

                                            <div className="bg-white w-1/2 max-h-[80vh] rounded-lg shadow-lg flex flex-col">

                                                {/* header */}
                                                <div className="p-3 border-b font-semibold flex justify-between">
                                                    <span>Comments</span>
                                                    <button onClick={() => setComment(null)}>✖</button>
                                                </div>

                                                {/* comments list */}
                                                <div className="flex-1 overflow-y-auto p-3 space-y-3 text-black">
                                                    {post?.comments.map(c => (
                                                        <div key={c._id} className="flex gap-2 items-start">

                                                            <img
                                                                src={c?.author?.profilePic}
                                                                className="w-8 h-8 rounded-full border"
                                                            />

                                                            <div>
                                                                <span className="font-semibold">
                                                                    {c?.author?.username}
                                                                </span>
                                                                <p className="text-sm">{c?.text}</p>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>

                                                {/* input */}
                                                <div className="border-t p-2 flex gap-2 text-black">
                                                    <input
                                                        type="text"
                                                        placeholder="Add a comment..."
                                                        className="flex-1  rounded px-2 py-1 outline-none border border-gray-500"
                                                        value={text} onChange={(e) => { setText(e.target.value) }}
                                                        />
                                                    <button onClick={() => addComment(post?._id, text)} className="text-blue-500 font-semibold" >
                                                        Send
                                                    </button>
                                                </div>

                                            </div>

                                        </div>
                                    )}

                                    <span > <Share2 size={25} /> </span>
                                    </div>
                                    <div>
                                        <span className=''>  {post?.author?._id === user?._id ? (<div className='flex gap-2'><Edit3 size={25} onClick={() => {
                                            setPostId(post?._id)
                                            setEdit(!edit)
                                        }} /> <Trash size={25} onClick={() => deleteHandler(post?._id)} /></div>) : <Bookmark size={25} />} </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}


            </div >

        </>
    )
}

export default Posts