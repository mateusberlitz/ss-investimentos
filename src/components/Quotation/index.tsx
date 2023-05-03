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

export function Quotation({...quotes}: Quotations){
    const [selic, setSelic] = useState<Quote>({
        value: 0,
        variation: 0
    });
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

    const today = new Date();
    //const startDate = new Date();

    const finalDate = new Date(today.getFullYear(), today.getMonth(), 0);
    const startDate = new Date(today.getFullYear(), today.getMonth() -13, 0);
    
    const fetchSelic = () => {
        brapi.get('v2/prime-rate?country=brazil').then(response => setSelic({value: response.data["prime-rate"][0].value}));
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

    const fetchEuro = () => {
        brapi.get('v2/currency?currency=EUR-BRL').then(response => {
            setEuro({value: response.data["currency"][0].bidPrice})
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
    
    useEffect(() => {
        fetchSelic();
        fetchIbov();
        fetchIpca();
        fetchBitcoin();
        fetchDolar();
        fetchCdi();
        fetchIgpm();
        fetchIncc();
        fetchEuro();
    }, []);

    console.log(ibov, selic, cdi);

    return(
        <HStack w="100%" overflow={"hidden"}>
            <HStack className={styles.quotation} w="fit-content" h="35px" bg="blue.primary" color="gray.200" id="quotation" fontSize={"sm"}>
                <QuotationItem ticker="IBOV" value={ibov.value.toFixed(0)} percent={undefined}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="SELIC" value={selic.value.toLocaleString()} percent={undefined}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="CDI" value={cdi.value.toLocaleString()} />
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="Dolar" value={Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(dolar.value)}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="Euro" value={Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(euro.value)}/>
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="INCC" value={incc.value.toLocaleString()} />
                <Divider orientation="vertical" h="60%" borderColor="gray.600"/>
                <QuotationItem ticker="IGPM" value={igpm.value.toLocaleString()}/>
            </HStack>
        </HStack>
    )
}