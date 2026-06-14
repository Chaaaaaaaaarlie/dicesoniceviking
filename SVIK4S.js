// SVIK4S.js
import { DiceSystem } from "../dice-so-nice/api.js";

Hooks.once("diceSoNiceReady", (dice3d) => {
  const BASE = "modules/svik4s/";
  const TYPES = ["2", "4", "6", "8", "10", "12", "20", "100"];

  const variants = [
    { id: "svik4s_blue", name: "Viking – Blue", dir: `${BASE}blue/` },
    { id: "svik4s_green", name: "Viking – Green", dir: `${BASE}green/` },
    { id: "svik4s_purple", name: "Viking – Purple", dir: `${BASE}purple/` },
    { id: "svik4s_red", name: "Viking – Red", dir: `${BASE}red/` },
    { id: "svik4s_turkis", name: "Viking – Türkis", dir: `${BASE}turkis/` }
  ];

  for (const variant of variants) {
    dice3d.addSystem(new DiceSystem(variant.id, variant.name, "default"));

    for (const faces of TYPES) {
      const type = faces === "100" ? "d100" : `d${faces}`;
      dice3d.addDicePreset({
        type,
        system: variant.id,
        modelFile: `${variant.dir}${faces}VIK4S.glb`
      });
    }
  }
});
