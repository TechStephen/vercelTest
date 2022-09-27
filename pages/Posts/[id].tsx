import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Nav from '../components/Nav';

/**
 * @returns all our path ID's based on built in API to be passed into getStaticProps
 */
 export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('http://localhost:3000/api/data/allPosts')
    const posts = await res.json()
  
    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post: any) => ({
      params: { id: post.id.toString() },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

/**
 * 
 * @param paths which has object field params which contains all ids in our built in Next API
 * @returns which specified object data based on the id passed into the browser
 * https://nextjs.org/docs/routing/dynamic-routes 
 */
export const getStaticProps: GetStaticProps = async (paths: any) => {
    const res = await fetch(`http://localhost:3000/api/data/${paths.params.id}`)
    const post = await res.json();

    return {
        props: {
            post,
        }
    }
}

const Post: NextPage = ({ post }: any) => {
    return(
        <div className='h-screen w-screen bg-gradient-to-r from-yellow-500 from-orange-500 to-pink-500'>
            <Nav />
            <div className='grid justify-center pt-2'>
                <h1 className='text-2xl uppercase font-bold text-center'>Post{' '}{post.id}</h1>
                <div className='w-[50vh] h-fit border-[1px] border-solid border-black rounded-xl m-2 relative bg-gradient-to-r from-blue-500 to-blue-2000'>
                    <h2 className='relative m-2'><b>{post.title}</b></h2>
                    <p className='relative m-2'>{post.body}</p>
                    <button className='relative float-right m-2 border-[1px] border-solid border-black'><a href='http://localhost:3000/Posts/allPosts'>Click to see all posts!</a></button>
                </div>
            </div>
        </div>
    )
}

export default Post;