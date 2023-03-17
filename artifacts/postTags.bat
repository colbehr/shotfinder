@echo off

set file=tags.txt

for /f "tokens=*" %%a in (%file%) do (
  curl --request POST ^
    --url http://localhost:3001/tags ^
    --header "Content-Type: application/json" ^
    --data "{\"tag\":\"%%a\"}"
)
