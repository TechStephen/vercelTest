// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { data } from '../../../data.js';
import { DataType } from '../../model/DataType.jsx';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataType | DataType[]>
) {
  if(req.method === 'GET'){
    res.status(200).json(data)
  } else if (req.method === 'POST'){
    const newPostData: DataType = req.body;
    const newPost: DataType = {
      id: (newPostData.id as number),
      title: newPostData.title,
      body: newPostData.body
    }
    data.push(newPost)
    res.status(201).json(newPost);
  }
}