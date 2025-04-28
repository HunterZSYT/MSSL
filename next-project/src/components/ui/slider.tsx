"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [localValues, setLocalValues] = React.useState<number[] | undefined>(
    props.defaultValue || props.value
  );
  
  // Update local values when props values change
  React.useEffect(() => {
    if (props.value) {
      setLocalValues(props.value);
    }
  }, [props.value]);
  
  // Handle value changes internally to reduce re-renders
  const handleValueChange = (newValues: number[]) => {
    setLocalValues(newValues);
    if (props.onValueChange) {
      // Debounce the onValueChange callback
      const handler = setTimeout(() => {
        props.onValueChange?.(newValues);
      }, 10);
      return () => clearTimeout(handler);
    }
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      value={localValues}
      onValueChange={handleValueChange}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary/40">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm" />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
