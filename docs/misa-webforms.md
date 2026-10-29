# MISA Webforms — Consultation Intake

Implementation branch: `feature/misa-webform-discovery`. The original integration created and enabled nine new Webforms in the live CRM with the user's permission; it did not deploy the website to production. The observed subscription was **Standard**, and test leads were received without using OpenAPI or upgrading to Professional.

## Implemented flow

1. `MisaAttributionProvider` in the layout captures a channel/staff-code pair from `utm_source=channel/CRM_CODE` on every page.
2. The most recent **valid** pair within the same tab wins and replaces both values together; a missing or invalid pair does not overwrite a valid one. `sessionStorage` retains the owner in `kvc.misa-staff-code` and the raw referral string in `kvc.misa-utm-source`. A stored owner is only paired with a stored raw source when the source resolves to that same owner. Sessions written before source retention (owner only) remain valid with a blank source. There are no long-lived cookies or cross-tab synchronization.
3. `ContactForm` sends the captured owner (`staff_code`) and the retained raw referral (`utm_source`) with the user input. It never sends a numeric CRM source ID.
4. The KVC server retains name/email/phone/service/message validation, consent checks, the honeypot, spam-pattern checks, and the limit of five submissions per IP per hour. It revalidates the submitted pair against the active staff allowlist and derives a CRM source only from the verified channel map. A client-supplied numeric source ID is ignored.
5. `lib/misa-webforms.ts` selects the corresponding form and forwards a native MISA POST. It adds `LeadSourceID` only when the server resolved a known channel. It does not write new requests to Sanity, call OpenAPI, or require a client ID, client secret, or API key.

**Why the browser does not submit directly:** bypassing browser validation caused MISA to store a record without a name, even though the Webform marked that field as required. The KVC server is the website's input-validation boundary; MISA's public endpoint is not assumed to provide equivalent spam protection.

## Staff and default intake owner

| CRM code | Webform owner |
|---|---|
| NV00001 | Nguyễn Trúc Mai |
| NV00002 | Nguyễn Khánh Huyền |
| NV00004 | Dương Thị Ngọc Lộc |
| NV00005 | Nguyễn Hoàng Long — default intake owner |
| NV00007 | Đỗ Chí Minh |
| NV00008 | Jolie Y Nguyen |
| NV00010 | Phan Bảo Nhi |
| NV00012 | Phương Nguyên |
| NV00013 | Nguyễn Minh Đức |

Each code has one form named `KVC Website - CRM_CODE`. NV00005's form also handles default intake; there is no tenth form. NV00003 and NV00009 are deactivated; MISA SUPPORT does not receive website assignments.

Example: `https://kvcglobal.vn/vi/du-hoc?utm_source=zalo%2FNV00012`. After navigating to the contact page in the same tab, NV00012 remains the link-attributed owner and the retained referral supplies `LeadSourceID=8`. Staff codes are case-sensitive and must match exactly; the source must contain exactly one `/` with a nonempty channel. A fresh tab without a valid referral or retained owner uses NV00005 and sends no `LeadSourceID`; removing UTM parameters from an already attributed tab does not reset its pair. Link attribution is not proof of consultation history or staff identity.

## Lead sources

The server derives the CRM source from the channel part of the retained referral; the browser never supplies a numeric source ID. Channel lookup trims surrounding whitespace and ignores case; otherwise the name must match one of the six. Source IDs are sent as strings in `LeadSourceID`; they are CRM lead-source record IDs, not Webform IDs.

| Channel | `LeadSourceID` |
|---|---|
| zalo | `8` |
| facebook | `9` |
| instagram | `10` |
| telegram | `11` |
| x | `12` |
| tiktok | `13` |

- Unknown or no source: no `LeadSourceID` is sent, so the form's source field is left untouched and the website does not invent a channel. Do not map unknown channels to Marketing.
- An unknown but syntactically valid channel (for example `newsletter/NV00012`) still assigns the valid staff owner, with no source.
- An invalid incoming referral never overwrites a coherent retained pair. If stored owner and source disagree, keep the revalidated owner and discard the source. An invalid stored owner falls back to NV00005 with no source.
- The channel identifies the link the visitor arrived on. It is not verified platform or personal identity, nor proof that a consultation occurred.
- These IDs must match the live CRM source list. Re-verify them when a source is renamed or removed; a wrong ID would mislabel CRM data.

## Native submission contract and configuration

The action comes from MISA-generated HTML:

```text
POST https://amisapp.misa.vn/crm/gc/api/open/WebForm/savecollection
```

`lib/misa-webforms.ts` holds the actual IDs and FormKeys for all nine forms in a `server-only` module. Do not expose keys in browser bundles or copy them into documentation. A Webform key is not an OpenAPI token.

- Hidden fields: `ID`, `Companycode`, `AllowURL`, `FormKey`, `RedirectURL`.
- Source: `LeadSourceID` is included only when the server resolved a known channel from the retained, coherent referral. It is omitted for unknown or missing sources, leaving the CRM's existing/default source value in place. It is always derived server-side; the browser does not send it.
- User data: `LastName` (the full name), `Email`, `Mobile`, `CustomField13`, `Description`, and `privacyTool=on` (sent only after consent is validated).
- `Description` is displayed as **Tin nhắn** in the lead layout and all nine website Webforms. Its technical name remains `Description`; do not create a replacement field. It contains only the visitor's message after the existing outer-whitespace trimming, with internal line breaks preserved. Empty messages stay empty. Do not add prefixes, service labels, staff codes, channel names, source IDs, UTM values or referrer data. Service, owner and source use their separate CRM fields; historical message content is not rewritten.
- `CustomField13`: `2` study abroad, `3` online courses, `5` other, `6` Định cư & Doanh Nghiệp Singapore, `7` Training Employment Pass (TEP). The server maps `dinh-cu` to `6` and `work-pass` to `7`, rather than submitting website slugs directly.
- Existing CRM values `1` (Work pass & việc làm) and `4` (Dịch vụ doanh nghiệp) remain available for historical records; new website submissions use the more specific values above.
- Webform service choices are saved snapshots. Adding a CRM dictionary value alone does not update generated HTML: reopen and save each of the nine website forms, then verify the official exports before changing the server mapping.
- Registered origin: **`https://www.kvcglobal.vn`**. The non-www `.vn` domain redirects to www. Forwarding uses the registered website's Origin/Referer, not arbitrary headers supplied by a visitor.
- The forms' redirect target is `/vi/lien-he?submitted=1` on `.vn` (NV00005 and NV00012 use the non-www domain, which redirects; the other seven use www). The server does not follow this redirect, navigate the visitor, or use that query parameter to display success.
- The embed export supplies the contract; MISA's inline scripts are not executed. The displayed JavaScript export was observed to contain syntax errors.
- `.env.example` no longer contains the old OpenAPI or owner-mapping variables. Those legacy environment variables are not used by this flow.

## Result semantics

MISA also redirected submissions for which no new record was observed. An HTTP 302 to the expected redirect URL therefore only returns the **`submitted` state — forwarded, awaiting confirmation**. The UI does not claim CRM persistence or emit `generate_lead` from this state. Network failures, timeouts, or responses outside the expected contract return an error to the visitor; there is no queue or automatic retry.

A CRM record or audit entry is evidence of persistence, not the `submitted=1` query parameter. Do not use the CRM UI's authenticated internal write endpoints for integration or to bypass OpenAPI entitlements.

## Verification performed

### Channel/source change status

The six-channel website change was verified against live CRM using a local production build. The website has **not been deployed**.

- The six source IDs above exist in the live CRM. All nine `KVC Website - CRM_CODE` forms were updated to include `LeadSourceID`, and each official HTML export contained the six expected channel IDs. Reopening every saved form confirmed that existing fields, owner, form ID, FormKey, registered origin, redirect, activation and notification settings were unchanged.
- Browser smoke covered landing-page-to-contact navigation, reloads, invalid referral links not replacing a valid pair, and replacement by a new valid pair. Record `45` retained Telegram/NV00001 after navigation, reload and an invalid incoming link; record `47` stored TikTok/NV00010 after reassignment and reload.
- Records `51` and `53` stored X/NV00002; for `53`, sessionStorage access was deliberately denied during client-side navigation. The form remained usable and retained the in-memory pair.
- A fresh mobile tab (390 px wide) created record `49` with NV00005 and no CRM source. The CRM detail source selector was empty, confirming that omitting `LeadSourceID` did not invent a channel.
- Missing consent was rejected through the real website form. A local harness exercising the server action and native payload confirmed all six source mappings, omission for unknown/missing channels, and rejection of client-supplied numeric source IDs.
- All five new records used synthetic contact details and were deleted from the active CRM list after verification. Historical test records from the earlier integration were left untouched.
- `node --test tests/misa-attribution.test.mjs`: 16 passing tests. `pnpm typecheck` and `pnpm build` passed. `pnpm lint` reported the existing 11 errors and 14 warnings in untouched files; no changed implementation file was reported.

### Service choice update

- Added Định cư & Doanh Nghiệp Singapore (`CustomField13=6`) and Training Employment Pass (TEP) (`7`) without renaming or removing the five existing CRM choices. Both website choices already existed; only their server-side CRM mappings changed.
- Re-saved all nine website forms and checked their official exports contained all seven service choices. Reopening the saved forms confirmed that owners, existing fields, origins, redirects, activation and notification settings were unchanged; FormKeys and all six channel/source mappings were preserved.
- A local production build submitted `dinh-cu` and `work-pass` through the real website form. CRM records `59` and `61` respectively showed the exact new service labels and IDs `6` and `7`; both retained Zalo (`LeadSourceID=8`). Both synthetic records were deleted from the active CRM list after verification.
- `pnpm typecheck`, targeted ESLint for `app/actions/submit-lead.ts`, and `pnpm build` passed. CRM configuration is live; the updated website mapping has not been deployed.

### Message-only field update

- Renamed the CRM lead-layout display label and all nine Webform labels to Tin nhắn while preserving the technical key `Description`. Saved exports and reopened forms confirmed the label, existing field names, owners, FormKeys, service/source choices and other form settings were retained.
- A real website submission from a local production build created CRM record `63`. Its Tin nhắn value exactly matched the visitor's two-line message, without service or metadata prefixes; `CustomField13=3` and `LeadSourceID=8` remained separate. The synthetic record was deleted from the active list after verification.
- A local action/transport harness also confirmed that an empty message sends an empty `Description`, and supplied referrer data is ignored. `pnpm typecheck`, targeted ESLint for both changed implementation files and `pnpm build` passed. The website changes have not been deployed.

### Earlier native-Webform integration

- All nine new forms were enabled. NV00005's form was reopened to confirm Nguyễn Hoàng Long as its owner and the HTTPS www.vn origin.
- Native POSTs from the HTTPS www.vn origin and server-side forwarding both created test leads for NV00012.
- A local production build created `KVC TEST website NV00012`, record `TN000000000000004`. The CRM detail response confirmed `OwnerIDText = Phương Nguyên (NV00012)` and the service label `Du học` (study abroad).
- Without UTM parameters, the website used NV00005. Record `KVC TEST website default NV00005`, code `TN000000000000005`, became visible after refreshing the list. The CRM detail response confirmed `OwnerIDText = Nguyễn Hoàng Long (NV00005)` and the service label `Khác` (other); the audit entry also identified NV00005.
- The KVC server rejected a missing name and missing consent; exceeding the submission limit returned a rate-limit error.
- Browser checks covered retention across navigation/reloads, reassignment through query-only navigation, invalid codes not overwriting valid ones, a new tab using the default owner, and a usable form when sessionStorage was blocked. The mobile form was visually inspected.
- CRM lead permissions were set to **Private** (`Riêng tư`); no data permissions were changed. NV00005's record did not appear immediately after the redirect but became visible after refreshing the list. An early list read is not proof of submission failure or a permissions problem.

The `KVC TEST` records used `example.com` email addresses and fictional test phone numbers, not real customer details. Two final website test records were retained for comparison; three temporary probes were deleted. Do not count test data as business leads.

## Operations and limitations

- When sessionStorage is blocked, client-side navigation retains the owner/source pair in memory, but a reload may lose it. Tabs opened through an opener or duplicated by the browser may inherit a sessionStorage snapshot; subsequent changes are not synchronized.
- The contact form does not collect `utm_medium`, `utm_campaign` or referrer metadata. The retained `utm_source` and staff code are used only to resolve the separate CRM owner/source fields, never copied into Tin nhắn.
- Source mapping is channel-level only: the CRM source identifies the referral channel, not an individual campaign, staff member, or person.
- The IP limit remains in memory per process and is best-effort, not distributed. Honeypot and spam-pattern submissions are silently discarded.
- There is no new Sanity copy or retry queue. Guaranteed delivery or automated reconciliation requires a MISA-supported receipt mechanism; native redirects alone are insufficient.
- A leaked FormKey may allow direct submission to the public endpoint, bypassing KVC's checks. Do not publish raw HTML or keys, or assume MISA provides server-side CAPTCHA/rate limiting.
- The website has an existing privacy-policy link to `/chinh-sach-bao-mat`, but the repository has no corresponding route. Obtain real policy content before release; do not invent legal commitments on the business's behalf.
- For a local production smoke run, use `pnpm start --hostname localhost --port 3012` and open `http://localhost:3012`. Binding to 127.0.0.1 caused the existing proxy to normalize rewrites to localhost and enter a redirect loop; the proxy was not changed as part of this integration.

## Staff changes and release

1. Open **Settings → WebForms → Leads → Add Form** in MISA (Vietnamese UI: **Thiết lập → WebForms → Tiềm năng → Thêm Form**). Include name, email, phone, service, Tin nhắn (technical field `Description`), and consent. Assign the correct user rather than an allocation rule. Leave unrelated forms unchanged.
2. Register the HTTPS www.vn origin, not `*`. Obtain the ID, key, and action from the official generated source.
3. Before relying on source attribution, create or confirm the six lead sources in the live CRM and enable the relevant sources on all nine forms. Source IDs must exist in the live CRM list; adding a channel requires a verified CRM source. The mapping lives in `lib/misa-attribution.ts`; changing it requires a deploy.
4. Update `MISA_STAFF_CODES` in `lib/misa-attribution.ts` and the form record in `lib/misa-webforms.ts`, then build/deploy. Changing environment variables alone does not update the mapping.
5. To remove a staff member, remove the code and form configuration, then deploy. Old links become invalid. Preserve historical data, and choose another default intake owner before removing NV00005.
6. Before production release, approve the privacy policy, complete acceptance using the default intake owner's account, check contractual Webform limits/terms, and deploy the approved branch. Rollout order: CRM sources and form source settings first, then the website, then a known-channel test lead (source set) and a direct-visit test lead (source blank). Do not automatically upgrade the subscription or deploy to production.

Official sources: [WebForms](https://helpcrm.misa.vn/kb/webforms/), [API](https://helpcrm.misa.vn/kb/api/), [pricing](https://amis.misa.vn/bang-gia-phan-mem-misa-amis-crm/).
