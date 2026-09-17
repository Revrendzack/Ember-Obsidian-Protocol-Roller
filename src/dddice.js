import { DiceBox } from '@3d-dice/dice-box';

/** A presentation-only dddice boundary; local roller logic resolves outcomes. */
export class DddicePresenter {
  constructor({ container, assetPath, theme = 'default' }) {
    this.container = container;
    this.assetPath = assetPath;
    this.theme = theme;
    this.diceBox = null;
  }

  async initialize() {
    this.diceBox = new DiceBox(this.container, { assetPath: this.assetPath, theme: this.theme, offscreen: true });
    await this.diceBox.init();
  }

  async present({ count, sides }) {
    if (this.diceBox) await this.diceBox.roll(`${count}d${sides}`);
  }
}
