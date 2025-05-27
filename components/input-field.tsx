import React from "react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { PropertyForm } from "@/types/type";

interface InputFieldProps {
  name: keyof PropertyForm;
  label: string;
  placeholder?: string;
  control: Control<PropertyForm>;
  fieldType: "text" | "number" | "email" | "password";
  min?: number;
  max?: number;
}

const InputField = ({ name, label, placeholder, fieldType, control, max, min }: InputFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        console.log(field);
        
        return (
          <FormItem className="space-y-1.5">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                type={fieldType}
                min={fieldType === "number" ? min : undefined}
                max={fieldType === "number" ? max : undefined}
                placeholder={placeholder}
                {...field}
                value={typeof field.value === "string" ? field.value : ""}
                className="custom-input"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default InputField;
