# ReadyCraft

Minecraft inside Ready or Not (single player): walk, build, break and take suspects down with Minecraft's weapons, taking bullets on Minecraft's hearts (SkyCraft's Fabric mod).

**ReadyCraft is made by [Keel62155](https://github.com/Keel62155).** All credit for the mod goes to them. It is built on [chasmlol/SkyCraft](https://github.com/chasmlol/SkyCraft) by chasmlol.

- Original project: https://github.com/Keel62155/Minecraft-X-Games
- Report bugs and ask questions there: https://github.com/Keel62155/Minecraft-X-Games/issues
- Upstream release packaged here: [1.0.0-ReadyCraft](https://github.com/Keel62155/Minecraft-X-Games/releases/tag/1.0.0-ReadyCraft) (commit [`0d6e51b`](https://github.com/Keel62155/Minecraft-X-Games/tree/0d6e51bf7babc88a7f9cfe730594206bac1e6e71))

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **Ready or Not** ([Steam](https://store.steampowered.com/app/1144200/)): Steam build 24942528 only.
- **Minecraft**: Java Edition 26.3.
- Windows and the [SIGF app](https://sigf.ai). The app installs fabric-loader 0.19.5, fabric-api 0.161.0+26.3 for you.

## Install

In the SIGF app, open **ReadyCraft** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. The files come from the release [`v1.0.0`](../../releases/tag/v1.0.0) and, for `ReadyCraft.zip`, from the author's own release.

### Good to know

- Ready or Not on Steam at build 24942528 (Unreal Engine 5.3.2) and Minecraft: Java Edition. After a game update the mod does nothing until a new release: press Restore until then.
- Single player only: do not take it into public multiplayer.
- Press Play: Minecraft starts first as the app's own Prism instance "sigf-readycraft" (SkyCraft's Fabric mod, Minecraft 26.3, Java 25), then Ready or Not with the launch option -slnoswapchainprovider. You do not need SkyCraft or Skyrim. Go into Singleplayer and wait about 30 seconds for Minecraft's hotbar.
- If you start Ready or Not outside the app, add -slnoswapchainprovider to its Steam launch options first (Properties > General): without it the game crashes about 30 seconds in. NVIDIA Frame Generation is off with it; DLSS upscaling still works. Keep the game on DirectX 12 (its default).
- version.dll and ReadyCraft.dll (with the author's README.txt and source zip) are installed into ReadyOrNot\Binaries\Win64, downloaded from the author's own release; Restore removes them.
- Keys: F is the game's use key (doors, cuffing), hold Left Alt to be the officer for a moment, F10 gives the officer back to the game. Run one "Minecraft X" mod at a time. Log: %LOCALAPPDATA%\ReadyCraft\readycraft.log.
- Early build, a handful of short runs on one PC. Known gaps: doors are not solid, blocks are drawn over everything, people do not flinch, your team cannot be hurt. Report bugs to the author on the upstream issue tracker.

## What this repository holds

ReadyCraft has no license, so SIGF may not rehost it. This repository holds **only SIGF's own files**, never the author's:

1. This README, `THIRD-PARTY.md`, `sigf/` (the script that built the recipe, for reference) and `mashup.json` (the SIGF app recipe).
2. Not here: `ReadyCraft.zip` (sha256 `0d86a55c95fd56287336b5f152cb74ff0b65419095e7371f191b8b51b2ffad34`). The app downloads it on the player's demand from the author's release, as released: https://github.com/Keel62155/Minecraft-X-Games/releases/download/1.0.0-ReadyCraft/ReadyCraft.zip
3. The release `v1.0.0`:

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `readycraft.mrpack` | 235702 B | `fcee2513ad4af97a16fdfa95ad52cb969bed7365a1def9bf60d548725fbb0032` | the Minecraft side, which is SkyCraft's (chasmlol, MIT): `skycraft-fabric-0.1.2.jar` unchanged with SkyCraft's LICENSE, for Minecraft 26.3 with Fabric Loader 0.19.5; Fabric API 0.161.0+26.3 and e4mc are Modrinth download links, not stored here. |

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| ReadyCraft (`ReadyCraft.zip`, the author's release file) | no license: all rights reserved by Keel62155. Not stored here; the app downloads it from the author's release | https://github.com/Keel62155/Minecraft-X-Games |
| SkyCraft's Fabric mod (in the `.mrpack`) | MIT, Copyright chasmlol | `THIRD-PARTY.md` |
| Fabric API, e4mc (downloaded from Modrinth by the app, not stored here) | Apache-2.0, MIT | https://modrinth.com/mod/fabric-api, https://modrinth.com/mod/e4mc |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes ReadyCraft installable in one click, credited to Keel62155. If you are the author and want anything changed or taken down, open an issue here.
