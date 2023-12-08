
namespace CopsAndCrimes_AltVGameserver.Helper
{
    public static class HitmarkerHelper
    {
        public static void AddHitmarker(this IPlayer player, string damage, Position position)
        {
            float x = GetValue();
            float y = GetValue();
            float z = GetValue();

            player.Emit("Hitmarker:Add", damage, position.X + x, position.Y + y, position.Z + z);
        }

        private static float GetValue()
        {
            var random = new Random();
            var x = 1 + random.Next(5);
            var isNegativ = random.Next(0, 2) == 0;
            if (isNegativ)
                x = -x;
            return x * 0.1f;
        }
    }
}