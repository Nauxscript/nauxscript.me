class FlowingWater {
  private morphTime = 1;
  // const cooldownTime = 0.25;
  private time = new Date();
  private morph = 0;
  private forward = true;
  private s = 0;

  constructor(private upperText: HTMLElement, private lowerText: HTMLElement, private container: HTMLElement, ) { 
  }


  setContainerValue(val?: number) {
    if (val === undefined) {
      this.container.style.filter = 'none'
      return
    }
    this.container.style.filter = `url(#threshold) blur(0.${val}px)`
  }
}

export default FlowingWater