export interface MonsterReference {
    name: string;
    book?: string;
}

export interface Monster {
    source: string;
    name: string;
    isNpc: boolean;
    _copy: boolean;
}
