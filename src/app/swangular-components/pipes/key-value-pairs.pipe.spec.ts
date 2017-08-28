import { KeyValuePairsPipe } from './key-value-pairs.pipe';

describe('KeyValuePairsPipe', () => {
  it('create an instance', () => {
    const pipe = new KeyValuePairsPipe();
    expect(pipe).toBeTruthy();
  });
});
