import { InputGroup, InputLeftElement, FormControl, InputProps, Icon, Input as ChakraInput, FormErrorMessage, Text, Link, FormLabel } from "@chakra-ui/react";
import { ReactNode, Ref, useEffect, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { mask as applyMask, maskMoney as applyMoney, maskNumber as applyNumber, } from "../../../utils/ReMask";

interface FormInputProps extends InputProps{
    name: string;
    type: string;
    value?: string;// | number;
    label?: string;
    variant?: string;
    inputLink?: ReactNode;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    register?: UseFormRegister<any>;
    control?: any;
    mask?: "phone" | "cpf" | "cnpj" | "money" | "number" | "cep" | "cpf-cnpj" | "";
    error?: FieldError;
    onChange?: (value: any) => void;
    inputRef?: Ref<any>
}

export function Input({ name, type, icon, variant = "", isRequired, inputLink, value = "", label = "", mask = "", register = undefined, onChange, inputRef, control, error, maxW, colorScheme, ...rest }: FormInputProps){
    const [controlledValue, setControlledValue] = useState<string>("");

    const handleReturnMaskedInputValue = (value: string = "") => {
        if(mask){
            if(mask === 'money'){
                //console.log(value);
                value = applyMoney(value);
            }else if(mask === 'number'){
                //console.log(value);
                value = applyNumber(value);
            }else{
                const maskPattern = (mask === "phone" ? "(99) 99999-9999"
                            : (mask === "cpf" ? "999.999.999-99"
                            : (mask === "cnpj" ? "99.999.999/9999-99"
                            : (mask === "cep" ? "99999-999"
                            : (mask === "cpf-cnpj" ? (value.length < 15 ? "999.999.999-99" : "99.999.999/9999-99")
                            :  "")))));

            
                value = applyMask(value, maskPattern);
            }
        }

        setControlledValue(value);

        return value;
    }

    useEffect(() => {
        setControlledValue(handleReturnMaskedInputValue(value));

        if(onChange){
            onChange(value);
        }
    }, [value]);

    // useEffect(() => {
    //     ref.dispatchEvent(customEvent);
    //  });

    function getControlledInputAttributes(){
        if(register){
            return {
                ...register(name),
                value: controlledValue,
                onChange: (event: any) => {
                    const maskedValue = handleReturnMaskedInputValue(event.target.value);  
                    setControlledValue(maskedValue);
                }
            }
        }

        return {
            ref: (inputRef ? inputRef : undefined),
            value: controlledValue,
            onChange: (event: any) => {
                    const maskedValue = handleReturnMaskedInputValue(event.target.value);  
                    setControlledValue(maskedValue);
                    if(onChange){
                        onChange(maskedValue)
                    }
                }
                
        }
    }

    const [focus, setFocus] = useState(false);

    return icon ? (
        <FormControl pos="relative" isInvalid={!!error} maxW={maxW}>
            {
                label && (
                    <FormLabel zIndex="1" cursor="text" color="gray.600" transition="ease 0.2s" pos="absolute" fontWeight="normal" fontSize={controlledValue === "" ? "sm" : "10px"} top={controlledValue === "" ? "14px" : "6px"} _focus={{top: "6px", fontSize: "10", color: "white"}} left="55px">{label}{isRequired && '*'}</FormLabel>
                )
            }

            <InputGroup pos="relative">
                <InputLeftElement w="55px" h="50px" pointerEvents="none" ><Icon as={icon}  stroke={error ? "#e53e3e" : (controlledValue === "" ? "#a0a3bd" : "#7FCEFF")} fill="none" w="18" h="18px" strokeWidth="3"/></InputLeftElement>

                <ChakraInput {...getControlledInputAttributes()} fontWeight="semibold" pt="14px" name={name} h="50px" pl="55px" type={type} fontSize="sm" borderColor={variant === 'outline' ? ( colorScheme === 'dark' ? "gray.700"  : "gray.400" ) : "transparent"} bgColor={colorScheme === 'dark' ? 'gray.900' : '#eff0f6'} _hover={{borderColor: 'none', bg: 'gray.200'}} _focus={{borderColor:"blue.500", boxShadow: "0 3px 10px 0 rgb(34 41 47 / 10%)"}} size="lg" _placeholder={{color: "gray.600"}} border="1px" borderRadius="3px" {...rest}/>
            </InputGroup>

            { !!error && (
                <FormErrorMessage fontSize="11px">
                    {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    ) 
    : 
    (
        <FormControl pos="relative" isInvalid={!!error} maxW={maxW}>
            {
                label && (
                    <FormLabel zIndex="1" cursor="text" color={variant === "white" ? "white" : "blue.primary"} transition="ease 0.2s" fontWeight="normal" fontSize={"md"} top={controlledValue === "" ? "14px" : "6px"}>{label}{isRequired && '*'}</FormLabel>
                )
            }

            {
                inputLink && (
                    inputLink
                )
            }
            <ChakraInput

                {...getControlledInputAttributes()}
                
                name={name} h="50px" pl="4" py="3" type={type} fontWeight="semibold" fontSize="sm" borderColor="gray.200" bgColor={'gray.100'} size="lg" _hover={{borderColor: 'none', bg: 'gray.200'}} _focus={{borderColor:"black", boxShadow: "0 3px 10px 0 rgb(34 41 47 / 10%)"}} _placeholder={{color: "gray.600", fontWeight: "light"}} borderRadius="3px" {...rest}
            />
        
            { !!error && (
                <FormErrorMessage fontSize="11px">
                    {/* <Icon as={}  stroke={error. ? "#e53e3e" : (controlledValue === "" ? "#a0a3bd" : "#7FCEFF")} fill="none" w="13" h="13px" strokeWidth="3"/> */}
                    {error.message}
                </FormErrorMessage>   
            )}
        </FormControl>
    );
}

//export default forwardRef(Input);