export function textTruncation(text: string, charMax: number): string {
    console.log(text.length)
    if (text.length > charMax) {
        return text.slice(0, charMax - 3) + '...';
    }
    return text;
}