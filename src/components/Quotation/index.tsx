import { Divider, HStack } from "@chakra-ui/react";
import { QuotationItem } from "./QuotationItem";

import styles from './Quotation.module.css'

export function Quotation(){
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