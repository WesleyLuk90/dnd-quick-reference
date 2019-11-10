import { sentenceCase } from "../utils/Formatting";

export enum SkillType {
    ACROBATICS = "acrobatics",
    PERCEPTION = "perception",
    STEALTH = "stealth",
    HISTORY = "history",
    INSIGHT = "insight",
    INTIMIDATION = "intimidation",
    PERSUASION = "persuasion",
    PERFORMANCE = "performance",
    ARCANA = "arcana",
    INVESTIGATION = "investigation",
    RELIGION = "religion",
    ATHLETICS = "athletics",
    NATURE = "nature",
    SURVIVAL = "survival",
    DECEPTION = "deception",
    MEDICINE = "medicine",
    ANIMAL_HANDLING = "animal handling",
    SLEIGHT_OF_HAND = "sleight of hand"
}

export const SkillTypes = Object.values(SkillType);

export function skillLabel(skill: SkillType) {
    return sentenceCase(skill);
}
