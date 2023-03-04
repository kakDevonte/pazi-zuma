import Game from "../scenes/Game";

class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Game,
    x: number,
    y: number,
    image: string,
    index: number,
    level: number,
    name: string
  ) {
    super(scene, x, y, image);
    this.scene = scene;
    this.index = index;
    this.name = name;
    this.level = level;
    this.value = image === "sport2" ? 3 : 0;
    this.init();
  }

  public scene: Game;
  public index: number;
  public value: number;
  public level: number;
  private currAngle!: number;
  private text!: Phaser.GameObjects.Text;

  private init(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setScale(0.3);
    this.setName("ball" + this.index);
    //this.setSize(145, 145);
    this.setCircle(64);

    this.text = this.scene.add
      .text(
        this.getBounds().centerX,
        this.getBounds().centerY - this.value,
        `${this.level}`,
        {
          font: "24px Montserrat ExtraBoldItalic",
          color: "rgb(255,255,255)",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);
  }

  public setCurrAngle(angle: number): void {
    this.currAngle = angle;
  }

  public getCurrAngle(): number {
    return this.currAngle;
  }

  protected preUpdate(): void {
    this.text.setX(this.getBounds().centerX);
    this.text.setY(this.getBounds().centerY - this.value);
  }

  public destroy(): void {
    this.text?.destroy();
    super.destroy();
  }
}

export default Ball;
