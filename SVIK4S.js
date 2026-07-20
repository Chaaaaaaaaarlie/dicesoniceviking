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
