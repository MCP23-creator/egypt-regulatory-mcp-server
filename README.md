# Egypt Regulatory Intelligence MCP Server

An MCP (Model Context Protocol) server that provides AI agents with structured access to Egyptian business regulatory data — starting with the fintech sector.

## Problem

Companies entering the Egyptian market face fragmented, Arabic-only, often outdated regulatory information scattered across dozens of government websites. AI agents building business plans, conducting due diligence, or advising clients cannot programmatically access this intelligence. This server solves that.

## What It Does

AI agents connect to this server and can:

- **Query business requirements** — licensing, capital, ownership rules, compliance obligations by sector/activity
- **Look up regulators** — CBE, FRA, GAFI, ITIDA, NTRA, EMLCU with jurisdictions and responsibilities
- **Compare sectors** — side-by-side regulatory complexity, timelines, barriers, growth rates
- **Explore free zones** — SCZONE, Smart Village, New Administrative Capital incentives and requirements
- **Search legal framework** — all relevant laws with provisions, amendments, and scope
- **Track regulatory changes** — chronological updates with impact assessments
- **Get market entry assessments** — comprehensive briefings combining all data for a specific activity

## Available Tools

| Tool | Description |
|------|-------------|
| `egypt_query_requirements` | Query licensing, capital, compliance requirements by activity/sector/regulator |
| `egypt_list_regulators` | List regulatory bodies with jurisdictions and responsibilities |
| `egypt_compare_sectors` | Compare regulatory complexity across sectors |
| `egypt_free_zones` | Query free zones — incentives, tax benefits, requirements |
| `egypt_legal_framework` | Search Egyptian laws by name, number, or topic |
| `egypt_recent_regulatory_changes` | Get chronological regulatory updates with impact assessments |
| `egypt_market_entry_assessment` | Full market entry briefing for a specific business activity |

## Coverage (v1.0 — MVP)

**Sectors covered:**
- Fintech — Payments (PSO/PSP)
- Fintech — Digital Banking / Neobanking
- Fintech — NBFS Lending (Consumer Finance, Microfinance, SME Finance, Factoring, Leasing)
- Fintech — Insurtech
- Fintech — Robo-Advisory
- Fintech — Open Banking
- ICT / Digital Services (comparative)
- Real Estate / Construction (comparative)
- Manufacturing (comparative)
- Renewable Energy (comparative)

**Data sources:** CBE regulations, FRA decrees, Banking Law 194/2020, Fintech Law 5/2022, OECD reports, Chambers & Partners, ICLG, Baker McKenzie, McKinsey Egypt analysis.

## Setup

```bash
npm install
npm run build
```

## Running

### stdio (local/Claude Desktop)
```bash
npm start
```

### HTTP (remote/cloud deployment)
```bash
TRANSPORT=http PORT=3000 npm start
```

### Claude Desktop Configuration

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "egypt-regulatory": {
      "command": "node",
      "args": ["/path/to/egypt-regulatory-mcp-server/dist/index.js"]
    }
  }
}
```

## Deployment

### Railway (recommended — free tier available)

1. Push to GitHub
2. Connect repository to Railway
3. Set environment variables: `TRANSPORT=http`, `PORT=3000`
4. Deploy

### Render

1. Push to GitHub
2. Create new Web Service on Render
3. Set build command: `npm install && npm run build`
4. Set start command: `TRANSPORT=http node dist/index.js`

## Roadmap

- [ ] v1.1: Saudi Arabia fintech regulations
- [ ] v1.2: UAE/DIFC/ADGM regulatory data
- [ ] v1.3: Morocco fintech framework
- [ ] v2.0: Real-time regulatory monitoring (scraping government gazette)
- [ ] v2.1: Arabic language support for queries
- [ ] v2.2: Automated data freshness checks

## License

MIT
