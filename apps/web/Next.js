"use client"
import { Button, Card, Text } from "ui"
  vercel link [path-to-directory]
                    C:\dev\rapyard\apps\spendshield/
│
├── core/
│   ├── src/
│   │   ├── app.ts
│   │   └── routes/
│   │       └── health.ts
│   ├── scripts/
│   │   └── build-vercel-output.js
│   ├── vercel.json
│   ├── package.json
│   └── tsconfig.json
│
├── worker/
│   ├── src/
│   │   ├── worker.ts
│   │   └── jobs/
│   │       ├── score-transaction.ts
│   │       └── enrich-merchant.ts
│   ├── scripts/
│   │   └── build-vercel-output.js
│   ├── vercel.json
│   ├── package.json
│   └── tsconfig.json
│
├── admin/
│   ├── src/
│   │   ├── app.ts
│   │   └── routes/
│   │       ├── claims.ts
│   │       ├── pricing.ts
│   │       └── providers.ts
│   ├── scripts/
│   │   └── build-vercel-output.js
│   ├── vercel.json
│   ├── package.json
│   └── tsconfig.json
│
├── ledger/
│   ├── src/
│   │   ├── app.ts
│   │   └── routes/
│   │       ├── entries.ts
│   │       ├── audit.ts
│   │       └── snapshots.ts
│   ├── scripts/
│   │   └── build-vercel-output.js
│   ├── vercel.json
│   ├── package.json
│   └── tsconfig.json
│
├── notifications/
│   ├── src/
│   │   ├── worker.ts
│   │   └── jobs/
│   │       ├── send-email.ts
│   │       ├── send-sms.ts
│   │       └── send-webhook.ts
│   ├── scripts/
│   │   └── build-vercel-output.js
│   ├── vercel.json
│   ├── package.json
│   └── tsconfig.json
│
├── ai-scoring/
│   ├── src/
│   │   ├── app.ts
│   │   └── routes/
│   │       ├── score-claim.ts
│   │       ├── score-provider.ts
│   │       └── detect-anomaly.ts
│   ├── scripts/
│   │   └── build-vercel-output.js
│   ├── vercel.json
│   ├── package.json
│   └── tsconfig.json
│
└── ingest/
    ├── src/
    │   ├── worker.ts
    │   └── jobs/
    │       ├── ingest-claims.ts
    │       ├── ingest-providers.ts
    │       └── ingest-eobs.ts
    ├── scripts/
    │   └── build-vercel-output.js
    ├── vercel.json
    ├── package.json
    └── tsconfig.json
  
