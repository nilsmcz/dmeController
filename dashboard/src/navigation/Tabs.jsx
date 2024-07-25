import React from 'react'
import { Tabs, rem } from '@mantine/core';
import { useState } from 'react';

//screens:
import History from '../screens/History';
import Overview from '../screens/Overview';
import Settings from '../screens/Settings';


//icons:
import settings from '../assets/icons/settings.svg';
import history from '../assets/icons/history.svg';
import home from '../assets/icons/home.svg';

export default function TabsLayout() {

    const tabSize = 5;

    return (
        <Tabs defaultValue="overview" color="rgba(13, 13, 13, 1)">
            <Tabs.List grow justify="space-between">
                <Tabs.Tab value="history" style={{ flex: 1, textAlign: 'center' }} leftSection={<img src={history} alt="history icon" />}>
                    <div style={{display:"flex", paddingTop:tabSize, paddingBottom:tabSize}}>Historie</div>
                </Tabs.Tab>
                <Tabs.Tab value="overview" style={{ flex: 1, textAlign: 'center' }} leftSection={<img src={home} alt="home icon" />}>
                    Übersicht
                </Tabs.Tab>
                <Tabs.Tab value="settings" style={{ flex: 1, textAlign: 'center' }} leftSection={<img src={settings} alt="settings icon" />}>
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
