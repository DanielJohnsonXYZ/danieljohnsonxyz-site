# AI referral measurement conventions

This site now emits `ai_referral_session` to `dataLayer` when source detection indicates AI-assistant traffic.

## Event payload

- `event`: `ai_referral_session`
- `ai_source`: assistant source label (`chatgpt`, `perplexity`, `claude`, `gemini`, `copilot`, `unknown`)
- `ai_medium`: `ai`, `llm`, or `referrer`
- `ai_referrer_host`: detected referrer hostname
- `page_path`
- `page_location`

## Dashboard recommendations

- AI sessions by source and landing page
- Assisted conversions to:
  - `cta_click`
  - `resource_download_click`
  - `form_submit`
- Compare bounce/engagement of AI traffic vs organic/direct

## Query starter

```sql
SELECT
  event_date,
  ai_source,
  page_path,
  COUNT(*) AS sessions
FROM events
WHERE event_name = 'ai_referral_session'
GROUP BY 1,2,3
ORDER BY event_date DESC, sessions DESC;
```

## Manual GTM/GA4 steps

1. Register custom parameters for `ai_source`, `ai_medium`, `ai_referrer_host`.
2. Create an AI source dimension and conversion funnel exploration.
3. Keep campaign links consistent: `utm_medium=ai` plus explicit `utm_source`.
