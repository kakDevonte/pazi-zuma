import road from "../../assets/images/road.png";
import Settings from "../data/Settings";
import Utils from "../data/Utils";
import User from "../data/User";
import Ball from "../components/Ball";
import { store } from "../../../redux/store";
import { upCard } from "../../../redux/game/asyncActions";
import { Main } from "../../../pages/Main";
const degreeCircle = require("degree-circle");

// const sports = []

export default class Game extends Phaser.Scene {
  // private cursor!: Phaser.GameObjects.Line;
  private balls!: any[];
  private ballsStat!: any[];
  private physicsBalls!: Phaser.Physics.Arcade.Group;
  private timeDelay!: number;
  private numberBall!: number;
  private angle = 0;
  private timeEnd = 0;
  private isNew = true;
  private createBall = false;
  private points = 0;
  private currBall = 0;
  private x!: number;
  private y!: number;
  private radius!: number;
  constructor() {
    super("Game");
  }

  public create(): void {
    this.game.events.on("PAUSE_EVENT", (event: any) => {
      this.scene.pause();
    });

    this.game.events.on("RESUME_EVENT", (event: any) => {
      this.scene.resume();
    });

    const { centerX, centerY, width } = this.cameras.main;
    this.x = centerX;
    this.y = centerY;
    this.numberBall = 1;
    this.timeDelay = 0;
    this.radius = (width * 0.8) / 2;

    this.balls = [];
    this.ballsStat = [];
    this.physicsBalls = this.physics.add.group();

    this.currBall = this.numberBall;
    const number = Utils.randomNumber(1, 6);

    const ball = new Ball(
      this,
      centerX,
      centerY,
      "sport" + number,
      this.numberBall,
      1,
      "sport" + number
    );
    this.physicsBalls.add(ball);

    this.balls.push(ball);
    this.ballsStat.push({
      index: 1,
      start: false,
      sport: "sport" + number,
      level: 1,
    });

    this.input.on("pointermove", (pointer: any) => {
      const mx = pointer.worldX - this.x;
      const my = pointer.worldY - this.y;
      this.angle = Math.atan2(my, mx);
      this.move();
    });

    this.input.on("pointerdown", (pointer: any) => {
      if (this.balls.length >= 17) return;
      if (!this.isNew) return;

      this.isNew = false;
      let x = pointer.worldX - this.cameras.main.centerX;
      let y = pointer.worldY - this.cameras.main.centerY;
      let angle = (180 / Math.PI) * Math.atan2(y, x);
      if (angle < 0) angle += 360;

      const x2 =
        this.cameras.main.centerX +
        this.radius * Math.cos(angle * (Math.PI / 180));
      const y2 =
        this.cameras.main.centerY +
        this.radius * Math.sin(angle * (Math.PI / 180));

      const newBall = this.ballsStat.find((b) => b.index === this.currBall);
      const b = this.balls.find((b) => b.index === newBall.index);

      this.ballsStat = this.ballsStat.map((el) =>
        el.index === newBall.index ? { ...el, angle: angle } : el
      );
      b.setCurrAngle(angle);

      this.createBall = true;
      this.tweens.add({
        targets: b,
        y: y2,
        x: x2,
        duration: 250,
        ease: "Linear",
        onComplete: () => {
          this.ballsStat = this.ballsStat.map((el) =>
            el.index === newBall.index ? { ...el, start: true } : el
          );
          this.numberBall += 1;
          this.isNew = true;
          this.currBall = this.numberBall;
          const number = Utils.randomNumber(1, 6);
          //const number = 1;

          const ball = new Ball(
            this,
            centerX,
            centerY,
            "sport" + number,
            this.numberBall,
            1,
            "sport" + number
          );
          this.balls.push(ball);
          this.physicsBalls.add(ball);
          this.ballsStat.push({
            index: this.numberBall,
            start: false,
            sport: "sport" + number,
            level: 1,
          });
        },
      });
      // setTimeout(() => {
      //
      // }, 100);
    });

    this.setCollisions();
  }

  move() {
    this.x = this.x + 15 * Math.cos(this.angle);
    this.y = this.y + 15 * Math.sin(this.angle);
  }

  public update(): void {
    if (this.ballsStat.length >= 17) {
      this.timeEnd += 1;
    } else {
      this.timeEnd = 0;
    }
    if (this.timeEnd > 100) {
      this.timeEnd = 0;
      store.dispatch({ type: "game/setPoints", payload: this.points });
      store.dispatch({ type: "game/toggleEndGame" });
    }

    for (let i = 0; i < this.balls.length; i++) {
      if (this.ballsStat[i].start) {
        const speedDelta = 0.2;
        const period = speedDelta;

        let dX1 = this.balls[i].x - this.cameras.main.centerX;
        let dY1 = this.balls[i].y - this.cameras.main.centerY;
        let angle1 = (180 / Math.PI) * Math.atan2(dY1, dX1);
        if (angle1 < 0) angle1 += 360;

        angle1 = angle1 + period;

        const x1 =
          this.cameras.main.centerX +
          this.radius * Math.cos(angle1 * (Math.PI / 180));
        const y1 =
          this.cameras.main.centerY +
          this.radius * Math.sin(angle1 * (Math.PI / 180));

        this.balls[i].x = x1;
        this.balls[i].y = y1;
        this.ballsStat[i].angle = angle1;

        this.balls[i].setCurrAngle(angle1);
      }
    }
    this.updateLevel();
  }

  getIndex(arraySize: number, index: number) {
    if (index >= arraySize) {
      return index - arraySize;
    } else return index;
  }

  public updateLevel(): void {
    const array = [...this.ballsStat].sort(
      (a, b) => parseFloat(a.angle) - parseFloat(b.angle) //b.level - a.level ||
    );

    const sortArray = [...array].filter(function (el) {
      return el.start == true;
    });

    for (let i = 0; i < this.ballsStat.length; i++) {
      if (sortArray.length < 3) return;

      const ball1 = sortArray[i];
      const ball2 = sortArray[this.getIndex(sortArray.length, i + 1)];
      const ball3 = sortArray[this.getIndex(sortArray.length, i + 2)];

      if (ball1?.start && ball2?.start && ball3?.start) {
        const isSport =
          ball1.sport === ball2.sport &&
          ball1.sport === ball3.sport &&
          ball2.sport === ball3.sport;
        const isLevel =
          ball1.level === ball2.level &&
          ball1.level === ball3.level &&
          ball2.level === ball3.level;
        if (isSport && isLevel) {
          {
            const b1 = this.balls.find((b) => b.index === ball1.index);
            const b2 = this.balls.find((b) => b.index === ball2.index);
            const b3 = this.balls.find((b) => b.index === ball3.index);
            const name = ball1.sport;
            const level = ball1.level;
            const angle = ball2.angle;

            const x = b2.x;
            const y = b2.y;

            b2.destroy();
            this.balls = this.balls.filter(function (obj) {
              return obj.index !== ball2.index;
            });
            this.ballsStat = this.ballsStat.filter(function (obj) {
              return obj.index !== ball2.index;
            });

            this.tweens.add({
              targets: b1,
              y: y,
              x: x,
              duration: 250,
              ease: "Sine.easeIn",
              onComplete: () => {
                b1?.destroy();
                this.balls = this.balls.filter(function (obj) {
                  return obj.index !== ball1.index;
                });

                this.ballsStat = this.ballsStat.filter(function (obj) {
                  return obj.index !== ball1.index;
                });
              },
            });

            this.tweens.add({
              targets: b3,
              y: y,
              x: x,
              duration: 250,
              ease: "Sine.easeIn",
              onComplete: () => {
                b3?.destroy();
                this.balls = this.balls.filter(function (obj) {
                  return obj.index !== ball3.index;
                });
                this.ballsStat = this.ballsStat.filter(function (obj) {
                  return obj.index !== ball3.index;
                });
                if (level + 1 < 3 && this.createBall) {
                  this.createBall = false;
                  this.numberBall += 1;
                  const ball = new Ball(
                    this,
                    x,
                    y,
                    name,
                    this.numberBall,
                    level + 1,
                    name
                  );
                  ball.setCurrAngle(angle);
                  this.balls.push(ball);
                  this.physicsBalls.add(ball);
                  this.ballsStat.push({
                    index: this.numberBall,
                    start: true,
                    sport: name,
                    level: level + 1,
                    angle: angle,
                    complete: false,
                  });
                } else {
                  this.points += 1;
                  const sport = Number(name.substr(name.length - 1));

                  const user = store.getState().game.user;
                  if (user.cards[sport - 1].level < 3) {
                    this.scene.pause();
                    store.dispatch(upCard({ id: user.id, sport: sport - 1 }));
                    store.dispatch({
                      type: "game/setData",
                      payload: {
                        level: user.cards[sport - 1].level + 1,
                        sport: sport - 1,
                      },
                    });
                    store.dispatch({ type: "game/openPopup" });
                  }
                }
              },
            });
          }
        }
      }
    }
  }

  isInRange(start: number, end: number, mid: number) {
    return degreeCircle(mid).isAfter(start) && degreeCircle(end).isAfter(mid);
  }

  public setCollisions(): void {
    this.physics.add.collider(
      this.physicsBalls,
      this.physicsBalls,
      (ball1: any, ball2: any) => {
        let a1, a2;

        const b1 = this.ballsStat.find((b) => b.index === ball1.index);
        const b2 = this.ballsStat.find((b) => b.index === ball2.index);

        if (!b1.start || !b2.start) return;

        if (degreeCircle(ball1.getCurrAngle()).isBefore(ball2.getCurrAngle())) {
          a1 = -1;
          a2 = 1;
        } else {
          a1 = 1;
          a2 = -1;
        }

        let dX1 = ball1.x - this.cameras.main.centerX;
        let dY1 = ball1.y - this.cameras.main.centerY;
        let angle1 = (180 / Math.PI) * Math.atan2(dY1, dX1);
        if (angle1 < 0) angle1 += 360;

        angle1 = angle1 + 6 * a1;

        const x1 =
          this.cameras.main.centerX +
          this.radius * Math.cos(angle1 * (Math.PI / 180));
        const y1 =
          this.cameras.main.centerY +
          this.radius * Math.sin(angle1 * (Math.PI / 180));

        this.tweens.add({
          targets: ball1,
          y: y1,
          x: x1,
          duration: 750,
          ease: "Sine.easeOut",
          onComplete: () => {
            ball1.setCurrAngle(angle1);
            this.ballsStat = this.ballsStat.map((el) =>
              el.index === ball1.index ? { ...el, angle: angle1 } : el
            );
          },
        });

        let dX2 = ball2.x - this.cameras.main.centerX;
        let dY2 = ball2.y - this.cameras.main.centerY;
        let angle2 = (180 / Math.PI) * Math.atan2(dY2, dX2);
        if (angle2 < 0) angle2 += 360;

        angle2 = angle2 + 6 * a2;

        const x2 =
          this.cameras.main.centerX +
          this.radius * Math.cos(angle2 * (Math.PI / 180));
        const y2 =
          this.cameras.main.centerY +
          this.radius * Math.sin(angle2 * (Math.PI / 180));

        this.tweens.add({
          targets: ball2,
          y: y2,
          x: x2,
          duration: 750,
          ease: "Sine.easeOut",
          onComplete: () => {
            ball2.setCurrAngle(angle2);
            this.ballsStat = this.ballsStat.map((el) =>
              el.index === ball2.index ? { ...el, angle: angle2 } : el
            );
          },
        });
      }
    );
  }
}
