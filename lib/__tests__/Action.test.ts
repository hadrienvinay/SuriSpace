import { describe, it, expect } from 'vitest';
import Action, { ActionParams } from '../Action';

describe('Action', () => {
  const defaultParams: ActionParams = {
    name: 'Apple',
    ticker: 'AAPL',
    price: 150,
    purchasePrice: 100,
    quantity: 10,
    pe: 25,
    dividendYield: 0.5,
    where: 'NYSE',
  };

  describe('constructor', () => {
    it('should create an Action with all provided params', () => {
      const action = new Action(defaultParams);

      expect(action.name).toBe('Apple');
      expect(action.ticker).toBe('AAPL');
      expect(action.price).toBe(150);
      expect(action.purchasePrice).toBe(100);
      expect(action.quantity).toBe(10);
      expect(action.pe).toBe(25);
      expect(action.dividendYield).toBe(0.5);
      expect(action.where).toBe('NYSE');
    });

    it('should default quantity to 0 when not provided', () => {
      const params: ActionParams = {
        name: 'Test',
        ticker: 'TST',
        price: 50,
        purchasePrice: 40,
      };
      const action = new Action(params);

      expect(action.quantity).toBe(0);
    });

    it('should handle null pe and dividendYield', () => {
      const params: ActionParams = {
        name: 'Test',
        ticker: 'TST',
        price: 50,
        purchasePrice: 40,
        pe: null,
        dividendYield: null,
      };
      const action = new Action(params);

      expect(action.pe).toBeNull();
      expect(action.dividendYield).toBeNull();
    });

    it('should convert price and purchasePrice to numbers', () => {
      const params = {
        name: 'Test',
        ticker: 'TST',
        price: '50' as unknown as number,
        purchasePrice: '40' as unknown as number,
      };
      const action = new Action(params);

      expect(typeof action.price).toBe('number');
      expect(typeof action.purchasePrice).toBe('number');
      expect(action.price).toBe(50);
      expect(action.purchasePrice).toBe(40);
    });

    it('should default price to 0 when falsy', () => {
      const params = {
        name: 'Test',
        ticker: 'TST',
        price: 0,
        purchasePrice: 0,
      };
      const action = new Action(params);

      expect(action.price).toBe(0);
      expect(action.purchasePrice).toBe(0);
    });
  });

  describe('getGain', () => {
    it('should calculate positive gain correctly', () => {
      const action = new Action(defaultParams);
      expect(action.getGain()).toBe(50);
    });

    it('should calculate negative gain correctly', () => {
      const action = new Action({
        ...defaultParams,
        price: 80,
        purchasePrice: 100,
      });
      expect(action.getGain()).toBe(-20);
    });

    it('should return 0 when price equals purchasePrice', () => {
      const action = new Action({
        ...defaultParams,
        price: 100,
        purchasePrice: 100,
      });
      expect(action.getGain()).toBe(0);
    });

    it('should handle zero prices', () => {
      const action = new Action({
        ...defaultParams,
        price: 0,
        purchasePrice: 0,
      });
      expect(action.getGain()).toBe(0);
    });
  });

  describe('getGainPercent', () => {
    it('should calculate positive gain percentage correctly', () => {
      const action = new Action(defaultParams);
      expect(action.getGainPercent()).toBe(50);
    });

    it('should calculate negative gain percentage correctly', () => {
      const action = new Action({
        ...defaultParams,
        price: 50,
        purchasePrice: 100,
      });
      expect(action.getGainPercent()).toBe(-50);
    });

    it('should return null when purchasePrice is 0', () => {
      const action = new Action({
        ...defaultParams,
        price: 100,
        purchasePrice: 0,
      });
      expect(action.getGainPercent()).toBeNull();
    });

    it('should return 0 when price equals purchasePrice', () => {
      const action = new Action({
        ...defaultParams,
        price: 100,
        purchasePrice: 100,
      });
      expect(action.getGainPercent()).toBe(0);
    });

    it('should handle fractional percentages', () => {
      const action = new Action({
        ...defaultParams,
        price: 101,
        purchasePrice: 100,
      });
      expect(action.getGainPercent()).toBe(1);
    });
  });

  describe('toJSON', () => {
    it('should return a plain object with all properties', () => {
      const action = new Action(defaultParams);
      const json = action.toJSON();

      expect(json).toEqual({
        name: 'Apple',
        ticker: 'AAPL',
        price: 150,
        purchasePrice: 100,
        quantity: 10,
        pe: 25,
        dividendYield: 0.5,
        where: 'NYSE',
      });
    });

    it('should handle null optional properties', () => {
      const action = new Action({
        name: 'Test',
        ticker: 'TST',
        price: 50,
        purchasePrice: 40,
      });
      const json = action.toJSON();

      expect(json.pe).toBeNull();
      expect(json.dividendYield).toBeNull();
      expect(json.where).toBeUndefined();
    });

    it('should return a serializable object', () => {
      const action = new Action(defaultParams);
      const json = action.toJSON();
      const serialized = JSON.stringify(json);
      const deserialized = JSON.parse(serialized);

      expect(deserialized).toEqual(json);
    });
  });
});
