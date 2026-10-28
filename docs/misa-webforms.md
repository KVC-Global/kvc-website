# MISA Webforms — Consultation Intake

Implementation branch: `feature/misa-webform-discovery`. This change created and enabled nine new Webforms in the live CRM with the user's permission; it did not deploy the website to production. The observed subscription was **Standard**, and test leads were received without using OpenAPI or upgrading to Professional.

## Implemented flow

1. `MisaAttributionProvider` in the layout captures a staff code from `utm_source=channel/CRM_CODE` on every page.
2. The most recent valid staff code within the same tab wins; a missing or invalid code does not overwrite a valid one. `sessionStorage` retains the code across navigation and reloads. There are no long-lived cookies or cross-tab synchronization.
3. `ContactForm` sends the captured staff code and user input to `submitLead`.
4. The KVC server retains name/email/phone/service/message validation, consent checks, the honeypot, spam-pattern checks, and the limit of five submissions per IP per hour. It revalidates the submitted staff code against the active allowlist.
5. `lib/misa-webforms.ts` selects the corresponding form and forwards a native MISA POST. It does not write new requests to Sanity, call OpenAPI, or require a client ID, client secret, or API key.

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

Example: `https://kvcglobal.vn/vi/du-hoc?utm_source=zalo%2FNV00012`. After navigating to the contact page in the same tab, NV00012 remains the link-attributed owner. Codes are case-sensitive; the source must contain exactly one `/` with a nonempty channel. Link attribution is not proof of consultation history or staff identity.

## Native submission contract and configuration

The action comes from MISA-generated HTML:

```text
POST https://amisapp.misa.vn/crm/gc/api/open/WebForm/savecollection
```

`lib/misa-webforms.ts` holds the actual IDs and FormKeys for all nine forms in a `server-only` module. Do not expose keys in browser bundles or copy them into documentation. A Webform key is not an OpenAPI token.

- Hidden fields: `ID`, `Companycode`, `AllowURL`, `FormKey`, `RedirectURL`.
- User data: `LastName` (the full name), `Email`, `Mobile`, `CustomField13`, `Description`, and `privacyTool=on` (sent only after consent is validated).
- `CustomField13`: `1` work-pass, `2` study abroad, `3` online courses, `4` business services, `5` other. The server maps website slugs to MISA values rather than submitting the slugs directly.
- Registered origin: **`https://www.kvcglobal.vn`**. The non-www `.vn` domain redirects to www. Forwarding uses the registered website's Origin/Referer, not arbitrary headers supplied by a visitor.
- The forms' redirect target is `/vi/lien-he?submitted=1` on `.vn` (the first two forms use the non-www domain, which redirects; the remaining forms use www). The server does not follow this redirect, navigate the visitor, or use that query parameter to display success.
- The embed export supplies the contract; MISA's inline scripts are not executed. The displayed JavaScript export was observed to contain syntax errors.
- `.env.example` no longer contains the old OpenAPI or owner-mapping variables. Those legacy environment variables are not used by this flow.

## Result semantics

MISA also redirected submissions for which no new record was observed. An HTTP 302 to the expected redirect URL therefore only returns the **`submitted` state — forwarded, awaiting confirmation**. The UI does not claim CRM persistence or emit `generate_lead` from this state. Network failures, timeouts, or responses outside the expected contract return an error to the visitor; there is no queue or automatic retry.

A CRM record or audit entry is evidence of persistence, not the `submitted=1` query parameter. Do not use the CRM UI's authenticated internal write endpoints for integration or to bypass OpenAPI entitlements.

## Verification performed

- All nine new forms were enabled. NV00005's form was reopened to confirm Nguyễn Hoàng Long as its owner and the HTTPS www.vn origin.
- Native POSTs from the HTTPS www.vn origin and server-side forwarding both created test leads for NV00012.
- A local production build created `KVC TEST website NV00012`, record `TN000000000000004`. The CRM detail response confirmed `OwnerIDText = Phương Nguyên (NV00012)` and the service label `Du học` (study abroad).
- Without UTM parameters, the website used NV00005. Record `KVC TEST website default NV00005`, code `TN000000000000005`, became visible after refreshing the list. The CRM detail response confirmed `OwnerIDText = Nguyễn Hoàng Long (NV00005)` and the service label `Khác` (other); the audit entry also identified NV00005.
- The KVC server rejected a missing name and missing consent; exceeding the submission limit returned a rate-limit error.
- Browser checks covered retention across navigation/reloads, reassignment through query-only navigation, invalid codes not overwriting valid ones, a new tab using the default owner, and a usable form when sessionStorage was blocked. The mobile form was visually inspected.
- CRM lead permissions were set to **Private** (`Riêng tư`); no data permissions were changed. NV00005's record did not appear immediately after the redirect but became visible after refreshing the list. An early list read is not proof of submission failure or a permissions problem.

The `KVC TEST` records used `example.com` email addresses and fictional test phone numbers, not real customer details. Two final website test records were retained for comparison; three temporary probes were deleted. Do not count test data as business leads.

## Operations and limitations

- When sessionStorage is blocked, client-side navigation retains attribution in memory, but a reload may lose the code. Tabs opened through an opener or duplicated by the browser may inherit a sessionStorage snapshot; subsequent changes are not synchronized.
- The IP limit remains in memory per process and is best-effort, not distributed. Honeypot and spam-pattern submissions are silently discarded.
- There is no new Sanity copy or retry queue. Guaranteed delivery or automated reconciliation requires a MISA-supported receipt mechanism; native redirects alone are insufficient.
- A leaked FormKey may allow direct submission to the public endpoint, bypassing KVC's checks. Do not publish raw HTML or keys, or assume MISA provides server-side CAPTCHA/rate limiting.
- The website has an existing privacy-policy link to `/chinh-sach-bao-mat`, but the repository has no corresponding route. Obtain real policy content before release; do not invent legal commitments on the business's behalf.
- For a local production smoke run, use `pnpm start --hostname localhost --port 3012` and open `http://localhost:3012`. Binding to 127.0.0.1 caused the existing proxy to normalize rewrites to localhost and enter a redirect loop; the proxy was not changed as part of this integration.

## Staff changes and release

1. Open **Settings → WebForms → Leads → Add Form** in MISA (Vietnamese UI: **Thiết lập → WebForms → Tiềm năng → Thêm Form**). Include name, email, phone, service, description, and consent. Assign the correct user rather than an allocation rule. Leave pre-existing forms unchanged.
2. Register the HTTPS www.vn origin, not `*`. Obtain the ID, key, and action from the official generated source.
3. Update `MISA_STAFF_CODES` in `lib/misa-attribution.ts` and the form record in `lib/misa-webforms.ts`, then build/deploy. Changing environment variables alone does not update the mapping.
4. To remove a staff member, remove the code and form configuration, then deploy. Old links become invalid. Preserve historical data, and choose another default intake owner before removing NV00005.
5. Before production release, approve the privacy policy, complete acceptance using the default intake owner's account, check contractual Webform limits/terms, and deploy the approved branch. Do not automatically upgrade the subscription or deploy to production.

Official sources: [WebForms](https://helpcrm.misa.vn/kb/webforms/), [API](https://helpcrm.misa.vn/kb/api/), [pricing](https://amis.misa.vn/bang-gia-phan-mem-misa-amis-crm/).
