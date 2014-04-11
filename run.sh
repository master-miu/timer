NW_DIR="../node-webkit-v0.9.2-linux-ia32/" 
zip -r -f "$NW_DIR"timer.zip *;
cd $NW_DIR
./nw timer.zip

