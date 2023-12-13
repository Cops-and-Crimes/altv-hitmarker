import * as alt from 'alt-server';

alt.on(
    'weaponDamage',
    (
        attacker: alt.Player,
        target: alt.Entity,
        weaponHash: number,
        damage: number,
        offset: alt.Vector3,
        bodyPart: alt.BodyPart
    ) => {
        attacker.emit('Hitmarker:Add', damage.toString(), target.pos);
    }
);
