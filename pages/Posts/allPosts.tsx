import { NextPage, GetStaticProps } from "next";
import Nav from "../components/Nav";

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(`http://localhost:3000/api/data/allPosts`)
    const post = await res.json();

    return {
        props: {
            post,
        }
    }
}

function allPosts({ post }: any) {
    return (
        <div className="min-h-[100vh] h-[100%] w-screen bg-gradient-to-r from-yellow-500 from-orange-500 to-pink-500">
            <Nav />
            <div className="grid justify-center pt-2">
                <h1 className="text-2xl font-bold uppercase text-center">Posts</h1>
                {post.map((post: any) => (
                    <div key={post.id} className="w-[50vh] h-fit border-[1px] border-solid border-black rounded-xl m-2 bg-gradient-to-r from-blue-500 to-blue-2000">
                        <h2 className='relative m-2'><b>{post.title}</b></h2>
                        <p className='relative m-2'>{post.body}</p>
                        <button className='relative float-right m-2 border-[1px] border-solid border-black'><a href={`http://localhost:3000/Posts/${post.id}`}>Click to see post!</a></button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default allPosts;