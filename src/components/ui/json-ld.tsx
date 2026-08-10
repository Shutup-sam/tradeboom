export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': 'https://www.tradeboom.in/#organization',
        name: 'Trade Boom',
        url: 'https://www.tradeboom.in',
        logo: 'https://www.tradeboom.in/logo.svg',
        image: 'https://www.tradeboom.in/founders.jpg',
        description:
          'Trade Boom provides stock market education, price action trading courses, live mentorship, and community for retail traders.',
        founders: [
          {
            '@type': 'Person',
            name: 'Ankit Kumar',
          },
          {
            '@type': 'Person',
            name: 'Rishav Kumar',
          },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'C-609, 6th Floor, Tower C, Spectrum Mall, Noida Sector 75',
          addressLocality: 'Noida',
          addressRegion: 'Uttar Pradesh',
          postalCode: '201301',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.tradeboom.in/#website',
        url: 'https://www.tradeboom.in',
        name: 'Trade Boom',
        publisher: {
          '@id': 'https://www.tradeboom.in/#organization',
        },
      },
      {
        '@type': 'Course',
        name: 'Price Action & Market Structure Masterclass',
        description: 'Comprehensive trading course covering price action, market structure, and risk management.',
        provider: {
          '@id': 'https://www.tradeboom.in/#organization',
        },
      },
      {
        '@type': 'Course',
        name: 'Options Trading Frameworks',
        description: 'Advanced options trading strategies, greeks, and volatility risk controls.',
        provider: {
          '@id': 'https://www.tradeboom.in/#organization',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
