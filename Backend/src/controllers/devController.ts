import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { fieldTypes } from '../../prisma/types';

export const Inspect = async (req: Request, res: Response) => {
  try {
    const keys = Object.keys(fieldTypes)
    console.log(keys);
    

    res.json('OK');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to call route' });
  }
};
