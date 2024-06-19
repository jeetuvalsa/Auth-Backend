import { Request, Response } from 'express';

export const getExample = (req: Request, res: Response) => {
    res.send('GET example endpoint');
};

export const postExample = (req: Request, res: Response) => {
    res.send('POST example endpoint');
};
