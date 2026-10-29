# Receive MISA Leads Through Native Webforms and the KVC Server

Use official MISA Webforms on the Standard plan, with one fixed-owner form per active staff member, instead of upgrading to Professional for OpenAPI. Retain the KVC server action to validate input and consent, check the honeypot and spam patterns, and enforce the submission limit before forwarding a native POST. The user approved this adjustment after a smoke test showed that the Webform endpoint stored a request without a name when browser validation was bypassed. Do not create new consultation-request copies in Sanity; preserve historical data and pre-existing MISA Webforms.

The most recent valid CRM staff code within the same tab determines the link-attributed owner and survives navigation and reloads; an invalid code does not overwrite a valid one. Without a valid code, use Nguyễn Hoàng Long (NV00005) as the default intake owner. Accept only the nine active staff codes, excluding MISA SUPPORT and deactivated accounts. Link attribution does not establish that a consultation took place.

The live website redirects `https://kvcglobal.vn` to `https://www.kvcglobal.vn`. Register new forms with the HTTPS origin `www.kvcglobal.vn`, not `.com` or a wildcard. Take form IDs and keys from MISA-generated HTML and keep them in a server-only module; do not execute MISA's exported inline JavaScript.

MISA redirects even when a submission is not stored and provides no record-level delivery receipt for native POSTs. The website therefore reports `submitted` (forwarded, awaiting confirmation), without claiming CRM persistence, emitting the GA `generate_lead` event, or automatically retrying and risking duplicates. This implementation did not change the subscription, modify pre-existing forms, change data permissions, or deploy the website to production.

