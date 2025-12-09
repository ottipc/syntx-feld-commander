'use client';

import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Text } from "@tremor/react";
import { useSyntxData } from './useSyntxData'; 

export function SuccessStories() {
    const { successStories } = useSyntxData();

    if (!successStories || successStories.length === 0) return null;

    const formatTimestamp = (ts: string) => {
        try {
            return new Date(ts).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        } catch {
            return "N/A";
        }
    };

    return (
        <Card className="bg-syntx-dark border-green-400 border-opacity-30 shadow-syntx-glow mt-8">
            <Title className="text-green-400 font-mono tracking-wide">
                FELD-PERFEKTION (100% SUCCESS PROKOTOLL)
            </Title>
            <Table className="mt-4">
                <TableHead>
                    <TableRow className="border-b border-gray-700">
                        <TableHeaderCell className="text-gray-400 font-mono">Zeitpunkt</TableHeaderCell>
                        <TableHeaderCell className="text-gray-400 font-mono">Thema</TableHeaderCell>
                        <TableHeaderCell className="text-gray-400 font-mono text-right">Style</TableHeaderCell>
                        <TableHeaderCell className="text-gray-400 font-mono text-right">Score</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {successStories.map((story) => (
                        <TableRow key={story.timestamp} className="border-b border-gray-800">
                            <TableCell className="text-gray-500 font-mono">{formatTimestamp(story.timestamp)}</TableCell>
                            <TableCell className="text-syntx-neon font-mono">{story.topic.toUpperCase()}</TableCell>
                            <TableCell className="text-gray-300 font-mono text-right">{story.style}</TableCell>
                            <TableCell className="text-green-400 font-mono text-right">
                                {story.score}%
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
