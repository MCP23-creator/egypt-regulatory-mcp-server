"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const regulatory_data_js_1 = require("./regulatory-data.js");
const server = new mcp_js_1.McpServer({
    name: "egypt-regulatory-mcp-server",
    version: "1.0.0",
});
// ========== HELPER FUNCTIONS ==========
function formatRequirementMarkdown(req) {
    const lines = [
        `# ${req.activity}`,
        `**Sector:** ${req.sector} > ${req.subsector}`,
        `**Regulator:** ${req.regulator}`,
        `**Last Updated:** ${req.last_updated}`,
        "",
        "## Establishment Requirements",
        `- **Entity Type:** ${req.requirements.entity_type}`,
        `- **Minimum Capital:** ${req.requirements.minimum_capital}`,
        `- **Timeline:** ${req.requirements.timeline_estimate}`,
        `- **Sandbox Available:** ${req.requirements.sandbox_available ? "Yes" : "No"}`,
    ];
    if (req.requirements.sandbox_details) {
        lines.push(`- **Sandbox Details:** ${req.requirements.sandbox_details}`);
    }
    lines.push("", "### Ownership Rules");
    for (const rule of req.requirements.ownership_rules) {
        lines.push(`- ${rule}`);
    }
    lines.push("", "### Licenses Needed");
    for (const lic of req.requirements.licenses_needed) {
        lines.push(`- ${lic}`);
    }
    lines.push("", "### Key Laws");
    for (const law of req.requirements.key_laws) {
        lines.push(`- ${law}`);
    }
    lines.push("", "## Compliance Requirements", "", "### AML/KYC");
    for (const item of req.compliance.aml_kyc) {
        lines.push(`- ${item}`);
    }
    lines.push("", "### Data Protection");
    for (const item of req.compliance.data_protection) {
        lines.push(`- ${item}`);
    }
    lines.push("", "### Reporting");
    for (const item of req.compliance.reporting) {
        lines.push(`- ${item}`);
    }
    lines.push("", "### Ongoing Obligations");
    for (const item of req.compliance.ongoing) {
        lines.push(`- ${item}`);
    }
    lines.push("", "## Barriers to Entry");
    for (const barrier of req.barriers) {
        lines.push(`- ${barrier}`);
    }
    if (req.recent_changes.length > 0) {
        lines.push("", "## Recent Regulatory Changes");
        for (const change of req.recent_changes) {
            lines.push(`- **${change.date}:** ${change.description}`);
            lines.push(`  - Impact: ${change.impact}`);
            lines.push(`  - Source: ${change.source}`);
        }
    }
    return lines.join("\n");
}
function formatRequirementJSON(req) {
    return {
        id: req.id,
        sector: req.sector,
        subsector: req.subsector,
        activity: req.activity,
        regulator: req.regulator,
        requirements: req.requirements,
        compliance: req.compliance,
        barriers: req.barriers,
        recent_changes: req.recent_changes,
        last_updated: req.last_updated,
    };
}
// ========== TOOL 1: QUERY REQUIREMENTS ==========
server.registerTool("egypt_query_requirements", {
    title: "Query Egyptian Business Requirements",
    description: `Query regulatory requirements for establishing and operating businesses in Egypt.

Returns licensing requirements, capital requirements, ownership rules, compliance obligations, and barriers to entry for specific business activities.

Args:
  - activity (string, optional): Filter by business activity keyword (e.g., "payments", "lending", "digital banking", "insurtech", "robo-advisory")
  - sector (string, optional): Filter by sector (e.g., "Fintech")
  - regulator (string, optional): Filter by regulator abbreviation (e.g., "CBE", "FRA")
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns: Detailed regulatory requirements including entity type, capital, licenses, laws, compliance, and barriers.

Examples:
  - "What do I need to start a payment company in Egypt?" -> activity="payments"
  - "What are FRA-regulated fintech activities?" -> regulator="FRA"
  - "Requirements for digital banking license in Egypt" -> activity="digital banking"`,
    inputSchema: {
        activity: zod_1.z
            .string()
            .optional()
            .describe("Filter by activity keyword (e.g., 'payments', 'lending', 'insurtech')"),
        sector: zod_1.z.string().optional().describe("Filter by sector (e.g., 'Fintech')"),
        regulator: zod_1.z
            .string()
            .optional()
            .describe("Filter by regulator abbreviation (e.g., 'CBE', 'FRA')"),
        response_format: zod_1.z
            .enum(["markdown", "json"])
            .default("markdown")
            .describe("Output format"),
    },
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
    },
}, async (params) => {
    let results = [...regulatory_data_js_1.regulatoryRequirements];
    if (params.activity) {
        const keyword = params.activity.toLowerCase();
        results = results.filter((r) => r.activity.toLowerCase().includes(keyword) ||
            r.subsector.toLowerCase().includes(keyword) ||
            r.id.toLowerCase().includes(keyword));
    }
    if (params.sector) {
        const keyword = params.sector.toLowerCase();
        results = results.filter((r) => r.sector.toLowerCase().includes(keyword));
    }
    if (params.regulator) {
        const keyword = params.regulator.toUpperCase();
        results = results.filter((r) => r.regulator.includes(keyword));
    }
    if (results.length === 0) {
        return {
            content: [
                {
                    type: "text",
                    text: `No regulatory requirements found matching your query. Available activities: ${regulatory_data_js_1.regulatoryRequirements.map((r) => r.activity).join(", ")}`,
                },
            ],
        };
    }
    if (params.response_format === "json") {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({ total: results.length, requirements: results.map(formatRequirementJSON) }, null, 2),
                },
            ],
        };
    }
    const text = results.map(formatRequirementMarkdown).join("\n\n---\n\n");
    return {
        content: [
            {
                type: "text",
                text: `Found ${results.length} matching requirement(s):\n\n${text}`,
            },
        ],
    };
});
// ========== TOOL 2: LIST REGULATORS ==========
server.registerTool("egypt_list_regulators", {
    title: "List Egyptian Regulatory Bodies",
    description: `List regulatory bodies governing business activities in Egypt.

Returns details about each regulator including jurisdiction, responsibilities, and relevant sectors.

Args:
  - sector (string, optional): Filter by relevant sector keyword
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Examples:
  - "Who regulates fintech in Egypt?" -> sector="fintech"
  - "What does the FRA do?" -> (returns all, agent can filter)`,
    inputSchema: {
        sector: zod_1.z.string().optional().describe("Filter by sector keyword"),
        response_format: zod_1.z.enum(["markdown", "json"]).default("markdown").describe("Output format"),
    },
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
    },
}, async (params) => {
    let results = [...regulatory_data_js_1.regulatoryBodies];
    if (params.sector) {
        const keyword = params.sector.toLowerCase();
        results = results.filter((r) => r.relevant_sectors.some((s) => s.toLowerCase().includes(keyword)) ||
            r.jurisdiction.toLowerCase().includes(keyword) ||
            r.name.toLowerCase().includes(keyword) ||
            r.abbreviation.toLowerCase().includes(keyword));
    }
    if (params.response_format === "json") {
        return {
            content: [{ type: "text", text: JSON.stringify({ total: results.length, regulators: results }, null, 2) }],
        };
    }
    const text = results
        .map((r) => `## ${r.name} (${r.abbreviation})\n**Jurisdiction:** ${r.jurisdiction}\n**Website:** ${r.website}\n\n**Responsibilities:**\n${r.key_responsibilities.map((k) => `- ${k}`).join("\n")}\n\n**Relevant Sectors:** ${r.relevant_sectors.join(", ")}`)
        .join("\n\n---\n\n");
    return { content: [{ type: "text", text }] };
});
// ========== TOOL 3: COMPARE SECTORS ==========
server.registerTool("egypt_compare_sectors", {
    title: "Compare Egyptian Business Sectors",
    description: `Compare regulatory complexity, capital requirements, licensing timelines, and growth rates across Egyptian business sectors.

Returns side-by-side comparison data for informed market entry decisions.

Args:
  - sectors (string[], optional): Filter by sector name keywords. If empty, returns all sectors.
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Examples:
  - "Compare fintech payments vs lending in Egypt" -> sectors=["payments", "lending"]
  - "Which Egyptian sector has lowest barriers?" -> sectors=[] (all sectors)
  - "Fintech vs real estate regulatory complexity" -> sectors=["fintech", "real estate"]`,
    inputSchema: {
        sectors: zod_1.z
            .array(zod_1.z.string())
            .optional()
            .describe("Sector name keywords to compare"),
        response_format: zod_1.z.enum(["markdown", "json"]).default("markdown").describe("Output format"),
    },
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
    },
}, async (params) => {
    let results = [...regulatory_data_js_1.sectorComparisons];
    if (params.sectors && params.sectors.length > 0) {
        results = results.filter((r) => params.sectors.some((s) => r.sector.toLowerCase().includes(s.toLowerCase())));
    }
    if (results.length === 0) {
        return {
            content: [
                {
                    type: "text",
                    text: `No sectors found. Available: ${regulatory_data_js_1.sectorComparisons.map((s) => s.sector).join(", ")}`,
                },
            ],
        };
    }
    if (params.response_format === "json") {
        return {
            content: [{ type: "text", text: JSON.stringify({ total: results.length, sectors: results }, null, 2) }],
        };
    }
    const header = "| Sector | Complexity | Capital | Timeline | Regulators | Sandbox | Foreign Ownership | Growth |";
    const separator = "|--------|-----------|---------|----------|-----------|---------|-------------------|--------|";
    const rows = results.map((s) => `| ${s.sector} | ${s.regulatory_complexity} | ${s.capital_requirement_range} | ${s.time_to_license} | ${s.primary_regulators.join(", ")} | ${s.sandbox_available ? "Yes" : "No"} | ${s.foreign_ownership_allowed ? "Yes" : "No"} (${s.foreign_ownership_restrictions}) | ${s.growth_rate_2025} |`);
    return {
        content: [
            { type: "text", text: [header, separator, ...rows].join("\n") },
        ],
    };
});
// ========== TOOL 4: FREE ZONES ==========
server.registerTool("egypt_free_zones", {
    title: "Query Egyptian Free Zones & Special Economic Zones",
    description: `Get information about Egyptian free zones and special economic zones including incentives, tax benefits, and requirements.

Args:
  - zone_name (string, optional): Filter by zone name keyword
  - sector (string, optional): Filter by sector focus
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Examples:
  - "What incentives does the Suez Canal Economic Zone offer?" -> zone_name="suez"
  - "Which free zones support fintech?" -> sector="fintech"`,
    inputSchema: {
        zone_name: zod_1.z.string().optional().describe("Zone name keyword"),
        sector: zod_1.z.string().optional().describe("Sector focus keyword"),
        response_format: zod_1.z.enum(["markdown", "json"]).default("markdown").describe("Output format"),
    },
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
    },
}, async (params) => {
    let results = [...regulatory_data_js_1.freeZones];
    if (params.zone_name) {
        const keyword = params.zone_name.toLowerCase();
        results = results.filter((z) => z.name.toLowerCase().includes(keyword));
    }
    if (params.sector) {
        const keyword = params.sector.toLowerCase();
        results = results.filter((z) => z.sectors_focus.some((s) => s.toLowerCase().includes(keyword)));
    }
    if (params.response_format === "json") {
        return {
            content: [{ type: "text", text: JSON.stringify({ total: results.length, free_zones: results }, null, 2) }],
        };
    }
    const text = results
        .map((z) => `## ${z.name}\n**Location:** ${z.location}\n**Foreign Ownership:** ${z.foreign_ownership}\n\n**Sector Focus:** ${z.sectors_focus.join(", ")}\n\n**Incentives:**\n${z.incentives.map((i) => `- ${i}`).join("\n")}\n\n**Tax Benefits:**\n${z.tax_benefits.map((t) => `- ${t}`).join("\n")}\n\n**Requirements:**\n${z.key_requirements.map((r) => `- ${r}`).join("\n")}`)
        .join("\n\n---\n\n");
    return { content: [{ type: "text", text }] };
});
// ========== TOOL 5: LEGAL FRAMEWORK ==========
server.registerTool("egypt_legal_framework", {
    title: "Query Egyptian Legal Framework",
    description: `Look up Egyptian laws and regulations relevant to business operations.

Returns law details including scope, key provisions, relevant sectors, and recent amendments.

Args:
  - query (string, optional): Search by law name, number, or topic keyword
  - sector (string, optional): Filter by relevant sector
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Examples:
  - "What is Fintech Law No. 5 of 2022?" -> query="fintech"
  - "Laws governing AML compliance in Egypt" -> query="money laundering"
  - "Data protection regulations" -> query="data protection"`,
    inputSchema: {
        query: zod_1.z.string().optional().describe("Search keyword — law name, number, or topic"),
        sector: zod_1.z.string().optional().describe("Filter by sector"),
        response_format: zod_1.z.enum(["markdown", "json"]).default("markdown").describe("Output format"),
    },
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
    },
}, async (params) => {
    let results = [...regulatory_data_js_1.legalFrameworks];
    if (params.query) {
        const keyword = params.query.toLowerCase();
        results = results.filter((l) => l.name.toLowerCase().includes(keyword) ||
            l.number.toLowerCase().includes(keyword) ||
            l.scope.toLowerCase().includes(keyword) ||
            l.key_provisions.some((p) => p.toLowerCase().includes(keyword)));
    }
    if (params.sector) {
        const keyword = params.sector.toLowerCase();
        results = results.filter((l) => l.relevant_sectors.some((s) => s.toLowerCase().includes(keyword)));
    }
    if (params.response_format === "json") {
        return {
            content: [{ type: "text", text: JSON.stringify({ total: results.length, laws: results }, null, 2) }],
        };
    }
    const text = results
        .map((l) => `## ${l.name} (${l.number} of ${l.year})\n**Scope:** ${l.scope}\n\n**Key Provisions:**\n${l.key_provisions.map((p) => `- ${p}`).join("\n")}\n\n**Relevant Sectors:** ${l.relevant_sectors.join(", ")}\n\n**Recent Amendments:**\n${l.recent_amendments.length > 0 ? l.recent_amendments.map((a) => `- ${a}`).join("\n") : "None noted"}`)
        .join("\n\n---\n\n");
    return { content: [{ type: "text", text }] };
});
// ========== TOOL 6: RECENT CHANGES ==========
server.registerTool("egypt_recent_regulatory_changes", {
    title: "Get Recent Egyptian Regulatory Changes",
    description: `Get recent regulatory changes and updates affecting business in Egypt.

Returns chronological list of regulatory changes with impact assessments.

Args:
  - sector (string, optional): Filter by sector keyword
  - since (string, optional): Filter changes since date (YYYY-MM format, e.g., "2024-06")
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Examples:
  - "What changed in Egyptian fintech regulation recently?" -> sector="fintech"
  - "Regulatory changes since January 2025" -> since="2025-01"`,
    inputSchema: {
        sector: zod_1.z.string().optional().describe("Filter by sector keyword"),
        since: zod_1.z.string().optional().describe("Filter changes since date (YYYY-MM format)"),
        response_format: zod_1.z.enum(["markdown", "json"]).default("markdown").describe("Output format"),
    },
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
    },
}, async (params) => {
    const allChanges = [];
    let reqs = [...regulatory_data_js_1.regulatoryRequirements];
    if (params.sector) {
        const keyword = params.sector.toLowerCase();
        reqs = reqs.filter((r) => r.sector.toLowerCase().includes(keyword) ||
            r.subsector.toLowerCase().includes(keyword));
    }
    for (const req of reqs) {
        for (const change of req.recent_changes) {
            if (params.since && change.date < params.since)
                continue;
            allChanges.push({
                activity: req.activity,
                regulator: req.regulator,
                ...change,
            });
        }
    }
    allChanges.sort((a, b) => b.date.localeCompare(a.date));
    if (allChanges.length === 0) {
        return {
            content: [
                {
                    type: "text",
                    text: "No regulatory changes found matching your query.",
                },
            ],
        };
    }
    if (params.response_format === "json") {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({ total: allChanges.length, changes: allChanges }, null, 2),
                },
            ],
        };
    }
    const text = allChanges
        .map((c) => `### ${c.date} — ${c.activity} (${c.regulator})\n${c.description}\n- **Impact:** ${c.impact}\n- **Source:** ${c.source}`)
        .join("\n\n");
    return {
        content: [
            {
                type: "text",
                text: `# Recent Regulatory Changes in Egypt\n\n${text}`,
            },
        ],
    };
});
// ========== TOOL 7: MARKET ENTRY ASSESSMENT ==========
server.registerTool("egypt_market_entry_assessment", {
    title: "Egyptian Market Entry Assessment",
    description: `Get a comprehensive market entry assessment for a specific business activity in Egypt.

Combines requirements, barriers, free zone options, regulatory bodies, and recent changes into a single actionable briefing.

Args:
  - activity (string): The business activity to assess (e.g., "payments", "lending", "digital banking", "insurtech")
  - foreign_company (boolean): Whether the entrant is a foreign company (affects ownership and licensing guidance)
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Examples:
  - "Full assessment for entering Egyptian payments market as a foreign company" -> activity="payments", foreign_company=true
  - "What's involved in starting a lending fintech in Egypt?" -> activity="lending", foreign_company=false`,
    inputSchema: {
        activity: zod_1.z
            .string()
            .describe("Business activity to assess (e.g., 'payments', 'lending', 'digital banking')"),
        foreign_company: zod_1.z
            .boolean()
            .default(false)
            .describe("Whether the entrant is a foreign company"),
        response_format: zod_1.z.enum(["markdown", "json"]).default("markdown").describe("Output format"),
    },
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
    },
}, async (params) => {
    const keyword = params.activity.toLowerCase();
    const matchingReqs = regulatory_data_js_1.regulatoryRequirements.filter((r) => r.activity.toLowerCase().includes(keyword) ||
        r.subsector.toLowerCase().includes(keyword) ||
        r.id.toLowerCase().includes(keyword));
    if (matchingReqs.length === 0) {
        return {
            content: [
                {
                    type: "text",
                    text: `No regulatory data found for "${params.activity}". Available activities: ${regulatory_data_js_1.regulatoryRequirements.map((r) => r.activity).join(", ")}`,
                },
            ],
        };
    }
    const req = matchingReqs[0];
    const relevantRegulators = regulatory_data_js_1.regulatoryBodies.filter((rb) => req.regulator.includes(rb.abbreviation) ||
        rb.relevant_sectors.some((s) => s.toLowerCase().includes(req.subsector.toLowerCase())));
    const relevantZones = regulatory_data_js_1.freeZones.filter((z) => z.sectors_focus.some((s) => s.toLowerCase().includes(keyword) ||
        s.toLowerCase().includes("fintech") ||
        s.toLowerCase().includes("technology")));
    const relevantSector = regulatory_data_js_1.sectorComparisons.find((s) => s.sector.toLowerCase().includes(keyword));
    if (params.response_format === "json") {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        activity: req.activity,
                        requirements: formatRequirementJSON(req),
                        regulators: relevantRegulators,
                        free_zones: relevantZones,
                        sector_comparison: relevantSector || null,
                        foreign_company_notes: params.foreign_company
                            ? {
                                entity_requirement: "Must establish Egyptian joint-stock company (JSC)",
                                local_partner: "Recommended — local firms help navigate regulatory ambiguity",
                                ownership: req.requirements.ownership_rules,
                                recommendation: "Engage Egyptian law firm specializing in financial regulation before application",
                            }
                            : null,
                    }, null, 2),
                },
            ],
        };
    }
    let text = `# Market Entry Assessment: ${req.activity} in Egypt\n\n`;
    if (relevantSector) {
        text += `## Quick Facts\n`;
        text += `- **Regulatory Complexity:** ${relevantSector.regulatory_complexity}\n`;
        text += `- **Capital Required:** ${relevantSector.capital_requirement_range}\n`;
        text += `- **Time to License:** ${relevantSector.time_to_license}\n`;
        text += `- **Foreign Ownership:** ${relevantSector.foreign_ownership_allowed ? "Allowed" : "Restricted"} — ${relevantSector.foreign_ownership_restrictions}\n`;
        text += `- **Sandbox Available:** ${relevantSector.sandbox_available ? "Yes" : "No"}\n`;
        text += `- **Growth:** ${relevantSector.growth_rate_2025}\n\n`;
    }
    if (params.foreign_company) {
        text += `## ⚠️ Foreign Company Considerations\n`;
        text += `- **Entity Requirement:** Must establish an Egyptian joint-stock company (JSC)\n`;
        text += `- **Local Partnership:** Strongly recommended — regulatory ambiguity makes local expertise essential\n`;
        text += `- **Ownership Rules:**\n`;
        for (const rule of req.requirements.ownership_rules) {
            text += `  - ${rule}\n`;
        }
        text += `- **Key Recommendation:** Engage an Egyptian law firm specializing in financial regulation (Zulficar & Partners, Sharkawy & Sarhan, Matouk Bassiouny are well-known in fintech)\n\n`;
    }
    text += formatRequirementMarkdown(req);
    if (relevantRegulators.length > 0) {
        text += `\n\n## Relevant Regulatory Bodies\n\n`;
        for (const rb of relevantRegulators) {
            text += `### ${rb.name} (${rb.abbreviation})\n`;
            text += `${rb.jurisdiction}\n`;
            text += `Website: ${rb.website}\n\n`;
        }
    }
    if (relevantZones.length > 0) {
        text += `\n\n## Relevant Free Zones / Special Economic Zones\n\n`;
        for (const z of relevantZones) {
            text += `### ${z.name}\n`;
            text += `Foreign Ownership: ${z.foreign_ownership}\n`;
            text += `Tax Benefits: ${z.tax_benefits.join("; ")}\n\n`;
        }
    }
    return { content: [{ type: "text", text }] };
});
// ========== TRANSPORT SETUP ==========
async function runStdio() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("Egypt Regulatory MCP Server running on stdio");
}
async function runHTTP() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/health", (_req, res) => {
        res.json({ status: "ok", server: "egypt-regulatory-mcp-server", version: "1.0.0" });
    });
    app.post("/mcp", async (req, res) => {
        const transport = new streamableHttp_js_1.StreamableHTTPServerTransport({
            sessionIdGenerator: undefined,
            enableJsonResponse: true,
        });
        res.on("close", () => transport.close());
        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
    });
    const port = parseInt(process.env.PORT || "3000");
    app.listen(port, () => {
        console.error(`Egypt Regulatory MCP Server running on http://localhost:${port}/mcp`);
    });
}
const transport = process.env.TRANSPORT || "stdio";
if (transport === "http") {
    runHTTP().catch((error) => {
        console.error("Server error:", error);
        process.exit(1);
    });
}
else {
    runStdio().catch((error) => {
        console.error("Server error:", error);
        process.exit(1);
    });
}
