import sport1 from "../../assets/images/sport1.png";
import sport2 from "../../assets/images/sport2.png";
import sport3 from "../../assets/images/sport3.png";
import sport4 from "../../assets/images/sport4.png";
import sport5 from "../../assets/images/sport5.png";
import sport6 from "../../assets/images/sport6.png";
//import Webfont from "webfontloader";

export default class Preload extends Phaser.Scene {
  private fontsReady!: boolean;

  constructor() {
    super("Preload");
  }

  public init(): void {
    // Webfont.load({
    //   custom: {
    //     families: ["Montserrat ExtraBoldItalic"],
    //   },
    //   active: () => {
    //     this.fontsReady = true;
    //   },
    // });
  }

  public preload(): void {
    this.preloadAssets();
  }

  public create(): void {
    this.scene.stop();
    this.scene.start("Game");
  }

  private preloadAssets(): void {
    sport1.split(":")[0] == "data"
      ? this.textures.addBase64("sport1", sport1)
      : this.load.image("sport1", sport1);

    sport1.split(":")[0] == "data"
      ? this.textures.addBase64("sport4", sport4)
      : this.load.image("sport4", sport4);

    sport1.split(":")[0] == "data"
      ? this.textures.addBase64("sport6", sport6)
      : this.load.image("sport6", sport6);

    this.load.image("sport2", sport2);
    this.load.image("sport3", sport3);
    this.load.image("sport5", sport5);
  }
}
