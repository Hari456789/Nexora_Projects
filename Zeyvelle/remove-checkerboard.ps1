$source = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class CheckerboardRemover
{
    public static void RemoveBackground(string inPath, string outPath)
    {
        Bitmap bmp = new Bitmap(inPath);
        BitmapData data = bmp.LockBits(new Rectangle(0, 0, bmp.Width, bmp.Height), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
        int bytes = Math.Abs(data.Stride) * bmp.Height;
        byte[] rgbValues = new byte[bytes];
        Marshal.Copy(data.Scan0, rgbValues, 0, bytes);

        for (int i = 0; i < rgbValues.Length; i += 4)
        {
            byte b = rgbValues[i];
            byte g = rgbValues[i + 1];
            byte r = rgbValues[i + 2];

            int max = Math.Max(r, Math.Max(g, b));
            int min = Math.Min(r, Math.Min(g, b));
            int diff = max - min;
            
            // Checkerboard consists of white (255,255,255) and gray (~204,204,204).
            // Golden color has a large difference between R and B (high saturation).
            if (diff < 20 && max > 100) 
            {
                rgbValues[i + 3] = 0; // Pure checkerboard
            }
            else if (diff < 45 && max > 80)
            {
                // Edge transition blending
                float factor = (diff - 20) / 25f;
                rgbValues[i + 3] = (byte)(255 * factor);
            }
        }
        Marshal.Copy(rgbValues, 0, data.Scan0, bytes);
        bmp.UnlockBits(data);
        bmp.Save(outPath, ImageFormat.Png);
    }
}
"@

Add-Type -TypeDefinition $source -ReferencedAssemblies System.Drawing
[CheckerboardRemover]::RemoveBackground("C:\Users\abifo\OneDrive\Documents\Nexora_Projects\Zeyvelle\public\images\zv-reference.jpg", "C:\Users\abifo\OneDrive\Documents\Nexora_Projects\Zeyvelle\public\images\zv-reference-transparent.png")
