# Commands to add to package.json file

#### This command is used to generate a Supabase Database file & type

`"gen": "npx supabase gen types typescript --project-id djgvpbxmfjtvvrjxfhss --schema public > ./lib/supabase/database.types.ts"`

#### This command is used to launch stripe CLI local listener

`"stripe": "stripe listen --forward-to localhost:3000/api/v1/stripe/webhook"`

#### This comand is used to compress a folder using 7z

`7z a build.zip ./build`

#### This command allows you to resize an image using magick

`magick "entry.jpg" -sampling-factor 4:2:0 -strip -quality 85 -colorspace sRGB -resize 200x200  -interlace JPEG output.webp`
