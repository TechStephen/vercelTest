import type { NextPage } from 'next'
import { SetStateAction } from 'react';

interface TitleProps {
    title: string,
    setTitle: React.Dispatch<SetStateAction<string>>
}

const Title: NextPage<TitleProps> = ({ title, setTitle }) => {
    return (
        <>
            <h1>{title}</h1>
            <input type="text" onChange={(e) => setTitle(e.target.value)} className='border-[1px] border-solid border-black'/>
        </>
    );
}

export default Title;