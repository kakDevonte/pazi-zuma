import * as Phaser from "phaser";

import Boot from "./scenes/Boot";
import Settings from "./data/Settings";
import Game from "./scenes/Game";
import Preload from "./scenes/Preload";

const gcd = (num1: number, num2: number): number => {
  while (num1 && num2) num1 > num2 ? (num1 %= num2) : (num2 %= num1);
  num1 += num2;
  return num1;
};

const clientHeight = Math.round(window.innerHeight);
const clientWidth = Math.round(window.innerWidth);
const canvasWidth = Settings.sizes.width;

let canvasHeight = Math.round(
  (Settings.sizes.width * clientHeight) / clientWidth
);

let width = 0;
let height = 0;

if (canvasHeight > Settings.sizes.maxHeight)
  canvasHeight = Settings.sizes.maxHeight;
else if (canvasHeight < Settings.sizes.minHeight)
  canvasHeight = Settings.sizes.minHeight;

const x = canvasWidth / gcd(canvasHeight, canvasWidth);
const y = canvasHeight / gcd(canvasHeight, canvasWidth);

if (canvasHeight >= 1280) {
  Settings.setMobile(true);
}

if (clientHeight / y > clientWidth / x) {
  width = clientWidth;
  height = (clientWidth / x) * y;
} else {
  width = (clientHeight / y) * x;
  height = clientHeight;
}
//canvasHeight = window.innerHeight;

//canvasWidth = window.innerWidth;

export const config: Phaser.Types.Core.GameConfig = {
  type: Settings.isMobile() ? Phaser.CANVAS : Phaser.AUTO,
  width: canvasWidth,
  height: canvasHeight,
  parent: "root",
  physics: {
    default: "arcade",
    // arcade: { debug: true },
  },
  audio: {
    disableWebAudio: true,
    noAudio: false,
  },
  render: { transparent: true },
  scene: [Boot, Game, Preload],
};
