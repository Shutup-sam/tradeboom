# Trade Boom - Deployment Protocol

### Production Releases
- Deployments to Vercel production are executed with the Vercel CLI tool:
  `npx vercel --prod -y`
- Prior to pushing deployments, always run local compilation checks:
  `npm run build`

### Environment Syncing
- Ensure newly added environment variables (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) are synced on Vercel's Project Settings before redeploying.
