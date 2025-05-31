import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Chip, Link, Skeleton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';

interface GitHubRepo {
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    topics: string[];
}

export default function GitHubStats({ username = 'cjmcgraw', repo = 'rlmcgraw.com' }) {
    const [repoData, setRepoData] = useState<GitHubRepo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.github.com/repos/${username}/${repo}`)
            .then(res => res.json())
            .then(data => {
                setRepoData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch GitHub data:', err);
                setLoading(false);
            });
    }, [username, repo]);

    if (loading) {
        return (
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="rectangular" height={40} sx={{ mt: 2 }} />
                </CardContent>
            </Card>
        );
    }

    if (!repoData) return null;

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <GitHubIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" component="span">
                        Source Code
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                    {repoData.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Chip
                        icon={<StarIcon />}
                        label={`${repoData.stargazers_count} stars`}
                        size="small"
                        variant="outlined"
                    />
                    <Chip
                        icon={<ForkRightIcon />}
                        label={`${repoData.forks_count} forks`}
                        size="small"
                        variant="outlined"
                    />
                    {repoData.language && (
                        <Chip
                            label={repoData.language}
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    )}
                </Box>

                {repoData.topics && repoData.topics.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {repoData.topics.map(topic => (
                            <Chip
                                key={topic}
                                label={topic}
                                size="small"
                                sx={{ fontSize: '0.75rem' }}
                            />
                        ))}
                    </Box>
                )}

                <Link
                    href={repoData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'inline-flex', alignItems: 'center' }}
                >
                    View on GitHub
                    <GitHubIcon sx={{ ml: 0.5, fontSize: '1rem' }} />
                </Link>
            </CardContent>
        </Card>
    );
}

// Usage example:
// Add to your home page or footer:
// <GitHubStats username="cjmcgraw" repo="rlmcgraw.com" />