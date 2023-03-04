import road from "../../assets/images/road.png";
import Settings from "../data/Settings";
import Utils from "../data/Utils";
import User from "../data/User";
import Ball from "../components/Ball";
import { store } from "../../../redux/store";

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
    this.physicsBalls.add(ball);

    this.balls.push(ball);
    this.ballsStat.push({
      index: 1,
      start: false,
      sport: "sport" + number,
      level: 1,
    });

    //  this.cursor = this.add.line(0, 0, 0, 0, 0, 0, 0x1a65ac, 0.5);
    //  this.cursor.setLineWidth(1, 19);

    this.input.on("pointermove", (pointer: any) => {
      const mx = pointer.worldX - this.x;
      const my = pointer.worldY - this.y;
      this.angle = Math.atan2(my, mx);
      this.move();
    });

    this.input.on("pointerdown", (pointer: any) => {
      if (this.balls.length >= 17) {
        // setTimeout(() => {
        //   store.dispatch({ type: "game/toggleEndGame" });
        // }, 3000);
        return;
      }
      this.numberBall += 1;

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

      const ball = this.ballsStat.find((b) => b.start === false);

      //const index = this.balls.length - 1;
      const b = this.balls.find((b) => b.index === ball.index);
      // this.ballsStat[index].angle = angle;

      this.ballsStat = this.ballsStat.map((el) =>
        el.index === ball.index ? { ...el, angle: angle } : el
      );

      b.setCurrAngle(angle);

      this.tweens.add({
        targets: b,
        y: y2,
        x: x2,
        duration: 200,
        ease: "Linear",
        onComplete: () => {
          this.ballsStat = this.ballsStat.map((el) =>
            el.index === ball.index ? { ...el, start: true } : el
          );
        },
        // repeat: -1,
        // yoyo: true,
      });
      setTimeout(() => {
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
      }, 100);
    });

    this.setCollisions();
  }

  move() {
    this.x = this.x + 15 * Math.cos(this.angle);
    this.y = this.y + 15 * Math.sin(this.angle);

    this.lineTo(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.x,
      this.y
    );
  }

  lineTo(x0: number, y0: number, x: number, y: number) {
    //  this.cursor.setTo(x, y, x0, y0);
  }

  public update(): void {
    if (this.ballsStat.length >= 17) {
      this.timeEnd += 1;
    } else {
      this.timeEnd = 0;
    }
    if (this.timeEnd > 300) {
      this.timeEnd = 0;
      store.dispatch({ type: "game/toggleEndGame" });
      // this.scene.stop();
    }
    for (let i = 0; i < this.balls.length; i++) {
      if (this.ballsStat[i].start) {
        if (!this.ballsStat[i].complete && this.ballsStat[i].level === 4) {
          this.ballsStat[i].complete = true;
          // console.log("LEVEL 4");
          // console.log(this.ballsStat[i]);
          const sport = Number(
            this.ballsStat[i].sport.substr(this.ballsStat[i].sport.length - 1)
          );
          console.log(sport);
          this.scene.pause();
          store.dispatch({
            type: "game/setData",
            payload: {
              level: 1,
              sport: sport - 1,
            },
          });
          store.dispatch({ type: "game/openPopup" });
        }
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

  public updateLevel(): void {
    const sortArray = [...this.ballsStat].sort(
      (a, b) => parseFloat(a.angle) - parseFloat(b.angle)
    );

    for (let i = 0; i < this.balls.length; i++) {
      const ball1 = sortArray[i];
      const ball2 = sortArray[i + 1];
      const ball3 = sortArray[i + 2];

      if (ball1?.start && ball2?.start && ball3?.start) {
        if (ball1?.angle && ball2?.angle && ball3?.angle) {
          if (
            this.isInRange(ball1?.angle, ball3?.angle, ball2?.angle) &&
            // this.is_P3_between_P1_and_P2(
            //   ,
            //   ,
            //   ball3?.angle
            // ) &&
            ball1?.sport === ball2?.sport &&
            ball1?.sport === ball3?.sport &&
            ball2?.sport === ball3?.sport &&
            ball1?.level === ball2?.level &&
            ball1?.level === ball3?.level &&
            ball2?.level === ball3?.level
          ) {
            // const b1 = this.balls[ball1.index - 1];
            // const b2 = this.balls[ball2.index - 1];
            // const b3 = this.balls[ball3.index - 1];
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
              duration: 300,
              ease: "Sine.easeIn",
              onComplete: () => {
                b1.destroy();
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
              duration: 300,
              ease: "Sine.easeIn",
              onComplete: () => {
                b3.destroy();
                this.balls = this.balls.filter(function (obj) {
                  return obj.index !== ball3.index;
                });

                this.ballsStat = this.ballsStat.filter(function (obj) {
                  return obj.index !== ball3.index;
                });

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
                });
              },
            });
          }
        }
      }
    }
  }

  isInRange(from: number, to: number, angle: number) {
    var _from = from % 360,
      _to = to % 360,
      _angle = angle % 360;
    if (_from < 0) _from += 360; // (-500) % 360 === -140 :(
    if (_to < 0) _to += 360;
    if (_angle < 0) _angle += 360;
    if (_from === _to) {
      if (to > from) return true; // whole circle
      return _angle === _from; // exact only
    }
    if (_to < _from) return _angle <= _to || from <= _angle; // _angle outside range
    return _from <= _angle && _angle <= _to; // _angle inside range
  }

  public setCollisions(): void {
    this.physics.add.collider(
      this.physicsBalls,
      this.physicsBalls,
      (ball1: any, ball2: any) => {
        let a1, a2;

        const ballAngle1 =
          ball1.getCurrAngle() > 180
            ? -360 + ball1.getCurrAngle()
            : ball1.getCurrAngle();
        const ballAngle2 =
          ball2.getCurrAngle() > 180
            ? -360 + ball2.getCurrAngle()
            : ball2.getCurrAngle();

        if (
          (ballAngle1 >= 160 && ballAngle1 <= 180) ||
          (ballAngle2 >= 162 && ballAngle2 <= 180)
        ) {
          return;
        }

        if (
          (ballAngle2 >= -162 && ballAngle1 <= -180) ||
          (ballAngle1 >= -162 && ballAngle1 <= -180)
        ) {
          return;
        }
        console.log(ballAngle1, ballAngle2);
        if (ballAngle1 < ballAngle2) {
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

        angle1 = angle1 + 7 * a1;

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
          duration: 600,
          ease: "Sine.easeOut",
          onComplete: () => {
            ball1.setCurrAngle(angle1);
            this.ballsStat = this.ballsStat.map((el) =>
              el.index === ball1.index ? { ...el, angle: angle1 } : el
            );
            // this.ballsStat[ball1.index - 1].angle = angle1;
          },
        });

        let dX2 = ball2.x - this.cameras.main.centerX;
        let dY2 = ball2.y - this.cameras.main.centerY;
        let angle2 = (180 / Math.PI) * Math.atan2(dY2, dX2);
        if (angle2 < 0) angle2 += 360;

        angle2 = angle2 + 7 * a2;

        const x2 =
          this.cameras.main.centerX +
          this.radius * Math.cos(angle2 * (Math.PI / 180));
        const y2 =
          this.cameras.main.centerY +
          this.radius * Math.sin(angle2 * (Math.PI / 180));

        // console.log(`x1 = ${ball1.x} y1 = ${ball1.y}`);
        // console.log(`x2 = ${x} y2 = ${y}`);

        this.tweens.add({
          targets: ball2,
          y: y2,
          x: x2,
          duration: 600,
          ease: "Sine.easeOut",
          onComplete: () => {
            ball2.setCurrAngle(angle2);
            this.ballsStat = this.ballsStat.map((el) =>
              el.index === ball2.index ? { ...el, angle: angle2 } : el
            );
          },
        });

        return;
      }
    );
  }
}
