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
  }
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
  rssFeedEndpointBase: 'https://www.radionz.co.nz/', sourceObject: {
    id: 'radionz',
    name: "Radio NZ",
    description: "The Latest Business headlines from Radio New Zealand News.",
    country: "nz",
    category: "general"
  }
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
    {}
  ]
});
