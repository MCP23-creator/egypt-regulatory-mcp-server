"use strict";
// Egyptian Regulatory Intelligence Database
// Sector: Fintech & Financial Services (MVP)
// Sources: CBE, FRA, Banking Law 194/2020, Fintech Law 5/2022, OECD reports
Object.defineProperty(exports, "__esModule", { value: true });
exports.legalFrameworks = exports.sectorComparisons = exports.freeZones = exports.regulatoryRequirements = exports.regulatoryBodies = void 0;
// ========== REGULATORY BODIES ==========
exports.regulatoryBodies = [
    {
        name: "Central Bank of Egypt",
        abbreviation: "CBE",
        jurisdiction: "Banking sector, payments, digital banking, mobile wallets",
        key_responsibilities: [
            "Licensing and supervising banks and payment service providers",
            "Regulating payment systems (PSOs and PSPs)",
            "Overseeing digital banking licenses",
            "AML/CFT enforcement for banking sector",
            "Open banking regulation",
            "InstaPay instant payment network oversight"
        ],
        website: "https://www.cbe.org.eg",
        relevant_sectors: ["fintech_banking", "payments", "digital_banking", "mobile_wallets"]
    },
    {
        name: "Financial Regulatory Authority",
        abbreviation: "FRA",
        jurisdiction: "Non-banking financial services, capital markets, insurance, consumer finance",
        key_responsibilities: [
            "Licensing fintech companies for non-banking financial activities",
            "Supervising capital markets and securities",
            "Regulating insurance and insurtech",
            "Overseeing microfinance, factoring, leasing",
            "Operating CORBEH regulatory sandbox",
            "Regulating robo-advisors (Decree 57/2024)",
            "Managing outsourcing service providers registry"
        ],
        website: "https://www.fra.gov.eg",
        relevant_sectors: ["fintech_nbfs", "insurtech", "capital_markets", "consumer_finance", "microfinance"]
    },
    {
        name: "General Authority for Investment and Free Zones",
        abbreviation: "GAFI",
        jurisdiction: "Investment promotion, free zones, company registration",
        key_responsibilities: [
            "Company incorporation and registration",
            "Free zone licensing and management",
            "Investment incentives administration",
            "One-stop shop for business establishment"
        ],
        website: "https://www.gafi.gov.eg",
        relevant_sectors: ["all"]
    },
    {
        name: "Information Technology Industry Development Agency",
        abbreviation: "ITIDA",
        jurisdiction: "IT industry development, e-signature regulation",
        key_responsibilities: [
            "Promoting IT and digital services industry",
            "Regulating e-signature services (E-Signature Law 15/2004)",
            "Supporting digital transformation initiatives",
            "Managing Digital Egypt strategy for offshoring"
        ],
        website: "https://www.itida.gov.eg",
        relevant_sectors: ["fintech_banking", "fintech_nbfs", "digital_services"]
    },
    {
        name: "National Telecommunication Regulatory Authority",
        abbreviation: "NTRA",
        jurisdiction: "Telecommunications, mobile services",
        key_responsibilities: [
            "Licensing telecom operators",
            "Regulating mobile wallet infrastructure",
            "Overseeing USSD-based financial services",
            "Cloud services and data center oversight"
        ],
        website: "https://www.tra.gov.eg",
        relevant_sectors: ["mobile_wallets", "telecom_fintech"]
    },
    {
        name: "Egyptian Money Laundering and Terrorist Financing Combating Unit",
        abbreviation: "EMLCU",
        jurisdiction: "AML/CFT compliance, suspicious transaction reporting",
        key_responsibilities: [
            "Financial Intelligence Unit (FIU) functions",
            "GoAML platform management for STR reporting",
            "AML/CFT policy enforcement",
            "Coordination with MENAFATF"
        ],
        website: "https://www.emlcu.org.eg",
        relevant_sectors: ["all_financial"]
    }
];
// ========== FINTECH REGULATORY REQUIREMENTS ==========
exports.regulatoryRequirements = [
    {
        id: "fintech-payments-pso",
        sector: "Fintech",
        subsector: "Payments",
        activity: "Payment System Operator (PSO)",
        regulator: "CBE",
        requirements: {
            entity_type: "Egyptian joint-stock company or bank licensed by CBE",
            minimum_capital: "Determined by CBE on case-by-case basis (typically EGP 50-100 million+)",
            ownership_rules: [
                "Must be an Egyptian-incorporated entity",
                "Foreign ownership permitted but subject to CBE approval",
                "CBE approval required for any ownership changes exceeding 10%",
                "Fit-and-proper requirements for major shareholders"
            ],
            licenses_needed: [
                "PSO license from CBE (2025 CBE Decision on licensing PSOs/PSPs)",
                "Commercial registration from GAFI",
                "Tax registration"
            ],
            key_laws: [
                "Central Bank and Banking Law No. 194 of 2020",
                "2025 CBE Decision on licensing and registering PSOs and PSPs",
                "Telecommunications Law No. 10 of 2003 (if telecom infrastructure used)"
            ],
            timeline_estimate: "6-18 months for full licensing",
            sandbox_available: false,
            sandbox_details: "CBE does not currently operate a public regulatory sandbox for PSOs"
        },
        compliance: {
            aml_kyc: [
                "Full KYC checks for all customers per AML Law 80/2002",
                "Integration with GoAML platform for suspicious transaction reporting (STRs)",
                "Risk-based approach to customer due diligence (CDD)",
                "Enhanced due diligence for high-risk customers",
                "CBE manual for identifying ownership structures (January 2025)"
            ],
            data_protection: [
                "Data Protection Law No. 151 of 2020 (executive regulations pending)",
                "Banking sector excluded from DPL — CBE is competent authority",
                "E-Signature Law No. 15 of 2004 for electronic authentication"
            ],
            reporting: [
                "Regular reporting to CBE on transaction volumes and values",
                "STR filing via GoAML platform",
                "Annual audit by two CBE-approved auditors",
                "Quarterly compliance reports"
            ],
            ongoing: [
                "Operational resilience requirements per 2025 CBE rules",
                "Cybersecurity and information security standards",
                "Consumer protection requirements",
                "Regular CBE inspections"
            ]
        },
        barriers: [
            "High capital requirements determined case-by-case by CBE",
            "Lengthy licensing process (6-18 months)",
            "Dual compliance with telecom regulators if USSD/mobile involved",
            "Requirement for experienced management team with banking background",
            "Limited guidance on exact licensing requirements — significant ambiguity noted by OECD"
        ],
        recent_changes: [
            {
                date: "2025-06",
                description: "CBE issued new licensing and registration rules for PSOs and PSPs with higher governance and operational resilience expectations",
                impact: "Higher compliance bar for new entrants; existing operators must upgrade",
                source: "Chambers & Partners Fintech 2026 Egypt"
            },
            {
                date: "2025-04",
                description: "InstaPay introduced transfer fees (0.1% of value; min EGP 0.50, max EGP 20)",
                impact: "Shift from free usage to monetization model; affects PSP business models",
                source: "Chambers & Partners Fintech 2026 Egypt"
            }
        ],
        last_updated: "2026-03"
    },
    {
        id: "fintech-payments-psp",
        sector: "Fintech",
        subsector: "Payments",
        activity: "Payment Service Provider (PSP)",
        regulator: "CBE",
        requirements: {
            entity_type: "Egyptian joint-stock company",
            minimum_capital: "Determined by CBE (typically lower than PSO, around EGP 25-50 million)",
            ownership_rules: [
                "Must be Egyptian-incorporated",
                "Foreign participation allowed with CBE approval",
                "Technology expertise among shareholders preferred",
                "CBE vetting of all significant shareholders"
            ],
            licenses_needed: [
                "PSP license from CBE",
                "Commercial registration",
                "Tax registration",
                "NTRA approval if mobile/telecom channels used"
            ],
            key_laws: [
                "Central Bank and Banking Law No. 194 of 2020",
                "2025 CBE Decision on PSO/PSP licensing",
                "Anti-Cyber and IT Crimes Law No. 175"
            ],
            timeline_estimate: "4-12 months",
            sandbox_available: false
        },
        compliance: {
            aml_kyc: [
                "KYC requirements per CBE guidelines",
                "GoAML integration mandatory",
                "Transaction monitoring systems required",
                "Periodic KYC refresh"
            ],
            data_protection: [
                "CBE data protection standards (banking sector exempt from DPL)",
                "E-Signature Law compliance for electronic transactions",
                "Anti-Cyber Crimes Law No. 175 compliance"
            ],
            reporting: [
                "Monthly transaction reports to CBE",
                "STR filing via GoAML",
                "Annual external audit"
            ],
            ongoing: [
                "Operational resilience per 2025 CBE rules",
                "Consumer protection measures",
                "Regular CBE supervision",
                "Information security standards"
            ]
        },
        barriers: [
            "CBE approval process lacks transparent timelines",
            "Must demonstrate technical infrastructure and security measures",
            "Competition from bank-affiliated PSPs with easier regulatory access",
            "OECD reports 'considerable ambiguity over what is needed to obtain license(s)'"
        ],
        recent_changes: [
            {
                date: "2025-06",
                description: "New CBE licensing rules for PSPs with enhanced governance requirements",
                impact: "Higher operational and compliance standards for payment providers",
                source: "Chambers & Partners Fintech 2026"
            }
        ],
        last_updated: "2026-03"
    },
    {
        id: "fintech-digital-banking",
        sector: "Fintech",
        subsector: "Digital Banking",
        activity: "Digital-Native Bank / Neobank",
        regulator: "CBE",
        requirements: {
            entity_type: "Egyptian joint-stock company with full banking license",
            minimum_capital: "EGP 5 billion minimum for banking license (general requirement)",
            ownership_rules: [
                "Subject to standard banking ownership rules",
                "CBE approval for all shareholders",
                "Fit-and-proper requirements for board and management",
                "Foreign ownership subject to CBE approval"
            ],
            licenses_needed: [
                "Full banking license from CBE",
                "Digital banking approval from CBE",
                "Commercial registration",
                "Tax registration"
            ],
            key_laws: [
                "Central Bank and Banking Law No. 194 of 2020",
                "CBE digital banking direction/guidelines",
                "E-Signature Law No. 15 of 2004"
            ],
            timeline_estimate: "12-24+ months (market inflection point reached August 2025 with first approval)",
            sandbox_available: false,
            sandbox_details: "No formal sandbox, but CBE has shown willingness to engage in structured dialogue"
        },
        compliance: {
            aml_kyc: [
                "Full banking-grade AML/KYC per CBE standards",
                "GoAML integration",
                "eKYC capabilities required (facial recognition, document verification)",
                "Enhanced CDD for digital onboarding"
            ],
            data_protection: [
                "CBE-specific data protection requirements",
                "Cybersecurity framework compliance",
                "Cloud hosting standards"
            ],
            reporting: [
                "Full banking supervision reporting",
                "Dual external auditors (CBE-approved)",
                "Basel framework compliance",
                "Liquidity and capital adequacy reporting"
            ],
            ongoing: [
                "Full banking supervision by CBE",
                "Capital adequacy requirements",
                "Deposit insurance participation",
                "Consumer protection standards"
            ]
        },
        barriers: [
            "Extremely high capital requirements (EGP 5 billion+)",
            "Only one digital-native bank approved as of 2025 (Misr Digital Innovation → onebank)",
            "No established track record of CBE granting new digital-only banking licenses",
            "Competition from incumbent banks with digital divisions",
            "Full banking regulation applies — no 'lite' digital banking license exists"
        ],
        recent_changes: [
            {
                date: "2025-08",
                description: "Banque Misr's Misr Digital Innovation received approval to transition into 'onebank' — Egypt's first fully digital-native bank",
                impact: "Market inflection point; multiple banks and fintechs now signalling interest in digital bank licensing",
                source: "Chambers & Partners Fintech 2026"
            }
        ],
        last_updated: "2026-03"
    },
    {
        id: "fintech-nbfs-lending",
        sector: "Fintech",
        subsector: "Non-Banking Financial Services (NBFS)",
        activity: "Fintech Lending (Consumer Finance / Microfinance / SME Finance / Factoring / Leasing)",
        regulator: "FRA",
        requirements: {
            entity_type: "Egyptian joint-stock company",
            minimum_capital: "EGP 15 million minimum per type of service (paid-up)",
            ownership_rules: [
                "Minimum 25% of the company must be owned by technology or fintech experts",
                "Must be Egyptian joint-stock company",
                "Foreign ownership allowed but company must be Egyptian-incorporated",
                "FRA approval for ownership changes"
            ],
            licenses_needed: [
                "FRA fintech license per Decree No. 286 of 2023 (effective January 2024)",
                "Separate license required for each activity type (mortgage, SME finance, microfinance, leasing, factoring, consumer finance)",
                "Commercial registration",
                "Tax registration"
            ],
            key_laws: [
                "Fintech Law No. 5 of 2022 and its Executive Regulations",
                "FRA Decree No. 286 of 2023 (establishment and licensing rules)",
                "FRA Decree No. 268 of 2023 (startup licensing procedures)",
                "Relevant activity-specific laws (Consumer Finance Law, Microfinance Law, etc.)"
            ],
            timeline_estimate: "3-9 months (FRA sandbox can accelerate testing phase)",
            sandbox_available: true,
            sandbox_details: "CORBEH sandbox operated by FRA in collaboration with Egypt Securities Exchange. Allows testing fintech solutions in live regulatory environment for limited duration. Established per FRA Decree No. 163 of 2024. Features: adaptable licensing, capital flexibility, compliance obligations, consumer protection focus."
        },
        compliance: {
            aml_kyc: [
                "AML Law No. 80 of 2002 and Executive Regulations",
                "FRA Decree No. 161 (October 2024) — digital identity verification for NBFIs",
                "GoAML platform integration for STR reporting",
                "eKYC capabilities: facial recognition with 3D liveness detection, document verification via OCR"
            ],
            data_protection: [
                "Data Protection Law No. 151 of 2020 applies to NBFS sector",
                "Personal data processing requires consent and DPC licensing",
                "Anti-Cyber Crimes Law No. 175 compliance"
            ],
            reporting: [
                "Regular reporting to FRA",
                "STR filing via GoAML",
                "Annual financial statements",
                "Compliance reporting per FRA requirements"
            ],
            ongoing: [
                "FRA supervision and inspections",
                "Information security and technical infrastructure maintenance",
                "Consumer protection obligations",
                "Any product changes require FRA regulatory approval (can take months)",
                "Outsourcing only to FRA-registered service providers (Decree 141/2023)"
            ]
        },
        barriers: [
            "EGP 15 million minimum capital per service type — adds up fast if offering multiple services",
            "25% tech/fintech expert ownership requirement limits investor structures",
            "Product changes require FRA re-approval — slows iteration",
            "44% of surveyed fintech startups cite regulatory compliance as top growth challenge (CBE 2023)",
            "OECD notes 'complex and time consuming' licensing with 'considerable ambiguity'",
            "Must demonstrate unique selling points vs existing market operators"
        ],
        recent_changes: [
            {
                date: "2024-11",
                description: "FRA issued Decree No. 163 of 2024 establishing CORBEH regulatory sandbox",
                impact: "Opens structured pathway for fintech startups to test products before full licensing",
                source: "Chambers & Partners Doing Business In Egypt 2025"
            },
            {
                date: "2024-10",
                description: "FRA Decree No. 161 requiring digital identity verification for NBFIs",
                impact: "Mandates eKYC capabilities for all non-banking financial institutions",
                source: "VOVE ID AML Compliance Guide"
            },
            {
                date: "2024-01",
                description: "FRA Decree No. 286 of 2023 came into force — unified framework for fintech company establishment and licensing",
                impact: "First clear framework for fintech lending company incorporation; EGP 15M capital, 25% tech ownership",
                source: "Baker McKenzie / Global Compliance News"
            }
        ],
        last_updated: "2026-03"
    },
    {
        id: "fintech-insurtech",
        sector: "Fintech",
        subsector: "Insurance Technology",
        activity: "Insurtech Provider",
        regulator: "FRA",
        requirements: {
            entity_type: "Egyptian joint-stock company",
            minimum_capital: "EGP 15 million minimum (per FRA fintech licensing rules)",
            ownership_rules: [
                "25% ownership by tech/fintech experts required",
                "Must be Egyptian-incorporated JSC",
                "FRA approval for ownership structure"
            ],
            licenses_needed: [
                "FRA fintech license for insurance-related activities",
                "Compliance with Insurance Supervision Law",
                "Commercial registration",
                "Tax registration"
            ],
            key_laws: [
                "Fintech Law No. 5 of 2022",
                "Insurance Supervision Law",
                "FRA decrees on insurtech licensing"
            ],
            timeline_estimate: "6-12 months",
            sandbox_available: true,
            sandbox_details: "CORBEH sandbox available for insurtech testing"
        },
        compliance: {
            aml_kyc: [
                "AML Law compliance",
                "KYC for insurance customers",
                "GoAML integration"
            ],
            data_protection: [
                "Data Protection Law No. 151 of 2020",
                "Insurance-specific data handling rules"
            ],
            reporting: [
                "FRA reporting requirements",
                "Actuarial reporting",
                "Claims data reporting"
            ],
            ongoing: [
                "FRA supervision",
                "Solvency requirements",
                "Consumer protection standards",
                "Technical infrastructure maintenance"
            ]
        },
        barriers: [
            "Insurance sector heavily regulated with legacy frameworks",
            "Limited insurtech-specific regulatory guidance",
            "Partnerships with licensed insurers often required",
            "Consumer trust in digital insurance still developing"
        ],
        recent_changes: [
            {
                date: "2025-01",
                description: "FRA Decree No. 158 of 2025 allowed non-resident foreign reinsurance brokers to register",
                impact: "Opens reinsurance brokerage to foreign participation for the first time",
                source: "Chambers & Partners Fintech 2026"
            }
        ],
        last_updated: "2026-03"
    },
    {
        id: "fintech-robo-advisory",
        sector: "Fintech",
        subsector: "Investment Technology",
        activity: "Robo-Advisory Services",
        regulator: "FRA",
        requirements: {
            entity_type: "Licensed portfolio management company",
            minimum_capital: "Per FRA portfolio management company requirements",
            ownership_rules: [
                "Must be a licensed portfolio management company",
                "FRA approval for robo-advisory capabilities"
            ],
            licenses_needed: [
                "Portfolio management license from FRA",
                "Robo-advisory approval per FRA Decree No. 57 of 2024",
                "Commercial registration",
                "Tax registration"
            ],
            key_laws: [
                "Capital Markets Law No. 95 of 1992",
                "FRA Decree No. 57 of 2024 (robo-advisory rules)",
                "Fintech Law No. 5 of 2022"
            ],
            timeline_estimate: "6-12 months (requires existing portfolio management license)",
            sandbox_available: true
        },
        compliance: {
            aml_kyc: [
                "Capital markets KYC requirements",
                "AML Law compliance",
                "Investor suitability assessments"
            ],
            data_protection: [
                "Data Protection Law No. 151 of 2020",
                "AI algorithm transparency requirements per FRA"
            ],
            reporting: [
                "FRA reporting on portfolio performance",
                "Algorithm audit requirements",
                "Client reporting standards"
            ],
            ongoing: [
                "AI algorithm must operate securely, transparently, and fairly",
                "Regular algorithm audits",
                "FRA supervision",
                "Consumer protection obligations"
            ]
        },
        barriers: [
            "Requires existing portfolio management license — cannot enter solely as robo-advisor",
            "AI transparency and fairness requirements add compliance overhead",
            "Small addressable market — investment culture still developing in Egypt",
            "Competition from bank wealth management divisions"
        ],
        recent_changes: [
            {
                date: "2024-01",
                description: "FRA Decree No. 57 of 2024 established rules for robo-advisory services",
                impact: "First formal framework for automated investment advice in Egypt; only portfolio management companies authorized",
                source: "Chambers & Partners Doing Business In Egypt 2025"
            }
        ],
        last_updated: "2026-03"
    },
    {
        id: "fintech-open-banking",
        sector: "Fintech",
        subsector: "Open Banking / API Services",
        activity: "Open Banking Provider / API Aggregator",
        regulator: "CBE",
        requirements: {
            entity_type: "Bank or licensed PSP/PSO",
            minimum_capital: "Per underlying license type (bank or PSP/PSO)",
            ownership_rules: [
                "Must hold underlying banking or payment license",
                "CBE approval for all API-based services"
            ],
            licenses_needed: [
                "Underlying banking or PSP/PSO license from CBE",
                "Specific CBE approval for API/open banking services",
                "InstaPay network participation approval"
            ],
            key_laws: [
                "CBE open banking regulations",
                "Central Bank and Banking Law No. 194 of 2020",
                "InstaPay/IPN rules and regulations"
            ],
            timeline_estimate: "Dependent on underlying license (6-18 months)",
            sandbox_available: false
        },
        compliance: {
            aml_kyc: [
                "Banking-grade KYC requirements",
                "API security and authentication standards",
                "Third-party access controls"
            ],
            data_protection: [
                "CBE data sharing rules",
                "Customer consent management for data sharing",
                "API security standards"
            ],
            reporting: [
                "API usage reporting to CBE",
                "Transaction monitoring reports",
                "Security incident reporting"
            ],
            ongoing: [
                "API uptime and availability standards",
                "Security audits",
                "CBE supervision",
                "Customer consent management"
            ]
        },
        barriers: [
            "Requires underlying banking or payment license first",
            "Open banking framework still maturing — limited precedent",
            "Bank resistance to data sharing",
            "Technical integration challenges with legacy banking systems",
            "OECD notes 'considerable potential' but implementation still early"
        ],
        recent_changes: [
            {
                date: "2025-06",
                description: "InstaPay reached ~16 million users; processed 1.1 billion transactions worth EGP 2.4 trillion in H1 2025",
                impact: "Massive growth in instant payments validates open banking infrastructure",
                source: "Chambers & Partners Fintech 2026"
            }
        ],
        last_updated: "2026-03"
    }
];
// ========== FREE ZONES ==========
exports.freeZones = [
    {
        name: "Suez Canal Economic Zone (SCZONE)",
        location: "Suez Canal corridor — Ain Sokhna, East Port Said, Qantara West, East Ismailia",
        sectors_focus: [
            "Textiles & garments",
            "Automotive",
            "Pharmaceuticals",
            "Solar PV & batteries",
            "Agribusiness",
            "Logistics & warehousing",
            "Petrochemicals",
            "IT services"
        ],
        incentives: [
            "Streamlined customs procedures",
            "Proximity to Suez Canal shipping lanes",
            "Dedicated industrial infrastructure",
            "Government priority project status"
        ],
        foreign_ownership: "100% foreign ownership permitted in free zones",
        tax_benefits: [
            "Exemption from customs duties on imports for production",
            "Exemption from sales tax on goods produced for export",
            "Reduced corporate tax rates in some zones",
            "No restrictions on profit repatriation"
        ],
        key_requirements: [
            "GAFI approval for free zone operations",
            "Compliance with zone-specific regulations",
            "Minimum investment thresholds vary by zone",
            "Environmental impact assessments may be required"
        ]
    },
    {
        name: "New Administrative Capital",
        location: "45 km east of Cairo",
        sectors_focus: [
            "Financial services",
            "Government services",
            "Technology",
            "Real estate",
            "Smart city infrastructure"
        ],
        incentives: [
            "Modern infrastructure",
            "Government proximity (ministries relocated)",
            "Smart city technology integration",
            "Business district with Grade A office space"
        ],
        foreign_ownership: "Standard Egyptian company rules apply (not a free zone per se)",
        tax_benefits: [
            "Standard Egyptian corporate tax (22.5%)",
            "Potential investment incentives through GAFI"
        ],
        key_requirements: [
            "Standard company incorporation via GAFI",
            "Sector-specific licensing",
            "Building and occupancy permits"
        ]
    },
    {
        name: "Smart Village (Cairo)",
        location: "6th of October City, Giza",
        sectors_focus: [
            "Information technology",
            "Telecommunications",
            "Business process outsourcing",
            "Fintech",
            "Digital services"
        ],
        incentives: [
            "Technology cluster benefits",
            "Proximity to tech talent pool",
            "Established IT infrastructure",
            "Networking with 150+ tech companies"
        ],
        foreign_ownership: "Standard rules apply",
        tax_benefits: [
            "IT sector incentives may apply",
            "ITIDA support programs available"
        ],
        key_requirements: [
            "Office space lease in Smart Village",
            "Standard company incorporation",
            "Sector-specific licensing"
        ]
    }
];
exports.sectorComparisons = [
    {
        sector: "Fintech - Payments (PSO/PSP)",
        regulatory_complexity: "Very High",
        capital_requirement_range: "EGP 25-100+ million",
        time_to_license: "4-18 months",
        number_of_regulators: 3,
        primary_regulators: ["CBE", "NTRA (if mobile)", "EMLCU"],
        sandbox_available: false,
        foreign_ownership_allowed: true,
        foreign_ownership_restrictions: "CBE approval required; must be Egyptian-incorporated entity",
        growth_rate_2025: "InstaPay: 16M users, 1.5B transactions in 2024"
    },
    {
        sector: "Fintech - NBFS Lending",
        regulatory_complexity: "High",
        capital_requirement_range: "EGP 15 million per service type",
        time_to_license: "3-9 months",
        number_of_regulators: 2,
        primary_regulators: ["FRA", "EMLCU"],
        sandbox_available: true,
        foreign_ownership_allowed: true,
        foreign_ownership_restrictions: "Must be Egyptian JSC; 25% owned by tech experts",
        growth_rate_2025: "177+ fintech startups active; sector growing 14-16% annually"
    },
    {
        sector: "Fintech - Digital Banking",
        regulatory_complexity: "Very High",
        capital_requirement_range: "EGP 5 billion+",
        time_to_license: "12-24+ months",
        number_of_regulators: 2,
        primary_regulators: ["CBE", "EMLCU"],
        sandbox_available: false,
        foreign_ownership_allowed: true,
        foreign_ownership_restrictions: "Subject to banking ownership rules and CBE approval",
        growth_rate_2025: "First approval (onebank) August 2025 — market still nascent"
    },
    {
        sector: "Fintech - Insurtech",
        regulatory_complexity: "High",
        capital_requirement_range: "EGP 15 million+",
        time_to_license: "6-12 months",
        number_of_regulators: 2,
        primary_regulators: ["FRA", "EMLCU"],
        sandbox_available: true,
        foreign_ownership_allowed: true,
        foreign_ownership_restrictions: "Must be Egyptian JSC; 25% tech expert ownership",
        growth_rate_2025: "Emerging — limited data; insurance sector growing"
    },
    {
        sector: "ICT / Digital Services (non-financial)",
        regulatory_complexity: "Low",
        capital_requirement_range: "No minimum (standard company incorporation)",
        time_to_license: "1-4 weeks for basic incorporation",
        number_of_regulators: 1,
        primary_regulators: ["GAFI (incorporation only)"],
        sandbox_available: false,
        foreign_ownership_allowed: true,
        foreign_ownership_restrictions: "Generally unrestricted for IT services",
        growth_rate_2025: "14-16% annual growth; $1.7B in digital exports 2024"
    },
    {
        sector: "Real Estate / Construction",
        regulatory_complexity: "Medium",
        capital_requirement_range: "Varies widely by project scale",
        time_to_license: "2-6 months",
        number_of_regulators: 3,
        primary_regulators: ["GAFI", "Local governorate", "Real estate regulatory authority"],
        sandbox_available: false,
        foreign_ownership_allowed: true,
        foreign_ownership_restrictions: "Some restrictions on agricultural land; urban property generally open",
        growth_rate_2025: "7.4-7.6% annual growth; $75B market projected by 2029"
    },
    {
        sector: "Manufacturing (General)",
        regulatory_complexity: "Medium",
        capital_requirement_range: "Varies by industry and scale",
        time_to_license: "2-6 months",
        number_of_regulators: 2,
        primary_regulators: ["GAFI", "Industrial Development Authority"],
        sandbox_available: false,
        foreign_ownership_allowed: true,
        foreign_ownership_restrictions: "Generally unrestricted; incentives in special economic zones",
        growth_rate_2025: "Non-oil manufacturing up 14.5% in Q1 FY2025/26"
    },
    {
        sector: "Renewable Energy",
        regulatory_complexity: "Medium",
        capital_requirement_range: "Project-dependent (typically $10M+)",
        time_to_license: "3-12 months",
        number_of_regulators: 3,
        primary_regulators: ["Egyptian Electricity Authority", "New & Renewable Energy Authority", "GAFI"],
        sandbox_available: false,
        foreign_ownership_allowed: true,
        foreign_ownership_restrictions: "BOO/BOOT models available; PPAs with government",
        growth_rate_2025: "Government target: 42% renewable energy by 2030"
    }
];
exports.legalFrameworks = [
    {
        name: "Central Bank and Banking Law",
        number: "No. 194",
        year: 2020,
        scope: "Banking sector regulation, payments, digital banking",
        key_provisions: [
            "Establishes licensing framework for banks, PSOs, and PSPs",
            "Defines payment systems and payment services framework",
            "Grants CBE supervisory powers over banking fintech",
            "Requires two CBE-approved auditors for each bank",
            "Regulates mobile wallets and digital banking",
            "Mandates registration with CBE for third-party service providers to banks"
        ],
        relevant_sectors: ["fintech_banking", "payments", "digital_banking"],
        recent_amendments: [
            "2025 CBE Decision on licensing PSOs and PSPs (enhanced governance requirements)"
        ]
    },
    {
        name: "Fintech Law (Non-Banking Financial Technology)",
        number: "No. 5",
        year: 2022,
        scope: "Non-banking financial services using technology",
        key_provisions: [
            "Regulates use of fintech in non-banking sector",
            "Covers: real estate funding, SME/micro finance, leasing, factoring, consumer finance",
            "No fintech activity inside or outside Egypt for Egyptian residents without FRA license (Article 3)",
            "FRA authorized to establish regulatory sandbox (CORBEH)",
            "Sets framework for outsourcing of fintech functions"
        ],
        relevant_sectors: ["fintech_nbfs", "consumer_finance", "microfinance", "insurtech"],
        recent_amendments: [
            "FRA Decree 286/2023 — fintech company establishment and licensing rules",
            "FRA Decree 268/2023 — startup licensing procedures",
            "FRA Decree 163/2024 — CORBEH sandbox establishment",
            "FRA Decree 57/2024 — robo-advisory rules",
            "FRA Decree 141/2023 — outsourcing service providers registry"
        ]
    },
    {
        name: "Anti-Money Laundering Law",
        number: "No. 80",
        year: 2002,
        scope: "AML/CFT across all financial sectors",
        key_provisions: [
            "Criminalizes money laundering",
            "Requires STR reporting to EMLCU",
            "Asset freezing mechanisms",
            "KYC and CDD requirements",
            "Applies to fintech startups and VASPs (since 2023 amendment)"
        ],
        relevant_sectors: ["all_financial"],
        recent_amendments: [
            "Prime Ministerial Decree 3331/2023 — expanded reporting entities to include fintechs and VASPs",
            "CBE ownership structure identification manual (January 2025)"
        ]
    },
    {
        name: "Data Protection Law",
        number: "No. 151",
        year: 2020,
        scope: "Personal data protection (executive regulations still pending)",
        key_provisions: [
            "Governs processing, handling, and control of personal data",
            "Requires data subject consent for processing",
            "Licensing from Data Protection Centre required",
            "Banking sector EXCLUDED — CBE is competent authority",
            "Applies to any controller/processor of personal data",
            "Extraterritorial application to non-Egyptians processing Egyptian data"
        ],
        relevant_sectors: ["all"],
        recent_amendments: [
            "Executive Regulations still NOT issued as of 2026 — creates uncertainty"
        ]
    },
    {
        name: "E-Signature Law",
        number: "No. 15",
        year: 2004,
        scope: "Electronic contracts and authentication",
        key_provisions: [
            "Enables electronic contracts",
            "Regulates electronic authentication methods",
            "Supervised by ITIDA",
            "Legal recognition of e-signatures"
        ],
        relevant_sectors: ["all_digital"],
        recent_amendments: []
    },
    {
        name: "Anti-Cyber and Information Technology Crimes Law",
        number: "No. 175",
        year: 2018,
        scope: "Cybercrime and data security",
        key_provisions: [
            "Addresses illegitimate online activities compromising data security",
            "Criminal penalties for unauthorized data access",
            "Cybersecurity obligations for service providers"
        ],
        relevant_sectors: ["all_digital"],
        recent_amendments: []
    },
    {
        name: "New Egyptian Labour Law",
        number: "No. 14",
        year: 2025,
        scope: "Employment and labor relations",
        key_provisions: [
            "Published May 3, 2025; effective September 1, 2025",
            "Replaces Labour Law No. 12 of 2003",
            "Any condition violating employee rights is invalid",
            "Better benefits from employment contracts remain valid even if exceeding law minimums"
        ],
        relevant_sectors: ["all"],
        recent_amendments: [
            "Entirely new law replacing 2003 legislation — effective September 2025"
        ]
    },
    {
        name: "Investment Law",
        number: "No. 72",
        year: 2017,
        scope: "Investment incentives and protection",
        key_provisions: [
            "General and special incentives for investors",
            "Investment guarantees and protections",
            "Free zone and special economic zone frameworks",
            "One-stop shop through GAFI",
            "Dispute resolution mechanisms"
        ],
        relevant_sectors: ["all"],
        recent_amendments: []
    },
    {
        name: "Companies Law",
        number: "No. 159",
        year: 1981,
        scope: "Company incorporation and governance",
        key_provisions: [
            "Governs joint-stock companies (required for most fintech activities)",
            "LLC and partnership regulations",
            "Corporate governance requirements",
            "Shareholder rights and protections"
        ],
        relevant_sectors: ["all"],
        recent_amendments: []
    }
];
