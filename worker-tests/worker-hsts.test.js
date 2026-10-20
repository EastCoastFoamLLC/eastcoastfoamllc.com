import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../src/worker.js';

const assets = {
  fetch: async () => new Response('asset body', { status: 200 })
};

test('adds exactly one year of host-only HSTS to the apex response', async () => {
  const response = await worker.fetch(new Request('https://eastcoastfoamllc.com/'), { ASSETS: assets });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('strict-transport-security'), 'max-age=31536000');
  assert.equal(await response.text(), 'asset body');
});

test('adds host-only HSTS to Worker API error responses', async () => {
  const response = await worker.fetch(new Request('https://eastcoastfoamllc.com/api/estimate'), { ASSETS: assets });

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('strict-transport-security'), 'max-age=31536000');
});

test('adds host-only HSTS to the www redirect without broadening its scope', async () => {
  const response = await worker.fetch(new Request('https://www.eastcoastfoamllc.com/contact-us'), { ASSETS: assets });

  assert.equal(response.status, 301);
  assert.equal(response.headers.get('strict-transport-security'), 'max-age=31536000');
  assert.equal(response.headers.get('location'), 'https://eastcoastfoamllc.com/contact-us');
});

test('does not send HSTS on workers.dev previews', async () => {
  const response = await worker.fetch(new Request('https://eastcoastfoamllc.preview.workers.dev/'), { ASSETS: assets });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('strict-transport-security'), null);
});
