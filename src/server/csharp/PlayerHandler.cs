using AltV.Net;
using AltV.Net.Async;
using AltV.Net.Data;
using AltV.Net.Elements.Entities;
using AltV.Net.Enums;
using CopsAndCrimes_AltVGameserver.Helper;

namespace CopsAndCrimes_AltVGameserver
{
    public class PlayerHandler : IScript
    {
        [ScriptEvent(ScriptEventType.WeaponDamage)]
        public void OnPlayerDamageAsync(IPlayer attacker, IEntity target, uint weapon, ushort damage, Position offset, BodyPart bodyPart)
        {
            attacker.Emit("Hitmarker:Add", damage.ToString(), target.Position);
        }
    }
}