import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    githubRepo?: string;
}

const name = "Carl McGraw"
const DEFAULT_TITLE = `${name} - Software Engineer, Statistician and ML Specialist`

export default function SEO({
    title = DEFAULT_TITLE,
    description = `Personal website of ${name} - Software engineer specializing in ML for production systems, Google Cloud, and interactive demonstrations`,
    keywords = "software engineer, machine learning, ML, Google Cloud, GCP, interactive demos, Bayesian inference",
    image = "https://rlmcgraw.com/og-image.png",
    url = "https://rlmcgraw.com",
    type = "website",
    githubRepo = "cjmcgraw/rlmcgraw.com"
}: SEOProps) {
    const fullTitle = title === DEFAULT_TITLE
        ? title
        : `${title} | ${name}`

    return (
        <Helmet>
            {/* Basic meta tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={name} />
            <link rel="canonical" href={url} />

            {/* Open Graph tags for social media */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="rlmcgraw" />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Additional SEO tags */}
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />

            {/* GitHub specific meta tags */}
            {githubRepo && (
                <>
                    <meta name="github:user" content="cjmcgraw" />
                    <meta name="github:repo" content={githubRepo} />
                    <meta name="github:card" content="summary" />
                </>
            )}

            {/* Structured Data for Person/Developer */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": {name},
                    "alternateName": "cjmcgraw",
                    "url": "https://rlmcgraw.com",
                    "image": image,
                    "jobTitle": "Software Engineer",
                    "worksFor": {
                        "@type": "Organization",
                        "name": "Self-Employed / Freelance"
                    },
                    "description": "Software engineer specializing in ML for production systems, Google Cloud Platform, and interactive demonstrations",
                    "sameAs": [
                        "https://github.com/cjmcgraw",
                        "https://linkedin.com/in/rlmcgraw",
                        "https://github.com/cjmcgraw/rlmcgraw.com"
                    ],
                    "knowsAbout": [
                        "Machine Learning",
                        "TensorFlow",
                        "Google Cloud Platform",
                        "Python",
                        "Java",
                        "JavaScript",
                        "TypeScript",
                        "Docker",
                        "Kubernetes",
                        "Apache Kafka",
                        "Data Engineering",
                        "MLOps"
                    ],
                    "alumniOf": {
                        "@type": "CollegeOrUniversity",
                        "name": "University of Washington"
                    }
                })}
            </script>

            {/* Structured Data for the Website */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "url": "https://rlmcgraw.com",
                    "name": name,
                    "description": description,
                    "author": {
                        "@type": "Person",
                        "name": name
                    },
                    "publisher": {
                        "@type": "Person",
                        "name": name
                    },
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://rlmcgraw.com/search?q={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                })}
            </script>

            {/* GitHub Repository Structured Data */}
            {githubRepo && (
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareSourceCode",
                        "name": "rlmcgraw.com",
                        "url": `https://github.com/${githubRepo}`,
                        "author": {
                            "@type": "Person",
                            "name": name,
                            "alternateName": "cjmcgraw"
                        },
                        "programmingLanguage": ["TypeScript", "JavaScript", "Python"],
                        "runtimePlatform": "Node.js",
                        "codeRepository": `https://github.com/${githubRepo}`,
                        "license": "https://github.com/cjmcgraw/rlmcgraw.com/blob/master/LICENSE"
                    })}
                </script>
            )}
        </Helmet>
    );
}