export class Validator {
    static validateLetters(e: KeyboardEvent): boolean {
        debugger
        return /[a-zA-Z ]/.test(e.key);
    }
}