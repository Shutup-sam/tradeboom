# Trade Boom - Security Practices

### 1. Secrets Management
- Never hardcode Telegram bot API tokens, Chat IDs, or database credentials.
- Load all private config strings dynamically from `process.env.TELEGRAM_BOT_TOKEN` and `process.env.TELEGRAM_CHAT_ID`.

### 2. Validation & Sanitation
- Form actions must parse and validate inputs using Zod schemas on the server side prior to saving or notifying APIs.
- Filter and sanitize inputs to prevent injection scripts.
