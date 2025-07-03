'use client';

import * as Icons from 'lucide-react';

interface DynamicIconProps extends Icons.LucideProps {
  name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const LucideIcon = (Icons as any)[name];

  if (!LucideIcon) {
    // Fallback icon or null
    return <Icons.HelpCircle {...props} />;
  }

  return <LucideIcon {...props} />;
};

export default DynamicIcon;
