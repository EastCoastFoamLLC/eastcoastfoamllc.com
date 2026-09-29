# Controlled production migration

This repository is the customer-owned production candidate for East Coast Foam LLC.

## Production indexing and preview safeguards

The production custom domains allow indexing following successful live smoke QA. `robots.txt` advertises `/sitemap.xml`, containing the 17 canonical content URLs. Error pages remain noindexed. The Worker blocks workers.dev previews with `X-Robots-Tag: noindex, nofollow` and a preview-specific `robots.txt`.

The estimate page currently offers direct phone/email contact. The interactive form and ECF_INBOX deployment binding are disabled until real email delivery is proven. The retained backend architecture posts to `/api/estimate` and targets `ecfoam@outlook.com`; with no binding, it returns 503 and direct contact instructions.

The contact email remains `ecfoam@outlook.com`.

## Form email delivery

- Visible contact email: `ecfoam@outlook.com`.
- Estimate destination: `ecfoam@outlook.com`.
- Worker sender: `website@notify.eastcoastfoamllc.com`.
- Cloudflare documents free Worker sends to a verified destination address, but the sender must belong to an Email Service onboarded domain. `ecfoam@outlook.com` is verified; the sender domain `notify.eastcoastfoamllc.com` is not onboarded or proven yet.
- Do **not** onboard the apex `eastcoastfoamllc.com` domain to Email Routing or replace its current MX/SPF/DMARC records. Cloudflare's apex routing setup proposes different MX and SPF records. Investigate whether the `notify` subdomain can be onboarded without touching apex mail; if it cannot, choose a separate approved transport or a temporary contact path before cutover. Do not buy Workers Paid automatically.
- Email attachments are limited to 4 MB total.
- Interactive form release remains blocked until a real submission is received successfully, including visitor details, Reply-To and an attachment. Website production can use the approved temporary contact alternative.

## Legacy media dependency

The 38 approved images referenced by `src/data/site-assets.json` have been copied from the live WordPress host into `public/media/legacy/`, and those references now use local paths. Keep the source files in this repository so the replacement site does not depend on WordPress for its imagery. Revalidate their rendering in the customer-owned Worker preview.

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
8. The sender domain is onboarded without changing apex mail; the Worker send_email binding succeeds on Workers Free; and a real preview estimate reaches Casey's Outlook inbox. If that is unavailable, provide a clearly working temporary contact path and keep the form disabled until delivery is proven.
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

### Pending-zone checkpoint — 2026-09-29

- Customer account: `Ecfoam@outlook.com's Account`; zone status: **pending** on the Free plan.
- Assigned new nameservers: `christina.ns.cloudflare.com` and `javon.ns.cloudflare.com`.
- Registrar still delegates to the old `jack.ns.cloudflare.com` and `meg.ns.cloudflare.com` nameservers; no GoDaddy change has been made.
- Cloudflare Quick Scan imported 19 records: 11 A, 6 AAAA, 1 MX, and 1 TXT. Sixteen A/AAAA records pointed at the old Cloudflare **edge** addresses (`104.21.89.252`, `172.67.166.190`, `2606:4700:3033::6815:59fc`, and `2606:4700:3035::ac43:a6be`). These were removed from the pending zone because they are not origin addresses.
- The imported `mail` A record was changed to **DNS only**. The three remaining pending-zone records are A `mail` -> `205.209.100.70` (DNS only), MX `@` -> `mail.eastcoastfoamllc.com` priority 10, and the existing apex SPF TXT. Recheck the SPF text as served by the new nameservers before cutover.
- The new zone has no apex or `www` website record yet. Attach those hostnames to the validated customer-owned Worker before changing nameservers.
- The scan also found only edge-address placeholders for `ftp`, `pop`, and `smtp`. Confirm whether any of those names are in use before cutover; do not recreate them by guessing an origin.
- New-zone defaults read from Cloudflare: SSL mode `full`, automatic HTTPS rewrites on, Always Use HTTPS off, TLS 1.3 on, minimum TLS 1.0, and DNSSEC disabled. Review TLS settings for the production Worker route before release.
- A public lookup found no DS record at the `.com` parent, but GoDaddy's delegated DNS-management link redirected to a sign-in page. Check DNSSEC and nameservers inside GoDaddy after the authorized user completes that sign-in; do not treat the public lookup as a substitute for registrar review.
- Remaining gates: Worker preview, real form delivery, DNSSEC/DS confirmation in GoDaddy, complete mail/service review, production indexing release, and final rollback evidence.

## Production recovery — 2026-09-29

The owner completed the nameserver cutover to christina.ns.cloudflare.com and javon.ns.cloudflare.com. The new zone is active. Do not change nameservers again during routine recovery.

Initial GitHub build 716b2a29-a788-4f4a-a4eb-51d22f2113f3 succeeded and deployed Worker version 4babcdeb-d13d-4ddb-a04e-ab3fbdaae38f at https://eastcoastfoamllc.ecfoam.workers.dev. Both apex and www custom domains have been attached; Cloudflare created managed proxied AAAA placeholders with origin_worker_id metadata. These managed records must not be edited as ordinary origin records.

The public estimate page temporarily offers phone (843) 263-4933 and ecfoam@outlook.com only. The interactive form is retained in source but is not rendered, and the unproven ECF_INBOX binding is removed from deployment configuration. The API returns 503 with the direct contact alternative. Real Outlook delivery, visitor Reply-To, and attachment receipt remain unproven; restore the form/binding only after sender onboarding and end-to-end delivery verification without changing apex mail or buying a plan.

Worker routing handles www and HTTP canonical redirects before assets, preserving path and query. Both custom domains are recorded in wrangler.jsonc. Wrangler is now ^4.144.0 with package-lock updated, satisfying the >=4.135.0 Preview Builds requirement. Preview builds will be enabled after CI and production smoke verification.

Authoritative new-name-server responses preserve mail A 205.209.100.70, apex MX priority 10, and exact existing SPF. Public parent DS is absent; the owner independently reported no DS. Legacy ftp/pop/smtp service usage is still unconfirmed; do not guess origins. The preserved mail hostname remains available.

The earlier pending-zone instructions above are historical checkpoints. Production recovery now takes priority; indexing will be released only after the current production deployment passes route/media/TLS smoke checks.

Rollback: use customer-owned Worker versions and GitHub revert/redeployment with these custom domains. Version 4babcdeb-d13d-4ddb-a04e-ab3fbdaae38f is the first working customer-owned asset deployment, but its form delivery is unproven. The former jack/meg nameservers are historical emergency evidence only, not a routine rollback plan after the owner cutover. Keep WordPress available during stabilization.

### Production smoke and indexing release

Recovery PR #3 passed CI run 36642726392 and merged as 6e2a4f1b28f9237a7dd2e51592d9cfacb6e1c14f. Cloudflare deployed recovery version da74b15c-0d5e-44ba-8df1-010627bbe244, a known working rollback version with direct contact and staging indexing protection.

Live smoke at 2026-09-29T23:02:35Z passed 17 content routes, 38 images (content type and byte lengths), 18 legacy 301 redirects, www/HTTP-to-HTTPS-apex redirects preserving path/query, five missing/excluded routes returning 404, and disabled form API returning 503. Live desktop/mobile browser QA passed all 28 checks. Both domains passed normal HTTPS certificate validation. Javon authoritative DNS preserves mail A/MX/SPF; 1.1.1.1 confirms christina/javon NS; .com parent query returns no DS.

The indexing release allows production crawling, adds a 17-URL sitemap, preserves production canonicals, and blocks workers.dev preview indexing at the Worker. Search Console submission/ownership verification remains a separate owner account action; the public sitemap is ready for discovery.
