import axios from 'axios';

export type Image = {
    id: number;
    img_src: string;
}

export async function getRovers() {
    try {
        const { data: rovers } = await axios({
            method: 'get',
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=lU32na6Cs8wNubrZP2H6bdGGxKgAFuwARwW79qm9',
            responseType: "json"
        });
        return rovers;
    } catch (error) {
        console.log(error);
    }
}

export async function getPhotosByRoverNameAndCameraType(roverName: string, cameraType: string) {
    try {
        const {data} = await axios({
            method: 'get',
            url:`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=1000&camera=${cameraType}&api_key=lU32na6Cs8wNubrZP2H6bdGGxKgAFuwARwW79qm9`,
            responseType: "json"
        });

        return data.photos.map((item: {img_src: string})=>{
            return item.img_src;
        });
    } catch (error) {
        console.log(error);
    }
}