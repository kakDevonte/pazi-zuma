import Settings from '../data/Settings';

export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  public init(): void {}

  public preload(): void {
    this.preloadAssets();
  }

  public create(): void {
    this.scene.stop();
    this.scene.start('Preload');
  }

  private preloadAssets(): void {
    // this.load.image('bgLoad', bgLoad);
    // this.load.image('bgLoadingBar', bgLoadingBar);
    // this.load.image('loadingBar', loadingBar);
  }
}
