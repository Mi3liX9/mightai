// import Parser from "npm:rss-parser";

// const parser = new Parser();

// interface Enclosure {
//   url: string;
//   type: string;
//   length: string;
// }

// interface Item {
//   creator?: string;
//   title: string;
//   link: string;
//   pubDate: string;
//   author?: string;
//   enclosure: Enclosure;
//   content: string;
//   contentSnippet: string;
//   guid: string;
//   isoDate: string;
// }

// interface PaginationLinks {
//   self: string;
// }

// interface Feed {
//   items: Item[];
//   feedUrl: string;
//   paginationLinks: PaginationLinks;
//   title: string;
//   description: string;
//   link: string;
//   language: string;
//   lastBuildDate: string;
// }

// export const feed = (await parser.parseURL(
//   "https://www.windowscentral.com/feed.xml/"
// )) as unknown as Feed;
