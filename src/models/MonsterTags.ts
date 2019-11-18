export enum ActionTag {
    MULTIATTACK = "Multiattack",
    TENTACLES = "Tentacles",
    PARRY = "Parry",
    FRIGHTFUL_PRESENCE = "Frightful Presence",
    TELEPORT = "Teleport",
    SWALLOW = "Swallow"
}

export enum DamageTag {
    BLUDGEONING = "B",
    PIERCING = "P",
    FIRE = "F",
    ACID = "A",
    SLASHING = "S",
    RADIANT = "R",
    THUNDER = "T",
    NECROTIC = "N",
    COLD = "C",
    LIGHTING = "L",
    PSYCHIC = "Y",
    POISON = "I",
    FORCE = "O"
}

export enum SenseTag {
    BLINDSIGHT = "B",
    DARKVISION = "D",
    SUPERIOR_DARKVISION = "SD",
    TRUESIGHT = "U",
    TREMORSENSE = "T"
}

export enum TraitTag {
    MAGIC_RESISTANCE = "Magic Resistance",
    FALSE_APPEARANCE = "False Appearance",
    FEY_ANCESTRY = "Fey Ancestry",
    KEEN_SENSES = "Keen Senses",
    SNEAK_ATTACK = "Sneak Attack",
    AMPHIBIOUS = "Amphibious",
    MAGIC_WEAPONS = "Magic Weapons",
    IMMUTABLE_FORM = "Immutable Form",
    DAMAGE_ABSORPTION = "Damage Absorption",
    HOLD_BREATH = "Hold Breath",
    LEGENDARY_RESISTANCES = "Legendary Resistances",
    REGENERATION = "Regeneration",
    DEVILS_SIGHT = "Devil's Sight",
    SPIDER_CLIMB = "Spider Climb",
    SHAPECHANGER = "Shapechanger",
    ANTIMAGIC_SUSCEPTIBILITY = "Antimagic Susceptibility",
    SIEGE_MONSTER = "Siege Monster",
    BRUTE = "Brute",
    INCORPOREAL_MOVEMENT = "Incorporeal Movement",
    AMBUSHER = "Ambusher",
    REJUVENATION = "Rejuvenation",
    TURN_IMMUNITY = "Turn Immunity",
    SUNLIGHT_SENSITIVITY = "Sunlight Sensitivity",
    FLYBY = "Flyby",
    POUNCE = "Pounce",
    ILLUMINATION = "Illumination",
    DEATH_BURST = "Death Burst",
    RECKLESS = "Reckless",
    PACK_TACTICS = "Pack Tactics",
    AGGRESSIVE = "Aggressive",
    TURN_RESISTANCE = "Turn Resistance",
    UNDEAD_FORTITUDE = "Undead Fortitude",
    WATER_BREATHING = "Water Breathing",
    WEB_SENSE = "Web Sense",
    WEB_WALKER = "Web Walker",
    AMORPHOUS = "Amorphous",
    CHARGE = "Charge",
    LIGHT_SENSITIVITY = "Light Sensitivity",
    RAMPAGE = "Rampage"
}

export enum LanguageTag {
    C = "C",
    DR = "DR",
    CS = "CS",
    E = "E",
    GO = "GO",
    O = "O",
    CE = "CE",
    U = "U",
    XX = "XX",
    D = "D",
    GI = "GI",
    DU = "DU",
    S = "S",
    H = "H",
    G = "G",
    TC = "TC",
    AB = "AB",
    I = "I",
    AQ = "AQ",
    X = "X",
    TP = "TP",
    P = "P",
    OTH = "OTH",
    DS = "DS",
    AU = "AU",
    IG = "IG",
    T = "T",
    GTH = "GTH"
}

export enum SpellcastingTag {
    CP = "CP",
    CB = "CB",
    I = "I",
    CL = "CL",
    CR = "CR",
    CD = "CD",
    P = "P",
    CC = "CC",
    CW = "CW",
    CS = "CS",
    S = "S",
    F = "F"
}

export enum MiscTag {
    MW = "MW",
    RCH = "RCH",
    AOE = "AOE",
    RW = "RW",
    RNG = "RNG",
    THW = "THW"
}

export class MonsterTags {
    constructor(
        readonly actions: ActionTag[],
        readonly damageTags: DamageTag[],
        readonly languageTags: LanguageTag[],
        readonly miscTags: MiscTag[],
        readonly senseTags: SenseTag[],
        readonly spellcastingTags: SpellcastingTag[],
        readonly traitTag: TraitTag[]
    ) {}
}
