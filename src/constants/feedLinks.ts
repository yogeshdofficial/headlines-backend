export const feedLinks: Record<string, { fileName: string; url: string }[]> = {
  news: [
    {
      fileName: "news_bbc",
      url: "http://feeds.bbci.co.uk/news/world/rss.xml",
    },
    {
      fileName: "news_google_news",
      url: "https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en",
    },
    {
      fileName: "news_reddit",
      url: "https://www.reddit.com/r/worldnews/.rss",
    },
  ],
  science: [
    {
      fileName: "science_scientific_american",
      url: "http://rss.sciam.com/sciam/60secsciencepodcast",
    },
    {
      fileName: "science_bbc",
      url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
    },
    {
      fileName: "science_reddit",
      url: "https://reddit.com/r/science/.rss",
    },
  ],
  tech: [
    { fileName: "tech_hacker_news", url: "https://news.ycombinator.com/rss" },
    {
      fileName: "science_verge",
      url: "https://www.theverge.com/rss/index.xml",
    },
    {
      fileName: "cnet",
      url: "https://www.cnet.com/rss/news/",
    },
  ],
};
