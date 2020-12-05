/**
 * Selects a random element of a given array.
 * @param  {string[]} arr
 * @returns string
 */
export function choice(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}