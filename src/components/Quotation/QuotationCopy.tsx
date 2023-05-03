import { Divider, HStack } from "@chakra-ui/react";
import { QuotationItem } from "./QuotationItem";

import styles from './Quotation.module.css'
import { GetServerSideProps } from "next";
import axios from "axios";
import { useEffect, useState } from "react";
import { brapi } from "@/services/brapi";

interface Stock{
    stock: string,
    name: string,
    close: number,
    change: number,
    volume: number,
    market_cap: number,
    logo: string,
    sector: string
}

interface BacenData{
    data: string;
    valor: string;
}

interface Quote{
    value: number;
    variation?: number;
}

interface Quotations{
    selic: Quote;
    ipca: Quote;
    dolar: Quote;
    euro: Quote;
    bitcoin: Quote;
    ibov: Quote;
    cdi: Quote;
    igpm: Quote;
    incc: Quote;
}

export default function Quotation({...quotes}: Quotations){
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
    const today = new Date();

    const finalDate = new Date(today.getFullYear(), today.getMonth(), 0);
    const startDate = new Date(today.getFullYear(), today.getMonth() -13, 0);

    let selic = 0;

    // const [selic, setSelic] = useState<Quote>({
    //     value: 0,
    //     variation: 0
    // });
    const [ipca, setIpca] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [dolar, setDolar] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [euro, setEuro] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [bitcoin, setBitcoin] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [ibov, setIbov] = useState<Quote>({
        value: 0,
    });
    const [cdi, setCdi] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [igpm, setIgpm] = useState<Quote>({
        value: 0,
        variation: 0
    });
    const [incc, setIncc] = useState<Quote>({
        value: 0,
        variation: 0
    });

    const fetchSelic = async () => {
        //brapi.get('v2/prime-rate?country=brazil').then(response => setSelic({value: response.data["prime-rate"][0].value}));
        return await brapi.get('v2/prime-rate?country=brazil').then(response => response.data["prime-rate"][0].value);
    }

    const fetchIbov = () => {
        brapi.get('quote/list').then(response => {
            const stocks = response.data.stocks;

            const newIbovAmount = stocks.reduce((amount:number, stock:Stock) => {
                return amount + stock.close
            }, 0);

            setIbov({value: newIbovAmount});
        });
    }

    const fetchIpca = () => {
        brapi.get('v2/inflation').then(response => {
            setIpca({value: response.data.inflation[0].value})
        });
    }

    const fetchBitcoin = () => {
        brapi.get('v2/crypto?coin=BTC&currency=BRL').then(response => {
            setBitcoin({value: response.data.coins[0].regularMarketPrice})
        });
    }

    const fetchDolar = () => {
        brapi.get('v2/currency?currency=USD-BRL').then(response => {
            setDolar({value: response.data["currency"][0].bidPrice})
        });
    }

    const fetchCdi = () => {
        axios.get(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados?formato=html&dataInicial=${startDate.toLocaleDateString().split(',')[0]}&dataFinal=${finalDate.toLocaleDateString().split(',')[0]}`).then(response => {
            const newCdi = response.data.reduce((amount: number, value: BacenData) => {
                return amount + parseFloat(value.valor);
            }, 0);

            setCdi({value: newCdi});
        });
    }

    const fetchIncc = () => {
        axios.get(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.192/dados?formato=html&dataInicial=${startDate.toLocaleDateString().split(',')[0]}&dataFinal=${finalDate.toLocaleDateString().split(',')[0]}`).then(response => {
            const newIncc = response.data.reduce((amount: number, value: BacenData) => {
                return amount + parseFloat(value.valor);
            }, 0);

            setIncc({value: newIncc});
        });
    }

    const fetchIgpm = () => {
        axios.get(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.189/dados?formato=html&dataInicial=${startDate.toLocaleDateString().split(',')[0]}&dataFinal=${finalDate.toLocaleDateString().split(',')[0]}`).then(response => {
            const newIgpm = response.data.reduce((amount: number, value: BacenData) => {
                return amount + parseFloat(value.valor);
            }, 0);

            setIgpm({value: newIgpm});
        });
    }

    // useEffect(() => {
        
    // }, [])

    try{
        fetchSelic();
        // fetchIbov();
        // fetchIpca();
        // fetchBitcoin();
        // fetchDolar();
        // fetchCdi();
        // fetchIgpm();
        // fetchIncc();

        console.log(fetchSelic());

        return{
            props: {
                //ibov,
                selic: fetchSelic(),
                // bitcoin,
                // dolar,
                // cdi,
                // igpm,
                // incc
            }
        }
    }catch(error: unknown){
        console.log(error);

        return {
            props: {}
        }
    }
}