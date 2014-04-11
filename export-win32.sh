NW_DIR="../node-webkit-v0.9.2-win-ia32/" 
zip -r "$NW_DIR"timer.zip *;
cat "$NW_DIR"nw.exe "$NW_DIR"timer.zip > "$NW_DIR"timer.exe
