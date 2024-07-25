import React from 'react'
import { Timeline, Text } from '@mantine/core';

export default function History() {
    return (
        <div style={{display:"flex", justifyContent:"start", flexDirection:"column", alignItems:"start", padding:"15px", gap:"5px"}}>

            <Timeline active={1} bulletSize={24} lineWidth={3} reverseActive color="gray">
                <Timeline.Item title="New branch">
                    <Text c="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
                    <Text size="xs" mt={4}>2 hours ago</Text>
                </Timeline.Item>
            
                <Timeline.Item title="Commits">
                    <Text c="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
                    <Text size="xs" mt={4}>52 minutes ago</Text>
                </Timeline.Item>
            
                <Timeline.Item title="Pull request" lineVariant="dashed" color="red">
                    <Text c="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
                    <Text size="xs" mt={4}>34 minutes ago</Text>
                </Timeline.Item>
            
                <Timeline.Item title="Code review">
                    <Text c="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
                    <Text size="xs" mt={4}>12 minutes ago</Text>
                </Timeline.Item>
            </Timeline>

        </div>
      );
}
