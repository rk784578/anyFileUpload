Set WshShell = WScript.CreateObject("WScript.Shell")
Return = WshShell.Run("cmd.exe /C pm2 start app.js --name AFTS/www", 0, true)