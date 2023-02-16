import { CircularProgress } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import LazyLoad from 'react-lazy-load' 
import postDTO from '../data/dto/postDTO'
import MediaService from '../service/media-service' 
import PostService from '../service/post-service'
import { UserContext } from '../utils/userContext'
import Panel from './Panel'

function Feed() {
    const [posts,setPosts]=useState([])
    const [isLoading, setLoading]=useState(true);
    const [page,setPage] = useState(1);
    const [totalPage,setTotalPage]=useState(0);

    const {user} = useContext(UserContext)

    useEffect(()=>{
        if (user) {
            loadMorePost()
        }
    },[user, page])
    
    function loadMorePost(){
        setLoading(true)
        PostService.getAllPosts(page).then((res)=>{
             setPosts([...posts, ...res])
            setTotalPage(0)
            setLoading(false)
        })
    }
    
    useEffect(() => {
        const listenToScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = winScroll / height; 
            
            if (scrolled >= 1 && (page < totalPage-1 || page === 0)) {
                setPage(p=>p+1) 
          }
        }
        window.addEventListener('scroll', listenToScroll);
        return () => {
          window.removeEventListener('scroll', listenToScroll);
        };
      }, [page])

  return (
    <div>
        {<div className=" bg-white flex flex-col w-full place-items-center">
            {posts.map((post) =>
                <LazyLoad>
                    <div>  
                        <Panel item={post}/>                      
                    </div>
                </LazyLoad>
            )}
        </div>}
        {isLoading && <div className='fixed top-1/2 left-1/2'><CircularProgress/></div>}
    </div>
  )
}

export default Feed