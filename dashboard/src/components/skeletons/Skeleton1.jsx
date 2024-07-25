import React from 'react'
import { Skeleton } from '@mantine/core';

export default function Skeleton1() {
    return (
        <>
            <Skeleton height={10} width="40%"/>
            <Skeleton height={10} mt={6} width="95%"/>
            <Skeleton height={10} mt={6} width="80%" />
            <Skeleton height={10} mt={6} width="100%" />
        </>
    )
}
