Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile("C:\Users\abifo\OneDrive\Documents\Nexora_Projects\Zeyvelle\public\logo.png")
$white = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)
$img.MakeTransparent($white)
$img.Save("C:\Users\abifo\OneDrive\Documents\Nexora_Projects\Zeyvelle\public\logo-transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)
