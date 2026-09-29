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
- Worker sender: `website@notify.eastcoastfoamllc.com`.
- Cloudflare **Email Routing** should be enabled only for `notify.eastcoastfoamllc.com`. The verified destination `ecfoam@outlook.com` can then be used by the Worker's `send_email` binding on the Workers Free plan.
- Do **not** onboard the apex `eastcoastfoamllc.com` domain to Cloudflare Email Routing and do not replace its current MX/SPF/DMARC records. Add only the `notify` subdomain under Email Routing so its DNS records are isolated from Casey's existing mail system.
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
8. Cloudflare Email Routing is enabled only for notify.eastcoastfoamllc.com; ecfoam@outlook.com remains a verified destination; the Worker send_email binding succeeds on Workers Free; and a real preview estimate reaches Casey's Outlook inbox.
9. The release PR removes staging noindex/robots blocking and adds/validates sitemap/indexing controls.
10. Cutover and rollback evidence are recorded in LDW business-operations #333.


## Cloudflare ownership recovery

The live domain is currently delegated to an inaccessible legacy Cloudflare account. The customer-owned Cloudflare account is the authoritative future account.

Recovery procedure:

1. Onboard `eastcoastfoamllc.com` into the customer-owned Cloudflare account and keep the zone pending while records are reconstructed.
2. Use Cloudflare quick scan as a starting point only; manually verify mail and service records before activation.
3. Do not copy current public Cloudflare edge IPs into the new zone as an origin.
4. Preserve the current legacy nameservers as short-term rollback evidence:
   - `jack.ns.cloudflare.com`
   - `meg.ns.cloudflare.com`
5. Deploy and validate the production Worker on `workers.dev` before registrar cutover.
6. Verify GoDaddy DNSSEC/DS state before changing nameservers.
7. Change GoDaddy nameservers only after the pending-zone DNS review and Worker preview gates pass.
8. Attach the apex and `www` custom domains to the Worker as soon as the new zone becomes active.
9. Validate website, redirects, TLS, and mail immediately.
10. Reverting to the old nameservers is an emergency short-term rollback only; do not depend on the inaccessible legacy zone for long-term recovery.

Known mail records that must be preserved unless superseded by verified owner changes:

- MX `@` -> `mail.eastcoastfoamllc.com` priority 10
- A `mail` -> `205.209.100.70`
- SPF `v=spf1 a mx ip4:205.209.100.70 include:relay.mailbaby.net ~all`
