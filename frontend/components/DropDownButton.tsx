// src/components/ui/custom-combobox.tsx
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
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CustomComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

export function CustomCombobox({ value, onChange, options, placeholder }: CustomComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-indigo-950/50 border-indigo-400/30 text-white hover:bg-indigo-900/70 hover:text-white h-12"
        >
          <div className="flex items-center gap-2 truncate">
           
            {value
              ? options.find((item) => item === value)
              : placeholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      
      {/* Phần menu xổ xuống */}
    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-indigo-950 border-indigo-500/50 text-white">
        
        {/* THÊM CLASS ĐẶC BIỆT Ở ĐÂY: [&_[cmdk-input-wrapper]]:border-indigo-500/50 */}
        <Command className="bg-transparent [[cmdk-input-wrapper]]:border-indigo-500/50">
          
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} className="text-white placeholder:text-gray-400" />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    onChange(item === value ? "" : item)
                    setOpen(false)
                  }}
                  // Thêm style cho item khi hover để đẹp hơn
                  className="text-gray-200 aria-selected:bg-indigo-800 aria-selected:text-white cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}