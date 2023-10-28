export function textTruncation(text: string, charMax: number): string {
    if (text.length > charMax) {
        return text.slice(0, charMax - 3) + '...';
    }
    return text;
}