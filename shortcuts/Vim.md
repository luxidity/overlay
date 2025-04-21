## Normal Mode

**Move cursor left**  
`h`

**Move cursor down**  
`j`

**Move cursor up**  
`k`

**Move cursor right**  
`l`

**Move to beginning of line**  
`0`

**Move to end of line**  
`$`

**Move forward by word**  
`w`

**Move backward by word**  
`b`

**Move to first non‑blank of line**  
`^`

**Move to first line**  
`gg`

**Move to last line**  
`G`

**Find next character in line**  
`f<char>`

**Find before character in line**  
`t<char>`

**Repeat last f/t**  
`;`

**Repeat in opposite direction**  
`,`  

**Search by word under cursor (next)**  
`*`

**Search by word under cursor (previous)**  
`#`

**Jump to matching bracket/parenthesis**  
`%`

**Delete character under cursor**  
`x`

**Delete word**  
`dw`

**Delete to end of line**  
`D`

**Delete entire line**  
`dd`

**Change word (delete then insert)**  
`cw`

**Change entire line**  
`cc`

**Replace single character**  
`r<char>`

**Join lines**  
`J`

**Filter text through external command**  
`!{motion}`  

**Toggle case of character**  
`~`

**Lowercase word**  
`guw`

**Uppercase word**  
`gUw`

**Auto‑indent a motion**  
`={motion}`

**Format paragraph**  
`gqap`

**Set mark “a”**  
`ma`

**Jump to mark “a”**  
`'a`

**Jump to older cursor position**  
`Ctrl + O`

**Jump to newer cursor position**  
`Ctrl + I`

**Start recording macro into register a**  
`qa`

**Stop recording macro**  
`q`

**Play back macro a**  
`@a`

**Repeat last macro**  
`@@`

---

## Insert Mode

**Enter insert mode (before cursor)**  
`i`

**Append after cursor**  
`a`

**Insert at beginning of line**  
`I`

**Insert at end of line**  
`A`

**Open new line below**  
`o`

**Open new line above**  
`O`

**Exit to Normal mode**  
`Esc`

---

## Visual Mode

**Enter character‑wise Visual mode**  
`v`

**Enter line‑wise Visual mode**  
`V`

**Enter block‑wise Visual mode**  
`Ctrl + v`

**Indent selection right**  
`>`

**Indent selection left**  
`<`

**Select inside word**  
`viw`

**Select around word**  
`vaw`

**Select inside parentheses**  
`vi(`

**Select inside quotes**  
`vi"`

**Select inside HTML/XML tag**  
`vit`

---

## Command‑Line / Ex Mode

**Save file**  
`:w`

**Quit Vim**  
`:q`

**Save and quit**  
`:wq`

**Quit without saving**  
`:q!`

**Next buffer**  
`:bn`

**Previous buffer**  
`:bp`

**List buffers**  
`:ls`

**Open file in horizontal split**  
`:split {file}`

**Open file in vertical split**  
`:vsplit {file}`

**Open file in new tab**  
`:tabnew {file}`

**Close current tab**  
`:tabclose`

**Save all buffers**  
`:wall`

**Search forward**  
`/pattern`

**Search backward**  
`?pattern`

**Repeat search forward**  
`n`

**Repeat search backward**  
`N`

**Substitute in entire file (with confirmation)**  
`:%s/pattern/replacement/gc`

**Repeat last substitute**  
`&`

**Open file under cursor**  
`gf`

---

## Window & Tab Navigation (Normal Mode)

**Move between windows**  
`Ctrl + W h/j/k/l`

**Equalize window sizes**  
`Ctrl + W =`

**Next tab**  
`gt`

**Previous tab**  
`gT`
