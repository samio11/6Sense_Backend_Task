import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app:Application = express();

app.use(express.json());
app.use(cors());

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        message:"Welcome to Product Management System By 6Sense Backend",
        upTime:process.uptime(),
        Date: new Date()
    });
})

export default app;