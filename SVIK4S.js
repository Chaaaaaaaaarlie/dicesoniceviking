// SVIK4S.js
Hooks.once('diceSoNiceReady', (dice3d) => {
  // Deine Dateien heißen z.B. "2VIK4S.glb" → Suffix aktivieren
  const USE_VIK_SUFFIX = true;

  // Basis-Pfad: Modulordner klein schreiben!
  const BASE = "modules/svik4s/";

  // Farbvarianten = eigenes "System" pro Farbe
  const variants = [
    { id: "svik4s_blue",   name: "Viking – Blue",   dir: BASE + "blue/"   },
    { id: "svik4s_green",  name: "Viking – Green",  dir: BASE + "green/"  },
    { id: "svik4s_purple", name: "Viking – Purple", dir: BASE + "purple/" },
    { id: "svik4s_red",    name: "Viking – Red",    dir: BASE + "red/"    },
    { id: "svik4s_turkis", name: "Viking – Türkis", dir: BASE + "turkis/" }
  ];

  // Unterstützte Würfeltypen
  const TYPES = ["2","4","6","8","10","12","20","100"];

  const fileName = (t) => `${t}${USE_VIK_SUFFIX ? "VIK4S" : ""}.glb`;

  for (const v of variants) {
    dice3d.addSystem({ id: v.id, name: v.name }, false);

    for (const t of TYPES) {
      const type = (t === "100") ? "d100" : `d${t}`;
      dice3d.addDicePreset({
        type,
        system: v.id,
        modelFile: v.dir + fileName(t)
        // Falls nötig:
        // , scale: 0.98
        // , mass: 1
        // , inertia: 1
      });
    }
  }
});
