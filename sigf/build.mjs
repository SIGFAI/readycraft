// ReadyCraft (Keel62155, no license): Minecraft inside Ready or Not (single player). A version.dll proxy loads
// ReadyCraft.dll in the game's process, which plays the part of SkyCraft's Skyrim plugin and drives SkyCraft's Fabric
// mod over the same shared memory (Local\SkyCraft_v1, protocol v11).
// No license, so upstream fetch (PLATFORM-SPEC section 4, "Upstream fetch"): ReadyCraft.zip is downloaded by the app
// from the author's release as released, never rehosted. SIGFAI/readycraft hosts the recipe and our .mrpack
// (SkyCraft's Minecraft side, MIT, the exact pack orchestrator/scripts/package-fusion.mjs builds for SkyCraft).
//
// The mod starts Minecraft itself only as %LOCALAPPDATA%\SkyCraft\Prism\prismlauncher.exe --launch SkyCraft
// (src/ReadyCraft.cpp:428-429 of its source zip), skipped when the mutex Local\SkyCraft_v1_minecraft exists
// (src/ReadyCraft.cpp:400-412). The SkyCraft jar holds that mutex, so the app starts its own Minecraft instance first
// (the CyberCraft way, library/cybercraft/build.mjs).
//
// The upstream zip's root is ReadyCraft/; install file `root: "ReadyCraft"` places that folder's four files, as
// released, into {game}/ReadyOrNot/Binaries/Win64 (upstream's step: version.dll + ReadyCraft.dll next to
// ReadyOrNotSteam-Win64-Shipping.exe). README.txt and the source zip land there too (harmless, removed by Restore):
// placing only the two DLLs would need a repack, which the missing license forbids.
//   node library/readycraft/build.mjs       (outputs: library/lib.mjs)
import { FUSIONS, buildFusion, instanceName } from '../../orchestrator/scripts/package-fusion.mjs';
import { CACHE, asset, card, dl, emit, pinned, renamePack } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/Keel62155/Minecraft-X-Games', tag: '1.0.0-ReadyCraft', commit: '0d6e51bf7babc88a7f9cfe730594206bac1e6e71',
  authors: ['Keel62155'],
  zip: { file: 'ReadyCraft.zip', sha256: '0d86a55c95fd56287336b5f152cb74ff0b65419095e7371f191b8b51b2ffad34' }, // = GitHub digest, checked 2026-10-05
};
const SKY = FUSIONS.skycraft;
const ID = 'readycraft', VERSION = '1.0.0', NAME = 'ReadyCraft';
const TAGLINE = 'Minecraft inside Ready or Not (single player): walk, build, break and take suspects down with Minecraft\'s weapons, taking bullets on Minecraft\'s hearts (SkyCraft\'s Fabric mod).';
const STEAM_BUILD = '24942528'; // Ready or Not Steam build the release was made for (UE 5.3.2), release README.txt

const upUrl = `${UP.repo}/releases/download/${UP.tag}/${UP.zip.file}`;
const mod = asset(UP.zip.file, await pinned(upUrl, UP.zip.sha256), { zipped: true, upstream: upUrl });
const { packAsset } = await buildFusion(SKY, { cache: CACHE, offline: false });
const pack = asset(`${ID}.mrpack`, renamePack(packAsset.data, { name: `${NAME} (SkyCraft's Minecraft side)`, summary: TAGLINE, versionId: VERSION }));
const assets = [mod, pack];

const make = (urls, set) => {
  const mp = set.find(a => a.name.endsWith('.mrpack'));
  return {
    id: `sigf/${ID}`,
    version: VERSION,
    name: NAME,
    tagline: TAGLINE,
    kind: 'passthrough',
    games: [
      { game: 'readyornot', role: 'host', label: 'Ready or Not', engine: 'Ready or Not (Unreal Engine 5.3.2, DirectX 12) + version.dll proxy and C++ mod DLL',
        apps: { steam: '1144200' }, builds: { steam: [STEAM_BUILD] }, runtime: `Steam build ${STEAM_BUILD} only` },
      { game: 'minecraft', role: 'guest', label: 'Minecraft', mc: SKY.mc.mc, loader: `fabric@${SKY.mc.loader}`, java: SKY.mc.java },
    ],
    requires: [
      { id: 'fabric-loader', version: SKY.mc.loader },
      { id: 'fabric-api', version: SKY.mc.fabricApi, note: 'in the Minecraft pack (downloaded from Modrinth)' },
    ],
    install: [
      { game: 'readyornot', strategy: 'game-dir-snapshot', files: [
        // Upstream file as released. root: the zip's ReadyCraft/ folder goes into Binaries/Win64, prefix stripped.
        { src: mod.name, dst: '{game}/ReadyOrNot/Binaries/Win64', root: 'ReadyCraft', unpack: true, contents: mod.contents, ...dl(mod, urls) },
      ] },
      { game: 'minecraft', strategy: 'mrpack', pack: { src: mp.name, ...dl(mp, urls) } },
    ],
    // Minecraft first: the mod sees it running (mutex) and links over shared memory instead of starting its own.
    // -slnoswapchainprovider: without it the game starts NVIDIA's Frame Generation swap chain, which the mod cannot
    // draw into, and crashes about 30 s in (release README.txt).
    launch: [{ game: 'minecraft' }, { game: 'readyornot', args: ['-slnoswapchainprovider'] }],
    files: set.map(a => ({ name: a.name, ...dl(a, urls) })),
    source: {
      repo: UP.repo, license: 'No license (upstream download) + MIT', upstream_license: null, fetch: 'upstream', tag: UP.tag, commit: UP.commit,
      hosted: `https://github.com/SIGFAI/${ID}`, based_on: SKY.upstream.repo,
      bundled: [
        { name: 'SkyCraft (Fabric mod)', version: SKY.version, repo: SKY.upstream.repo, commit: SKY.upstream.commit, license: SKY.upstream.license },
      ],
    },
    media: {},
    built_by: { author: UP.authors[0], authors: [...UP.authors, ...SKY.upstream.authors], packaged_by: 'SIGF' },
    idea_by: UP.authors[0],
    built_at: '2026-10-05T00:00:00.000Z',
    ...card(UP.repo),
    notes: [
      `Ready or Not on Steam at build ${STEAM_BUILD} (Unreal Engine 5.3.2) and Minecraft: Java Edition. After a game update the mod does nothing until a new release: press Restore until then.`,
      'Single player only: do not take it into public multiplayer.',
      `Press Play: Minecraft starts first as the app's own Prism instance "${instanceName(`sigf/${ID}`)}" (SkyCraft's Fabric mod, Minecraft ${SKY.mc.mc}, Java ${SKY.mc.java}), then Ready or Not with the launch option -slnoswapchainprovider. You do not need SkyCraft or Skyrim. Go into Singleplayer and wait about 30 seconds for Minecraft's hotbar.`,
      'If you start Ready or Not outside the app, add -slnoswapchainprovider to its Steam launch options first (Properties > General): without it the game crashes about 30 seconds in. NVIDIA Frame Generation is off with it; DLSS upscaling still works. Keep the game on DirectX 12 (its default).',
      'version.dll and ReadyCraft.dll (with the author\'s README.txt and source zip) are installed into ReadyOrNot\\Binaries\\Win64, downloaded from the author\'s own release; Restore removes them.',
      'Keys: F is the game\'s use key (doors, cuffing), hold Left Alt to be the officer for a moment, F10 gives the officer back to the game. Run one "Minecraft X" mod at a time. Log: %LOCALAPPDATA%\\ReadyCraft\\readycraft.log.',
      'Early build, a handful of short runs on one PC. Known gaps: doors are not solid, blocks are drawn over everything, people do not flinch, your team cannot be hurt. Report bugs to the author on the upstream issue tracker.',
    ],
  };
};

// No app fixture: it would commit the author's unlicensed zip into our repo.
emit({ slug: ID, version: VERSION, assets, fixtureAssets: null, make });
