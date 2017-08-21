import { FirstPipe } from './first.pipe';

describe('FirstPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstPipe();
    expect(pipe).toBeTruthy();
  });
});
