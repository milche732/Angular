import { GenderPipe } from './gender.pipe';

describe('GenderPipe', () => {
    it('create an instance', () => {
        const pipe = new GenderPipe();
        expect(pipe).toBeTruthy();
    });

    it('should transform', () => {
        const pipe = new GenderPipe();

        expect(pipe.transform(0, "en")).toBe("Male");
        expect(pipe.transform(1, "fr")).toBe("Femme");
    });
});
