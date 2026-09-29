# Controlled production migration

This repository is the customer-owned production candidate for East Coast Foam LLC.

## Staging safeguards

The initial seed intentionally remains **noindex/nofollow** and blocks crawling in `robots.txt`.
Those controls are removed only in the final release PR immediately before the approved domain cutover.

The Guided Estimate posts to the same Cloudflare Worker at /api/estimate. The Worker sends the request to the fixed verified destination ecfoam@outlook.com through a destination-restricted Cloudflare Email Service binding.

The contact email remains `ecfoam@outlook.com`.

## Form email delivery

- Visible contact email: `ecfoam@outlook.com`.
- Estimate destination: `ecfoam@outlook.com`.
- Worker sender: `website@eastcoastfoamllc.com`.
- Cloudflare **Email Sending** may be onboarded for the ECF domain.
- Do **not** enable Cloudflare Email Routing or replace the current root MX/SPF records.
- Email attachments are limited to 4 MB total.
- Production release remains blocked until a real preview submission is received successfully.

## Legacy media dependency

The current approved images are still served from the legacy WordPress host. Before WordPress retirement, approved originals must be copied into customer-owned storage/repository assets, references updated, and the site revalidated.

## Legacy URL preservation

`public/_redirects` contains the currently proposed one-to-one redirects for legacy WordPress article/landing URLs. Service/core URLs are preserved directly.

## Production release gate

Do not route `eastcoastfoamllc.com` to this deployment until:

1. GitHub CI passes.
2. Customer-owned Cloudflare preview passes desktop/mobile QA.
3. Complete Cloudflare DNS zone is exported and mail records are preserved.
4. Legacy image dependency is eliminated.
5. WordPress rollback remains available.
6. Custom-domain SSL/routing is verified.
7. No placeholder/demo/concept content is present.
8. Cloudflare Email Sending is onboarded without replacing the existing root MX; ecfoam@outlook.com is verified as the destination; and a real preview estimate reaches Casey's Outlook inbox.
9. The release PR removes staging noindex/robots blocking and adds/validates sitemap/indexing controls.
10. Cutover and rollback evidence are recorded in LDW business-operations #333.
