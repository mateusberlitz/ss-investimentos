import { useToast } from "@chakra-ui/react";
import axios from "axios";
//import { invertScale } from "framer-motion/types/value/use-inverted-scale";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useErrors } from "../hooks/useErrors";
import { api } from "../services/api";
//import { useFacebookPixel } from "../Facebook";
//import * as gtag from '../../services/gtag';

interface SimuladorContextProps{
    children?: ReactNode;
}

interface SimuladorContextData{
    isOpen:boolean;
    handleOpenSimulador: () => void;
    handleCloseSimulador: () => void;
    step?: number;
    handleChangeStep: (step:number) => void;
    handleSaveSimulationProduct: (stepData:SimulationProduct) => void;
    handleSaveSimulationLead: (stepData:SimulationLead) => void;
    handleChangeSalesman: (salesManEmail:string) => void;
    productData?:SimulationProduct;
    leadData?:SimulationLead;
    simulationResult?:SimulationResult;
}

export interface SimulationProduct{
    segment: string;
    credit: number;
    deadline: number;
}

export interface SimulationLead{
    name: string;
    address_city: string;
    address_uf: string;
    email: string;
    phone: string;
    user_email?: string;
}

interface SimulationResult{
    halfParcel: number;
    fullParcel: number;
    smilesPoints: number;
    debt: number;
}

interface Lead{
    id: number;
    name: string;
    email: string;
    phone: string;
}

const SimuladorContext = createContext<SimuladorContextData>({} as SimuladorContextData);

export const SimuladorProvider = ({children}: SimuladorContextProps) => {
    const { showErrors } = useErrors();
    const toast = useToast();
    //const {reactPixel} = useFacebookPixel();

    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<number>();

    const [productData, setProductData] = useState<SimulationProduct>();
    const [leadData, setLeadData] = useState<SimulationLead>();
    const [simulationResult, setSimulationResult] = useState<SimulationResult>();
    const [salesmanEmail, setSalesmanEmail] = useState<string>();

    const [campaignName, setCampaignName] = useState<string>(
        //() => {
        // const storedCampaignName = localStorage.getItem('@lance/campaign_name');

        // if(storedCampaignName && storedCampaignName != undefined){
        //     return JSON.parse(storedCampaignName);
        // }

        // return ""
        //}
    );

    const [campaignOrigin, setCampaignOrigin] = useState<string>(
        //() => {
        // const storedCampaignOrigin = localStorage.getItem('@lance/campaign_origin');

        // if(storedCampaignOrigin && storedCampaignOrigin != undefined){
        //     return JSON.parse(storedCampaignOrigin);
        // }

        // return ""
        //}
    );


    useEffect(() => {
        const storagedStep = localStorage.getItem('@lance/step');
        const storagedProductData = localStorage.getItem('@lance/productData');
        const storagedLeadData = localStorage.getItem('@lance/leadData');
        const storagedResult = localStorage.getItem('@lance/simulationResult');
        const storagedSalesmanEmail = localStorage.getItem('@lance/salesman');

        const storedCampaignName = localStorage.getItem('@lance/campaign_name');
        const storedCampaignOrigin = localStorage.getItem('@lance/campaign_origin');

        setStep(storagedStep ? parseInt(storagedStep) : 0);

        if (storagedProductData) {
            const parsedStoragedProductData = JSON.parse(storagedProductData);
            
            setProductData(parsedStoragedProductData);
        }
    
        if (storagedLeadData) {
            const parsedStoragedLeadData = JSON.parse(storagedLeadData);
            
            setLeadData(parsedStoragedLeadData);
        }

        if (storagedResult) {
            const parsedStoragedResult = JSON.parse(storagedResult);
            
            setSimulationResult(parsedStoragedResult);
        }

        if (storagedSalesmanEmail) {
            const parsedStoragedSalesmanEmail = JSON.parse(storagedSalesmanEmail);
            
            setSalesmanEmail(parsedStoragedSalesmanEmail);
        }

        if(storedCampaignName && storedCampaignName != undefined){
            const parsedStoredCampaignName = JSON.parse(storedCampaignName);

            setCampaignName(parsedStoredCampaignName);
        }

        if(storedCampaignOrigin && storedCampaignOrigin != undefined){
            const parsedStoredCampaignOrigin = JSON.parse(storedCampaignOrigin);

            setCampaignOrigin(parsedStoredCampaignOrigin);
        }


        console.log(campaignName);
    }, []);

    const handleOpenSimulador = () => {
        setIsOpen(true);
    }

    const handleCloseSimulador = () => {
        setIsOpen(false);
    }

    const handleChangeStep = (step:number) => {
        setStep(step);
    }

    const handleChangeSalesman = (salesManEmail:string) => {
        setSalesmanEmail(salesManEmail);
        localStorage.setItem('@lance/salesman', JSON.stringify(salesManEmail));
    }

    const handleSaveSimulationProduct = (stepData:SimulationProduct) => {
        handleChangeStep(1);
        setProductData(stepData);
        localStorage.setItem('@lance/productData', JSON.stringify(stepData));
    }

    const handleClearSimulation = (stepData:SimulationProduct) => {
        handleChangeStep(1);
        setProductData(stepData);
        localStorage.setItem('@lance/productData', JSON.stringify(stepData));
    }

    const handleSaveSimulationLead = async (stepData:SimulationLead) => {
        setLeadData(stepData);
        localStorage.setItem('@lance/leadData', JSON.stringify(stepData));
        
        try{
            const result = await api.post('/simulate', {
                lead: {...stepData, user_email: salesmanEmail},
                product: productData,
                campaignName,
                campaignOrigin
            }).then(response => response.data);

            setSimulationResult(result);
            localStorage.setItem('@lance/simulationResult', JSON.stringify(result));
            handleChangeStep(2);

            //console.log(result.newLead);

            if(result.newLead){
                // if(reactPixel){
                //     const tracked = reactPixel.track('Lead', {content_name: 'Consórcio', currency: "BRL", value: productData?.credit});
                // }
    
                // gtag.track('conversion', { sendTo: 'AW-797158179/GciSCJ6BwbkBEKPWjvwC', value: productData?.credit, currency: 'BRL'}));
            }
        }catch(error: any){
            showErrors(error, toast);
        }
    }

    const calcResults = async () => {
        const debt = productData?.credit ? (productData.segment === "Imóvel" ? productData.credit * 1.23 : productData.credit * 1.16) : 0;
        const fullParcel = productData?.deadline ? debt / productData?.deadline : 0;
        const halfParcel = fullParcel / 2;

        const response = await axios.get("https://economia.awesomeapi.com.br/all/USD-BRL");
        const dolar = response.data.USD.bid;
        const smilesPoints = (halfParcel / dolar) * 3;

        setSimulationResult({
            debt,
            fullParcel,
            halfParcel,
            smilesPoints
        });
    }

    const storeLead = async () => {
        const response = await api.post('/public/leads/store', {
            ...leadData,
            company: 1,
            origin: 3
        });

        return response.data;
    }

    return (
        <SimuladorContext.Provider value={{
            isOpen: isOpen, 
            handleOpenSimulador: handleOpenSimulador, 
            handleCloseSimulador: handleCloseSimulador, 
            step, 
            handleChangeStep: handleChangeStep,
            handleSaveSimulationProduct: handleSaveSimulationProduct,
            handleSaveSimulationLead: handleSaveSimulationLead,
            handleChangeSalesman,
            leadData,
            productData,
            simulationResult
        }}>
            {children}
        </SimuladorContext.Provider>
    )
}

export const useSimulador = () => useContext(SimuladorContext);