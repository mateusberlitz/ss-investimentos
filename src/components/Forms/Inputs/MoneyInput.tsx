import { InputGroup, InputLeftElement, FormControl, InputProps, Icon, Input as ChakraInput, FormErrorMessage } from "@chakra-ui/react";
import { Ref, useEffect, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { mask as applyMask, maskMoney as applyMoney } from "../../../utils/ReMask";

interface FormInputProps extends InputProps{
    name: string;
    type: string;
    value?: string;
    variant?: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    register?: UseFormRegister<any>;
    control?: any;
    mask?: "phone" | "cpf" | "cnpj" | "money" | "";
    error?: FieldError;
    onChange?: (value: any) => void;
    inputRef?: Ref<any>
}

export function MoneyInput({ name, type, icon, variant = "", value = "", mask = "", register = undefined, onChange, inputRef, control, error, maxW, ...rest }: FormInputProps){
    const [controlledValue, setControlledValue] = useState("");

    const handleReturnMaskedInputValue = (value: string = "") => {
        if(mask){
            if(mask == 'money'){
                value = applyMoney(value);
            }else{
                const maskPattern = (mask === "phone" ? "(99) 99999-9999"
                            : (mask === "cpf" ? "999.999.999-99"
                            : (mask === "cnpj" ? "99.999.999/9999-99"
                            :  "")));

            
                value = applyMask(value, maskPattern);
            }
        }

        setControlledValue(value);

        return value;
    }

    useEffect(() => {
        setControlledValue(value);
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
                    const makedValue = handleReturnMaskedInputValue(event.target.value);  
                    setControlledValue(makedValue);
                }
            }
        }

        return {
            ref: (inputRef ? inputRef : undefined),
            value: controlledValue,
            onChange: (event: any) => {
                    const makedValue = handleReturnMaskedInputValue(event.target.value);  
                    setControlledValue(makedValue);
                    if(onChange){
                        onChange(makedValue)
                    }
                }
                
        }
    }
}

//export default forwardRef(Input);