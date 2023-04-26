import { InputProps } from "@chakra-ui/react";
import { Controller, FieldError, UseFormRegister } from "react-hook-form";
import { Input } from "./Input";

interface FormInputProps extends InputProps{
    name: string;
    type: string;
    value?: string;
    variant?: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    mask?: "phone" | "cpf" | "cnpj" | "money" | "";
    error?: FieldError;
    label?: string;
}

interface ControlledInputProps extends FormInputProps{
    register?: UseFormRegister<any>;
    control?: any;
}

export function ControlledInput({control, name, value, error, type, label, ...rest}:ControlledInputProps){
    return(
        <Controller
            name={name}
            control={control}
            defaultValue={value}
            render={({ field: {ref, ...field} }) => 
                <Input inputRef={ref} {...field} name={name} type={type} value={value} error={error} {...rest} label={label}/>
            }
        />
    );
}