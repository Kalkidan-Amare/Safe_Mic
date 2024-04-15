import React from 'react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
function Science() {
  return (
    <Card className={cn('p-8 my-36')}>
    <CardTitle className="my-6">
      What science says about Therapy
    </CardTitle>
    <CardContent className='leading-7 font-sans'>
    Therapy, supported by research, offers hope for those facing mental health challenges.
    Approaches like CBT and DBT effectively address depression, anxiety, and PTSD. 
    It fosters healthier coping mechanisms and enhances relationships.
    Stress reduction benefits cardiovascular health and immunity.
    Therapy is preventive, equipping individuals with resilience. 
    Neuroscientific studies highlight its transformative effects on the brain. 
    Culturally sensitive therapy promotes personal growth and mental well-being.

    </CardContent>
  </Card>
  )
}

export default Science