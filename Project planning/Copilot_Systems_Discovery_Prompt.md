# Copilot Query — WCO Systems & Capabilities Discovery

**Purpose:** Scoping a read-only, internal analytics and tracking platform for the Owned Brands team. I need to understand our systems and capabilities so I can design the integration architecture and a read-only data-access request.

**Scope note for this query:** Please answer from available IT / system documentation. I am **not** asking for any data, records, credentials, connection strings, or security-sensitive configuration — only architecture, capabilities, standards, and process. Where documentation isn't available for an item, please say so and point me to the team or document that would have it.

---

## 1. Data sources and how data is exposed

1. Our ERP is **CORE** and our CRM is **USD**. How is data from each made available for downstream analytical or reporting use?
2. Is there an enterprise data warehouse, data lake, or lakehouse that aggregates CORE and USD data? If so, what platform is it built on (e.g., Microsoft Fabric, Azure Synapse, Snowflake, Databricks, SQL Server)?
3. What are the supported, standard mechanisms for **read-only** programmatic access to these systems or to the warehouse — REST/OData APIs, ODBC/JDBC, scheduled data exports, Power BI datasets/dataflows, or other?
4. Is there a documented data catalog or data dictionary covering sales transactions, products/SKUs, accounts, and contacts?
5. What is the typical refresh latency of the reporting/warehouse layer (real-time, hourly, nightly)?

## 2. Hosting for an internal application and database

6. What sanctioned platforms exist for building an internal departmental application inside our tenant (e.g., Power Platform / Power Apps, Azure App Service, Microsoft Fabric)?
7. What database options are sanctioned for a departmental internal system (e.g., Dataverse, Azure SQL, Fabric)?
8. Is there a standard or preferred path for a team to stand up its own internal app + database?

## 3. Identity and access

9. What is the standard identity provider / SSO for internal applications (e.g., Microsoft Entra ID)?
10. How is role-based access control typically implemented for internal apps?

## 4. Integration, automation, and BI tooling

11. What ETL / data-integration tooling is sanctioned (e.g., Azure Data Factory, Fabric pipelines, Power Automate, Logic Apps)?
12. Power BI is in use here. Can a team build its own datasets/dataflows sourced from the governed warehouse, and what's the standard for doing so?

## 5. AI services available in-tenant

13. What AI services are available within our tenant for building internal solutions (e.g., Azure OpenAI, Copilot Studio, AI Builder, Fabric AI)?
14. Are there sanctioned patterns for document/datasheet processing — OCR or document intelligence — for extracting structured data from product datasheets?
15. Is there a policy or pattern for keeping data in-tenant when using these AI services?

## 6. Governance and access process

16. What is the process, and what approvals are required, to request **read-only** access to CORE, USD, or the warehouse data?
17. Is there a data classification framework, and how are sales, margin/cost, and contact data classified under it?
18. Who owns data-access governance, and what body reviews/approves such requests?
