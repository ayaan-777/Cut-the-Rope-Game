class Ground {
  constructor(xInput, yInput, widthInput, heightInput) {
    let options = {
      isStatic: true
    };

    this.body = Bodies.rectangle(xInput, yInput, widthInput, heightInput, options);
    this.width = widthInput;
    this.height = heightInput;
    World.add(AJworld, this.body);
  }

  show() {
    let pos = this.body.position;
    push();
    rectMode(CENTER);
    noStroke();
    fill(148, 127, 146);
    rect(pos.x, pos.y, this.width, this.height);
    pop();
  }
}
