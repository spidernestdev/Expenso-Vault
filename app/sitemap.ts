import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://expenso-vault.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://expenso-vault.vercel.app/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://expenso-vault.vercel.app/register",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
  url: "https://expenso-vault.vercel.app/privacy-policy",
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.3,
},
{
  url: "https://expenso-vault.vercel.app/terms",
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.3,
},
{
  url: "https://expenso-vault.vercel.app/cookie-policy",
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.3,
},
  ];
}