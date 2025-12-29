"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

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

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  placeholder: string;
}

export function MultiSelect({ value, onChange, options, placeholder }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (item: string) => {
    if (value.includes(item)) {
      onChange(value.filter((v) => v !== item))
    } else {
      onChange([...value, item])
    }
  }

  const handleRemove = (item: string) => {
    onChange(value.filter((v) => v !== item))
  }

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
            {value.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {value.slice(0, 2).map((item) => (
                  <span key={item} className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                    {item}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemove(item)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {value.length > 2 && (
                  <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                    +{value.length - 2}
                  </span>
                )}
              </div>
            ) : (
              placeholder
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-indigo-950 border-indigo-500/50 text-white">
        <Command className="bg-transparent [[cmdk-input-wrapper]]:border-indigo-500/50">
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} className="text-white placeholder:text-gray-400" />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => handleSelect(item)}
                  className="text-gray-200 aria-selected:bg-indigo-800 aria-selected:text-white cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(item) ? "opacity-100" : "opacity-0"
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