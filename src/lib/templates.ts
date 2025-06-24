import type { ComponentType } from 'react'
import { ClassicTemplate } from '@/components/templates/ClassicTemplate'
import { ModernTemplate } from '@/components/templates/ModernTemplate'
import { CreativeTemplate } from '@/components/templates/CreativeTemplate'
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate'
import { TechTemplate } from '@/components/templates/TechTemplate'
import { ElegantTemplate } from '@/components/templates/ElegantTemplate'
import { VisualCvTemplate } from '@/components/templates/VisualCvTemplate'
import type { ResumeData } from './resumeSchema'

export interface Template {
  id: string
  name: string
  description: string
  component: ComponentType<{ data: ResumeData }>
  type: 'free' | 'paid'
  price?: number
}

export const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'A timeless, elegant template for corporate and academic roles.',
    component: ClassicTemplate,
    type: 'free',
  },
   {
    id: 'professional',
    name: 'Corporate Clean',
    description: 'A sharp, clean template perfect for any professional application.',
    component: ProfessionalTemplate,
    type: 'free',
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'A clean, two-column layout perfect for tech and design positions.',
    component: ModernTemplate,
    type: 'paid',
    price: 49,
  },
   {
    id: 'tech',
    name: 'Tech Dark-Mode',
    description: 'A sleek, dark-themed template designed for developers.',
    component: TechTemplate,
    type: 'paid',
    price: 49,
  },
  {
    id: 'creative',
    name: 'Creative Bold',
    description: 'A stylish template with a splash of color to make you stand out.',
    component: CreativeTemplate,
    type: 'paid',
    price: 49,
  },
  {
    id: 'elegant',
    name: 'Elegant Serif',
    description: 'A sophisticated design that emphasizes typography and class.',
    component: ElegantTemplate,
    type: 'paid',
    price: 49,
  },
  {
    id: 'visual-cv',
    name: 'Visual CV',
    description: 'A modern resume with a striking visual header and photo.',
    component: VisualCvTemplate,
    type: 'paid',
    price: 49,
  },
]
