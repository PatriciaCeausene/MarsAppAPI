
import {Request, Response} from "express";
import {getRovers, getPhotosByRoverNameAndCameraType} from './handleRequests';

const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();

app.use('/', router);
router.get('/test', (req:Request, res:Response) => res.send('Hello world !'));


router.get('/rovers/:roverName/photos/:cameraType', async (req: Request, res: Response) => {
    const response = await getPhotosByRoverNameAndCameraType(req.params["roverName"], req.params["cameraType"]);
    res.send(response);
});

router.get('/rovers', async (req: Request, res: Response) => {
    const response = await getRovers();
    res.send(response);
});

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});