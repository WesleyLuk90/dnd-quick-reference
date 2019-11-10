import { Speed, Speeds } from "./Monster";

enum SpeedTypes {
    WALK = "walk",
    CLIMB = "climb",
    SWIM = "swim",
    FLY = "fly",
    BURROW = "burrow"
}

function getDefaultSpeed(speeds: Speeds): Speed | null {
    const walkSpeed = speeds[SpeedTypes.WALK];
    if (walkSpeed == null) {
        return null;
    }
    if (
        [
            SpeedTypes.CLIMB,
            SpeedTypes.SWIM,
            SpeedTypes.FLY,
            SpeedTypes.BURROW
        ].some(type => speeds[type] != null)
    ) {
        return null;
    }
    return walkSpeed;
}

export function formatSpeeds(speeds: Speeds) {
    const defaultSpeed = getDefaultSpeed(speeds);
    if (defaultSpeed != null) {
        return formatSpeed(defaultSpeed);
    }
    return [speeds.walk, speeds.climb, speeds.swim, speeds.fly, speeds.burrow]
        .filter((s): s is Speed => s != null)
        .map(formatSpeed)
        .join(", ");
}

export function formatSpeed(speed: Speed) {
    if (typeof speed == "number") {
        return speed;
    }
    return speed.number;
}
