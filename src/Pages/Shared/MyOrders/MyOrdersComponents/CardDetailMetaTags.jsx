// Add these Open Graph meta tags to your card detail pages
// Place in the <head> section of your HTML or use Next.js Head component


export function CardDetailMetaTags({ card }) {
  const cardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/cards/${card.id}`;
  const cardImage = card.frontImageUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/default-card-image.jpg`;
  const cardDescription = `${card.brand} ${card.title} - Grade: ${card.grade} | Card #${card.cardNumber || 'N/A'} | Premium trading card collection`;
  
  return (
    <head>
      {/* Basic Meta Tags */}
      <title>{card.title} - {card.brand} | Card Collection</title>
      <meta name="description" content={cardDescription} />
      
      {/* Open Graph Meta Tags for Facebook */}
      <meta property="og:type" content="product" />
      <meta property="og:title" content={`${card.title} - ${card.brand}`} />
      <meta property="og:description" content={cardDescription} />
      <meta property="og:image" content={cardImage} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="600" />
      <meta property="og:image:alt" content={`${card.title} trading card`} />
      <meta property="og:url" content={cardUrl} />
      <meta property="og:site_name" content="Your Card Store Name" />
      <meta property="og:locale" content="en_US" />
      
      {/* Product specific Open Graph tags */}
      <meta property="product:brand" content={card.brand} />
      <meta property="product:availability" content="in stock" />
      <meta property="product:condition" content="new" />
      <meta property="product:price:amount" content={card.price} />
      <meta property="product:price:currency" content="USD" />
      
      {/* Twitter Card Tags (optional but recommended) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${card.title} - ${card.brand}`} />
      <meta name="twitter:description" content={cardDescription} />
      <meta name="twitter:image" content={cardImage} />
      
      {/* Additional tags for better SEO */}
      <meta name="keywords" content={`${card.brand}, ${card.title}, trading cards, collectibles, grade ${card.grade}`} />
      <link rel="canonical" href={cardUrl} />
    </head>
  );
}

// Example usage in your card detail page component:
export default function CardDetailPage({ card }) {
  return (
    <>
      <CardDetailMetaTags card={card} />
      <div className="container mx-auto px-4 py-8">
        {/* Your card detail content */}
        <h1>{card.title}</h1>
        <img src={card.frontImageUrl} alt={card.title} />
        {/* ... rest of your card details */}
      </div>
    </>
  );
}

// Alternative: If you're using a different framework, here's the raw HTML meta tags:

<head>
  <title>${card.title} - ${card.brand} | Card Collection</title>
  <meta name="description" content="${card.brand} ${card.title} - Grade: ${card.grade} | Card #${card.cardNumber} | Premium trading card collection" />
  
  {/* <!-- Open Graph Meta Tags --> */}
  <meta property="og:type" content="product" />
  <meta property="og:title" content="${card.title} - ${card.brand}" />
  <meta property="og:description" content="${card.brand} ${card.title} - Grade: ${card.grade} | Card #${card.cardNumber} | Premium trading card collection" />
  <meta property="og:image" content="${card.frontImageUrl}" />
  <meta property="og:image:width" content="400" />
  <meta property="og:image:height" content="600" />
  <meta property="og:image:alt" content="${card.title} trading card" />
  <meta property="og:url" content="${window.location.origin}/cards/${card.id}" />
  <meta property="og:site_name" content="Your Card Store Name" />
  
  {/* <!-- Product Tags --> */}
  <meta property="product:brand" content="${card.brand}" />
  <meta property="product:availability" content="in stock" />
  <meta property="product:condition" content="new" />
  <meta property="product:price:amount" content="${card.price}" />
  <meta property="product:price:currency" content="USD" />
</head>
