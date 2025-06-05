import { LucideIcon, LucideProps } from 'lucide-react';

declare module 'lucide-react' {
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
  }
}
