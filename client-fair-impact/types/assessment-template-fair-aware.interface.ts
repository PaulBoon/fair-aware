export interface ContentLanguageModuleFairAwareTemplate {
  dotCLM: string;
  lang: string;
  langCode: string;
  dot: string;
  introSupportEmail: string;
  startPageIntro: DotStartPageIntro;
  aboutInfo: string;
  howToModuleInfo: string;
  assessment: DotPrinciple[];
}

export interface ContentLanguageModuleFairAwareTemplateWithAnswers
  extends Omit<ContentLanguageModuleFairAwareTemplate, "assessment"> {
  assessment: DotPrincipleWithAnswers[];
}

export interface DotStartPageIntro {
  title: string;
  text: string;
  introUrl: {
    link: string;
    label: string;
  };
}

export interface DotPrinciple {
  principle: string;
  criteria: DigitalObjectTypeCriteria[];
}

export interface DotPrincipleWithAnswers {
  principle: string;
  criteria: DigitalObjectTypeCriteriaAnswer[];
}

export interface DigitalObjectTypeCriteria {
  criteria: string;
  question: string;
  principle: string;
  likelihood: DotLikelihood;
  support: DotSupport;
}

export interface DigitalObjectTypeCriteriaAnswer
  extends DigitalObjectTypeCriteria {
  answer?: string;
}

export interface DotLikelihood {
  label: string;
}

export interface DotSupport {
  what: DotSupportSection;
  why: DotSupportSection;
  how: DotSupportSection;
  more: DotSupportSection;
}

export interface DotSupportSection {
  title: string;
  text: string;
  links: SupportLink[];
}

export interface SupportLink {
  link: string;
  label: string;
}
