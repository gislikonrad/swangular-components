class GuidGenerator {
  static generate() {
    return `${this.generatePart(8)}-${this.generatePart(4)}-${this.generatePart(4)}-${this.generatePart(4)}-${this.generatePart(12)}`
  }

  private static generatePart(length: number): string {
    let multiplier = 0x1;
    for(let i = 0; i < length; i++) {
      multiplier *= 0x10;
    }
    return Math.floor((1 + Math.random()) * multiplier).toString(16).substring(1);
  }
}

export const guid = GuidGenerator.generate();
