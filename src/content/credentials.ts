// Professional verification content.
// Source: content/credential_public_metadata.json
// Policy: public verification policy — summary only, no raw documents.

import data from "@content/credential_public_metadata.json";
import type { ProfessionalVerification } from "@/lib/types";

export const professionalVerification: ProfessionalVerification =
  data.professionalVerification;

// Approved verification language — public verification policy.
// Employment facts and project facts are supported by different evidence, so
// the two are stated separately rather than merged into one broad claim.
export const verificationLanguage = [
  "Employment facts are supported by employment documentation.",
  "Project details and metrics are supported by résumé / project records.",
] as const;
