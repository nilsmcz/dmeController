import React from 'react'
import { Skeleton } from '@mantine/core';

export default function Skeleton2() {
    return (
        <>
            <Skeleton height={25} circle mb="xl" />
            <Skeleton height={10} width="100px" />
            <Skeleton height={10} mt={6} width="300px" />
            <Skeleton height={10} mt={6} width="260px"/>
            <Skeleton height={10} mt={6} width="340px"/>
        </>
    )
}
