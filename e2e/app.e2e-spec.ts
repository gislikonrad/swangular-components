import { SwangularPage } from './app.po';

describe('swangular App', () => {
  let page: SwangularPage;

  beforeEach(() => {
    page = new SwangularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
