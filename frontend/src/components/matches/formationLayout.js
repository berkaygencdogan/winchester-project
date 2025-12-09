export function getFormationPositions(formation, isHome) {
  const CENTER = 200;
  const RIGHT = 360;
  const LEFT = 80;

  const Y = {
    top: 60,
    midTop: 130,
    center: 200,
    midBottom: 270,
    bottom: 340,
  };

  // HOME 4-3-3
  if (formation === "4-3-3" && isHome) {
    return [
      { x: 0, y: Y.center }, // GK

      { x: LEFT + 60, y: Y.bottom }, // LB
      { x: LEFT + 20, y: Y.midBottom }, // LCB
      { x: LEFT + 20, y: Y.midTop }, // RCB
      { x: LEFT + 60, y: Y.top }, // RB

      { x: CENTER + 50, y: Y.midBottom }, // LCM
      { x: CENTER + 50, y: Y.center }, // CM
      { x: CENTER + 50, y: Y.midTop }, // RCM

      { x: RIGHT, y: Y.bottom }, // LW
      { x: RIGHT, y: Y.center }, // ST
      { x: RIGHT, y: Y.top }, // RW
    ];
  }

  // AWAY 4-2-3-1 (mirror)
  if (formation === "4-2-3-1" && !isHome) {
    const M = -1; // mirror

    return [
      { x: 470, y: Y.center }, // GK

      { x: CENTER - 160 * M, y: Y.bottom },
      { x: CENTER - 200 * M, y: Y.midBottom },
      { x: CENTER - 200 * M, y: Y.midTop },
      { x: CENTER - 160 * M, y: Y.top },

      { x: CENTER - 40 * M, y: Y.midBottom },
      { x: CENTER - 40 * M, y: Y.midTop },

      { x: CENTER + 80 * M, y: Y.bottom },
      { x: CENTER + 80 * M, y: Y.center },
      { x: CENTER + 80 * M, y: Y.top },

      { x: CENTER + 160 * M, y: Y.center }, // ST
    ];
  }

  return [];
}
