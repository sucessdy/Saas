

import { cn } from '@/lib/utils';
import { Asterisk } from 'lucide-react';
import React, { ComponentPropsWithoutRef } from 'react';

export function RequiredLabelIcon({ className, ...props }: ComponentPropsWithoutRef<typeof Asterisk>) { 
  // Your component implementation here
  return ( <Asterisk  {...props}  size={12} className={cn("text-destructive inline size-3  align-top", className) } />

  );
}