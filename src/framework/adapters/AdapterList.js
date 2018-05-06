import RssFeedAdapter from "./RssFeedAdapter";

export let stuffRssAdapter = new RssFeedAdapter('https://stuff.co.nz/', {
  id: 'stuff',
  name: "Stuff",
  description: "Top Stories from Stuff.co.nz. New Zealand, world, sport, business &amp; entertainment news on Stuff.co.nz.",
  country: "nz",
  category: "general"
});

export let theStandardRssAdapter = new RssFeedAdapter({
  rssFeedEndpointBase: 'https://thestandard.org.nz/', sourceObject: {
    id: 'the-standard',
    name: "The Standard",
    description: "",
    country: "nz",
    category: "general"
  },
  rssArticleMappings: {
    publishedAt: 'pubDate',
    url: 'link',
    author: 'dc:creator'
  }
});

export let theSpinoffRssAdapter = new RssFeedAdapter({
  rssFeedEndpointBase: 'https://thespinoff.co.nz/', sourceObject: {
    id: 'the-spinoff',
    name: "The Spinoff",
    description: "",
    country: "nz",
    category: "general"
  },
  rssArticleMappings: {
    publishedAt: 'pubDate',
    url: 'link',
    author: 'dc:creator'
  },
  rssFeeds: [
    {category: 'business', endpoint: 'category/business/feed/'},
    {category: 'politics', endpoint: 'category/politics/feed/'},
    {category: 'technology', endpoint: 'category/science/feed/'}
  ]
});


export let yahooRssAdapter = new RssFeedAdapter({
  rssFeedEndpointBase: 'https://nz.news.yahoo.com/', sourceObject: {
    id: 'yahoo',
    name: "Yahoo",
    description: "",
    country: "nz",
    category: "general"
  }
});

export let theGuardianRssAdapter = new RssFeedAdapter({
  rssFeedEndpointBase: 'https://www.theguardian.com/', sourceObject: {
    id: 'the-guardian',
    name: "The Guardian",
    description: "",
    country: "nz",
    category: "general"
  }
});

export let radioNzRssAdapter = new RssFeedAdapter({
  rssFeedEndpointBase: 'https://www.radionz.co.nz/rss/', sourceObject: {
    id: 'radionz',
    name: "Radio NZ",
    description: "The Latest Business headlines from Radio New Zealand News.",
    country: "nz",
    category: "general"
  },
  rssFeeds: [
    {category: 'business', endpoint: 'business.xml'},
    {category: 'politics', endpoint: 'political.xml'},
    {category: 'international', endpoint: 'world.xml'},
    {category: 'technology', endpoint: 'media-technology.xml'},
    {category: 'sport', endpoint: 'sport.xml'}
  ]
});

export let nzHeraldRssAdapter = new RssFeedAdapter({
  rssFeedEndpointBase: 'http://rss.nzherald.co.nz/rss/xml/', sourceObject: {
    id: 'nz-herald',
    name: "New Zealand Herald",
    description: "Latest breaking news articles, photos, video, blogs, reviews, analysis, opinion and reader comment from New Zealand and around the World.",
    country: "nz",
    category: "general"
  },
  rssFeeds: [
    {category: 'business', endpoint: 'nzhrsscid_000000003.xml'},
    {category: 'entertainment', endpoint: 'nzhrsscid_001501119.xml'},
    {category: 'international', endpoint: 'nzhrsscid_000000002.xml'},
    {category: 'technology', endpoint: 'nzhrsscid_000000005.xml'},
    {category: 'sport', endpoint: 'nzhrsscid_000000080.xml'}
  ]
});
