/**
 * Selects a random element of a given array.
 * @param  {string[]} arr
 * @returns string
 */
export function choice(arr: string[]): string | undefined {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function get_current_day(): string {
    const today = new Date(Date.now());
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');   // January is 0
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}
