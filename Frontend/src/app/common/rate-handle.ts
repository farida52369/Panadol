import { StarTypesPayload } from "../stars-rate/star-types.payload";

export class RateHandle {
  public static getSuitableRate(rate: number): StarTypesPayload {
    const num = this.roundToHalf(rate);
    // console.log("To Half: " + num);
    const fullStars = Math.floor(num);
    const hasHalfStar = num % 1 !== 0;
    const halfStar = hasHalfStar ? [1] : [];
    const fullStarList = Array(fullStars)
      .fill(1)
      .map((_, i) => i + 1);
    const borderStar = Array(5 - fullStars - halfStar.length)
      .fill(1)
      .map((_, i) => i + 1);
    return {
      star: fullStarList,
      star_border: borderStar,
      star_half: halfStar,
    };
  }

  private static roundToHalf(num: number): number {
    const decimal = num - Math.floor(num);
    if (decimal < 0.25) {
      return Math.floor(num) + 0.0;
    } else if (decimal >= 0.25 && decimal < 0.75) {
      return Math.floor(num) + 0.5;
    } else {
      return Math.ceil(num);
    }
  }
}
