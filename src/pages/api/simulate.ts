/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { serverApi } from "../../services/api";

export default async (request: NextApiRequest, response: NextApiResponse) =>{
    if(request.method === 'POST'){
        try{
            const companyId = 1;
            const originId = 3;

            const lead = request.body.lead;
            const product = request.body.product;
            const campaignName = request.body.campaignName;
            const campaignOrigin = request.body.campaignOrigin;

            const leadResponse = await serverApi.get('/public/leads', {params:{
                email: lead.email,
                phone: lead.phone
            }}).catch(error => {
                return error.response;
            });

            if(leadResponse.status !== 200){
                return response.status(leadResponse.status).json(leadResponse.data);
            }

            let leadId:number;
            let sendMail = true;
            let newLead = false;

            if(leadResponse.data.length > 0){
                leadId = leadResponse.data[0].id;
            }else{
                const leadStoreResponse = await serverApi.post('/public/leads/store', {
                    ...lead,
                    company: companyId,
                    origin: originId,
                    campaign_origin: campaignOrigin,
                    campaign_name: campaignName
                }).catch(error => {
                    return error.response;
                });

                if(leadStoreResponse.status !== 200 && leadStoreResponse.status !== 201){
                    return response.status(leadStoreResponse.status).json(leadStoreResponse.data);
                }

                leadId = leadStoreResponse.data.data.id;

                sendMail = true;
                newLead = true;
            }

            if(leadId){
                const resultResponse = await serverApi.post('/public/simulations/store', {
                    ...product,
                    company: 1,
                    lead: leadId,
                    sendMail,
                    campaign_origin: campaignOrigin,
                    campaign_name: campaignName
                }).catch(error => {
                    return error.response;
                });

                if(resultResponse.status !== 200 && resultResponse.status !== 201){
                    return response.status(resultResponse.status).json(resultResponse.data);
                }

                const newSimulationResult = {
                    debt: resultResponse.data.parcel_value * parseInt(resultResponse.data.deadline),
                    fullParcel: resultResponse.data.parcel_value,
                    halfParcel: resultResponse.data.parcel_half,
                    newLead: newLead
                };

                return response.status(200).json(newSimulationResult);
            }
        }catch(error: any){
            console.log(error);
            //return error;
            return response.status(error.request.res.statusCode);
        }
    }else{
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method not allowed');
    }
}