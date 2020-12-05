import fs from 'fs';
import fsPromises from 'fs/promises';


export function writeSync(absolute_file_path: string, data: string): void {
    try {
        fs.writeFileSync(absolute_file_path, data);
    } catch (error) {
        console.error(error);
    }
}

export async function writeAsync(absolute_file_path: string, data: string): Promise<void> {
    await fsPromises.writeFile(absolute_file_path, data);
}

export function readSync(absolute_file_path: string): string {
    const file_string: string = fs.readFileSync(absolute_file_path, 'utf-8');
    return file_string;
}
