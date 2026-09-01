$source = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class BgRemover
{
    public static void RemoveBackground(string inPath, string outPath)
    {
        Bitmap bmp = new Bitmap(inPath);
        BitmapData data = bmp.LockBits(new Rectangle(0, 0, bmp.Width, bmp.Height), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
        int bytes = Math.Abs(data.Stride) * bmp.Height;
        byte[] rgbValues = new byte[bytes];
        Marshal.Copy(data.Scan0, rgbValues, 0, bytes);

        // Sample top-left pixel (index 0)
        byte bgB = rgbValues[0];
        byte bgG = rgbValues[1];
        byte bgR = rgbValues[2];

        for (int i = 0; i < rgbValues.Length; i += 4)
        {
            byte b = rgbValues[i];
            byte g = rgbValues[i + 1];
            byte r = rgbValues[i + 2];

            // Calculate distance from background color
            int diffR = Math.Abs(r - bgR);
            int diffG = Math.Abs(g - bgG);
            int diffB = Math.Abs(b - bgB);
            int diff = diffR + diffG + diffB;

            if (diff < 50) 
            {
                rgbValues[i + 3] = 0; 
            }
            else if (diff < 80)
            {
                rgbValues[i + 3] = (byte)(255 * (diff - 50) / 30f);
            }
        }
        Marshal.Copy(rgbValues, 0, data.Scan0, bytes);
        bmp.UnlockBits(data);
        bmp.Save(outPath, ImageFormat.Png);
    }
}
"@

Add-Type -TypeDefinition $source -ReferencedAssemblies System.Drawing
[BgRemover]::RemoveBackground("C:\Users\abifo\OneDrive\Documents\Nexora_Projects\Zeyvelle\public\images\real logo.jpeg", "C:\Users\abifo\OneDrive\Documents\Nexora_Projects\Zeyvelle\public\images\real-logo-transparent.png")
