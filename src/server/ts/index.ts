import * as alt from 'alt-server';

alt.on(
    'weaponDamage',
    (
        source: alt.Player,
        target: alt.Entity,
        weaponHash: number,
        damage: number,
        offset: alt.Vector3,
        bodyPart: alt.BodyPart
    ) => {
        AddHitmarker(source, target.pos, damage.toString());
    }
);

function AddHitmarker(source: alt.Player, targetPosition: alt.Vector3, damage: string) {
    let x = generateRandomValue();
    let y = generateRandomValue();
    let z = generateRandomValue();

    source.emit('Hitmarker:Add', damage, targetPosition.x + x, targetPosition.y + y, targetPosition.z + z);
}

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean(): boolean {
    return Math.random() < 0.5;
}

function generateRandomValue(): number {
    const random = getRandomNumber(1, 5);
    let x = 1 + random;
    const isNegative = getRandomBoolean();

    if (isNegative) {
        x = -x;
    }

    return x * 0.1;
}
