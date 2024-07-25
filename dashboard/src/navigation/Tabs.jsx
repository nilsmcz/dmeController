import React from 'react'
import { Tabs, rem } from '@mantine/core';
import History from '../screens/History';

import { useState } from 'react';
import Overview from '../screens/Overview';
import Settings from '../screens/Settings';

export default function TabsLayout() {

    return (
        <Tabs defaultValue="overview" color="rgba(13, 13, 13, 1)">
            <Tabs.List grow justify="space-between">
                <Tabs.Tab value="history" style={{ flex: 1, textAlign: 'center' }}>
                    Historie
                </Tabs.Tab>
                <Tabs.Tab value="overview" style={{ flex: 1, textAlign: 'center' }}>
                    Übersicht
                </Tabs.Tab>
                <Tabs.Tab value="settings" style={{ flex: 1, textAlign: 'center' }}>
                    Einstellungen
                </Tabs.Tab>
            </Tabs.List>
        
            <Tabs.Panel value="history">
                <History/>
            </Tabs.Panel>
        
            <Tabs.Panel value="overview">
                <Overview/>
            </Tabs.Panel>
        
            <Tabs.Panel value="settings">
                <Settings/>
            </Tabs.Panel>
        </Tabs>
    );
}
