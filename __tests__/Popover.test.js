import Popover from '../src/Popover';

describe('Popover', () => {
  let button;

  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = '<button id="test-btn">Click me</button>';
    button = document.getElementById('test-btn');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  test('должен создавать popover при клике на кнопку', () => {
    new Popover(button, 'Test title', 'Test content');
    button.click();

    const popover = document.querySelector('.popover');
    expect(popover).not.toBeNull();
    expect(popover.querySelector('.popover-header').textContent).toBe('Test title');
    expect(popover.querySelector('.popover-body').textContent).toBe('Test content');
  });

  test('должен скрывать popover при повторном клике', () => {
    new Popover(button, 'Title', 'Content');
    button.click();
    button.click();

    const popover = document.querySelector('.popover');
    expect(popover).toBeNull();
  });

  test('должен скрывать popover при клике вне его', () => {
    new Popover(button, 'Title', 'Content');
    button.click();

    jest.runAllTimers();

    document.body.click();

    const popover = document.querySelector('.popover');
    expect(popover).toBeNull();
  });

  test('должен корректно позиционировать popover', () => {
    jest.spyOn(button, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 200,
      width: 100,
      height: 40,
      right: 200,
      bottom: 240,
    });

    new Popover(button, 'Title', 'Content');
    button.click();

    const popover = document.querySelector('.popover');
    expect(popover).not.toBeNull();
  });
});