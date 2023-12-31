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

export async function getRoversNames(): Promise<string[]> {
    try {
        const { data } = await axios({
            method: 'get',
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=lU32na6Cs8wNubrZP2H6bdGGxKgAFuwARwW79qm9',
            responseType: "json"
        });
        return data.rovers.map((item: {name: string}) => {
            return item.name;
        });
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getAvailableCameras(roverName: string) {
    try {
        const { data } = await axios({
            method: 'get',
            url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}?api_key=lU32na6Cs8wNubrZP2H6bdGGxKgAFuwARwW79qm9`,
            responseType: "json"
        });
        return data.rover.cameras.map((item: {name: string}) => {
            return item.name;
        });
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getPhotosByRoverNameAndCameraType(roverName: string, cameraType: string, startPage: number, endPage: number) {
    try {
        const {data} = await axios({
            method: 'get',
            url:`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=1&camera=${cameraType}&api_key=lU32na6Cs8wNubrZP2H6bdGGxKgAFuwARwW79qm9`,
            responseType: "json"
        });
        if(startPage === 0 || endPage === 0) {
            return data.photos.map((item: { img_src: string }) => {
                return item.img_src;
            });
        } else {
            return data.photos.map((item: { img_src: string }) => {
                // TODO: check index
                return item.img_src;
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export interface Photo {
    img_src: string,
    camera: string,
    rover: string
}
export async function getPhotosByRoverNameAndEarthDate(roverName: string, earthDate: Date) {
    try {
        const {data} = await axios({
            method: 'get',
            url:`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${earthDate}&api_key=lU32na6Cs8wNubrZP2H6bdGGxKgAFuwARwW79qm9`,
            responseType: "json"
        });

        const res = data.photos.map((item: {img_src: string, rover: {name: string}, camera: { name: string}}) => {
            return {img_src: item.img_src, rover: item.rover.name, camera: item.camera.name };
        });
        const array = res.filter((item: {}, i: number) => i === res.indexOf(item));
        return array;
    } catch (error) {
        console.log(error);
    }
}