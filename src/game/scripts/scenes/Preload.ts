import sport1 from "../../assets/images/sport1.png";
import sport2 from "../../assets/images/sport2.png";
import sport3 from "../../assets/images/sport3.png";
import sport4 from "../../assets/images/sport4.png";
import sport5 from "../../assets/images/sport5.png";
import sport6 from "../../assets/images/sport6.png";
import sportSVG1 from "../../assets/images/sport1.svg";
import sportSVG2 from "../../assets/images/sport2.svg";
import sportSVG3 from "../../assets/images/sport3.svg";
import sportSVG4 from "../../assets/images/sport4.svg";
import sportSVG5 from "../../assets/images/sport5.svg";
import sportSVG6 from "../../assets/images/sport6.svg";
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
    this.load.image("sport1", sport1);
    this.load.image("sport4", sport4);
    this.load.image("sport6", sport6);

    this.load.image("sport2", sport2);
    this.load.image("sport3", sport3);
    this.load.image("sport5", sport5);

    // this.load.svg("sport1", sportSVG1);
    // this.load.svg("sport4", sportSVG4);
    // this.load.svg("sport6", sportSVG6);
    // this.load.svg("sport2", sportSVG2);
    // this.load.svg("sport3", sportSVG3);
    // this.load.svg("sport5", sportSVG5);
    // sport1.split(":")[0] == "data"
    //   ? this.textures.addBase64("sport1", sport1)
    //   : this.load.image("sport1", sport1);
  }
}
