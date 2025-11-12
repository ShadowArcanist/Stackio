/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://stackio.shadowarcanist.com",
  outDir: "out",
  generateRobotsTxt: true,
  // optional
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
  },
};
