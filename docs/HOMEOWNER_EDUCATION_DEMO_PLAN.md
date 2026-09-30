# East Coast Foam homeowner education demo plan

Status: roadmap / concept accumulation  
Production authority: none  
Primary roadmap: #11 ROADMAP-001  
Education implementation: #12 EDU-001

## Purpose

Accumulate enough high-quality, sourced homeowner education and verified East Coast Foam service detail to build one coherent visual demo for Casey before broad production rollout.

The demo is not a second website and should not become a permanent `/future` namespace.

Preferred implementation:
- feature branch in `EastCoastFoamLLC/eastcoastfoamllc.com`;
- Cloudflare branch Preview;
- no production navigation;
- no indexing;
- normal CI/security/Preview validation;
- Casey reviews a realistic customer journey;
- accepted portions return as normal bounded production PRs.

## Demo threshold

Do not start the visual demo merely because one page draft exists.

Start when we have enough material to make these pieces feel connected:

1. problem-first homeowner entry point;
2. existing spray-foam inspection / second-opinion service;
3. signs/symptoms education;
4. mold/moisture education;
5. open vs closed cell comparison;
6. installation / what-to-expect;
7. cost-factor education;
8. contractor-question checklist;
9. at least one project/case-study layout;
10. at least 3 useful visuals/diagrams;
11. enough confirmed Casey practices to avoid demoing fictional services.

## Proposed demo journey

### Home / homeowner problem navigator

Prompt:

**What are you noticing?**

Candidate cards:
- My upstairs is too hot
- My electric bill is high
- My attic/crawl space smells musty
- I see condensation or moisture
- My existing insulation looks damaged
- I already have spray foam and want it checked
- I am building/remodeling
- I am not sure what I need

Each goes to education first and then a relevant estimate path.

### Existing spray foam / second opinion

Working page:

**Not sure the spray foam you already have is doing its job?**

Explain:
- ECF already audits/inspects spray-foam work installed by other contractors;
- visible foam can still have continuity/application/moisture-system issues;
- homeowner-friendly warning signs;
- what an inspection may look at;
- what the inspection does **not** imply;
- clear CTA.

Final service name/scope remains Casey-gated.

### Mold / moisture education

Working page:

**Mold, moisture and insulation: what foam can — and cannot — fix**

Interactive/simple diagram:
- roof/bulk water;
- plumbing;
- humid-air leakage / condensation;
- crawl-space / ground vapor.

Core line:

**Fix active water first.**

### Existing foam warning signs

Use a real-photo + diagram hybrid when possible.

Cards:
- pull-away / shrinkage;
- gap / void;
- missed transition;
- adhesion concern;
- sticky/friable/discolored;
- persistent unusual odor;
- continuing humidity/condensation.

Always say:
**"These signs mean inspect — not automatically remove."**

### Conditioned attic education

Visual:
- roof deck;
- foam boundary;
- ducts/HVAC;
- moisture-control/conditioning strategy.

Core concept:
**Spraying the roof deck and creating a well-managed conditioned attic are related, but not identical.**

### Comparison / buying education

Plain-English:
- open vs closed cell;
- common use cases;
- tradeoffs;
- why assembly/product/climate matter;
- no universal "best."

### Cost education

Explain drivers, not fake numbers.

Only show ECF ranges if Casey supplies real current pricing evidence and approves publication.

### What to expect

Before / during / after:
- assessment;
- written scope;
- prep;
- installation;
- quality checks;
- cleanup;
- manufacturer/product-specific ventilation/re-entry.

### Ask any contractor

Checklist can become:
- web page;
- printable PDF later;
- estimator follow-up resource.

## Visual inventory

### Custom illustrations to create

1. Lowcountry house symptom cutaway.
2. Good foam vs needs-inspection comparison.
3. Four moisture paths.
4. Conditioned attic whole-system diagram.
5. Spray foam audit / "what we inspect" process diagram.

### Real ECF photos to request

- good roof-deck foam;
- good wall/framing coverage;
- transitions/corners;
- before/after attic;
- before/after crawl;
- old wet/damaged insulation;
- removal/cleanup;
- actual audit/second-opinion job;
- pull-away;
- gaps/voids;
- under-application;
- corrective repair;
- crew/equipment/protection;
- any actual meter/tool use Casey wants shown.

## Image policy

Allowed:
- real ECF project photography;
- clearly illustrative diagrams;
- generated technical illustrations that cannot be mistaken for a documented ECF job.

Avoid:
- fake photorealistic "failure evidence";
- sensational mold imagery;
- stock photos presented as ECF work;
- showing diagnostic tools ECF does not use;
- unsafe PPE/work practices in generated imagery.

## Casey review packet

When demo threshold is met, send Casey one preview URL and a short review packet.

Ask him to mark:

- Accurate / keep
- Accurate but change wording
- We do this but do not want to advertise it
- We do not do this
- Need more detail
- Need a real photo
- Good future idea

Specific decisions:
- final name for foam audit/second-opinion service;
- inspection deliverables;
- repair/removal boundaries;
- preferred CTA;
- product/manufacturer details;
- moisture/RH/thickness tools;
- re-entry guidance;
- thermal/ignition barrier practice;
- warranty language;
- project photos/testimonials;
- whether homebuyer/pre-purchase spray-foam inspection is a service he wants.

## Release strategy

Do not ship the whole demo as one giant production change.

After Casey review, split accepted content into bounded releases:

1. Education navigation / Start Here
2. Spray Foam Inspection / Second Opinion
3. Existing foam warning signs
4. Mold/moisture education
5. Attic/crawl-space education
6. Comparison / buying guides
7. Project proof/case studies
8. Guided Estimate improvement
9. Search/G.A.S.-measured refinement

Each release:
- normal branch/PR;
- security CI;
- Cloudflare Preview;
- mobile/desktop QA;
- production merge;
- post-deploy health;
- later WQT/G.A.S. remeasurement when available.

## Success test

The demo succeeds if an ordinary homeowner can answer:

- "Does something seem wrong?"
- "Could my existing foam be part of the problem?"
- "What else could cause this?"
- "What would ECF inspect?"
- "What are my options?"
- "What happens next?"

without needing to understand building-science jargon first.
