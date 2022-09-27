import type { NextApiRequest, NextApiResponse} from 'next'
import { data } from '../../../data.js';
import { DataType } from '../../model/DataType.jsx';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) {
  const { id } = req.query;
  const index = parseInt(id as string) - 1;
  res.status(200).json(data[index]);
}