"use client"
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import React, { ReactNode } from 'react'


type Props = {
    header: ReactNode | string ,
    body:ReactNode,
    footer?: ReactNode

}
const CardInnerWrapper = ({header , body , footer} : Props) => {
  return (
    <>
    <Card className='h-[77vh]' >
    <CardHeader >
        {typeof header === 'string' ? (<div className='text-2xl text-pink'>
            {header}
        </div>) : <>{header}</>
        
        
        }
    </CardHeader>
    <Divider/>
    <CardBody>
            {body}
    </CardBody>
    {footer}
</Card>
</>
  )
}

export default CardInnerWrapper
