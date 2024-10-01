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

const subjects = [
  {
    value: "Chemistry",
    label: "Chemistry",
  },
  {
    value: "Physics",
    label: "Physics",
  },
  {
    value: "Mathematics",
    label: "Mathematics",
  },
  {
    value: "Biology",
    label: "Biology",
  },
  {
    value: "History",
    label: "History",
  },
  {
    value: "Linear Algebra",
    label: "Linear Algebra",
  },
  {
    value: "Discrete Math",
    label: "Discrete Math",
  },
  {
    value: "Calculus",
    label: "Calculus",
  },
]

export function SubjectCombo({ onSubjectSelect }: { onSubjectSelect: (subject: string) => void }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? subjects.find((subject) => subject.value === value)?.label
            : "Select subject..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search subject..." />
          <CommandList>
            <CommandEmpty>No subject found.</CommandEmpty>
            <CommandGroup>
              {subjects.map((subject) => (
                <CommandItem
                  key={subject.value}
                  value={subject.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue
                    setValue(newValue)
                    onSubjectSelect(newValue) // Call the parent function with the selected value
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === subject.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {subject.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
