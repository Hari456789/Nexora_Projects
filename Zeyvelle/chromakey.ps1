$source = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class ChromaKey
{
    public static void RemoveGreen(string inPath, string outPath)
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
            byte a = rgbValues[i + 3];

            int maxRB = Math.Max(r, b);
            
            // More aggressive green screen detection
            // Green must be the dominant color
            if (g > maxRB + 5)
            {
                if (g > maxRB + 20) {
                    rgbValues[i + 3] = 0; // completely transparent
                } else {
                    // blend edges and remove green spill
                    float factor = (g - maxRB - 5) / 15f;
                    rgbValues[i + 3] = (byte)(255 * (1 - factor));
                    rgbValues[i + 1] = (byte)maxRB; // remove green tint
                }
            }
        }
        Marshal.Copy(rgbValues, 0, data.Scan0, bytes);
        bmp.UnlockBits(data);
        bmp.Save(outPath, ImageFormat.Png);
    }
}
"@

Add-Type -TypeDefinition $source -ReferencedAssemblies System.Drawing
[ChromaKey]::RemoveGreen("C:\Users\abifo\OneDrive\Documents\Nexora_Projects\Zeyvelle\public\images\logo.jpeg", "C:\Users\abifo\OneDrive\Documents\Nexora_Projects\Zeyvelle\public\images\logo-transparent.png")
