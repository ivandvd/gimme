#!/bin/sh
# usage: q.sh <regex-on-selector>
node -e '
const rules=JSON.parse(require("fs").readFileSync("rules.json","utf8")); const re=new RegExp(process.argv[1]);
for(const r of rules){ if(re.test(r.sel)) console.log((r.media?"@"+r.media+" ":"")+r.sel+"{"+r.body+"}"); }' "$1"
