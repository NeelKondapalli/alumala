"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface FilterComboboxProps {
    setState: React.Dispatch<React.SetStateAction<any>>
    disabled: boolean
    placeholder: string
    frameworks: {
        value: string,
        label: string
    }[]
    //email: string;
    //bio: string;
}

const FilterCombobox: React.FC<FilterComboboxProps> = ({ setState , disabled, placeholder, frameworks}) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex w-[200px] justify-between truncate"
          disabled = {disabled}
        >
          <div className = "truncate">
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : placeholder}
          </div>
          <ChevronsUpDown className="mr-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
       
          <CommandInput placeholder= {placeholder} />
          <CommandEmpty>Option not found.</CommandEmpty>
          <CommandList>
          <CommandGroup>
          
            {frameworks.map((framework) => (
              <CommandItem className = "pl-8"
                key= {framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  setState(currentValue === value ? "" : currentValue)
                }}
              >
                {/* <Check
                  className={cn(
                    "mr-3 h-3 pl-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                /> */}
                
                {framework.label}
              </CommandItem>
            ))}
            
          </CommandGroup>
          </CommandList>
          
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default FilterCombobox