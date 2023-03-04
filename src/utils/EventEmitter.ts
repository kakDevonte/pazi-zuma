export class SimpleEventEmitter {
  private _behaviourArray: any;

  init(behaviourArray: any) {
    this._behaviourArray = behaviourArray;
  }

  callMethodInBehaviour(methodName: any, behaviourInstance: any, args = []) {
    const behaviourMethod = behaviourInstance[methodName];
    if (behaviourMethod) {
      behaviourMethod.apply(behaviourInstance, args);
    }
  }

  callMethodInAllBehaviours(methodName: any, args = []) {
    this._behaviourArray.forEach((beh: any) => {
      if (beh[methodName]) {
        beh[methodName](...args);
      }
    });
  }
}
