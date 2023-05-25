import { SelectProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Controller, FieldError, UseFormRegister } from "react-hook-form";
import { Select } from "./Select";

interface FormSelectProps extends SelectProps{
    name: string;
    children: ReactNode;
    label?: string;
    variant?: string;
    leftIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    value?: string | number;

    error?: FieldError;
}

interface ControlledSelectProps extends FormSelectProps{
    register?: UseFormRegister<any>;
    control?: any;
}

export function ControlledSelect({control, children, name, value, error, ...rest}:ControlledSelectProps){
    return(
        <Controller
            name={name}
            control={control}
            defaultValue={value}
            render={({ field: {ref, ...select} }) => 
                <Select {...select} selectRef={ref} name={name} value={value} error={error} {...rest}>
                    {children}
                </Select>
            }
        />
    );
}