'use client';

import { Card, Title, List, ListItem, Flex, Badge, Text } from "@tremor/react";
import { useSyntxData } from './useSyntxData'; 

export function TopFailingTopics() {
    const { topFailingTopics } = useSyntxData();

    if (!topFailingTopics || topFailingTopics.length === 0) return null;

    return (
        <Card className="bg-syntx-dark border-red-500 border-opacity-30 shadow-syntx-glow mt-8">
            <Title className="text-red-400 font-mono tracking-wide">
                FELD-VERLUST-ANALYSE (TOP 5 RISIKEN)
            </Title>
            <List className="mt-4">
                {topFailingTopics.slice(0, 5).map((item, index) => (
                    <ListItem key={item.topic} className="border-b border-gray-800 py-3">
                        <Flex justifyContent="start" className="space-x-4">
                            <Badge 
                                color="red" 
                                className="font-mono"
                            >
                                #{index + 1}
                            </Badge>
                            <Text className="text-gray-300 font-mono flex-grow">{item.topic.toUpperCase()}</Text>
                        </Flex>
                        <Flex justifyContent="end" className="space-x-4">
                            <Text className="text-red-400 font-mono">{item.failures} Fehler</Text>
                        </Flex>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}
