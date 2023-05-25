import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { serverApi } from "../../services/api";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if(request.method === 'POST'){
        try{
            const serverResponse = await serverApi.post(`auth/login`, request.body);

            return response.status(serverResponse.status).json(serverResponse.data);
        }catch(error:any){
            if (error.response) {
                return response.status(error.response.status).json(error.response.data);
            }else if (error.request) {
                console.log(error.request);
            }else{
                console.log('Error', error.message);
            }
        };
    }else{
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method not allowed');
    }
}