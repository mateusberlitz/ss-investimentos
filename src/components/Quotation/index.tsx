import { Divider, HStack } from "@chakra-ui/react";
import { QuotationItem } from "./QuotationItem";

import styles from './Quotation.module.css'
import { GetServerSideProps } from "next";
import axios from "axios";
import { useEffect } from "react";

export function Quotation(){
    
    const fetchQuotation = () => {
        const response = axios.get('http://brapi.dev/api/available/');

        console.log(response);
    }
    
    useEffect(() => {
        fetchQuotation();
    }, [])

    return(
        <HStack w="100%" overflow={"hidden"}>
            <HStack className={styles.quotation} w="fit-content" h="35px" bg="blue.primary" color="gray.200" id="quotation" fontSize={"sm"}>
                <QuotationItem ticker="IBOV" value={"104.454 pts"} percent={1.54}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="IBOV" value={"104.454 pts"} percent={1.54}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="IBOV" value={"104.454 pts"} percent={1.54}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="IBOV" value={"104.454 pts"} percent={1.54}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="IBOV" value={"104.454 pts"} percent={1.54}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="IBOV" value={"104.454 pts"} percent={1.54}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="IBOV" value={"104.454 pts"} percent={1.54}/>
            </HStack>
        </HStack>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params }) => {
    try{
        const response = await axios.get('https://brapi.dev/api/available/');

        console.log(response);
    }catch(error: unknown){
        console.log(error);

        return {
            props: {}
        }
    }

    return {
        props: {}
    }
}