// SVIK4S.js
import { DiceSystem } from "../dice-so-nice/api.js";

Hooks.once("diceSoNiceReady", (dice3d) => {
  const BASE = "modules/svik4s/";
  const TYPES = [
    { faces: "2", type: "d2" },
    { faces: "4", type: "d4" },
    { faces: "6", type: "d6" },
    { faces: "8", type: "d8" },
    { faces: "10", type: "d10" },
    { faces: "12", type: "d12" },
    { faces: "20", type: "d20" },
    { faces: "100", type: "d100" },
  ];

  const variants = [
    { id: "svik4s_original", name: "Viking - Original", dir: `${BASE}` },
    { id: "svik4s_black", name: "Viking - Black", dir: `${BASE}black/` },
    { id: "svik4s_white", name: "Viking - White", dir: `${BASE}white/` },
    { id: "svik4s_yellow", name: "Viking - Yellow", dir: `${BASE}yellow/` },
    { id: "svik4s_orange", name: "Viking - Orange", dir: `${BASE}orange/` },
    { id: "svik4s_pink", name: "Viking - Pink", dir: `${BASE}pink/` },
    { id: "svik4s_crimson", name: "Viking - Crimson", dir: `${BASE}crimson/` },
    { id: "svik4s_sapphire", name: "Viking - Sapphire", dir: `${BASE}sapphire/` },
    { id: "svik4s_emerald", name: "Viking - Emerald", dir: `${BASE}emerald/` },
    { id: "svik4s_amethyst", name: "Viking - Amethyst", dir: `${BASE}amethyst/` },
    { id: "svik4s_teal", name: "Viking - Teal", dir: `${BASE}teal/` },
    { id: "svik4s_ivory", name: "Viking - Ivory", dir: `${BASE}ivory/` },
    { id: "svik4s_gold", name: "Viking - Gold", dir: `${BASE}gold/` },
    { id: "svik4s_silver", name: "Viking - Silver", dir: `${BASE}silver/` },
    { id: "svik4s_copper", name: "Viking - Copper", dir: `${BASE}copper/` },
    { id: "svik4s_ice", name: "Viking - Ice", dir: `${BASE}ice/` },
    { id: "svik4s_toxic", name: "Viking - Toxic", dir: `${BASE}toxic/` },
    { id: "svik4s_sparkle_gold", name: "Viking - Gold Sparkle", dir: `${BASE}sparkle_gold/` },
    { id: "svik4s_sparkle_ice", name: "Viking - Ice Sparkle", dir: `${BASE}sparkle_ice/` },
    { id: "svik4s_sparkle_ruby", name: "Viking - Ruby Sparkle", dir: `${BASE}sparkle_ruby/` },
    { id: "svik4s_sparkle_emerald", name: "Viking - Emerald Sparkle", dir: `${BASE}sparkle_emerald/` },
    { id: "svik4s_sparkle_nebula", name: "Viking - Nebula Sparkle", dir: `${BASE}sparkle_nebula/` },
    { id: "svik4s_sparkle_void", name: "Viking - Void Sparkle", dir: `${BASE}sparkle_void/` },
    { id: "svik4s_bloodstone", name: "Viking - Bloodstone", dir: `${BASE}bloodstone/` },
    { id: "svik4s_obsidian", name: "Viking - Obsidian", dir: `${BASE}obsidian/` },
    { id: "svik4s_storm", name: "Viking - Storm", dir: `${BASE}storm/` },
    { id: "svik4s_midnight", name: "Viking - Midnight", dir: `${BASE}midnight/` },
    { id: "svik4s_rose_gold", name: "Viking - Rose Gold", dir: `${BASE}rose_gold/` },
    { id: "svik4s_brass", name: "Viking - Brass", dir: `${BASE}brass/` },
    { id: "svik4s_jade", name: "Viking - Jade", dir: `${BASE}jade/` },
    { id: "svik4s_lavender", name: "Viking - Lavender", dir: `${BASE}lavender/` },
    { id: "svik4s_bone", name: "Viking - Bone", dir: `${BASE}bone/` },
    { id: "svik4s_charcoal_red", name: "Viking - Charcoal Red", dir: `${BASE}charcoal_red/` },
    { id: "svik4s_ocean_gold", name: "Viking - Ocean Gold", dir: `${BASE}ocean_gold/` },
    { id: "svik4s_forest_copper", name: "Viking - Forest Copper", dir: `${BASE}forest_copper/` },
    { id: "svik4s_ice_violet", name: "Viking - Ice Violet", dir: `${BASE}ice_violet/` },
    { id: "svik4s_sunset", name: "Viking - Sunset", dir: `${BASE}sunset/` },
    { id: "svik4s_aurora", name: "Viking - Aurora", dir: `${BASE}aurora/` },
    { id: "svik4s_nebula_blue", name: "Viking - Blue Nebula", dir: `${BASE}nebula_blue/` },
    { id: "svik4s_dragonfire", name: "Viking - Dragonfire", dir: `${BASE}dragonfire/` },
    { id: "svik4s_feywild", name: "Viking - Feywild", dir: `${BASE}feywild/` },
    { id: "svik4s_royal", name: "Viking - Royal", dir: `${BASE}royal/` },
    { id: "svik4s_glacier", name: "Viking - Glacier", dir: `${BASE}glacier/` },
    { id: "svik4s_poison", name: "Viking - Poison", dir: `${BASE}poison/` },
    { id: "svik4s_ember", name: "Viking - Ember", dir: `${BASE}ember/` },
    { id: "svik4s_pearl", name: "Viking - Pearl", dir: `${BASE}pearl/` },
    { id: "svik4s_raven_gold", name: "Viking - Raven Gold", dir: `${BASE}raven_gold/` },
  ];

  for (const variant of variants) {
    dice3d.addSystem(new DiceSystem(variant.id, variant.name, "default"));

    for (const die of TYPES) {
      dice3d.addDicePreset({
        type: die.type,
        system: variant.id,
        modelFile: `${variant.dir}${die.faces}VIK4S.glb`
      });
    }
  }
});
