---
title: Vim tricks
tags:
  - Hinton/CS
date: "2026-08-28"
update: 
---

# Vim tricks

## Vim

### Install

```bash
sudo apt install vim
```

### Basic operations

> [Getting started with Vim: The basics \| Opensource.com](https://opensource.com/article/19/3/getting-started-vim)
> [Give Me 20 Minutes and I’ll Make You a Vim Motions Expert - YouTube](https://www.youtube.com/watch?v=z4eA2eC28qg)

```bash
vim <file>
```

- **Modes**
	- `esc` **normal mode**
		_P.S. All pure character command should be used in normal mode--in insert mode, the characters will be inserted, obviously_
	- `i` (insert before) `a` (append after) **insert mode**
			_P.S. In command mode, use `tab` to select the suggestions_
		- `r` (replace one character) `R` (write over) **replace mode**
- **Navigation**
	- `hjkl`
		_All of these accept a count prefix, so `3j` jumps down 3 lines at once_
	- Word level
		_All of these accept a count prefix, so `3b` jumps back 3 words at once_
		- `w` start of next word
			- `W` start of next consecutive non-blank word
		- `e` end of current/next word
		- `b` start of previous word
			- `B` start of previous consecutive non-blank word
	- Line level
		- `0` go jump to the first _non-blank_ character of the line
		- `^` jump to the first _non-blank_ character of the line
		- `$` go to the end of the line
		- `f<char>` / `F<char>` jump _onto_ next/last `<char>`
			`t<char>` / `T<char>` jump _right to_ next/last `<char>`
			`;` / `,` repeat the last `f` command forward/backward
		- `%` jump to the matching bracket
	- Between lines
		- `gg`jump to the first line
		- `G` go to the last line
		- `:<line>` or `<line>G` go to line number
	- `ctrl` + `i`/`o` jump to next/previous jump location
	- Search
		`:set ic` to ignore case in search
		`:set noic` to make search case-sensitive
		- `:/<keyword>` / `:?<keyword>` search keyword below/above
		- `*` / `#` search current word forward/backward
		- `n`/`N` next/previous occurrence
	- `ctrl` + `u`/`d` page up/down
- **Edit**
	Below is some example usages. It's in essence a language to describe the editing operations: `<verb><adv><object>`. For example, `di"` means delete inside `""`, `caw` means change around word, `yib` means yank inside bracket, etc.
	- Delete
		- `x` delete one character
		- `d` cut selected
		- `dw` delete word
		- `dd` delete current line
		- `D` delete till the end of line
	- Change
		- `ciw` change inside word
			`ciq` change inside quotes (can be `"`/`'`/`` ` ``)
			`ci"` change inside ""
			`cib` change inside bracket (can be `()`, `[]`, `{}`)
			`ci(` change inside ()
			`ci[` change inside []
			`ci{` change inside {}
			....
			_P.S. Replace `i` to `a`, the command becomes change around_
			- Surround a word with `""`: `ciw""<escape>hp`
			- Surround a word with `()`: `ciw()<escape>hp`
			- Surround a word with `[]`: `ciw[]<escape>hp`
			- _P.S. Delete surrounding `"`: `di"vhp_
		- `C` change till the end of line
		- `cc` change whole line
	- Yank (copy)
		_Yank only copy to Vim's internal clipboard. To copy to system clipboard, add `+` before the command_
		- `y` copy selected
		- `yw` copy word
		- `yy` copy whole line
		- `p` / `P` paste selected before/after
			_e.g. `ddp` swaps two lines_
		- _P.S. `d` `c` will override system clipboard. To paste the last explicitly copyed/yanked content, use register `0`: `"0p`_
	- Search-replace
		- In this line
			- `:s/<old>/<new>` replace the first occurrence in this line
			- `:s/<old>/<new>/g` replace all occurrences in this line
			- `:s/<old>/<new>/gc` replace all occurrences in this line with confirmation
		- In this file
			- `:%s/<old>/<new>` replace the first occurrence
			- `:%s/<old>/<new>/g` replace all occurrences
			- `:%s/<old>/<new>/gc` replace all occurrences with confirmation
		- Specific line range
			`:#,#s/<old>/<new>/g` replace all occurrences within line range `#,#`
	- `z=` Spell checks suggestions
	- Operation relays
		- `u` undo
		- `ctrl` + `r` redo
		- `.` repeat the last editing operation
		- Macro
			`qa` start recording macro into register `a`
			Conduct a series of operations, then press `q` to end recording
			`@a` to relay the macro in register `a`
- **File**
	- Saving and exit
		- `:q` quit. If there is unsaved editing, it will raise a warning
		- `:q!` quite without saving
		- `:w` save
		- `:wq` save and quit
	- Retrieve
		- `:r <filename>` read file content and insert after current line
			_P.S. In command mode, `!<cmd>` can execute shell command. It can be combined with `:r` like: `:r !ls`_
- Buffer
	- `:e <file>` open file
	- `:bn` next buffer
	- `:bp` previous buffer
- Layout
	- `:split` / `:sp` split windows horizontally
	- `:vsplit` / `:vsp` split windows vertically

## Neovim

### Install

> [home - neovim](https://neovim.io)

```bash
curl -lo https://github.com/neovim/neovim/releases/latest/download/nvim-linux-x86_64.tar.gz
sudo rm -rf /opt/nvim-linux-x86_64
sudo tar -c /opt -xzf nvim-linux-x86_64.tar.gz
```

Then add this to `~/.zshrc`:

```bash
export PATH="$PATH:/opt/nvim-linux-x86_64/bin"
```

> [🚀 Getting Started \| LazyVim](https://www.lazyvim.org)
> [Zero to IDE with LazyVim - YouTube](https://www.youtube.com/watch?v=N93cTbtLCIM)

```bash
# required
mv ~/.config/nvim{,.bak}

# optional but recommended
mv ~/.local/share/nvim{,.bak}
mv ~/.local/state/nvim{,.bak}
mv ~/.cache/nvim{,.bak}

# clone the starter
git clone https://github.com/LazyVim/starter ~/.config/nvim
rm -rf ~/.config/nvim/.git
```

Enter Neovim:

```bash
nvim
```

### Setup

> [LazyVim From Scratch To BEAST MODE - YouTube](https://www.youtube.com/watch?v=evCmP4hH7ZU&list=WL&index=2)
> [Tmux From Scratch To BEAST MODE - YouTube](https://www.youtube.com/watch?v=GH3kpsbbERo)

#### Language server protocol (LSP)

LazyExtras are pre-made bundles of configuration. You can use `:LazyExtras` to install LSP (language server protocol) for mainstream languages easily. For example, use `:LazyExtras python` to enable Python LSP.

To force all plugins to match the versions in `lazy-lock.json`, use `:Lazy restore`.

##### $\LaTeX$

Enable `lang.tex` in `:LazyExtras` and create `~/.config/nvim/lua/plugins/vimtex.lua`:

```lua
return {
  {
    "lervag/vimtex",
    init = function()
      -- Display literal LaTeX source.
      vim.g.vimtex_syntax_conceal_disable = 1

      -- Use Skim for viewing and SyncTeX forward search.
      vim.g.vimtex_view_method = "skim"

      -- Do not automatically open quickfix.
      vim.g.vimtex_quickfix_mode = 0

      -- One-off compilation with \ll
      vim.g.vimtex_compiler_latexmk = {
        continuous = 0,
        callback = 1,
        options = {
          "-verbose",
          "-file-line-error",
          "-synctex=1",
          "-interaction=nonstopmode",
        },
      }

			-- TOC setup
      vim.g.vimtex_toc_config = {
        split_pos = "vert botright",
        layers = { "content", "todo" },
      }

      -- open .tex files in plain text mode to avoid conceal issues
      vim.api.nvim_create_autocmd("FileType", {
        pattern = { "tex", "plaintex" },
        callback = function()
          vim.opt_local.conceallevel = 0
          vim.opt_local.concealcursor = ""
        end,
      })
    end,
  },

  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        texlab = {
          settings = {
            texlab = {
              inlayHints = {
                labelDefinitions = false,
                labelReferences = false,
              },
            },
          },
        },
      },
    },
  },
}
```

Then you can use `\ll` to compile the file, `\lv` to view compiled PDF, and `\lt` to toggle the table of contents.

Also configure Neovim to use the [Skim](https://skim-app.sourceforge.io) PDF viewer, which supports TeX-PDF synchronization, in `~/.config/nvim/lua/config/options.lua`:

```lua
-- LaTeX pdf viewer setup
vim.g.vimtex_view_method = "skim"
vim.g.vimtex_compiler_latexmk = {
  options = {
    "-pdf",
    "-interaction=nonstopmode",
    "-synctex=1",
  },
}
```

In Skim: Settings 👉 Sync 👉 Check for file changes 👉 Reload automatically.

To stop auto-format for `.bib` files, add this to `~/.config/nvim/lua/config/autocmds.lua`:

```lua
vim.api.nvim_create_autocmd({ "FileType" }, {
  pattern = { "bib" },
  callback = function()
    vim.b.autoformat = false
  end,
})
```

##### Beancount

[Beancount](https://github.com/beancount/beancount) is a command-line double-entry accounting language. It requires `cargo` to compile Rust code. To install `cargo`:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Also add `$HOME/.cargo/bin` to the path in `~/.zshrc`. Then:

```bash
source ~/.zshrc
cargo --version
```

Then create `~/.config/nvim/lua/plugins/beancount.lua`:

```lua
return {
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        beancount = {},
      },
    },
  },
}
```

Create `~/.config/nvim/after/ftplugin/beancount.lua`:

```lua
vim.bo.commentstring = "; %s" -- set comment string for beancount
vim.b.autoformat = false -- disable autoformating
```

To further enable org-mode-style headings, create `~/.config/nvim/lua/outline/providers/beancount.lua`:

```lua
local M = {
  name = "beancount",
}

function M.supports_buffer(bufnr)
  return vim.bo[bufnr].filetype == "beancount"
end

local function parse_heading(line)
  -- Org-style:
  -- * Heading
  -- ** Subheading
  local stars, title = line:match("^(%*+)%s+(.+)$")
  if stars then
    return #stars, title
  end

  -- Beancount comment-style:
  -- ;;; Heading
  -- ;;;; Subheading
  local semis, comment_title = line:match("^(;;;+)%s+(.+)$")
  if semis then
    return #semis - 2, comment_title
  end
end

function M.request_symbols(callback, opts)
  local lines = vim.api.nvim_buf_get_lines(0, 0, -1, false)

  local root = { children = {} }
  local stack = {}
  local max_level = 0

  for i, line in ipairs(lines) do
    local level, title = parse_heading(line)

    if level and title then
      -- Close sections at this level or deeper.
      for j = level, max_level do
        local symbol = stack[j]
        if symbol then
          symbol.range["end"].line = i - 2
          stack[j] = nil
        end
      end

      -- Find nearest active parent.
      local parent = root.children
      for j = level - 1, 1, -1 do
        if stack[j] then
          parent = stack[j].children
          break
        end
      end

      local line_nr = i - 1 -- LSP/outline positions are 0-indexed

      local symbol = {
        name = title,
        kind = "Module",

        selectionRange = {
          start = { line = line_nr, character = 0 },
          ["end"] = { line = line_nr, character = #line },
        },

        range = {
          start = { line = line_nr, character = 0 },
          ["end"] = { line = line_nr, character = #line },
        },

        children = {},
      }

      table.insert(parent, symbol)
      stack[level] = symbol
      max_level = math.max(max_level, level)
    end
  end

  -- Extend remaining sections to EOF.
  local last_line = math.max(#lines - 1, 0)

  for _, symbol in pairs(stack) do
    symbol.range["end"].line = last_line
  end

  callback(root.children, opts)
end

return M
```

Edit `outline.lua` and make sure that `"beancount"` is before `"lsp"` in the provider field:

```lua
-- ...
-- Your setup opts here (leave empty to use defaults)
providers = {
	-- Prefer outline.nvim's native Markdown parser over obsidian-ls.
	priority = { "markdown", "beancount", "lsp", "coc", "norg", "man" },
},
-- ...
```

#### Theme with transparent background

GitHub theme: create `~/.config/nvim/lua/plugins/github-nvim.lua`:

```lua
return {
	"projekt0n/github-nvim-theme",
	name = "github-theme",
	lazy = false, -- make sure we load this during startup if it is your main colorscheme
	priority = 1000, -- make sure to load this before all the other start plugins
	opts = {
		transparent = false, -- use transparent background
	},
	config = function()
		require("github-theme").setup({
			options = {
				transparent = true, -- use transparent background
			},
		})

		vim.cmd("colorscheme github_dark_default")
	end,
}
```

Rose Pine theme: create `~/.config/nvim/lua/plugins/rose-pine.lua`:

```lua
return {
	{
		"rose-pine/neovim",
		name = "rose-pine",
		opts = {
			variant = "auto", -- auto, main, moon, or dawn
			dark_variant = "main", -- used when background=dark
			styles = {
				bold = true,
				italic = true,
				transparency = true, -- set true for transparent bg
			},
		},
	},
	-- Tell LazyVim to use this colorscheme
	{ "LazyVim/LazyVim", opts = { colorscheme = "rose-pine" } },
}
```

#### Snack picker

Create `~/.config/lua/plugins/snack.lua`:

```bash
return {
  "folke/snacks.nvim",
  opts = {
    picker = {
      actions = {
        copy_file_name = function(picker, item)
          item = item or picker:current()
          if not item then
            return
          end

          local path = item.file or item.path or item.text
          if not path then
            return
          end

          vim.fn.setreg("+", vim.fn.fnamemodify(path, ":t"))
          vim.notify("Copied file name: " .. vim.fn.fnamemodify(path, ":t"))
        end,

        copy_relative_path = function(picker, item)
          item = item or picker:current()
          if not item then
            return
          end

          local path = item.file or item.path or item.text
          if not path then
            return
          end

          local rel = vim.fn.fnamemodify(path, ":.")
          vim.fn.setreg("+", rel)
          vim.notify("Copied relative path: " .. rel)
        end,

        copy_absolute_path = function(picker, item)
          item = item or picker:current()
          if not item then
            return
          end

          local path = item.file or item.path or item.text
          if not path then
            return
          end

          local abs = vim.fn.fnamemodify(path, ":p")
          vim.fn.setreg("+", abs)
          vim.notify("Copied absolute path: " .. abs)
        end,
      },

      sources = {
        explorer = {
          win = {
            list = {
              keys = {
                ["gy"] = "copy_relative_path",
                ["gY"] = "copy_absolute_path",
                ["gf"] = "copy_file_name",
              },
            },
          },
        },
      },
    },
  },
}
```


This augment the file explorer with the following keybindings:

- `gy` to copy relative path
- `gY` to copy absolute path
- `gf` to copy file name

#### Keybindings and options

Add these to `~/.config/nvim/lua/config/keymaps.lua`:

```lua
local opts = { noremap = true, silent = true }

-- Opt+← / Opt+→ -> jump by word
vim.keymap.set("i", "<M-b>", "<C-Left>", opts)
vim.keymap.set("i", "<M-f>", "<C-Right>", opts)

-- Opt+Delete / Opt+Backspace -> delete word
vim.keymap.set("i", "<M-BS>", "<C-w>", opts) -- delete word before cursor
vim.keymap.set("i", "<M-Delete>", "<C-o>dw", opts) -- delete word after cursor

-- jj -> escape insert mode
vim.keymap.set("i", "jj", "<Esc>", opts)

-- buffer movement
vim.keymap.set("n", "<leader>b<Left>", "<cmd>BufferLineMovePrev<CR>", { desc = "Move buffer left" })
vim.keymap.set("n", "<leader>b<Right>", "<cmd>BufferLineMoveNext<CR>", { desc = "Move buffer right" })
```

Add these to `~/.config/nvim/lua/config/options.lua`:

```lua
vim.g.ai_cmp = false
vim.opt.wrap = true
```

#### File outline

Create `~/.config/nvim/lua/plugins/outline.lua`:

```lua
return {
  "hedyhli/outline.nvim",
  config = function()
    -- Example mapping to toggle outline
    vim.keymap.set("n", "<leader>o", "<cmd>Outline<CR>", { desc = "Toggle Outline" })

    require("outline").setup({
      -- Your setup opts here (leave empty to use defaults)
			providers = {
        -- Prefer outline.nvim's native Markdown parser over obsidian-ls.
        priority = { "markdown", "lsp", "coc", "norg", "man" },
      },
      symbols = {
        filter = {
          -- Default: show everything except String
          default = { "String", exclude = true },
          -- Python: only show these kinds
          python = { "Class", "Function", "Method" },
        },
      },
    })
  end,
}
```

#### Indentation

Create `~/.config/nvim/lua/plugins/indent.lua`:

```lua
return {
  "NMAC427/guess-indent.nvim",
  opts = {},
}
```

It will guess your indentation type by the first few hunders of lines of current file. To check its guess, run `:GuessIndent`.

#### Multi-cursor

VS Code-like multi-cursor could be reliazed via [mg979/vim-viual-multi](https://github.com/mg979/vim-visual-multi). Create `~/.config/nvim/lua/plugins/multi-cursor.lua`:

```lua
return {
	{
		"mg979/vim-visual-multi",
		branch = "master",
		lazy = false, -- must NOT be lazy-loaded or keymaps won't work
		init = function()
			-- vim.g.* settings must go in `init`, not `config`
			vim.g.VM_maps = {
				["Find Under"] = "<C-n>", -- default: start multicursor on word
				["Find Subword Under"] = "<C-n>",
				["Select Cursor Down"] = "<M-Down>",
				["Select Cursor Up"] = "<M-Up>",
			}
		end,
	},
}
```

- Select a word in visual mode and `ctrl` + `n` / `N` to select next/previous occurrence
	- `q` to skip current and get next occurrence
	- `Q` to skip current cursor
- `opt` + arrows to move up/down
	_P.S. `ctrl` + arrows has been used for window resizing. But strangely, this setup makes both `opt`/`ctrl` + arrows used for vertical multi-cursor_
	_P.S. In macOS, disable the system keyboard shortcut: System Setting > Keyboard > Set Up Keyboard > Mission Controlf, disable Mission Control, Application windows, Mission Control > Move left a space, and Mission Control > Move right a spcae_

#### Yank setup

If you `ssh` into another machine, `y` to the clipboard might not work. Add this to `~/.config/nvim/init.lua` to enable `osc52`:

```lua
-- disable system clipboard override
vim.opt.clipboard = ""

-- Use OSC 52 for clipboard if we're in an SSH session
if vim.env.SSH_TTY ~= nil then
  vim.g.clipboard = {
    name = "OSC 52",
    copy = {
      ["+"] = require("vim.ui.clipboard.osc52").copy("+"),
      ["*"] = require("vim.ui.clipboard.osc52").copy("*"),
    },
    paste = {
      ["+"] = function()
        return { vim.fn.split(vim.fn.getreg('"'), "\n"), vim.fn.getregtype('"') }
      end,
      ["*"] = function()
        return { vim.fn.split(vim.fn.getreg('"'), "\n"), vim.fn.getregtype('"') }
      end,
    },
  }
end

```

_P.S. Tmux -> SSH -> Neovim still doesn't wrok; but SSH -> Tux -> Neovim works._

#### Git

Install [LazyGit](https://github.com/jesseduffield/lazygit?tab=readme-ov-file#homebrew):

```bash
brew install lazygit
```

Then you can trigger `lazygit` in Neovim via `leader` + `gg`.

For VS Code-like `diff` view, install [codediff.nvim](https://github.com/esmuellert/codediff.nvim) by creating `~/.config/nvim/lua/plugins/codediff.lua`:

```lua
return {
	"esmuellert/codediff.nvim",
	lazy = true,
	cmd = "CodeDiff",
	keys = {
		{ "<leader>gd", "<cmd>CodeDiff<cr>", desc = "Code Diff" },
	},
}
```

#### CMP

Add `~/.config/nvim/lua/plugins/blink-cmp.lua`:

```lua
return {
  "saghen/blink.cmp",
  dependencies = {
		"fang2hou/blink-copilot",
    "L3MON4D3/LuaSnip",
	},
  opts = {
    sources = {
      default = { "copilot" },
      providers = {
        copilot = {
          name = "copilot",
          module = "blink-copilot",
          score_offset = 100,
          async = true,
        },
      },
    },
  },
}
```

##### LuaSnip

Create `~/.config/nvim/lua/plugins/luasnip.lua`:

```lua
return {
  "L3MON4D3/LuaSnip",
  version = "v2.*",
  dependencies = {
    {
      "rafamadriz/friendly-snippets",
      config = function()
        require("luasnip.loaders.from_vscode").lazy_load()
      end,
    },
  },
}
```

Create customized snippet folder:

```bash
cd ~/.config/nvim
mkdir snippets
touch package.json
echo "{}" > python.json
echo "{}" > lua.json
echo "{}" > latex.json
echo "{}" > md.json
```

Modify `package.json`:

```json
{
  "name": "my-snippets",
  "engines": {
    "vscode": "^1.11.0"
  },
  "contributes": {
    "snippets": [
      {
        "language": "python",
        "path": "./python.json"
      },
      {
        "language": "lua",
        "path": "./lua.json"
      },
      {
        "language": "tex",
        "path": "./latex.json"
      },
      {
        "language": "markdown",
        "path": "./md.json"
      }
    ]
  }
}
```

##### Copilot

> [Copilot \| LazyVim](https://www.lazyvim.org/extras/ai/copilot)
> [GitHub - zbirenbaum/copilot.lua: Fully featured & enhanced replacement for copilot.vim complete with API for interacting with Github Copilot · GitHub](https://github.com/zbirenbaum/copilot.lua)
> [Copilot and Neovim](https://nithinbekal.com/posts/copilot-neovim/)
> [blink-copilot](https://github.com/fang2hou/blink-copilot)

_P.S. Make sure the `node.js` version is `>=` 22._

Add `~/.config/nvim/lua/plugins/copilot.lua`:

```lua
return {
  "zbirenbaum/copilot.lua",
  cmd = "Copilot",
  event = "InsertEnter",
  opts = {
    suggestion = { enabled = false },
    panel = { enabled = false },
    filetypes = {
      markdown = true,
      help = true,
    },
  },
}
```

Re-enter `nvim`, then `:Copilot auth`, open the link for authentication.

_P.S. [GitHub - github/copilot.vim: Neovim plugin for GitHub Copilot · GitHub](https://github.com/github/copilot.vim) seem to be the official `nvim` plugin_

###### SFree-tier alternative

> [supermaven is dead, what would be a good replace for it? | r/neovim](https://www.reddit.com/r/neovim/comments/1m5l8dn/supermaven_is_dead_what_would_be_a_good_replace/)

- [monkoose/neocodeium](https://github.com/monkoose/neocodeium)
- [Supermaven](https://supermaven.com)
	[supermaven-inc/supermaven-nvim](https://github.com/supermaven-inc/supermaven-nvim)
- [Exafunction/windsurf.vim](https://github.com/Exafunction/windsurf.vim)

##### Obsidian

> [obsidian.nvim](https://github.com/obsidian-nvim/obsidian.nvim)

_P.S. Remember to adapt the `workspace` option!_

```lua
return {
  "obsidian-nvim/obsidian.nvim",
  version = "*",
  ft = "markdown",
  dependencies = {
    "saghen/blink.cmp", -- declare blink as dependency
  },
  opts = {
    workspaces = {
      {
        name = "DeepSpace",
        path = "/Users/knpob/Library/Mobile Documents/iCloud~md~obsidian/Documents/DeepSpace",
        overrides = {
          frontmatter = { enabled = false },
        },
      },
    },
    completion = {
      nvim_cmp = false,
      blink = true,
      min_chars = 2,
    },
    -- rest of your config...
  },
}
```

> [完美搞定 obsidian | bigzhu](https://blog.bigzhu.net/p/perfectly-solve-obsidian)

Also, [`ripgrep`](https://github.com/BurntSushi/ripgrep) needs to be installed in advance:

```bash
brew install ripgrep
```

### Basic operations

_P.S. The default `leader` key is `space`._

- `leader` + `"` view all registries
- **Session**
	_P.S. In dashboard, you can restore last session by pressing `s`_
	- `leader` + `qs` restore last session for the current directory
	- `leader` + `ql` restore last used session
	- `leader` + `qS` select session to restore
	- `leader` + `qd` don't save current session
	- `leader` + `qq` quit all
- **Files**
	- `leader` + `e` file explorer
		- `h` collapse current folder
		- `H` show hidden folders/files
		- `alt` + `i` show git ignored folders/files
		- Change file/folder
			- `r` rename file
			- `a` add file/folder (to add a folder, end with `/`)
			- `d` delete file/folder
		- Copy/cut/paste file/folder
			- `c` duplicate file/folder
			- `y` copy file/folder
			- `x` cut file/folder
			- `p` paste file/folder
		- Copy file path/name
			- `gy` copy relative path
			- `gY` copy absolute path
			- `gf` copy file name
	- Open file
		_P.S. `opt` + `h` to show hidden files_
		- `leader` + `ff` find file
		- `leader` + `fr` find recent file
		- `leader` + `leader` fuzzy search file
		- `leader` + `fc` configuration files
	- Search content
		- `leader` + `sg` grep on root directory
		- `leader` + `sG` grep on current working directory
		- `leader` + `sr` search and replcae
			`dd` to delete the matches you don't want to replace and use `\s` to sync the replacement for all matches; or `\l` to sync the replacement for current line. Use `\r` with caution -- it runs `rg --replace` on all matches regardless of the deletion you made
- **Layout**
	_P.S. Window and buffer are different concepts in Neovim. Window is a viewport into a buffer, and you can have multiple windows viewing the same buffer. Buffer is the actual content, and window is how you view it_
	- **Buffer**
		- `leader` + `,` navigate between buffers
		- `shift` + `h`/`<-` move to left buffer
		- `shift` + `l`/`->` move to right buffer
		- `leader` + `bd` delete current buffer
		- `leader` + `b <-` move current buffer left
		- `leader` + `b ->` move current buffer right
	- **Window**
		- `ctrl` + `h`/`<-` move to left window
		- `ctrl` + `r`/`->` move to right window
		- `leader` + `bd` close current buffer
		- `leader` + `wq` close current window
	- Language server protocol (LSP)
		- **Mason**`:Mason`
			`/<keyword>` to search for LSP, etc.
			`i` to install
			`enter` to exapnd
		- `gc` comment out
			`gcc` comment out current line
		- `K` hover for documentation
		- Go to
			- `gO` symbol of current file
			- `<leader>` + `o` outline of current file
				- `Tab` expand/collapse current item
				- `E` expand all items
				- `W` collapse all items
			- `gd` go to definition
			- `gf` go to file
			- `gI` go to implementation
			- `gr` go to references
			- `[d` go to previous diagnostic
			- `]d` go to next diagnostic
		- `<leader>` `cr` rename symbol
- Plugins
	- Copilot
		- `tab` accept suggestion
		- `ctrl` + `right` accept one word
			In VS Code, the default keybinding for this _(Accept Next Word Of Inline Suggestion)_ is `cmd`+`right`. I change it as `ctrl`+`right` to make my muscle memory consistent
		- `ctrl` + `down` accept one line
		- `opt` + `]` cycle to next suggestion
		- `opt` + `[` cycle to previous suggestion
		- `ctrl` + `]` dismiss suggestion
	- Git
		- `leader` + `gs` git status
		- `leader` + `gd` [codediff](https://github.com/esmuellert/codediff.nvim)
			- `t` change between side-by-side and inline modes
			- Navigation
				- `[`/`]` + `c` jump to previous/next change
				- `leader` + `e` jump to explorer panel
			- `-` stage/unstage/discard change
				- `leader` + `hs` stage hunk under cursor
				- `leader` + `hu` unstage hunk under cursor
				- `leader` + `hr` discard hunk under cursor
				- `-` stage/unstage current file
				- `X` discard current file
			- `q` quit
			- Line warping is not availbe [now](https://github.com/esmuellert/codediff.nvim/issues/50). But we can use `<leader>` + `uw` to toggle on/off word warping as a workaround
		- `leader` + `gg` [lazygit](https://github.com/jesseduffield/lazygit)
			- Navigation
				- `tab` / `<number>` jump between panels
				- `<-` / `->` jump between hunks
			- Stage/discard
				`` ` `` to toggle between folder view or flat view in folder panel
				- `space` stage/unstage file
				- `d` discard file changes
				`a` stage all changes
			- Commit/pull/push/stash
				- `c` commit
				- `p` pull
				- `P` push
				- `s` stash
	- Terminal
		- `leader` + `ft` terminal
	- Obsidian
		- `gf` go to file
		- `[[` / `]]` jump to previous/next heading
	- LaTeX
		_P.S. Remember to stop the continuous compilation first before using Codex/Claude Code for agentic editing. Otherwise it will keep launching compilation process and cause performance issue._
		- `\ll` for compilation
		- `\lt` to toggle table of contents
			`enter` jumps to the selection and closes the ToC
			`space` jumps to the selection and keeps the ToC open
		- `\lv` to view the compiled PDF and jump to the current line in the PDF
			> [!tip]
			> This will opened the PDF in Skim.
			> - If you are using macOS and have [stage manager](https://support.apple.com/guide/mac-help/use-stage-manager-mchl534ba392/mac) enabled, drag the Skim window to the same stage of Neovim's and press `fn` + `ctrl` + `shift` + `<-`/`->` to arrange the two windows side by side. Alternatively, you can hold `opt` and drag the windows to tile to the left/right side of the screen.
			> - Useful Skim shortcuts: `cmd` + `shift` + `-` fit page size, `cmd` + `shift` + `t` sidebar
		- `\le` stop compilation

## Use Vim in other apps

Obsidian:

> [for Vim users - Obsidian Hub - Obsidian Publish](https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/for+Vim+users)

### VS Code

For a comprehensive guide on using Neovim with VS Code, including LazyVim-inspired keybindings, tmux-style terminal management, and integrated git workflow, see [[vscode-neovim-setup]].

### Claude Code

> [Interactive mode - Claude Code Docs](https://code.claude.com/docs/en/interactive-mode)

### Warp

> [Input Editor Vim Keybindings \| Warp](https://docs.warp.dev/terminal/editor/vim)
