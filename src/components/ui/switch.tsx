"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    {/* Moon Icon */}
    <Moon
      className={cn(
        "absolute left-[10px] top-[10px] z-[1000] size-4 border-black fill-white stroke-gray-600 transition-opacity duration-300 ease-in-out data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0",
      )}
    />
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block size-7 rounded-full bg-background shadow-lg ring-0 transition-transform duration-300 ease-in-out data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-0",
      )}
    />
    {/* Sun Icon */}
    <Sun
      className={cn(
        "absolute right-[10px] top-[10px] z-[1000] size-4 fill-black stroke-gray-600 transition-opacity duration-300 ease-in-out data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
