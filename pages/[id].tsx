import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import React from 'react';
import cache from './redis/cache';

interface Post {
    id: number,
    title: string,
    body: string,
}

interface TestProps {
    post: Post
}


export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('http://localhost:3000/api/data/allPosts')
    const posts = await res.json()
  
    const paths = posts.map((post: any) => ({
      params: { id: post.id.toString() },
    }))

    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (paths: any) => {

    const id: number = paths.params.id;

    const fetcher = async () => {
        const data = await fetch(`http://localhost:3000/api/data/${id}`)
        const postData = await data.json();

        console.log('non chached data so fetcher func ran!');

        return postData;
    }

    const cachedPost = await cache.fetch(`id:${id}`, fetcher, 60 * 60);

    return { props: {
        post: cachedPost
    }}
}

const Test: NextPage<TestProps> = ({post}: TestProps) => {
    const { id, title, body} = post;

    return (
        <div>
            {post ? (
                <>
                    <h1>ID is: {id}</h1>
                    <h1>Title is: {title}</h1>
                    <h1>Body is: {body}</h1>
                </>
            ):(
                <>
                    <h1>No Post!</h1>
                </>
            )}
        </div>
    );
}

export default Test;