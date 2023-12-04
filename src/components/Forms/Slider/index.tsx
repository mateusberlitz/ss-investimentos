import { Slider as ChakraSlider, Stack, Input as ChakraInput, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, HStack, Text, InputProps, ChakraProps, FormControl, FormLabel, FormErrorMessage, Tooltip } from "@chakra-ui/react";
import { Ref, useEffect, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { Input } from "../Inputs/Input";
import { mask as applyMask } from "../../../utils/ReMask";
import CurrencyInput from "react-currency-input-field";
import { CurrencyInputOnChangeValues } from "react-currency-input-field/dist/components/CurrencyInputProps";
import styles from './styles.module.css';

//interface SliderProps extends InputProps{

export interface SliderProps extends ChakraProps{
    name: string;
    type: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    variant?: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    register?: UseFormRegister<any>;
    control?: any;
    mask?: "phone" | "cpf" | "cnpj" | "money" | "cep" | "cpf-cnpj" | "deadline" | "";
    error?: FieldError;
    onChange?: (value: any) => void;
    inputRef?: Ref<any>
}

export function Slider({ name, type, icon, variant = "", value = 200000, min = 30000, step = 5000, max = 1000000, label = "", mask = "", register = undefined, onChange, inputRef, control, error, maxW, ...rest }: SliderProps){
    const [sliderValue, setSliderValue] = useState<number>();
    const [showTooltip, setShowTooltip] = useState(true);

    useEffect(() => {
        setSliderValue(value);

        if(onChange){
            onChange(value);
        }
    }, [value]);

    function getControlledInputAttributes(){
        if(register){
            return {
                ...register(name),
                value: sliderValue,
                onValueChange: (value: string | undefined, name?: string | undefined, values?: CurrencyInputOnChangeValues) => {
                    setSliderValue(values ? (values.float ? values.float : 0) : 0);
                }
            }
        }

        return {
            ref: (inputRef ? inputRef : undefined),
            value: sliderValue,
            onValueChange: (value: string | undefined, name?: string | undefined, values?: CurrencyInputOnChangeValues) => {
                    setSliderValue(values ? (values.float ? values.float : 0) : 0);
                    if(onChange){
                        onChange(values ? (values.float ? values.float : 0) : 0);
                    }
                }
                
        }
    }

    return(
        <FormControl pos="relative" isInvalid={!!error} maxW={maxW}>
            <HStack w="100%" justifyContent="space-between" mb="3">
                <FormLabel w="100%" fontSize="md" mb="0" color="blue.primary">{label}</FormLabel>
                <CurrencyInput decimalSeparator="," groupSeparator="." prefix="R$" {...getControlledInputAttributes()}
                    className={styles.sliderCurrency}
                    name={name}
                    defaultValue={sliderValue}
                    //value={sliderValue}
                    decimalsLimit={2}
                />;

            </HStack>

            <ChakraSlider pos="relative" focusThumbOnChange={false} size="lg" aria-label='slider-ex-6' colorScheme='blue' value={sliderValue} defaultValue={sliderValue} min={min} max={max} step={step} 
            onChange={(value) => {
                setSliderValue(value);
                if(onChange){
                    onChange(value);
                }
            }} 
            {...rest}
            //onMouseEnter={() => setShowTooltip(true)}
            //onMouseLeave={() => setShowTooltip(false)}
            >

                <SliderTrack h="8px" borderRadius={"4"}>
                    <SliderFilledTrack bg="blue.primary"/>
                </SliderTrack>

                <Tooltip
                    hasArrow
                    bg='blue.primary'
                    color='white'
                    placement='top'
                    isOpen={showTooltip}
                    label={`${mask === "money" ? Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sliderValue ? sliderValue : 0) : mask === "deadline" ? `${sliderValue} meses` : sliderValue}`}
                >
                    <SliderThumb />
                </Tooltip>
            </ChakraSlider>

            { !!error && (
                <FormErrorMessage fontSize="11px">
                    {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    )
}