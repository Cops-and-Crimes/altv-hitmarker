import * as alt from 'alt-client';
import * as native from 'natives';

interface Hitmarker {
    damage: string;
    x: number;
    y: number;
    z: number;
    CreatedAt: number;
}

alt.onServer('Hitmarker:Add', AddHitmarker);
function AddHitmarker(damage: string, x: number, y: number, z: number) {
    hitmarkerSet.add({
        damage: damage,
        x: x,
        y: y,
        z: z,
        CreatedAt: Date.now(),
    });
}

let hitmarkerSet = new Set<Hitmarker>();
const markedForDeletion: Hitmarker[] = [];

const scale = 0.35;
const fontType = 4;
const r = 255;
const g = 0;
const b = 0;
const alpha = 255;
const showTimeInMilli = 3000;

alt.everyTick(() => {
    for (const hitmarker of hitmarkerSet) {
        if (Date.now() - hitmarker.CreatedAt >= showTimeInMilli) {
            markedForDeletion.push(hitmarker);
        } else {
            hitmarker.z += 0.005;
            drawText3d(
                hitmarker.damage,
                hitmarker.x,
                hitmarker.y,
                hitmarker.z,
                scale,
                fontType,
                r,
                g,
                b,
                alpha,
                true,
                false
            );
        }
    }
    markedForDeletion.forEach((hitmarker) => hitmarkerSet.delete(hitmarker));
});

function drawText3d(
    msg: string,
    x: number,
    y: number,
    z: number,
    scale: number,
    fontType: number,
    r: number,
    g: number,
    b: number,
    a: number,
    useOutline = true,
    useDropShadow = true
) {
    native.setDrawOrigin(x, y, z, false);
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(msg);
    native.setTextFont(fontType);
    native.setTextScale(1, scale);
    native.setTextWrap(0.0, 1.0);
    native.setTextCentre(true);
    native.setTextColour(r, g, b, a);

    if (useOutline) {
        native.setTextOutline();
    }

    if (useDropShadow) {
        native.setTextDropShadow();
    }

    native.endTextCommandDisplayText(0, 0, 0);
    native.clearDrawOrigin();
}
