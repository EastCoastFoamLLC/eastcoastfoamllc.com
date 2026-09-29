import type { APIRoute } from 'astro';
import services from '../data/services.json';

export const GET: APIRoute = () => {
  const paths = [
    '/', '/services', '/projects', '/about-us', '/reviews', '/service-area',
    '/resources', '/spray-foam-basics', '/contact-us', '/get-a-quote',
    ...services.map(service => '/' + service.slug)
  ];
  const entries = paths.map(path => `<url><loc>https://eastcoastfoamllc.com${path}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`, {
    headers: { 'content-type': 'application/xml; charset=utf-8' }
  });
};
