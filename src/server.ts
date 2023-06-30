
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
    let startPage = 0;
    let endPage = 0;
    if (req.query.start_page) {
        startPage = parseInt(req.query.start_page.toString());
    }
    if (req.query.end_page) {
        endPage = parseInt(req.query.end_page.toString());
    }

    const response = await getPhotosByRoverNameAndCameraType(req.params["roverName"], req.params["cameraType"],startPage,endPage);
    res.send(response);
});

router.get('/rovers', async (req: Request, res: Response) => {
    const response = await getRovers();
    res.send(response);
});

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});